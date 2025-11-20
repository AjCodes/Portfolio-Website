import { motion } from 'framer-motion';
import { useState } from 'react';

const FloatingNavbar = ({ activeView, setActiveView }) => {
  const [isHovered, setIsHovered] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'casestudy', label: 'Case Study' },
    { id: 'about', label: 'About Me' },
  ];

  return (
    <motion.nav
      className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className={`flex items-center gap-2 px-2 py-2 bg-white/5 dark:bg-white/5 backdrop-blur-md border border-primary/20 dark:border-primary/30 rounded-full shadow-lg transition-all duration-300 pointer-events-auto ${isHovered ? 'scale-100' : 'scale-90 opacity-80'}`}
        animate={{
          boxShadow: isHovered ? [
            '0 10px 30px -10px rgba(0,0,0,0.3)',
            '0 10px 40px -10px rgba(14, 165, 233, 0.2)',
            '0 10px 30px -10px rgba(0,0,0,0.3)',
          ] : '0 5px 15px -5px rgba(0,0,0,0.2)',
        }}
        transition={{
          boxShadow: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
        }}
      >
        {/* Nav Items */}
        <div className="flex items-center bg-black/10 dark:bg-black/20 rounded-full px-1 py-1">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`
                relative rounded-full text-sm font-medium transition-all duration-300
                ${isHovered ? 'px-6 py-2' : 'px-4 py-2'}
                ${activeView === item.id
                  ? 'text-white dark:text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary'}
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeView === item.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full shadow-lg shadow-primary/30"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default FloatingNavbar;
