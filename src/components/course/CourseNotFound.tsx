
import React from 'react';
import { Link } from 'react-router-dom';

const CourseNotFound: React.FC = () => {
  return (
    <div className="flex-grow flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Course not found</h2>
        <p className="mb-6">Sorry, we couldn't find the course you're looking for.</p>
        <Link to="/courses" className="text-primary hover:underline">
          Browse all courses
        </Link>
      </div>
    </div>
  );
};

export default CourseNotFound;
