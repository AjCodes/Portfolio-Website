import { motion } from 'framer-motion';
import { projects } from '../../../data/projects';

const ProjectsView = () => {
    return (
        <div className="h-full flex flex-col justify-center px-8 pt-20 max-w-7xl mx-auto">
            <motion.h2
                className="text-4xl font-bold mb-8 text-center text-gradient-premium"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Featured Projects
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[60vh]">
                {projects.slice(0, 3).map((project, index) => (
                    <motion.div
                        key={project.id}
                        className="glass-card rounded-2xl overflow-hidden relative group cursor-pointer"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -10 }}
                    >
                        {/* Image Background */}
                        <div className="absolute inset-0">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                        </div>

                        {/* Content */}
                        <div className="absolute inset-0 p-6 flex flex-col justify-end">
                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <div className="flex gap-2 mb-3">
                                    {project.tech.slice(0, 3).map((t, i) => (
                                        <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/80">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                                <p className="text-gray-300 text-sm line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                    {project.description}
                                </p>
                                <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                                    <a href={project.links.github} target="_blank" rel="noreferrer" className="text-xs font-bold text-white hover:text-primary transition-colors">GITHUB</a>
                                    <a href={project.links.demo} target="_blank" rel="noreferrer" className="text-xs font-bold text-white hover:text-primary transition-colors">LIVE DEMO</a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ProjectsView;
