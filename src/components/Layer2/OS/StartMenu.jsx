import { motion, AnimatePresence } from 'framer-motion';
import { useWindow } from '../../../context/WindowManagerContext';

const StartMenu = ({ isOpen, onClose }) => {
    const { openWindow } = useWindow();

    const menuItems = [
        { id: 'about', label: 'About Me', icon: '📝', action: () => openWindow('about', 'README.md', null, '📝') },
        { id: 'skills', label: 'Skills', icon: '⚡', action: () => openWindow('skills', 'skills.json', null, '⚡') },
        { id: 'projects', label: 'Projects', icon: '🚀', action: () => openWindow('projects', 'projects.md', null, '🚀') },
        { id: 'contact', label: 'Contact', icon: '📫', action: () => openWindow('contact', 'contact.sh', null, '📫') },
        { id: 'terminal', label: 'Terminal', icon: '💻', action: () => openWindow('terminal', 'Terminal', null, '💻') },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop to close menu */}
                    <div className="fixed inset-0 z-40" onClick={onClose} />

                    <motion.div
                        className="fixed bottom-14 left-4 w-64 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-lg shadow-2xl z-50 overflow-hidden"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Header */}
                        <div className="p-4 bg-gradient-to-r from-primary/20 to-secondary/20 border-b border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                                    AJ
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm">AJ Codes</h3>
                                    <p className="text-xs text-gray-400">Guest User</p>
                                </div>
                            </div>
                        </div>

                        {/* Menu Items */}
                        <div className="p-2">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        item.action();
                                        onClose();
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-white/10 text-gray-300 hover:text-white transition-colors text-left"
                                >
                                    <span className="text-xl">{item.icon}</span>
                                    <span className="text-sm font-medium">{item.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="p-3 border-t border-gray-700 flex justify-between items-center bg-black/20">
                            <button className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                                <span>⚙️</span> Settings
                            </button>
                            <button className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-2">
                                <span>🔌</span> Shut Down
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default StartMenu;
