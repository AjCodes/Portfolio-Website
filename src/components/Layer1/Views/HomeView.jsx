import { motion } from 'framer-motion';

const HomeView = ({ setActiveView }) => {
    return (
        <div className="h-full flex flex-col items-center justify-center text-center px-4 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="max-w-5xl"
            >
                {/* Main heading */}
                <motion.h1
                    className="text-7xl md:text-8xl lg:text-9xl font-bold mb-8 font-display tracking-tight"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <span className="text-gradient-premium">
                        Hey, I'm AJ
                    </span>
                </motion.h1>

                {/* Tagline */}
                <motion.p
                    className="text-3xl md:text-4xl lg:text-5xl mb-6 font-semibold text-primary/90 dark:text-primary leading-tight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                >
                    Ideas to Impact
                </motion.p>

                {/* Subtitle */}
                <motion.p
                    className="text-xl md:text-2xl lg:text-3xl mb-12 font-light text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    Developer who crafts more than code
                    <br />
                    I build experiences people remember.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    className="flex gap-6 justify-center flex-wrap"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
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
                        className="px-10 py-4 rounded-full font-semibold text-lg bg-white/5 dark:bg-white/5 backdrop-blur-md border-2 border-primary/30 dark:border-primary/50 text-primary dark:text-primary hover:bg-primary/10 dark:hover:bg-primary/10 hover:border-primary transition-all duration-300 flex items-center gap-2"
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

                {/* Decorative elements */}
                <motion.div
                    className="mt-16 flex justify-center gap-8 flex-wrap opacity-40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                >
                    {['React', 'TypeScript', 'Node.js', 'UI/UX'].map((tech, i) => (
                        <motion.span
                            key={tech}
                            className="px-4 py-2 bg-white/5 dark:bg-white/5 backdrop-blur-sm rounded-full text-sm font-medium text-gray-600 dark:text-gray-400 border border-gray-300/20 dark:border-white/10"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                        >
                            {tech}
                        </motion.span>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default HomeView;
