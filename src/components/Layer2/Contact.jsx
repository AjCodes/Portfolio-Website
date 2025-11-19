import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="space-y-8">
      <div>
        <motion.p
          className="text-green-400 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          $ ./contact.sh
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email */}
          <motion.a
            href="mailto:ajabood7788@gmail.com"
            className="block p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-purple-500 transition-all group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
          >
            <div className="text-3xl mb-3">📧</div>
            <h3 className="text-white font-bold mb-1">Email</h3>
            <p className="text-gray-400 text-sm mb-4">ajabood7788@gmail.com</p>
            <span className="text-purple-400 text-xs group-hover:underline">Send message →</span>
          </motion.a>

          {/* GitHub */}
          <motion.a
            href="https://github.com/AjCodes"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-purple-500 transition-all group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="text-3xl mb-3">🐙</div>
            <h3 className="text-white font-bold mb-1">GitHub</h3>
            <p className="text-gray-400 text-sm mb-4">@AjCodes</p>
            <span className="text-purple-400 text-xs group-hover:underline">View profile →</span>
          </motion.a>

          {/* Instagram */}
          <motion.a
            href="https://www.instagram.com/aboodmadridista/"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-purple-500 transition-all group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5 }}
          >
            <div className="text-3xl mb-3">📸</div>
            <h3 className="text-white font-bold mb-1">Instagram</h3>
            <p className="text-gray-400 text-sm mb-4">@aboodmadridista</p>
            <span className="text-purple-400 text-xs group-hover:underline">Follow me →</span>
          </motion.a>
        </div>

        {/* Message Form */}
        <motion.div
          className="mt-8 p-6 bg-gray-800 rounded-lg border border-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-white font-bold mb-4">Send a Quick Message</h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-gray-400 text-xs mb-1">Name</label>
              <input
                type="text"
                className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white text-sm focus:border-purple-500 outline-none transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-1">Message</label>
              <textarea
                className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white text-sm focus:border-purple-500 outline-none transition-colors h-24 resize-none"
                placeholder="Hello world..."
              />
            </div>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm font-semibold transition-colors">
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
