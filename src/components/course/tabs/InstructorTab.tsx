
import React from 'react';
import { User } from 'lucide-react';

interface InstructorTabProps {
  instructor: string;
  departmentName: string;
}

const InstructorTab: React.FC<InstructorTabProps> = ({ instructor, departmentName }) => {
  return (
    <>
      <h2 className="text-2xl font-serif font-medium mb-6">About the Instructor</h2>
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
          <User className="h-12 w-12 text-gray-400" />
        </div>
        <div>
          <h3 className="text-xl font-medium mb-2">{instructor}</h3>
          <p className="text-gray-600 mb-4">Expert in {departmentName}</p>
          <p className="text-gray-700 mb-4">
            An experienced educator with expertise in {departmentName} and a passion for teaching.
            With years of experience in both academia and industry, they bring practical insights
            and theoretical knowledge to their courses.
          </p>
          <div className="flex space-x-4">
            <div>
              <p className="font-medium">10+</p>
              <p className="text-sm text-gray-500">Courses</p>
            </div>
            <div>
              <p className="font-medium">5,000+</p>
              <p className="text-sm text-gray-500">Students</p>
            </div>
            <div>
              <p className="font-medium">4.9</p>
              <p className="text-sm text-gray-500">Rating</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstructorTab;
