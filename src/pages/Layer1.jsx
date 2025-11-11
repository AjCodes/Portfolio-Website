import Hero from '../components/Layer1/Hero';
import AboutMe from '../components/Layer1/AboutMe';
import Music from '../components/Layer1/Music';
import Projects from '../components/Layer1/Projects';
import EasterEggs from '../components/Layer1/EasterEggs';
import AJRobot from '../components/shared/AJRobot';
import ThemeToggle from '../components/shared/ThemeToggle';

const Layer1 = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Theme Toggle */}
      <ThemeToggle />

      {/* AJ Robot Navigation */}
      <AJRobot />

      {/* Easter Eggs */}
      <EasterEggs />

      {/* Hero Section */}
      <Hero />

      {/* About Me Section (includes Countries) */}
      <AboutMe />

      {/* Music Section */}
      <Music />

      {/* Projects Section */}
      <Projects />

      {/* Footer */}
      <footer className="bg-gray-900 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 mb-4">
            Built with React, Framer Motion, and lots of ☕
          </p>
          <p className="text-gray-500 text-sm">
            © 2025 AJ. All rights reserved.
          </p>
          <div className="mt-6 flex justify-center gap-6">
            <a
              href="https://github.com/AjCodes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-400 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.instagram.com/aboodmadridista/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-400 transition-colors"
            >
              Instagram
            </a>
            <a
              href="mailto:ajabood7788@gmail.com"
              className="text-gray-400 hover:text-purple-400 transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layer1;