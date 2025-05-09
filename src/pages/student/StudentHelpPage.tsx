
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FileUploader } from '@/components/FileUploader';
import { FileItem } from '@/components/FileItem';
import { BookText, FileImage, FileText, Upload, FileVideo, Robot } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const StudentHelpPage: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('upload');
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResponse, setAiResponse] = useState<string>('');
  const [question, setQuestion] = useState<string>('');
  const [processingOption, setProcessingOption] = useState<'summarize' | 'expand' | 'questions'>('summarize');

  const handleFileUpload = (files: FileList) => {
    const newFiles = Array.from(files).map(file => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toISOString(),
      status: 'uploaded'
    }));
    
    setUploadedFiles([...uploadedFiles, ...newFiles]);
    
    toast({
      title: "Files uploaded",
      description: `${files.length} file(s) have been added to your materials.`
    });
  };

  const handleProcessFile = (fileId: string) => {
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
      
      // Update file status
      setUploadedFiles(prev => 
        prev.map(file => 
          file.id === fileId ? { ...file, status: 'processed' } : file
        )
      );
      
      // Generate simulated AI response based on the processing option
      let responseText = '';
      
      switch (processingOption) {
        case 'summarize':
          responseText = "Here's a concise summary of your material:\n\nThis document covers key concepts in the subject area, focusing on fundamental principles and their applications. The main topics include theoretical frameworks, practical methodologies, and analytical approaches to problem-solving. Important definitions and formulas are highlighted throughout the text, with examples demonstrating real-world applications.";
          break;
        case 'expand':
          responseText = "Here's an expanded explanation of your material:\n\nThe uploaded document explores several complex topics in depth. Beginning with foundational concepts, it builds a comprehensive framework for understanding the subject matter. Each section elaborates on specific aspects, providing detailed explanations, historical context, and contemporary relevance. The material presents multiple perspectives and approaches, critically examining underlying assumptions and methodological considerations.";
          break;
        case 'questions':
          responseText = "Here are some practice questions based on your material:\n\n1. What are the three main principles discussed in section 2.3? Explain how they relate to each other.\n\n2. Compare and contrast the two methodological approaches outlined in the document.\n\n3. Multiple Choice: Which of the following best describes the concept of [topic]?\n   a) A systematic approach to problem-solving\n   b) A theoretical framework for analysis\n   c) A set of practical techniques\n   d) All of the above\n\n4. True/False: The author suggests that [concept] is primarily applicable in theoretical contexts rather than practical applications.";
          break;
      }
      
      setAiResponse(responseText);
      
      toast({
        title: "Processing complete",
        description: `Your file has been analyzed. ${
          processingOption === 'summarize' ? 'Summary' : 
          processingOption === 'expand' ? 'Expanded explanation' : 
          'Practice questions'
        } is now available.`
      });
    }, 3000);
  };

  const handleDeleteFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
    
    toast({
      title: "File removed",
      description: "The file has been removed from your materials."
    });
  };

  const handleAskQuestion = () => {
    if (!question.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate AI response
    setTimeout(() => {
      setIsProcessing(false);
      
      setAiResponse(`Answer to your question: "${question}"\n\nBased on the materials you've uploaded and general knowledge, I can provide the following information:\n\nYour question touches on important concepts in this field. The key points to understand are that this topic involves multiple interconnected elements that work together to form a coherent system. Experts in the field generally agree on the fundamental principles, though there are some ongoing debates about specific applications and edge cases.\n\nWould you like me to elaborate on any particular aspect of this answer?`);
      
      toast({
        title: "Response ready",
        description: "The AI has answered your question."
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-primary text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Student Help Center</h1>
            <p className="text-lg max-w-3xl">
              Upload your study materials and get AI-powered assistance with summaries, 
              expanded explanations, and practice questions.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="upload">Upload Materials</TabsTrigger>
              <TabsTrigger value="process">Process Content</TabsTrigger>
              <TabsTrigger value="ask">Ask AI Teacher</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="p-4 bg-white rounded-lg shadow">
              <h2 className="text-2xl font-serif font-medium mb-6">Upload Your Study Materials</h2>
              
              <FileUploader onFilesSelected={handleFileUpload} />
              
              <div className="mt-8">
                <h3 className="text-xl font-medium mb-4">Uploaded Materials</h3>
                
                {uploadedFiles.length > 0 ? (
                  <div className="space-y-4">
                    {uploadedFiles.map(file => (
                      <FileItem 
                        key={file.id}
                        file={file}
                        onDelete={() => handleDeleteFile(file.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 border border-dashed rounded-lg">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-4 text-gray-600">No files uploaded yet</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="process" className="space-y-6 p-4 bg-white rounded-lg shadow">
              <h2 className="text-2xl font-serif font-medium mb-6">Process Your Materials</h2>
              
              <Card>
                <CardHeader>
                  <CardTitle>Choose Processing Option</CardTitle>
                  <CardDescription>
                    Select how you want the AI to process your study materials
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card 
                        className={`cursor-pointer border-2 ${processingOption === 'summarize' ? 'border-primary' : 'border-transparent'}`}
                        onClick={() => setProcessingOption('summarize')}
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Summarize</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">Create a concise summary of key points</p>
                        </CardContent>
                      </Card>
                      
                      <Card 
                        className={`cursor-pointer border-2 ${processingOption === 'expand' ? 'border-primary' : 'border-transparent'}`}
                        onClick={() => setProcessingOption('expand')}
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Expand</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">Get detailed explanations of concepts</p>
                        </CardContent>
                      </Card>
                      
                      <Card 
                        className={`cursor-pointer border-2 ${processingOption === 'questions' ? 'border-primary' : 'border-transparent'}`}
                        onClick={() => setProcessingOption('questions')}
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Questions</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">Generate practice questions and answers</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div>
                      <Label>Select Material to Process</Label>
                      {uploadedFiles.length > 0 ? (
                        <div className="mt-2 space-y-2">
                          {uploadedFiles.map(file => (
                            <Card key={file.id} className="p-4 flex justify-between items-center">
                              <div className="flex items-center">
                                {file.type.includes('image') ? (
                                  <FileImage className="h-5 w-5 mr-2 text-blue-500" />
                                ) : file.type.includes('video') ? (
                                  <FileVideo className="h-5 w-5 mr-2 text-red-500" />
                                ) : (
                                  <FileText className="h-5 w-5 mr-2 text-green-500" />
                                )}
                                <span>{file.name}</span>
                              </div>
                              <Button 
                                size="sm" 
                                onClick={() => handleProcessFile(file.id)}
                                disabled={isProcessing || file.status === 'processed'}
                              >
                                {file.status === 'processed' ? 'Processed' : 'Process'}
                              </Button>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 mt-2">
                          No materials available. Please upload files first.
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {aiResponse && (
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle>AI Analysis Result</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 p-4 rounded-md whitespace-pre-line">
                      {aiResponse}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="ask" className="space-y-6 p-4 bg-white rounded-lg shadow">
              <h2 className="text-2xl font-serif font-medium mb-6">Ask the AI Teacher</h2>
              
              <Card>
                <CardHeader>
                  <CardTitle>Ask a Question</CardTitle>
                  <CardDescription>
                    Get help with specific topics from your course materials
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="question">Your Question</Label>
                      <Textarea 
                        id="question"
                        placeholder="e.g., Can you explain the concept of photosynthesis in more detail?"
                        className="mt-1"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label>Reference Materials</Label>
                      <div className="mt-2">
                        {uploadedFiles.length > 0 ? (
                          <div className="text-sm">
                            The AI will use {uploadedFiles.length} uploaded file(s) as reference.
                          </div>
                        ) : (
                          <div className="text-sm text-amber-600">
                            No reference materials. The AI will use general knowledge only.
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full"
                      onClick={handleAskQuestion}
                      disabled={isProcessing || !question.trim()}
                    >
                      {isProcessing ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <Robot className="mr-2 h-4 w-4" />
                          Ask AI Teacher
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {aiResponse && (
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle>AI Teacher Response</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 p-4 rounded-md whitespace-pre-line">
                      {aiResponse}
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

export default StudentHelpPage;
