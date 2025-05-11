
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { faculties } from '@/data/faculties';
import CourseCard from '@/components/CourseCard';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, BookOpen, Filter, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

const CoursesPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Get all courses from all departments
  const allCourses = faculties
    .flatMap(faculty => faculty.departments)
    .flatMap(department => department.courses);
  
  // Get all faculties and departments
  const allFaculties = faculties.map(faculty => ({
    id: faculty.id,
    name: faculty.name
  }));
  
  const allDifficulties = ['Beginner', 'Intermediate', 'Advanced'];
  
  // Extract search query from URL if present
  const searchParams = new URLSearchParams(location.search);
  const initialSearchQuery = searchParams.get('search') || '';
  
  // State for search, filters and pagination
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [facultyFilter, setFacultyFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const coursesPerPage = 12;

  // Update URL when search query changes
  useEffect(() => {
    if (searchQuery) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`, { replace: true });
    } else {
      navigate('/courses', { replace: true });
    }
  }, [searchQuery, navigate]);
  
  // Get departments based on selected faculty
  const availableDepartments = facultyFilter === 'all' 
    ? faculties.flatMap(faculty => faculty.departments.map(dept => ({
        id: dept.id,
        name: dept.name,
        facultyId: faculty.id
      })))
    : faculties
        .filter(faculty => faculty.id === facultyFilter)
        .flatMap(faculty => faculty.departments.map(dept => ({
          id: dept.id,
          name: dept.name,
          facultyId: faculty.id
        })));
  
  // Filter courses based on search query and filters
  const filterCourses = () => {
    let filtered = allCourses;
    
    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(course => 
        course.name.toLowerCase().includes(query) || 
        course.description.toLowerCase().includes(query) ||
        course.instructor.toLowerCase().includes(query)
      );
    }
    
    // Apply faculty filter
    if (facultyFilter !== 'all') {
      const facultyDepartmentIds = faculties
        .filter(faculty => faculty.id === facultyFilter)
        .flatMap(faculty => faculty.departments)
        .map(dept => dept.id);
      
      filtered = filtered.filter(course => facultyDepartmentIds.includes(course.departmentId));
    }
    
    // Apply department filter
    if (departmentFilter !== 'all') {
      filtered = filtered.filter(course => course.departmentId === departmentFilter);
    }
    
    // Apply difficulty filter
    if (difficultyFilter !== 'all') {
      filtered = filtered.filter(course => course.difficulty === difficultyFilter);
    }
    
    return filtered;
  };
  
  const filteredCourses = filterCourses();
  
  // Paginate courses
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  
  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
  };
  
  // Reset all filters
  const handleClearFilters = () => {
    setFacultyFilter('all');
    setDepartmentFilter('all');
    setDifficultyFilter('all');
    setCurrentPage(1);
  };
  
  // Get active filter count
  const activeFilterCount = [
    facultyFilter !== 'all',
    departmentFilter !== 'all',
    difficultyFilter !== 'all'
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-primary text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">All Courses</h1>
            <p className="text-xl max-w-3xl">
              Discover our diverse range of courses across various disciplines to enhance your knowledge and skills
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="flex items-center">
              <BookOpen className="h-6 w-6 text-primary mr-2 hidden sm:block" />
              <h2 className="text-2xl font-serif font-medium">{filteredCourses.length} Courses Available</h2>
            </div>
            
            <form onSubmit={handleSearchSubmit} className="w-full md:w-auto">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search courses by name, description or instructor..."
                  className="w-full md:w-[350px] pl-10 pr-4 py-2"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1); // Reset to first page on new search
                  }}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                {searchQuery && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setSearchQuery('')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </form>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            {/* Filters - Desktop */}
            <div className={`hidden lg:block rounded-lg border bg-card p-6 shadow-sm`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-medium text-lg">Filters</h3>
                {activeFilterCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearFilters}
                    className="h-8 text-xs"
                  >
                    Clear All
                  </Button>
                )}
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Faculty</label>
                  <Select value={facultyFilter} onValueChange={(value) => {
                    setFacultyFilter(value);
                    setDepartmentFilter('all'); // Reset department filter when faculty changes
                    setCurrentPage(1); // Reset to first page
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a faculty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Faculties</SelectItem>
                      {allFaculties.map(faculty => (
                        <SelectItem key={faculty.id} value={faculty.id}>
                          {faculty.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Department</label>
                  <Select value={departmentFilter} onValueChange={(value) => {
                    setDepartmentFilter(value);
                    setCurrentPage(1); // Reset to first page
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {availableDepartments.map(dept => (
                        <SelectItem key={dept.id} value={dept.id}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Difficulty Level</label>
                  <Select value={difficultyFilter} onValueChange={(value) => {
                    setDifficultyFilter(value);
                    setCurrentPage(1); // Reset to first page
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      {allDifficulties.map(difficulty => (
                        <SelectItem key={difficulty} value={difficulty}>
                          {difficulty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Filters button - Mobile */}
            <div className="lg:hidden mb-4 w-full">
              <Button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                variant="outline" 
                className="w-full flex items-center justify-between"
              >
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <span>Filters</span>
                </div>
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
              
              {isFilterOpen && (
                <Card className="mt-2 p-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Filters</h3>
                      {activeFilterCount > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleClearFilters}
                          className="h-8 text-xs"
                        >
                          Clear All
                        </Button>
                      )}
                    </div>
                    
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="faculty">
                        <AccordionTrigger className="text-sm py-2">Faculty</AccordionTrigger>
                        <AccordionContent>
                          <Select value={facultyFilter} onValueChange={(value) => {
                            setFacultyFilter(value);
                            setDepartmentFilter('all');
                            setCurrentPage(1);
                          }}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a faculty" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Faculties</SelectItem>
                              {allFaculties.map(faculty => (
                                <SelectItem key={faculty.id} value={faculty.id}>
                                  {faculty.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="department">
                        <AccordionTrigger className="text-sm py-2">Department</AccordionTrigger>
                        <AccordionContent>
                          <Select value={departmentFilter} onValueChange={(value) => {
                            setDepartmentFilter(value);
                            setCurrentPage(1);
                          }}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a department" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Departments</SelectItem>
                              {availableDepartments.map(dept => (
                                <SelectItem key={dept.id} value={dept.id}>
                                  {dept.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="difficulty">
                        <AccordionTrigger className="text-sm py-2">Difficulty Level</AccordionTrigger>
                        <AccordionContent>
                          <Select value={difficultyFilter} onValueChange={(value) => {
                            setDifficultyFilter(value);
                            setCurrentPage(1);
                          }}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Levels</SelectItem>
                              {allDifficulties.map(difficulty => (
                                <SelectItem key={difficulty} value={difficulty}>
                                  {difficulty}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    
                    <Button 
                      className="w-full mt-4" 
                      onClick={() => setIsFilterOpen(false)}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </Card>
              )}
            </div>
            
            {/* Course list */}
            <div className="lg:col-span-3">
              {activeFilterCount > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {facultyFilter !== 'all' && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      Faculty: {allFaculties.find(f => f.id === facultyFilter)?.name}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-4 w-4 ml-1 p-0"
                        onClick={() => setFacultyFilter('all')}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  )}
                  
                  {departmentFilter !== 'all' && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      Department: {availableDepartments.find(d => d.id === departmentFilter)?.name}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-4 w-4 ml-1 p-0"
                        onClick={() => setDepartmentFilter('all')}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  )}
                  
                  {difficultyFilter !== 'all' && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      Level: {difficultyFilter}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-4 w-4 ml-1 p-0"
                        onClick={() => setDifficultyFilter('all')}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  )}
                </div>
              )}
              
              {filteredCourses.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                        
                        {Array.from({ length: totalPages }).map((_, i) => {
                          // For desktop show more page numbers
                          if (!isMobile || 
                              i === 0 || 
                              i === totalPages - 1 || 
                              (i >= currentPage - 2 && i <= currentPage + 2)) {
                            return (
                              <PaginationItem key={i}>
                                <PaginationLink 
                                  isActive={currentPage === i + 1}
                                  onClick={() => setCurrentPage(i + 1)}
                                >
                                  {i + 1}
                                </PaginationLink>
                              </PaginationItem>
                            );
                          } else if ((i === 1 && currentPage > 4) || 
                                     (i === totalPages - 2 && currentPage < totalPages - 3)) {
                            return <PaginationItem key={i}>...</PaginationItem>;
                          }
                          return null;
                        })}
                        
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
                  <p className="text-muted-foreground mb-6">Try adjusting your search query or filters</p>
                  <Button onClick={() => {
                    setSearchQuery('');
                    handleClearFilters();
                  }}>Clear All Filters</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CoursesPage;
