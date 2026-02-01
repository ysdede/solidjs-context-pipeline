/**
 * Metadata generation helpers for YAML frontmatter
 */

/**
 * Generate YAML frontmatter string
 * @param {object} metadata - Metadata object
 * @returns {string} YAML frontmatter string
 */
export function generateFrontmatter(metadata) {
  const lines = ['---'];
  
  for (const [key, value] of Object.entries(metadata)) {
    if (value !== undefined && value !== null) {
      // Escape special characters in YAML values
      const escapedValue = typeof value === 'string' && (value.includes(':') || value.includes('\n'))
        ? `"${value.replace(/"/g, '\\"')}"`
        : value;
      lines.push(`${key}: ${escapedValue}`);
    }
  }
  
  lines.push('---');
  return lines.join('\n');
}

/**
 * Format timestamp as ISO 8601
 * @param {Date} date - Date object (defaults to now)
 * @returns {string} ISO 8601 timestamp
 */
export function formatTimestamp(date = new Date()) {
  return date.toISOString();
}

/**
 * Create metadata object for a processed file
 * @param {object} options - Metadata options
 * @param {string} options.sourceRepo - Source repository name
 * @param {string} options.sourcePath - Source file path
 * @param {string} options.domain - Content domain
 * @param {string} [options.primitive] - Primitive name if applicable
 * @returns {object} Metadata object
 */
export function createMetadata({ sourceRepo, sourcePath, domain, primitive }) {
  return {
    source_repo: sourceRepo,
    source_path: sourcePath,
    domain: domain,
    primitive: primitive,
    extracted_at: formatTimestamp()
  };
}
