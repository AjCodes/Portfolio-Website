import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';

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
      {/* ── Desktop side nav ── */}
      <motion.nav
        className="fixed left-5 top-1/2 z-50 hidden -translate-y-1/2 lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        aria-label="Primary"
      >
        <LayoutGroup id="desktop-nav">
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
                  {/* Dot indicator */}
                  <span className="relative flex h-4 w-4 items-center justify-center">
                    {/* Inactive dot */}
                    <span
                      className={`h-2 w-2 rounded-full transition-all duration-300 ${
                        isActive
                          ? 'bg-transparent'
                          : 'bg-[#e8d8c9]/24 group-hover:bg-[#e8d8c9]/55'
                      }`}
                    />

                    {/* Active sliding dot with layoutId */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-dot"
                        className="absolute inset-0 m-auto h-2 w-2 rounded-full bg-primary"
                        initial={false}
                        animate={{ scale: 1.3 }}
                        transition={{
                          layout: { type: 'spring', stiffness: 380, damping: 28 },
                          scale: { duration: 0.4, ease: 'easeOut' },
                        }}
                        style={{
                          boxShadow: '0 0 16px rgba(243,112,30,0.85), 0 0 6px rgba(243,112,30,0.5)',
                        }}
                      />
                    )}
                  </span>

                  {/* Label with background highlight */}
                  <span className="relative">
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          layoutId="nav-active-bg"
                          className="absolute -inset-x-2 -inset-y-1 rounded-md bg-primary/10"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            layout: { type: 'spring', stiffness: 380, damping: 28 },
                            opacity: { duration: 0.2 },
                          }}
                        />
                      )}
                    </AnimatePresence>
                    <motion.span
                      className={`relative origin-left font-mono text-[10px] font-bold uppercase tracking-[0.22em] transition-colors ${
                        isActive
                          ? 'text-[#e8d8c9]'
                          : 'text-[#e8d8c9]/36 group-hover:text-[#e8d8c9]/72'
                      }`}
                      whileHover={{ x: 2, scale: 1.04 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                    >
                      {item.label}
                    </motion.span>
                  </span>
                </a>
              );
            })}
          </div>
        </LayoutGroup>
      </motion.nav>

      {/* ── Mobile top nav ── */}
      <motion.nav
        className="fixed left-0 right-0 top-4 z-50 flex justify-center px-3 lg:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        aria-label="Primary mobile"
      >
        <LayoutGroup id="mobile-nav">
          <div className="mx-auto flex max-w-[24rem] items-center justify-center gap-1 rounded-full border border-[#e8d8c9]/14 bg-[#181818]/72 p-1.5 shadow-[0_14px_42px_rgba(0,0,0,0.42)] backdrop-blur-xl">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(event) => handleClick(event, item.id)}
                  className="relative rounded-full px-3 py-2 text-xs font-bold"
                >
                  {/* Sliding active pill background */}
                  {isActive && (
                    <motion.div
                      layoutId="mobile-nav-active"
                      className="absolute inset-0 rounded-full bg-primary shadow-[0_0_22px_rgba(243,112,30,0.28)]"
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Label text */}
                  <span
                    className={`relative z-10 transition-colors duration-200 ${
                      isActive ? 'text-white' : 'text-[#e8d8c9]/62'
                    }`}
                  >
                    {item.label}
                  </span>
                </a>
              );
            })}
          </div>
        </LayoutGroup>
      </motion.nav>
    </>
  );
};

export default FloatingNavbar;
