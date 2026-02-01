# SolidJS Context Pipeline

Knowledge Ingestion Pipeline for SolidJS - extracts and structures documentation from GitHub repositories into AI-ready format.

## Overview

This pipeline extracts documentation from SolidJS organization repositories, transforms it into structured Markdown with metadata, and organizes it hierarchically for optimal AI agent consumption.

## Features

- **Repository Acquisition**: Clone SolidJS repos using GitHub CLI
- **Content Extraction**: Discover and extract `.md`, `.mdx`, and `.ts` files with JSDoc
- **Content Transformation**: Normalize MDX to Markdown, extract JSDoc comments
- **Content Organization**: Classify and organize content into hierarchical domain structure
- **Index Generation**: Create navigable indexes optimized for AI agent discovery
- **Validation**: Ensure 100% coverage of core SolidJS primitives

## Prerequisites

- Node.js (v16 or higher)
- GitHub CLI (`gh`) installed and authenticated

## Installation

```bash
npm install
```

## Usage

```bash
npm start
```

This will:
1. Clone SolidJS repositories into `raw_sources/`
2. Extract and transform documentation files
3. Organize content into hierarchical structure
4. Generate indexes
5. Validate completeness
6. Output to `ai_docs/` directory

## Project Structure

```
solidjs-context-pipeline/
├── src/
│   ├── index.js          # Main entry point
│   ├── cloner.js         # Repository cloning
│   ├── extractor.js      # File discovery
│   ├── transformer.js   # Content transformation
│   ├── classifier.js     # Domain classification
│   ├── indexer.js        # Index generation
│   ├── validator.js      # Completeness validation
│   ├── output.js         # Output management
│   └── utils/            # Utility modules
├── raw_sources/          # Cloned repositories (gitignored)
└── ai_docs/              # Output directory (gitignored)
```

## License

ISC
