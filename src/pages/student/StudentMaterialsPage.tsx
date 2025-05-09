
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

const StudentMaterialsPage: React.FC = () => {
  const navigate = useNavigate();
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
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    
    // Simulate file upload with progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          
          toast({
            title: "File uploaded successfully",
            description: "Your material is now being processed by our AI.",
          });
          
          // Navigate to AI tab after successful upload
          setActiveTab('ai-analyze');
        }, 500);
      }
    }, 300);
  };
  
  const handleGenerateContent = () => {
    if (!file) {
      toast({
        title: "No material available",
        description: "Please upload a file first",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsGenerating(false);
      
      if (aiSummaryType === 'summarize') {
        setGeneratedContent("Our AI has analyzed your material and created a comprehensive summary. The material covers key concepts including cellular biology, DNA replication, and protein synthesis. The primary arguments presented revolve around the central dogma of molecular biology and how genetic information flows from DNA to RNA to proteins. Key details include the structure of DNA, the process of transcription and translation, and the role of enzymes in cellular processes. This material is most relevant for undergraduate-level biology students and connects with broader themes in genetics and biochemistry.");
      } else if (aiSummaryType === 'expand') {
        setGeneratedContent("Our AI has expanded on your material with additional details and examples. The cell is the basic unit of life, consisting of various organelles each with specialized functions. The nucleus contains DNA, which carries genetic information encoded in genes. DNA replication is a semi-conservative process that occurs during the S phase of the cell cycle. During replication, the DNA helix unwinds, and each strand serves as a template for the synthesis of a new complementary strand. Enzymes involved include DNA polymerase, helicase, and ligase. Transcription is the process by which DNA is copied into RNA, specifically messenger RNA (mRNA). The mRNA then undergoes translation on ribosomes, where the genetic code is used to assemble amino acids into proteins. Proteins are essential for virtually all cell functions, including structural support, catalyzing biochemical reactions, and cell signaling. Mutations in DNA can lead to changes in protein structure and function, potentially causing diseases such as cystic fibrosis, sickle cell anemia, and certain cancers.");
      }
      
      toast({
        title: "Content generated",
        description: `AI has ${aiSummaryType === 'summarize' ? 'summarized' : 'expanded'} your material.`,
      });
    }, 3000);
  };
  
  const handleGenerateQuestions = () => {
    if (!file) {
      toast({
        title: "No material available",
        description: "Please upload a file first",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsGenerating(false);
      
      if (questionType === 'multiple-choice') {
        setGeneratedContent(`
          <h3 class="text-xl font-medium mb-4">Multiple Choice Questions</h3>
          <div class="space-y-6">
            <div class="border p-4 rounded-lg">
              <p class="font-medium mb-3">1. Which of the following is NOT involved in DNA replication?</p>
              <div class="space-y-2">
                <div class="flex items-center">
                  <span class="mr-2">A.</span>
                  <span>DNA polymerase</span>
                </div>
                <div class="flex items-center">
                  <span class="mr-2">B.</span>
                  <span>Helicase</span>
                </div>
                <div class="flex items-center">
                  <span class="mr-2">C.</span>
                  <span>RNA polymerase</span>
                </div>
                <div class="flex items-center">
                  <span class="mr-2">D.</span>
                  <span>Ligase</span>
                </div>
              </div>
              <div class="mt-3 pt-3 border-t">
                <p class="font-medium">Answer: C. RNA polymerase</p>
                <p class="text-gray-700 mt-1">RNA polymerase is involved in transcription, not DNA replication. DNA polymerase synthesizes new DNA strands, helicase unwinds the DNA double helix, and ligase joins DNA fragments.</p>
              </div>
            </div>
            <div class="border p-4 rounded-lg">
              <p class="font-medium mb-3">2. The process by which DNA is used as a template to create mRNA is called:</p>
              <div class="space-y-2">
                <div class="flex items-center">
                  <span class="mr-2">A.</span>
                  <span>Translation</span>
                </div>
                <div class="flex items-center">
                  <span class="mr-2">B.</span>
                  <span>Transcription</span>
                </div>
                <div class="flex items-center">
                  <span class="mr-2">C.</span>
                  <span>Replication</span>
                </div>
                <div class="flex items-center">
                  <span class="mr-2">D.</span>
                  <span>Transformation</span>
                </div>
              </div>
              <div class="mt-3 pt-3 border-t">
                <p class="font-medium">Answer: B. Transcription</p>
                <p class="text-gray-700 mt-1">Transcription is the process by which DNA is used as a template to create mRNA. Translation is the process by which mRNA is used to create proteins.</p>
              </div>
            </div>
          </div>
        `);
      } else if (questionType === 'theory') {
        setGeneratedContent(`
          <h3 class="text-xl font-medium mb-4">Theory Questions</h3>
          <div class="space-y-6">
            <div class="border p-4 rounded-lg">
              <p class="font-medium mb-3">1. Explain the process of DNA replication and describe the role of key enzymes involved in this process.</p>
              <div class="mt-3 pt-3 border-t">
                <p class="font-medium">Model Answer:</p>
                <p class="text-gray-700 mt-1">DNA replication is the process by which DNA makes a copy of itself during cell division. The process begins with the unwinding of the double helix structure by an enzyme called helicase, which breaks the hydrogen bonds between the complementary bases. This creates a replication fork with two single strands of DNA.</p>
                <p class="text-gray-700 mt-1">DNA polymerase is the main enzyme responsible for adding nucleotides to the growing DNA strand. It can only add nucleotides to the 3' end of a DNA strand, and it requires a primer to start synthesis. RNA primase creates short RNA primers that DNA polymerase can add onto.</p>
                <p class="text-gray-700 mt-1">Due to the antiparallel nature of DNA, one strand (the leading strand) is synthesized continuously, while the other (lagging strand) is synthesized in short fragments called Okazaki fragments. DNA ligase then joins these fragments together. The replication process is semi-conservative, meaning each new double helix consists of one original strand and one newly synthesized strand.</p>
              </div>
            </div>
            <div class="border p-4 rounded-lg">
              <p class="font-medium mb-3">2. Describe the central dogma of molecular biology and discuss any exceptions to this principle that have been discovered.</p>
              <div class="mt-3 pt-3 border-t">
                <p class="font-medium">Model Answer:</p>
                <p class="text-gray-700 mt-1">The central dogma of molecular biology, first proposed by Francis Crick in 1958, describes the flow of genetic information within a biological system. It states that information transfers from DNA to RNA through transcription, and from RNA to protein through translation, and that this process is irreversible.</p>
                <p class="text-gray-700 mt-1">However, several exceptions to this principle have been discovered. Reverse transcription, where RNA is used as a template to create DNA, is one such exception. This process is used by retroviruses like HIV, which use reverse transcriptase to convert their RNA genomes into DNA that can be integrated into the host cell's genome.</p>
                <p class="text-gray-700 mt-1">Another exception is RNA replication, where RNA is used as a template to create more RNA. This occurs in RNA viruses that don't have a DNA phase in their life cycle. Additionally, prions represent an exception where proteins can transmit information and cause changes in other proteins, without involving nucleic acids.</p>
              </div>
            </div>
          </div>
        `);
      }
      
      toast({
        title: "Questions generated",
        description: `AI has created ${questionType} questions based on your material.`,
      });
    }, 3000);
  };
  
  const handleAskQuestion = () => {
    if (!aiQuestion.trim()) {
      toast({
        title: "Empty question",
        description: "Please enter a question to ask",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsGenerating(false);
      setAiAnswer(`Based on the material you've uploaded, I can provide this answer:
      
The cell cycle consists of interphase (G1, S, and G2 phases) and the mitotic phase. During the S phase of interphase, DNA replication occurs. The mitotic phase includes mitosis, where the nucleus divides, and cytokinesis, where the cytoplasm divides.

During mitosis, chromosomes condense and become visible, the nuclear envelope breaks down, the mitotic spindle forms, chromosomes align at the metaphase plate, sister chromatids separate, and new nuclear envelopes form around the two sets of chromosomes.

Cytokinesis in animal cells involves a cleavage furrow that pinches the cell in two, while plant cells form a cell plate that develops into a new cell wall between the two daughter cells.

Would you like me to elaborate on any specific part of the cell cycle?`);
      
      toast({
        title: "Question answered",
        description: "AI has responded to your question.",
      });
    }, 2000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-primary text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Student Materials</h1>
            <p className="text-xl max-w-3xl">
              Upload your textbooks, notes, or study materials and let our AI help you learn more effectively
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
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
                          <p className="text-sm text-gray-500">{(file?.size / 1024 / 1024).toFixed(2)} MB</p>
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
                                <p>Hello! I've analyzed your material on cell biology. What questions do you have about DNA replication, protein synthesis, or other topics covered in the material?</p>
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

export default StudentMaterialsPage;
