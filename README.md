# Portfolio 2025

A personal portfolio website built with **React**, **Vite**, and **TailwindCSS**. It features smooth animations, a 3D-style interactive background, and a clean glassmorphic UI.

## 🚀 Quick Start in 5 Minutes

1.  **Install Node.js** (if you haven't already).
2.  **Clone this repo** (or download it).
3.  **Open terminal** in the project folder.
4.  **Install dependencies**:
    ```bash
    npm install
    ```
5.  **Run the website**:
    ```bash
    npm run dev
    ```
    > Click the `http://localhost:5173` link in your terminal to see it!

---

## 🧠 Can I learn this in 4 days? (Yes!)

If you want to understand how this works quickly, focus on these 4 concepts. Ignore the complex math files (`DotGrid`, `CustomCursor`) for now—they are just "decoration".

### 1. Components (The Building Blocks)
React is about breaking a page into small pieces.
- Look at `src/components/Layer1/Views/AboutView.jsx`.
- It's just a function that returns HTML-like code (JSX).
- `className="..."` is just styling (Tailwind CSS).

### 2. State (The Memory)
Variables that change the UI used `useState`.
```javascript
const [isPlaying, setIsPlaying] = useState(false);
```
- `isPlaying`: The current value (true/false).
- `setIsPlaying`: The function to change it.
- When you call `setIsPlaying(true)`, React automatically updates the screen.

### 3. Props (Passing Data)
How do we send data to a component? Like attributes in HTML.
```jsx
<ProjectCard project={myProjectData} />
```
Inside `ProjectCard`, we receive it:
```javascript
const ProjectCard = ({ project }) => { ... }
```

### 4. Arrays & Mapping (Lists)
Instead of copy-pasting HTML, we loop through data.
```javascript
{projects.map((project, index) => (
  <ProjectCard key={index} project={project} />
))}
```
This takes the list of projects and creates a card for each one.

---

## 📂 Project Structure

- **`src/App.jsx`**: The main entry point. It loads `Layer1`.
- **`src/pages/Layer1.jsx`**: The main container. It handles switching between Home, About, Projects, and Case Study.
- **`src/components/Layer1/Views/`**: The actual pages (Home, About, Projects, Case Study). edit these to change content!
- **`src/components/shared/`**: Widgets like the Music Player, Navbar, and Cursor.
- **`src/data/projects.js`**: Go here to update your project info, images, and links.

## 🛠 Tech Stack

- **React**: The UI library.
- **Tailwind CSS**: Styling (classes like `flex`, `text-white`, `p-4`).
- **Framer Motion**: For all the smooth animations (`motion.div`).
- **GSAP**: For the background dot grid animation.

## 📝 Editing Content

- **Change Project Info**: Edit `src/data/projects.js`.
- **Change About Text**: Edit `src/components/Layer1/Views/AboutView.jsx`.
- **Change Colors**: Edit `tailwind.config.js` (look for `colors`).

---

*Built with ❤️ in 2025.*
