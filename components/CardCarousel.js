import { useRouter } from 'next/navigation';
// import { ArrowRight } from 'lucide-react';

const cards = [
  {
    source: "checkup.gif",
    title: "Preventive Care",
    description: "Stay ahead of health issues with our comprehensive preventive care programs designed to maintain your wellbeing."
  },
  {
    source: "doctor.gif",
    title: "Expert Consultation",
    description: "Connect with our network of experienced healthcare professionals for personalized medical advice."
  },
  {
    source: "visualization.gif",
    title: "Digital Health",
    description: "Access your health records and connect with doctors through our innovative digital platform."
  }
];

const Card = ({ source, title, description, onClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl p-6 w-full sm:w-80 md:w-72 lg:w-80 h-auto flex flex-col justify-between transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:ring-2 hover:ring-teal-500">
      <div className="text-center">
        <img src={source} alt="gif" className="w-32 h-32 sm:w-48 sm:h-48 mx-auto mb-4" />
        <h3 className="text-xl sm:text-2xl font-bold text-teal-600 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
      <button
        onClick={onClick}
        className="mt-4 bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-600 transition-colors flex items-center justify-center gap-2"
      >
        Learn More
        {/* <ArrowRight className="w-4 h-4" /> */}
      </button>
    </div>
  );
};

export default function CardCarousel() {
  const router = useRouter();

  return (
    <div className="flex flex-wrap justify-center gap-8 py-10">
      {cards.map((card, index) => (
        <Card
          key={index}
          {...card}
          onClick={() => router.push('/chat')}
        />
      ))}
    </div>
  );
}
