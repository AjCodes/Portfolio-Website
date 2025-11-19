import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { WindowProvider, useWindow } from '../context/WindowManagerContext';
import Taskbar from '../components/Layer2/OS/Taskbar';
import DesktopIcon from '../components/Layer2/OS/DesktopIcon';
import Window from '../components/Layer2/OS/Window';
import Skills from '../components/Layer2/Skills';
import ProjectsList from '../components/Layer2/ProjectsList';
import Contact from '../components/Layer2/Contact';
import AJRobot from '../components/shared/AJRobot';
import ThemeToggle from '../components/shared/ThemeToggle';
import { aboutMe } from '../data/skills';

// Desktop Content Component
const Desktop = () => {
  const { openWindow, windows } = useWindow();
  const [isBooting, setIsBooting] = useState(true);
  const [bootStep, setBootStep] = useState(0);

  // Boot sequence
  useEffect(() => {
    const bootSequence = async () => {
      await new Promise(r => setTimeout(r, 500));
      setBootStep(1); // BIOS
      await new Promise(r => setTimeout(r, 1000));
      setBootStep(2); // Loading OS
      await new Promise(r => setTimeout(r, 1500));
      setBootStep(3); // Welcome
      await new Promise(r => setTimeout(r, 800));
      setIsBooting(false);

      // Open Readme after boot
      setTimeout(() => {
        openWindow(apps[0].id, apps[0].title, apps[0].component, apps[0].icon);
      }, 500);
    };

    bootSequence();
  }, []);

  // Define apps
  const apps = [
    {
      id: 'about',
      title: 'README.md',
      icon: '📝',
      component: <AboutContent />,
    },
    {
      id: 'skills',
      title: 'skills.json',
      icon: '⚡',
      component: <Skills />,
    },
    {
      id: 'projects',
      title: 'projects.md',
      icon: '🚀',
      component: <ProjectsList />,
    },
    {
      id: 'contact',
      title: 'contact.sh',
      icon: '📫',
      component: <Contact />,
    },
    {
      id: 'terminal',
      title: 'Terminal',
      icon: '💻',
      component: <div className="p-4 font-mono text-green-400">Welcome to AJ-OS v1.0...<br />Type 'help' for commands.</div>,
    }
  ];

  if (isBooting) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono text-white">
        {bootStep === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p>AJ-BIOS (C) 2025</p>
            <p>Checking Memory... OK</p>
            <p>Detecting Primary Master... AJ_PORTFOLIO_DRIVE</p>
          </motion.div>
        )}
        {bootStep === 2 && (
          <motion.div className="flex flex-col items-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p>Loading AJ-OS...</p>
          </motion.div>
        )}
        {bootStep === 3 && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Welcome
            </h1>
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')`,
        backgroundSize: 'cover'
      }}>

      {/* Overlay for better visibility */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      {/* Desktop Icons Grid */}
      <div className="relative z-10 p-8 grid grid-cols-1 gap-8 w-min">
        {apps.map((app) => (
          <DesktopIcon
            key={app.id}
            title={app.title}
            icon={app.icon}
            onClick={() => openWindow(app.id, app.title, app.component, app.icon)}
          />
        ))}
      </div>

      {/* Windows Area */}
      <AnimatePresence>
        {windows.map((window) => (
          <Window
            key={window.id}
            id={window.id}
            title={window.title}
            icon={window.icon}
            zIndex={window.zIndex}
          >
            {window.component}
          </Window>
        ))}
      </AnimatePresence>

      {/* Taskbar */}
      <Taskbar />

      {/* Shared Components */}
      <AJRobot />
      <ThemeToggle />
    </div>
  );
};

// About Content Component (Extracted from previous Layer2)
const AboutContent = () => {
  return (
    <div className="space-y-6 text-gray-300">
      {/* Header */}
      <div className="border-b border-gray-700 pb-6">
        <h1 className="text-4xl font-bold text-white mb-3">{aboutMe.name}</h1>
        <p className="text-xl text-gray-400 mb-2">{aboutMe.title}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-2">
            📍 {aboutMe.location}
          </span>
          <span className="flex items-center gap-2">
            {aboutMe.available ? (
              <>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Available for work
              </>
            ) : (
              'Currently unavailable'
            )}
          </span>
        </div>
      </div>

      {/* Bio */}
      <div>
        <h2 className="text-sky-400 text-lg mb-3 font-semibold">## About</h2>
        <div className="leading-relaxed space-y-3">
          {aboutMe.fullBio.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* Journey */}
      <div>
        <h2 className="text-purple-400 text-lg mb-3 font-semibold">## My Journey</h2>
        <div className="space-y-2">
          <p>Born in Yemen <span className="text-gray-500">(0-3 years)</span></p>
          <p>Grew up in Malaysia <span className="text-gray-500">(4-27 years)</span></p>
          <p>Now in the Netherlands <span className="text-gray-500">(28+)</span></p>
        </div>
      </div>

      {/* Quick Facts */}
      <div>
        <h2 className="text-pink-400 text-lg mb-3 font-semibold">## Quick Facts</h2>
        <ul className="space-y-2 list-disc list-inside">
          <li>Manchester United fan (GGMU!)</li>
          <li>CR7 admirer (SIUUUU!)</li>
          <li>Nasi Lemak enthusiast</li>
          <li>Passionate gamer</li>
          <li>Animation lover</li>
        </ul>
      </div>
    </div>
  );
};

const Layer2 = () => {
  return (
    <WindowProvider>
      <Desktop />
    </WindowProvider>
  );
};

export default Layer2;
