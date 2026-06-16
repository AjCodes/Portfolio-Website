export const projects = [
  {
    id: 'cardan',
    number: '01',
    title: 'Cardan Accessibility Project',
    type: 'UX / Accessibility / Client Project',
    description: "An accessibility-focused interactive experience connected to Parkinson's motor symptoms. The goal was to create empathy, awareness, and real-time interaction.",
    role: 'UX research, interaction design, visual design, front-end development',
    tools: ['Figma', 'HTML', 'CSS', 'JavaScript'],
    year: '2026',
    accent: '#f3701e',
    tags: [
      {
        id: 'interaction-video',
        label: 'Interaction video',
        media: [
          {
            type: 'video',
            src: '/media/projects/cardan.mov',
            label: 'Interaction video'
          }
        ]
      }
    ],
    links: {
      github: 'https://git.fhict.nl/I575028/cardan-project',
      live: null
    }
  },
  {
    id: 'smart-roads',
    number: '02',
    title: 'Smart Roads',
    type: 'IoT / Backend / Group Project',
    description: 'A smart traffic light system using ESP32 sensors, Firebase, and a Node.js/Express backend.',
    role: 'Backend development, API design, Firebase integration, team collaboration',
    tools: ['Node.js', 'Express', 'Firebase', 'ESP32', 'Sensors'],
    year: '2026',
    accent: '#4b607f',
    tags: [
      {
        id: 'demo',
        label: 'Demo',
        media: [
          {
            type: 'image',
            src: '/media/projects/traffic-light-system-design.jpg',
            label: 'Physical prototype'
          },
          {
            type: 'video',
            src: '/media/projects/smartroads.mov',
            label: 'Dashboard'
          }
        ]
      }
    ],
    links: {
      github: 'https://github.com/AjCodes/Smart-Roads',
      live: null
    }
  },
  {
    id: 'focusup',
    number: '03',
    title: 'FocusUp',
    type: 'Personal App / Productivity / Mobile Development',
    description: 'A productivity and habit-tracking app with Pomodoro sessions, tasks, habits, rewards, and progress tracking.',
    role: 'Product thinking, UX design, app structure, React Native development',
    tools: ['React Native', 'Expo', 'Supabase', 'Authentication', 'Database structure'],
    year: '2025',
    accent: '#f3701e',
    tags: [
      {
        id: 'app-demo',
        label: 'App demo',
        media: [
          {
            type: 'video',
            src: '/media/projects/focusup.mp4',
            label: 'App demo'
          }
        ]
      }
    ],
    links: {
      github: 'https://github.com/AjCodes/FocusUp',
      live: null
    }
  }
];
