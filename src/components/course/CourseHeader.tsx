
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Course } from '@/types';
import { User, Clock, Book, GraduationCap } from 'lucide-react';

interface CourseHeaderProps {
  course: Course;
  departmentName: string;
  facultyName: string;
  isEnrolled: boolean;
  setIsEnrolled: (isEnrolled: boolean) => void;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({
  course,
  departmentName,
  facultyName,
  isEnrolled,
  setIsEnrolled,
}) => {
  return (
    <div className="bg-accent text-white py-16">
      <div className="container mx-auto px-4">
        <div className="mb-2">
          <Link to="/faculties" className="text-white/80 hover:text-white">Faculties</Link>
          {' › '}
          <span className="text-white/80">{facultyName}</span>
          {' › '}
          <span className="text-white/80">{departmentName}</span>
        </div>
        <h1 className="text-4xl font-serif font-bold mb-4">{course.name}</h1>
        <div className="flex flex-wrap items-center gap-6 mb-6">
          <div className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            <span>Instructor: {course.instructor}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            <span>Duration: {course.duration}</span>
          </div>
          <div className="flex items-center">
            <Book className="h-5 w-5 mr-2" />
            <span>{course.lessons.length} Lessons</span>
          </div>
          <div className="flex items-center">
            <GraduationCap className="h-5 w-5 mr-2" />
            <span>Level: {course.difficulty}</span>
          </div>
        </div>
        <Button 
          size="lg" 
          onClick={() => setIsEnrolled(!isEnrolled)}
          variant={isEnrolled ? "outline" : "default"}
          className={isEnrolled ? "bg-white text-accent hover:bg-white/90" : ""}
        >
          {isEnrolled ? "Already Enrolled" : "Enroll Now"}
        </Button>
      </div>
    </div>
  );
};

export default CourseHeader;
