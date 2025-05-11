import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Course } from '@/types';
import { faculties } from '@/data/faculty';
import CourseHeader from '@/components/course/CourseHeader';
import CourseTabs from '@/components/course/CourseTabs';
import CourseSidebar from '@/components/course/CourseSidebar';
import CourseNotFound from '@/components/course/CourseNotFound';

const CoursePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isEnrolled, setIsEnrolled] = useState(false);
  
  let course: Course | undefined;
  let departmentName: string = '';
  let facultyName: string = '';
  
  // Find the course across all faculties and departments
  for (const faculty of faculties) {
    for (const department of faculty.departments) {
      const found = department.courses.find((c) => c.slug === slug);
      if (found) {
        course = found;
        departmentName = department.name;
        facultyName = faculty.name;
        break;
      }
    }
    if (course) break;
  }
  
  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <CourseNotFound />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Course Header */}
        <CourseHeader 
          course={course} 
          departmentName={departmentName} 
          facultyName={facultyName} 
          isEnrolled={isEnrolled} 
          setIsEnrolled={setIsEnrolled} 
        />
        
        {/* Course Content */}
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CourseTabs course={course} departmentName={departmentName} />
            </div>
            
            <div className="lg:col-span-1">
              <CourseSidebar 
                course={course} 
                isEnrolled={isEnrolled} 
                setIsEnrolled={setIsEnrolled} 
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CoursePage;
