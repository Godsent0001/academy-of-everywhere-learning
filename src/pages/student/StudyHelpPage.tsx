import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FileUploader } from '@/components/FileUploader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { GraduationCap, BookOpen, FileText, Download, Upload, Clock, Calendar, Users, FileImage, FileVideo } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';
import { FileItem } from '@/components/FileItem';

const StudyHelpPage: React.FC = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const [files, setFiles] = useState<{
    id: string;
    name: string;
    size: number;
    type: string;
    uploadDate: string;
    status: 'uploaded' | 'processing' | 'processed';
  }[]>([]);
  const [question, setQuestion] = useState('');

  const handleFileUpload = (newFiles: File[]) => {
    const newUploadedFiles = newFiles.map(file => ({
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toISOString(),
      status: 'uploaded' as const
    }));
    
    setFiles(prev => [...prev, ...newUploadedFiles]);
    
    // Simulate processing
    setTimeout(() => {
      setFiles(prev => 
        prev.map(f => 
          newUploadedFiles.some(nf => nf.id === f.id) 
            ? { ...f, status: 'processing' as const } 
            : f
        )
      );
      
      // Simulate completion
      setTimeout(() => {
        setFiles(prev => 
          prev.map(f => 
            newUploadedFiles.some(nf => nf.id === f.id) 
              ? { ...f, status: 'processed' as const } 
              : f
          )
        );
        
        toast({
          title: "Analysis Complete",
          description: "Your materials have been processed and are ready for study.",
        });
      }, 3000);
    }, 1500);
  };
  
  const handleDeleteFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };
  
  const handleQuestionSubmit = () => {
    if (!question.trim()) return;
    
    toast({
      title: "Question Submitted",
      description: "Our AI tutor is working on an answer for you.",
    });
    
    // Reset question
    setQuestion('');
    
    // Simulate AI response
    setTimeout(() => {
      toast({
        title: "Answer Ready",
        description: "Check the AI Tutor tab for your response.",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-primary text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Student Help Center</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Upload your study materials for AI-powered analysis, summaries, and practice questions
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="mb-8 w-full flex flex-wrap justify-center">
              <TabsTrigger value="upload" className="flex-grow md:flex-grow-0">
                <Upload className="h-4 w-4 mr-2" />
                Upload Materials
              </TabsTrigger>
              <TabsTrigger value="summaries" className="flex-grow md:flex-grow-0">
                <FileText className="h-4 w-4 mr-2" />
                Study Notes
              </TabsTrigger>
              <TabsTrigger value="practice" className="flex-grow md:flex-grow-0">
                <FileText className="h-4 w-4 mr-2" />
                Practice Questions
              </TabsTrigger>
              <TabsTrigger value="readings" className="flex-grow md:flex-grow-0">
                <BookOpen className="h-4 w-4 mr-2" />
                Reading Materials
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Study Materials</CardTitle>
                  <CardDescription>
                    Upload textbooks, notes, slides or any study materials for AI analysis.
                    Supported formats: PDF, DOC, DOCX, PPT, PPTX, TXT, JPG, PNG
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FileUploader 
                    onFilesSelected={handleFileUpload}
                    maxSize={10485760} // 10 MB
                    accept={{
                      'application/pdf': ['.pdf'],
                      'application/msword': ['.doc'],
                      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
                      'application/vnd.ms-powerpoint': ['.ppt'],
                      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
                      'text/plain': ['.txt'],
                      'image/jpeg': ['.jpg', '.jpeg'],
                      'image/png': ['.png'],
                    }}
                  />
                </CardContent>
              </Card>
              
              {files.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Uploaded Materials</CardTitle>
                    <CardDescription>
                      Your files will be automatically analyzed upon upload
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {files.map(file => (
                        <FileItem 
                          key={file.id} 
                          file={file}
                          onDelete={() => handleDeleteFile(file.id)} 
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="summaries">
              {files.filter(file => file.status === 'processed').length > 0 ? (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Study Notes</CardTitle>
                      <CardDescription>
                        AI-generated summaries of your uploaded materials
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {files.filter(file => file.status === 'processed').map(file => (
                          <Card key={file.id} className="hover:bg-gray-50 transition-colors overflow-hidden">
                            <CardHeader className="p-4 pb-2">
                              <CardTitle className="text-lg font-medium">{file.name}</CardTitle>
                              <CardDescription className="text-xs flex items-center">
                                <Clock className="h-3 w-3 mr-1 inline" /> 
                                Processed {new Date(file.uploadDate).toLocaleDateString()}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="p-4 pt-2">
                              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                {file.type.includes('image') ? (
                                  <>The AI has analyzed this image and identified key concepts related to 
                                  the subject matter. The main topics include molecular structures, 
                                  cellular processes, and biochemical pathways.</>
                                ) : (
                                  <>The AI has analyzed this document and created a summary 
                                  highlighting the key concepts, theories, and principles.</>
                                )}
                              </p>
                              <Button variant="default" size="sm" className="w-full">
                                View Summary
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <h2 className="text-2xl font-serif font-bold mt-8 mb-4">Recently Added Study Notes</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {files.filter(file => file.status === 'processed')
                      .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
                      .slice(0, 6)
                      .map(file => (
                      <Card key={file.id} className="hover:bg-gray-50 transition-colors">
                        <CardContent className="p-4 flex items-center gap-3">
                          <div className="bg-gray-100 p-2 rounded">
                            <FileText className="h-5 w-5 text-gray-500" />
                          </div>
                          <div className="overflow-hidden">
                            <h3 className="font-medium truncate">{file.name}</h3>
                            <p className="text-xs text-gray-500 flex items-center mt-1">
                              <Clock className="h-3 w-3 mr-1" /> Added recently
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <CardContent>
                    <div className="flex flex-col items-center">
                      <FileText className="h-16 w-16 text-gray-300 mb-4" />
                      <h3 className="text-xl font-medium mb-2">No Study Notes Available</h3>
                      <p className="text-muted-foreground mb-6">
                        Upload some study materials first, and we'll generate summaries for you
                      </p>
                      <Button variant="outline" onClick={() => document.querySelector('[data-value="upload"]')?.dispatchEvent(new Event('click'))}>
                        Upload Materials
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="practice">
              {files.filter(file => file.status === 'processed').length > 0 ? (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Practice Questions</CardTitle>
                      <CardDescription>
                        AI-generated questions based on your study materials
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {files.filter(file => file.status === 'processed').map(file => (
                          <Card key={file.id} className="hover:bg-gray-50 transition-colors overflow-hidden">
                            <CardHeader className="p-4 pb-2">
                              <CardTitle className="text-lg font-medium">{file.name}</CardTitle>
                              <CardDescription className="text-xs flex items-center">
                                <GraduationCap className="h-3 w-3 mr-1 inline" /> 
                                {Math.floor(Math.random() * 15) + 5} questions available
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="p-4 pt-2">
                              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                Practice questions cover key concepts from this material, including multiple-choice, 
                                fill-in-the-blank, and short answer formats.
                              </p>
                              <Button variant="default" size="sm" className="w-full">
                                Start Practice Quiz
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <CardContent>
                    <div className="flex flex-col items-center">
                      <FileText className="h-16 w-16 text-gray-300 mb-4" />
                      <h3 className="text-xl font-medium mb-2">No Practice Questions Available</h3>
                      <p className="text-muted-foreground mb-6">
                        Upload some study materials first, and we'll generate practice questions for you
                      </p>
                      <Button variant="outline" onClick={() => document.querySelector('[data-value="upload"]')?.dispatchEvent(new Event('click'))}>
                        Upload Materials
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="readings">
              {files.filter(file => file.status === 'processed').length > 0 ? (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recommended Reading Materials</CardTitle>
                      <CardDescription>
                        Additional resources based on your uploaded materials
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {files.filter(file => file.status === 'processed').map(file => (
                          <Card key={file.id} className="hover:bg-gray-50 transition-colors overflow-hidden">
                            <CardHeader className="p-4 pb-2">
                              <CardTitle className="text-lg font-medium">{file.name}</CardTitle>
                              <CardDescription className="text-xs flex items-center">
                                <BookOpen className="h-3 w-3 mr-1 inline" /> 
                                {Math.floor(Math.random() * 4) + 2} reading suggestions
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="p-4 pt-2">
                              <ul className="text-sm text-muted-foreground space-y-1 mb-3">
                                {Array.from({ length: Math.floor(Math.random() * 3) + 2 }).map((_, idx) => (
                                  <li key={idx} className="truncate flex items-start">
                                    <span className="text-primary mr-1 mt-0.5">•</span>
                                    {[
                                      "Introduction to the Core Concepts",
                                      "Advanced Theory and Applications",
                                      "Practical Implementation Guide",
                                      "Historical Context and Development",
                                      "Current Research and Trends"
                                    ][idx % 5]} {file.name.split('.')[0]}
                                  </li>
                                ))}
                              </ul>
                              <Button variant="default" size="sm" className="w-full">
                                View All Reading Materials
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <CardContent>
                    <div className="flex flex-col items-center">
                      <BookOpen className="h-16 w-16 text-gray-300 mb-4" />
                      <h3 className="text-xl font-medium mb-2">No Reading Recommendations Available</h3>
                      <p className="text-muted-foreground mb-6">
                        Upload some study materials first, and we'll suggest additional reading materials
                      </p>
                      <Button variant="outline" onClick={() => document.querySelector('[data-value="upload"]')?.dispatchEvent(new Event('click'))}>
                        Upload Materials
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StudyHelpPage;
