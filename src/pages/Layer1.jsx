import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingNavbar from '../components/Layer1/FloatingNavbar';
import HomeView from '../components/Layer1/Views/HomeView';
import AboutView from '../components/Layer1/Views/AboutView';
import ProjectsView from '../components/Layer1/Views/ProjectsView';
import CaseStudyView from '../components/Layer1/Views/CaseStudyView';
import SpotifyPlayer from '../components/shared/SpotifyPlayer';
import WavePlayer from '../components/shared/WavePlayer';
import DotGrid from '../components/shared/DotGrid';
import LocationTime from '../components/shared/LocationTime';
import CustomCursor from '../components/shared/CustomCursor';

// Layer1 - Main portfolio page with different views
const Layer1 = () => {
  // Track which view is currently active (home, about, projects, casestudy)
  const [activeView, setActiveView] = useState('home');

  return (
    <div className="relative min-h-screen w-screen overflow-y-auto overflow-x-hidden bg-[#060010] text-[hsl(var(--color-text))] transition-colors duration-300">
      {/* DotGrid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <DotGrid
          dotSize={2}
          gap={20}
          baseColor="#2e1065" // very dark violet
          activeColor="#8b5cf6" // bright violet
          proximity={100}
          shockRadius={200}
          shockStrength={3}
          resistance={600}
          returnDuration={1}
        />
      </div>

      {/* Location and Time Widget - bottom right corner */}
      <LocationTime />

      {/* Wave Music Player (Top Right) */}
      <WavePlayer />

      {/* Spotify Widget (Bottom Left - Controlled by activeView) */}
      <SpotifyPlayer activeView={activeView} />

      {/* Navigation bar at the top */}
      <FloatingNavbar activeView={activeView} setActiveView={setActiveView} />

      {/* Custom Cursor with trail */}
      <CustomCursor />

      {/* Main content - switches between views with animations */}
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
    </div>
  );
};

export default Layer1;