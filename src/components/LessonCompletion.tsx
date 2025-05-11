
import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { toast } from '@/hooks/use-toast';

interface LessonCompletionProps {
  lessonId: string;
  courseId: string;
  lessonIndex: number;
  totalLessons: number;
  onCompleted?: () => void;
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
      const { data, error } = await supabase
        .from('lesson_completions')
        .select('*')
        .eq('user_id', user?.id)
        .eq('lesson_id', lessonId)
        .single();
      
      if (error) {
        console.error('Error fetching completion status:', error);
        return;
      }
      
      if (data) {
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
      // Update completion status
      const { data, error } = await supabase
        .from('lesson_completions')
        .upsert({
          user_id: user.id,
          lesson_id: lessonId,
          course_id: courseId,
          completed: true,
          progress_percentage: 100,
          completed_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select();
      
      if (error) {
        throw error;
      }
      
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
      await supabase
        .from('lesson_completions')
        .upsert({
          user_id: user.id,
          lesson_id: lessonId,
          course_id: courseId,
          completed: newProgress === 100,
          progress_percentage: newProgress,
          completed_at: newProgress === 100 ? new Date().toISOString() : null,
          updated_at: new Date().toISOString()
        });
      
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
        
        // Don't update database on every scroll - only when progress increases by 10%
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
