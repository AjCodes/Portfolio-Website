# Validation Document – Portfolio Website

## 1. Introduction

The purpose of this validation document is to verify whether the Portfolio Website functions according to the requirements and quality criteria defined earlier in the project. This validation process evaluates the user interface, navigation, responsiveness, accessibility, and key features to ensure the realised product behaves as intended.

Testing was performed through automated Playwright tests, manual device testing, and peer feedback. All results are documented below.

## 2. Validation Method

To validate the website, I used the following approach:

- **Functional testing:** Testing core features (page loading, navigation, content display)
- **Visual testing:** Verifying UI consistency, responsive layouts, and component rendering
- **Accessibility testing:** Checking heading hierarchy, color contrast, keyboard navigation, and screen reader support
- **Cross-device testing:** Manual testing on desktop and mobile devices
- **User feedback:** Gathering opinions from peers who visited the live site

**Standard procedure:**
1. Define expected behaviour
2. Trigger the test case
3. Record actual behaviour
4. Compare & determine pass/fail

## 3. Validation Criteria

### Functional Requirements
- FR1. Homepage must load and display main content
- FR2. Navigation must allow switching between views
- FR3. All views (Home, Projects, Case Study, About) must render correctly
- FR4. Website must handle invalid routes gracefully
- FR5. Website must be responsive on mobile and desktop

### Quality Requirements
- QR1. UI must be visually consistent across views
- QR2. Website must meet basic accessibility standards
- QR3. Interactive elements must be keyboard accessible
- QR4. Images must have alt text

## 4. Automated Test Results (Playwright)

**Test Run Date:** December 2024  
**Total Tests:** 16  
**Passed:** 16  
**Failed:** 0

> **Note:** The Playwright test structure was adapted from [OneRedOak/claude-code-workflows](https://github.com/OneRedOak/claude-code-workflows).

### Functional Tests

| Test | Description | Result |
|------|-------------|--------|
| TC1 | Homepage loads and shows content | ✔ Passed |
| TC2 | Navbar allows switching between views | ✔ Passed |
| TC3 | Handles invalid routes gracefully | ✔ Passed |

### Visual/UI Tests

| Test | Description | Result |
|------|-------------|--------|
| TC4 | Should display navigation bar | ✔ Passed |
| TC5 | Should have consistent color scheme | ✔ Passed |
| TC6 | Should render custom cursor component | ✔ Passed |
| TC7 | Should display theme toggle if present | ✔ Passed |
| TC8 | Should maintain responsive layout on mobile viewport | ✔ Passed |
| TC9 | Should maintain responsive layout on desktop viewport | ✔ Passed |

### Accessibility Tests

| Test | Description | Result |
|------|-------------|--------|
| TC10 | Should have proper heading hierarchy | ✔ Passed |
| TC11 | Should support keyboard navigation | ✔ Passed |
| TC12 | Should have accessible interactive elements | ✔ Passed |
| TC13 | Should have sufficient color contrast | ✔ Passed |
| TC14 | Should provide text alternatives for images | ✔ Passed |
| TC15 | Should be navigable with screen reader | ✔ Passed |
| TC16 | Should announce dynamic content changes | ✔ Passed |

## 5. Manual Testing

### Cross-Device Testing

| Device | Browser | Result | Notes |
|--------|---------|--------|-------|
| Desktop PC | Chrome | ✔ Passed | All features working |
| Mobile (phone) | Chrome | ✔ Passed | Responsive layout works, scrolling fixed |

### Feature Testing

| Feature | Expected | Actual | Result |
|---------|----------|--------|--------|
| Navigation | Click nav items to switch views | Views switch smoothly | ✔ Passed |
| DotGrid background | Responds to mouse movement | Works on desktop, disabled on touch | ✔ Passed |
| Custom cursor | Trail follows mouse | Works on desktop, disabled on mobile | ✔ Passed |
| Journey map | Hover reveals location details | Tooltip appears correctly | ✔ Passed |
| Spotify widget | Shows currently playing song | Displays when music is playing | ✔ Passed |

## 6. User Feedback

### Peer Review

A friend reviewed the live website and provided feedback:

- The overall design looks clean and professional
- Navigation is intuitive and easy to use
- Suggested adding more content to the homepage to make it feel less empty
- Liked the interactive journey map on the About page
- Appreciated the smooth animations and transitions

### Improvements Identified

Based on feedback, the following improvements could be made in future versions:
- Add more content or widgets to the homepage
- Consider adding a blog section
- Add more projects as they are completed

## 7. Summary of Findings

All automated tests passed successfully. The website:
- Loads and renders correctly on all tested devices
- Provides smooth navigation between views
- Meets basic accessibility standards
- Responds appropriately to different viewport sizes
- Functions correctly with disabled features on touch devices

Minor issues identified during development (mobile scrolling, cursor on touch devices, navbar overlap) were resolved and documented in the Realisation Document.

## 8. Conclusion

The Portfolio Website successfully passed all validation tests. The website behaves reliably, meets accessibility requirements, and provides a good user experience across devices. The validation process confirms that the system satisfies Learning Outcome 2 by demonstrating:

- Full realisation of a web application
- Proper application of validation methods
- Accurate documentation of test results
- Iterative improvements based on findings

The product is validated as a functional and technically coherent portfolio website.
