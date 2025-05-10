
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FileUploader } from '@/components/FileUploader';
import { FileItem } from '@/components/FileItem';
import { BookText, FileImage, FileText, Upload, FileVideo, GraduationCap, AlertCircle, Coins, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface UserTokens {
  tokens_available: number;
  tokens_used: number;
}

interface ProcessedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: string;
  status: 'uploaded' | 'processing' | 'processed';
  summary?: string;
  questions?: Array<{
    question: string;
    options: string[];
    answer: string;
    explanation: string;
  }>;
}

const StudentHelpPage: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [files, setFiles] = useState<ProcessedFile[]>([]);
  const [question, setQuestion] = useState('');
  const [user, setUser] = useState<any>(null);
  const [userTokens, setUserTokens] = useState<UserTokens | null>(null);
  const [loading, setLoading] = useState(false);
  const [processingFile, setProcessingFile] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
  }, []);
  
  useEffect(() => {
    const fetchUserTokens = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('user_tokens')
          .select('tokens_available, tokens_used')
          .eq('user_id', user.id)
          .single();
          
        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching tokens:', error);
          return;
        }
        
        setUserTokens(data || { tokens_available: 0, tokens_used: 0 });
        
      } catch (error) {
        console.error('Error fetching user tokens:', error);
      }
    };
    
    if (user) {
      fetchUserTokens();
    }
  }, [user]);

  const handleFileUpload = (newFiles: File[]) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to upload and process files",
        variant: "destructive",
      });
      navigate('/signin');
      return;
    }
    
    const newUploadedFiles = newFiles.map(file => ({
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toISOString(),
      status: 'uploaded' as const
    }));
    
    setFiles(prev => [...prev, ...newUploadedFiles]);
    
    toast({
      title: "Files uploaded",
      description: `${newFiles.length} file(s) uploaded successfully. Click 'Process' to analyze.`,
    });
  };
  
  const handleProcessFile = async (fileId: string) => {
    const fileToProcess = files.find(f => f.id === fileId);
    if (!fileToProcess) return;
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to process files",
        variant: "destructive",
      });
      navigate('/signin');
      return;
    }
    
    if (!userTokens || userTokens.tokens_available < 10) {
      toast({
        title: "Insufficient tokens",
        description: "You need at least 10 tokens to process a file. Please purchase more tokens.",
        variant: "destructive",
      });
      navigate('/student/tokens');
      return;
    }
    
    try {
      setProcessingFile(fileId);
      
      // Update file status to processing
      setFiles(prev => 
        prev.map(f => 
          f.id === fileId 
            ? { ...f, status: 'processing' as const } 
            : f
        )
      );
      
      // Call the process-material Edge Function
      const { data, error } = await supabase.functions.invoke('process-material', {
        body: { 
          fileId,
          fileName: fileToProcess.name
        }
      });
      
      if (error) throw error;
      
      if (data.error) {
        if (data.tokensAvailable < data.tokensNeeded) {
          toast({
            title: "Insufficient tokens",
            description: `You need ${data.tokensNeeded} tokens to process this file, but you only have ${data.tokensAvailable} tokens available.`,
            variant: "destructive",
          });
          navigate('/student/tokens');
          return;
        }
        throw new Error(data.error);
      }
      
      // Update file status to processed and add generated content
      setFiles(prev => 
        prev.map(f => 
          f.id === fileId 
            ? { 
                ...f, 
                status: 'processed' as const,
                summary: data.summary,
                questions: data.questions
              } 
            : f
        )
      );
      
      // Update user tokens
      setUserTokens(prev => prev ? {
        tokens_available: prev.tokens_available - data.tokensUsed,
        tokens_used: prev.tokens_used + data.tokensUsed
      } : null);
      
      toast({
        title: "Analysis Complete",
        description: "Your material has been processed successfully.",
      });
      
    } catch (error: any) {
      toast({
        title: "Processing Error",
        description: error.message,
        variant: "destructive",
      });
      
      // Revert file status to uploaded
      setFiles(prev => 
        prev.map(f => 
          f.id === fileId 
            ? { ...f, status: 'uploaded' as const } 
            : f
        )
      );
      
    } finally {
      setProcessingFile(null);
    }
  };
  
  const handleDeleteFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };
  
  const handleQuestionSubmit = () => {
    if (!question.trim()) return;
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to use the AI tutor",
        variant: "destructive",
      });
      navigate('/signin');
      return;
    }
    
    if (!userTokens || userTokens.tokens_available < 5) {
      toast({
        title: "Insufficient tokens",
        description: "You need at least 5 tokens to ask a question. Please purchase more tokens.",
        variant: "destructive",
      });
      navigate('/student/tokens');
      return;
    }
    
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
      
      // Update user tokens (simulate token usage)
      setUserTokens(prev => prev ? {
        tokens_available: prev.tokens_available - 5,
        tokens_used: prev.tokens_used + 5
      } : null);
      
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col max-w-full overflow-x-hidden">
      <Navbar />
      <main className="flex-grow w-full">
        <div className="bg-primary text-white py-12 w-full">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Student Help Center</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Upload your study materials for AI-powered analysis, summaries, and practice questions
            </p>
            
            {userTokens && (
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <div className="bg-white/10 py-2 px-4 rounded-full flex items-center">
                  <Coins className="h-4 w-4 mr-2" />
                  <span>{userTokens.tokens_available} tokens available</span>
                </div>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={() => navigate('/student/tokens')}
                >
                  Get More Tokens
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="materials" className="w-full">
            <div className="w-full overflow-x-auto scrollbar-hide">
              <TabsList className="mb-8 w-auto inline-flex">
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
            </div>
            
            <TabsContent value="materials" className="space-y-8 overflow-x-hidden">
              {!user && (
                <Alert variant="warning" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Authentication Required</AlertTitle>
                  <AlertDescription>
                    Please <Button variant="link" className="p-0 h-auto font-normal" onClick={() => navigate('/signin')}>sign in</Button> to upload and process materials.
                  </AlertDescription>
                </Alert>
              )}
              
              {user && userTokens && userTokens.tokens_available < 10 && (
                <Alert variant="warning" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Low Token Balance</AlertTitle>
                  <AlertDescription>
                    You have {userTokens.tokens_available} tokens available. Processing materials requires at least 10 tokens.{' '}
                    <Button variant="link" className="p-0 h-auto font-normal" onClick={() => navigate('/student/tokens')}>
                      Purchase more tokens
                    </Button>
                  </AlertDescription>
                </Alert>
              )}
              
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
                      Click "Process" to analyze your materials with AI
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {files.map(file => (
                        <div key={file.id} className="flex items-center justify-between border rounded-lg p-3">
                          <FileItem 
                            file={file}
                            onDelete={() => handleDeleteFile(file.id)} 
                          />
                          {file.status === 'uploaded' && (
                            <Button 
                              className="ml-4"
                              onClick={() => handleProcessFile(file.id)}
                              disabled={processingFile === file.id}
                            >
                              {processingFile === file.id ? (
                                <>
                                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                  Processing...
                                </>
                              ) : (
                                'Process'
                              )}
                            </Button>
                          )}
                          {file.status === 'processing' && processingFile !== file.id && (
                            <div className="ml-4 text-amber-500 font-medium flex items-center">
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Processing...
                            </div>
                          )}
                          {file.status === 'processed' && (
                            <div className="ml-4 text-green-600 font-medium flex items-center">
                              <Check className="h-4 w-4 mr-1" />
                              Processed
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="summaries" className="overflow-x-hidden">
              {files.filter(file => file.status === 'processed' && file.summary).length > 0 ? (
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
                        {files.filter(file => file.status === 'processed' && file.summary).map(file => (
                          <Card key={file.id}>
                            <CardHeader>
                              <CardTitle className="text-lg font-medium">{file.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-gray-700 whitespace-pre-line">
                                {file.summary}
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
                        Upload some study materials and process them to generate summaries
                      </p>
                      <Button variant="outline" onClick={() => document.querySelector('[data-value="materials"]')?.dispatchEvent(new Event('click'))}>
                        Upload Materials
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="practice" className="overflow-x-hidden">
              {files.filter(file => file.status === 'processed' && file.questions && file.questions.length > 0).length > 0 ? (
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
                        {files.filter(file => file.status === 'processed' && file.questions && file.questions.length > 0).map(file => (
                          <Card key={file.id}>
                            <CardHeader>
                              <CardTitle className="text-lg font-medium">{file.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-6">
                                {file.questions?.map((q, i) => (
                                  <div key={i} className="p-4 border rounded-lg">
                                    <p className="font-medium mb-2">Question {i+1}: {q.question}</p>
                                    <div className="space-y-1 ml-4 mb-3">
                                      {q.options.map((option, j) => (
                                        <div key={j} className="flex items-center space-x-2">
                                          <div className={`w-5 h-5 flex items-center justify-center rounded-full border ${option === q.answer ? 'bg-primary text-white border-primary' : 'border-gray-400'}`}>
                                            {String.fromCharCode(65 + j)}
                                          </div>
                                          <span>{option}</span>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-md">
                                      <p className="font-medium">Explanation:</p>
                                      <p className="text-gray-700">{q.explanation}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              
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
                        Upload and process study materials to generate practice questions
                      </p>
                      <Button variant="outline" onClick={() => document.querySelector('[data-value="materials"]')?.dispatchEvent(new Event('click'))}>
                        Upload Materials
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="tutor" className="overflow-x-hidden">
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
                        <Button onClick={handleQuestionSubmit}>
                          Send{userTokens && <span className="ml-2 text-xs opacity-75">(-5 tokens)</span>}
                        </Button>
                      </div>
                      {userTokens && userTokens.tokens_available < 5 && (
                        <p className="text-red-500 text-sm mt-2">
                          You don't have enough tokens to ask questions. 
                          <Button variant="link" className="p-0 h-auto text-sm" onClick={() => navigate('/student/tokens')}>
                            Purchase more tokens
                          </Button>
                        </p>
                      )}
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
                                <p className="text-xs text-muted-foreground">Processed on {new Date(file.uploadDate).toLocaleDateString()}</p>
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
                      
                      {userTokens && (
                        <div className="mt-6 p-4 rounded-md bg-gray-50">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm">Available Tokens:</span>
                            <span className="font-medium">{userTokens.tokens_available}</span>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => navigate('/student/tokens')}
                          >
                            <Coins className="h-4 w-4 mr-2" />
                            Manage Tokens
                          </Button>
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

const Check = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export default StudentHelpPage;
