
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative">
      <div className="hero-gradient absolute inset-0 opacity-90"></div>
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-3xl text-white">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Learn Without Boundaries
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Discover a university-style learning experience with courses across arts, sciences, social sciences, and more. 
            Learn at your own pace and earn certificates.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <Link to="/courses">
              <Button size="lg" variant="default" className="bg-white text-primary hover:bg-white/90">
                Explore Courses
              </Button>
            </Link>
            <Link to="/student/help">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                Study Help
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
