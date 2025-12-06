// Import project images
import smartRoadsImg from '../assets/projects/smart-roads.png';
import focusupImg from '../assets/projects/focusup.png';
import hairstyleImg from '../assets/projects/hairstyle-mockup.png';

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
    image: smartRoadsImg,
    links: {
      github: 'https://github.com/AjCodes/Smart-Roads',
      live: null
    },
    highlights: [
      'Real-time traffic density detection',
      'AI-based traffic light optimization',
      'ESP32 microcontroller integration',
      'Firebase real-time database',
      'Python dashboard for visualization'
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
    image: focusupImg,
    links: {
      github: 'https://github.com/AjCodes/FocusUp',
      live: null
    },
    highlights: [
      'Pomodoro timer with gamification',
      'RPG-style leveling system (1-99)',
      'Four skill categories with XP tracking',
      'Habit tracking with streak system',
      'Offline-first with AsyncStorage'
    ]
  },
  {
    id: 'hairstyle-generator',
    title: 'Hairstyle Generator',
    description: 'AI-powered web app that lets you upload your photo and try different hairstyles and hair colors.',
    longDescription: 'Built with React, TypeScript, and Vite. Uses the Gemini API to analyze your photo and generate realistic hairstyle previews. You can change hairstyles, hair colors, and even add beards to see how they would look on you.',
    tech: ['React', 'TypeScript', 'Vite', 'Gemini API', 'AI/ML'],
    status: 'Completed',
    category: 'Web App',
    year: '2024',
    featured: true,
    image: hairstyleImg,
    links: {
      github: 'https://github.com/AjCodes/Hairstyle-generator-',
      live: null
    },
    highlights: [
      'Upload your own photo',
      'AI-generated hairstyle previews',
      'Change hair color',
      'Add different beard styles',
      'Powered by Gemini API'
    ]
  }
];
