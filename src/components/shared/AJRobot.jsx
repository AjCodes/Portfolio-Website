import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { LoadingContext } from '../../App';

const AJRobot = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsTransitioning } = useContext(LoadingContext);
  const isLayer1 = location.pathname === '/';

  const handleClick = () => {
    if (isLayer1) {
      // Trigger loading screen for Layer1 -> Layer2 transition
      setIsTransitioning(true);

      // Wait for loading animation to complete (8 seconds)
      setTimeout(() => {
        navigate('/workspace');
        setIsTransitioning(false);
      }, 8000);
    } else {
      // Go back to Layer1 without loading screen
      navigate('/');
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className="fixed bottom-8 right-8 z-50 group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        y: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      title={isLayer1 ? "Enter Workspace" : "Back to Experience"}
    >
      {/* Robot Container */}
      <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 p-4 rounded-2xl shadow-2xl">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />

        {/* Robot SVG */}
        <svg
          width="60"
          height="60"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          {/* Antenna */}
          <motion.circle
            cx="60"
            cy="15"
            r="5"
            fill="#fff"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1]
            }}
            transition={{
              duration: 1,
              repeat: Infinity
            }}
          />
          <line x1="60" y1="20" x2="60" y2="30" stroke="#fff" strokeWidth="3" />

          {/* Head */}
          <rect x="35" y="30" width="50" height="40" rx="10" fill="#fff" />

          {/* Eyes */}
          <motion.circle
            cx="47"
            cy="45"
            r="6"
            fill="#8B5CF6"
            animate={{
              scaleY: [1, 0.1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2
            }}
          />
          <motion.circle
            cx="73"
            cy="45"
            r="6"
            fill="#8B5CF6"
            animate={{
              scaleY: [1, 0.1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2
            }}
          />

          {/* Smile */}
          <motion.path
            d="M 45 58 Q 60 68 75 58"
            stroke="#8B5CF6"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            animate={{
              d: [
                "M 45 58 Q 60 68 75 58",
                "M 45 58 Q 60 65 75 58",
                "M 45 58 Q 60 68 75 58"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          />

          {/* Body */}
          <rect x="30" y="75" width="60" height="35" rx="8" fill="#fff" />

          {/* Body Details */}
          <circle cx="60" cy="92" r="4" fill="#8B5CF6" />

          {/* Arms */}
          <motion.rect
            x="15"
            y="80"
            width="10"
            height="25"
            rx="5"
            fill="#fff"
            animate={{
              rotate: isLayer1 ? [-15, 15, -15] : [15, -15, 15]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity
            }}
            style={{ transformOrigin: "50% 0%" }}
          />
          <motion.rect
            x="95"
            y="80"
            width="10"
            height="25"
            rx="5"
            fill="#fff"
            animate={{
              rotate: isLayer1 ? [15, -15, 15] : [-15, 15, -15]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity
            }}
            style={{ transformOrigin: "50% 0%" }}
          />
        </svg>

        {/* Tooltip */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {isLayer1 ? "→ Workspace" : "← Experience"}
        </div>
      </div>
    </motion.button>
  );
};

export default AJRobot;
