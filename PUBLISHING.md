# NPM Publishing Setup

This repository includes GitHub Actions workflows for automated testing and NPM publishing.

## Workflows

### 1. CI Workflow (`.github/workflows/ci.yml`)
- **Triggers**: Push to `main` branch and Pull Requests
- **Actions**:
  - Runs linting
  - Runs tests on Node.js versions 18, 20, and 22
  - Type checking
  - Package building

### 2. NPM Publishing Workflow (`.github/workflows/publish.yml`)
- **Triggers**: 
  - Git tags starting with `v` (e.g., `v1.0.0`)
  - Manual workflow dispatch
- **Actions**:
  - Runs all CI checks
  - Builds the package
  - Publishes to NPM
  - Creates GitHub release

## Setup Instructions

### 1. NPM Token Setup

1. Go to [npmjs.com](https://www.npmjs.com/) and create an account
2. Generate an automation token:
   - Go to "Access Tokens" in your NPM profile
   - Click "Generate New Token"
   - Select "Automation" type
   - Copy the token

3. Add the token to GitHub Secrets:
   - Go to your GitHub repository
   - Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `NPM_TOKEN`
   - Value: Your NPM automation token

### 2. Publishing a New Version

#### Method 1: Using Git Tags (Recommended)

```bash
# Update version in package.json
npm version patch  # or minor/major
git push origin main --tags
```

#### Method 2: Manual Workflow Dispatch

1. Go to GitHub Actions tab in your repository
2. Select "Publish to NPM" workflow
3. Click "Run workflow"
4. Optionally specify a version or leave empty to use current package.json version

### 3. Version Management

The project uses semantic versioning (semver):
- **patch** (1.0.1): Bug fixes
- **minor** (1.1.0): New features (backward compatible)
- **major** (2.0.0): Breaking changes

```bash
# Update version and create tag
npm version patch
npm version minor  
npm version major

# Push tags to trigger publishing
git push origin main --tags
```

### 4. Pre-publish Checks

Before publishing, the workflow automatically:
- ✅ Runs ESLint
- ✅ Runs all tests
- ✅ Performs type checking
- ✅ Builds the package

### 5. Package Configuration

The package is configured with:
- **Access**: Public (can be installed by anyone)
- **Provenance**: Enabled for supply chain security
- **Files**: Only `dist/` folder is published
- **Main entry**: `./dist/module.mjs`
- **Types**: `./dist/types.d.mts`

## Troubleshooting

### Publishing Fails
1. Check that `NPM_TOKEN` secret is correctly set
2. Verify you have publishing rights to the package name
3. Ensure the version number is higher than the current published version

### Tests Fail
1. Run tests locally: `npm test`
2. Check that all dependencies are correctly installed
3. Verify code passes linting: `npm run lint`

### Version Conflicts
If you get a version conflict:
```bash
# Check current published version
npm view nuxt-auth-jwt version

# Update to a higher version
npm version x.y.z
git push origin main --tags
```
