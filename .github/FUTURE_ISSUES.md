# Example Future Issues

Here are some potential future enhancements that could be tracked as GitHub issues:

## Enhancements

### Issue #1: Improve MDX normalization with AST parsing
**Labels:** enhancement, epic-2  
**Description:** Replace regex-based MDX stripping with proper AST parsing using remark-mdx  
**Benefits:** More accurate preservation of code examples, handles complex JSX better  
**Assigned:** AG

### Issue #2: Add TypeScript type extraction
**Labels:** enhancement, epic-2  
**Description:** Extract TypeScript interface and type definitions in addition to JSDoc  
**Benefits:** Captures complete API signatures for primitives  
**Assigned:** CUR

### Issue #3: Implement caching layer
**Labels:** enhancement, performance  
**Description:** Cache processed files to avoid re-processing on subsequent runs  
**Benefits:** Reduces pipeline execution time from minutes to seconds  
**Assigned:** AG

### Issue #4: Add unit tests
**Labels:** testing  
**Description:** Add comprehensive unit tests for all modules  
**Benefits:** Ensures code quality and prevents regressions  
**Assigned:** Both

### Issue #5: Generate embeddings for vector search
**Labels:** enhancement, epic-5  
**Description:** Generate embeddings for all processed documents using OpenAI/local model  
**Benefits:** Enables semantic search and RAG applications  
**Assigned:** CUR

### Issue #6: Add CLI arguments
**Labels:** enhancement, usability  
**Description:** Add command-line arguments for repo selection, output dir, etc.  
**Benefits:** More flexible pipeline configuration  
**Assigned:** AG

### Issue #7: Implement incremental updates
**Labels:** enhancement, performance  
**Description:** Track changes in source repos and only process modified files  
**Benefits:** Faster monthly updates  
**Assigned:** CUR

### Issue #8: Add progress indicators
**Labels:** enhancement, usability  
**Description:** Add progress bars for each pipeline stage  
**Benefits:** Better user experience during long-running operations  
**Assigned:** AG

### Issue #9: Generate interactive documentation site
**Labels:** enhancement, documentation  
**Description:** Build a static site from ai_docs/ for human browsing  
**Benefits:** Useful for human developers, not just AI agents  
**Assigned:** Both

### Issue #10: Support more repositories
**Labels:** enhancement, epic-1  
**Description:** Add support for solid-primitives, solid-app-router, etc.  
**Benefits:** More comprehensive knowledge base  
**Assigned:** AG

## Bug Fixes (if any arise)

### Issue #11: Windows path handling
**Labels:** bug, platform  
**Description:** Fix any remaining Windows-specific path issues  
**Assigned:** CUR

## Example Issue Creation Commands

```bash
# Create an enhancement issue
gh issue create \
  --title "Enhancement: Improve MDX normalization with AST parsing" \
  --label "enhancement,epic-2" \
  --assignee "@AG" \
  --body "Replace regex-based MDX stripping with proper AST parsing..."

# Create a bug issue
gh issue create \
  --title "Bug: Extractor fails on large TypeScript files" \
  --label "bug,epic-2" \
  --assignee "@CUR" \
  --body "When processing files >10MB, extractor throws OOM error..."

# Create a story issue
gh issue create \
  --title "[Epic 6 Story 1] Generate embeddings for documents" \
  --label "story,enhancement,epic-6" \
  --assignee "@CUR" \
  --body "As an AI agent, I want vector embeddings..."
```

## Issue Labels

- `epic-1` through `epic-5`: Epic association
- `bug`: Bug fixes
- `enhancement`: New features
- `story`: Epic story implementation
- `documentation`: Documentation improvements
- `testing`: Test additions
- `performance`: Performance improvements
- `usability`: User experience improvements
- `platform`: Platform-specific issues (Windows, Mac, Linux)
- `priority-high`, `priority-medium`, `priority-low`: Priority levels

## Milestones

- `v1.0`: Initial MVP (COMPLETE)
- `v1.1`: Performance improvements
- `v1.2`: Enhanced parsing
- `v2.0`: Vector embeddings and search
