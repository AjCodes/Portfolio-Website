# AJ's Portfolio

My personal portfolio website built with React, Vite, and TailwindCSS.

## Live Demo
[ajcodex.com](https://ajcodex.com)

## Tech Stack

- **React 19** – UI library
- **Vite** – Build tool
- **TailwindCSS** – Styling
- **Framer Motion** – Animations
- **GSAP** – Background effects

## Features

- Interactive dot grid background with mouse tracking
- Smooth page transitions between views
- Spotify integration showing recently played tracks
- Custom cursor with trail effect
- World map showing my journey
- Case study modal with detailed project breakdowns

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Layer1/
│   │   ├── FloatingNavbar.jsx
│   │   └── Views/
│   │       ├── HomeView.jsx
│   │       ├── AboutView.jsx
│   │       ├── ProjectsView.jsx
│   │       └── CaseStudyView.jsx
│   └── shared/
│       ├── DotGrid.jsx
│       ├── CustomCursor.jsx
│       ├── SpotifyPlayer.jsx
│       └── WavePlayer.jsx
├── context/
│   ├── SpotifyContext.jsx
│   └── ThemeContext.jsx
├── data/
│   └── projects.js
└── pages/
    └── Layer1.jsx
```

## Environment Variables

For Spotify integration, create a `.env` file:

```
VITE_SPOTIFY_CLIENT_ID=your_client_id
VITE_SPOTIFY_CLIENT_SECRET=your_client_secret
VITE_SPOTIFY_REFRESH_TOKEN=your_refresh_token
```

## License

MIT
