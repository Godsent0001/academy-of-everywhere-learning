
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import StudentHelpPage from "./pages/student/StudentHelpPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
