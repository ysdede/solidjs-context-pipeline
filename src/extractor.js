import { glob } from 'glob';
import fs from 'fs-extra';
import path from 'path';
import { logger } from './utils/logger.js';
import { resolvePath, getRelativePath } from './utils/paths.js';

/**
 * Extract files from cloned repositories
 * Discovers .md, .mdx, and .ts files with JSDoc/TSDoc comments
 * @param {string} sourceDir - Source directory containing cloned repos (defaults to 'raw_sources')
 * @returns {Promise<Array>} Array of file objects with metadata
 */
export async function extractFiles(sourceDir = 'raw_sources') {
  const sourcePath = resolvePath(sourceDir);
  
  logger.info('Starting file extraction', { sourceDir: sourcePath });
  
  // Check if source directory exists
  if (!(await fs.pathExists(sourcePath))) {
    logger.error('Source directory does not exist', { path: sourcePath });
    return [];
  }
  
  const discoveredFiles = [];
  
  try {
    // Discover .md files (FR4)
    logger.info('Discovering .md files');
    const mdFiles = await glob('**/*.md', {
      cwd: sourcePath,
      absolute: false,
      ignore: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.git/**']
    });
    
    for (const file of mdFiles) {
      discoveredFiles.push({
        path: path.join(sourcePath, file),
        absolutePath: path.join(sourcePath, file),
        relativePath: file,
        type: 'markdown',
        extension: '.md',
        repo: extractRepoName(file),
        repoName: extractRepoName(file),
        discovered: true
      });
    }
    logger.info(`Discovered ${mdFiles.length} .md files`);
    
    // Discover .mdx files (FR5)
    logger.info('Discovering .mdx files');
    const mdxFiles = await glob('**/*.mdx', {
      cwd: sourcePath,
      absolute: false,
      ignore: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.git/**']
    });
    
    for (const file of mdxFiles) {
      discoveredFiles.push({
        path: path.join(sourcePath, file),
        absolutePath: path.join(sourcePath, file),
        relativePath: file,
        type: 'mdx',
        extension: '.mdx',
        repo: extractRepoName(file),
        repoName: extractRepoName(file),
        discovered: true
      });
    }
    logger.info(`Discovered ${mdxFiles.length} .mdx files`);
    
    // Discover .ts files with JSDoc/TSDoc comments (FR6)
    logger.info('Discovering .ts files with JSDoc');
    const tsFiles = await glob('**/*.ts', {
      cwd: sourcePath,
      absolute: false,
      ignore: [
        '**/node_modules/**',
        '**/dist/**',
        '**/build/**',
        '**/.git/**',
        '**/*.test.ts',
        '**/*.spec.ts',
        '**/__tests__/**'
      ]
    });
    
    // Filter .ts files based on JSDoc presence (FR7)
    logger.info(`Filtering ${tsFiles.length} .ts files for JSDoc content`);
    let tsWithDocsCount = 0;
    
    for (const file of tsFiles) {
      const fullPath = path.join(sourcePath, file);
      
      try {
        const content = await fs.readFile(fullPath, 'utf-8');
        
        // Check if file contains JSDoc comments (/** ... */)
        if (hasJSDoc(content)) {
          discoveredFiles.push({
            path: fullPath,
            absolutePath: fullPath,
            relativePath: file,
            type: 'typescript',
            extension: '.ts',
            repo: extractRepoName(file),
            repoName: extractRepoName(file),
            discovered: true,
            hasJSDoc: true
          });
          tsWithDocsCount++;
        }
      } catch (error) {
        logger.warn(`Failed to read file for JSDoc check: ${file}`, {
          file,
          error: error.message
        });
      }
    }
    
    logger.info(`Discovered ${tsWithDocsCount} .ts files with JSDoc/TSDoc`);
    
    // Summary
    logger.info('File extraction completed', {
      total: discoveredFiles.length,
      markdown: mdFiles.length,
      mdx: mdxFiles.length,
      typescript: tsWithDocsCount
    });
    
    return discoveredFiles;
    
  } catch (error) {
    logger.error('File extraction failed', {
      error: error.message,
      sourceDir: sourcePath
    });
    return discoveredFiles; // Return partial results (continue-on-error)
  }
}

/**
 * Extract repository name from file path
 * @param {string} filePath - Relative file path
 * @returns {string} Repository name
 */
function extractRepoName(filePath) {
  // File path format: repo-name/path/to/file.ext
  const segments = filePath.split(path.sep);
  return segments[0] || 'unknown';
}

/**
 * Check if content contains JSDoc/TSDoc comments
 * @param {string} content - File content
 * @returns {boolean} True if JSDoc is present
 */
function hasJSDoc(content) {
  // Match JSDoc block comments: /** ... */
  const jsDocPattern = /\/\*\*[\s\S]*?\*\//;
  return jsDocPattern.test(content);
}
