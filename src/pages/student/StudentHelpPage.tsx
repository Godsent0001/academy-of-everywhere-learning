
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FileUploader } from '@/components/FileUploader';
import { FileItem } from '@/components/FileItem';
import { BookText, FileImage, FileText, Upload, FileVideo, GraduationCap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const StudentHelpPage: React.FC = () => {
  const { toast } = useToast();
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
          <Tabs defaultValue="materials" className="w-full">
            <TabsList className="mb-8 w-full flex flex-wrap justify-center">
              <TabsTrigger value="materials" className="flex-grow md:flex-grow-0">
                <Upload className="h-4 w-4 mr-2" />
                Upload Materials
              </TabsTrigger>
              <TabsTrigger value="summaries" className="flex-grow md:flex-grow-0">
                <BookText className="h-4 w-4 mr-2" />
                Summaries
              </TabsTrigger>
              <TabsTrigger value="practice" className="flex-grow md:flex-grow-0">
                <FileText className="h-4 w-4 mr-2" />
                Practice Questions
              </TabsTrigger>
              <TabsTrigger value="tutor" className="flex-grow md:flex-grow-0">
                <GraduationCap className="h-4 w-4 mr-2" />
                AI Tutor
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="materials" className="space-y-8">
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
                    onFilesAccepted={handleFileUpload}
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
                      <CardTitle>Generated Summaries</CardTitle>
                      <CardDescription>
                        AI-generated summaries of your uploaded materials
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {files.filter(file => file.status === 'processed').map(file => (
                          <Card key={file.id}>
                            <CardHeader>
                              <CardTitle className="text-lg font-medium">{file.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-muted-foreground">
                                {file.type.includes('image') ? (
                                  <>The AI has analyzed this image and identified key concepts related to 
                                  the subject matter. The main topics detected include molecular structures, 
                                  cellular processes, and biochemical pathways.</>
                                ) : (
                                  <>The AI has analyzed this document and created a comprehensive summary 
                                  highlighting the key concepts, theories, and principles. The summary is 
                                  approximately 30% of the original content length while maintaining all 
                                  essential information.</>
                                )}
                              </p>
                              <div className="mt-4 flex space-x-2">
                                <Button>View Full Summary</Button>
                                <Button variant="outline">Generate Flashcards</Button>
                              </div>
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
                      <h3 className="text-xl font-medium mb-2">No Summaries Available</h3>
                      <p className="text-muted-foreground mb-6">
                        Upload some study materials first, and we'll generate summaries for you
                      </p>
                      <Button variant="outline" onClick={() => document.querySelector('[data-value="materials"]')?.dispatchEvent(new Event('click'))}>
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
                      <div className="space-y-6">
                        {files.filter(file => file.status === 'processed').map(file => (
                          <Card key={file.id}>
                            <CardHeader>
                              <CardTitle className="text-lg font-medium">{file.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-muted-foreground">
                                The AI has generated a set of practice questions based on the content in this file.
                                These include multiple-choice questions, fill-in-the-blanks, and short answer questions.
                              </p>
                              <div className="mt-4 flex space-x-2">
                                <Button>Start Practice Quiz</Button>
                                <Button variant="outline">Generate More Questions</Button>
                              </div>
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
                      <Button variant="outline" onClick={() => document.querySelector('[data-value="materials"]')?.dispatchEvent(new Event('click'))}>
                        Upload Materials
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="tutor">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>AI Tutor Chat</CardTitle>
                      <CardDescription>
                        Ask questions about your courses or uploaded materials
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[500px] flex flex-col">
                      <div className="flex-grow bg-gray-50 rounded-md p-4 mb-4 overflow-y-auto">
                        <div className="flex items-start mb-4">
                          <Avatar className="mr-2">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>AI</AvatarFallback>
                          </Avatar>
                          <div className="bg-white p-3 rounded-lg shadow-sm">
                            <p>Hello! I'm your AI tutor. Ask me anything about your courses or uploaded materials.</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Textarea 
                          placeholder="Type your question here..." 
                          className="flex-grow"
                          value={question}
                          onChange={(e) => setQuestion(e.target.value)}
                        />
                        <Button onClick={handleQuestionSubmit}>Send</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Learning Resources</CardTitle>
                      <CardDescription>
                        Helpful resources based on your materials
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {files.filter(file => file.status === 'processed').length > 0 ? (
                        <div className="space-y-4">
                          {files.filter(file => file.status === 'processed').map(file => (
                            <div key={file.id} className="flex items-center space-x-3">
                              {file.type.includes('image') ? 
                                <FileImage className="h-5 w-5 text-blue-500" /> :
                                file.type.includes('video') ?
                                  <FileVideo className="h-5 w-5 text-red-500" /> :
                                  <FileText className="h-5 w-5 text-green-500" />
                              }
                              <div>
                                <p className="text-sm font-medium">{file.name}</p>
                                <p className="text-xs text-muted-foreground">5 concepts identified</p>
                              </div>
                            </div>
                          ))}
                          <Button className="w-full mt-4" variant="outline">
                            Generate Study Guide
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center py-6">
                          <p className="text-muted-foreground text-sm">
                            Upload materials to get personalized resources
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StudentHelpPage;
