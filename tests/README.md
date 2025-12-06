# Test Suite

This folder contains automated tests for the portfolio website using [Playwright](https://playwright.dev).

## What's in here

- `functional/` - Tests that check if features work correctly
- `visual/` - Tests that check if the UI looks right on different screens
- `accessibility/` - Tests that check if the site is accessible

## How to run tests

```bash
# Run all tests
npm test

# Run tests with browser visible
npm run test:headed

# Run tests with interactive UI
npm run test:ui

# View test results after running
npm run test:report
```

## What the tests check

1. **Homepage loads** - Makes sure the site doesn't crash on load
2. **Navigation works** - Clicking nav links changes the view
3. **Theme toggle** - Dark/light mode switch works
4. **Responsive design** - Site looks good on mobile, tablet, and desktop
5. **Accessibility** - Basic checks for screen readers and keyboard navigation

## Adding new tests

Create a `.spec.js` file in the appropriate folder and follow the existing patterns.
