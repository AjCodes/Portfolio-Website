import { motion } from 'framer-motion';
import { projects } from '../../data/projects';

const Projects = () => {
  return (
    <section id="projects" className="py-20 px-4 md:px-8 bg-gradient-to-b from-black via-dark-900 to-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 gradient-mesh opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-semibold">
              FEATURED WORK
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 font-display">
            <span className="text-gradient-premium">Featured Projects</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Building innovative solutions, one project at a time
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {projects.slice(0, 2).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="group glass-card-hover rounded-2xl overflow-hidden h-full flex flex-col"
                whileHover={{ y: -8 }}
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Featured badge */}
                  {project.featured && (
                    <motion.div
                      className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-black rounded-full text-xs font-bold flex items-center gap-1"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ⭐ Featured
                    </motion.div>
                  )}

                  {/* Category badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 glass-card rounded-full text-xs font-semibold">
                    {project.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Header */}
                  <div className="mb-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-gradient-premium transition-all">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="px-3 py-1 bg-secondary/20 text-secondary-300 rounded-full border border-secondary/30">
                        {project.status}
                      </span>
                      <span className="text-gray-400">{project.year}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-3 leading-relaxed">{project.description}</p>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed flex-1">{project.longDescription}</p>

                  {/* Tech Stack */}
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 6).map((tech, i) => (
                        <motion.span
                          key={i}
                          className="px-3 py-1 bg-dark-800 text-gray-300 rounded-lg text-xs border border-dark-700 hover:border-primary/50 transition-colors"
                          whileHover={{ scale: 1.05, y: -2 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                      {project.tech.length > 6 && (
                        <span className="px-3 py-1 bg-dark-800 text-gray-400 rounded-lg text-xs border border-dark-700">
                          +{project.tech.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 mt-auto">
                    {project.links.github && (
                      <motion.a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold text-center hover-glow-primary transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        View on GitHub
                      </motion.a>
                    )}
                    {project.links.live && (
                      <motion.a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2 border-2 border-primary text-white rounded-lg font-semibold text-center hover:bg-primary/10 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Live Demo
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Decorative gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Third project - full width */}
        {projects.length > 2 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="group glass-card-hover rounded-2xl overflow-hidden"
              whileHover={{ y: -8 }}
            >
              <div className="grid md:grid-cols-2 gap-0">
                {/* Project Image */}
                <div className="relative h-80 md:h-auto overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                  <img
                    src={projects[2].image}
                    alt={projects[2].title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

                  {projects[2].featured && (
                    <motion.div
                      className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-black rounded-full text-xs font-bold flex items-center gap-1"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ⭐ Featured
                    </motion.div>
                  )}
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="px-3 py-1 bg-accent/20 text-accent-300 rounded-full text-xs font-semibold border border-accent/30">
                      {projects[2].category}
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 group-hover:text-gradient-premium transition-all">
                    {projects[2].title}
                  </h3>

                  <div className="flex items-center gap-3 text-sm mb-4">
                    <span className="px-3 py-1 bg-secondary/20 text-secondary-300 rounded-full border border-secondary/30">
                      {projects[2].status}
                    </span>
                    <span className="text-gray-400">{projects[2].year}</span>
                  </div>

                  <p className="text-gray-300 mb-3 leading-relaxed">{projects[2].description}</p>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">{projects[2].longDescription}</p>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <h4 className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {projects[2].tech.map((tech, i) => (
                        <motion.span
                          key={i}
                          className="px-3 py-1 bg-dark-800 text-gray-300 rounded-lg text-xs border border-dark-700 hover:border-primary/50 transition-colors"
                          whileHover={{ scale: 1.05, y: -2 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    {projects[2].links.github && (
                      <motion.a
                        href={projects[2].links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover-glow-primary transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        View on GitHub
                      </motion.a>
                    )}
                    {projects[2].links.live && (
                      <motion.a
                        href={projects[2].links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 border-2 border-primary text-white rounded-lg font-semibold hover:bg-primary/10 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Live Demo
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>

              {/* Decorative gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          </motion.div>
        )}

        {/* Coming soon teaser */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="glass-card inline-block px-8 py-6 rounded-2xl">
            <p className="text-gray-400 text-lg mb-3">More amazing projects coming soon...</p>
            <motion.div
              className="inline-block"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <span className="text-5xl">🚀</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

