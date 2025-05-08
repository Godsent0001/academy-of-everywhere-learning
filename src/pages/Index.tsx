
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeaturedCourses from '@/components/FeaturedCourses';
import FacultySection from '@/components/FacultySection';
import TestimonialSection from '@/components/TestimonialSection';
import StatsSection from '@/components/StatsSection';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedCourses />
        <StatsSection />
        <FacultySection />
        <TestimonialSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
