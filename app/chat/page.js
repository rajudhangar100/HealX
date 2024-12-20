'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import TypewriterText from '@/components/TypewriterText.js';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Chat() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    setResponse('');
    try {
      const ans = await axios.post(
        'http://127.0.0.1:8000/chat/',
        {
          message: `The user has entered the following symptoms: "${message}". Please identify the disease related to these symptoms. If the symptoms do not match any disease, respond with: "Sorry, the provided symptoms are not clear for disease identification."`,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setResponse(ans.data.response || 'No response received from the server.');
    } catch (error) {
      setResponse('An error occurred while fetching the response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen pt-20 bg-gradient-to-b from-teal-100 to-gray-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-3xl mx-auto text-center mb-8"
        >
          <TypewriterText />
          <p className="text-gray-700 mt-4 text-lg">
            Enter your symptoms below, and we'll help identify potential diseases or provide assistance.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-lg p-6 mb-8"
          >
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSubmit(e)}
              placeholder="Describe your symptoms here..."
              className="w-full h-32 px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none mb-4"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors font-medium flex items-center justify-center gap-2"
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

          {response && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h3 className="text-xl font-semibold text-teal-600 mb-4">Response:</h3>
              <div className="p-4 bg-gray-100 rounded-lg text-gray-700">
                {response}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
