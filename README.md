# My Portfolio Website

A personal portfolio website I built to showcase my projects and skills. Built with React and Vite.

## Features

- **Home page** - Introduction with animated background
- **About section** - Info about me and my journey
- **Projects showcase** - Display of my work and projects
- **Spotify widget** - Shows my current music
- **Dark/Light mode** - Toggle between themes
- **Custom cursor** - Smooth animated cursor effect
- **Responsive design** - Works on mobile, tablet, and desktop

## Tech Stack

- React 19
- Vite (build tool)
- Tailwind CSS (styling)
- Framer Motion (animations)
- Playwright (testing)

## Getting Started

1. **Install dependencies**
```bash
npm install
```

2. **Start development server**
```bash
npm run dev
```

3. **Open browser** at `http://localhost:5173`

## Available Commands

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm test` | Run tests |
| `npm run lint` | Check code quality |

## Project Structure

```
src/
├── components/
│   ├── Layer1/          # Main page components
│   │   ├── FloatingNavbar.jsx
│   │   └── Views/       # Different page views
│   └── shared/          # Reusable components
│       ├── CustomCursor.jsx
│       ├── SpotifyPlayer.jsx
│       └── ThemeToggle.jsx
├── context/             # React Context for state
├── data/                # Static data files
├── pages/
│   └── Layer1.jsx       # Main page
├── App.jsx              # App entry point
└── index.css            # Global styles
```

## Spotify Setup

1. Copy `.env.example` to `.env`
2. Add your Spotify track URL
3. The widget will show track info and album art

## Deployment

The site is deployed on Vercel. Just push to main branch and it auto-deploys.

## License

MIT
