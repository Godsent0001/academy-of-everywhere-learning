
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Course } from '@/types';

interface LessonsTabProps {
  course: Course;
}

const LessonsTab: React.FC<LessonsTabProps> = ({ course }) => {
  return (
    <>
      <h2 className="text-2xl font-serif font-medium mb-6">Course Lessons</h2>
      <Accordion type="single" collapsible className="w-full">
        {course.lessons.length > 0 ? (
          course.lessons.map((lesson, index) => (
            <AccordionItem key={lesson.id} value={lesson.id}>
              <AccordionTrigger>
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-3">
                    {index + 1}
                  </span>
                  <div className="text-left">
                    <h3 className="font-medium">{lesson.title}</h3>
                    <p className="text-sm text-muted-foreground">{lesson.duration}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-11">
                  <p className="text-gray-700 mb-4">{lesson.description}</p>
                  <Link to={`/lesson/${lesson.slug}`}>
                    <Button variant="outline" size="sm">View Lesson</Button>
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))
        ) : (
          <div className="text-center py-8 bg-muted/30 rounded-md">
            <p>Lessons for this course are being prepared. Check back soon!</p>
          </div>
        )}
      </Accordion>
    </>
  );
};

export default LessonsTab;
