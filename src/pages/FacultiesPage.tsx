
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { faculties } from '@/data/faculties';
import FacultyCard from '@/components/FacultyCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const FacultiesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const filteredFaculties = faculties.filter(faculty => 
    faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faculty.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-primary text-white py-12">
          <div className="container mx-auto px-4">
            <header className="mb-8 text-center">
              <h1 className="text-4xl font-serif font-bold mb-4">Academic Faculties</h1>
              <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
                Explore our diverse range of faculties, each offering specialized departments and courses
              </p>
            </header>
            
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Search faculties..." 
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFaculties.map((faculty) => (
              <FacultyCard key={faculty.id} faculty={faculty} />
            ))}
          </div>
          
          {filteredFaculties.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No results found</h3>
              <p className="text-gray-600">Try a different search term</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FacultiesPage;
