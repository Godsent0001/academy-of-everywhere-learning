
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { faculties } from '@/data/faculties';
import CourseCard from '@/components/CourseCard';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const CoursesPage: React.FC = () => {
  // Get all courses from all departments
  const allCourses = faculties
    .flatMap(faculty => faculty.departments)
    .flatMap(department => department.courses);
  
  // State for search and pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 12;
  
  // Filter courses by search query
  const filteredCourses = searchQuery 
    ? allCourses.filter(course => 
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        course.description.toLowerCase().includes(searchQuery.toLowerCase()))
    : allCourses;
  
  // Paginate courses
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <header className="mb-10 text-center">
            <h1 className="text-4xl font-serif font-bold mb-4">All Courses</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our diverse range of courses to enhance your knowledge and skills
            </p>
          </header>
          
          <div className="relative max-w-lg mx-auto mb-10">
            <Input
              type="text"
              placeholder="Search courses by name or keywords..."
              className="pl-10 pr-4 py-2"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page on new search
              }}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          
          {filteredCourses.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
              
              {totalPages > 1 && (
                <Pagination className="mt-10">
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious onClick={() => setCurrentPage(current => Math.max(1, current - 1))} />
                      </PaginationItem>
                    )}
                    
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink 
                          isActive={currentPage === i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationNext onClick={() => setCurrentPage(current => Math.min(totalPages, current + 1))} />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-xl font-medium mb-2">No courses found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search query</p>
              <Button onClick={() => setSearchQuery('')}>Clear Search</Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CoursesPage;
