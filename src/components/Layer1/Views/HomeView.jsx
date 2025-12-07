import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const TypewriterText = ({ text, delay = 0 }) => {
    // State to track when typing is done
    const [typingComplete, setTypingComplete] = useState(false);

    // Staggering animation for typewriter effect
    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.025, // Significantly faster (was 0.05)
                delayChildren: delay
            }
        }
    };

    const child = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.span
            variants={container}
            initial="hidden"
            animate="visible"
            className="inline-block"
            onAnimationComplete={() => setTypingComplete(true)}
        >
            {text.split("").map((char, index) => (
                <motion.span key={index} variants={child} className="inline-block whitespace-pre">
                    {char}
                </motion.span>
            ))}
            {/* Cursor appears ONLY after typing is complete */}
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: typingComplete ? [0, 1, 0] : 0 }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
                className="inline-block w-[3px] h-[1em] bg-primary ml-1 align-middle"
            />
        </motion.span>
    );
};

const GlitchTitle = ({ text }) => {
    return (
        <motion.div
            className="relative inline-block group cursor-default"
            whileHover="hover"
        >
            {/* Main Text - applied gradient directly here */}
            <span className="relative z-10 block text-gradient-premium">{text}</span>

            {/* Glitch Layers - visible on hover */}
            <motion.span
                className="absolute top-0 left-0 -z-10 text-red-500 opacity-0 group-hover:opacity-70"
                variants={{ hover: { x: -3, y: 2, opacity: 0.7 } }}
                transition={{ duration: 0.1, repeat: Infinity, repeatType: "mirror", repeatDelay: 0.1 }}
            >
                {text}
            </motion.span>
            <motion.span
                className="absolute top-0 left-0 -z-10 text-cyan-500 opacity-0 group-hover:opacity-70"
                variants={{ hover: { x: 3, y: -2, opacity: 0.7 } }}
                transition={{ duration: 0.1, repeat: Infinity, repeatType: "mirror", repeatDelay: 0.2 }}
            >
                {text}
            </motion.span>
        </motion.div>
    );
};

const HomeView = ({ setActiveView }) => {
    return (
        <div className="h-full w-full relative overflow-hidden flex flex-col items-center justify-center text-center px-4">
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center mt-[-40px]">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="max-w-5xl"
                >
                    {/* Main heading */}
                    <div className="text-7xl md:text-8xl lg:text-9xl font-bold mb-6 font-display tracking-tight text-white">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7 }}
                        >
                            <span className="block text-4xl md:text-5xl lg:text-6xl text-gray-400 font-light mb-[-10px] md:mb-[-20px]">Hey, I'm</span>
                            <GlitchTitle text="AJ" />
                        </motion.div>
                    </div>

                    {/* Tagline using Typewriter */}
                    <div className="h-[60px] md:h-[80px] flex items-center justify-center mb-6">
                        <p className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary/90 dark:text-primary leading-tight">
                            <TypewriterText text="Building experiences people remember" delay={0.2} />
                        </p>
                    </div>

                    {/* Subtitle */}
                    <motion.p
                        className="text-xl md:text-2xl lg:text-3xl mb-12 font-light text-gray-400 max-w-3xl mx-auto leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1.2 }} // Faster delay
                    >
                        Developer who crafts more than just code.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex gap-6 justify-center flex-wrap"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.4 }}
                    >
                        <motion.button
                            onClick={() => setActiveView('projects')}
                            className="group relative px-10 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold text-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="relative z-10">Explore My Work</span>
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                initial={false}
                            />
                        </motion.button>

                        <motion.button
                            onClick={() => setActiveView('about')}
                            className="px-10 py-4 rounded-full font-semibold text-lg bg-white/5 dark:bg-white/5 backdrop-blur-md border-2 border-primary/30 dark:border-primary/50 text-white hover:bg-primary/10 dark:hover:bg-primary/10 hover:border-primary transition-all duration-300 flex items-center gap-2"
                            whileHover={{ scale: 1.05, x: 5 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            More About Me
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                →
                            </motion.span>
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default HomeView;
