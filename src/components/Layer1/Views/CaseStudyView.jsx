import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import smartRoadsImg from '../../../assets/projects/smart-roads.png';

// Case study data
const caseStudies = [
    {
        id: 'smart-roads',
        title: 'Smart Roads',
        subtitle: 'AI-Powered Traffic Management',
        category: 'IoT & AI',
        year: '2025',
        duration: '4 weeks',
        image: smartRoadsImg,
        role: 'Backend Developer',
        tech: ['ESP32', 'Node.js', 'Express', 'Firebase', 'Python', 'Ultrasonic Sensors'],
        overview: 'How I built an intelligent traffic system that reduces congestion using IoT sensors and real-time AI decision making.',
        sections: [
            {
                title: 'The Problem',
                content: `Traditional traffic lights operate on fixed timers, completely ignoring actual traffic conditions. This leads to unnecessary wait times, increased emissions, and frustrated drivers. I wanted to build something smarter—a system that sees the traffic and thinks before it acts.`
            },
            {
                title: 'The Approach',
                content: `I designed a 4-lane intersection model with ultrasonic sensors at each lane entrance. These sensors detect vehicle presence and measure queue length in real-time.

The data flows to an ESP32 microcontroller, which sends it to a Node.js backend. Here's where the magic happens: an AI algorithm analyzes traffic density across all lanes and dynamically adjusts green light duration.

The busiest lane gets priority. No more waiting at an empty intersection while cars pile up on the other side.`
            },
            {
                title: 'The Result',
                content: `The system successfully prioritizes high-traffic lanes, reducing simulated average wait times. A Python dashboard provides real-time visualization of sensor data and AI decisions.`
            }
        ],
        results: ['Real-time decisions', 'Reduced wait times', 'Live dashboard'],
        githubUrl: 'https://github.com/AjCodes/Smart-Roads'
    }
];

// Book Card Component
const BookCard = ({ study, onClick }) => (
    <motion.button
        onClick={onClick}
        className="group relative w-full max-w-xs aspect-[3/4] rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] hover:border-primary/40 transition-all duration-300 shadow-xl hover:shadow-primary/20 cursor-pointer text-left"
        whileHover={{ y: -5, rotateY: 5 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
    >
        {/* Book Spine Effect */}
        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-primary/20 to-transparent" />

        {/* Cover Image */}
        <div className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity">
            <img src={study.image} alt={study.title} className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

        {/* Content */}
        <div className="relative h-full p-6 flex flex-col justify-end">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary mb-2">
                {study.category}
            </span>
            <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
                {study.title}
            </h3>
            <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                {study.subtitle}
            </p>
            {/* Tech Stack Preview - Replaces Duration */}
            <div className="flex flex-wrap gap-1.5 mb-1">
                {study.tech.slice(0, 3).map((tech, i) => (
                    <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-gray-300 border border-white/5">
                        {tech}
                    </span>
                ))}
                {study.tech.length > 3 && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-gray-400 border border-white/5">
                        +{study.tech.length - 3}
                    </span>
                )}
            </div>

            {/* Read indicator */}
            <div className="mt-4 flex items-center gap-2 text-primary text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Read Case Study</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </div>
        </div>
    </motion.button>
);

// Modal Component
const CaseStudyModal = ({ study, onClose }) => (
    <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
        {/* Backdrop */}
        <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        />

        {/* Modal Content */}
        <motion.div
            className="relative bg-[#0f0f1a] border border-white/10 rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden shadow-2xl"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[85vh] p-8">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 rounded-full border border-primary/20">
                            {study.category}
                        </span>
                        <span className="text-gray-500 text-sm">{study.year}</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">{study.title}</h1>
                    <p className="text-gray-400 text-lg">{study.overview}</p>
                </div>

                {/* Hero Image */}
                <div className="rounded-xl overflow-hidden border border-white/10 mb-8">
                    <img src={study.image} alt={study.title} className="w-full h-48 object-cover" />
                </div>

                {/* Sections */}
                <div className="space-y-6 mb-8">
                    {study.sections.map((section, index) => (
                        <div key={index} className="glass-card p-5 rounded-xl border border-white/10 bg-black/20">
                            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                <span className="text-primary">0{index + 1}</span> {section.title}
                            </h2>
                            <p className="text-gray-300 leading-relaxed whitespace-pre-line">{section.content}</p>
                        </div>
                    ))}
                </div>

                {/* Results */}
                <div className="mb-8">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Key Results</h3>
                    <div className="flex flex-wrap gap-3">
                        {study.results.map((result, i) => (
                            <div key={i} className="px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium">
                                ✓ {result}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="p-4 rounded-xl border border-white/10 bg-black/20">
                        <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Tech Stack</h4>
                        <div className="flex flex-wrap gap-1.5">
                            {study.tech.map((t) => (
                                <span key={t} className="text-xs px-2 py-1 rounded-md bg-white/5 text-gray-300">{t}</span>
                            ))}
                        </div>
                    </div>
                    <div className="p-4 rounded-xl border border-white/10 bg-black/20">
                        <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Timeline</h4>
                        <p className="text-gray-300 text-sm">{study.duration}</p>
                    </div>
                    <div className="p-4 rounded-xl border border-white/10 bg-black/20">
                        <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">My Role</h4>
                        <p className="text-gray-300 text-sm">{study.role}</p>
                    </div>
                </div>

                {/* CTA */}
                <a
                    href={study.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-primary transition-colors"
                >
                    View on GitHub
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </a>
            </div>
        </motion.div>
    </motion.div>
);

const CaseStudyView = () => {
    const [selectedStudy, setSelectedStudy] = useState(null);

    return (
        <div className="w-full px-6 pt-10 pb-4 max-w-7xl mx-auto relative z-20">
            {/* Header */}
            <motion.div
                className="mb-8"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <h1 className="text-2xl font-bold text-white mb-2">Case Studies</h1>
                <p className="text-gray-400 text-sm max-w-xl">
                    Deep dives into my problem-solving process. Click a case study to explore.
                </p>
            </motion.div>

            {/* Case Study Books */}
            <div className="flex flex-wrap gap-6">
                {caseStudies.map((study) => (
                    <BookCard
                        key={study.id}
                        study={study}
                        onClick={() => setSelectedStudy(study)}
                    />
                ))}

                {/* Coming Soon Placeholder */}
                <motion.div
                    className="w-full max-w-xs aspect-[3/4] rounded-xl border border-dashed border-white/20 bg-white/5 flex flex-col items-center justify-center text-center p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="text-4xl mb-3 opacity-50">📚</div>
                    <h3 className="text-lg font-bold text-gray-500 mb-1">More Coming Soon</h3>
                    <p className="text-xs text-gray-600">New case studies are in the works</p>
                </motion.div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedStudy && (
                    <CaseStudyModal
                        study={selectedStudy}
                        onClose={() => setSelectedStudy(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default CaseStudyView;
