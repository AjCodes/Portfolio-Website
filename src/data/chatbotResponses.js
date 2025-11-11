export const chatbotResponses = {
  greetings: [
    "Hey there! 👋 I'm AJ Robot, here to tell you all about my creator!",
    "Hello! 🤖 Ready to learn about AJ?",
    "Hi! Nice to meet you! What would you like to know about AJ?"
  ],

  skills: {
    triggers: ['skill', 'skills', 'tech', 'technology', 'stack', 'know', 'language', 'framework'],
    responses: [
      "AJ is skilled in JavaScript, TypeScript, Python, and SQL. He specializes in React and React Native development, and loves working with Framer Motion to create smooth animations! ⚡",
      "His tech stack includes React, React Native, Expo Go, and he's great with tools like Git and Figma. He's all about creating beautiful, interactive experiences! 🎨"
    ]
  },

  origin: {
    triggers: ['from', 'where', 'origin', 'born', 'country', 'countries', 'journey'],
    responses: [
      "AJ has an amazing multicultural journey! Born in Yemen 🇾🇪 (0-3 years), grew up in Malaysia 🇲🇾 (4-27 years), and now he's in the Netherlands 🇳🇱 building his future!",
      "He's a true citizen of the world! Started in Yemen, spent most of his life in Malaysia, and now calls the Netherlands home. Each place shaped who he is today! 🌍"
    ]
  },

  likes: {
    triggers: ['like', 'love', 'enjoy', 'hobby', 'hobbies', 'interest', 'passion'],
    responses: [
      "AJ is a huge Manchester United fan 🔴, loves Cristiano Ronaldo (SIUUUU! ⚽), enjoys gaming 🎮, and can't resist a good plate of Nasi Lemak 🍚!",
      "Football is his passion (especially Man United!), he's a dedicated gamer, and he's always looking for the best Nasi Lemak in town. Oh, and he loves creating cool web experiences! 🚀"
    ]
  },

  projects: {
    triggers: ['project', 'projects', 'work', 'working', 'built', 'build', 'portfolio'],
    responses: [
      "You're looking at his main project right now! This two-layer portfolio showcases both his personality and professional skills. It's got custom animations, Easter eggs, and even Spotify integration! 🎵",
      "This portfolio is a labor of love - built with React, Framer Motion, and Tailwind CSS. He wanted to create something unique that stands out from typical portfolios. Mission accomplished! ✨"
    ]
  },

  contact: {
    triggers: ['contact', 'email', 'reach', 'connect', 'hire', 'github', 'instagram'],
    responses: [
      "Want to reach out? Email AJ at ajabood7788@gmail.com 📧, check out his GitHub at github.com/AjCodes, or follow him on Instagram @aboodmadridista!",
      "He'd love to hear from you! Drop him an email at ajabood7788@gmail.com or connect on social media. Always open to new opportunities and collaborations! 🤝"
    ]
  },

  nasilemak: {
    triggers: ['nasi lemak', 'nasilemak', 'food', 'eat', 'breakfast', 'malaysian food'],
    responses: [
      "Ah, you mentioned the holy grail! Nasi Lemak is AJ's favorite breakfast - coconut rice, sambal, anchovies, peanuts, egg, and cucumber. It's a Malaysian masterpiece! 🍚✨",
      "NASI LEMAK! 🍚 You've discovered AJ's weakness! There's a secret Easter egg about it somewhere on this site... 👀"
    ]
  },

  cr7: {
    triggers: ['ronaldo', 'cr7', 'cristiano', 'siuu'],
    responses: [
      "SIUUUUU! ⚽ AJ is a huge CR7 fan! Fun fact: there's a secret Konami code on this site that triggers something special related to the GOAT himself... 👀",
      "Cristiano Ronaldo is AJ's football hero! The dedication, the work ethic, the goals - everything! Try the Konami code (↑↑↓↓←→←→BA) for a surprise! 🎮"
    ]
  },

  manutd: {
    triggers: ['manchester united', 'man united', 'manutd', 'ggmu', 'united', 'red devils'],
    responses: [
      "Glory Glory Man United! 🔴 AJ bleeds red. Through the highs and lows, always a Red Devil! There might be a hidden Man United logo somewhere on this site... 🔍",
      "GGMU! AJ's been a Manchester United fan through thick and thin. The passion never dies! Keep your eyes peeled for United Easter eggs! 👀"
    ]
  },

  robot: {
    triggers: ['you', 'robot', 'bot', 'ai', 'who are you', 'your name'],
    responses: [
      "I'm AJ Robot! 🤖 I'm here to help you learn about my creator, AJ. Think of me as his friendly digital ambassador!",
      "Call me AJ Robot! I'm a chatbot with personality (just like my creator!). I can answer questions about AJ's skills, journey, and interests! 🤖✨"
    ]
  },

  help: {
    triggers: ['help', 'what can you do', 'commands', 'ask'],
    responses: [
      "You can ask me about AJ's skills, his journey across countries, his interests, projects, or how to contact him! Try asking about Nasi Lemak, CR7, or Man United for some fun responses! 😊",
      "I can tell you about: his tech skills 💻, his multicultural journey 🌍, his hobbies and interests ⚽🎮, his projects 🚀, or how to reach him 📧. What interests you?"
    ]
  },

  default: [
    "Hmm, I'm not sure about that! Try asking me about AJ's skills, background, interests, or projects! 🤔",
    "Interesting question! But I'm better at talking about AJ's skills, journey, or hobbies. What would you like to know? 😊",
    "I might not have an answer for that, but I'd love to tell you about AJ's work, his multicultural background, or his passions! What interests you? 🤖"
  ]
};

export const getResponse = (userInput) => {
  const input = userInput.toLowerCase().trim();

  // Check for greetings
  if (/(hi|hello|hey|hola|yo|sup|greetings)/i.test(input)) {
    return chatbotResponses.greetings[Math.floor(Math.random() * chatbotResponses.greetings.length)];
  }

  // Check each category
  for (const category in chatbotResponses) {
    if (category === 'greetings' || category === 'default') continue;

    const { triggers, responses } = chatbotResponses[category];

    if (triggers && triggers.some(trigger => input.includes(trigger))) {
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }

  // Default response
  return chatbotResponses.default[Math.floor(Math.random() * chatbotResponses.default.length)];
};
