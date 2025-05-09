
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, Users, Globe, School, Award } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-primary text-white">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Academy of Everywhere</h1>
              <p className="text-xl mb-8">
                Transforming education through technology, accessibility, and innovation.
              </p>
              <Link to="/courses">
                <Button size="lg" variant="secondary">
                  Explore Our Courses
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Mission Statement */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6">Our Mission</h2>
              <p className="text-lg mb-6 text-gray-700">
                At Academy of Everywhere, we are committed to democratizing education by making high-quality learning accessible to everyone, regardless of their location or background. We believe that education is a fundamental right and a powerful tool for personal and societal transformation.
              </p>
              <p className="text-lg text-gray-700">
                Through our innovative online platform, we aim to break down geographic, economic, and social barriers to education, creating a global community of lifelong learners who are empowered to achieve their full potential.
              </p>
            </div>
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                  alt="Students collaborating" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Core Values */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold mb-12 text-center">Our Core Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mb-6">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-4">Accessibility</h3>
                <p className="text-gray-600">
                  We believe education should be accessible to all, regardless of geographic location, economic situation, or personal circumstances.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mb-6">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-4">Excellence</h3>
                <p className="text-gray-600">
                  We are committed to providing the highest quality educational content, delivered by expert instructors using innovative teaching methods.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-4">Community</h3>
                <p className="text-gray-600">
                  We foster a collaborative learning environment where students and instructors from diverse backgrounds come together to share knowledge and experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* History */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-6">Our History</h2>
            <p className="text-lg mb-6 text-gray-700">
              Founded in 2020, Academy of Everywhere emerged as a response to the global educational disruption caused by the COVID-19 pandemic. What began as a small initiative to help local students continue their education remotely quickly evolved into a comprehensive online learning platform with a global reach.
            </p>
            <p className="text-lg mb-6 text-gray-700">
              Our founder, Dr. Emma Chen, a lifelong educator with over 20 years of experience in both traditional and online teaching, recognized the potential of digital technology to transform education. With a team of passionate educators and technologists, she built Academy of Everywhere on the principle that quality education should be available to everyone, everywhere.
            </p>
            <p className="text-lg text-gray-700">
              Today, we serve hundreds of thousands of students from over 150 countries, offering courses across 15 faculties and numerous departments. Our growing community of learners and educators continues to shape our evolution as we work together to redefine the future of education.
            </p>
          </div>
        </div>
        
        {/* Stats */}
        <div className="bg-primary text-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">150+</div>
                <p className="text-primary-foreground/80">Countries</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">15</div>
                <p className="text-primary-foreground/80">Faculties</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <p className="text-primary-foreground/80">Courses</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">1M+</div>
                <p className="text-primary-foreground/80">Students</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Leadership */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-serif font-bold mb-12 text-center">Our Leadership Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
                  alt="Dr. Emma Chen" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium">Dr. Emma Chen</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </div>
            
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
                  alt="Dr. Marcus Johnson" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium">Dr. Marcus Johnson</h3>
              <p className="text-gray-600">Chief Academic Officer</p>
            </div>
            
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80" 
                  alt="Sarah Lopez" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium">Sarah Lopez</h3>
              <p className="text-gray-600">Chief Technology Officer</p>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-serif font-bold mb-6">Join Our Global Learning Community</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-700">
              Discover a world of knowledge and connect with learners and experts from around the globe. Your educational journey starts here.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/courses">
                <Button size="lg" className="px-6">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Browse Courses
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="lg" variant="outline" className="px-6">
                  <School className="mr-2 h-5 w-5" />
                  Join Academy
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
