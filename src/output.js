import fs from 'fs-extra';
import path from 'path';
import { logger } from './utils/logger.js';
import { resolvePath } from './utils/paths.js';
import { generateFrontmatter } from './utils/metadata.js';

/**
 * Story 5.3: Output module
 * FR23: Output processed files to ai_docs/ directory
 * FR24: Create self-contained documentation bundle
 * FR25: Produce on-demand loading structure
 * NFR5: Handle missing or malformed files without crashing
 */

/**
 * Write a single file to the output directory
 * @param {object} file - File object with content and metadata
 * @param {string} outputDir - Output directory path
 * @returns {Promise<boolean>} Success status
 */
async function writeFile(file, outputDir) {
    try {
        const { classification, metadata, content, relativePath } = file;
        
        if (!classification || !classification.domain) {
            logger.warn('File has no domain classification, skipping', { file: relativePath });
            return false;
        }
        
        // Determine output path: domain/type/filename
        const domain = classification.domain;
        const type = classification.type || 'api';
        
        // Generate clean filename from relative path
        const originalName = path.basename(relativePath);
        const fileName = originalName
            .toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/[^a-z0-9\-_.]/g, ''); // Remove invalid chars
        
        const filePath = path.join(outputDir, domain, type, fileName);
        
        // Ensure directory exists
        await fs.ensureDir(path.dirname(filePath));
        
        // Prepend frontmatter to content
        const frontmatter = generateFrontmatter(metadata);
        const fullContent = `${frontmatter}\n\n${content}`;
        
        // Write file (NFR5: error handling)
        await fs.writeFile(filePath, fullContent, 'utf-8');
        
        return true;
        
    } catch (error) {
        logger.error('Failed to write file', {
            file: file.relativePath,
            error: error.message
        });
        return false; // Continue-on-error (NFR5)
    }
}

/**
 * Write all processed files to output directory
 * @param {object} organized - Organized files structure
 * @param {string} outputDir - Output directory (defaults to 'ai_docs')
 * @returns {Promise<object>} Write results
 */
export async function writeOutput(organized, outputDir = 'ai_docs') {
    logger.info('Starting output write operation');
    
    const outputPath = resolvePath(outputDir);
    
    // Clean output directory if it exists
    if (await fs.pathExists(outputPath)) {
        logger.info('Cleaning existing output directory', { path: outputPath });
        await fs.remove(outputPath);
    }
    
    // Create fresh output directory
    await fs.ensureDir(outputPath);
    
    const { files } = organized;
    let successCount = 0;
    let failCount = 0;
    
    // Write all files
    for (const file of files) {
        const success = await writeFile(file, outputPath);
        if (success) {
            successCount++;
        } else {
            failCount++;
        }
    }
    
    const result = {
        totalFiles: files.length,
        successful: successCount,
        failed: failCount,
        outputDirectory: outputPath
    };
    
    logger.info('Output write complete', result);
    
    if (failCount > 0) {
        logger.warn(`${failCount} files failed to write`);
    }
    
    return result;
}

/**
 * Create directory structure summary file
 * @param {string} outputDir - Output directory
 * @param {object} organized - Organized files structure
 * @returns {Promise<void>}
 */
export async function createStructureSummary(outputDir, organized) {
    const outputPath = resolvePath(outputDir);
    const summaryPath = path.join(outputPath, 'STRUCTURE.md');
    
    const { domains, stats } = organized;
    
    let summary = '# SolidJS Knowledge Base Structure\n\n';
    summary += `Generated: ${new Date().toISOString()}\n\n`;
    summary += '## Domains\n\n';
    
    Object.keys(domains).forEach(domain => {
        const domainStats = stats[domain];
        summary += `### ${domain}\n`;
        summary += `- API Reference: ${domainStats.api} files\n`;
        summary += `- Examples: ${domainStats.examples} files\n`;
        summary += `- Total: ${domainStats.total} files\n\n`;
    });
    
    summary += '## Directory Structure\n\n';
    summary += '```\n';
    summary += 'ai_docs/\n';
    summary += '├── index.md (root index)\n';
    
    Object.keys(domains).forEach(domain => {
        summary += `├── ${domain}/\n`;
        summary += `│   ├── index.json (domain index)\n`;
        summary += `│   ├── api/ (API reference files)\n`;
        summary += `│   └── examples/ (usage examples)\n`;
    });
    
    summary += '```\n';
    
    await fs.writeFile(summaryPath, summary, 'utf-8');
    logger.info('Structure summary created', { path: summaryPath });
}
