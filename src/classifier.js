import path from 'path';
import { logger } from './utils/logger.js';
import { DOMAIN_PATTERNS, CORE_PRIMITIVES, DEFAULT_DOMAIN } from './utils/constants.js';

/**
 * Content organization and classification module
 * Classifies content into domains and organizes it hierarchically
 */

/**
 * Determine domain based on file path and content
 * @param {object} file - File object
 * @returns {string} Domain name
 */
function determineDomain(file) {
    // Strategy 1: Check metadata from frontmatter (if manually set)
    if (file.metadata && file.metadata.domain && file.metadata.domain !== 'unknown') {
        return file.metadata.domain;
    }

    // Strategy 2: Check repo name (strong signal)
    if (file.repoName === 'solid-router') return 'routing';
    if (file.repoName === 'solid-start') return 'ssr';
    if (file.repoName === 'signals') return 'core-reactivity';

    // Strategy 3: Check file path patterns
    const filePath = file.relativePath.toLowerCase();

    for (const [domain, patterns] of Object.entries(DOMAIN_PATTERNS)) {
        for (const pattern of patterns) {
            if (pattern.test(filePath)) {
                return domain;
            }
        }
    }

    // Strategy 4: Check content/filename for primitives (heuristics)
    // Check filename first
    const fileName = path.basename(file.absolutePath);
    for (const primitive of CORE_PRIMITIVES) {
        if (fileName.includes(primitive)) {
            return 'core-reactivity';
        }
    }

    // Strategy 5: Content inspection for API files (processed JSDoc)
    if (file.extension === '.ts' || file.fileType === 'typescript') {
        // TypeScript files with JSDoc are likely primitives or utilities
        // If not matched by now, default to primitives or check content
        if (file.content.includes('@module reactivity')) return 'core-reactivity';
    }

    // Fallback
    return DEFAULT_DOMAIN;
}

/**
 * Determine primitive name if applicable
 * @param {object} file - File object
 * @returns {string|null} Primitive name or null
 */
function determinePrimitive(file) {
    const fileName = path.basename(file.absolutePath);
    const content = file.content;

    for (const primitive of CORE_PRIMITIVES) {
        // Check filename match
        if (fileName.includes(primitive)) {
            return primitive;
        }
        // Check content for primary export or definition
        if (content.includes(`export function ${primitive}`) ||
            content.includes(`export const ${primitive}`)) {
            return primitive;
        }
    }

    return null;
}

/**
 * Classify a single file
 * @param {object} file - File object
 * @returns {object} Classified file object
 */
export function classifyFile(file) {
    try {
        const domain = determineDomain(file);
        const primitive = determinePrimitive(file);

        // Update metadata
        const metadata = {
            ...file.metadata,
            domain,
            primitive
        };

        // Determine target path organization (Story 3.2)
        // Structure: domain/type/filename
        // Type: 'api' for source/reference, 'examples' for tutorials implies?
        // FR17 says: "Organize content within domains by type (API Reference, Usage Examples)"

        let type = 'api'; // Default to API reference
        if (file.relativePath.includes('tutorial') || file.relativePath.includes('guide')) {
            type = 'examples';
        }

        return {
            ...file,
            metadata,
            classification: {
                domain,
                type,
                primitive
            }
        };

    } catch (error) {
        logger.error('Failed to classify file', { file: file.relativePath, error: error.message });
        // Return file with default classification on error
        return {
            ...file,
            metadata: { ...file.metadata, domain: DEFAULT_DOMAIN },
            classification: { domain: DEFAULT_DOMAIN, type: 'api', primitive: null }
        };
    }
}

/**
 * Classify all processed files
 * @param {Array} files - Array of processed file objects
 * @returns {Promise<Array>} Array of classified file objects
 */
export async function classifyFiles(files) {
    logger.info('Starting file classification', { totalFiles: files.length });

    const classifiedFiles = files.map(file => classifyFile(file));

    // Log classification statistics
    const stats = {};
    classifiedFiles.forEach(f => {
        const domain = f.classification.domain;
        stats[domain] = (stats[domain] || 0) + 1;
    });

    logger.info('File classification complete', { stats });

    // Story 3.2: Organize hierarchically (FR15, FR17, FR18)
    const organized = organizeHierarchically(classifiedFiles);

    return organized;
}

/**
 * Story 3.2: Organize files into hierarchical structure
 * FR15: Hierarchical domain structure
 * FR17: Organize content within domains by type
 * FR18: Maintain consistent directory structure
 * @param {Array} files - Classified files
 * @returns {object} Hierarchical organization
 */
function organizeHierarchically(files) {
    logger.info('Organizing files hierarchically');

    // Group by domain
    const byDomain = {};

    files.forEach(file => {
        const domain = file.classification.domain;
        const type = file.classification.type;

        // Initialize domain if needed
        if (!byDomain[domain]) {
            byDomain[domain] = {
                domain,
                api: [],
                examples: []
            };
        }

        // Add file to appropriate type
        byDomain[domain][type].push(file);
    });

    // Log organization stats
    const stats = {};
    Object.keys(byDomain).forEach(domain => {
        stats[domain] = {
            api: byDomain[domain].api.length,
            examples: byDomain[domain].examples.length,
            total: byDomain[domain].api.length + byDomain[domain].examples.length
        };
    });

    logger.info('Hierarchical organization complete', { stats });

    return {
        domains: byDomain,
        files,
        stats
    };
}
