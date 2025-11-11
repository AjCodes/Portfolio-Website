# 🎨 Two-Layer Interactive Portfolio

A unique, personality-driven portfolio website featuring two distinct layers: an immersive experience layer showcasing creativity and personality, and a professional terminal-style workspace demonstrating technical competence.

![React](https://img.shields.io/badge/React-19-blue?logo=react) ![Vite](https://img.shields.io/badge/Vite-7.1-purple?logo=vite) ![Tailwind](https://img.shields.io/badge/Tailwind-3.4-cyan?logo=tailwindcss)

## ✨ Features

### 🌟 Layer 1: The Experience
A visually stunning, personality-driven interface featuring:

- 🎬 **Hero Section** - Animated gradient background with floating particles and custom typography
- 🗺️ **Interactive Country Map** - SVG visualizations for Yemen, Malaysia, and Netherlands with hover effects
- 🎵 **Spotify Music Widget** - Animated album art display (ready for API integration)
- 🚀 **Projects Showcase** - Featured projects with smooth hover effects
- 🎮 **Easter Eggs**:
  - 🕹️ Konami Code (↑↑↓↓←→←→BA) triggers a CR7 SIUUUU celebration
  - ⚽ Hidden Manchester United badge (bottom-left corner)
  - 🍛 Special Nasi Lemak references
- 🖱️ **Custom Animated Cursor** - Follows mouse with smooth physics-based animations
- 🌓 **Theme Toggle** - Seamless dark/light mode switching
- 💫 **Smooth Animations** - Powered by Framer Motion with scroll-triggered effects

### 💼 Layer 2: The Professional Portal
A terminal/IDE-inspired interface featuring:

- 💻 **Terminal-Style UI** - Clean, code-focused aesthetic inspired by VS Code
- 📑 **Tab Navigation** - Browse through README.md, skills.json, projects.md, and contact.sh
- ⚡ **Skills Display** - Animated progress bars for languages, frameworks, and tools
- 📂 **Projects List** - Code-block style presentation of work
- 📧 **Contact Section** - All contact information in terminal format
- 🤖 **AI Chatbot** - Interactive bot with pre-programmed responses about you

### 🎯 Shared Features
- 🤖 **AJ Robot Navigator** - Floating navigation button to switch between layers
- 📱 **Responsive Design** - Optimized for mobile, tablet, and desktop
- 🔄 **Smooth Transitions** - Seamless routing between layers with loading animations
- ⚡ **Performance Optimized** - Fast load times with optimized bundle size

## 🛠️ Tech Stack

- ⚛️ **React 19** - Modern React with hooks and context
- ⚡ **Vite** - Lightning-fast build tool and dev server
- 🧭 **React Router** - Client-side routing between layers
- 🎬 **Framer Motion** - Smooth animations and transitions
- 🎨 **Tailwind CSS** - Utility-first styling
- 🎲 **Three.js** - 3D graphics capabilities (via postprocessing)
- 🎭 **face-api.js** - Facial recognition features
- 🎭 **Playwright** - End-to-end testing

## 🚀 Getting Started

### 📋 Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/AjCodes/Portfolio-Website.git
cd my-portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser** and navigate to `http://localhost:5173`

## 📜 Available Scripts

- 🔥 `npm run dev` - Start development server with hot reload
- 🏗️ `npm run build` - Build for production
- 👀 `npm run preview` - Preview production build locally
- 🔍 `npm run lint` - Run ESLint for code quality
- 🧪 `npm test` - Run Playwright tests
- 🎯 `npm run test:ui` - Run tests with Playwright UI
- 👁️ `npm run test:headed` - Run tests in headed mode
- 📊 `npm run test:report` - Show test report

## 📁 Project Structure

```
my-portfolio/
├── src/
│   ├── components/
│   │   ├── shared/              # 🔗 Shared components across layers
│   │   │   ├── CustomCursor.jsx
│   │   │   ├── LoadingScreen.jsx
│   │   │   ├── AJRobot.jsx
│   │   │   └── ThemeToggle.jsx
│   │   ├── Layer1/              # 🌟 Experience layer components
│   │   │   ├── Hero.jsx
│   │   │   ├── Countries.jsx
│   │   │   ├── Music.jsx
│   │   │   ├── Projects.jsx
│   │   │   └── EasterEggs.jsx
│   │   └── Layer2/              # 💼 Professional layer components
│   │       ├── Terminal.jsx
│   │       ├── Skills.jsx
│   │       ├── ProjectsList.jsx
│   │       ├── Contact.jsx
│   │       └── Chatbot.jsx
│   ├── hooks/                   # 🪝 Custom React hooks
│   │   ├── useMousePosition.js
│   │   ├── useKonamiCode.js
│   │   └── useTheme.js
│   ├── data/                    # 📊 Data files
│   │   ├── countries.js
│   │   ├── projects.js
│   │   ├── skills.js
│   │   └── chatbotResponses.js
│   ├── pages/                   # 📄 Main page components
│   │   ├── Layer1.jsx
│   │   └── Layer2.jsx
│   ├── App.jsx                  # 🏠 Main app with routing
│   ├── index.css                # 🎨 Global styles
│   └── main.jsx                 # 🚪 Entry point
├── public/                      # 📦 Static assets
├── dist/                        # 📦 Production build output
└── package.json
```

## 🎨 Customization

### ✏️ Update Your Information

Edit these files to personalize the portfolio:

- 📝 **`src/data/skills.js`** - Your skills, bio, and about me section
- 🚀 **`src/data/projects.js`** - Your projects and work
- 🗺️ **`src/data/countries.js`** - Country information and experiences
- 💬 **`src/data/chatbotResponses.js`** - Chatbot responses and personality

### 🎨 Modify Styling

- 🎨 **Colors & Theme**: Edit Tailwind configuration in `tailwind.config.js`
- ✨ **Custom Styles**: Add global styles in `src/index.css`
- 🎬 **Animations**: Adjust Framer Motion parameters in component files

## 🎮 Easter Eggs

Try to find all the hidden features:

1. 🕹️ **Konami Code**: Press ↑↑↓↓←→←→BA for a special surprise
2. ⚽ **Man United Badge**: Look for the hidden badge in the bottom-left corner
3. 🍛 **Nasi Lemak**: Special Malaysian food references throughout

## 🌐 Deployment

### 🚀 Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com) and import your repository
3. Vercel will auto-detect Vite configuration
4. Click Deploy and you're live! 🎉

### 📡 Netlify

1. Push your code to GitHub
2. Visit [netlify.com](https://netlify.com) and create a new site from Git
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy! 🎉

### 📦 Manual Deployment

```bash
npm run build
```

Upload the contents of the `dist/` folder to any static hosting service.

## 🌐 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

All modern browsers with ES6+ support.

## 🔮 Future Enhancements

- 🎵 **Spotify Integration**: Connect to Spotify API for real-time "Now Playing" data
- 📝 **Blog Section**: Add a developer blog or article section
- 🎮 **More Easter Eggs**: Additional hidden features and interactions
- 🤖 **AI Chatbot Upgrade**: Integrate with OpenAI API for dynamic conversations
- 📊 **Analytics**: Add visitor tracking and insights

## 🤝 Contributing

This is a personal portfolio project, but feel free to:
- 🐛 Report bugs or issues
- 💡 Suggest new features or improvements
- 🍴 Fork and create your own version

## 📄 License

This project is open source and available under the MIT License.

## 📬 Contact

- 📧 **Email**: [ajabood7788@gmail.com](mailto:ajabood7788@gmail.com)
- 💻 **GitHub**: [@AjCodes](https://github.com/AjCodes)
- 📸 **Instagram**: [@aboodmadridista](https://www.instagram.com/aboodmadridista/)
- 🎵 **Spotify**: [My Profile](https://open.spotify.com/user/1282671995)

## 🙏 Acknowledgments

- ⚛️ Built with React, Vite, and Tailwind CSS
- 🎬 Animations powered by Framer Motion
- 💡 Inspired by creative developer portfolios and terminal aesthetics
- 🌟 Special thanks to the open-source community

---

<div align="center">

**Made with ❤️ and lots of ☕**

🌐 Visit the live site: ajcodex.com

⭐ **If you like this project, give it a star!** ⭐

</div>
