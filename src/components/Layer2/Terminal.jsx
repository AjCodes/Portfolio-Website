import { motion } from 'framer-motion';
import { useState } from 'react';

const Terminal = ({ children, title = "AJ-OS Terminal" }) => {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <motion.div
      className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Window Header */}
      <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center gap-2">
          {/* Window Controls */}
          <div className="flex gap-2">
            <button className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors" />
            <button
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
              onClick={() => setIsMinimized(!isMinimized)}
            />
            <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors" />
          </div>

          {/* Title */}
          <span className="ml-4 text-gray-400 text-sm font-mono">{title}</span>
        </div>

        {/* Version Badge */}
        <span className="text-xs text-gray-500 font-mono">v1.0.0</span>
      </div>

      {/* Terminal Content */}
      {!isMinimized && (
        <motion.div
          className="p-6 font-mono text-sm"
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          exit={{ height: 0 }}
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Terminal;
