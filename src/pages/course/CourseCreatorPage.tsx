import React, { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUploader } from '@/components/FileUploader';
import { FileItem } from '@/components/FileItem';
import { useToast } from "@/hooks/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Switch } from "@/components/ui/switch";
import { processMediaFile } from '@/utils/mediaUtils';
import { 
  BookOpen, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  FileText, 
  LucideIcon, 
  Image as ImageIcon, 
  FileVideo,
  PlusCircle,
  Book,
  Upload,
  Check,
  Award
} from "lucide-react";

type Lesson = {
  id: string;
  title: string;
  content: string;
  order: number;
  media: {
    id: string;
    type: 'image' | 'video' | 'document';
    url: string;
    name: string;
  }[];
  quizQuestions: QuizQuestion[];
};

type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctOption: number;
};

type Department = {
  id: string;
  name: string;
};

const mockDepartments: Department[] = [
  { id: 'dept-1', name: 'Computer Science' },
  { id: 'dept-2', name: 'Mathematics' },
  { id: 'dept-3', name: 'Physics' },
  { id: 'dept-4', name: 'Biology' },
  { id: 'dept-5', name: 'Chemistry' },
  { id: 'dept-6', name: 'English' },
  { id: 'dept-7', name: 'History' },
  { id: 'dept-8', name: 'Art' },
  { id: 'dept-9', name: 'Music' },
  { id: 'dept-10', name: 'Economics' }
].sort((a, b) => a.name.localeCompare(b.name)); // Sort departments alphabetically

const CourseCreatorPage: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('details');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [courseTitle, setCourseTitle] = useState<string>('');
  const [courseDescription, setCourseDescription] = useState<string>('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState<string>('');
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);
  const [finalExamEnabled, setFinalExamEnabled] = useState<boolean>(true);
  const [passingPercentage, setPassingPercentage] = useState<number>(70);
  
  const [newLessonTitle, setNewLessonTitle] = useState<string>('');
  const [newLessonContent, setNewLessonContent] = useState<string>('');
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [newQuestion, setNewQuestion] = useState<string>('');
  const [newOptions, setNewOptions] = useState<string[]>(['', '', '', '']);
  const [correctOption, setCorrectOption] = useState<number>(0);
  const [showingMediaTools, setShowingMediaTools] = useState<boolean>(false);
  
  // Reference for the content textarea to handle media insertion
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);
  
  const handleCoverImageUpload = async (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      setCoverImage(file);
      const imageUrl = URL.createObjectURL(file);
      setCoverImageUrl(imageUrl);
      
      toast({
        title: "Cover Image Uploaded",
        description: "Your course cover image has been uploaded successfully.",
      });
    }
  };
  
  // Handle media upload directly in content with compression
  const handleContentMediaUpload = async (files: File[]) => {
    if (files.length > 0 && contentTextareaRef.current) {
      const file = files[0];
      const fileType = file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'document';
      
      try {
        // Show loading toast
        toast({
          title: "Processing Media",
          description: "Optimizing your media file for best performance...",
        });
        
        // Process and optimize the media file
        const { file: processedFile, dimensions, thumbnailUrl } = await processMediaFile(file);
        
        // Create object URL for the processed file
        const mediaUrl = URL.createObjectURL(processedFile);
        const mediaId = Math.random().toString(36).substring(2, 9);
        
        // Insert media placeholder text at cursor position
        const textarea = contentTextareaRef.current;
        const cursorPosition = textarea.selectionStart;
        
        const mediaPlaceholder = fileType === 'image' 
          ? `\n\n[Image: ${file.name}]\n\n` 
          : fileType === 'video'
            ? `\n\n[Video: ${file.name}]\n\n`
            : `\n\n[Document: ${file.name}]\n\n`;
            
        const newContent = 
          newLessonContent.substring(0, cursorPosition) + 
          mediaPlaceholder +
          newLessonContent.substring(cursorPosition);
        
        setNewLessonContent(newContent);
        
        // Add to lesson media
        const newMedia = {
          id: mediaId,
          type: fileType as 'image' | 'video' | 'document',
          url: mediaUrl,
          name: file.name
        };
        
        if (currentLessonId) {
          // Update existing lesson
          const updatedLessons = lessons.map(lesson => 
            lesson.id === currentLessonId 
              ? { ...lesson, media: [...lesson.media, newMedia] }
              : lesson
          );
          setLessons(updatedLessons);
        } else {
          // For new lesson, just update the state
          const lessonMedia = lessons.find(l => l.id === currentLessonId)?.media || [];
          setLessons(prev => {
            if (currentLessonId) {
              return prev.map(lesson => 
                lesson.id === currentLessonId 
                  ? { ...lesson, media: [...lessonMedia, newMedia] }
                  : lesson
              );
            }
            return prev;
          });
        }
        
        toast({
          title: "Media Added",
          description: `${fileType.charAt(0).toUpperCase() + fileType.slice(1)} has been optimized and inserted into your lesson content.`,
        });
        
        // Set focus back to textarea after a short delay
        setTimeout(() => {
          if (contentTextareaRef.current) {
            contentTextareaRef.current.focus();
            // Position cursor after the inserted text
            const newPosition = cursorPosition + mediaPlaceholder.length;
            contentTextareaRef.current.setSelectionRange(newPosition, newPosition);
          }
        }, 100);
      } catch (error) {
        console.error("Error processing media:", error);
        toast({
          title: "Error Processing Media",
          description: "There was a problem processing your file. Please try again.",
          variant: "destructive"
        });
      }
    }
  };
  
  const handleAddLesson = () => {
    if (!newLessonTitle) {
      toast({
        title: "Validation Error",
        description: "Please enter a lesson title.",
        variant: "destructive"
      });
      return;
    }
    
    const newLesson: Lesson = {
      id: Math.random().toString(36).substring(2, 9),
      title: newLessonTitle,
      content: newLessonContent,
      order: lessons.length + 1,
      media: [], // Media is now embedded directly in content
      quizQuestions: [...quizQuestions],
    };
    
    setLessons([...lessons, newLesson]);
    
    // Reset form
    setNewLessonTitle('');
    setNewLessonContent('');
    setQuizQuestions([]);
    
    toast({
      title: "Lesson Added",
      description: `Lesson "${newLessonTitle}" has been added to your course.`,
    });
    
    // After adding, switch back to lessons list
    setActiveTab('lessons');
  };
  
  const handleEditLesson = (lesson: Lesson) => {
    setCurrentLessonId(lesson.id);
    setNewLessonTitle(lesson.title);
    setNewLessonContent(lesson.content);
    setQuizQuestions(lesson.quizQuestions);
    setActiveTab('add-lesson');
  };
  
  const handleUpdateLesson = () => {
    if (!currentLessonId) return;
    
    const updatedLessons = lessons.map(lesson => 
      lesson.id === currentLessonId 
        ? {
            ...lesson,
            title: newLessonTitle,
            content: newLessonContent,
            quizQuestions: quizQuestions,
          }
        : lesson
    );
    
    setLessons(updatedLessons);
    
    // Reset form
    setCurrentLessonId(null);
    setNewLessonTitle('');
    setNewLessonContent('');
    setQuizQuestions([]);
    
    toast({
      title: "Lesson Updated",
      description: "Your lesson has been updated successfully.",
    });
    
    // After updating, switch back to lessons list
    setActiveTab('lessons');
  };
  
  const handleDeleteLesson = (id: string) => {
    const updatedLessons = lessons.filter(lesson => lesson.id !== id);
    setLessons(updatedLessons);
    
    toast({
      title: "Lesson Deleted",
      description: "Your lesson has been deleted successfully.",
    });
  };
  
  const handleAddQuestion = () => {
    if (!newQuestion || newOptions.some(option => !option)) {
      toast({
        title: "Validation Error",
        description: "Please fill in the question and all options.",
        variant: "destructive"
      });
      return;
    }
    
    const newQuizQuestion: QuizQuestion = {
      id: Math.random().toString(36).substring(2, 9),
      question: newQuestion,
      options: [...newOptions],
      correctOption: correctOption,
    };
    
    setQuizQuestions([...quizQuestions, newQuizQuestion]);
    
    // Reset form
    setNewQuestion('');
    setNewOptions(['', '', '', '']);
    setCorrectOption(0);
    
    toast({
      title: "Question Added",
      description: "Quiz question has been added to your lesson.",
    });
  };
  
  const handleDeleteQuestion = (id: string) => {
    const updatedQuestions = quizQuestions.filter(question => question.id !== id);
    setQuizQuestions(updatedQuestions);
  };
  
  const handleUpdateOption = (index: number, value: string) => {
    const updatedOptions = [...newOptions];
    updatedOptions[index] = value;
    setNewOptions(updatedOptions);
  };
  
  const handleSaveCourse = () => {
    if (!courseTitle || !courseDescription || !selectedDepartment || lessons.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields and add at least one lesson.",
        variant: "destructive"
      });
      return;
    }
    
    // Check if there are enough quiz questions for a final exam
    const totalQuizQuestions = lessons.reduce(
      (total, lesson) => total + lesson.quizQuestions.length, 0
    );
    
    if (finalExamEnabled && totalQuizQuestions < 5) {
      toast({
        title: "Not Enough Quiz Questions",
        description: "You need at least 5 quiz questions across all lessons to enable the final exam.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Course Saved",
      description: `Your course has been saved successfully with ${
        finalExamEnabled ? `a final exam requiring ${passingPercentage}% to pass` : "no final exam"
      }.`,
    });
    
    // In a real app, would submit to backend here
    console.log({
      title: courseTitle,
      description: courseDescription,
      departmentId: selectedDepartment,
      coverImage,
      lessons,
      finalExam: {
        enabled: finalExamEnabled,
        passingPercentage
      }
    });
  };
  
  // Calculate total number of quiz questions across all lessons
  const totalQuizQuestions = lessons.reduce(
    (total, lesson) => total + lesson.quizQuestions.length, 0
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-primary text-white py-8 md:py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl md:text-4xl font-serif font-bold mb-4">Course Creator</h1>
            <p className="text-lg md:max-w-2xl">
              Create and manage your own courses, lessons, and quizzes
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-8 grid grid-cols-3 w-full max-w-xl mx-auto">
              <TabsTrigger value="details">Course Details</TabsTrigger>
              <TabsTrigger 
                value="lessons" 
                disabled={!courseTitle || !courseDescription || !selectedDepartment}
              >
                Lessons
              </TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            
            {/* Course Details Tab */}
            <TabsContent value="details" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Details</CardTitle>
                  <CardDescription>
                    Provide the basic information about your course
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select 
                      value={selectedDepartment} 
                      onValueChange={setSelectedDepartment}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        {mockDepartments.map((dept) => (
                          <SelectItem key={dept.id} value={dept.id}>
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="title">Course Title</Label>
                    <Input
                      id="title"
                      value={courseTitle}
                      onChange={(e) => setCourseTitle(e.target.value)}
                      placeholder="Introduction to Computer Science"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Course Description</Label>
                    <Textarea
                      id="description"
                      value={courseDescription}
                      onChange={(e) => setCourseDescription(e.target.value)}
                      placeholder="Provide a detailed description of your course..."
                      rows={5}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Cover Image</Label>
                    {coverImageUrl ? (
                      <div className="space-y-2">
                        <AspectRatio ratio={16 / 9}>
                          <img 
                            src={coverImageUrl} 
                            alt="Course cover" 
                            className="rounded-md object-cover w-full h-full"
                          />
                        </AspectRatio>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setCoverImage(null);
                            setCoverImageUrl('');
                          }}
                        >
                          Remove Image
                        </Button>
                      </div>
                    ) : (
                      <FileUploader
                        onFilesSelected={handleCoverImageUpload}
                        maxSize={5242880} // 5MB
                        accept={{
                          'image/jpeg': ['.jpg', '.jpeg'],
                          'image/png': ['.png'],
                        }}
                        maxFiles={1}
                      />
                    )}
                  </div>
                  
                  {/* Final Exam Settings */}
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-medium">Final Exam</h3>
                        <p className="text-sm text-muted-foreground">
                          Enable automatic final exam from all quiz questions
                        </p>
                      </div>
                      <Switch
                        checked={finalExamEnabled}
                        onCheckedChange={setFinalExamEnabled}
                      />
                    </div>
                    
                    {finalExamEnabled && (
                      <div className="mt-4 space-y-3">
                        <div className="space-y-2">
                          <Label htmlFor="passingPercentage">Passing percentage</Label>
                          <div className="flex items-center">
                            <Input
                              id="passingPercentage"
                              type="number"
                              min={50}
                              max={100}
                              value={passingPercentage}
                              onChange={(e) => setPassingPercentage(parseInt(e.target.value) || 70)}
                              className="w-24"
                            />
                            <span className="ml-2">%</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Students must score at least this percentage to earn a certificate
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    onClick={() => setActiveTab('lessons')}
                    disabled={!courseTitle || !courseDescription || !selectedDepartment}
                    className="w-full mt-4"
                  >
                    Continue to Lessons
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Lessons Tab */}
            <TabsContent value="lessons" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-serif font-bold">Course Lessons</h2>
                <Button onClick={() => setActiveTab('add-lesson')}>
                  <Plus className="h-4 w-4 mr-2" /> Add Lesson
                </Button>
              </div>
              
              {lessons.length > 0 ? (
                <div className="space-y-4">
                  {lessons.map((lesson, index) => (
                    <Card key={lesson.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>
                              Lesson {index + 1}: {lesson.title}
                            </CardTitle>
                            <CardDescription>
                              {lesson.quizQuestions.length} quiz questions
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditLesson(lesson)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeleteLesson(lesson.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {lesson.content.replace(/\[Image:.*?\]|\[Video:.*?\]|\[Document:.*?\]/g, '[Media]')}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <CardContent>
                    <div className="flex flex-col items-center">
                      <BookOpen className="h-16 w-16 text-gray-300 mb-4" />
                      <h3 className="text-xl font-medium mb-2">No Lessons Added Yet</h3>
                      <p className="text-muted-foreground mb-6">
                        Start adding lessons to your course
                      </p>
                      <Button onClick={() => setActiveTab('add-lesson')}>
                        <Plus className="h-4 w-4 mr-2" /> Add First Lesson
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {lessons.length > 0 && (
                <div className="space-y-4">
                  {/* Final Exam Section */}
                  <Card className={`border ${finalExamEnabled ? 'border-primary' : 'border-muted'}`}>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Award className="h-5 w-5 mr-2 text-primary" />
                        Final Exam
                      </CardTitle>
                      <CardDescription>
                        {finalExamEnabled 
                          ? `Students must achieve ${passingPercentage}% to earn a certificate` 
                          : "Final exam is disabled for this course"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {finalExamEnabled ? (
                        <div>
                          <p className="text-sm mb-4">
                            The final exam will include questions from all lessons (
                            <span className="font-medium">{totalQuizQuestions} questions total</span>
                            ).
                          </p>
                          {totalQuizQuestions < 5 && (
                            <p className="text-sm text-destructive">
                              You need at least 5 quiz questions across all lessons for a final exam.
                            </p>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm">
                          Enable the final exam option in Course Details to automatically generate
                          a final exam from all quiz questions.
                        </p>
                      )}
                    </CardContent>
                  </Card>
                  
                  <div className="flex justify-end mt-4">
                    <Button onClick={handleSaveCourse}>
                      <Save className="h-4 w-4 mr-2" /> Save Course
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
            
            {/* Add/Edit Lesson Tab */}
            <TabsContent value="add-lesson" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {currentLessonId ? "Edit Lesson" : "Add New Lesson"}
                  </CardTitle>
                  <CardDescription>
                    Create lesson content, upload media, and add quiz questions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="lessonTitle">Lesson Title</Label>
                    <Input
                      id="lessonTitle"
                      value={newLessonTitle}
                      onChange={(e) => setNewLessonTitle(e.target.value)}
                      placeholder="Introduction to Variables"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lessonContent">Lesson Content</Label>
                    <div className="relative">
                      <Textarea
                        id="lessonContent"
                        ref={contentTextareaRef}
                        value={newLessonContent}
                        onChange={(e) => setNewLessonContent(e.target.value)}
                        placeholder="Write your lesson content here..."
                        className="min-h-[200px] pr-12" // Make room for the media toolbar button
                      />
                      <div className="absolute right-2 top-2 flex flex-col space-y-2">
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={() => setShowingMediaTools(!showingMediaTools)}
                          className="h-8 w-8 rounded-full"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        
                        {showingMediaTools && (
                          <div className="absolute right-full mr-2 top-0 bg-white shadow-lg rounded-md p-2 flex flex-col space-y-2 border">
                            <FileUploader
                              onFilesSelected={handleContentMediaUpload}
                              maxSize={52428800} // 50MB
                              accept={{
                                'image/jpeg': ['.jpg', '.jpeg'],
                                'image/png': ['.png'],
                              }}
                              maxFiles={1}
                              className="w-full"
                            >
                              <Button 
                                type="button" 
                                size="sm" 
                                variant="outline"
                                className="flex items-center w-full"
                              >
                                <ImageIcon className="h-4 w-4 mr-2" />
                                Add Image
                              </Button>
                            </FileUploader>
                            
                            <FileUploader
                              onFilesSelected={handleContentMediaUpload}
                              maxSize={104857600} // 100MB
                              accept={{
                                'video/mp4': ['.mp4'],
                              }}
                              maxFiles={1}
                              className="w-full"
                            >
                              <Button 
                                type="button" 
                                size="sm" 
                                variant="outline"
                                className="flex items-center w-full"
                              >
                                <FileVideo className="h-4 w-4 mr-2" />
                                Add Video
                              </Button>
                            </FileUploader>
                            
                            <FileUploader
                              onFilesSelected={handleContentMediaUpload}
                              maxSize={52428800} // 50MB
                              accept={{
                                'application/pdf': ['.pdf'],
                                'application/msword': ['.doc'],
                                'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
                              }}
                              maxFiles={1}
                              className="w-full"
                            >
                              <Button 
                                type="button" 
                                size="sm" 
                                variant="outline"
                                className="flex items-center w-full"
                              >
                                <FileText className="h-4 w-4 mr-2" />
                                Add Document
                              </Button>
                            </FileUploader>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Use the + button to add images, videos, or documents directly into your content
                    </p>
                  </div>
                  
                  {/* Quiz Questions Section */}
                  <div className="space-y-4 border-t pt-4 mt-6">
                    <h3 className="font-medium text-lg">Quiz Questions</h3>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Add New Question</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="question">Question</Label>
                          <Input
                            id="question"
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)}
                            placeholder="Enter your quiz question"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Options</Label>
                          <div className="space-y-2">
                            {newOptions.map((option, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  className="h-4 w-4"
                                  name="correctOption"
                                  checked={correctOption === index}
                                  onChange={() => setCorrectOption(index)}
                                />
                                <Input
                                  value={option}
                                  onChange={(e) => handleUpdateOption(index, e.target.value)}
                                  placeholder={`Option ${index + 1}`}
                                  className="flex-grow"
                                />
                              </div>
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Select the radio button next to the correct answer.
                          </p>
                        </div>
                        
                        <Button onClick={handleAddQuestion} className="w-full">
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add Question
                        </Button>
                      </CardContent>
                    </Card>
                    
                    {/* List of Added Questions */}
                    {quizQuestions.length > 0 && (
                      <div className="space-y-3 mt-4">
                        <h4 className="font-medium">Added Questions</h4>
                        {quizQuestions.map((q, qIndex) => (
                          <Card key={q.id} className="p-4">
                            <div className="flex justify-between">
                              <h5 className="font-medium">Q{qIndex + 1}: {q.question}</h5>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteQuestion(q.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <ul className="mt-2 space-y-1">
                              {q.options.map((option, oIndex) => (
                                <li key={oIndex} className="text-sm flex items-center">
                                  <span className={q.correctOption === oIndex ? "text-primary font-medium" : ""}>
                                    {String.fromCharCode(65 + oIndex)}. {option}
                                    {q.correctOption === oIndex && " (Correct)"}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-4 border-t">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setActiveTab('lessons');
                        setCurrentLessonId(null);
                        setNewLessonTitle('');
                        setNewLessonContent('');
                        setQuizQuestions([]);
                        setShowingMediaTools(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button onClick={currentLessonId ? handleUpdateLesson : handleAddLesson}>
                      {currentLessonId ? (
                        <>
                          <Save className="h-4 w-4 mr-2" /> Update Lesson
                        </>
                      ) : (
                        <>
                          <PlusCircle className="h-4 w-4 mr-2" /> Add Lesson
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Preview Tab */}
            <TabsContent value="preview">
              <Card>
                <CardHeader>
                  <CardTitle>Course Preview</CardTitle>
                  <CardDescription>
                    See how your course will appear to students
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {courseTitle ? (
                    <div className="space-y-6">
                      <div>
                        {coverImageUrl && (
                          <div className="rounded-md overflow-hidden mb-4">
                            <AspectRatio ratio={16 / 9}>
                              <img 
                                src={coverImageUrl}
                                alt="Course cover"
                                className="w-full h-full object-cover"
                              />
                            </AspectRatio>
                          </div>
                        )}
                        <h2 className="text-2xl font-serif font-bold">{courseTitle}</h2>
                        <p className="text-muted-foreground mt-2">
                          Department: {mockDepartments.find(d => d.id === selectedDepartment)?.name}
                        </p>
                        <div className="mt-4">{courseDescription}</div>
                      </div>
                      
                      {lessons.length > 0 ? (
                        <div className="space-y-4 mt-6">
                          <h3 className="text-xl font-serif font-bold">Course Lessons</h3>
                          {lessons.map((lesson, index) => (
                            <Card key={lesson.id} className="hover:bg-muted/50">
                              <CardContent className="p-4">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground mr-3">
                                    {index + 1}
                                  </div>
                                  <div>
                                    <h4 className="font-medium">{lesson.title}</h4>
                                    <p className="text-xs text-muted-foreground">
                                      {lesson.quizQuestions.length} quiz questions
                                    </p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                          
                          {/* Final Exam Preview */}
                          {finalExamEnabled && totalQuizQuestions >= 5 && (
                            <Card className="border-primary">
                              <CardContent className="p-4">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground mr-3">
                                    <Award className="h-4 w-4" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium">Final Exam</h4>
                                    <p className="text-xs text-muted-foreground">
                                      {totalQuizQuestions} questions • {passingPercentage}% to pass
                                    </p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </div>
                      ) : (
                        <div className="text-center p-6 border rounded-md mt-6">
                          <p className="text-muted-foreground">No lessons added yet</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center p-10">
                      <Book className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                      <h3 className="text-xl font-medium mb-2">Complete Course Details First</h3>
                      <p className="text-muted-foreground mb-4">
                        Add your course details and lessons to see a preview
                      </p>
                      <Button variant="outline" onClick={() => setActiveTab('details')}>
                        Go to Course Details
                      </Button>
                    </div>
                  )}
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

export default CourseCreatorPage;
