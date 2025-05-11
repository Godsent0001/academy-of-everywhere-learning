
export interface Faculty {
  id: string;
  name: string;
  description: string;
  icon: string;
  slug: string;
  departments: Department[];
}

export interface Department {
  id: string;
  facultyId: string;
  name: string;
  description: string;
  slug: string;
  courses: Course[];
}

export interface Course {
  id: string;
  departmentId: string;
  name: string;
  instructor: string;
  description: string;
  image: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  slug: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  content: string;
  duration: string;
  order: number;
  slug: string;
  questions: Question[];
}

export interface Question {
  id: string;
  lessonId: string;
  question: string;
  answer: string;
  options?: string[];
  type: 'multiple-choice' | 'open-ended' | 'true-false';
}

export interface Exam {
  id: string;
  courseId: string;
  title: string;
  description: string;
  duration: string;
  passingScore: number;
  questions: Question[];
}

export interface Certificate {
  id: string;
  courseId: string;
  recipientName: string;
  issueDate: string;
  expirationDate?: string;
  score: number;
  status: 'issued' | 'expired' | 'revoked';
}

export interface User {
  id: string;
  name: string;
  email: string;
  enrolledCourses: string[];
  completedLessons: string[];
  certificates: Certificate[];
}
