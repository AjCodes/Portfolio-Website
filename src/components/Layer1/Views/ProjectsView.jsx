import { motion } from 'framer-motion';
import { projects } from '../../../data/projects';

const ProjectCard = ({ project, index }) => {
    return (
        <motion.div
            className="group"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
        >
            {/* Category Badge - Above Card */}
            <div className="mb-2 flex items-center justify-between">
                <span className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 rounded-lg border border-primary/20">
                    {project.category}
                </span>
                <span className="text-xs font-mono text-gray-500">
                    {project.year}
                </span>
            </div>

            {/* Card */}
            <div className="relative rounded-[20px] border border-white/10 bg-black/30 backdrop-blur-xl overflow-hidden hover:border-primary/30 transition-all duration-300">
                {/* Project Image */}
                <div className="relative h-44 overflow-hidden">
                    {project.image ? (
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-900 via-[#101014] to-black" />
                    )}
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-5">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2">
                        {project.description}
                    </p>

                    {/* Tech Stack - Show first 4 */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tech.slice(0, 4).map((tech, i) => (
                            <span key={i} className="text-[10px] px-2 py-1 rounded-md bg-white/5 border border-white/10 text-gray-400">
                                {tech}
                            </span>
                        ))}
                        {project.tech.length > 4 && (
                            <span className="text-[10px] px-2 py-1 rounded-md bg-white/5 border border-white/10 text-gray-500">
                                +{project.tech.length - 4}
                            </span>
                        )}
                    </div>

                    {/* Action Button */}
                    <a
                        href={project.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-primary transition-colors group/btn"
                    >
                        View Project
                        <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

const ProjectsView = () => {
    return (
        <div className="w-full px-6 pt-10 pb-4 max-w-7xl mx-auto relative z-20">
            {/* Header */}
            <motion.div
                className="mb-6"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <h1 className="text-2xl font-bold text-white mb-2">My Projects</h1>
                <p className="text-gray-400 text-sm max-w-xl">
                    A selection of projects I've built and more to come!
                </p>
            </motion.div>

            {/* Projects Grid - 3 columns on desktop, 1 on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {projects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                ))}
            </div>

            {/* GitHub CTA Section */}
            <motion.div
                className="mt-6 p-5 rounded-[20px] border border-white/10 bg-black/20 backdrop-blur-xl flex items-center justify-between"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold">Check out my GitHub</h3>
                        <p className="text-gray-400 text-sm">For the latest project updates and more!</p>
                    </div>
                </div>
                <a
                    href="https://github.com/AjCodes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-primary transition-colors"
                >
                    Visit GitHub
                </a>
            </motion.div>
        </div>
    );
};

export default ProjectsView;
