
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Book, GraduationCap, Users, Settings, Code, Briefcase, HeartPulse, Scale, Pencil, BookOpen, FileText, Landmark, School, Globe, BookText } from 'lucide-react';
import { Faculty } from '@/types';

interface FacultyCardProps {
  faculty: Faculty;
}

export const FacultyCard: React.FC<FacultyCardProps> = ({ faculty }) => {
  const getIcon = () => {
    switch (faculty.name.toLowerCase()) {
      case 'arts & humanities':
      case 'arts and humanities':
        return <BookOpen className="h-8 w-8 text-primary" />;
      case 'sciences':
      case 'science':
      case 'faculty of science':
        return <GraduationCap className="h-8 w-8 text-primary" />;
      case 'social sciences':
        return <Users className="h-8 w-8 text-primary" />;
      case 'technology & engineering':
      case 'engineering and technology':
      case 'faculty of engineering and technology':
        return <Settings className="h-8 w-8 text-primary" />;
      case 'computer & data science':
      case 'computer and data science':
      case 'faculty of computer and data science':
        return <Code className="h-8 w-8 text-primary" />;
      case 'business & management':
      case 'business and management':
      case 'faculty of business & management':
        return <Briefcase className="h-8 w-8 text-primary" />;
      case 'health & medical sciences':
      case 'faculty of health & medical sciences':
        return <HeartPulse className="h-8 w-8 text-primary" />;
      case 'law & legal studies':
      case 'faculty of law & legal studies':
        return <Scale className="h-8 w-8 text-primary" />;
      case 'design & creative art':
      case 'faculty of design and creative art':
        return <Pencil className="h-8 w-8 text-primary" />;
      case 'education':
      case 'faculty of education':
        return <BookText className="h-8 w-8 text-primary" />;
      case 'architecture and urban planning':
      case 'faculty of architecture and urban planning':
        return <Landmark className="h-8 w-8 text-primary" />;
      case 'agriculture and natural resources':
      case 'faculty of agriculture and natural resources':
        return <Landmark className="h-8 w-8 text-primary" />;
      case 'media & communication':
      case 'faculty of media & communication':
        return <Globe className="h-8 w-8 text-primary" />;
      case 'language and communication':
      case 'faculty of language and communication':
        return <Globe className="h-8 w-8 text-primary" />;
      case 'theology and religious studies':
      case 'faculty of theology and religious studies':
        return <BookOpen className="h-8 w-8 text-primary" />;
      default:
        return <School className="h-8 w-8 text-primary" />;
    }
  };

  // Get a background image for the faculty card
  const getFacultyImage = () => {
    switch (faculty.name.toLowerCase()) {
      case 'arts & humanities':
      case 'arts and humanities':
        return 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80';
      case 'sciences':
      case 'science':
      case 'faculty of science':
        return 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';
      case 'social sciences':
        return 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';
      case 'technology & engineering':
      case 'engineering and technology':
      case 'faculty of engineering and technology':
        return 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';
      case 'computer & data science':
      case 'computer and data science':
      case 'faculty of computer and data science':
        return 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';
      case 'business & management':
      case 'business and management':
      case 'faculty of business & management':
        return 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80';
      default:
        return 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';
    }
  };

  return (
    <Link to={`/faculty/${faculty.slug}`}>
      <Card className="h-full card-hover relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src={getFacultyImage()} 
            alt={faculty.name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback if the image fails to load
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';
            }}
          />
        </div>
        <CardHeader className="relative z-10">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            {getIcon()}
          </div>
          <CardTitle className="text-xl font-serif">{faculty.name}</CardTitle>
          <CardDescription className="line-clamp-2">{faculty.description}</CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <p className="text-sm text-muted-foreground">
            {faculty.departments.length} Departments • {faculty.departments.reduce((acc, dept) => acc + dept.courses.length, 0)} Courses
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default FacultyCard;
