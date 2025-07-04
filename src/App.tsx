import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FacultiesPage from "./pages/FacultiesPage";
import FacultyDetailsPage from "./pages/FacultyDetailsPage";
import DepartmentPage from "./pages/DepartmentPage";
import CoursePage from "./pages/CoursePage";
import CoursesPage from "./pages/CoursesPage";
import LessonPage from "./pages/LessonPage";
import ExamPage from "./pages/ExamPage";
import CertificatePage from "./pages/CertificatePage";
import AboutPage from "./pages/AboutPage";
import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";
import StudyHelpPage from "./pages/student/StudyHelpPage";
import StudentHelpPage from "./pages/student/StudentHelpPage";
import CourseCreatorPage from "./pages/course/CourseCreatorPage";
import ProfilePage from "./pages/ProfilePage";
import HelpPage from "./pages/HelpPage";
import ContactPage from "./pages/ContactPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";

// Create the query client
const queryClient = new QueryClient();

// AppRoutes component to contain all routes
const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/faculties" element={<FacultiesPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/faculty/:slug" element={<FacultyDetailsPage />} />
        <Route path="/department/:slug" element={<DepartmentPage />} />
        <Route path="/course/:slug" element={<CoursePage />} />
        <Route path="/lesson/:slug" element={<LessonPage />} />
        <Route path="/exam/:slug" element={<ExamPage />} />
        <Route path="/certificate/:slug" element={<CertificatePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/student/help" element={<StudentHelpPage />} />
        <Route path="/student/study-help" element={<StudyHelpPage />} />
        <Route path="/student/materials" element={<StudyHelpPage />} />
        <Route path="/course-creator" element={<CourseCreatorPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/payment" element={<PaymentSuccessPage />} />
        <Route path="/payment-success" element={<PaymentSuccessPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <ThemeProvider defaultTheme="system" storageKey="academy-ui-theme">
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <AppRoutes />
            </TooltipProvider>
          </QueryClientProvider>
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default App;