
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CourseCard from '@/components/CourseCard';
import { faculties } from '@/data/faculties';
import { Department } from '@/types';

const DepartmentPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  let department: Department | undefined;
  let facultyName: string = '';
  
  // Find the department across all faculties
  for (const faculty of faculties) {
    const found = faculty.departments.find((dept) => dept.slug === slug);
    if (found) {
      department = found;
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-secondary text-white py-16">
          <div className="container mx-auto px-4">
            <div className="mb-2">
              <Link to="/faculties" className="text-white/80 hover:text-white">Faculties</Link>
              {' › '}
              <Link to={`/faculty/${department.facultyId}`} className="text-white/80 hover:text-white">{facultyName}</Link>
            </div>
            <h1 className="text-4xl font-serif font-bold mb-4">{department.name}</h1>
            <p className="text-xl max-w-3xl">{department.description}</p>
          </div>
        </div>
        
        <div className="page-container">
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-medium mb-6">About This Department</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <p className="text-gray-700">
                {department.description} Our department offers a diverse range of courses designed to 
                provide you with both theoretical knowledge and practical skills. Whether you're a 
                beginner or looking to advance your expertise, we have courses that will meet your 
                educational goals.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-3">Department Highlights</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Expert-led instruction from leading professionals in the field</li>
                  <li>Curriculum designed to match industry standards</li>
                  <li>Interactive learning experiences with practical assignments</li>
                  <li>Dedicated Q&A sessions for each lesson</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-serif font-medium mb-6">Available Courses</h2>
            {department.courses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {department.courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-medium mb-2">No courses available yet</h3>
                <p className="text-gray-600 mb-4">We're working on adding new courses to this department.</p>
                <Link to="/courses" className="text-primary hover:underline">
                  Browse all available courses
                </Link>
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
