'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';

export default function TrackCalories() {
  const router = useRouter();
  const [food, setFood] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!food.trim()) return;

    setLoading(true);
    setResponse('');

    try {
      const ans = await axios.post(
        'http://172.17.6.160:8000/chat/',
        {
          message: `The user has entered the food item: "${food}". Please provide the calorie information for this food in a single line format, like: "The food item [food name] contains approximately [calories] calories." If the food item is not recognized, respond with: "Sorry, the food item is not in our database."`,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      setResponse(ans.data.response || 'No response from the server.');
    } catch (error) {
      console.error('Error:', error);
      setResponse('An error occurred while fetching the response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20 bg-gradient-to-b from-teal-100 to-gray-50">
        <div className="container mx-auto px-4 py-12 relative">
          {/* Dropdown Button */}
          <div className="absolute -top-4 right-5 mt-4">
            <div className="group inline-block relative">
              <button className="bg-teal-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-600">
                Track Calories
              </button>
              <ul className="absolute hidden group-hover:block bg-white text-black rounded-lg shadow-md mt-2">
                <li
                  onClick={() => router.push('/chat')} // Navigate to Identify Disease page
                  className="px-4 py-2 hover:bg-teal-500 hover:text-white cursor-pointer"
                >
                  Identify Disease
                </li>
                <li
                  onClick={() => router.push('/track-calories')} // Stay on Track Calories page
                  className="px-4 py-2 hover:bg-teal-500 hover:text-white cursor-pointer"
                >
                  Track Calories
                </li>
              </ul>
            </div>
          </div>

          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="max-w-3xl mx-auto text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-teal-600">Track Food Calories</h1>
            <p className="text-gray-700 mt-4 text-lg">
              Enter the name of a food item below to get its calorie information.
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
              <input
                type="text"
                value={food}
                onChange={(e) => setFood(e.target.value)}
                placeholder="Enter a food item..."
                className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent mb-4"
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
                <p className="text-gray-700">{response}</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      {/* <Footer /> */ }
    </>
  );
}
