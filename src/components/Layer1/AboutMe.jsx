import { motion } from 'framer-motion';
import Countries from './Countries';

const AboutMe = () => {
  return (
    <section className="min-h-screen bg-black py-20 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900 to-black opacity-50"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* About Me Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            About Me
          </h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed"
          >
            A developer with roots across continents, passion for gaming and sports, 
            and a mission to build products that matter. Welcome to my story.
          </motion.p>
        </motion.div>

        {/* Countries Section */}
        <Countries />

        {/* Additional About Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-12 rounded-3xl border border-slate-700">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-300 text-lg leading-relaxed max-w-4xl mx-auto"
            >
              From the vibrant streets of Yemen to the tech hub of the Netherlands, 
              my journey has been anything but ordinary. Gaming taught me strategy, 
              sports taught me perseverance, and coding? That&apos;s where I bring it all together.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;