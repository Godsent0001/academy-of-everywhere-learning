
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CourseCard from '@/components/CourseCard';
import { faculties } from '@/data/faculties';
import { Button } from '@/components/ui/button';
import { Department } from '@/types';
import { ChevronDown } from 'lucide-react';

const DepartmentPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [showAllCourses, setShowAllCourses] = useState(false);
  
  // Find the department across all faculties
  let department: Department | undefined;
  let facultyName = '';
  
  for (const faculty of faculties) {
    const foundDepartment = faculty.departments.find((d) => d.slug === slug);
    if (foundDepartment) {
      department = foundDepartment;
      facultyName = faculty.name;
      break;
    }
  }
  
  if (!department) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Department not found</h2>
            <p className="mb-6">Sorry, we couldn't find the department you're looking for.</p>
            <Link to="/faculties" className="text-primary hover:underline">
              Browse all faculties
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Display only a limited number of courses initially
  const initialDisplayCount = 6;
  const displayedCourses = showAllCourses
    ? department.courses
    : department.courses.slice(0, initialDisplayCount);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-primary text-white py-16">
          <div className="container mx-auto px-4">
            <div className="mb-2">
              <Link to={`/faculties`} className="text-white/70 hover:text-white">
                Faculties
              </Link>{' '}
              /{' '}
              <span className="text-white/70">{facultyName}</span>
            </div>
            <h1 className="text-4xl font-serif font-bold mb-4">{department.name}</h1>
            <p className="text-xl max-w-3xl">{department.description}</p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="mb-10">
            <h2 className="text-3xl font-serif font-bold mb-6">Available Courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
            
            {department.courses.length > initialDisplayCount && !showAllCourses && (
              <div className="mt-8 flex justify-center">
                <Button 
                  variant="outline" 
                  onClick={() => setShowAllCourses(true)}
                  className="flex items-center"
                >
                  <span>See More Courses</span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DepartmentPage;
