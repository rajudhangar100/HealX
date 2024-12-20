import Link from 'next/link';
import { motion } from 'framer-motion';

const NavLink = ({ to, children, onClick }) => (
  <div
    onClick={onClick}
    className="relative group cursor-pointer"
  >
    <span className="text-teal-600 group-hover:text-teal-800 font-medium transition-colors">
      {children}
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all duration-300" />
  </div>
);

export default function Navbar() {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/">
            <img 
              src="logo.png"
              alt="HealX Logo"
              className="h-10 hover:scale-105 transition-transform ml-5"
            />
        </Link>
        <div className="flex gap-8 mr-5">
          <Link href="/">
              <NavLink>Home</NavLink>
          </Link>
          <NavLink onClick={scrollToAbout}>About Us</NavLink>
          <Link href="/contact">
              <NavLink>Contact Us</NavLink>
          </Link>
        </div>
      </div>
    </nav>
  );
}
