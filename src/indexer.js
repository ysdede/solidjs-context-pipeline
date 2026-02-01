import { logger } from './utils/logger.js';
import { CORE_PRIMITIVES } from './utils/constants.js';

/**
 * Index generation module
 * Generates structured indexes for AI agent discovery
 */

/**
 * Generate Root Index (FR19, FR21)
 * Creates the main entry point for the knowledge base
 * @param {object} organized - Hierarchical organization object
 * @returns {string} Markdown content for root index
 */
function generateRootIndex(organized) {
    const { domains, stats } = organized;
    const timestamp = new Date().toISOString();

    let content = `# SolidJS Context Knowledge Base\n\n`;
    content += `> Generated at: ${timestamp}\n`;
    content += `> Total Files: ${organized.files.length}\n\n`;

    content += `## Overview\n\n`;
    content += `This knowledge base contains processed documentation and source code from the SolidJS ecosystem, optimized for AI agent consumption.\n\n`;

    content += `## Domains\n\n`;

    // List domains with descriptions and stats
    for (const [domainName, domainData] of Object.entries(domains)) {
        const domainStats = stats[domainName];
        content += `### [${domainName}](./${domainName}/index.json)\n\n`;
        content += `- **Total Files**: ${domainStats.total}\n`;
        content += `- **API References**: ${domainStats.api}\n`;
        content += `- **Examples**: ${domainStats.examples}\n`;

        // Add brief description based on domain
        let description = '';
        switch (domainName) {
            case 'core-reactivity':
                description = 'Core reactive primitives (Signals, Effects, Memos) and state management.';
                break;
            case 'routing':
                description = 'Routing configuration, components, and data fetching (solid-router).';
                break;
            case 'ssr':
                description = 'Server-Side Rendering, Hydration, and SolidStart framework features.';
                break;
            case 'primitives':
                description = 'Helper primitives, utilities, and ecosystem tools.';
                break;
        }
        content += `- **Description**: ${description}\n\n`;
    }

    content += `## Core Primitives Coverage\n\n`;
    content += `The following core primitives are documented in this knowledge base:\n\n`;

    // Check coverage of core primitives
    const presentPrimitives = new Set();
    organized.files.forEach(f => {
        if (f.classification.primitive) {
            presentPrimitives.add(f.classification.primitive);
        }
    });

    const covered = CORE_PRIMITIVES.filter(p => presentPrimitives.has(p));
    const missing = CORE_PRIMITIVES.filter(p => !presentPrimitives.has(p));

    content += `- **Covered (${covered.length}/${CORE_PRIMITIVES.length})**: ${covered.join(', ')}\n`;
    if (missing.length > 0) {
        content += `- **Missing**: ${missing.join(', ')}\n`;
    }

    return content;
}

/**
 * Generate Domain Index (FR20, FR22)
 * Creates a JSON index for a specific domain
 * @param {string} domainName - Domain name
 * @param {object} domainData - Domain data object
 * @returns {object} JSON object for domain index
 */
function generateDomainIndex(domainName, domainData) {
    return {
        domain: domainName,
        generated_at: new Date().toISOString(),
        stats: {
            total: domainData.api.length + domainData.examples.length,
            api: domainData.api.length,
            examples: domainData.examples.length
        },
        description: `Index for ${domainName} domain`,
        content: {
            api: domainData.api.map(f => ({
                path: f.relativePath, // Relative to project root, will be adjusted in output stage
                name: f.metadata.source_path.split('/').pop(),
                repo: f.metadata.source_repo,
                primitive: f.classification.primitive,
                summary: `API documentation for ${f.metadata.source_path}` // Placeholder for FR22
            })),
            examples: domainData.examples.map(f => ({
                path: f.relativePath,
                name: f.metadata.source_path.split('/').pop(),
                repo: f.metadata.source_repo,
                summary: `Example/Tutorial for ${f.metadata.source_path}`
            }))
        }
    };
}

/**
 * Generate all indexes
 * @param {object} organized - Hierarchical organization object
 * @returns {Promise<object>} Object containing generated indexes { root: string, domains: { [domain]: object } }
 */
export async function generateIndexes(organized) {
    logger.info('Starting index generation');

    // Story 4.1: Generate Root Index (FR19)
    const rootIndex = generateRootIndex(organized);

    // Story 4.2: Generate Domain Indexes (FR20)
    const domainIndexes = {};
    for (const [domainName, domainData] of Object.entries(organized.domains)) {
        domainIndexes[domainName] = generateDomainIndex(domainName, domainData);
    }

    logger.info('Index generation complete', {
        rootLength: rootIndex.length,
        domains: Object.keys(domainIndexes)
    });

    return {
        root: rootIndex,
        domains: domainIndexes
    };
}
