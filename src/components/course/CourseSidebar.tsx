
import React from 'react';
import { Button } from '@/components/ui/button';
import { Course } from '@/types';
import { Clock, Book, GraduationCap, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CourseSidebarProps {
  course: Course;
  isEnrolled: boolean;
  setIsEnrolled: (isEnrolled: boolean) => void;
}

const CourseSidebar: React.FC<CourseSidebarProps> = ({ course, isEnrolled, setIsEnrolled }) => {
  // Get the first lesson for redirect when "Continue Learning" is clicked
  const firstLesson = course.lessons && course.lessons.length > 0 ? course.lessons[0] : null;

  return (
    <div className="border rounded-lg overflow-hidden sticky top-24">
      <div className="aspect-video overflow-hidden relative">
        <img 
          src={course.image} 
          alt={course.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <Button variant="outline" className="text-white border-white hover:bg-white/20">
            Watch Preview
          </Button>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-medium mb-4">Course Details</h3>
        <ul className="space-y-4">
          <li className="flex items-start">
            <Clock className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
            <div>
              <p className="font-medium">Duration</p>
              <p className="text-sm text-gray-600">{course.duration}</p>
            </div>
          </li>
          <li className="flex items-start">
            <Book className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
            <div>
              <p className="font-medium">Lessons</p>
              <p className="text-sm text-gray-600">{course.lessons.length} comprehensive lessons</p>
            </div>
          </li>
          <li className="flex items-start">
            <GraduationCap className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
            <div>
              <p className="font-medium">Level</p>
              <p className="text-sm text-gray-600">{course.difficulty}</p>
            </div>
          </li>
          <li className="flex items-start">
            <Award className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
            <div>
              <p className="font-medium">Certificate</p>
              <p className="text-sm text-gray-600">Included upon completion</p>
            </div>
          </li>
        </ul>
        {isEnrolled && firstLesson ? (
          <Link to={`/lesson/${firstLesson.slug}`}>
            <Button className="w-full mt-6">
              Continue Learning
            </Button>
          </Link>
        ) : (
          <Button className="w-full mt-6" onClick={() => setIsEnrolled(true)}>
            Enroll Now
          </Button>
        )}
      </div>
    </div>
  );
};

export default CourseSidebar;
