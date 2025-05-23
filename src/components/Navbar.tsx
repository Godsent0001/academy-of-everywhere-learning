
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, User, Menu, X, BookOpen, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  // Mock logged-in state - in a real app, this would come from authentication context
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      // When opening the menu, prevent body scrolling
      document.body.style.overflow = 'hidden';
    } else {
      // When closing, allow scrolling again
      document.body.style.overflow = 'auto';
    }
  };

  // Clean up the body style when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Mock login/logout functions
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-6 w-6 md:h-7 md:w-7 text-primary mr-2" />
              <span className="text-xl md:text-2xl font-serif font-bold text-primary hidden sm:inline">Academy of Everywhere</span>
              <span className="text-lg font-serif font-bold text-primary sm:hidden">Academy of Everywhere</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 mx-4 flex-grow justify-center">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors">Home</Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-gray-700 hover:text-primary transition-colors flex items-center">
                Academics <ChevronDown className="h-4 w-4 ml-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link to="/faculties" className="w-full">Faculties</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/courses" className="w-full">All Courses</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/student/help" className="text-gray-700 hover:text-primary transition-colors">Study Help</Link>
            <Link to="/about" className="text-gray-700 hover:text-primary transition-colors">About</Link>
          </div>

          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="hidden md:flex relative">
              <Input
                type="text"
                placeholder="Search courses..."
                className="w-[200px] pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            </form>
            
            <div className="hidden sm:flex space-x-2">
              {isLoggedIn ? (
                <Link to="/profile">
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Link>
              ) : (
                <>
                  <Link to="/profile">
                    <Button variant="ghost" size="sm" className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="sm">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button - INCREASED SIZE */}
            <Button variant="ghost" size="icon" className="md:hidden h-12 w-12" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 top-[73px] z-40 bg-white overflow-y-auto">
            <div className="p-4 mt-0 pb-4 animate-fade-in">
              <form onSubmit={handleSearch} className="mb-4 relative">
                <Input
                  type="text"
                  placeholder="Search courses..."
                  className="w-full pl-8 h-12 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <Button 
                  type="submit" 
                  size="sm" 
                  className="absolute right-1 top-1 h-10"
                >
                  Search
                </Button>
              </form>
              <div className="flex flex-col space-y-4">
                <Link to="/" className="text-gray-700 hover:text-primary py-3 text-lg border-b border-gray-100 font-medium transition-colors" onClick={toggleMenu}>Home</Link>
                <Link to="/faculties" className="text-gray-700 hover:text-primary py-3 text-lg border-b border-gray-100 font-medium transition-colors" onClick={toggleMenu}>Faculties</Link>
                <Link to="/courses" className="text-gray-700 hover:text-primary py-3 text-lg border-b border-gray-100 font-medium transition-colors" onClick={toggleMenu}>All Courses</Link>
                <Link to="/student/help" className="text-gray-700 hover:text-primary py-3 text-lg border-b border-gray-100 font-medium transition-colors flex items-center justify-between" onClick={toggleMenu}>
                  <span>Study Help</span>
                  <span className="bg-primary/10 text-primary py-1 px-3 rounded-full text-sm">New!</span>
                </Link>
                <Link to="/about" className="text-gray-700 hover:text-primary py-3 text-lg font-medium transition-colors" onClick={toggleMenu}>About</Link>
                <div className="pt-4 flex space-x-3">
                  <Link to="/profile" className="w-full">
                    <Button className="w-full h-12 text-base" onClick={toggleMenu}>My Profile</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
