
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Course } from '@/types';
import OverviewTab from './tabs/OverviewTab';
import LessonsTab from './tabs/LessonsTab';
import InstructorTab from './tabs/InstructorTab';
import CertificateTab from './tabs/CertificateTab';

interface CourseTabsProps {
  course: Course;
  departmentName: string;
}

const CourseTabs: React.FC<CourseTabsProps> = ({ course, departmentName }) => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="mb-8">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="lessons">Lessons</TabsTrigger>
        <TabsTrigger value="instructor">Instructor</TabsTrigger>
        <TabsTrigger value="certificate">Certificate</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview">
        <OverviewTab course={course} />
      </TabsContent>
      
      <TabsContent value="lessons">
        <LessonsTab course={course} />
      </TabsContent>
      
      <TabsContent value="instructor">
        <InstructorTab instructor={course.instructor} departmentName={departmentName} />
      </TabsContent>
      
      <TabsContent value="certificate">
        <CertificateTab />
      </TabsContent>
    </Tabs>
  );
};

export default CourseTabs;
