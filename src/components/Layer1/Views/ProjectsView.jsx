import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { projects } from '../../../data/projects';

const ProjectPanel = ({ project, index, isActive, onClick }) => {
    return (
        <motion.div
            layout
            onClick={onClick}
            className={`
                relative h-full cursor-pointer overflow-hidden border-r border-white/5 last:border-r-0
                ${isActive ? 'w-[50%] md:w-[60%]' : 'w-[25%] md:w-[20%]'}
                transition-[width] duration-700 ease-in-out
            `}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
        >
            {/* Background Image - darker when not active */}
            <div className={`absolute inset-0 transition-all duration-700 ${isActive ? 'grayscale-0 scale-100' : 'grayscale-[50%] scale-105 hover:scale-100'}`}>
                {project.image ? (
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-900 via-[#101014] to-black" />
                )}
                {/* Overlays */}
                <div className={`absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 transition-opacity duration-500 ${isActive ? 'opacity-80' : 'opacity-90 hover:opacity-80'}`} />
            </div>

            {/* Content Content */}
            <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
                {/* Vertical Text for Inactive State (Desktop Only) */}
                {!isActive && (
                    <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none">
                        <h3 className="text-4xl font-bold text-white/20 whitespace-nowrap -rotate-90 tracking-widest uppercase origin-center">
                            {project.title}
                        </h3>
                    </div>
                )}

                {/* Active Content */}
                <div className={`transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 hidden'}`}>
                    {/* Category & Year */}
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#22d3ee] bg-[#22d3ee]/10 rounded-full border border-[#22d3ee]/20">
                            {project.category}
                        </span>
                        <span className="text-xs font-mono text-gray-400">
                             // {project.year}
                        </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight tracking-tight">
                        {project.title}
                    </h2>

                    {/* Description - Limited width */}
                    <p className="text-gray-300 max-w-xl text-sm md:text-base leading-relaxed mb-6">
                        {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        {project.tech.map((tech, i) => (
                            <span key={i} className="text-[11px] px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300">
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* Action */}
                    <a
                        href={project.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold uppercase tracking-wider text-xs rounded-full hover:bg-[#22d3ee] transition-colors"
                    >
                        View Project
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

const ProjectsView = () => {
    // Default to middle project being active or first
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="h-full w-full bg-[#0a0a0a] flex flex-row overflow-hidden absolute inset-0 z-30">
            {/* Using absolute inset-0 to ensure it takes full container space without scroll */}
            {projects.slice(0, 3).map((project, index) => (
                <ProjectPanel
                    key={project.id}
                    project={project}
                    index={index}
                    isActive={activeIndex === index}
                    onClick={() => setActiveIndex(index)}
                />
            ))}
        </div>
    );
};

export default ProjectsView;
