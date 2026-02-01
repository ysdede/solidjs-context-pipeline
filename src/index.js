import { cloneRepositories } from './cloner.js';
import { extractFiles } from './extractor.js';
import { transformFiles } from './content-transformer.js';
import { classifyFiles } from './classifier.js';
import { generateIndexes } from './indexer.js';
import { validateOutput } from './validator.js';
import { writeOutput, createStructureSummary } from './output.js';
import { logger } from './utils/logger.js';

/**
 * Main entry point for the SolidJS Context Pipeline
 * Orchestrates the sequential execution of all pipeline stages
 */
async function main() {
  logger.info('Starting SolidJS Context Pipeline');

  try {
    // Stage 1: Clone repositories
    logger.info('Stage 1: Cloning repositories');
    await cloneRepositories();


    // Stage 2: Extract files
    logger.info('Stage 2: Extracting files');
    const files = await extractFiles();
    logger.info(`Extracted ${files.length} files for processing`);


    // Stage 3: Transform files
    logger.info('Stage 3: Transforming files');
    const processed = await transformFiles(files);
    logger.info(`Transformed ${processed.length} files`);


    // Stage 4: Classify files
    logger.info('Stage 4: Classifying and organizing files');
    const organized = await classifyFiles(processed);
    logger.info('Classification and organization complete', {
      domains: Object.keys(organized.domains).length,
      totalFiles: organized.files.length
    });


    // Stage 5: Generate indexes
    logger.info('Stage 5: Generating indexes');
    const indexes = await generateIndexes(organized);
    logger.info('Indexes generated successfully');

    // Stage 6: Validate output
    logger.info('Stage 6: Validating output');
    const validation = await validateOutput(organized);
    if (!validation.passed) {
      logger.error('Validation failed', validation);
      // Continue anyway for MVP (can make this strict later)
    }

    // Stage 7: Write output
    logger.info('Stage 7: Writing output');
    const writeResult = await writeOutput(organized);
    logger.info('Output written', writeResult);
    
    // Create structure summary
    await createStructureSummary('ai_docs', organized);

    logger.info('Pipeline execution completed successfully');

  } catch (error) {
    // Continue-on-error: log error but don't crash entire pipeline (NFR5, NFR6)
    logger.error('Pipeline execution failed', {
      error: error.message,
      stack: error.stack
    });
    process.exit(1);
  }
}

// Run the pipeline
main().catch((error) => {
  logger.error('Unhandled error in pipeline', { error: error.message });
  process.exit(1);
});
