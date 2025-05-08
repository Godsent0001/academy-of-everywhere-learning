
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Clock, AlertCircle } from 'lucide-react';
import { Course, Question } from '@/types';
import { faculties } from '@/data/faculties';
import { useToast } from '@/hooks/use-toast';

const ExamPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Find the course
  let course: Course | undefined;
  
  for (const faculty of faculties) {
    for (const department of faculty.departments) {
      const found = department.courses.find((c) => c.slug === slug);
      if (found) {
        course = found;
        break;
      }
    }
    if (course) break;
  }
  
  // Mock exam data
  const mockExam = {
    id: `exam-${course?.id || 'unknown'}`,
    courseId: course?.id || 'unknown',
    title: `${course?.name || 'Course'} Final Exam`,
    description: `Test your knowledge and understanding of ${course?.name || 'this course'}.`,
    duration: '60 minutes',
    passingScore: 70,
    questions: [
      {
        id: 'q1',
        lessonId: 'exam',
        question: 'What is the main focus of this course?',
        answer: course?.description ? course.description.split(' ').slice(0, 3).join(' ') : 'Understanding key concepts',
        options: [
          course?.description ? course.description.split(' ').slice(0, 3).join(' ') : 'Understanding key concepts',
          'Practical application',
          'Historical context',
          'Research methodologies'
        ],
        type: 'multiple-choice'
      },
      {
        id: 'q2',
        lessonId: 'exam',
        question: 'This course is categorized as which difficulty level?',
        answer: course?.difficulty || 'Intermediate',
        options: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
        type: 'multiple-choice'
      },
      {
        id: 'q3',
        lessonId: 'exam',
        question: 'Explain the importance of this subject in today\'s world.',
        answer: '',
        type: 'open-ended'
      }
    ]
  };
  
  const [exam] = useState(mockExam);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };
  
  const calculateScore = () => {
    let correctAnswers = 0;
    let totalQuestions = 0;
    
    exam.questions.forEach(question => {
      if (question.type !== 'open-ended') {
        totalQuestions++;
        if (answers[question.id] === question.answer) {
          correctAnswers++;
        }
      }
    });
    
    return {
      score: Math.round((correctAnswers / totalQuestions) * 100),
      correctAnswers,
      totalQuestions
    };
  };
  
  const handleSubmitExam = () => {
    setIsSubmitting(true);
    
    // Simulate submission delay
    setTimeout(() => {
      const result = calculateScore();
      
      // Save result and navigate to certificate page if passed
      if (result.score >= exam.passingScore) {
        navigate(`/certificate/${course?.slug}`);
      } else {
        toast({
          title: "Exam Result",
          description: `You scored ${result.score}%. The passing score is ${exam.passingScore}%. Please try again.`,
          variant: "destructive"
        });
        navigate(`/course/${course?.slug}`);
      }
    }, 1500);
  };

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Course not found</h2>
            <p className="mb-6">Sorry, we couldn't find the course exam you're looking for.</p>
            <Link to="/courses" className="text-primary hover:underline">
              Browse all courses
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-primary text-white py-8">
          <div className="container mx-auto px-4">
            <div className="mb-2 flex justify-between items-center">
              <h1 className="text-3xl font-serif font-bold">{exam.title}</h1>
              <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                <Clock className="h-5 w-5 mr-2" />
                <span className="font-medium">{formatTime(timeLeft)}</span>
              </div>
            </div>
            <p className="text-lg">{exam.description}</p>
          </div>
        </div>
        
        <div className="page-container">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Exam Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>
                    {Object.keys(answers).length} of {exam.questions.length} questions answered
                  </span>
                  <span>
                    {Math.round((Object.keys(answers).length / exam.questions.length) * 100)}%
                  </span>
                </div>
                <Progress value={(Object.keys(answers).length / exam.questions.length) * 100} />
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-8 mb-12">
            {exam.questions.map((question, index) => (
              <Card key={question.id}>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Question {index + 1}: {question.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
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
                  
                  {question.type === 'open-ended' && (
                    <Textarea
                      placeholder="Type your answer here..."
                      value={answers[question.id] || ""}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      className="w-full h-32"
                    />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="bg-muted/30">
            <CardContent className="pt-6">
              <div className="flex items-center text-amber-600 mb-4">
                <AlertCircle className="h-5 w-5 mr-2" />
                <p className="text-sm font-medium">
                  Please review all your answers before submitting. You cannot change your answers after submission.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link to={`/course/${course.slug}`}>Cancel Exam</Link>
              </Button>
              <Button 
                onClick={handleSubmitExam}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Exam"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExamPage;
