import { motion } from 'framer-motion';
import { useState, useEffect, Suspense } from 'react';
import GridScan from '@/components/GridScan';

const LoadingScreen = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('INITIALIZING SYSTEMS');
  const [systemStatus, setSystemStatus] = useState('red');

  useEffect(() => {
    const loadingSteps = [
      { progress: 15, text: 'SCANNING ENVIRONMENT' },
      { progress: 30, text: 'LOADING NEURAL NETWORKS' },
      { progress: 45, text: 'CALIBRATING INTERFACE' },
      { progress: 60, text: 'ESTABLISHING CONNECTION' },
      { progress: 75, text: 'MAPPING COORDINATES' },
      { progress: 90, text: 'FINALIZING PROTOCOLS' },
      { progress: 100, text: 'TELEPORTATION READY' }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        setLoadingProgress(loadingSteps[currentStep].progress);
        setLoadingText(loadingSteps[currentStep].text);
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, 1000);

    // Animate system status indicator only
    setTimeout(() => setSystemStatus('green'), 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 bg-black flex items-center justify-center z-50 overflow-hidden"
      style={{ paddingTop: '10vh' }}
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 2,
        filter: "brightness(3) blur(20px)"
      }}
      transition={{ duration: 1.2, ease: "easeIn" }}
    >
      {/* GridScan Background - 3D Tunnel Effect */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="absolute inset-0 bg-black" />}>
          <GridScan
            uLinesColor={[0.1, 0.7, 1.0]}
            uScanColor={[0.0, 1.0, 1.0]}
            uGridScale={1.0}
            uLineThickness={1.5}
            uScanOpacity={1.0}
            uScanGlow={2.5}
            uScanDuration={2.5}
            uScanDelay={0.2}
            uBloomOpacity={1.2}
            uTilt={-0.4}
            uYaw={0.0}
            uNoise={0.3}
            uScanSoftness={0.8}
          />
        </Suspense>
      </div>

      {/* Dark vignette for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/60 z-[5]" />

      {/* Main Content */}
      <div className="relative z-20 text-center px-4">
        {/* Holographic Frame */}
        <motion.div
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Corner Brackets with glow */}
          <motion.div
            className="absolute -top-6 -left-6 w-12 h-12 border-t-2 border-l-2 border-cyan-400"
            style={{ filter: 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.8))' }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -top-6 -right-6 w-12 h-12 border-t-2 border-r-2 border-cyan-400"
            style={{ filter: 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.8))' }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
          <motion.div
            className="absolute -bottom-6 -left-6 w-12 h-12 border-b-2 border-l-2 border-cyan-400"
            style={{ filter: 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.8))' }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
          <motion.div
            className="absolute -bottom-6 -right-6 w-12 h-12 border-b-2 border-r-2 border-cyan-400"
            style={{ filter: 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.8))' }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
          />

          <div className="relative bg-black/60 backdrop-blur-md border-2 border-cyan-500/40 rounded-lg p-8 min-w-[380px] max-w-[90vw] shadow-2xl shadow-cyan-500/30">
            {/* Logo/Brand */}
            <motion.div
              className="mb-6"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div
                className="text-5xl font-bold mb-2"
                style={{
                  textShadow: '0 0 20px rgba(34, 211, 238, 0.8)'
                }}
                animate={{
                  textShadow: [
                    '0 0 20px rgba(34, 211, 238, 0.8)',
                    '0 0 40px rgba(34, 211, 238, 1)',
                    '0 0 20px rgba(34, 211, 238, 0.8)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  AJ
                </span>
              </motion.div>
              <div className="text-cyan-400 text-xs tracking-[0.4em] font-mono">
                PORTFOLIO OS v2.0
              </div>
            </motion.div>

            {/* Loading Status */}
            <motion.div
              className="mb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="text-cyan-300 font-mono text-xs mb-2 tracking-wider">
                {loadingText}
              </div>

              {/* Progress Bar Container */}
              <div className="relative w-full h-2.5 bg-gray-900/80 border border-cyan-500/30 rounded-full overflow-hidden shadow-inner">
                {/* Progress Bar Fill */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
                  initial={{ width: "0%" }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  style={{
                    boxShadow: '0 0 20px rgba(34, 211, 238, 0.5)'
                  }}
                />

                {/* Animated Glowing Trail */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  style={{ width: '30%' }}
                  animate={{
                    left: [`${Math.max(0, loadingProgress - 30)}%`, `${loadingProgress}%`]
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>

              {/* Progress Percentage */}
              <div className="text-right text-cyan-400 font-mono text-xs mt-1">
                {loadingProgress}%
              </div>
            </motion.div>

            {/* System Info */}
            <motion.div
              className="space-y-2 text-sm font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex justify-between items-center">
                <span className="text-cyan-300">SYSTEM STATUS</span>
                <motion.span
                  className="flex items-center gap-2 font-semibold"
                  animate={{
                    color: systemStatus === 'green' ? '#4ade80' : '#ef4444',
                    textShadow: systemStatus === 'green'
                      ? '0 0 10px rgba(74, 222, 128, 0.8)'
                      : '0 0 10px rgba(239, 68, 68, 0.8)'
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.span
                    animate={{
                      scale: systemStatus === 'green' ? [1, 1.2, 1] : 1,
                      opacity: systemStatus === 'green' ? [1, 0.7, 1] : 1
                    }}
                    transition={{ duration: 1, repeat: systemStatus === 'green' ? Infinity : 0 }}
                  >
                    ●
                  </motion.span>
                  {systemStatus === 'green' ? 'ONLINE' : 'OFFLINE'}
                </motion.span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-cyan-300">SECURITY</span>
                <span className="text-cyan-400 font-semibold">ENCRYPTED</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-cyan-300">GRID CHAMBER</span>
                <motion.span
                  className="text-cyan-400 font-semibold"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ACTIVE
                </motion.span>
              </div>
            </motion.div>

            {/* Animated Dots */}
            <motion.div
              className="mt-5 flex justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                  style={{
                    boxShadow: '0 0 8px rgba(34, 211, 238, 0.8)'
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Text */}
        <motion.div
          className="mt-6 text-cyan-400/60 font-mono text-xs tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {loadingProgress < 100 ? 'PREPARING TELEPORTATION...' : 'INITIATING JUMP...'}
        </motion.div>
      </div>

      {/* Enhanced Particle Effects */}
      <div className="absolute inset-0 z-[15] pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() > 0.5 ? '2px' : '1px',
              height: Math.random() > 0.5 ? '2px' : '1px',
              background: `rgba(34, 211, 238, ${0.4 + Math.random() * 0.6})`,
              boxShadow: '0 0 4px rgba(34, 211, 238, 0.8)'
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Teleportation Flash Effect at 100% */}
      {loadingProgress >= 100 && (
        <motion.div
          className="absolute inset-0 bg-white z-[30]"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.9, 0] }}
          transition={{ duration: 0.8, times: [0, 0.5, 1] }}
        />
      )}

      {/* Energy Buildup Ring Effect */}
      {loadingProgress >= 90 && (
        <motion.div
          className="absolute inset-0 z-[25] flex items-center justify-center pointer-events-none"
        >
          <motion.div
            className="absolute w-64 h-64 rounded-full border-4 border-cyan-400"
            style={{ filter: 'blur(3px)', boxShadow: '0 0 30px rgba(34, 211, 238, 0.8)' }}
            animate={{
              scale: [1, 3.5],
              opacity: [0.9, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
          <motion.div
            className="absolute w-64 h-64 rounded-full border-4 border-blue-400"
            style={{ filter: 'blur(3px)', boxShadow: '0 0 30px rgba(59, 130, 246, 0.8)' }}
            animate={{
              scale: [1, 3.5],
              opacity: [0.9, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: 0.5,
              ease: "easeOut"
            }}
          />
          <motion.div
            className="absolute w-64 h-64 rounded-full border-4 border-purple-400"
            style={{ filter: 'blur(3px)', boxShadow: '0 0 30px rgba(168, 85, 247, 0.8)' }}
            animate={{
              scale: [1, 3.5],
              opacity: [0.9, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: 1,
              ease: "easeOut"
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default LoadingScreen;
