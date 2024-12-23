import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-teal-800 text-white py-10 lg:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg lg:text-xl font-bold mb-4">HealthCare</h3>
            <p className="text-teal-100 text-sm lg:text-base">
              Providing innovative healthcare solutions for a better tomorrow.
            </p>
          </div>
          <div>
            <h3 className="text-lg lg:text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-teal-100 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-teal-100 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-teal-100 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg lg:text-xl font-bold mb-4">
              Connect With Us
            </h3>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 lg:w-6 lg:h-6 text-teal-100 hover:text-white cursor-pointer" />
              <Twitter className="w-5 h-5 lg:w-6 lg:h-6 text-teal-100 hover:text-white cursor-pointer" />
              <Instagram className="w-5 h-5 lg:w-6 lg:h-6 text-teal-100 hover:text-white cursor-pointer" />
              <Mail className="w-5 h-5 lg:w-6 lg:h-6 text-teal-100 hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-teal-700 text-center text-teal-100 text-sm lg:text-base">
          <p>&copy; 2024 HealthCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
