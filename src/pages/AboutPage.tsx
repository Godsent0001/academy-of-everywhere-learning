
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, GraduationCap, Users, Award } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-primary text-white py-16 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">About Academy of Everywhere</h1>
            <p className="text-xl max-w-3xl">
              Expanding horizons through accessible, high-quality education for learners worldwide.
            </p>
          </div>
          <div className="absolute inset-0 z-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              className="w-full h-full object-cover"
              alt="Campus view"
            />
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6">
                At Academy of Everywhere, we believe that education should be accessible to everyone, 
                regardless of geographic location or personal circumstances. Our mission is to democratize 
                learning by providing high-quality educational resources and experiences through an 
                innovative digital platform.
              </p>
              <p className="text-lg text-gray-700">
                We are committed to fostering a supportive learning environment that embraces diversity, 
                promotes critical thinking, and empowers individuals to achieve their personal and 
                professional goals through lifelong learning.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f8e1c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1247&q=80"
                alt="Students learning"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-serif font-bold mb-8 text-center">Our Core Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="shadow-md">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <BookOpen className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Accessibility</h3>
                    <p className="text-gray-600">
                      We strive to make education accessible to all, breaking down barriers of location, cost, and background.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-md">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <GraduationCap className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Excellence</h3>
                    <p className="text-gray-600">
                      We are committed to providing the highest quality educational content and experiences.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-md">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Community</h3>
                    <p className="text-gray-600">
                      We foster a supportive learning environment where students and educators collaborate and grow together.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-md">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Award className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Innovation</h3>
                    <p className="text-gray-600">
                      We embrace new technologies and pedagogical approaches to enhance the learning experience.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-serif font-bold mb-8">Our Story</h2>
            <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
              <p className="text-lg text-gray-700 mb-6">
                Founded in 2020, Academy of Everywhere began as a response to the global disruption in 
                traditional education caused by the COVID-19 pandemic. A group of passionate educators, 
                technologists, and lifelong learners came together with a shared vision: to create a 
                digital learning platform that would transcend the limitations of physical classrooms.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                What started as a collection of online courses has evolved into a comprehensive educational 
                ecosystem spanning 15 faculties and numerous departments, offering everything from introductory 
                courses to specialized advanced studies. Today, our platform serves learners from over 150 
                countries, with courses taught by distinguished faculty members from renowned institutions worldwide.
              </p>
              <p className="text-lg text-gray-700">
                As we continue to grow, we remain committed to our founding principle: that high-quality education 
                should be available to everyone, everywhere.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-serif font-bold mb-8">Leadership Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-36 h-36 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                    alt="Dr. James Wilson"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-medium">Dr. James Wilson</h3>
                <p className="text-gray-600 mb-2">Founder & President</p>
                <p className="text-sm text-gray-700">
                  Former Dean of Education at Cambridge University with over 25 years of experience in educational leadership.
                </p>
              </div>
              <div className="text-center">
                <div className="w-36 h-36 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80"
                    alt="Dr. Elena Rodriguez"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-medium">Dr. Elena Rodriguez</h3>
                <p className="text-gray-600 mb-2">Chief Academic Officer</p>
                <p className="text-sm text-gray-700">
                  Specialist in educational technology and curriculum development with previous roles at MIT and Stanford.
                </p>
              </div>
              <div className="text-center">
                <div className="w-36 h-36 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                    alt="Dr. Michael Chang"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-medium">Dr. Michael Chang</h3>
                <p className="text-gray-600 mb-2">Chief Technology Officer</p>
                <p className="text-sm text-gray-700">
                  Tech entrepreneur with expertise in AI and learning systems, previously led educational initiatives at Google.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
