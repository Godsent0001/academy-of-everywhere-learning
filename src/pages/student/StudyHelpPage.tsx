
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FileUploader } from '@/components/FileUploader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, BookOpen, FileText, Download, Upload, Clock, Calendar, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

const StudyHelpPage: React.FC = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleFilesSelected = (files: File[]) => {
    toast({
      title: "Files uploaded successfully",
      description: `You have uploaded ${files.length} file(s).`,
    });

    // Here you would normally process the files, perhaps upload them to a server
    console.log('Files selected:', files);
  };

  const resourceCategories = [
    {
      title: "Study Notes",
      icon: <FileText className="h-6 w-6" />,
      description: "Access comprehensive study notes for all courses",
      count: 248
    },
    {
      title: "Practice Exams",
      icon: <GraduationCap className="h-6 w-6" />,
      description: "Test your knowledge with past exams and quizzes",
      count: 75
    },
    {
      title: "Reading Materials",
      icon: <BookOpen className="h-6 w-6" />,
      description: "Essential readings and additional resources",
      count: 130
    }
  ];

  const upcomingStudySessions = [
    {
      title: "Data Structures Review",
      time: "Today, 3:00 PM",
      participants: 12
    },
    {
      title: "Biology Concepts Group Study",
      time: "Tomorrow, 5:00 PM",
      participants: 8
    },
    {
      title: "Economics Final Prep",
      time: "May 12, 4:30 PM",
      participants: 15
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/90 to-primary text-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Study Help Center</h1>
              <p className="text-lg md:text-xl opacity-90 mb-6">
                Access and share study materials, join group study sessions, and enhance your learning experience.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="secondary" size={isMobile ? "lg" : "default"} className="font-medium">
                  <Download className="mr-2 h-4 w-4" /> Browse Resources
                </Button>
                <Button variant="outline" size={isMobile ? "lg" : "default"} className="bg-white/10 hover:bg-white/20 text-white border-white/30">
                  <Users className="mr-2 h-4 w-4" /> Join Study Group
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 md:py-12">
          <Tabs defaultValue="resources" className="w-full">
            <TabsList className="mb-8 w-full justify-start overflow-x-auto pb-2 scrollbar-hide">
              <TabsTrigger value="resources" className="text-base py-2">Study Resources</TabsTrigger>
              <TabsTrigger value="upload" className="text-base py-2">Upload Materials</TabsTrigger>
              <TabsTrigger value="groups" className="text-base py-2">Study Groups</TabsTrigger>
            </TabsList>

            <TabsContent value="resources">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {resourceCategories.map((category, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="mr-3 bg-primary/10 p-2 rounded-full">
                            {category.icon}
                          </div>
                          <CardTitle>{category.title}</CardTitle>
                        </div>
                        <span className="bg-primary/10 text-primary font-medium py-1 px-3 rounded-full text-sm">
                          {category.count}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{category.description}</CardDescription>
                      <Button variant="link" className="px-0 mt-2">
                        Browse {category.title} →
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <h2 className="text-2xl font-serif font-bold mb-4">Recently Added Resources</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="hover:bg-gray-50 transition-colors">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="bg-gray-100 p-2 rounded">
                        <FileText className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="overflow-hidden">
                        <h3 className="font-medium truncate">
                          {["Study Guide - Introduction to Psychology", 
                            "Calculus Formula Sheet", 
                            "Organic Chemistry Lab Notes",
                            "Computer Science Algorithms Cheat Sheet",
                            "Business Ethics Case Studies",
                            "World History Timeline"][i]}
                        </h3>
                        <p className="text-xs text-gray-500 flex items-center mt-1">
                          <Clock className="h-3 w-3 mr-1" /> Added {i + 1} day{i !== 0 ? 's' : ''} ago
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="upload">
              <div className="max-w-3xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Share Your Study Materials</CardTitle>
                    <CardDescription>
                      Help fellow students by uploading notes, study guides, or other helpful resources
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FileUploader 
                      onFilesSelected={handleFilesSelected}
                      maxSize={10 * 1024 * 1024} // 10MB
                      accept={{
                        'application/pdf': ['.pdf'],
                        'application/msword': ['.doc', '.docx'],
                        'text/plain': ['.txt'],
                        'image/png': ['.png'],
                        'image/jpeg': ['.jpg', '.jpeg']
                      }}
                    />
                  </CardContent>
                </Card>
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Guidelines for Sharing Materials</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Share only study materials that you have created or have permission to share.</li>
                    <li>Do not upload proprietary content, exams, or instructor materials without permission.</li>
                    <li>Make sure documents are clear, organized, and properly labeled.</li>
                    <li>Be respectful of others' work and give credit when appropriate.</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="groups">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Upcoming Study Sessions</CardTitle>
                    <CardDescription>Join virtual study groups and collaborate with peers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingStudySessions.map((session, index) => (
                        <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                          <div>
                            <h3 className="font-medium">{session.title}</h3>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Calendar className="h-3.5 w-3.5 mr-1" />
                              <span>{session.time}</span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className="text-sm text-gray-500 mr-2">
                              {session.participants} participants
                            </span>
                            <Button size="sm">Join</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      Create Study Session
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Benefits of Study Groups</CardTitle>
                    <CardDescription>Why collaborative learning works</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {[
                        {
                          title: "Enhanced Understanding",
                          description: "Discussing concepts with peers helps solidify your understanding."
                        },
                        {
                          title: "Diverse Perspectives",
                          description: "Gain insights from different approaches and viewpoints."
                        },
                        {
                          title: "Accountability",
                          description: "Stay motivated with regular study schedules and peer support."
                        },
                        {
                          title: "Teaching Reinforces Learning",
                          description: "Explaining concepts to others strengthens your own knowledge."
                        }
                      ].map((benefit, index) => (
                        <li key={index} className="flex">
                          <div className="bg-primary/10 p-1 rounded-full mr-3 mt-0.5">
                            <GraduationCap className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{benefit.title}</h4>
                            <p className="text-sm text-gray-600">{benefit.description}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StudyHelpPage;
