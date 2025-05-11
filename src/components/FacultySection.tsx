
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { faculties } from '@/data/faculties';
import FacultyCard from './FacultyCard';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FacultySection: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const initialDisplay = 4; // Number of faculties to show initially
  
  const displayedFaculties = showAll ? faculties : faculties.slice(0, initialDisplay);
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-serif font-bold mb-2">Browse by Faculty</h2>
            <p className="text-gray-600 max-w-2xl">Discover courses across academic disciplines from arts to sciences</p>
          </div>
          <Link to="/faculties">
            <Button variant="outline" className="mt-4 md:mt-0">Explore All</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedFaculties.map(faculty => (
            <FacultyCard key={faculty.id} faculty={faculty} />
          ))}
        </div>
        
        {faculties.length > initialDisplay && (
          <div className="flex justify-center mt-8">
            <Button 
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2"
            >
              {showAll ? (
                <>
                  Show Less <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Show More <ChevronDown className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FacultySection;
