import { useState, useEffect } from 'react';

export default function TypewriterText() {
  const words = ['Assistance', 'Support', 'Guidance', 'Care'];
  const [currentWord, setCurrentWord] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100;
    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < words[wordIndex].length) {
        // Add characters one by one
        setCurrentWord((prev) => prev + words[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        // Remove characters one by one
        setCurrentWord((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else if (!isDeleting && charIndex === words[wordIndex].length) {
        // Pause before deleting
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && charIndex === 0) {
        // Move to the next word
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, words, wordIndex]);

  return (
    <div className="text-2xl text-teal-600 font-semibold">
      We'll help you in{' '}
      <span className="text-teal-800">{currentWord}</span>
      <span className="blinking-cursor">|</span>
    </div>
  );
}
