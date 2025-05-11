
export interface Faculty {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  departments: Department[];
}

export interface Department {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  facultyId: string;  // Added facultyId field
  courses: Course[];
}

export interface Course {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  departmentId: string;  // Added departmentId field
  lessons: Lesson[];
  duration: string;
  modules?: string[];
  difficulty: string;
  rating?: number;
  reviews?: number;
  instructor?: string;
  category?: string;
}

export interface Lesson {
  id: string;
  title: string;
  slug: string;
  order: number;
  duration: string;
  content: string;
  description: string;
  courseId: string;  // Added courseId field
  questions?: Question[];
}

export interface Question {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'open-ended';
  options?: string[];
  answer?: string;
  lessonId?: string;  // Added lessonId field
}

// Define exam types
export interface Exam {
  id: string;
  title: string;
  slug: string;
  description: string;
  questions: ExamQuestion[];
}

export interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  exam_id?: string;
  created_at?: string;
  updated_at?: string;
}

// Define token transaction type
export interface TokenTransaction {
  id: string;
  user_id: string;
  amount: number;
  transaction_type: 'purchase' | 'usage';
  description: string;
  created_at: string;
}

// Define payment type
export interface Payment {
  id: string;
  user_id: string;
  amount: number;
  currency: string;
  status: string;
  stripe_session_id?: string;
  stripe_payment_intent?: string;
  tokens_purchased?: number;
  created_at: string;
  updated_at: string;
}

// Define study group types
export interface StudyGroup {
  id: string;
  name: string;
  description?: string;
  owner_id?: string;
  created_at: string;
  updated_at: string;
  member_count?: number;
}

export interface StudyGroupMember {
  id: string;
  study_group_id: string;
  user_id: string;
  joined_at: string;
  user_name?: string;
  user_avatar?: string;
}

// Define study materials types
export interface StudyNote {
  id: string;
  title: string;
  content?: string;
  user_id: string;
  course_id?: string;
  created_at: string;
  updated_at: string;
}

export interface ReadingMaterial {
  id: string;
  title: string;
  description?: string;
  file_path?: string;
  content_type?: string;
  user_id: string;
  course_id?: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface PracticeExam {
  id: string;
  title: string;
  description?: string;
  course_id?: string;
  user_id: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  questions?: ExamQuestion[];
}

// Define user token types
export interface UserTokens {
  id: string;
  user_id: string;
  tokens_available: number;
  tokens_used: number;
  last_updated: string;
}

// Define material processing response
export interface ProcessedMaterial {
  summary: string;
  questions: {
    question: string;
    options: string[];
    answer: string;
    explanation: string;
  }[];
  tokensUsed: number;
  tokensRemaining: number;
}

// Define user profile type
export interface UserProfile {
  id: string;
  user_id: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  education_level?: string;
  fields_of_interest?: string[];
  created_at: string;
  updated_at: string;
}

// Define lesson completion type
export interface LessonCompletion {
  id: string;
  user_id: string;
  lesson_id: string;
  course_id: string;
  completed: boolean;
  progress_percentage: number;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}
