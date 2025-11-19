import { motion } from 'framer-motion';

const DesktopIcon = ({ title, icon, onClick }) => {
    return (
        <motion.div
            className="flex flex-col items-center gap-2 w-24 p-2 rounded-lg hover:bg-white/10 cursor-pointer group"
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            drag
            dragMomentum={false}
        >
            <div className="w-12 h-12 flex items-center justify-center text-4xl filter drop-shadow-lg group-hover:drop-shadow-2xl transition-all">
                {icon}
            </div>
            <span className="text-white text-sm text-center font-medium drop-shadow-md bg-black/20 px-2 rounded">
                {title}
            </span>
        </motion.div>
    );
};

export default DesktopIcon;
