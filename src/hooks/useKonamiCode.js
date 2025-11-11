import { useState, useEffect } from 'react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a'
];

export const useKonamiCode = () => {
  const [success, setSuccess] = useState(false);
  const [input, setInput] = useState([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      const newInput = [...input, key];

      // Keep only the last 10 keys
      if (newInput.length > 10) {
        newInput.shift();
      }

      setInput(newInput);

      // Check if the sequence matches
      const match = KONAMI_CODE.every(
        (code, index) => code.toLowerCase() === newInput[index]
      );

      if (match) {
        setSuccess(true);
        setInput([]);

        // Reset after 5 seconds
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [input]);

  return success;
};
