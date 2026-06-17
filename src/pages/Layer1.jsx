import { useEffect, useLayoutEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import FloatingNavbar from '../components/Layer1/FloatingNavbar';
import HomeView from '../components/Layer1/Views/HomeView';
import AboutView from '../components/Layer1/Views/AboutView';
import ProjectsView from '../components/Layer1/Views/ProjectsView';
import WavePlayer from '../components/shared/WavePlayer';
import LocationTime from '../components/shared/LocationTime';
import StaticTvLoader from '../components/Layer1/StaticTvLoader';

const sections = ['home', 'projects', 'about'];

const Layer1 = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isBooting, setIsBooting] = useState(true);
  const [isHomeReady, setIsHomeReady] = useState(false);

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    const bootTimer = window.setTimeout(() => {
      setIsBooting(false);
    }, 2650);
    const homeTimer = window.setTimeout(() => {
      setIsHomeReady(true);
    }, 3220);

    return () => {
      window.clearTimeout(bootTimer);
      window.clearTimeout(homeTimer);
    };
  }, []);

  // Track which section is currently visible via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      { root: null, threshold: [0.35, 0.55, 0.75] }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Removed custom wheel event hijacker — was fighting with CSS scroll-snap
  // and causing jittery, "stuck" scrolling. Native smooth scroll via
  // html { scroll-behavior: smooth } + navbar scrollIntoView() is sufficient.

  return (
    <div className="tv-shell relative min-h-screen bg-[#030303] text-[hsl(var(--color-text))]">
      <LocationTime />
      <WavePlayer />
      <FloatingNavbar activeSection={activeSection} />
      <AnimatePresence>
        {isBooting && <StaticTvLoader />}
      </AnimatePresence>

      <div className="tv-noise pointer-events-none fixed inset-0 z-[57]" />
      <div className="pointer-events-none fixed left-0 right-0 top-0 z-[58] h-5 bg-[#050505] md:h-8" />
      <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-[58] h-5 bg-[#050505] md:h-8" />
      <div className="pointer-events-none fixed bottom-0 left-0 top-0 z-[58] w-5 bg-[#050505] md:w-8" />
      <div className="pointer-events-none fixed bottom-0 right-0 top-0 z-[58] w-5 bg-[#050505] md:w-8" />

      <div className="tv-frame pointer-events-none fixed inset-5 z-[60] rounded-[2rem] border border-[#d7c8b8]/28 shadow-[inset_0_0_90px_rgba(0,0,0,0.72),0_0_0_2px_rgba(8,8,8,0.9),0_0_0_8px_rgba(0,0,0,0.62)] md:inset-8" />

      {/* TV vignette — reduced intensity via CSS changes */}
      <div className="tv-vignette pointer-events-none fixed inset-0 z-[59]" />

      <main className="tv-content relative z-10 w-full overflow-x-hidden">
        <HomeView isReady={isHomeReady} />
        <ProjectsView />
        <AboutView />
      </main>
    </div>
  );
};

export default Layer1;
