import { motion } from 'framer-motion';
import { projects } from '../../data/projects';

const ProjectsList = () => {
  return (
    <div>
      <motion.p
        className="text-green-400 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        $ cat projects.md
      </motion.p>

      <div className="space-y-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="border border-gray-700 rounded-lg p-5 hover:border-purple-500 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-purple-400">{project.category}</span>
                  <span className="text-gray-600">•</span>
                  <span className="text-sky-400">{project.status}</span>
                  <span className="text-gray-600">•</span>
                  <span className="text-gray-500">{project.year}</span>
                </div>
              </div>
              {project.featured && (
                <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded">
                  Featured
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm mb-3">{project.description}</p>
            <p className="text-gray-500 text-xs mb-4">{project.longDescription}</p>

            {/* Tech Stack */}
            <div className="mb-4">
              <p className="text-gray-500 text-xs mb-2">Tech Stack:</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded border border-gray-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="mb-4">
              <p className="text-gray-500 text-xs mb-2">Highlights:</p>
              <ul className="space-y-1">
                {project.highlights.slice(0, 3).map((highlight, i) => (
                  <li key={i} className="text-gray-400 text-xs flex items-start gap-2">
                    <span className="text-purple-400">▸</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            {/* Links */}
            <div className="flex gap-2">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 text-xs transition-colors"
                >
                  [GitHub] →
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-sky-400 text-xs transition-colors"
                >
                  [Live Demo] →
                </a>
              )}
            </div>
          </motion.div>
        ))}

        {/* Coming Soon */}
        <motion.div
          className="border border-dashed border-gray-700 rounded-lg p-5 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: projects.length * 0.2 }}
        >
          <p className="text-gray-500 text-sm mb-2">More projects coming soon...</p>
          <p className="text-gray-600 text-xs">Currently building amazing things 🚀</p>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectsList;
