
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ContentGenerator from "./pages/ContentGenerator";
import QuizGenerator from "./pages/QuizGenerator";
import LearningMaterials from "./pages/LearningMaterials";
import NotesGenerator from "./pages/NotesGenerator";
import FlashcardGenerator from "./pages/FlashcardGenerator";
import LearningAssistant from "./pages/LearningAssistant";
import DocumentationGenerator from "./pages/DocumentationGenerator";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import { Layout } from "./components/Layout";
import { useState } from "react";
import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  // Create QueryClient inside the component
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/content-generator" element={<ContentGenerator />} />
              <Route path="/quiz-generator" element={<QuizGenerator />} />
              <Route path="/learning-materials" element={<LearningMaterials />} />
              <Route path="/notes-generator" element={<NotesGenerator />} />
              <Route path="/flashcard-generator" element={<FlashcardGenerator />} />
              <Route path="/learning-assistant" element={<LearningAssistant />} />
              <Route path="/documentation" element={<DocumentationGenerator />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
