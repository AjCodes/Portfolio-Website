import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingNavbar from '../components/Layer1/FloatingNavbar';
import HomeView from '../components/Layer1/Views/HomeView';
import AboutView from '../components/Layer1/Views/AboutView';
import ProjectsView from '../components/Layer1/Views/ProjectsView';
import CaseStudyView from '../components/Layer1/Views/CaseStudyView';
import AJRobot from '../components/shared/AJRobot';
import ThemeToggle from '../components/shared/ThemeToggle';
import SeamlessBackground from '../components/shared/SeamlessBackground';
import CustomCursor from '../components/shared/CustomCursor';
import SpotifyPlayer from '../components/shared/SpotifyPlayer';

const Layer1 = ({ onSwitch }) => {
  const [activeView, setActiveView] = useState('home');

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[hsl(var(--color-bg))] text-[hsl(var(--color-text))] transition-colors duration-300">
      <CustomCursor />
      <SpotifyPlayer />
      {/* Global Background */}
      <SeamlessBackground />

      {/* Floating Navbar */}
      <FloatingNavbar activeView={activeView} setActiveView={setActiveView} />

      {/* Main Content Area - Single Screen View Switcher */}
      <main className="relative z-10 h-full w-full pt-20">
        <AnimatePresence mode="wait">
          {activeView === 'home' && (
            <motion.div
              key="home"
              className="h-full w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <HomeView setActiveView={setActiveView} />
            </motion.div>
          )}

          {activeView === 'about' && (
            <motion.div
              key="about"
              className="h-full w-full"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <AboutView />
            </motion.div>
          )}

          {activeView === 'projects' && (
            <motion.div
              key="projects"
              className="h-full w-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <ProjectsView />
            </motion.div>
          )}

          {activeView === 'casestudy' && (
            <motion.div
              key="casestudy"
              className="h-full w-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <CaseStudyView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Shared Components */}
      <AJRobot onSwitch={onSwitch} isLayer1={true} />
      <ThemeToggle />
    </div>
  );
};

export default Layer1;