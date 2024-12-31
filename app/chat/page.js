'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import TypewriterText from '@/components/TypewriterText.js';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';

export default function Chat() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [responseArray, setResponseArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const formatMessage = (input) => {
    const lowerCaseInput = input.toLowerCase();
    return lowerCaseInput.includes(',')
      ? lowerCaseInput
      : lowerCaseInput.replace(/\s+/g, '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const formattedMessage = formatMessage(message);
    setLoading(true);
    setResponseArray([]);

    try {
      const ans = await axios.post(
        'https://groq-hm8v.vercel.app/chat/',
        {
          message: `The user has entered the following symptoms: "${formattedMessage}". Please identify the disease related to these symptoms. If the symptoms do not match any disease, respond with: "Sorry, the provided symptoms are not clear for disease identification."
          and if you identify the diseases related to the symptom then Your response must be like this "[disease1,disease2,disease3,disease4,...]", Your Response should just have this array of diseases not a single character other than that`,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const response = ans.data.response || '';
      const bracketMatch = response.match(/\[(.*?)\]/);
      const commaSeparatedMatch = response.includes(',') && !bracketMatch;

      if (bracketMatch) {
        const diseaseArray = bracketMatch[1].split(',').map((item) => item.trim());
        setResponseArray(diseaseArray);
      } else if (commaSeparatedMatch) {
        const diseaseArray = response.split(',').map((item) => item.trim());
        setResponseArray(diseaseArray);
      } else {
        setResponseArray([response]);
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseArray(['An error occurred while fetching the response. Please try again.']);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20 bg-gradient-to-b from-teal-100 to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 py-12 relative">
          <div className="absolute -top-4 right-5 mt-4" ref={dropdownRef}>
            <div
              className="group inline-block relative"
              onMouseEnter={() => setDropdownVisible(true)}
            >
              <button className="bg-teal-500 text-white px-4 py-2 text-sm rounded-lg shadow-md hover:bg-teal-600">
                Identify Disease
              </button>
              {dropdownVisible && (
                <ul className="absolute bg-white text-black rounded-lg shadow-md mt-2 right-0 z-10">
                  <li
                    onClick={() => {
                      router.push('/chat');
                      setDropdownVisible(false);
                    }}
                    className="px-4 py-2 hover:bg-teal-500 hover:text-white cursor-pointer text-sm"
                  >
                    Identify Disease
                  </li>
                  <li
                    onClick={() => {
                      router.push('/track-calories');
                      setDropdownVisible(false);
                    }}
                    className="px-4 py-2 hover:bg-teal-500 hover:text-white cursor-pointer text-sm"
                  >
                    Track Calories
                  </li>
                </ul>
              )}
            </div>
          </div>

          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="max-w-md mx-auto text-center mb-8 px-4"
          >
            <TypewriterText />
            <p className="text-gray-700 mt-4 text-sm sm:text-base">
              Enter your symptoms below, and we'll help identify potential diseases or provide assistance.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-md mx-auto"
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-8">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) =>
                  e.key === 'Enter' && !e.shiftKey && handleSubmit(e)
                }
                placeholder="Describe your symptoms here..."
                className="w-full h-32 px-4 py-2 text-sm sm:text-base text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none mb-4"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-teal-500 text-white px-4 py-3 rounded-lg hover:bg-teal-600 transition-colors font-medium flex items-center justify-center gap-2 text-sm"
                disabled={loading}
              >
                {loading ? (
                  <img
                    src="/loading.gif"
                    alt="Loading"
                    className="w-5 h-5"
                  />
                ) : (
                  'Submit'
                )}
              </motion.button>
            </form>

            {responseArray.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-lg p-4 sm:p-6"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-teal-600 mb-4">Response:</h3>
                <div className="space-y-2">
                  {responseArray.map((disease, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-100 rounded-lg text-sm sm:text-base text-gray-700"
                    >
                      {disease}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
