import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import { logger } from './utils/logger.js';
import { resolvePath } from './utils/paths.js';
import { PRIORITY_REPOS } from './utils/constants.js';

/**
 * Clone SolidJS repositories using GitHub CLI
 * @param {string[]} repos - List of repository names to clone (defaults to priority repos)
 * @param {string} outputDir - Output directory for cloned repos (defaults to 'raw_sources')
 * @returns {Promise<string[]>} Array of cloned repository paths
 */
export async function cloneRepositories(repos = PRIORITY_REPOS, outputDir = 'raw_sources') {
  const outputPath = resolvePath(outputDir);
  
  // Ensure output directory exists
  await fs.ensureDir(outputPath);
  
  logger.info('Starting repository cloning', { repos, outputDir: outputPath });
  
  const clonedRepos = [];
  
  for (const repo of repos) {
    const repoPath = path.join(outputPath, repo);
    
    // Check if repo already exists
    if (await fs.pathExists(repoPath)) {
      logger.warn(`Repository already exists, skipping: ${repo}`, { path: repoPath });
      clonedRepos.push(repoPath);
      continue;
    }
    
    try {
      logger.info(`Cloning repository: ${repo}`, { repo, path: repoPath });
      
      // Clone using GitHub CLI
      const cloneUrl = `solidjs/${repo}`;
      execSync(`gh repo clone ${cloneUrl} ${repoPath}`, {
        stdio: 'inherit',
        cwd: outputPath
      });
      
      clonedRepos.push(repoPath);
      logger.info(`Successfully cloned: ${repo}`, { repo, path: repoPath });
      
    } catch (error) {
      // Handle network failures gracefully (NFR4)
      logger.error(`Failed to clone repository: ${repo}`, {
        repo,
        error: error.message,
        path: repoPath
      });
      // Continue processing other repos (continue-on-error strategy)
    }
  }
  
  logger.info('Repository cloning completed', {
    total: repos.length,
    successful: clonedRepos.length,
    outputDir: outputPath
  });
  
  return clonedRepos;
}
