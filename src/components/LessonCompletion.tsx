
import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { toast } from '@/hooks/use-toast';

interface LessonCompletionProps {
  lessonId: string;
  courseId: string;
  lessonIndex: number;
  totalLessons: number;
  onCompleted?: () => void;
}

interface LessonCompletionData {
  lessonId: string;
  courseId: string;
  completed: boolean;
  progress_percentage: number;
  completed_at?: string;
}

const LessonCompletion: React.FC<LessonCompletionProps> = ({
  lessonId,
  courseId,
  lessonIndex,
  totalLessons,
  onCompleted
}) => {
  const { user } = useAuth();
  const [completed, setCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (user) {
      fetchCompletionStatus();
    }
  }, [user, lessonId]);
  
  const fetchCompletionStatus = async () => {
    try {
      if (!user) return;
      
      // Get completion data from localStorage
      const storageKey = `lesson_completion_${user.id}_${lessonId}`;
      const storedData = localStorage.getItem(storageKey);
      
      if (storedData) {
        const data = JSON.parse(storedData) as LessonCompletionData;
        setCompleted(data.completed);
        setProgress(data.progress_percentage);
      }
    } catch (error) {
      console.error('Error fetching completion status:', error);
    }
  };
  
  const handleMarkAsCompleted = async () => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to track your progress',
        variant: 'destructive',
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Create completion data
      const completionData: LessonCompletionData = {
        lessonId,
        courseId,
        completed: true,
        progress_percentage: 100,
        completed_at: new Date().toISOString()
      };
      
      // Store in localStorage
      const storageKey = `lesson_completion_${user.id}_${lessonId}`;
      localStorage.setItem(storageKey, JSON.stringify(completionData));
      
      setCompleted(true);
      setProgress(100);
      
      toast({
        title: 'Lesson completed!',
        description: 'Your progress has been saved',
      });
      
      if (onCompleted) {
        onCompleted();
      }
    } catch (error) {
      console.error('Error updating completion status:', error);
      toast({
        title: 'Error saving progress',
        description: 'Please try again later',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const updateProgress = async (newProgress: number) => {
    if (!user) return;
    
    try {
      const storageKey = `lesson_completion_${user.id}_${lessonId}`;
      const existingDataStr = localStorage.getItem(storageKey);
      
      const completionData: LessonCompletionData = existingDataStr 
        ? JSON.parse(existingDataStr)
        : {
            lessonId,
            courseId,
            completed: newProgress === 100,
            progress_percentage: newProgress,
            completed_at: newProgress === 100 ? new Date().toISOString() : undefined
          };
      
      // Update the progress
      completionData.progress_percentage = newProgress;
      if (newProgress === 100) {
        completionData.completed = true;
        completionData.completed_at = new Date().toISOString();
      }
      
      // Store back in localStorage
      localStorage.setItem(storageKey, JSON.stringify(completionData));
      
      setProgress(newProgress);
      if (newProgress === 100) {
        setCompleted(true);
      }
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };
  
  // Track scroll progress
  useEffect(() => {
    if (!user) return;
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight) * 100;
      
      // Update progress in state every 5% change
      const progressRounded = Math.min(Math.round(scrollPercent / 5) * 5, 100);
      
      if (progressRounded > progress && !completed) {
        setProgress(progressRounded);
        
        // Don't update storage on every scroll - only when progress increases by 10%
        if (progressRounded % 10 === 0 || progressRounded === 100) {
          updateProgress(progressRounded);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [user, progress, completed]);
  
  return (
    <div className="mb-8">
      <div className="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-sm">Lesson {lessonIndex + 1} of {totalLessons}</h3>
          {completed ? (
            <span className="text-sm text-green-600 dark:text-green-400 flex items-center">
              <Check className="h-4 w-4 mr-1" />
              Completed
            </span>
          ) : (
            <span className="text-sm text-gray-500">{progress}% complete</span>
          )}
        </div>
        
        <Progress value={progress} className="mb-4" />
        
        {!completed && (
          <Button
            onClick={handleMarkAsCompleted}
            disabled={loading}
            className="w-full"
            variant="outline"
          >
            {loading ? 'Saving...' : 'Mark as Completed'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default LessonCompletion;
