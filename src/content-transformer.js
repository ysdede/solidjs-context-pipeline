import fs from 'fs-extra';
import { logger } from './utils/logger.js';
import { generateFrontmatter } from './utils/metadata.js';

/**
 * Content transformation module
 * Handles MDX normalization, JSDoc extraction, and metadata injection
 */

/**
 * Normalize MDX file by stripping JSX components
 * Uses regex-based approach for MVP (FR8, FR9)
 * @param {string} content - MDX file content
 * @returns {string} Normalized Markdown content
 */
function normalizeMDX(content) {
    let normalized = content;

    // Remove JSX component tags (e.g., <QuickLinks>, <EditPageLink />)
    // Pattern: <ComponentName ...props> ... </ComponentName> or <ComponentName ... />
    normalized = normalized.replace(/<[A-Z][a-zA-Z0-9]*[^>]*\/>/g, ''); // Self-closing tags
    normalized = normalized.replace(/<[A-Z][a-zA-Z0-9]*[^>]*>[\s\S]*?<\/[A-Z][a-zA-Z0-9]*>/g, ''); // Opening/closing tags

    // Remove HTML div/span tags with class attributes (common in MDX)
    normalized = normalized.replace(/<div[^>]*>|<\/div>/g, '');
    normalized = normalized.replace(/<span[^>]*>|<\/span>/g, '');

    // Clean up excessive blank lines (more than 2 consecutive)
    normalized = normalized.replace(/\n{3,}/g, '\n\n');

    return normalized.trim();
}

/**
 * Extract JSDoc/TSDoc comments from TypeScript file
 * @param {string} content - TypeScript file content
 * @returns {string} Extracted JSDoc as Markdown
 */
function extractJSDoc(content) {
    const jsDocBlocks = [];

    // Pattern to match JSDoc comment blocks: /** ... */
    const jsDocPattern = /\/\*\*([\s\S]*?)\*\//g;
    let match;

    while ((match = jsDocPattern.exec(content)) !== null) {
        const commentBlock = match[1];

        // Clean up JSDoc formatting
        const lines = commentBlock.split('\n').map(line => {
            // Remove leading * and whitespace
            return line.replace(/^\s*\*\s?/, '').trim();
        }).filter(line => line.length > 0);

        if (lines.length > 0) {
            jsDocBlocks.push(lines.join('\n'));
        }
    }

    // Format as Markdown with code blocks for better readability
    if (jsDocBlocks.length === 0) {
        return '';
    }

    return jsDocBlocks.map((block, index) => {
        return `## API Documentation ${index + 1}\n\n${block}\n`;
    }).join('\n');
}

/**
 * Extract existing frontmatter from content if present
 * @param {string} content - File content
 * @returns {object} { frontmatter: object|null, content: string }
 */
function extractExistingFrontmatter(content) {
    const frontmatterPattern = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = content.match(frontmatterPattern);

    if (match) {
        const frontmatterText = match[1];
        const bodyContent = match[2];

        // Parse YAML frontmatter (simple key-value parsing)
        const frontmatter = {};
        frontmatterText.split('\n').forEach(line => {
            const colonIndex = line.indexOf(':');
            if (colonIndex > 0) {
                const key = line.substring(0, colonIndex).trim();
                const value = line.substring(colonIndex + 1).trim();
                frontmatter[key] = value.replace(/^["']|["']$/g, ''); // Remove quotes
            }
        });

        return { frontmatter, content: bodyContent };
    }

    return { frontmatter: null, content };
}

/**
 * Inject metadata as YAML frontmatter (FR12, FR13, FR14)
 * @param {string} content - File content
 * @param {object} metadata - Metadata object
 * @returns {string} Content with metadata frontmatter
 */
function injectMetadata(content, metadata) {
    // Extract existing frontmatter if present
    const { frontmatter: existing, content: bodyContent } = extractExistingFrontmatter(content);

    // Merge existing frontmatter with new metadata (new metadata takes precedence)
    const mergedMetadata = {
        ...existing,
        ...metadata
    };

    const frontmatter = generateFrontmatter(mergedMetadata);
    return `${frontmatter}\n\n${bodyContent}`;
}

/**
 * Transform a single file based on its type
 * @param {object} file - File object from extractor
 * @returns {Promise<object>} Transformed file object with content
 */
export async function transformFile(file) {
    try {
        if (!file.absolutePath) {
            throw new Error(`File object missing absolutePath: ${JSON.stringify(file)}`);
        }

        const content = await fs.readFile(file.absolutePath, 'utf-8');
        let transformedContent = content;
        let metadata = {
            source_repo: file.repoName,
            source_path: file.relativePath,
            domain: 'unknown', // Will be set by classifier
            extracted_at: new Date().toISOString()
        };

        // Transform based on file type
        if (file.extension === '.mdx') {
            // Story 2.2: MDX Normalization (FR8, FR9)
            logger.info('Normalizing MDX file', { file: file.relativePath });
            transformedContent = normalizeMDX(content);
        } else if (file.extension === '.ts') {
            // Story 2.3: JSDoc Extraction (FR10)
            logger.info('Extracting JSDoc from TypeScript file', { file: file.relativePath });
            const jsDocContent = extractJSDoc(content);
            if (jsDocContent) {
                transformedContent = jsDocContent;
            } else {
                logger.warn('No JSDoc found in TypeScript file', { file: file.relativePath });
                return null; // Skip files without JSDoc
            }
        }
        // .md files pass through unchanged (already Markdown)

        // Story 2.4: Metadata Injection (FR12, FR13, FR14)
        transformedContent = injectMetadata(transformedContent, metadata);

        return {
            ...file,
            content: transformedContent,
            metadata
        };

    } catch (error) {
        logger.error('Failed to transform file', {
            file: file.relativePath,
            error: error.message
        });
        return null; // Continue-on-error
    }
}

/**
 * Transform all extracted files
 * @param {Array} files - Array of file objects from extractor
 * @returns {Promise<Array>} Array of transformed file objects
 */
export async function transformFiles(files) {
    logger.info('Starting file transformation', { totalFiles: files.length });

    const transformedFiles = [];
    let successCount = 0;
    let skipCount = 0;

    for (const file of files) {
        const transformed = await transformFile(file);
        if (transformed) {
            transformedFiles.push(transformed);
            successCount++;
        } else {
            skipCount++;
        }
    }

    logger.info('File transformation complete', {
        total: files.length,
        successful: successCount,
        skipped: skipCount
    });

    return transformedFiles;
}
