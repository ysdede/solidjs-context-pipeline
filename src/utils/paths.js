import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Path handling utilities for cross-platform support
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Get the project root directory
 * @returns {string} Project root path
 */
export function getProjectRoot() {
  return path.resolve(__dirname, '../..');
}

/**
 * Join paths using path.join() for cross-platform compatibility
 * @param {...string} pathSegments - Path segments to join
 * @returns {string} Joined path
 */
export function joinPaths(...pathSegments) {
  return path.join(...pathSegments);
}

/**
 * Normalize a path
 * @param {string} filePath - Path to normalize
 * @returns {string} Normalized path
 */
export function normalizePath(filePath) {
  return path.normalize(filePath);
}

/**
 * Get relative path from project root
 * @param {string} filePath - Absolute or relative path
 * @returns {string} Relative path from project root
 */
export function getRelativePath(filePath) {
  const projectRoot = getProjectRoot();
  return path.relative(projectRoot, path.resolve(filePath));
}

/**
 * Resolve path relative to project root
 * @param {...string} pathSegments - Path segments
 * @returns {string} Resolved absolute path
 */
export function resolvePath(...pathSegments) {
  const projectRoot = getProjectRoot();
  return path.resolve(projectRoot, ...pathSegments);
}
