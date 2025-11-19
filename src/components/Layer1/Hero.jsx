import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Developer • Gamer • Storyteller';

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <div className="absolute inset-0 gradient-mesh opacity-60" />
        <motion.div
          className="absolute inset-0 opacity-40"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(14, 165, 233, 0.25) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.25) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, rgba(236, 72, 153, 0.25) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(14, 165, 233, 0.25) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
              rotate: Math.random() * 360,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
              rotate: [null, Math.random() * 360 + 360],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <div
              className={`w-${Math.random() > 0.5 ? '16' : '20'} h-${Math.random() > 0.5 ? '16' : '20'} ${i % 3 === 0
                  ? 'bg-primary/10 border border-primary/20'
                  : i % 3 === 1
                    ? 'bg-secondary/10 border border-secondary/20'
                    : 'bg-accent/10 border border-accent/20'
                } ${Math.random() > 0.5 ? 'rounded-full' : 'rounded-lg'} backdrop-blur-sm`}
            />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {/* Main heading */}
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 font-display"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="text-gradient-premium">Welcome to My World</span>
          </motion.h1>

          {/* Typing effect subtitle */}
          <motion.div
            className="h-12 md:h-16 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <p className="text-xl md:text-3xl lg:text-4xl text-gray-300 font-light">
              {typedText}
              <motion.span
                className="inline-block w-1 h-6 md:h-8 bg-primary ml-1"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex gap-4 justify-center flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <motion.a
              href="#about"
              className="group relative px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-full font-semibold text-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Explore My Journey</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.a>

            <motion.a
              href="#projects"
              className="px-8 py-4 border-2 border-primary rounded-full font-semibold text-lg hover:bg-primary/10 transition-all duration-300 hover-glow-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.a>
          </motion.div>

          {/* Stats or badges */}
          <motion.div
            className="mt-12 flex justify-center gap-8 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            {[
              { label: 'Projects', value: '3+' },
              { label: 'Technologies', value: '15+' },
              { label: 'Coffee Cups', value: '∞' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="glass-card px-6 py-3 rounded-xl"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl md:text-3xl font-bold text-gradient">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        animate={{
          y: [0, 12, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="w-7 h-12 border-2 border-white/30 rounded-full flex items-start justify-center p-2 backdrop-blur-sm">
          <motion.div
            className="w-1.5 h-3 bg-gradient-to-b from-primary to-secondary rounded-full"
            animate={{
              y: [0, 16, 0],
              opacity: [1, 0.3, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
        <p className="text-white/40 text-xs mt-3 text-center font-medium tracking-wider">SCROLL</p>
      </motion.div>
    </section>
  );
};

export default Hero;

