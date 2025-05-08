
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, User } from 'lucide-react';
import { Input } from '@/components/ui/input';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-serif font-bold text-primary">Academy of Everywhere</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-8 mx-4 flex-grow justify-center">
          <Link to="/" className="text-gray-700 hover:text-primary transition-colors">Home</Link>
          <Link to="/faculties" className="text-gray-700 hover:text-primary transition-colors">Faculties</Link>
          <Link to="/courses" className="text-gray-700 hover:text-primary transition-colors">All Courses</Link>
          <Link to="/about" className="text-gray-700 hover:text-primary transition-colors">About</Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:block relative">
            <Input
              type="text"
              placeholder="Search courses..."
              className="w-[200px] pl-8"
            />
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5 md:hidden" />
          </Button>
          <Button variant="outline" className="hidden sm:flex">
            <User className="h-4 w-4 mr-2" />
            Sign In
          </Button>
          <Button className="hidden sm:flex">Enroll Now</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
