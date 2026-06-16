import { useEffect, useState } from 'react';
import FloatingNavbar from '../components/Layer1/FloatingNavbar';
import HomeView from '../components/Layer1/Views/HomeView';
import AboutView from '../components/Layer1/Views/AboutView';
import ProjectsView from '../components/Layer1/Views/ProjectsView';
import WavePlayer from '../components/shared/WavePlayer';
import LocationTime from '../components/shared/LocationTime';

const sections = ['home', 'projects', 'about'];

const Layer1 = () => {
  const [activeSection, setActiveSection] = useState('home');

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

  return (
    <div className="tv-shell relative min-h-screen bg-[#181818] text-[hsl(var(--color-text))]">
      <LocationTime />
      <WavePlayer />
      <FloatingNavbar activeSection={activeSection} />
      <div className="pointer-events-none fixed left-0 right-0 top-0 z-[58] h-3 bg-[#050505] md:h-6" />
      <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-[58] h-3 bg-[#050505] md:h-6" />
      <div className="pointer-events-none fixed bottom-0 left-0 top-0 z-[58] w-3 bg-[#050505] md:w-6" />
      <div className="pointer-events-none fixed bottom-0 right-0 top-0 z-[58] w-3 bg-[#050505] md:w-6" />
      <div className="tv-frame pointer-events-none fixed inset-3 z-[60] rounded-[2rem] border border-[#e8d8c9]/12 shadow-[inset_0_0_80px_rgba(0,0,0,0.72),0_0_0_1px_rgba(255,255,255,0.04)] md:inset-6" />
      <div className="tv-vignette pointer-events-none fixed inset-0 z-[59]" />

      <main className="tv-content relative z-10 w-full overflow-x-hidden">
        <HomeView />
        <ProjectsView />
        <AboutView />
      </main>
    </div>
  );
};

export default Layer1;
