
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

  // Use a placeholder image if the course image is just '/placeholder.svg'
  const courseImage = course.image === '/placeholder.svg' 
    ? getCourseImage(course.name)
    : course.image;

  return (
    <Link to={`/course/${course.slug}`}>
      <Card className="overflow-hidden h-full card-hover">
        <div className="aspect-video overflow-hidden">
          <img 
            src={courseImage} 
            alt={course.name} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
            onError={(e) => {
              // Fallback to placeholder image if the image fails to load
              const target = e.target as HTMLImageElement;
              target.src = getCourseImage(course.name);
            }}
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

// Function to get a course image based on the course name or content
const getCourseImage = (courseName: string): string => {
  const courseNameLower = courseName.toLowerCase();
  
  if (courseNameLower.includes('programming') || courseNameLower.includes('software') || courseNameLower.includes('web')) {
    return 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80';
  } else if (courseNameLower.includes('data') || courseNameLower.includes('analysis') || courseNameLower.includes('statistics')) {
    return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';
  } else if (courseNameLower.includes('ai') || courseNameLower.includes('machine learning') || courseNameLower.includes('artificial intelligence')) {
    return 'https://images.unsplash.com/photo-1677442136019-21780ecad06f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80';
  } else if (courseNameLower.includes('design') || courseNameLower.includes('art') || courseNameLower.includes('creative')) {
    return 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80';
  } else if (courseNameLower.includes('business') || courseNameLower.includes('management') || courseNameLower.includes('finance')) {
    return 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1111&q=80';
  } else if (courseNameLower.includes('science') || courseNameLower.includes('physics') || courseNameLower.includes('chemistry') || courseNameLower.includes('biology')) {
    return 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';
  } else if (courseNameLower.includes('health') || courseNameLower.includes('medical') || courseNameLower.includes('medicine')) {
    return 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';
  } else if (courseNameLower.includes('language') || courseNameLower.includes('literature') || courseNameLower.includes('writing')) {
    return 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';
  } else {
    // Default image if no matches
    return 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';
  }
};

export default CourseCard;
