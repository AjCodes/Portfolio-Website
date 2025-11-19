import { motion } from 'framer-motion';
import { skills } from '../../data/skills';

const Skills = () => {
  return (
    <div className="space-y-8">
      <div>
        <motion.p
          className="text-green-400 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          $ cat skills.json
        </motion.p>

        {/* Languages */}
        <div className="mb-6">
          <h3 className="text-sky-400 text-lg mb-3 font-semibold">Languages:</h3>
          <div className="space-y-3">
            {skills.languages.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-300">
                    {skill.icon} {skill.name}
                  </span>
                  <span className="text-gray-500 text-xs">{skill.level}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-sky-500 to-purple-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Frameworks */}
        <div className="mb-6">
          <h3 className="text-purple-400 text-lg mb-3 font-semibold">Frameworks:</h3>
          <div className="space-y-3">
            {skills.frameworks.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-300">
                    {skill.icon} {skill.name}
                  </span>
                  <span className="text-gray-500 text-xs">{skill.level}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.4 + index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div className="mb-6">
          <h3 className="text-pink-400 text-lg mb-3 font-semibold">Tools:</h3>
          <div className="space-y-3">
            {skills.tools.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-300">
                    {skill.icon} {skill.name}
                  </span>
                  <span className="text-gray-500 text-xs">{skill.level}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-pink-500 to-orange-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div>
          <h3 className="text-orange-400 text-lg mb-3 font-semibold">Interests:</h3>
          <div className="flex flex-wrap gap-3">
            {skills.interests.map((interest, index) => (
              <motion.span
                key={interest.name}
                className="px-4 py-2 bg-gray-800 rounded-lg text-gray-300 border border-gray-700 hover:border-purple-500 transition-colors"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                {interest.icon} {interest.name}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;

