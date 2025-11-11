# Test Suite Documentation

## Overview

This test suite follows a **dual-loop architecture** pattern, combining on-demand testing with automated CI/CD integration. Tests are organized by concern to maintain clarity and enable targeted execution.

## Architecture

### Test Organization

Tests are structured into three primary categories:

```
tests/
├── functional/       # Core functionality and business logic
├── visual/          # UI/UX consistency and design system compliance
└── accessibility/   # WCAG standards and inclusive design
```

### Dual-Loop Pattern

1. **On-Demand Loop**: Developer-triggered tests via CLI
2. **Automated Loop**: CI/CD pipeline checks on push/PR

## Running Tests

### All Tests
```bash
npm test
```

### By Category
```bash
# Functional tests only
npx playwright test --project=functional

# Visual tests only
npx playwright test --project=visual

# Accessibility tests only
npx playwright test --project=accessibility
```

### Interactive Mode
```bash
npm run test:ui
```

### Headed Mode (Watch Browser)
```bash
npm run test:headed
```

### View Report
```bash
npm run test:report
```

## Test Categories

### Functional Tests (`tests/functional/`)
**Purpose**: Validate core application behavior
- Route navigation
- Component rendering
- Error handling
- State management

**Severity Levels**:
- Critical: Core functionality failures
- High: Feature-specific issues
- Medium: Non-blocking bugs

### Visual Tests (`tests/visual/`)
**Purpose**: Ensure UI/UX consistency
- Component rendering
- Responsive design (mobile, tablet, desktop)
- Theme switching
- Visual regressions

**Severity Levels**:
- Critical: Complete UI breakage
- High: Major visual inconsistencies
- Medium: Minor styling issues

### Accessibility Tests (`tests/accessibility/`)
**Purpose**: WCAG compliance and inclusive design
- Keyboard navigation
- Screen reader compatibility
- Color contrast
- ARIA landmarks
- Semantic HTML

**Severity Levels**:
- Critical: Blocks assistive technology users
- High: Significant usability barriers
- Medium: Best practice violations

## CI/CD Integration

Tests run automatically on:
- Push to `main` or `dev` branches
- Pull requests to `main`

### Artifacts
- HTML reports (retained 30 days)
- Screenshots on failure (retained 7 days)
- Videos on failure (retained 7 days)
- Traces on retry (retained 7 days)

## Configuration

See `playwright.config.js` for:
- Browser selection
- Viewport configurations
- Timeout settings
- Reporter options
- Retry strategies

## Best Practices

1. **Write Descriptive Test Names**: Use clear, action-oriented descriptions
2. **Isolate Tests**: Each test should be independent
3. **Use Page Objects**: For complex interactions (add as needed)
4. **Handle Async Properly**: Always await Playwright operations
5. **Leverage Selectors**: Prefer data-testid over CSS selectors for stability

## Extending Tests

### Adding New Test Categories

1. Create new directory under `tests/`
2. Add project configuration in `playwright.config.js`
3. Update this README

### Adding Browser Coverage

Uncomment Firefox/WebKit projects in `playwright.config.js`:

```js
{
  name: 'firefox',
  use: { ...devices['Desktop Firefox'] },
},
```

## Troubleshooting

### Tests Timing Out
- Increase `actionTimeout` in config
- Check if dev server is running
- Verify network conditions

### Flaky Tests
- Add explicit waits: `waitForLoadState('networkidle')`
- Use `waitForSelector` for dynamic content
- Enable retries in CI environment

### Screenshot Comparison Failures
- Review captured images in `test-results/`
- Update snapshots if changes are intentional
- Check viewport consistency

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Claude Code Workflows](https://github.com/OneRedOak/claude-code-workflows)
