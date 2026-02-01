import { logger } from './utils/logger.js';
import { CORE_PRIMITIVES } from './utils/constants.js';

/**
 * Story 5.1: Completeness validation module
 * FR26: Extract and document all core reactivity primitives
 * FR27: Ensure 100% coverage of core SolidJS primitives
 * FR28: Include accurate API signatures
 */

/**
 * Validate completeness of core primitives coverage
 * @param {object} organized - Organized files structure from classifier
 * @returns {Promise<object>} Validation result
 */
export async function validateCompleteness(organized) {
    logger.info('Starting completeness validation');
    
    const { files } = organized;
    
    // Find all primitives mentioned in files
    const foundPrimitives = new Set();
    
    files.forEach(file => {
        // Check if file has primitive in classification
        if (file.classification && file.classification.primitive) {
            foundPrimitives.add(file.classification.primitive);
        }
        
        // Also check content for primitive mentions
        if (file.content) {
            CORE_PRIMITIVES.forEach(primitive => {
                if (file.content.includes(primitive)) {
                    foundPrimitives.add(primitive);
                }
            });
        }
    });
    
    // Check coverage
    const missingPrimitives = CORE_PRIMITIVES.filter(p => !foundPrimitives.has(p));
    const coverage = (foundPrimitives.size / CORE_PRIMITIVES.length) * 100;
    
    const result = {
        total: CORE_PRIMITIVES.length,
        found: foundPrimitives.size,
        missing: missingPrimitives.length,
        coverage: coverage.toFixed(2) + '%',
        foundPrimitives: Array.from(foundPrimitives).sort(),
        missingPrimitives: missingPrimitives.sort(),
        passed: missingPrimitives.length === 0
    };
    
    logger.info('Completeness validation complete', {
        coverage: result.coverage,
        found: result.found,
        missing: result.missing,
        passed: result.passed
    });
    
    if (!result.passed) {
        logger.warn('Missing core primitives', { missingPrimitives });
    }
    
    return result;
}

/**
 * Story 5.2: Validate output quality
 * NFR1: 100% accurate API signatures
 * NFR2: Consistent and predictable structure
 * NFR3: Complete and navigable indexes
 * @param {object} organized - Organized files structure
 * @returns {Promise<object>} Quality validation result
 */
export async function validateOutputQuality(organized) {
    logger.info('Starting output quality validation');
    
    const issues = [];
    const { files, domains } = organized;
    
    // Check 1: All files have metadata frontmatter (NFR1, NFR2)
    let filesWithoutMetadata = 0;
    files.forEach(file => {
        if (!file.metadata || !file.metadata.source_repo || !file.metadata.source_path) {
            filesWithoutMetadata++;
            issues.push(`File missing metadata: ${file.relativePath}`);
        }
    });
    
    // Check 2: All files have classification
    let filesWithoutClassification = 0;
    files.forEach(file => {
        if (!file.classification || !file.classification.domain) {
            filesWithoutClassification++;
            issues.push(`File missing classification: ${file.relativePath}`);
        }
    });
    
    // Check 3: Domain structure consistency (NFR2)
    const domainNames = Object.keys(domains);
    if (domainNames.length === 0) {
        issues.push('No domains found');
    }
    
    // Check 4: Files have content
    let filesWithoutContent = 0;
    files.forEach(file => {
        if (!file.content || file.content.trim().length === 0) {
            filesWithoutContent++;
            issues.push(`File has no content: ${file.relativePath}`);
        }
    });
    
    const result = {
        totalFiles: files.length,
        domains: domainNames.length,
        filesWithoutMetadata,
        filesWithoutClassification,
        filesWithoutContent,
        issues: issues.slice(0, 10), // Limit to first 10 issues
        totalIssues: issues.length,
        passed: issues.length === 0
    };
    
    logger.info('Output quality validation complete', {
        totalFiles: result.totalFiles,
        domains: result.domains,
        issues: result.totalIssues,
        passed: result.passed
    });
    
    if (!result.passed) {
        logger.warn('Quality issues found', { 
            count: result.totalIssues,
            sample: result.issues 
        });
    }
    
    return result;
}

/**
 * Run all validations
 * @param {object} organized - Organized files structure
 * @returns {Promise<object>} Complete validation result
 */
export async function validateOutput(organized) {
    logger.info('Running comprehensive validation');
    
    const completeness = await validateCompleteness(organized);
    const quality = await validateOutputQuality(organized);
    
    const overallPassed = completeness.passed && quality.passed;
    
    const result = {
        completeness,
        quality,
        passed: overallPassed,
        timestamp: new Date().toISOString()
    };
    
    if (overallPassed) {
        logger.info('✅ All validations passed');
    } else {
        logger.error('❌ Validation failed', {
            completeness: completeness.passed,
            quality: quality.passed
        });
    }
    
    return result;
}
