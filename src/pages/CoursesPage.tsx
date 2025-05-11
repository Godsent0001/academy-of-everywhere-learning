import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CourseCard from '@/components/CourseCard';
import { faculties } from '@/data/faculty';
import { Course } from '@/types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

const CoursesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [difficultyFilter, setDifficultyFilter] = React.useState('all');
  const [departmentFilter, setDepartmentFilter] = React.useState('all');

  // Extract all courses from faculties
  const allCourses: Course[] = React.useMemo(() => {
    return faculties.flatMap(faculty =>
      faculty.departments.flatMap(department => department.courses)
    );
  }, []);

  // Extract all departments for filtering
  const allDepartments = React.useMemo(() => {
    return faculties.flatMap(faculty => faculty.departments);
  }, []);

  const filteredCourses = React.useMemo(() => {
    let result = allCourses;
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(course => 
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply difficulty filter
    if (difficultyFilter !== 'all') {
      result = result.filter(course => course.difficulty.toLowerCase() === difficultyFilter);
    }
    
    // Apply department filter
    if (departmentFilter !== 'all') {
      result = result.filter(course => course.departmentId === departmentFilter);
    }
    
    return result;
  }, [allCourses, searchQuery, difficultyFilter, departmentFilter]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-secondary text-white py-12">
          <div className="container mx-auto px-4">
            <header className="mb-8 text-center">
              <h1 className="text-4xl font-serif font-bold mb-4">Explore Our Courses</h1>
              <p className="text-xl text-secondary-foreground/80 max-w-3xl mx-auto">
                Dive into a wide range of courses designed to enhance your skills and knowledge.
              </p>
            </header>

            <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search courses..."
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Select onValueChange={setDifficultyFilter}>
                <SelectTrigger className="w-full md:w-auto bg-white/10 border-white/20 text-white placeholder:text-white/60">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent className="bg-secondary text-white border-white/20">
                  <SelectItem value="all">All Difficulties</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-full md:w-auto bg-white/10 border-white/20 text-white placeholder:text-white/60">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent className="bg-secondary text-white border-white/20">
                  <SelectItem value="all">All Departments</SelectItem>
                  {allDepartments.map(department => (
                    <SelectItem key={department.id} value={department.id}>
                      {department.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No courses found</h3>
              <p className="text-gray-600">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CoursesPage;
