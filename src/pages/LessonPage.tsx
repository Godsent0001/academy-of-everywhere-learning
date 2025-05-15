import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lesson, Course, Question } from '@/types';
import { ChevronLeft, ChevronRight, MessageCircle, CheckCircle } from 'lucide-react';
import { faculties } from '@/data/faculties';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const LessonPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState<string>('content');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, string>>({});
  
  let lesson: Lesson | undefined;
  let course: Course | undefined;
  let nextLesson: Lesson | undefined;
  let prevLesson: Lesson | undefined;
  
  // Find the lesson across all faculties, departments, and courses
  for (const faculty of faculties) {
    for (const department of faculty.departments) {
      for (const c of department.courses) {
        const lessonIndex = c.lessons.findIndex((l) => l.slug === slug);
        if (lessonIndex !== -1) {
          lesson = c.lessons[lessonIndex];
          course = c;
          prevLesson = lessonIndex > 0 ? c.lessons[lessonIndex - 1] : undefined;
          nextLesson = lessonIndex < c.lessons.length - 1 ? c.lessons[lessonIndex + 1] : undefined;
          break;
        }
      }
      if (lesson) break;
    }
    if (lesson) break;
  }
  
  if (!lesson || !course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Lesson not found</h2>
            <p className="mb-6">Sorry, we couldn't find the lesson you're looking for.</p>
            <Link to="/courses" className="text-primary hover:underline">
              Browse all courses
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Handle lesson content to properly display formatted content
  const renderLessonContent = (content: string) => {
    // Simple Markdown-like rendering
    let formattedContent = content
      // Replace bold text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Replace italic text
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Replace lists
      .replace(/- (.*?)(?:\n|$)/g, '<li>$1</li>')
      // Wrap lists in ul tags
      .replace(/(<li>.*?<\/li>)+/g, '<ul>$&</ul>');
    
    return formattedContent;
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const checkAnswer = (question: Question) => {
    const userAnswer = answers[question.id];
    if (!userAnswer) return null;
    
    if (question.type === 'multiple-choice' || question.type === 'true-false') {
      const isCorrect = userAnswer === question.answer;
      setFeedback(prev => ({
        ...prev,
        [question.id]: isCorrect 
          ? "Correct! Well done." 
          : `Incorrect. The correct answer is: ${question.answer}`
      }));
      return isCorrect;
    } else {
      // For open-ended questions, just acknowledge the submission
      setFeedback(prev => ({
        ...prev,
        [question.id]: "Answer submitted. Your instructor will review it."
      }));
      return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow w-full px-0 mx-0">
        <div className="bg-primary text-white py-8">
          <div className="container mx-auto px-4">
            <div className="mb-2">
              <Link to={`/course/${course.slug}`} className="text-white/80 hover:text-white flex items-center">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to {course.name}
              </Link>
            </div>
            <h1 className="text-3xl font-serif font-bold mb-2">{lesson.title}</h1>
            <p className="text-lg">Lesson {lesson.order} • {lesson.duration}</p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-6">
          <div className="mb-6 flex justify-between">
            {prevLesson ? (
              <Link to={`/lesson/${prevLesson.slug}`}>
                <Button variant="outline" className="flex items-center">
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous Lesson
                </Button>
              </Link>
            ) : (
              <div></div>
            )}
            
            {nextLesson ? (
              <Link to={`/lesson/${nextLesson.slug}`}>
                <Button className="flex items-center">
                  Next Lesson
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            ) : (
              <Link to={`/course/${course.slug}`}>
                <Button className="flex items-center">
                  Complete Course
                  <CheckCircle className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="content">Lesson Content</TabsTrigger>
              <TabsTrigger value="questions">Q&A</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content">
              <Card>
                <CardContent className="p-6">
                  <div className="prose max-w-none">
                    <h2 className="text-2xl font-serif font-medium mb-4">
                      {lesson.title}
                    </h2>
                    <div className="mb-6">
                      <p className="text-gray-700">{lesson.description}</p>
                    </div>
                    <Separator className="my-6" />
                    <div 
                      className="lesson-content"
                      dangerouslySetInnerHTML={{ 
                        __html: renderLessonContent(lesson.content) 
                      }} 
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="questions">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-serif font-medium mb-6">Questions & Answers</h2>
                  
                  <div className="space-y-8">
                    {lesson.questions && lesson.questions.length > 0 ? (
                      lesson.questions.map((question) => (
                        <div key={question.id} className="border rounded-lg p-6">
                          <h3 className="text-lg font-medium mb-4">{question.question}</h3>
                          
                          {question.type === 'multiple-choice' && question.options && (
                            <RadioGroup
                              value={answers[question.id] || ""}
                              onValueChange={(value) => handleAnswerChange(question.id, value)}
                            >
                              <div className="space-y-3">
                                {question.options.map((option, i) => (
                                  <div key={i} className="flex items-center space-x-2">
                                    <RadioGroupItem value={option} id={`${question.id}-${i}`} />
                                    <Label htmlFor={`${question.id}-${i}`}>{option}</Label>
                                  </div>
                                ))}
                              </div>
                            </RadioGroup>
                          )}
                          
                          {question.type === 'true-false' && (
                            <RadioGroup
                              value={answers[question.id] || ""}
                              onValueChange={(value) => handleAnswerChange(question.id, value)}
                            >
                              <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="True" id={`${question.id}-true`} />
                                  <Label htmlFor={`${question.id}-true`}>True</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="False" id={`${question.id}-false`} />
                                  <Label htmlFor={`${question.id}-false`}>False</Label>
                                </div>
                              </div>
                            </RadioGroup>
                          )}
                          
                          {question.type === 'open-ended' && (
                            <Textarea
                              placeholder="Type your answer here..."
                              value={answers[question.id] || ""}
                              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                              className="w-full h-32"
                            />
                          )}
                          
                          <div className="mt-4 flex justify-between items-center">
                            <Button 
                              onClick={() => checkAnswer(question)}
                              disabled={!answers[question.id]}
                            >
                              Submit Answer
                            </Button>
                            
                            <Button variant="ghost" size="sm" className="flex items-center">
                              <MessageCircle className="h-4 w-4 mr-2" />
                              Discuss
                            </Button>
                          </div>
                          
                          {feedback[question.id] && (
                            <div className={`mt-4 p-3 rounded-md ${
                              feedback[question.id].startsWith("Correct") 
                                ? "bg-green-50 text-green-700" 
                                : feedback[question.id].startsWith("Incorrect")
                                  ? "bg-red-50 text-red-700"
                                  : "bg-blue-50 text-blue-700"
                            }`}>
                              {feedback[question.id]}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-10 bg-muted/30 rounded-lg">
                        <p>No questions available for this lesson.</p>
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
      
      <style jsx>{`
        .lesson-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.375rem;
          margin: 1rem 0;
        }
        
        .lesson-content video {
          max-width: 100%;
          max-height: 400px;
          border-radius: 0.375rem;
          margin: 1rem 0;
        }
        
        .lesson-content ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin: 1rem 0;
        }
        
        .lesson-content li {
          margin-bottom: 0.5rem;
        }
        
        .lesson-content strong {
          font-weight: bold;
        }
        
        .lesson-content em {
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default LessonPage;
