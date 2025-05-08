
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookX } from 'lucide-react';

const CourseNotFound: React.FC = () => {
  return (
    <div className="flex-grow flex items-center justify-center py-16">
      <div className="text-center max-w-md px-4">
        <div className="mb-6 flex justify-center">
          <BookX className="h-16 w-16 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
        <p className="mb-8 text-gray-600">
          Sorry, we couldn't find the course you're looking for. It may have been moved or doesn't exist yet.
        </p>
        <div className="space-y-4">
          <Link to="/courses">
            <Button className="w-full">Browse All Courses</Button>
          </Link>
          <Link to="/">
            <Button variant="outline" className="w-full">Return to Homepage</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseNotFound;
