
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-serif font-bold text-primary mb-4">Academy of Everywhere</h3>
            <p className="text-gray-600 mb-4">Expand your knowledge, advance your career, and fulfill your curiosity with our wide range of courses.</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Explore</h4>
            <ul className="space-y-2">
              <li><Link to="/faculties" className="text-gray-600 hover:text-primary">Faculties</Link></li>
              <li><Link to="/courses" className="text-gray-600 hover:text-primary">Browse Courses</Link></li>
              <li><Link to="/certificates" className="text-gray-600 hover:text-primary">Certificates</Link></li>
              <li><Link to="/instructors" className="text-gray-600 hover:text-primary">Instructors</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-primary">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-primary">Contact</Link></li>
              <li><Link to="/help" className="text-gray-600 hover:text-primary">Help & Support</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-primary">FAQs</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Join Our Community</h4>
            <p className="text-gray-600 mb-4">Subscribe to our newsletter for updates on new courses and events.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-r hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">&copy; {new Date().getFullYear()} Academy of Everywhere. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-600 hover:text-primary text-sm">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-600 hover:text-primary text-sm">Terms of Service</Link>
            <Link to="/cookies" className="text-gray-600 hover:text-primary text-sm">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
