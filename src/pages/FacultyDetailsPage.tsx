
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CourseCard from '@/components/CourseCard';
import { faculties } from '@/data/faculties';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Faculty, Department, Course } from '@/types';

const FacultyDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const faculty = faculties.find((f) => f.slug === slug);
  
  if (!faculty) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Faculty not found</h2>
            <p className="mb-6">Sorry, we couldn't find the faculty you're looking for.</p>
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
        <div className="bg-primary text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-serif font-bold mb-4">{faculty.name}</h1>
            <p className="text-xl max-w-3xl">{faculty.description}</p>
          </div>
        </div>
        
        <div className="page-container">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="departments">Departments</TabsTrigger>
              <TabsTrigger value="courses">All Courses</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-serif font-medium mb-4">About This Faculty</h2>
                  <p className="text-gray-700 mb-6">
                    {faculty.description} Our curriculum is designed by leading experts in the field 
                    to provide you with comprehensive knowledge and practical skills.
                  </p>
                  <div className="mb-6">
                    <h3 className="text-xl font-medium mb-3">Key Features</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Expert instructors from leading institutions</li>
                      <li>Comprehensive curriculum covering theoretical and practical aspects</li>
                      <li>Interactive learning experience with quizzes and discussions</li>
                      <li>Certificates upon successful completion of courses</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-medium mb-4">Departments</h2>
                  <div className="space-y-4">
                    {faculty.departments.map((department) => (
                      <div key={department.id} className="border rounded-md p-4">
                        <h3 className="font-medium mb-1">{department.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{department.description}</p>
                        <Link to={`/department/${department.slug}`} className="text-sm text-primary hover:underline">
                          View Department →
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="departments">
              <h2 className="text-2xl font-serif font-medium mb-6">Departments in {faculty.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {faculty.departments.map((department) => (
                  <Link key={department.id} to={`/department/${department.slug}`}>
                    <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="bg-gray-100 p-8 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-2xl font-serif text-primary">{department.name.charAt(0)}</span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-serif text-xl mb-2">{department.name}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{department.description}</p>
                        <p className="text-sm text-muted-foreground">{department.courses.length} Courses</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="courses">
              <h2 className="text-2xl font-serif font-medium mb-6">All Courses in {faculty.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {faculty.departments.flatMap(dept => dept.courses).map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FacultyDetailsPage;
