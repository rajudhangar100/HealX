"use client"
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation'; // Replacing useNavigate with useRouter for Next.js
import Navbar from '@/components/Navbar';
import CardCarousel from '../components/CardCarousel';
import Footer from '@/components/Footer';

export default function Home() {
  const aboutRef = useRef(null);
  const router = useRouter();

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen">
      <div className="relative h-screen">
        <video
          autoPlay
          loop
          muted
          src='intro.mp4'
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute right-0 top-0 bottom-0 w-2/5 bg-white/90 backdrop-blur-sm flex items-center p-12"
        >
          <div className='mt-4'>
            <motion.h1 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold text-teal-600 mb-6 "
            >
              <div className='flex gap-4 items-end'>
              Welcome to <span className='self-start'><img src='logo.png' alt='logo' height={110} width={110}/></span>
              </div>
            </motion.h1>
            <motion.p 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 text-lg mb-8"
            >
              Experience the future of healthcare with our innovative solutions designed to provide you with the best medical care possible.
            </motion.p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/chat')} // Using router.push for navigation
              className="bg-teal-500 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-teal-600 transition-colors mr-4"
            >
              Get Started
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToAbout}
              className="bg-white text-teal-500 border-2 border-teal-500 px-8 py-3 rounded-full text-lg font-medium hover:bg-teal-50 transition-colors"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </div>

      <div ref={aboutRef} id="about" className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center text-teal-600 mb-16"
          >
            Why Choose HealX
          </motion.h2>
          <CardCarousel />
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
