
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { FileUp, BookOpen, MessageSquare, HelpCircle, Upload, File, FilePlus, Clock } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';

const StudyHelpPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [aiSummaryType, setAiSummaryType] = useState<string>('summarize');
  const [aiQuestion, setAiQuestion] = useState<string>('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [questionType, setQuestionType] = useState<string>('multiple-choice');
  const [tokensUsed, setTokensUsed] = useState<number>(0);
  const [tokensRemaining, setTokensRemaining] = useState<number>(0);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Create a URL for preview if it's an image
      if (selectedFile.type.startsWith('image/')) {
        setFileUrl(URL.createObjectURL(selectedFile));
      } else {
        setFileUrl(null);
      }
    }
  };
  
  const handleUpload = async () => {
    if (!user) {
      toast({
        title: "Not authenticated",
        description: "Please sign in first",
        variant: "destructive",
      });
      navigate("/signin");
      return;
    }
    
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Upload file to Supabase storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `study_materials/${fileName}`;
      
      // Upload progress simulation
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            return 95;
          }
          return prev + 5;
        });
      }, 100);
      
      const { error: storageError } = await supabase.storage
        .from('study_materials')
        .upload(filePath, file);
      
      if (storageError) {
        throw new Error(storageError.message);
      }
      
      // Get URL for the uploaded file
      const { data: urlData } = supabase.storage
        .from('study_materials')
        .getPublicUrl(filePath);
      
      // Add record to the reading_materials table
      const { error: dbError } = await supabase
        .from('reading_materials')
        .insert({
          title: file.name,
          description: 'Uploaded for AI analysis',
          file_path: filePath,
          content_type: file.type,
          user_id: user.id,
          is_public: false
        });
      
      if (dbError) {
        throw new Error(dbError.message);
      }
      
      clearInterval(interval);
      setUploadProgress(100);
      
      setTimeout(() => {
        setIsUploading(false);
        toast({
          title: "File uploaded successfully",
          description: "Your material is now being processed by our AI.",
        });
        setActiveTab('ai-analyze');
      }, 500);
    } catch (error: any) {
      setIsUploading(false);
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };
  
  const handleGenerateContent = async () => {
    if (!user) {
      toast({
        title: "Not authenticated",
        description: "Please sign in first",
        variant: "destructive",
      });
      navigate("/signin");
      return;
    }
    
    if (!file) {
      toast({
        title: "No material available",
        description: "Please upload a file first",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // Call the process-material edge function
      const { data, error } = await supabase.functions.invoke('process-material', {
        body: { fileId: file.name, fileName: file.name }
      });
      
      if (error) {
        if (error.message.includes("Not enough tokens")) {
          toast({
            title: "Not enough tokens",
            description: "You don't have enough tokens. Please purchase more tokens.",
            variant: "destructive",
          });
          navigate('/student/tokens');
          return;
        }
        throw new Error(error.message);
      }
      
      if (data) {
        setTokensUsed(data.tokensUsed);
        setTokensRemaining(data.tokensRemaining);
        
        if (aiSummaryType === 'summarize') {
          setGeneratedContent(data.summary);
        } else if (aiSummaryType === 'expand') {
          // For expansion, we would use a different property from the API response
          // For now, we'll use the same summary data
          setGeneratedContent(data.summary);
        }
        
        toast({
          title: "Content generated",
          description: `AI has ${aiSummaryType === 'summarize' ? 'summarized' : 'expanded'} your material.`,
        });
      }
    } catch (error: any) {
      toast({
        title: "Generation failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleGenerateQuestions = async () => {
    if (!user) {
      toast({
        title: "Not authenticated",
        description: "Please sign in first",
        variant: "destructive",
      });
      navigate("/signin");
      return;
    }
    
    if (!file) {
      toast({
        title: "No material available",
        description: "Please upload a file first",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // Call the process-material edge function
      const { data, error } = await supabase.functions.invoke('process-material', {
        body: { fileId: file.name, fileName: file.name }
      });
      
      if (error) {
        if (error.message.includes("Not enough tokens")) {
          toast({
            title: "Not enough tokens",
            description: "You don't have enough tokens. Please purchase more tokens.",
            variant: "destructive",
          });
          navigate('/student/tokens');
          return;
        }
        throw new Error(error.message);
      }
      
      if (data) {
        setTokensUsed(data.tokensUsed);
        setTokensRemaining(data.tokensRemaining);
        
        // Format the questions based on questionType
        let questionsHTML = '';
        if (questionType === 'multiple-choice') {
          questionsHTML = `
            <h3 class="text-xl font-medium mb-4">Multiple Choice Questions</h3>
            <div class="space-y-6">
              ${data.questions.map((q: any, i: number) => `
                <div class="border p-4 rounded-lg">
                  <p class="font-medium mb-3">${i+1}. ${q.question}</p>
                  <div class="space-y-2">
                    ${q.options.map((opt: string, j: number) => `
                      <div class="flex items-center">
                        <span class="mr-2">${String.fromCharCode(65 + j)}.</span>
                        <span>${opt}</span>
                      </div>
                    `).join('')}
                  </div>
                  <div class="mt-3 pt-3 border-t">
                    <p class="font-medium">Answer: ${q.answer}</p>
                    <p class="text-gray-700 mt-1">${q.explanation}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          `;
        } else if (questionType === 'theory') {
          questionsHTML = `
            <h3 class="text-xl font-medium mb-4">Theory Questions</h3>
            <div class="space-y-6">
              ${data.questions.map((q: any, i: number) => `
                <div class="border p-4 rounded-lg">
                  <p class="font-medium mb-3">${i+1}. ${q.question}</p>
                  <div class="mt-3 pt-3 border-t">
                    <p class="font-medium">Model Answer:</p>
                    <p class="text-gray-700 mt-1">${q.explanation}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          `;
        }
        
        setGeneratedContent(questionsHTML);
        
        toast({
          title: "Questions generated",
          description: `AI has created ${questionType} questions based on your material.`,
        });
      }
    } catch (error: any) {
      toast({
        title: "Question generation failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleAskQuestion = async () => {
    if (!user) {
      toast({
        title: "Not authenticated",
        description: "Please sign in first",
        variant: "destructive",
      });
      navigate("/signin");
      return;
    }
    
    if (!aiQuestion.trim()) {
      toast({
        title: "Empty question",
        description: "Please enter a question to ask",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // Call the process-material edge function with the question
      const { data, error } = await supabase.functions.invoke('process-material', {
        body: { fileId: file?.name, fileName: file?.name, question: aiQuestion }
      });
      
      if (error) {
        if (error.message.includes("Not enough tokens")) {
          toast({
            title: "Not enough tokens",
            description: "You don't have enough tokens. Please purchase more tokens.",
            variant: "destructive",
          });
          navigate('/student/tokens');
          return;
        }
        throw new Error(error.message);
      }
      
      if (data) {
        setTokensUsed(data.tokensUsed);
        setTokensRemaining(data.tokensRemaining);
        setAiAnswer(data.summary || "I couldn't find an answer to your question in the provided material.");
        
        toast({
          title: "Question answered",
          description: "AI has responded to your question.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Failed to get answer",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddGeminiApiKey = () => {
    toast({
      title: "Add Gemini API Key",
      description: "Please click the button below to add your Gemini API key.",
      variant: "default",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-primary text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Study Help</h1>
            <p className="text-xl max-w-3xl">
              Upload your textbooks, notes, or study materials and let our AI help you learn more effectively
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          {tokensRemaining > 0 && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">Token Balance: {tokensRemaining}</p>
                <Button variant="outline" size="sm" onClick={() => navigate('/student/tokens')}>
                  Buy More
                </Button>
              </div>
              <p className="text-sm text-gray-600">Last processing used {tokensUsed} tokens</p>
            </div>
          )}

          <div className="mb-6">
            <Button variant="outline" onClick={handleAddGeminiApiKey}>
              Configure Gemini 2.0 Flash API Key
            </Button>
          </div>
          
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-8 grid grid-cols-1 md:grid-cols-4 w-full">
              <TabsTrigger value="upload" className="flex items-center">
                <Upload className="h-4 w-4 mr-2" />
                Upload Materials
              </TabsTrigger>
              <TabsTrigger value="ai-analyze" className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                AI Analysis
              </TabsTrigger>
              <TabsTrigger value="ai-questions" className="flex items-center">
                <HelpCircle className="h-4 w-4 mr-2" />
                Generate Questions
              </TabsTrigger>
              <TabsTrigger value="ai-chat" className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                AI Tutor Chat
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Your Study Materials</CardTitle>
                  <CardDescription>
                    Upload textbooks, notes, or any study materials for AI analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border-2 border-dashed rounded-lg p-12 text-center bg-muted/30">
                      {fileUrl ? (
                        <div className="space-y-4">
                          {file?.type.startsWith('image/') ? (
                            <img 
                              src={fileUrl} 
                              alt="Preview" 
                              className="max-h-64 mx-auto rounded"
                            />
                          ) : (
                            <div className="flex items-center justify-center">
                              <File className="h-16 w-16 text-primary" />
                            </div>
                          )}
                          <p>{file?.name}</p>
                          <p className="text-sm text-gray-500">{(file?.size ? (file.size / 1024 / 1024).toFixed(2) : 0)} MB</p>
                        </div>
                      ) : (
                        <>
                          <FileUp className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                          <p className="text-lg">Drag and drop your files here, or click to browse</p>
                          <p className="text-sm text-gray-500 mt-2">
                            Supports PDF, DOCX, TXT, JPG, PNG files (Max 50MB)
                          </p>
                        </>
                      )}
                      <Input
                        type="file"
                        className="hidden"
                        id="file-upload"
                        onChange={handleFileChange}
                        accept=".pdf,.docx,.txt,.jpg,.jpeg,.png"
                      />
                      <div className="mt-6">
                        <Label htmlFor="file-upload" asChild>
                          <Button variant="outline" className="mr-4">
                            <FilePlus className="h-4 w-4 mr-2" />
                            Browse Files
                          </Button>
                        </Label>
                        {file && (
                          <Button variant="ghost" onClick={() => {
                            setFile(null);
                            setFileUrl(null);
                          }}>
                            Remove File
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {isUploading && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Uploading...</span>
                          <span className="text-sm">{uploadProgress}%</span>
                        </div>
                        <Progress value={uploadProgress} />
                      </div>
                    )}
                    
                    <div className="flex justify-end">
                      <Button
                        onClick={handleUpload}
                        disabled={!file || isUploading}
                        className="w-full sm:w-auto"
                      >
                        {isUploading ? "Uploading..." : "Upload Material"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="ai-analyze">
              <Card>
                <CardHeader>
                  <CardTitle>AI Material Analysis</CardTitle>
                  <CardDescription>
                    Our AI will analyze your material and generate summaries or expanded explanations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {file ? (
                      <>
                        <div className="flex items-center space-x-2 p-4 bg-muted/30 rounded-lg">
                          <File className="h-8 w-8 text-primary" />
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Analysis Options</h3>
                          <RadioGroup 
                            value={aiSummaryType} 
                            onValueChange={setAiSummaryType}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                          >
                            <div className="border rounded-lg p-4 cursor-pointer hover:border-primary">
                              <div className="flex items-start space-x-2">
                                <RadioGroupItem value="summarize" id="summarize" />
                                <div>
                                  <Label htmlFor="summarize" className="font-medium cursor-pointer">Summarize Material</Label>
                                  <p className="text-sm text-gray-500">
                                    Create a concise summary of key points and concepts
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="border rounded-lg p-4 cursor-pointer hover:border-primary">
                              <div className="flex items-start space-x-2">
                                <RadioGroupItem value="expand" id="expand" />
                                <div>
                                  <Label htmlFor="expand" className="font-medium cursor-pointer">Expand Content</Label>
                                  <p className="text-sm text-gray-500">
                                    Add additional details, examples and explanations
                                  </p>
                                </div>
                              </div>
                            </div>
                          </RadioGroup>
                          
                          <Button 
                            onClick={handleGenerateContent}
                            disabled={isGenerating}
                            className="w-full"
                          >
                            {isGenerating ? (
                              <>
                                <Clock className="mr-2 h-4 w-4 animate-spin" />
                                Generating...
                              </>
                            ) : (
                              `Generate ${aiSummaryType === 'summarize' ? 'Summary' : 'Expanded Content'}`
                            )}
                          </Button>
                        </div>
                        
                        {generatedContent && (
                          <div className="mt-6">
                            <h3 className="text-xl font-medium mb-4">
                              {aiSummaryType === 'summarize' ? 'Material Summary' : 'Expanded Content'}
                            </h3>
                            <div className="p-6 bg-muted/20 rounded-lg">
                              <p className="whitespace-pre-line">{generatedContent}</p>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-center py-12">
                        <BookOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-medium mb-2">No Material Available</h3>
                        <p className="text-gray-600 mb-6">
                          Please upload your study material first to use the AI analysis features
                        </p>
                        <Button onClick={() => setActiveTab('upload')}>
                          Upload Material
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="ai-questions">
              <Card>
                <CardHeader>
                  <CardTitle>Generate Practice Questions</CardTitle>
                  <CardDescription>
                    Our AI will create custom practice questions based on your uploaded material
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {file ? (
                      <>
                        <div className="flex items-center space-x-2 p-4 bg-muted/30 rounded-lg">
                          <File className="h-8 w-8 text-primary" />
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Question Type</h3>
                          <RadioGroup 
                            value={questionType} 
                            onValueChange={setQuestionType}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                          >
                            <div className="border rounded-lg p-4 cursor-pointer hover:border-primary">
                              <div className="flex items-start space-x-2">
                                <RadioGroupItem value="multiple-choice" id="multiple-choice" />
                                <div>
                                  <Label htmlFor="multiple-choice" className="font-medium cursor-pointer">Multiple Choice</Label>
                                  <p className="text-sm text-gray-500">
                                    Generate questions with multiple answer options
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="border rounded-lg p-4 cursor-pointer hover:border-primary">
                              <div className="flex items-start space-x-2">
                                <RadioGroupItem value="theory" id="theory" />
                                <div>
                                  <Label htmlFor="theory" className="font-medium cursor-pointer">Theory Questions</Label>
                                  <p className="text-sm text-gray-500">
                                    Create essay-style questions with model answers
                                  </p>
                                </div>
                              </div>
                            </div>
                          </RadioGroup>
                          
                          <Button 
                            onClick={handleGenerateQuestions}
                            disabled={isGenerating}
                            className="w-full"
                          >
                            {isGenerating ? (
                              <>
                                <Clock className="mr-2 h-4 w-4 animate-spin" />
                                Generating...
                              </>
                            ) : (
                              `Generate ${questionType === 'multiple-choice' ? 'Multiple Choice' : 'Theory'} Questions`
                            )}
                          </Button>
                        </div>
                        
                        {generatedContent && (
                          <div className="mt-6">
                            <div className="p-6 bg-muted/20 rounded-lg">
                              <div dangerouslySetInnerHTML={{ __html: generatedContent }} />
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-center py-12">
                        <HelpCircle className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-medium mb-2">No Material Available</h3>
                        <p className="text-gray-600 mb-6">
                          Please upload your study material first to generate practice questions
                        </p>
                        <Button onClick={() => setActiveTab('upload')}>
                          Upload Material
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="ai-chat">
              <Card>
                <CardHeader>
                  <CardTitle>Chat with AI Tutor</CardTitle>
                  <CardDescription>
                    Ask questions about your study materials and get immediate answers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {file ? (
                      <>
                        <div className="flex items-center space-x-2 p-4 bg-muted/30 rounded-lg">
                          <File className="h-8 w-8 text-primary" />
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        
                        <div className="bg-muted/20 rounded-lg p-4 h-[300px] overflow-y-auto">
                          <div className="space-y-4">
                            <div className="flex items-start">
                              <div className="bg-primary/10 rounded-lg p-3 max-w-[75%]">
                                <p className="text-sm font-medium">AI Tutor</p>
                                <p>Hello! I've analyzed your material. What questions do you have about the topics covered in the material?</p>
                              </div>
                            </div>
                            
                            {aiAnswer && (
                              <>
                                <div className="flex items-start justify-end">
                                  <div className="bg-primary text-white rounded-lg p-3 max-w-[75%]">
                                    <p className="text-sm font-medium">You</p>
                                    <p>{aiQuestion}</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-start">
                                  <div className="bg-primary/10 rounded-lg p-3 max-w-[75%]">
                                    <p className="text-sm font-medium">AI Tutor</p>
                                    <p className="whitespace-pre-line">{aiAnswer}</p>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <Textarea
                            placeholder="Ask a question about your material..."
                            value={aiQuestion}
                            onChange={(e) => setAiQuestion(e.target.value)}
                            className="min-h-[100px] resize-none"
                          />
                          
                          <Button 
                            onClick={handleAskQuestion}
                            disabled={isGenerating || !aiQuestion.trim()}
                            className="w-full"
                          >
                            {isGenerating ? (
                              <>
                                <Clock className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              "Ask Question"
                            )}
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-12">
                        <MessageSquare className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-medium mb-2">No Material Available</h3>
                        <p className="text-gray-600 mb-6">
                          Please upload your study material first to chat with the AI tutor
                        </p>
                        <Button onClick={() => setActiveTab('upload')}>
                          Upload Material
                        </Button>
                      </div>
                    )}
                  </div>
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
