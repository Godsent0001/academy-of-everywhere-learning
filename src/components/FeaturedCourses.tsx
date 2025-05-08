
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { faculties } from '@/data/faculties';
import CourseCard from './CourseCard';

export const FeaturedCourses: React.FC = () => {
  // Get all courses from all departments
  const allCourses = faculties
    .flatMap(faculty => faculty.departments)
    .flatMap(department => department.courses);
  
  // Get a sample of courses to feature (limited to 4)
  const featuredCourses = allCourses.slice(0, 4);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-serif font-bold mb-2">Featured Courses</h2>
            <p className="text-gray-600 max-w-2xl">Explore our most popular courses across various disciplines</p>
          </div>
          <Link to="/courses">
            <Button variant="outline" className="mt-4 md:mt-0">View All Courses</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
