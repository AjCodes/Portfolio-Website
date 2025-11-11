import { motion } from 'framer-motion';
import { useState } from 'react';
import Skills from '../components/Layer2/Skills';
import ProjectsList from '../components/Layer2/ProjectsList';
import Contact from '../components/Layer2/Contact';
import Chatbot from '../components/Layer2/Chatbot';
import AJRobot from '../components/shared/AJRobot';
import ThemeToggle from '../components/shared/ThemeToggle';
import Terminal from '../components/Layer2/Terminal';
import { aboutMe } from '../data/skills';

const Layer2 = () => {
  const [activeTab, setActiveTab] = useState('about');

  const tabs = [
    { id: 'about', label: 'README.md', icon: '=�' },
    { id: 'skills', label: 'skills.json', icon: '�' },
    { id: 'projects', label: 'projects.md', icon: '=�' },
    { id: 'contact', label: 'contact.sh', icon: '=�' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Theme Toggle */}
      <ThemeToggle />

      {/* AJ Robot Navigation */}
      <AJRobot />

      {/* Chatbot */}
      <Chatbot />

      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div
                className="text-4xl"
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              >
                =�
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold font-mono text-gradient">AJ-OS v1.0</h1>
                <p className="text-sm text-gray-400">Professional Workspace</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Online
              </span>
              <span>|</span>
              <span>Netherlands</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-t-lg font-mono text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-gray-800 text-white border-t-2 border-purple-500'
                    : 'bg-gray-900/50 text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'about' && (
            <Terminal title="README.md">
              <div>
                <motion.p
                  className="text-green-400 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  $ cat README.md
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6"
                >
                  {/* Header */}
                  <div className="border-b border-gray-700 pb-6">
                    <h1 className="text-4xl font-bold text-gradient mb-3">{aboutMe.name}</h1>
                    <p className="text-xl text-gray-300 mb-2">{aboutMe.title}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-2">
                        =� {aboutMe.location}
                      </span>
                      <span className="flex items-center gap-2">
                        {aboutMe.available ? (
                          <>
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            Available for work
                          </>
                        ) : (
                          'Currently unavailable'
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <h2 className="text-sky-400 text-lg mb-3 font-semibold">## About</h2>
                    <div className="text-gray-300 leading-relaxed space-y-3">
                      {aboutMe.fullBio.split('\n\n').map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                  </div>

                  {/* Journey */}
                  <div>
                    <h2 className="text-purple-400 text-lg mb-3 font-semibold">## My Journey</h2>
                    <div className="space-y-2 text-gray-300">
                      <p>Born in Yemen <span className="text-gray-400">(0-3 years)</span></p>
                      <p>Grew up in Malaysia <span className="text-gray-400">(4-27 years)</span></p>
                      <p>Now in the Netherlands <span className="text-gray-400">(28+)</span></p>
                    </div>
                  </div>

                  {/* Quick Facts */}
                  <div>
                    <h2 className="text-pink-400 text-lg mb-3 font-semibold">## Quick Facts</h2>
                    <ul className="space-y-2 text-gray-300">
                      <li>Manchester United fan (GGMU!)</li>
                      <li>CR7 admirer (SIUUUU!)</li>
                      <li>Nasi Lemak enthusiast</li>
                      <li>Passionate gamer</li>
                      <li>Animation lover</li>
                    </ul>
                  </div>

                  {/* Contact CTA */}
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                    <h3 className="text-white font-semibold mb-2">Let's work together!</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      I'm always open to discussing new projects and opportunities.
                    </p>
                    <button
                      onClick={() => setActiveTab('contact')}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-shadow"
                    >
                      View Contact Info �
                    </button>
                  </div>
                </motion.div>
              </div>
            </Terminal>
          )}

          {activeTab === 'skills' && <Skills />}
          {activeTab === 'projects' && <ProjectsList />}
          {activeTab === 'contact' && <Contact />}
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-700 mt-20 py-8 px-4 text-center text-gray-500 text-sm font-mono">
        <p>AJ-OS v1.0 " Built with React & Framer Motion</p>
        <p className="mt-2">� 2025 AJ. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layer2;
