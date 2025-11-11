import { motion } from 'framer-motion';
import Terminal from './Terminal';

const Contact = () => {
  const contactInfo = [
    {
      label: 'Email',
      value: 'ajabood7788@gmail.com',
      link: 'mailto:ajabood7788@gmail.com',
      icon: '📧',
    },
    {
      label: 'GitHub',
      value: 'github.com/AjCodes',
      link: 'https://github.com/AjCodes',
      icon: '💻',
    },
    {
      label: 'Instagram',
      value: '@aboodmadridista',
      link: 'https://www.instagram.com/aboodmadridista/',
      icon: '📷',
    },
    {
      label: 'Spotify',
      value: 'AJ',
      link: 'https://open.spotify.com/user/1282671995',
      icon: '🎵',
    },
  ];

  return (
    <Terminal title="contact.sh">
      <div>
        <motion.p
          className="text-green-400 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          $ ./contact.sh --list
        </motion.p>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-gray-300 leading-relaxed mb-4">
            Let's connect! I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <p className="text-gray-400 text-sm">
            Available for: Freelance work, collaborations, and coffee chats ☕
          </p>
        </motion.div>

        <div className="space-y-4">
          {contactInfo.map((contact, index) => (
            <motion.a
              key={contact.label}
              href={contact.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-purple-500 transition-all group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02, x: 10 }}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{contact.icon}</span>
                <div className="flex-1">
                  <p className="text-gray-400 text-sm">{contact.label}</p>
                  <p className="text-gray-200 group-hover:text-purple-400 transition-colors">
                    {contact.value}
                  </p>
                </div>
                <span className="text-gray-600 group-hover:text-purple-400 transition-colors">
                  →
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          className="mt-8 p-4 bg-gray-800 border border-gray-700 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-gray-400 text-sm mb-2">📍 Location:</p>
          <p className="text-gray-300">Netherlands 🇳🇱</p>
          <p className="text-gray-500 text-xs mt-1">Open to remote opportunities worldwide</p>
        </motion.div>
      </div>
    </Terminal>
  );
};

export default Contact;
