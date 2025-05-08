
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Book, GraduationCap, Users, Settings } from 'lucide-react';
import { Faculty } from '@/types';

interface FacultyCardProps {
  faculty: Faculty;
}

export const FacultyCard: React.FC<FacultyCardProps> = ({ faculty }) => {
  const getIcon = () => {
    switch (faculty.icon) {
      case 'book':
        return <Book className="h-8 w-8 text-primary" />;
      case 'graduation-cap':
        return <GraduationCap className="h-8 w-8 text-primary" />;
      case 'users':
        return <Users className="h-8 w-8 text-primary" />;
      case 'settings':
        return <Settings className="h-8 w-8 text-primary" />;
      default:
        return <Book className="h-8 w-8 text-primary" />;
    }
  };

  return (
    <Link to={`/faculty/${faculty.slug}`}>
      <Card className="h-full card-hover">
        <CardHeader>
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            {getIcon()}
          </div>
          <CardTitle className="text-xl font-serif">{faculty.name}</CardTitle>
          <CardDescription className="line-clamp-2">{faculty.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {faculty.departments.length} Departments • {faculty.departments.reduce((acc, dept) => acc + dept.courses.length, 0)} Courses
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default FacultyCard;
