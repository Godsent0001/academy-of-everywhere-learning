
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { GraduationCap, BookOpen, Users, Globe } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-primary text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-serif font-bold mb-4">About Academy of Everywhere</h1>
            <p className="text-xl max-w-3xl">
              Discover our mission, vision, and the story behind creating a global educational platform
              that empowers learners regardless of their location.
            </p>
          </div>
        </div>
        
        <div className="page-container py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-3xl font-serif font-medium mb-6">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                Academy of Everywhere was founded with a simple yet powerful mission: to make quality education accessible
                to everyone, everywhere. We believe that education is a fundamental right and should not be limited by 
                geographical boundaries, financial constraints, or social barriers.
              </p>
              <p className="text-gray-700 mb-4">
                Our platform provides learners with access to diverse courses taught by expert instructors from around the 
                world, allowing students to gain knowledge, develop skills, and earn credentials that can help them
                advance their careers and improve their lives.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <GraduationCap className="h-20 w-20 mx-auto text-primary mb-4" />
                <h3 className="text-xl font-medium mb-2">Accessible Education</h3>
                <p>Providing quality education that breaks down barriers of location and affordability.</p>
              </div>
            </div>
          </div>
          
          <Separator className="my-12" />
          
          <h2 className="text-3xl font-serif font-medium mb-8">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <BookOpen className="h-12 w-12 mx-auto text-primary mb-4" />
                  <h3 className="text-xl font-medium mb-2">Excellence</h3>
                  <p className="text-gray-700">
                    We are committed to providing the highest quality educational content and learning experiences,
                    continuously improving our offerings to meet the evolving needs of our students.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Users className="h-12 w-12 mx-auto text-primary mb-4" />
                  <h3 className="text-xl font-medium mb-2">Inclusivity</h3>
                  <p className="text-gray-700">
                    We embrace diversity in all its forms and strive to create an inclusive learning environment
                    where everyone feels welcome, respected, and valued.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Globe className="h-12 w-12 mx-auto text-primary mb-4" />
                  <h3 className="text-xl font-medium mb-2">Innovation</h3>
                  <p className="text-gray-700">
                    We leverage technology to transform education, constantly exploring new ways to enhance
                    learning experiences and make education more effective and engaging.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Separator className="my-12" />
          
          <div className="mb-12">
            <h2 className="text-3xl font-serif font-medium mb-6">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Academy of Everywhere was established in 2023 by a group of educators and technologists who shared a 
              vision of democratizing education. Starting with a small collection of courses in technology and business,
              we have since expanded to cover a wide range of disciplines, from humanities to sciences.
            </p>
            <p className="text-gray-700 mb-4">
              Today, our platform serves students from over 150 countries, offering more than 500 courses taught by
              world-class instructors. We continually strive to expand our offerings and improve our platform to better
              serve our global community of learners.
            </p>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-lg mb-12">
            <h2 className="text-3xl font-serif font-medium mb-6">Join Our Community</h2>
            <p className="text-gray-700 mb-4">
              Whether you're a student looking to acquire new skills, an instructor interested in sharing your expertise,
              or an organization seeking to provide educational opportunities for your employees, we welcome you to join
              our growing community of learners and educators.
            </p>
            <p className="text-gray-700">
              Together, we can build a world where quality education is available to everyone, everywhere.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
