import { motion } from 'framer-motion';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About Me' },
];

const FloatingNavbar = ({ activeSection = 'home' }) => {
  const handleClick = (event, id) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <motion.nav
        className="fixed left-5 top-1/2 z-50 hidden -translate-y-1/2 lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        aria-label="Primary"
      >
        <div className="flex flex-col gap-4">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(event) => handleClick(event, item.id)}
                className="group flex items-center gap-3"
                aria-current={isActive ? 'page' : undefined}
              >
                <span
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${isActive
                    ? 'bg-primary shadow-[0_0_16px_rgba(243,112,30,0.85)]'
                    : 'bg-[#e8d8c9]/24 group-hover:bg-[#e8d8c9]/55'
                    }`}
                />
                <motion.span
                  className={`origin-left font-mono text-[10px] font-bold uppercase tracking-[0.22em] transition-colors ${isActive
                    ? 'text-[#e8d8c9]'
                    : 'text-[#e8d8c9]/36 group-hover:text-[#e8d8c9]/72'
                    }`}
                  whileHover={{ x: 2, scale: 1.04 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                >
                  {item.label}
                </motion.span>
              </a>
            );
          })}
        </div>
      </motion.nav>

      <motion.nav
        className="fixed left-0 right-0 top-4 z-50 flex justify-center px-3 lg:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        aria-label="Primary mobile"
      >
        <div className="mx-auto flex max-w-[24rem] items-center justify-center gap-1 rounded-full border border-[#e8d8c9]/14 bg-[#181818]/72 p-1.5 shadow-[0_14px_42px_rgba(0,0,0,0.42)] backdrop-blur-xl">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(event) => handleClick(event, item.id)}
                className={`rounded-full px-3 py-2 text-xs font-bold transition-colors ${isActive
                  ? 'bg-primary text-white shadow-[0_0_22px_rgba(243,112,30,0.28)]'
                  : 'text-[#e8d8c9]/62'
                  }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </motion.nav>
    </>
  );
};

export default FloatingNavbar;
