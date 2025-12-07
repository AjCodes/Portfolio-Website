# Realization Document

## Summary

The Portfolio Website is a fully functional personal website built with React 19 and Vite, featuring an interactive dark-themed design with smooth animations. The site showcases my projects, tells my story through an interactive journey map, and includes dynamic features like a Spotify "now playing" widget and custom cursor effects.

**Key Achievements:**
- Fully responsive React SPA with four main views (Home, Projects, Case Study, About)
- Interactive DotGrid background that responds to mouse movement
- Journey Map showing my path from Yemen → Malaysia → Netherlands
- Spotify API integration displaying currently playing music
- Custom cursor trail effect (disabled on touch devices)
- Deployed to Vercel with automatic GitHub deployments

## 1. Implementation & Codebase

### 1.1 Project Structure

```
my-portfolio/
├── src/
│   ├── App.jsx                    # Root component
│   ├── main.jsx                   # Entry point
│   ├── index.css                  # Global styles & CSS variables
│   ├── components/
│   │   ├── Layer1/
│   │   │   ├── FloatingNavbar.jsx # Fixed navigation bar
│   │   │   └── Views/
│   │   │       ├── HomeView.jsx   # Landing page with hero
│   │   │       ├── ProjectsView.jsx
│   │   │       ├── CaseStudyView.jsx
│   │   │       └── AboutView.jsx  # Bio, map, tech stack
│   │   └── shared/
│   │       ├── CustomCursor.jsx   # Mouse trail effect
│   │       ├── DotGrid.jsx        # Interactive background
│   │       ├── SpotifyPlayer.jsx  # Now playing widget
│   │       ├── WavePlayer.jsx     # Audio visualizer
│   │       └── LocationTime.jsx   # Location/time display
│   ├── context/
│   │   └── SpotifyContext.jsx     # Spotify API state
│   ├── data/
│   │   ├── projects.js            # Project content
│   │   └── skills.js              # Tech stack data
│   └── pages/
│       └── Layer1.jsx             # Main layout controller
├── server/                         # Spotify token proxy
├── tests/                          # Playwright tests
└── api/                            # Vercel serverless functions
```

### 1.2 Component Breakdown

| Component | Purpose |
|-----------|---------|
| `Layer1.jsx` | Controls which view is active, manages navigation state |
| `FloatingNavbar.jsx` | Fixed navigation with animated active indicator |
| `HomeView.jsx` | Hero section with name, typewriter tagline, CTAs |
| `ProjectsView.jsx` | Project cards grid, imports data from `projects.js` |
| `CaseStudyView.jsx` | Case study cards with modal detail view |
| `AboutView.jsx` | Bio, journey map, social links, tech stack |
| `DotGrid.jsx` | Canvas-based animated background |
| `CustomCursor.jsx` | Mouse trail effect, disabled on touch |
| `SpotifyPlayer.jsx` | Now playing widget with album art |

### 1.3 Key Features Implementation

**DotGrid Background:**
- Canvas-based animation using GSAP
- Dots respond to mouse proximity
- Creates "ripple" effect on movement

**Journey Map:**
- SVG world map with interactive location dots
- Hover reveals details for each location
- Animated dot travels along the path

**Spotify Integration:**
- Uses Spotify Web API for "now playing" data
- Token refresh handled by serverless function
- Displays album art, track name, artist

## 2. Installed Software & Dependencies

### 2.1 Production Dependencies

| Package | Purpose |
|---------|---------|
| `react` / `react-dom` | UI framework (v19) |
| `framer-motion` | Page transitions and animations |
| `gsap` | DotGrid canvas animations |
| `@vercel/speed-insights` | Performance monitoring |
| `dotenv` | Environment variable management |

### 2.2 Development Dependencies

| Package | Purpose |
|---------|---------|
| `vite` | Build tool and dev server |
| `tailwindcss` | Utility-first CSS framework |
| `@playwright/test` | End-to-end testing |
| `eslint` | Code linting |
| `autoprefixer` / `postcss` | CSS processing |

## 3. Quality Criteria

### 3.1 Code Quality
- **Component structure:** Modular components with clear separation of concerns
- **Data separation:** Content stored in data files, not hardcoded in components
- **Context for global state:** Theme and Spotify state managed via React Context
- **Responsive design:** TailwindCSS breakpoints for mobile/tablet/desktop

### 3.2 Performance
- **Touch detection:** Custom cursor disabled on mobile to prevent performance issues
- **Lazy loading:** Views only render when active
- **Optimized builds:** Vite production builds with tree-shaking

### 3.3 Testing
- **Playwright tests:** Automated browser tests for key user flows
- **Manual testing:** Verified on Chrome, Firefox, Safari, and mobile devices

## 4. Setup Guide

### 4.1 Prerequisites
- Node.js v18+
- npm or bun

### 4.2 Local Development

```bash
# 1. Clone the repository
git clone https://github.com/AjCodes/my-portfolio.git
cd my-portfolio

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Edit .env with your Spotify API credentials

# 4. Start dev server
npm run dev
# Runs on http://localhost:5173
```

### 4.3 Building for Production

```bash
# Build
npm run build

# Preview production build locally
npm run preview
```

### 4.4 Running Tests

```bash
# Run Playwright tests
npm run test

# Run with UI
npm run test:ui
```

## 5. Challenges & Solutions

### 5.1 Mobile Scrolling Not Working
**Problem:** The website wouldn't scroll on mobile devices.

**Why:** The main wrapper divs had `h-screen overflow-hidden`, which locked the viewport height and prevented scrolling.

**Solution:** Changed to `min-h-screen overflow-x-hidden` on `App.jsx` and `min-h-screen overflow-y-auto` on `Layer1.jsx`.

### 5.2 Custom Cursor Behaving Erratically on Mobile
**Problem:** The custom cursor appeared on touch devices and followed touch events erratically.

**Why:** There was no detection for touch devices, so the cursor rendered on all devices.

**Solution:** Added touch detection using `window.matchMedia("(pointer: coarse)")` and return `null` if touch device detected.

### 5.3 Homepage Content Overlapping Navbar
**Problem:** The "Hey, I'm AJ" text was overlapping with the FloatingNavbar.

**Why:** A negative top margin (`mt-[-40px]`) was pulling content upward.

**Solution:** Removed negative margin, added proper padding (`pt-28 pb-48`) to the container.

### 5.4 Spotify Token Expiring
**Problem:** Spotify access tokens expire after 1 hour, breaking the now playing widget.

**Solution:** Created a serverless function to handle token refresh automatically.

## 6. Demo Evidence

### 6.1 Live Website
The portfolio is deployed and live at: **[ajcodex.com](https://ajcodex.com)**

### 6.2 Key Features Demo
- **Homepage:** Gradient text animation, typewriter effect, DotGrid background
- **Projects:** Card grid with hover effects, tech stack pills
- **About:** Interactive journey map, social links, Spotify widget
- **Responsive:** Fully functional on mobile devices

## 7. Repository & Resources

**GitHub Repository:** [github.com/AjCodes/my-portfolio](https://github.com/AjCodes/my-portfolio)

**Key Files:**
- Views: `src/components/Layer1/Views/`
- Shared components: `src/components/shared/`
- Data: `src/data/projects.js`
- Context: `src/context/`
