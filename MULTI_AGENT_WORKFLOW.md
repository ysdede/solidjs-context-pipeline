# Multi-Agent Git Workflow Guide

## Overview

This repository uses Git as a coordination mechanism between multiple AI agents (CUR and AG) working collaboratively, similar to human developer workflows.

## Agents

- **CUR (Agent 1)**: Senior/PM - Primary IDE session
- **AG (Agent 2)**: Developer - Secondary IDE session
- **Coordination**: Via Git commits, issues, PRs, and `.agent_sync.md`

## Git Workflow

### 1. Feature Development

**Agent starts new feature:**
```bash
git checkout -b feature/epic-X-story-Y
# Work on the story
git add .
git commit -m "feat(epic-X): Implement Story Y

Description of changes...

Closes #issue-number"
```

### 2. Pull Requests

**Create PR for review:**
```bash
git push origin feature/epic-X-story-Y
# Create PR via GitHub CLI or manually
gh pr create --title "Epic X Story Y: Feature Name" --body "Description..."
```

**Review process:**
- Other agent reviews the PR
- Comments on specific lines if issues found
- Approves or requests changes
- Merges when approved

### 3. Issues as Task Tracking

**Create issue for new work:**
```bash
gh issue create --title "Epic X Story Y: Task Name" --body "
## Story
As a [user], I want [feature], so that [benefit]

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2

## Assigned To
@AG or @CUR

## Dependencies
Depends on #issue-number
"
```

### 4. Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature (Epic story implementation)
- `fix`: Bug fix
- `refactor`: Code refactoring
- `docs`: Documentation changes
- `test`: Test additions/changes
- `chore`: Maintenance tasks

**Example:**
```
feat(extractor): Add JSDoc discovery for TypeScript files

Implements Story 2.1 - File Discovery Module
- Discovers .md, .mdx, and .ts files
- Filters .ts files based on JSDoc presence
- Uses glob for pattern matching

Closes #5
Co-authored-by: AG <agent2@solidjs-pipeline>
```

### 5. Branch Strategy

**Main branches:**
- `main`: Production-ready code
- `develop`: Integration branch for features

**Feature branches:**
- `feature/epic-1-story-1`: Specific story implementation
- `feature/epic-2-extractor`: Module implementation
- `bugfix/extractor-path-issue`: Bug fixes

### 6. Agent Coordination via Git

**Before starting work:**
```bash
# 1. Pull latest changes
git pull origin develop

# 2. Check .agent_sync.md for status
cat .agent_sync.md

# 3. Check open PRs
gh pr list

# 4. Check assigned issues
gh issue list --assignee @me
```

**During work:**
```bash
# Commit frequently
git add .
git commit -m "wip: Progress on Story X"

# Push to share progress
git push origin feature/epic-X-story-Y
```

**After completion:**
```bash
# Final commit
git add .
git commit -m "feat(module): Complete Story X

Full description...

Closes #issue-number"

# Create PR
gh pr create --title "Epic X Story Y: Complete" --body "..."

# Update .agent_sync.md
# Commit and push
```

### 7. Code Review Process

**Reviewer checklist:**
- [ ] Code follows architecture patterns
- [ ] All acceptance criteria met
- [ ] Tests pass (when implemented)
- [ ] No breaking changes
- [ ] Documentation updated
- [ ] Linter passes

**Review commands:**
```bash
# Check out PR branch
gh pr checkout PR-NUMBER

# Review changes
git diff develop..HEAD

# Run tests
npm test

# Approve or request changes
gh pr review PR-NUMBER --approve
gh pr review PR-NUMBER --request-changes --body "Comments..."
```

### 8. Merge Strategy

**Squash and merge:**
- Squash commits into single commit
- Keep history clean
- Preserve co-author information

**Example merge commit:**
```
feat(epic-2): Complete Content Extraction & Transformation (#10)

* Story 2.1: File Discovery Module
* Story 2.2: MDX Normalization
* Story 2.3: JSDoc Extraction
* Story 2.4: Metadata Injection

Co-authored-by: CUR <agent1@solidjs-pipeline>
Co-authored-by: AG <agent2@solidjs-pipeline>
```

### 9. Issue Templates

**Story Issue Template:**
```markdown
## Story
As a [user type], I want [capability], so that [benefit]

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Technical Notes
- Implementation details
- Dependencies
- Architecture considerations

## Assigned To
@agent-username

## Epic
Epic X: [Epic Name]

## Dependencies
- Depends on #issue-number
- Blocks #issue-number
```

**Bug Issue Template:**
```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- Node version: X.X.X
- OS: Windows/Mac/Linux

## Assigned To
@agent-username

## Priority
High/Medium/Low
```

### 10. Communication Channels

**Ranked by formality:**
1. **PR Comments**: Code-specific discussions
2. **Issue Comments**: Feature/bug discussions
3. **Commit Messages**: Implementation notes
4. **`.agent_sync.md`**: Real-time status updates
5. **Serena Memory**: Persistent coordination state

## Examples

### Example 1: AG starts new story

```bash
# AG checks what's available
cat .agent_sync.md
gh issue list --label "status:ready"

# AG claims Story 4.1
gh issue edit 15 --add-assignee @AG
git checkout -b feature/epic-4-story-1
# ... implements indexer.js ...
git add src/indexer.js
git commit -m "feat(indexer): Implement root index generation

Implements Story 4.1 - Generate Root Index File
- Creates ai_docs/index.md in Markdown format
- Lists all domains with descriptions
- Includes navigation links

Closes #15"

# Create PR
gh pr create --title "Epic 4 Story 1: Root Index Generation" \
  --body "Implements #15 - root index file generation"
```

### Example 2: CUR reviews AG's PR

```bash
# CUR sees PR notification
gh pr list

# Check out and review
gh pr checkout 12
npm start  # Test it

# Found issue - comment on specific line
gh pr comment 12 --body "Line 45: Missing error handling for fs.writeFile"

# AG fixes
# CUR approves
gh pr review 12 --approve --body "LGTM! Great work on the indexer."

# CUR merges
gh pr merge 12 --squash
```

### Example 3: Bug discovered during integration

```bash
# CUR finds bug in extractor
gh issue create --title "Bug: Extractor missing absolutePath field" \
  --body "The extractor doesn't include absolutePath in file objects, causing transformer to fail.

## Steps to Reproduce
Run pipeline with npm start

## Expected
Files should have absolutePath field

## Actual
TypeError: path undefined

## Fix
Add absolutePath to file objects in extractor.js lines 30-35" \
  --label bug --assignee @CUR

# CUR fixes immediately
git checkout -b bugfix/extractor-absolute-path
# ... fix ...
git commit -m "fix(extractor): Add absolutePath field to file objects

Fixes #20 - transformer was expecting absolutePath
but extractor only provided path field"

gh pr create --title "Fix: Add absolutePath to extractor" --body "Fixes #20"
```

## Benefits

1. **Clear history**: Git log shows who did what
2. **Code review**: PRs enable quality checks
3. **Issue tracking**: GitHub issues track work
4. **Blame/credit**: Co-authorship properly attributed
5. **Rollback**: Easy to revert if needed
6. **Documentation**: PR/issue threads document decisions
7. **Parallel work**: Multiple branches prevent conflicts

## Tools

- `gh`: GitHub CLI for PR/issue management
- `git`: Version control
- `.agent_sync.md`: Real-time status board
- Serena memory: Persistent state
