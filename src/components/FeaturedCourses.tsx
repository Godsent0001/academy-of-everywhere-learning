
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { faculties } from '@/data/faculties';
import CourseCard from './CourseCard';
import { ChevronRight } from 'lucide-react';

export const FeaturedCourses: React.FC = () => {
  // Get all courses from all departments
  const allCourses = faculties
    .flatMap(faculty => faculty.departments)
    .flatMap(department => department.courses);
  
  // Select trending tech and popular courses
  // In a real app, this would be based on analytics data
  const trendingCoursesKeywords = ['programming', 'data', 'ai', 'machine learning', 'web', 'cyber', 'blockchain'];
  
  const trendingCourses = allCourses
    .filter(course => 
      trendingCoursesKeywords.some(keyword => 
        course.name.toLowerCase().includes(keyword.toLowerCase()) || 
        course.description.toLowerCase().includes(keyword.toLowerCase())
      )
    )
    .sort((a, b) => b.lessons.length - a.lessons.length)
    .slice(0, 4);

  // If we don't have enough trending courses, add other popular courses until we have 4
  const featuredCourses = trendingCourses.length < 4 
    ? [...trendingCourses, ...allCourses.filter(course => !trendingCourses.includes(course)).slice(0, 4 - trendingCourses.length)]
    : trendingCourses;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-serif font-bold mb-2">Featured Courses</h2>
            <p className="text-gray-600 max-w-2xl">Explore our most popular courses across various disciplines</p>
          </div>
          <Link to="/courses">
            <Button variant="outline" className="mt-4 md:mt-0 group">
              View All Courses
              <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
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
