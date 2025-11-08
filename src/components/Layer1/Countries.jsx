import { motion } from 'framer-motion';
import { useState } from 'react';

const Countries = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const countries = [
    {
      name: "Yemen",
      flag: "🇾🇪",
      years: "Born - Age 4",
      color: "from-red-600 to-red-800",
      story: "Where it all began. The foundations of who I am.",
      food: "☕ Qahwa (Yemeni Coffee)",
    },
    {
      name: "Malaysia",
      flag: "🇲🇾",
      years: "Age 4 - 24 (20 Years)",
      color: "from-blue-600 to-blue-800",
      story: "Home. Where I grew up, learned, and became who I am today.",
      food: "🍚 Nasi Lemak",
      highlight: true
    },
    {
      name: "Netherlands",
      flag: "🇳🇱",
      years: "Present",
      color: "from-orange-600 to-red-600",
      story: "Building my future, one line of code at a time.",
      food: "🧇 Stroopwafel",
    }
  ];

  return (
    <div className="py-20">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h3 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Countries That Shaped Me
        </h3>
        <p className="text-gray-400 text-lg">
          A journey across continents, cultures, and code
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Connecting Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-red-500 via-blue-500 to-orange-500 hidden md:block"></div>

        {/* Country Cards */}
        <div className="space-y-24">
          {countries.map((country, index) => (
            <motion.div
              key={country.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`flex items-center ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } flex-col gap-8`}
            >
              {/* Card */}
              <div className="w-full md:w-5/12">
                <motion.div
                  whileHover={{ scale: 1.05, y: -10 }}
                  onClick={() => setSelectedCountry(selectedCountry === index ? null : index)}
                  className={`bg-gradient-to-br ${country.color} p-8 rounded-2xl shadow-2xl cursor-pointer relative overflow-hidden
                    ${country.highlight ? 'ring-4 ring-yellow-400' : ''}
                  `}
                >
                  {/* Highlight badge */}
                  {country.highlight && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold"
                    >
                      HOME
                    </motion.div>
                  )}

                  {/* Flag */}
                  <motion.div 
                    className="text-7xl mb-4"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                  >
                    {country.flag}
                  </motion.div>

                  {/* Country Info */}
                  <h3 className="text-4xl font-bold text-white mb-2">
                    {country.name}
                  </h3>
                  <p className="text-white/80 text-lg mb-4">{country.years}</p>
                  <p className="text-white/90 text-base leading-relaxed">
                    {country.story}
                  </p>

                  {/* Food Easter Egg */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={
                      selectedCountry === index
                        ? { opacity: 1, height: 'auto' }
                        : { opacity: 0, height: 0 }
                    }
                    className="mt-4 pt-4 border-t border-white/30 overflow-hidden"
                  >
                    <p className="text-white/90 text-lg">
                      {country.food}
                    </p>
                    <p className="text-white/70 text-sm mt-1">
                      The taste of {country.name}
                    </p>
                  </motion.div>

                  {/* Click hint */}
                  <motion.div 
                    className="mt-4 text-white/50 text-sm"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    {selectedCountry === index ? '↑ Click to hide' : '↓ Click to reveal hidden treasure'}
                  </motion.div>
                </motion.div>
              </div>

              {/* Timeline Dot */}
              <div className="hidden md:block w-2/12 flex justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  whileHover={{ scale: 1.5 }}
                  transition={{ type: "spring" }}
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 ring-4 ring-black"
                ></motion.div>
              </div>

              {/* Spacer */}
              <div className="w-full md:w-5/12"></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Journey Summary */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-20 text-center"
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
  );
};

export default Countries;