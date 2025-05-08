
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { faculties } from '@/data/faculties';
import FacultyCard from './FacultyCard';

export const FacultySection: React.FC = () => {
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
          {faculties.map(faculty => (
            <FacultyCard key={faculty.id} faculty={faculty} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacultySection;
