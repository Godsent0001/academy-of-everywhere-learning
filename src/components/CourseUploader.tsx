
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileUploader } from '@/components/FileUploader';
import { useToast } from '@/hooks/use-toast';
import { faculties } from '@/data/faculties';
import { Check } from 'lucide-react';

interface CourseUploaderProps {
  onSuccess?: () => void;
}

export const CourseUploader: React.FC<CourseUploaderProps> = ({ onSuccess }) => {
  const { toast } = useToast();
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [instructor, setInstructor] = useState('');
  const [duration, setDuration] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Find available departments based on selected faculty
  const availableDepartments = selectedFaculty
    ? faculties.find(f => f.slug === selectedFaculty)?.departments || []
    : [];

  const handleFilesSelected = (files: File[]) => {
    if (files.length > 0) {
      setCoverImage(files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call and validation
    try {
      // Here you would normally connect to Supabase or another backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      toast({
        title: "Course submitted successfully!",
        description: "Your course will be reviewed by our team before being published.",
      });
      
      // Reset form
      setSelectedFaculty('');
      setSelectedDepartment('');
      setCourseName('');
      setCourseDescription('');
      setInstructor('');
      setDuration('');
      setCoverImage(null);
      setIsSuccess(true);
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }
      
      // Reset success state after a delay
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      toast({
        title: "Error submitting course",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-serif">Submit a New Course</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="faculty" className="block text-sm font-medium">Faculty</label>
                <Select 
                  value={selectedFaculty} 
                  onValueChange={setSelectedFaculty}
                  required
                >
                  <SelectTrigger id="faculty">
                    <SelectValue placeholder="Select Faculty" />
                  </SelectTrigger>
                  <SelectContent>
                    {faculties.map(faculty => (
                      <SelectItem key={faculty.slug} value={faculty.slug}>
                        {faculty.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="department" className="block text-sm font-medium">Department</label>
                <Select 
                  value={selectedDepartment} 
                  onValueChange={setSelectedDepartment}
                  disabled={!selectedFaculty || availableDepartments.length === 0}
                  required
                >
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableDepartments.map(department => (
                      <SelectItem key={department.slug} value={department.slug}>
                        {department.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="courseName" className="block text-sm font-medium">Course Name</label>
              <Input
                id="courseName"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="Introduction to Data Science"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="courseDescription" className="block text-sm font-medium">Course Description</label>
              <Textarea
                id="courseDescription"
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                placeholder="Provide a detailed description of what students will learn..."
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="instructor" className="block text-sm font-medium">Instructor Name</label>
                <Input
                  id="instructor"
                  value={instructor}
                  onChange={(e) => setInstructor(e.target.value)}
                  placeholder="Dr. Jane Smith"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="duration" className="block text-sm font-medium">Course Duration</label>
                <Input
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="8 weeks"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Course Cover Image</label>
              <FileUploader 
                onFilesSelected={handleFilesSelected}
                accept={{
                  'image/*': ['.png', '.jpg', '.jpeg', '.webp']
                }}
                maxSize={5 * 1024 * 1024} // 5MB
              />
              {coverImage && (
                <div className="text-sm text-gray-500 mt-1">
                  Selected file: {coverImage.name} ({(coverImage.size / (1024 * 1024)).toFixed(2)} MB)
                </div>
              )}
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : isSuccess ? 'Submitted Successfully!' : 'Submit Course'}
            {isSuccess && <Check className="ml-2 h-4 w-4" />}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CourseUploader;
