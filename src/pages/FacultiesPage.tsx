
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { faculties } from '@/data/faculties';
import FacultyCard from '@/components/FacultyCard';

const FacultiesPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="page-container">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-serif font-bold mb-4">Academic Faculties</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our diverse range of faculties, each offering specialized departments and courses
            </p>
          </header>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {faculties.map((faculty) => (
              <FacultyCard key={faculty.id} faculty={faculty} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FacultiesPage;
