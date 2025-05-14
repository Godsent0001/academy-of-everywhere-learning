
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FileUploader } from '@/components/FileUploader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { 
  GraduationCap, BookOpen, FileText, Download, 
  Upload, Clock, Calendar, Users, FileImage, 
  FileVideo, SendHorizontal, PlusCircle, Sparkles
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';
import { FileItem } from '@/components/FileItem';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

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
  const [chatMessages, setChatMessages] = useState<{
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
  }[]>([
    {
      id: "welcome",
      text: "Hello! I'm your AI Tutor. How can I help you with your studies today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);

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
    
    // Add user message
    const userMessage = {
      id: Math.random().toString(36).substring(2, 9),
      text: question,
      isUser: true,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    
    // Clear input
    setQuestion('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "Based on your materials, I'd suggest focusing on the key concepts outlined in chapter 3.",
        "That's a great question! The process you're asking about involves several steps that build upon each other.",
        "I can help explain that concept. It's essentially about understanding the relationship between the variables.",
        "Looking at your uploaded materials, I see several examples that might help clarify this topic."
      ];
      
      const aiMessage = {
        id: Math.random().toString(36).substring(2, 9),
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        isUser: false,
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, aiMessage]);
    }, 1500);
  };

  const renderChatUI = () => (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto p-4 space-y-4 mb-4 max-h-[400px]">
        {chatMessages.map(message => (
          <div 
            key={message.id} 
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-lg ${
                message.isUser 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted'
              }`}
            >
              {!message.isUser && (
                <div className="flex items-center mb-1">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <span className="text-xs font-medium">AI Tutor</span>
                </div>
              )}
              <p className="text-sm">{message.text}</p>
              <span className="text-xs opacity-70 block text-right mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t p-4">
        <div className="flex">
          <Textarea 
            value={question} 
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask your AI tutor a question..."
            className="flex-1 mr-2 resize-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleQuestionSubmit();
              }
            }}
          />
          <Button onClick={handleQuestionSubmit} className="self-end">
            <SendHorizontal className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-primary text-white py-8 md:py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl md:text-4xl font-serif font-bold mb-3">Student Help Center</h1>
            <p className="text-base md:text-xl max-w-2xl mx-auto mb-4">
              Upload your study materials for AI-powered analysis and assistance
            </p>
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mt-6">
              {isMobile ? (
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="secondary" className="text-sm px-3 py-1 h-9">
                      <Sparkles className="h-4 w-4 mr-1" />
                      Chat with AI Tutor
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent className="h-[80vh]">
                    <DrawerHeader>
                      <DrawerTitle>AI Tutor</DrawerTitle>
                    </DrawerHeader>
                    {renderChatUI()}
                  </DrawerContent>
                </Drawer>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary" className="text-sm px-3 py-1 h-9">
                      <Sparkles className="h-4 w-4 mr-1" />
                      Chat with AI Tutor
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>AI Tutor</DialogTitle>
                    </DialogHeader>
                    {renderChatUI()}
                  </DialogContent>
                </Dialog>
              )}
              <Button variant="outline" className="bg-white text-primary text-sm px-3 py-1 h-9" disabled>
                <Users className="h-4 w-4 mr-1" />
                Study Groups
                <span className="text-xs bg-secondary text-white rounded-full px-2 py-0.5 ml-2">Soon</span>
              </Button>
              <Link to="/course-creator">
                <Button variant="outline" className="bg-white text-primary text-sm px-3 py-1 h-9">
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Create Course
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-6 md:py-8">
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="mb-6 w-full grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-2">
              <TabsTrigger value="upload" className="flex-grow-0 h-auto py-2">
                <Upload className="h-4 w-4 mr-2" />
                <span className="whitespace-normal">Upload Materials</span>
              </TabsTrigger>
              <TabsTrigger value="summaries" className="flex-grow-0 h-auto py-2">
                <FileText className="h-4 w-4 mr-2" />
                <span className="whitespace-normal">Study Notes</span>
              </TabsTrigger>
              <TabsTrigger value="practice" className="flex-grow-0 h-auto py-2">
                <FileText className="h-4 w-4 mr-2" />
                <span className="whitespace-normal">Practice Questions</span>
              </TabsTrigger>
              <TabsTrigger value="readings" className="flex-grow-0 h-auto py-2">
                <BookOpen className="h-4 w-4 mr-2" />
                <span className="whitespace-normal">Reading Materials</span>
              </TabsTrigger>
              <TabsTrigger value="ai-tutor" className="md:hidden flex-grow-0 h-auto py-2">
                <Sparkles className="h-4 w-4 mr-2" />
                <span className="whitespace-normal">AI Tutor</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Upload Study Materials</CardTitle>
                  <CardDescription>
                    Upload textbooks, notes, slides or any study materials for AI analysis
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
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">Uploaded Materials</CardTitle>
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
            
            {/* Study Notes Tab */}
            <TabsContent value="summaries">
              {files.filter(file => file.status === 'processed').length > 0 ? (
                <div className="space-y-6">
                  <h2 className="text-2xl font-serif font-bold mb-4">Study Notes</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {files.filter(file => file.status === 'processed').map(file => (
                      <Card key={file.id} className="hover:bg-gray-50 transition-colors overflow-hidden">
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-lg font-medium truncate">{file.name}</CardTitle>
                          <CardDescription className="text-xs flex items-center">
                            <Clock className="h-3 w-3 mr-1 inline" /> 
                            Processed {new Date(file.uploadDate).toLocaleDateString()}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-2">
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {file.type.includes('image') ? (
                              <>The AI has analyzed this image and identified key concepts related to 
                              the subject matter.</>
                            ) : (
                              <>The AI has analyzed this document and created a summary 
                              highlighting the key concepts.</>
                            )}
                          </p>
                          <Button variant="default" size="sm" className="w-full">
                            View Summary
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <h2 className="text-2xl font-serif font-bold mt-8 mb-4">Recently Added</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {files.filter(file => file.status === 'processed')
                      .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
                      .slice(0, 3)
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
            
            {/* Practice Questions Tab */}
            <TabsContent value="practice">
              {files.filter(file => file.status === 'processed').length > 0 ? (
                <div className="space-y-6">
                  <h2 className="text-2xl font-serif font-bold mb-4">Practice Questions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {files.filter(file => file.status === 'processed').map(file => (
                      <Card key={file.id} className="hover:bg-gray-50 transition-colors overflow-hidden">
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-lg font-medium truncate">{file.name}</CardTitle>
                          <CardDescription className="text-xs flex items-center">
                            <GraduationCap className="h-3 w-3 mr-1 inline" /> 
                            {Math.floor(Math.random() * 15) + 5} questions available
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-2">
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            Practice questions cover key concepts from this material.
                          </p>
                          <Button variant="default" size="sm" className="w-full">
                            Start Practice Quiz
                          </Button>
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
            
            {/* Reading Materials Tab */}
            <TabsContent value="readings">
              {files.filter(file => file.status === 'processed').length > 0 ? (
                <div className="space-y-6">
                  <h2 className="text-2xl font-serif font-bold mb-4">Recommended Reading Materials</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {files.filter(file => file.status === 'processed').map(file => (
                      <Card key={file.id} className="hover:bg-gray-50 transition-colors overflow-hidden">
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-lg font-medium truncate">{file.name}</CardTitle>
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
                                ][idx % 5]} 
                              </li>
                            ))}
                          </ul>
                          <Button variant="default" size="sm" className="w-full">
                            View All Resources
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
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
            
            {/* AI Tutor Tab (Mobile Only) */}
            <TabsContent value="ai-tutor" className="md:hidden">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">AI Tutor</CardTitle>
                  <CardDescription>
                    Ask questions and get help with your studies
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {renderChatUI()}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StudyHelpPage;
