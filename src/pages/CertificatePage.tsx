
import React, { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, Share2 } from 'lucide-react';
import { Course } from '@/types';
import { faculties } from '@/data/faculties';

const CertificatePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const certificateRef = useRef<HTMLDivElement>(null);
  
  // Find the course
  let course: Course | undefined;
  
  for (const faculty of faculties) {
    for (const department of faculty.departments) {
      const found = department.courses.find((c) => c.slug === slug);
      if (found) {
        course = found;
        break;
      }
    }
    if (course) break;
  }
  
  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Course not found</h2>
            <p className="mb-6">Sorry, we couldn't find the course certificate you're looking for.</p>
            <Link to="/courses" className="text-primary hover:underline">
              Browse all courses
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleDownload = () => {
    alert('Certificate download functionality will be implemented here');
  };
  
  const handleShare = () => {
    alert('Certificate sharing functionality will be implemented here');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-accent text-white py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-serif font-bold mb-2">Certificate of Achievement</h1>
            <p className="text-lg">
              Congratulations! You've successfully completed {course.name}
            </p>
          </div>
        </div>
        
        <div className="page-container">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-3/4">
              <div 
                ref={certificateRef}
                className="border-8 border-double border-accent/20 bg-white p-8 rounded-lg shadow-lg mb-6"
              >
                <div className="border-2 border-gray-200 p-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-serif text-primary mb-2">Academy of Everywhere</h2>
                    <p className="text-lg text-gray-600 mb-6">Certificate of Achievement</p>
                    <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
                    
                    <p className="text-lg mb-2">This certifies that</p>
                    <h3 className="text-2xl font-serif mb-2">John Doe</h3>
                    <p className="text-lg mb-8">has successfully completed the course</p>
                    
                    <h3 className="text-2xl font-serif text-primary mb-2">{course.name}</h3>
                    <p className="mb-6">with a score of 85%</p>
                    
                    <div className="w-48 h-1 bg-primary mx-auto mb-6"></div>
                    
                    <div className="flex justify-between items-center mb-8">
                      <div className="text-left">
                        <p className="font-medium">{new Date().toLocaleDateString()}</p>
                        <p className="text-sm text-gray-600">Date Issued</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{course.instructor}</p>
                        <p className="text-sm text-gray-600">Instructor</p>
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-500 mt-4">
                      <p>Certificate ID: CERT-{Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
                      <p>Verify at: academy-of-everywhere.com/verify</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/4">
              <Card className="p-6">
                <h3 className="text-xl font-medium mb-4">Certificate Options</h3>
                <div className="space-y-4">
                  <Button onClick={handleDownload} className="w-full flex items-center justify-center">
                    <Download className="h-4 w-4 mr-2" />
                    Download as PDF
                  </Button>
                  <Button onClick={handleShare} variant="outline" className="w-full flex items-center justify-center">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Certificate
                  </Button>
                </div>
                
                <div className="mt-8">
                  <h4 className="font-medium mb-2">Course Details</h4>
                  <ul className="space-y-2 text-sm">
                    <li><span className="font-medium">Course:</span> {course.name}</li>
                    <li><span className="font-medium">Instructor:</span> {course.instructor}</li>
                    <li><span className="font-medium">Completion Date:</span> {new Date().toLocaleDateString()}</li>
                    <li><span className="font-medium">Duration:</span> {course.duration}</li>
                  </ul>
                </div>
                
                <div className="mt-8">
                  <Link to={`/course/${course.slug}`}>
                    <Button variant="link" className="p-0">Return to Course</Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CertificatePage;
