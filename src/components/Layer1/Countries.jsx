import { motion } from 'framer-motion';
import { useState } from 'react';
import { countries } from '../../data/countries';

const Countries = () => {
  const [hoveredCountry, setHoveredCountry] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const countryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="countries" className="py-20 px-4 md:px-8 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">Countries That Shaped Me</span>
          </h2>
          <p className="text-gray-400 text-lg">A journey across three continents</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {countries.map((country, index) => (
            <motion.div
              key={country.id}
              variants={countryVariants}
              className="relative group"
              onMouseEnter={() => setHoveredCountry(country.id)}
              onMouseLeave={() => setHoveredCountry(null)}
            >
              <motion.div
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all duration-300 relative overflow-hidden"
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at center, ${country.color}20, transparent 70%)`,
                  }}
                />

                {/* Country SVG Shape */}
                <div className="relative mb-6 h-40 flex items-center justify-center">
                  <svg
                    viewBox="0 0 120 100"
                    className="w-full h-full"
                    style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}
                  >
                    <motion.path
                      d={country.svgPath}
                      fill={country.color}
                      stroke={country.color}
                      strokeWidth="1"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 0.8 }}
                      transition={{ duration: 2, delay: index * 0.3 }}
                      viewport={{ once: true }}
                    />
                    <motion.path
                      d={country.svgPath}
                      fill="none"
                      stroke={country.color}
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={hoveredCountry === country.id ? { pathLength: 1 } : { pathLength: 0 }}
                      transition={{ duration: 1 }}
                      style={{ filter: 'blur(4px)' }}
                    />
                  </svg>

                  {/* Animated particles around country */}
                  {hoveredCountry === country.id && (
                    <>
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 rounded-full"
                          style={{ backgroundColor: country.color }}
                          initial={{
                            x: '50%',
                            y: '50%',
                            opacity: 1,
                          }}
                          animate={{
                            x: `${50 + Math.cos((i * Math.PI) / 4) * 100}%`,
                            y: `${50 + Math.sin((i * Math.PI) / 4) * 100}%`,
                            opacity: 0,
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeOut',
                          }}
                        />
                      ))}
                    </>
                  )}
                </div>

                {/* Country Info */}
                <div className="relative z-10 text-center">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="text-4xl">{country.flag}</span>
                    {country.isHome && (
                      <motion.span
                        className="px-2 py-1 bg-gradient-to-r from-pink-500 to-purple-500 text-xs rounded-full font-bold"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        HOME
                      </motion.span>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold mb-2" style={{ color: country.color }}>
                    {country.name}
                  </h3>

                  <div className="mb-3">
                    <span className="text-sm text-gray-400">{country.label}: </span>
                    <span className="text-white font-semibold">{country.period}</span>
                  </div>

                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={
                      hoveredCountry === country.id
                        ? { height: 'auto', opacity: 1 }
                        : { height: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-gray-300 mb-2">{country.description}</p>
                    <p className="text-lg">{country.funFact}</p>

                    {country.nasiLemakEmoji && (
                      <motion.div
                        className="mt-3"
                        animate={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                      >
                        <span className="text-3xl">{country.nasiLemakEmoji}</span>
                      </motion.div>
                    )}
                  </motion.div>
                </div>

                {/* Decorative corner */}
                <div
                  className="absolute top-0 right-0 w-20 h-20 opacity-10"
                  style={{
                    background: `linear-gradient(135deg, transparent 50%, ${country.color} 50%)`,
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Journey Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-block bg-gradient-to-r from-red-600 via-blue-600 to-orange-600 p-6 rounded-2xl cursor-pointer"
          >
            <p className="text-white text-2xl font-semibold">
              🇾🇪 → 🇲🇾 → 🇳🇱
            </p>
            <p className="text-white/80 mt-2">
              Three countries. One journey. Infinite possibilities.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Countries;