import { motion, AnimatePresence } from 'framer-motion';
import { useKonamiCode } from '../../hooks/useKonamiCode';
import { useEffect } from 'react';

const EasterEggs = () => {
  const konamiActivated = useKonamiCode();

  useEffect(() => {
    if (konamiActivated) {
      // Optional: play a sound or trigger additional effects
      console.log('🎮 SIUUUUU! Konami Code activated!');
    }
  }, [konamiActivated]);

  return (
    <>
      {/* Konami Code - CR7 SIUUUU! */}
      <AnimatePresence>
        {konamiActivated && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="text-center"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              {/* SIUUUU Text */}
              <motion.h1
                className="text-8xl md:text-9xl font-black mb-8"
                style={{
                  background: 'linear-gradient(45deg, #FFD700, #FFA500, #FFD700)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 0 30px rgba(255, 215, 0, 0.5)',
                }}
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              >
                SIUUUUU!
              </motion.h1>

              {/* CR7 Icon */}
              <motion.div
                className="text-9xl mb-8"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                ⚽
              </motion.div>

              {/* Subtitle */}
              <motion.p
                className="text-2xl md:text-3xl text-white mb-8"
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                You found the CR7 Easter Egg! 🏆
              </motion.p>

              {/* Trophy animation */}
              <motion.div className="flex justify-center gap-4 text-6xl">
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 0 }}
                    animate={{ y: [-20, 0, -20] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  >
                    🏆
                  </motion.span>
                ))}
              </motion.div>

              <motion.p
                className="mt-8 text-gray-400 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Press ESC or click anywhere to close
              </motion.p>
            </motion.div>

            {/* Confetti effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    background: ['#FFD700', '#FFA500', '#FF6347', '#4169E1'][i % 4],
                    left: `${Math.random() * 100}%`,
                    top: -20,
                  }}
                  animate={{
                    y: [0, window.innerHeight + 50],
                    rotate: [0, 360],
                    opacity: [1, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden Man United Logo - Small and subtle */}
      <motion.div
        className="fixed bottom-4 left-4 z-30 opacity-20 hover:opacity-100 transition-opacity cursor-pointer group"
        whileHover={{ scale: 1.2 }}
        onClick={() => {
          alert('🔴 Glory Glory Man United! You found the hidden badge! GGMU! 🔴');
        }}
      >
        <svg className="w-12 h-12" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="#DA291C" />
          <circle cx="50" cy="50" r="35" fill="#FBE122" />
          <text
            x="50"
            y="60"
            textAnchor="middle"
            fontSize="24"
            fontWeight="bold"
            fill="#DA291C"
          >
            MUFC
          </text>
        </svg>

        <motion.div
          className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-3 py-1 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ y: 10 }}
          whileHover={{ y: 0 }}
        >
          Glory Glory Man United! 🔴
        </motion.div>
      </motion.div>
    </>
  );
};

export default EasterEggs;
