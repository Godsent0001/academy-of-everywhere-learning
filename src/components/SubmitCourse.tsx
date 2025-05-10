
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription, SheetHeader } from '@/components/ui/sheet';
import { Upload } from 'lucide-react';
import CourseUploader from './CourseUploader';
import { useIsMobile } from '@/hooks/use-mobile';

interface SubmitCourseProps {
  departmentName?: string;
}

const SubmitCourse: React.FC<SubmitCourseProps> = ({ departmentName }) => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const handleSuccess = () => {
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="gap-2" size={isMobile ? "lg" : "default"}>
          <Upload className="h-4 w-4" />
          Submit Course
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-xl md:max-w-2xl overflow-y-auto" side="right">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl font-serif">Submit a New Course</SheetTitle>
          <SheetDescription>
            {departmentName
              ? `Share your knowledge by submitting a course to the ${departmentName} department.`
              : 'Share your knowledge by submitting a course to any department.'}
          </SheetDescription>
        </SheetHeader>
        <CourseUploader onSuccess={handleSuccess} />
      </SheetContent>
    </Sheet>
  );
};

export default SubmitCourse;
