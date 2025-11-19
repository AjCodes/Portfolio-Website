import { motion } from 'framer-motion';

const CaseStudyView = () => {
    return (
        <div className="h-full flex items-center justify-center">
            <motion.div
                className="text-center glass-card p-12 rounded-3xl border border-white/10 max-w-2xl mx-4"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            >
                <div className="text-6xl mb-6">🧪</div>
                <h2 className="text-4xl font-bold mb-4 text-white">Case Studies</h2>
                <p className="text-xl text-gray-400 mb-8">
                    Deep dives into my problem-solving process and architectural decisions are coming soon.
                </p>
                <div className="flex justify-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-gray-600 animate-bounce" style={{ animationDelay: '0s' }} />
                    <span className="w-3 h-3 rounded-full bg-gray-600 animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <span className="w-3 h-3 rounded-full bg-gray-600 animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
            </motion.div>
        </div>
    );
};

export default CaseStudyView;
