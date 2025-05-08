
import React from 'react';
import { Course } from '@/types';

interface OverviewTabProps {
  course: Course;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ course }) => {
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-serif font-medium mb-4">About This Course</h2>
      <p className="text-gray-700 mb-4">{course.description}</p>
      
      <h3 className="text-xl font-medium mt-8 mb-4">What You'll Learn</h3>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Understand the core principles and concepts of {course.name}</li>
        <li>Apply theoretical knowledge to practical scenarios</li>
        <li>Analyze and evaluate complex problems in the field</li>
        <li>Develop critical thinking and problem-solving skills</li>
        <li>Complete a final project demonstrating your mastery of the subject</li>
      </ul>
      
      <h3 className="text-xl font-medium mt-8 mb-4">Course Structure</h3>
      <p className="mb-4">
        This course is structured into {course.lessons.length} comprehensive lessons, each focusing on a key aspect of the subject matter. 
        Each lesson includes video lectures, reading materials, interactive quizzes, and a Q&A section where you can discuss the material with 
        other students and the instructor.
      </p>
      <p className="mb-4">
        At the end of the course, you'll take a final exam to test your understanding and receive a certificate upon successful completion.
      </p>
    </div>
  );
};

export default OverviewTab;
