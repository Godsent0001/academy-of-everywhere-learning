
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { Course } from '@/types';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'Advanced':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Link to={`/course/${course.slug}`}>
      <Card className="overflow-hidden h-full card-hover">
        <div className="aspect-video overflow-hidden">
          <img 
            src={course.image} 
            alt={course.name} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
          />
        </div>
        <CardHeader>
          <div className="flex justify-between items-center mb-2">
            <Badge className={getDifficultyColor(course.difficulty)}>{course.difficulty}</Badge>
            <div className="flex items-center text-gray-500 text-sm">
              <Clock className="h-3 w-3 mr-1" /> 
              {course.duration}
            </div>
          </div>
          <h3 className="font-serif font-medium text-lg">{course.name}</h3>
          <p className="text-sm text-muted-foreground">By {course.instructor}</p>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <div className="flex items-center justify-between w-full">
            <span className="text-sm text-gray-500">{course.lessons.length} lessons</span>
            <span className="text-sm font-medium text-primary">View Course</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CourseCard;
