import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);

    if (theme === 'light') {
      document.body.style.backgroundColor = '#f5f5f5';
      document.body.style.color = '#0a0a0a';
    } else {
      document.body.style.backgroundColor = '#0a0a0a';
      document.body.style.color = '#ffffff';
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme };
};
