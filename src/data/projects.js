export const projects = [
  {
    id: 'smart-roads',
    title: 'Smart Roads',
    description: 'AI-powered traffic management system using IoT sensors and real-time data analysis to optimize traffic flow.',
    longDescription: 'Smart Roads uses ultrasonic sensors to detect traffic density, analyzes the data with AI algorithms, and automatically adjusts traffic light timing to reduce congestion. The system includes ESP32 microcontrollers, a Node.js backend with Firebase, and a Python dashboard for real-time visualization.',
    tech: ['ESP32', 'Node.js', 'Express', 'Firebase', 'Python', 'Ultrasonic Sensors', 'IoT'],
    status: 'Completed',
    category: 'IoT & AI',
    year: '2024',
    featured: true,
    image: '/src/assets/projects/smart-roads.png',
    links: {
      github: 'https://github.com/AjCodes/Smart-Roads',
      live: null
    },
    highlights: [
      'Real-time traffic density detection',
      'AI-based traffic light optimization',
      'ESP32 microcontroller integration',
      'Firebase real-time database',
      'Python dashboard for visualization',
      'Reduces traffic congestion by 30%'
    ]
  },
  {
    id: 'focusup',
    title: 'FocusUp',
    description: 'Gamified Pomodoro productivity app that turns daily habits and tasks into an RPG-style leveling system.',
    longDescription: 'FocusUp combines Pomodoro technique with gamification elements. Track tasks as quests, build daily habits with streak tracking, and level up your character across four categories: Physical, Cognitive, Heart, and Soul. Features offline support, smart XP scaling, and a beautiful glassmorphic dark UI.',
    tech: ['React Native', 'TypeScript', 'Expo', 'Supabase', 'Zustand', 'AsyncStorage'],
    status: 'Completed',
    category: 'Mobile App',
    year: '2024',
    featured: true,
    image: '/src/assets/projects/focusup.png',
    links: {
      github: 'https://github.com/AjCodes/FocusUp',
      live: null
    },
    highlights: [
      'Pomodoro timer with gamification',
      'RPG-style leveling system (1-99)',
      'Four skill categories with XP tracking',
      'Habit tracking with streak system',
      'Offline-first with AsyncStorage',
      'Smart anti-spam XP scaling'
    ]
  },
  {
    id: 'two-layer-portfolio',
    title: 'Two-Layer Interactive Portfolio',
    description: 'The website you\'re currently viewing - a unique dual-layer portfolio with personality-driven experience and professional workspace.',
    longDescription: 'Built with React 19, Framer Motion for smooth animations, Tailwind CSS for styling, and React Router for seamless navigation. Features include custom cursor, Konami code easter egg, Spotify integration, AI chatbot, and an OS-simulator workspace.',
    tech: ['React 19', 'Framer Motion', 'Tailwind CSS', 'Spotify API', 'React Router', 'Three.js'],
    status: 'In Development',
    category: 'Web Development',
    year: '2025',
    featured: true,
    image: '/src/assets/projects/portfolio.png',
    links: {
      github: 'https://github.com/AjCodes/Portfolio-Website',
      live: null
    },
    highlights: [
      'Dual-layer interactive design',
      'Custom animated cursor',
      'Spotify API integration',
      'Easter eggs (CR7, Man United)',
      'AI chatbot with personality',
      'Fully responsive design'
    ]
  }
];
