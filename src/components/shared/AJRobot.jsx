import { motion } from 'framer-motion';

const AJRobot = ({ onSwitch, isLayer1 = true }) => {
  const handleClick = () => {
    if (onSwitch) {
      onSwitch();
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className="fixed bottom-8 right-8 z-50 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isLayer1 ? "Enter Workspace" : "Back to Experience"}
      title={isLayer1 ? "Enter Workspace" : "Back to Experience"}
    >
      {/* Portal Container */}
      <div className="relative w-24 h-24">
        {/* Outer glow rings */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary/30"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-secondary/30"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            delay: 0.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Main Portal Circle */}
        <motion.div
          className="absolute inset-2 rounded-full bg-gradient-to-br from-primary via-purple-500 to-secondary shadow-2xl overflow-hidden"
          animate={{
            boxShadow: [
              '0 0 20px rgba(59, 130, 246, 0.5)',
              '0 0 40px rgba(168, 85, 247, 0.7)',
              '0 0 20px rgba(59, 130, 246, 0.5)',
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Swirling energy effect */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at center, transparent 30%, rgba(255,255,255,0.1) 60%, transparent 100%)',
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Inner portal rings */}
          <motion.div
            className="absolute inset-4 rounded-full border-2 border-white/30"
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.3, 0.7, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute inset-6 rounded-full border border-white/50"
            animate={{
              scale: [1.2, 0.8, 1.2],
              opacity: [0.7, 0.3, 0.7],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Center Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {isLayer1 ? (
                // Enter icon (arrow pointing inward)
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              ) : (
                // Exit icon (arrow pointing outward)
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 3H3v6M15 21h6v-6M3 3l7 7M21 21l-7-7" />
                </svg>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Tooltip */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl border border-white/10">
          {isLayer1 ? "→ Enter Workspace" : "← Back to Experience"}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900 border-r border-b border-white/10"></div>
        </div>
      </div>
    </motion.button>
  );
};

export default AJRobot;
