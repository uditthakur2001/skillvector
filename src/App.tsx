import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index.tsx";
import Courses from "./pages/Courses.tsx";
import CourseDetail from "./pages/CourseDetail.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Mentors from "./pages/Mentors.tsx";
import Auth from "./pages/Auth.tsx";
import Pricing from "./pages/Pricing.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import FAQ from "./pages/FAQ.tsx";
import Blog from "./pages/Blog.tsx";
import Privacy from "./pages/Privacy.tsx";
import Terms from "./pages/Terms.tsx";
import Careers from "./pages/Careers.tsx";
import { SimplePage } from "@/components/SimplePage";
import NotFound from "./pages/NotFound.tsx";

import { useEffect } from "react";
import { initThemeListener } from "./theme";

const queryClient = new QueryClient();

const Stub = ({ title, eyebrow }: { title: string; eyebrow: string }) => (
  <SimplePage eyebrow={eyebrow} title={title} lead="This page is coming soon. Check back shortly!" />
);

const App = () => {
  useEffect(() => {
    initThemeListener();
  }, []);
  return(
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/scholarships" element={<Stub eyebrow="Scholarships" title="Scholarships" />} />
            <Route path="/press" element={<Stub eyebrow="Press" title="Press & Media" />} />
            <Route path="/help" element={<Stub eyebrow="Support" title="Help Center" />} />
            <Route path="/community" element={<Stub eyebrow="Community" title="Join the Community" />} />
            <Route path="/refunds" element={<Stub eyebrow="Legal" title="Refund Policy" />} />
            <Route path="/cookies" element={<Stub eyebrow="Legal" title="Cookie Policy" />} />

            <Route path="/dashboard" element={
              <ProtectedRoute><Dashboard /></ProtectedRoute>
            } />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
};
export default App;
