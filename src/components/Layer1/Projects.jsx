import { motion } from 'framer-motion';
import { projects } from '../../data/projects';

const Projects = () => {
  return (
    <section id="projects" className="py-20 px-4 md:px-8 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">Featured Projects</span>
          </h2>
          <p className="text-gray-400 text-lg">Building cool stuff, one project at a time</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 relative group"
                whileHover={{ y: -10 }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="p-8 relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full">
                          {project.category}
                        </span>
                        <span className="px-3 py-1 bg-sky-500/20 text-sky-300 rounded-full">
                          {project.status}
                        </span>
                        <span className="text-gray-400">{project.year}</span>
                      </div>
                    </div>

                    {project.featured && (
                      <motion.div
                        className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-black rounded-full text-sm font-bold"
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      >
                        ⭐ Featured
                      </motion.div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-lg mb-4">{project.description}</p>
                  <p className="text-gray-400 text-sm mb-6">{project.longDescription}</p>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-400 mb-3">Tech Stack:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <motion.span
                          key={i}
                          className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-lg text-sm border border-gray-600"
                          whileHover={{ scale: 1.1, backgroundColor: 'rgba(139, 92, 246, 0.2)' }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-400 mb-3">Highlights:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {project.highlights.map((highlight, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start gap-2 text-gray-300 text-sm"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <span className="text-purple-400 mt-1">▸</span>
                          {highlight}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    {project.links.live && (
                      <motion.a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-gradient-to-r from-sky-500 to-purple-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-shadow"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Live
                      </motion.a>
                    )}
                    {project.links.github && (
                      <motion.a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 border-2 border-purple-500 text-white rounded-full font-semibold hover:bg-purple-500/10 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        GitHub
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Coming soon teaser */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-lg">More amazing projects coming soon...</p>
          <motion.div
            className="mt-4 inline-block"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <span className="text-4xl">🚀</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
