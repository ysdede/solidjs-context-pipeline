/**
 * Structured logging utility for the pipeline
 * Provides consistent logging with context objects
 */

export const logger = {
  /**
   * Log informational message
   * @param {string} message - Log message
   * @param {object} context - Additional context object
   */
  info(message, context = {}) {
    const timestamp = new Date().toISOString();
    console.log(`[INFO] ${timestamp} ${message}`, context && Object.keys(context).length > 0 ? context : '');
  },

  /**
   * Log warning message
   * @param {string} message - Log message
   * @param {object} context - Additional context object
   */
  warn(message, context = {}) {
    const timestamp = new Date().toISOString();
    console.warn(`[WARN] ${timestamp} ${message}`, context && Object.keys(context).length > 0 ? context : '');
  },

  /**
   * Log error message
   * @param {string} message - Log message
   * @param {object} context - Additional context object
   */
  error(message, context = {}) {
    const timestamp = new Date().toISOString();
    console.error(`[ERROR] ${timestamp} ${message}`, context && Object.keys(context).length > 0 ? context : '');
  }
};
