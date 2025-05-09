
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, BookOpen, Search, ChevronLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
      <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="mb-6 flex justify-center">
          <div className="h-24 w-24 rounded-full bg-red-50 flex items-center justify-center">
            <span className="text-5xl font-serif text-red-500">404</span>
          </div>
        </div>
        <h1 className="text-3xl font-serif font-bold mb-2">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been removed, renamed, or
          doesn't exist yet.
        </p>
        <div className="space-y-4">
          <Link to="/" className="block">
            <Button className="w-full flex items-center justify-center">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Button>
          </Link>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/courses" className="block">
              <Button variant="outline" className="w-full flex items-center justify-center">
                <BookOpen className="mr-2 h-4 w-4" />
                Browse Courses
              </Button>
            </Link>
            <Link to="/faculties" className="block">
              <Button variant="outline" className="w-full flex items-center justify-center">
                <Search className="mr-2 h-4 w-4" />
                View Faculties
              </Button>
            </Link>
          </div>
          <Link to="/" className="flex items-center justify-center text-sm text-primary hover:underline mt-4">
            <ChevronLeft className="h-3 w-3 mr-1" />
            Go back to previous page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
