
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Course } from '@/types';
import { Book, Clock, GraduationCap, Certificate, User } from 'lucide-react';
import { faculties } from '@/data/faculties';

const CoursePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isEnrolled, setIsEnrolled] = useState(false);
  
  let course: Course | undefined;
  let departmentName: string = '';
  let facultyName: string = '';
  
  // Find the course across all faculties and departments
  for (const faculty of faculties) {
    for (const department of faculty.departments) {
      const found = department.courses.find((c) => c.slug === slug);
      if (found) {
        course = found;
        departmentName = department.name;
        facultyName = faculty.name;
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
            <p className="mb-6">Sorry, we couldn't find the course you're looking for.</p>
            <Link to="/courses" className="text-primary hover:underline">
              Browse all courses
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Course Header */}
        <div className="bg-accent text-white py-16">
          <div className="container mx-auto px-4">
            <div className="mb-2">
              <Link to="/faculties" className="text-white/80 hover:text-white">Faculties</Link>
              {' › '}
              <span className="text-white/80">{facultyName}</span>
              {' › '}
              <span className="text-white/80">{departmentName}</span>
            </div>
            <h1 className="text-4xl font-serif font-bold mb-4">{course.name}</h1>
            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                <span>Instructor: {course.instructor}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>Duration: {course.duration}</span>
              </div>
              <div className="flex items-center">
                <Book className="h-5 w-5 mr-2" />
                <span>{course.lessons.length} Lessons</span>
              </div>
              <div className="flex items-center">
                <GraduationCap className="h-5 w-5 mr-2" />
                <span>Level: {course.difficulty}</span>
              </div>
            </div>
            <Button 
              size="lg" 
              onClick={() => setIsEnrolled(!isEnrolled)}
              variant={isEnrolled ? "outline" : "default"}
              className={isEnrolled ? "bg-white text-accent hover:bg-white/90" : ""}
            >
              {isEnrolled ? "Already Enrolled" : "Enroll Now"}
            </Button>
          </div>
        </div>
        
        {/* Course Content */}
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="mb-8">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="lessons">Lessons</TabsTrigger>
                  <TabsTrigger value="instructor">Instructor</TabsTrigger>
                  <TabsTrigger value="certificate">Certificate</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                  <div className="prose max-w-none">
                    <h2 className="text-2xl font-serif font-medium mb-4">About This Course</h2>
                    <p className="text-gray-700 mb-4">{course.description}</p>
                    
                    <h3 className="text-xl font-medium mt-8 mb-4">What You'll Learn</h3>
                    <ul className="list-disc pl-6 space-y-2 mb-6">
                      <li>Understand the core principles and concepts of {course.name}</li>
                      <li>Apply theoretical knowledge to practical scenarios</li>
                      <li>Analyze and evaluate complex problems in the field</li>
                      <li>Develop critical thinking and problem-solving skills</li>
                      <li>Complete a final project demonstrating your mastery of the subject</li>
                    </ul>
                    
                    <h3 className="text-xl font-medium mt-8 mb-4">Course Structure</h3>
                    <p className="mb-4">
                      This course is structured into {course.lessons.length} comprehensive lessons, each focusing on a key aspect of the subject matter. 
                      Each lesson includes video lectures, reading materials, interactive quizzes, and a Q&A section where you can discuss the material with 
                      other students and the instructor.
                    </p>
                    <p className="mb-4">
                      At the end of the course, you'll take a final exam to test your understanding and receive a certificate upon successful completion.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="lessons">
                  <h2 className="text-2xl font-serif font-medium mb-6">Course Lessons</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {course.lessons.length > 0 ? (
                      course.lessons.map((lesson, index) => (
                        <AccordionItem key={lesson.id} value={lesson.id}>
                          <AccordionTrigger>
                            <div className="flex items-center">
                              <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-3">
                                {index + 1}
                              </span>
                              <div className="text-left">
                                <h3 className="font-medium">{lesson.title}</h3>
                                <p className="text-sm text-muted-foreground">{lesson.duration}</p>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="pl-11">
                              <p className="text-gray-700 mb-4">{lesson.description}</p>
                              <Link to={`/lesson/${lesson.slug}`}>
                                <Button variant="outline" size="sm">View Lesson</Button>
                              </Link>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))
                    ) : (
                      <div className="text-center py-8 bg-muted/30 rounded-md">
                        <p>Lessons for this course are being prepared. Check back soon!</p>
                      </div>
                    )}
                  </Accordion>
                </TabsContent>
                
                <TabsContent value="instructor">
                  <h2 className="text-2xl font-serif font-medium mb-6">About the Instructor</h2>
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-12 w-12 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">{course.instructor}</h3>
                      <p className="text-gray-600 mb-4">Expert in {departmentName}</p>
                      <p className="text-gray-700 mb-4">
                        An experienced educator with expertise in {departmentName} and a passion for teaching.
                        With years of experience in both academia and industry, they bring practical insights
                        and theoretical knowledge to their courses.
                      </p>
                      <div className="flex space-x-4">
                        <div>
                          <p className="font-medium">10+</p>
                          <p className="text-sm text-gray-500">Courses</p>
                        </div>
                        <div>
                          <p className="font-medium">5,000+</p>
                          <p className="text-sm text-gray-500">Students</p>
                        </div>
                        <div>
                          <p className="font-medium">4.9</p>
                          <p className="text-sm text-gray-500">Rating</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="certificate">
                  <div className="text-center py-8">
                    <div className="mb-6 flex justify-center">
                      <Certificate className="h-16 w-16 text-secondary" />
                    </div>
                    <h2 className="text-2xl font-serif font-medium mb-4">Course Certificate</h2>
                    <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                      Upon successful completion of this course and passing the final exam, you will receive a
                      verified certificate. This certificate can be shared on your resume, LinkedIn profile, or 
                      with potential employers to demonstrate your knowledge in this subject area.
                    </p>
                    <div className="border p-8 rounded-lg max-w-2xl mx-auto mb-8">
                      <h3 className="font-serif text-lg mb-4">Certificate Requirements</h3>
                      <ul className="list-disc text-left pl-6 space-y-2">
                        <li>Complete all course lessons</li>
                        <li>Pass the final exam with a score of 70% or higher</li>
                        <li>Complete any required assignments or projects</li>
                      </ul>
                    </div>
                    <Button>Preview Certificate</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="lg:col-span-1">
              <div className="border rounded-lg overflow-hidden sticky top-24">
                <div className="aspect-video overflow-hidden relative">
                  <img 
                    src={course.image} 
                    alt={course.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Button variant="outline" className="text-white border-white hover:bg-white/20">
                      Watch Preview
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-4">Course Details</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <Clock className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Duration</p>
                        <p className="text-sm text-gray-600">{course.duration}</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Book className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Lessons</p>
                        <p className="text-sm text-gray-600">{course.lessons.length} comprehensive lessons</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <GraduationCap className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Level</p>
                        <p className="text-sm text-gray-600">{course.difficulty}</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Certificate className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Certificate</p>
                        <p className="text-sm text-gray-600">Included upon completion</p>
                      </div>
                    </li>
                  </ul>
                  <Button className="w-full mt-6" onClick={() => setIsEnrolled(!isEnrolled)}>
                    {isEnrolled ? "Continue Learning" : "Enroll Now"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CoursePage;
