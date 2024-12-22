import { motion } from 'framer-motion';
// import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AnimatedCard({ title, description, isVisible }) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ 
        x: isVisible ? 0 : '-100%',
        opacity: isVisible ? 1 : 0
      }}
      exit={{ x: '-100%', opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute top-0 left-0 right-0 mx-auto bg-white rounded-lg shadow-xl p-6 w-72 h-96 flex flex-col justify-between"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-2xl font-bold text-teal-600 mb-4">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </motion.div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push('/chat')}
        className="mt-4 bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-600 transition-colors flex items-center gap-2"
      >
        Learn More
        {/* <ArrowRight className="w-4 h-4" /> */}
      </motion.button>
    </motion.div>
  );
}
