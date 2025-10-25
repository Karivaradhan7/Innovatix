import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { generatePDF } from "@/utils/pdfUtils";
import { useToast } from "@/hooks/use-toast";

export const DocumentationGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateDocumentation = async () => {
    setIsGenerating(true);
    
    try {
      const documentContent = `
# APTORA CODEBASE TECHNICAL DOCUMENTATION
## Complete Technical Manual & Developer Guide

### TABLE OF CONTENTS

1. PROJECT OVERVIEW
2. ARCHITECTURE & TECHNOLOGY STACK
3. PROJECT STRUCTURE & FILE ORGANIZATION
4. CORE COMPONENTS DEEP DIVE
5. AI INTEGRATION & LANGCHAIN IMPLEMENTATION
6. AUTHENTICATION SYSTEM
7. UI COMPONENTS & DESIGN SYSTEM
8. ROUTING & NAVIGATION
9. STATE MANAGEMENT
10. PDF GENERATION SYSTEM
11. CONFIGURATION FILES
12. BEST PRACTICES & CODING STANDARDS
13. DEPLOYMENT & ENVIRONMENT SETUP
14. TROUBLESHOOTING GUIDE

---

## 1. PROJECT OVERVIEW

### What is Aptora?
Aptora is a sophisticated AI-powered e-learning platform built using modern web technologies. The platform leverages Google's Gemini AI to generate personalized educational content including study materials, quizzes, notes, flashcards, and provides an intelligent learning assistant.

### Core Mission
Transform traditional education by making learning adaptive to individual learning styles and needs through intelligent content generation and personalized educational experiences.

### Key Features
- **Content Generator**: Creates structured educational content from topics or prompts
- **Quiz Generator**: Builds custom quizzes with multiple question types
- **E-learning Materials**: Generates guided learning roadmaps and subject breakdowns
- **AI Notes Generator**: Summarizes complex content into clear, concise notes
- **Flashcard Generator**: Creates Q&A format flashcards for review
- **AI Learning Assistant**: Interactive assistant for study-related questions
- **PDF Export**: Export all generated content in downloadable PDFs

---

## 2. ARCHITECTURE & TECHNOLOGY STACK

### Frontend Architecture
The application follows a modern React-based architecture with the following layers:

**Presentation Layer:**
- React 18 with TypeScript for type safety
- Tailwind CSS for utility-first styling
- shadcn/ui component library for consistent UI elements

**Business Logic Layer:**
- Custom hooks for state management
- Context API for authentication
- React Query for data fetching and caching

**Integration Layer:**
- LangChain for AI model orchestration
- Google Gemini API for content generation
- Firebase for authentication services

### Technology Stack Breakdown

**Core Framework:**
- React 18.3.1 - Modern JavaScript library for building user interfaces
- TypeScript - Static typing for enhanced code quality and developer experience
- Vite - Fast frontend build tool and development server

**Styling & UI:**
- Tailwind CSS - Utility-first CSS framework for rapid UI development
- shadcn/ui - Pre-built component library based on Radix UI primitives
- Lucide React - Clean and modern icon library with 1000+ icons

**AI & Machine Learning:**
- Google Gemini API - Advanced language model for content generation
- LangChain - Framework for building applications with large language models
- Custom prompt templates for educational content optimization

**Authentication & Backend:**
- Firebase Authentication - Secure user authentication system
- Google Identity Platform - OAuth integration

**Document Generation:**
- jsPDF - Client-side PDF generation
- html2canvas - HTML to canvas conversion for PDF content

**State Management:**
- React Query (TanStack Query) - Server state management and caching
- React Context API - Global state management for authentication
- React Hook Form - Form state management with validation

**Development Tools:**
- SWC - Fast JavaScript/TypeScript compiler
- ESLint - Code linting for consistency
- Prettier - Code formatting

---

## 3. PROJECT STRUCTURE & FILE ORGANIZATION

### Root Directory Structure

\`\`\`
aptora/
├── public/                     # Static assets and files
├── src/                        # Source code directory
│   ├── assets/                 # Images, fonts, and static assets
│   ├── components/             # Reusable UI components
│   ├── contexts/               # React context providers
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utility functions and configurations
│   ├── pages/                  # Page components for routing
│   ├── utils/                  # Helper functions and utilities
│   ├── App.tsx                 # Root application component
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles and Tailwind imports
├── .env                       # Environment variables
├── package.json               # Project dependencies and scripts
└── Configuration files        # Vite, TypeScript, Tailwind configs
\`\`\`

### Source Code Organization

**Components Directory (/src/components/)**
This directory follows a hierarchical structure organizing components by functionality:

- \`/ui/\` - Base UI components from shadcn/ui library
- \`/auth/\` - Authentication-related components
- \`/header/\` - Navigation and header components
- \`/ai/\` - AI feature-specific components
- Individual component files for major features

**Pages Directory (/src/pages/)**
Contains all route-level components:
- Each page represents a different feature or section
- Protected routes require authentication
- Consistent layout and structure across all pages

**Utils Directory (/src/utils/)**
Helper functions and utilities:
- \`langchainUtils.ts\` - AI integration and prompt management
- \`pdfUtils.ts\` - PDF generation functionality

---

## 4. CORE COMPONENTS DEEP DIVE

### 4.1 Main Application Entry Point (main.tsx)

\`\`\`typescript
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
\`\`\`

**Purpose:** Application bootstrap and initialization
**Key Functions:**
- Creates React root using React 18's createRoot API
- Wraps application in BrowserRouter for client-side routing
- Imports global styles and renders the main App component

**Critical Details:**
- Uses non-null assertion (!) on getElementById because we know the root element exists
- BrowserRouter enables HTML5 history API for navigation
- Imports index.css which contains Tailwind directives and custom styles

### 4.2 App Component (App.tsx)

\`\`\`typescript
const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route element={<Layout />}>
              // Route definitions...
            </Route>
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};
\`\`\`

**Purpose:** Root component that sets up global providers and routing
**Provider Hierarchy Explanation:**
1. **QueryClientProvider** - Enables React Query for server state management
2. **AuthProvider** - Provides authentication context throughout the app
3. **TooltipProvider** - Enables tooltip functionality for UI components
4. **Toaster/Sonner** - Toast notification systems for user feedback

**Routing Structure:**
- All routes wrapped in Layout component for consistent header/footer
- Nested routing structure for organized navigation
- Route protection implemented at individual page level

### 4.3 Layout Component Structure

The Layout component (referenced but not shown in provided files) serves as the main wrapper providing:
- Consistent header navigation
- Authentication state management
- Responsive design structure
- Footer information

### 4.4 AIFeature Component (AIFeature.tsx)

This is the core reusable component powering all AI-driven features:

\`\`\`typescript
interface AIFeatureProps {
  title: string;
  description: string;
  placeholder: string;
  feature: "content" | "quiz" | "materials" | "notes" | "flashcards" | "assistant";
}

export function AIFeature({ title, description, placeholder, feature }: AIFeatureProps) {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // ... component logic
}
\`\`\`

**Component Architecture:**
- **Props-based Configuration** - Single component handles all AI features through props
- **State Management** - Local state for prompt input, AI results, and loading states
- **Error Handling** - Comprehensive error handling with user-friendly messages
- **PDF Integration** - Built-in PDF export functionality

**Key Functions:**

1. **generateContent()** - Main AI interaction function:
\`\`\`typescript
const generateContent = async () => {
  if (!prompt.trim()) {
    toast({ title: "Please enter a prompt", variant: "destructive" });
    return;
  }
  
  setIsLoading(true);
  setResult("");
  
  try {
    const generatedContent = await generateWithLangChain(feature, prompt);
    setResult(generatedContent);
    setPdfFilename(\`\${feature}_\${new Date().toISOString().slice(0, 10)}\`);
  } catch (error) {
    // Error handling...
  } finally {
    setIsLoading(false);
  }
};
\`\`\`

**Flow Explanation:**
- Validates user input before processing
- Sets loading state for user feedback
- Calls LangChain utility with feature type and prompt
- Handles success/error states appropriately
- Generates default PDF filename with current date

2. **copyToClipboard()** - Utility for content sharing
3. **downloadAsPdf()** - PDF generation with user-defined filenames

### 4.5 Component Composition Pattern

The AIFeature component uses a composition pattern with specialized child components:

- **PromptInput** - Handles user input and generation trigger
- **AIResultDisplay** - Displays generated content with actions
- **PDFExportDialog** - Modal for PDF export configuration

This pattern provides:
- **Separation of Concerns** - Each component has a single responsibility
- **Reusability** - Components can be used independently
- **Maintainability** - Changes to one component don't affect others

---

## 5. AI INTEGRATION & LANGCHAIN IMPLEMENTATION

### 5.1 LangChain Architecture (langchainUtils.ts)

The AI integration is the heart of Aptora's functionality, implemented through a sophisticated LangChain setup:

\`\`\`typescript
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
\`\`\`

**Core Components:**
- **PromptTemplate** - Structures prompts for consistent AI responses
- **ChatGoogleGenerativeAI** - Interface to Google's Gemini model
- **RunnableSequence** - Chains processing steps together
- **StringOutputParser** - Converts AI responses to usable strings

### 5.2 Google AI Model Configuration

\`\`\`typescript
const getGoogleAI = () => {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  
  console.log("API Key status:", API_KEY ? "Present" : "Missing");
  console.log("API Key length:", API_KEY?.length || 0);
  
  if (!API_KEY) {
    throw new Error("VITE_GEMINI_API_KEY is not defined in environment variables");
  }
  
  return new ChatGoogleGenerativeAI({
    apiKey: API_KEY,
    modelName: "gemini-2.0-flash-exp",
    maxOutputTokens: 1024, // Reduced for faster generation
    temperature: 0.5, // Reduced for more consistent, faster responses
    topK: 20, // Reduced for faster processing
    topP: 0.8, // Slightly reduced
  });
};
\`\`\`

**Configuration Breakdown:**

1. **API Key Management:**
   - Retrieves API key from environment variables
   - Provides debugging information about key status
   - Fails fast if key is missing

2. **Model Parameters:**
   - **modelName: "gemini-1.5-flash"** - Optimized for speed over complexity
   - **maxOutputTokens: 1024** - Limits response length for faster generation
   - **temperature: 0.5** - Balanced creativity vs consistency
   - **topK: 20** - Reduces vocabulary for faster processing
   - **topP: 0.8** - Controls response diversity

3. **Performance Optimizations:**
   - Flash model chosen for faster response times
   - Reduced token limits prevent overly long responses
   - Conservative temperature settings ensure consistent output

### 5.3 Prompt Template System

The system uses feature-specific prompt templates for optimal results:

\`\`\`typescript
const promptTemplates = {
  content: PromptTemplate.fromTemplate(\`
    Generate structured educational content based on the following prompt. 
    Include headings, explanations, examples, and key points.
    
    IMPORTANT FORMATTING GUIDELINES:
    - DO NOT use markdown syntax (no **, *, _, or backticks)
    - Use plain text with clear section headings
    - Use simple bullet points or numbered lists where needed
    - Add spacing between sections for readability
    
    PROMPT: {userPrompt}
  \`),
  // ... other templates
};
\`\`\`

**Template Design Principles:**

1. **Consistent Structure** - Each template follows similar formatting guidelines
2. **Feature-Specific Instructions** - Tailored prompts for different content types
3. **Formatting Control** - Explicit instructions to avoid markdown conflicts
4. **Variable Interpolation** - Uses {userPrompt} placeholder for dynamic content

**Template Categories:**
- **content** - General educational content creation
- **quiz** - Question and answer generation
- **materials** - Learning roadmaps and resource lists
- **notes** - Concise summaries and key points
- **flashcards** - Q&A format cards for memorization
- **assistant** - Conversational help and explanations

### 5.4 Chain Creation and Execution

\`\`\`typescript
export const createGenerationChain = (feature: keyof typeof promptTemplates) => {
  const model = getGoogleAI();
  
  const chain = RunnableSequence.from([
    promptTemplates[feature],
    model,
    new StringOutputParser(),
  ]);
  
  return chain;
};
\`\`\`

**Chain Flow:**
1. **Prompt Template** - Formats user input with feature-specific instructions
2. **AI Model** - Processes the formatted prompt through Gemini
3. **Output Parser** - Converts model response to clean string format

**Execution Function:**
\`\`\`typescript
export const generateWithLangChain = async (
  feature: keyof typeof promptTemplates, 
  userPrompt: string
): Promise<string> => {
  try {
    console.log("Starting generation with feature:", feature);
    console.log("User prompt length:", userPrompt.length);
    
    const startTime = Date.now();
    const chain = createGenerationChain(feature);
    const result = await chain.invoke({ userPrompt });
    const endTime = Date.now();
    
    console.log("Generation completed in:", endTime - startTime, "ms");
    console.log("Result length:", result.length);
    
    return result;
  } catch (error) {
    console.error("Error in LangChain generation:", error);
    console.error("Error details:", error instanceof Error ? error.message : error);
    throw error;
  }
};
\`\`\`

**Performance Monitoring:**
- Tracks generation time for performance optimization
- Logs input/output lengths for debugging
- Provides detailed error information for troubleshooting

---

## 6. AUTHENTICATION SYSTEM

### 6.1 Firebase Authentication Setup

The authentication system is built on Firebase Authentication with React Context for state management:

\`\`\`typescript
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  User
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/lib/firebase";
\`\`\`

**Firebase Configuration:**
\`\`\`typescript
const firebaseConfig = {
  apiKey: "AIzaSyBeBRq1z-diZGRuxSonsI4Jn-9UQ8v8IU0",
  authDomain: "aptora-4108d.firebaseapp.com",
  projectId: "aptora-4108d",
  storageBucket: "aptora-4108d.firebasestorage.app",
  messagingSenderId: "966897977550",
  appId: "1:966897977550:web:8f8910927011ab9225689f",
  measurementId: "G-SWFKT9VK3P"
};
\`\`\`

### 6.2 AuthContext Implementation

\`\`\`typescript
type AuthContextType = {
  currentUser: User | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<User>;
  login: (email: string, password: string) => Promise<User>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  redirectAfterLogin: () => void;
  setRedirectPath: (path: string) => void;
};
\`\`\`

**Context Design:**
- **Type Safety** - Full TypeScript support for all authentication operations
- **Promise-based** - Async operations return promises for proper error handling
- **Redirect Management** - Built-in redirect functionality after authentication
- **Loading States** - Tracks authentication state changes

### 6.3 Authentication Functions

**Signup Implementation:**
\`\`\`typescript
const signup = async (email: string, password: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    toast.success("Account created successfully!");
    return result.user;
  } catch (error: any) {
    let message = "Failed to create an account";
    if (error?.code === "auth/email-already-in-use") {
      message = "Email is already in use";
    } else if (error?.code === "auth/weak-password") {
      message = "Password should be at least 6 characters";
    } else if (error?.code === "auth/invalid-email") {
      message = "Invalid email address";
    }
    toast.error(message);
    throw error;
  }
};
\`\`\`

**Error Handling Strategy:**
- Maps Firebase error codes to user-friendly messages
- Provides specific guidance for common issues
- Maintains error context for debugging
- Uses toast notifications for immediate user feedback

**Login Implementation:**
\`\`\`typescript
const login = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    toast.success("Logged in successfully!");
    return result.user;
  } catch (error: any) {
    let message = "Failed to log in";
    if (error?.code === "auth/user-not-found" || error?.code === "auth/wrong-password") {
      message = "Invalid email or password";
    } else if (error?.code === "auth/too-many-requests") {
      message = "Too many unsuccessful login attempts, please try again later";
    }
    toast.error(message);
    throw error;
  }
};
\`\`\`

### 6.4 Route Protection System

Protected routes are implemented using a higher-order component pattern:

\`\`\`typescript
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (!loading && !currentUser) {
      setShowLoginModal(true);
    }
  }, [currentUser, loading]);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <>
      {children}
      <LoginModal 
        open={showLoginModal} 
        onOpenChange={setShowLoginModal}
      />
    </>
  );
};
\`\`\`

**Protection Strategy:**
- Checks authentication state before rendering protected content
- Shows loading state during authentication verification
- Displays login modal for unauthenticated users
- Preserves intended destination for post-login redirect

### 6.5 User Interface Components

**UserMenu Component:**
\`\`\`typescript
export const UserMenu: React.FC<UserMenuProps> = ({ size = "default" }) => {
  const { currentUser, signOut } = useAuth();

  const getUserInitials = () => {
    if (!currentUser || !currentUser.email) return "U";
    return currentUser.email.charAt(0).toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={size === "sm" ? "p-1" : "p-2"}>
          <Avatar className={size === "sm" ? "h-7 w-7" : "h-8 w-8"}>
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-3 py-2 text-sm font-medium text-foreground/80">
          {currentUser?.email}
        </div>
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
\`\`\`

**Features:**
- Displays user avatar with email initial
- Responsive sizing options
- Dropdown menu with user info and logout option
- Accessible design with proper ARIA attributes

---

## 7. UI COMPONENTS & DESIGN SYSTEM

### 7.1 Design System Architecture

Aptora uses a comprehensive design system built on shadcn/ui components with Tailwind CSS:

**Component Hierarchy:**
1. **Base Components** (\`/ui/\`) - Fundamental building blocks
2. **Composite Components** - Feature-specific combinations
3. **Page Components** - Full page layouts and structures

### 7.2 Styling System

**Tailwind CSS Configuration:**
\`\`\`css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --secondary: 240 4.8% 95.9%;
    // ... color variables
  }
}
\`\`\`

**Custom CSS Classes:**
\`\`\`css
.glass {
  @apply backdrop-blur-sm bg-white/80 dark:bg-black/30 border border-white/20 shadow-sm;
}

.feature-card {
  @apply relative overflow-hidden rounded-xl border bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:bg-black/50;
}
\`\`\`

**Design Principles:**
- **CSS Custom Properties** - Enables theme switching and consistent colors
- **Utility Classes** - Promotes reusable styling patterns
- **Component Classes** - Encapsulates complex styling logic
- **Dark Mode Support** - Built-in theme switching capabilities

### 7.3 Component Library Structure

**Button Component (button.tsx):**
\`\`\`typescript
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
\`\`\`

**Class Variance Authority (CVA) Pattern:**
- **Base Classes** - Common styles applied to all variants
- **Variant System** - Different visual styles for different contexts
- **Size System** - Consistent sizing across all button variants
- **Default Values** - Sensible defaults reduce boilerplate

### 7.4 Icon System

**Lucide React Integration:**
\`\`\`typescript
import { 
  FileText, 
  BookText, 
  HelpCircle, 
  Lightbulb, 
  ClipboardCheck, 
  Layers
} from "lucide-react";
\`\`\`

**Icon Usage Pattern:**
- **Semantic Naming** - Icons chosen to match their function
- **Consistent Sizing** - Standard size props across all icons
- **Accessibility** - Proper ARIA labels and semantic usage
- **Performance** - Tree-shaking ensures only used icons are bundled

### 7.5 Toast Notification System

**Dual Toast Implementation:**
- **shadcn/ui Toaster** - For complex toast layouts
- **Sonner** - For simple, elegant notifications

\`\`\`typescript
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";

// Usage examples:
toast.success("Account created successfully!");
toast.error("Failed to generate content");

const { toast } = useToast();
toast({
  title: "Success",
  description: "Operation completed successfully",
  variant: "default"
});
\`\`\`

---

## 8. ROUTING & NAVIGATION

### 8.1 React Router Setup

**Route Configuration:**
\`\`\`typescript
<Routes>
  <Route element={<Layout />}>
    <Route path="/" element={<Index />} />
    <Route path="/content-generator" element={<ContentGenerator />} />
    <Route path="/quiz-generator" element={<QuizGenerator />} />
    <Route path="/learning-materials" element={<LearningMaterials />} />
    <Route path="/notes-generator" element={<NotesGenerator />} />
    <Route path="/flashcard-generator" element={<FlashcardGenerator />} />
    <Route path="/learning-assistant" element={<LearningAssistant />} />
    <Route path="/faq" element={<FAQ />} />
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/terms-of-service" element={<TermsOfService />} />
    <Route path="/cookie-policy" element={<CookiePolicy />} />
    <Route path="*" element={<NotFound />} />
  </Route>
</Routes>
\`\`\`

**Routing Strategy:**
- **Nested Routes** - All routes wrapped in Layout for consistent structure
- **Protected Routes** - Individual pages handle authentication requirements
- **Catch-all Route** - 404 handling with NotFound component
- **Descriptive URLs** - Clear, SEO-friendly route paths

### 8.2 Navigation Components

**Mobile Navigation:**
\`\`\`typescript
export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  mainNavLinks,
  onSectionClick,
  onSignupClick,
}) => {
  const { currentUser } = useAuth();

  return (
    <div className={cn(
      "md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-md transition-all duration-300 ease-in-out overflow-hidden z-50",
      isOpen ? "max-h-[100vh] py-4" : "max-h-0"
    )}>
      {/* Navigation content */}
    </div>
  );
};
\`\`\`

**Navigation Features:**
- **Responsive Design** - Different layouts for mobile and desktop
- **Smooth Animations** - CSS transitions for menu state changes
- **Authentication Integration** - Shows different options based on login state
- **Accessibility** - Proper ARIA attributes and keyboard navigation

### 8.3 Features Menu System

\`\`\`typescript
export const FeaturesMenu = ({ isMobile = false }: FeaturesMenuProps) => {
  const features = [
    {
      title: "Content Generator",
      description: "Generate tailored learning content",
      href: "/content-generator",
      icon: FileText
    },
    // ... other features
  ];

  if (isMobile) {
    return <Collapsible>/* Mobile menu */</Collapsible>;
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Features</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[600px] grid-cols-2 gap-3 p-4">
              {features.map((feature) => (
                <ListItem key={feature.href} title={feature.title} href={feature.href}>
                  {feature.description}
                </ListItem>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
\`\`\`

**Menu Architecture:**
- **Adaptive Layout** - Different presentations for mobile/desktop
- **Feature Discovery** - Organized grid layout for easy browsing
- **Visual Hierarchy** - Icons and descriptions aid navigation
- **Performance** - Lazy loading and efficient rendering

---

## 9. STATE MANAGEMENT

### 9.1 React Query Implementation

**Query Client Configuration:**
\`\`\`typescript
const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {/* App content */}
    </QueryClientProvider>
  );
};
\`\`\`

**Benefits of React Query:**
- **Server State Management** - Handles API calls and caching
- **Background Updates** - Keeps data fresh automatically
- **Error Handling** - Built-in error states and retry logic
- **Loading States** - Automatic loading state management

### 9.2 Context API Usage

**Authentication Context:**
\`\`\`typescript
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
\`\`\`

**Context Pattern Benefits:**
- **Type Safety** - TypeScript ensures proper context usage
- **Error Prevention** - Runtime checks for proper provider usage
- **Centralized State** - Single source of truth for authentication
- **Performance** - Minimal re-renders with proper context splitting

### 9.3 Local State Management

**Component State Pattern:**
\`\`\`typescript
const [prompt, setPrompt] = useState("");
const [result, setResult] = useState("");
const [isLoading, setIsLoading] = useState(false);
const [showPdfDialog, setShowPdfDialog] = useState(false);
\`\`\`

**State Organization:**
- **Related State Grouping** - Logically related state variables together
- **Boolean Flags** - Clear loading and modal state management
- **String State** - User input and AI output handling
- **Derived State** - Computed values based on primary state

---

## 10. PDF GENERATION SYSTEM

### 10.1 PDF Utils Implementation

\`\`\`typescript
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export async function generatePDF(
  content: string,
  title: string,
  filename: string
): Promise<void> {
  // Create a temporary div to properly render the content
  const contentDiv = document.createElement('div');
  contentDiv.innerHTML = content.replace(/\\n/g, '<br>');
  contentDiv.style.padding = '20px';
  contentDiv.style.color = 'black';
  contentDiv.style.backgroundColor = 'white';
  contentDiv.style.width = '595px'; // A4 width in pixels at 72 dpi
  document.body.appendChild(contentDiv);
  
  // Capture the content as an image
  const canvas = await html2canvas(contentDiv, {
    scale: 2, // Higher resolution
    backgroundColor: '#ffffff',
  });
  
  document.body.removeChild(contentDiv);
  
  // Create PDF with A4 dimensions
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });
  
  // Add title
  pdf.setFontSize(16);
  pdf.text(title, 20, 20);
  pdf.setFontSize(12);
  
  // Add image of content
  const imgData = canvas.toDataURL('image/png');
  pdf.addImage(imgData, 'PNG', 10, 30, 190, 0, '', 'FAST');
  
  // Download the PDF
  pdf.save(\`\${filename}.pdf\`);
}
\`\`\`

**PDF Generation Process:**

1. **Content Preparation:**
   - Creates temporary DOM element for rendering
   - Applies consistent styling for PDF output
   - Sets fixed width for A4 compatibility

2. **Canvas Conversion:**
   - Uses html2canvas to convert HTML to image
   - High resolution (scale: 2) for crisp output
   - Removes temporary element after capture

3. **PDF Creation:**
   - jsPDF creates A4 portrait document
   - Adds title with larger font size
   - Embeds captured image as PDF content

4. **Download Trigger:**
   - Automatically downloads generated PDF
   - Uses user-defined or default filename

**Integration with AI Features:**
\`\`\`typescript
const downloadAsPdf = async () => {
  try {
    const filename = pdfFilename.trim() || \`\${feature}_\${new Date().toISOString().slice(0, 10)}\`;
    
    await generatePDF(result, title, filename);
    
    setShowPdfDialog(false);
    
    toast({
      title: "PDF downloaded",
      description: \`\${filename}.pdf has been downloaded successfully.\`,
    });
  } catch (error) {
    console.error("Error downloading PDF:", error);
    toast({
      title: "Error downloading PDF",
      description: "There was an error generating the PDF. Please try again.",
      variant: "destructive",
    });
  }
};
\`\`\`

---

## 11. CONFIGURATION FILES

### 11.1 TypeScript Configuration

**tsconfig.json:**
\`\`\`json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
\`\`\`

**Key Configuration Details:**
- **Path Mapping** - '@/*' alias for cleaner imports
- **Strict Mode** - Maximum type safety enabled
- **Modern JavaScript** - ES2020 target for modern features
- **JSX Transform** - React 17+ automatic JSX runtime

### 11.2 Vite Configuration

**vite.config.ts:**
\`\`\`typescript
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
})
\`\`\`

**Configuration Benefits:**
- **Path Resolution** - Matches TypeScript path mapping
- **React Plugin** - Enables React Fast Refresh
- **Optimization** - Excludes problematic dependencies from pre-bundling

### 11.3 Tailwind Configuration

**tailwind.config.ts:**
\`\`\`typescript
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        // ... CSS custom properties
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        // ... animation keyframes
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
\`\`\`

**Configuration Features:**
- **Dark Mode** - Class-based theme switching
- **CSS Custom Properties** - Dynamic color system
- **Animation System** - Pre-built component animations
- **Plugin System** - Extended functionality through plugins

---

## 12. BEST PRACTICES & CODING STANDARDS

### 12.1 TypeScript Best Practices

**Interface Definitions:**
\`\`\`typescript
interface AIFeatureProps {
  title: string;
  description: string;
  placeholder: string;
  feature: "content" | "quiz" | "materials" | "notes" | "flashcards" | "assistant";
}
\`\`\`

**Standards Applied:**
- **Explicit Types** - All props and function parameters typed
- **Union Types** - Constrained string values for type safety
- **Interface vs Type** - Interfaces for object shapes, types for unions
- **Generic Constraints** - Type parameters with appropriate bounds

### 12.2 React Component Standards

**Functional Component Pattern:**
\`\`\`typescript
export const ComponentName: React.FC<PropsInterface> = ({ prop1, prop2 }) => {
  // State declarations
  const [state, setState] = useState(initialValue);
  
  // Effect hooks
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  // Event handlers
  const handleEvent = () => {
    // Handler logic
  };
  
  // Render logic
  return (
    <div>
      {/* JSX content */}
    </div>
  );
};
\`\`\`

**Component Organization:**
1. **Props destructuring** at function signature
2. **State hooks** grouped together
3. **Effect hooks** after state declarations
4. **Event handlers** before render return
5. **Early returns** for loading/error states
6. **Main render** as final return statement

### 12.3 Error Handling Patterns

**Comprehensive Error Handling:**
\`\`\`typescript
try {
  const result = await apiCall();
  // Success path
} catch (error) {
  console.error("Detailed error:", error);
  
  let userMessage = "Default error message";
  if (error instanceof SpecificError) {
    userMessage = "Specific error guidance";
  }
  
  toast.error(userMessage);
  throw error; // Re-throw if needed for upstream handling
}
\`\`\`

**Error Handling Strategy:**
- **Detailed Logging** - Full error context for debugging
- **User-Friendly Messages** - Clear, actionable error communication
- **Error Classification** - Different handling for different error types
- **Graceful Degradation** - Fallback behavior when possible

### 12.4 Performance Optimization

**React Performance Patterns:**
\`\`\`typescript
// Memoization for expensive calculations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(dependencies);
}, [dependencies]);

// Callback memoization for event handlers
const handleClick = useCallback(() => {
  // Event handler logic
}, [dependencies]);

// Component memoization for pure components
const MemoizedComponent = React.memo(ComponentName);
\`\`\`

**Optimization Techniques:**
- **useMemo** - Cache expensive computations
- **useCallback** - Stable function references
- **React.memo** - Prevent unnecessary re-renders
- **Lazy Loading** - Code splitting for better initial load

---

## 13. DEPLOYMENT & ENVIRONMENT SETUP

### 13.1 Environment Variables

**Required Environment Variables:**
\`\`\`bash
VITE_GEMINI_API_KEY=your_gemini_api_key_here
\`\`\`

**Environment Setup Process:**
1. **API Key Acquisition** - Obtain Gemini API key from Google AI Studio
2. **Local Development** - Create .env file in project root
3. **Production Deployment** - Configure environment variables in hosting platform
4. **Security Considerations** - Never commit API keys to version control

### 13.2 Build Process

**Vite Build Commands:**
\`\`\`bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
\`\`\`

**Build Optimization:**
- **Tree Shaking** - Removes unused code from bundle
- **Code Splitting** - Splits code into smaller chunks
- **Asset Optimization** - Compresses images and other assets
- **Modern JavaScript** - Outputs optimized ES modules

### 13.3 Firebase Configuration

**Firebase Setup Requirements:**
1. **Project Creation** - Firebase console project setup
2. **Authentication Configuration** - Enable email/password authentication
3. **Domain Configuration** - Add authorized domains for production
4. **Security Rules** - Configure appropriate access controls

**Production Considerations:**
- **API Key Restrictions** - Limit API key usage to specific domains
- **Authentication Flow** - Test complete signup/login/logout cycle
- **Error Monitoring** - Set up error tracking and monitoring
- **Performance Monitoring** - Enable Firebase Performance Monitoring

---

## 14. TROUBLESHOOTING GUIDE

### 14.1 Common Development Issues

**API Key Problems:**
\`\`\`typescript
// Debugging API key issues
console.log("API Key status:", API_KEY ? "Present" : "Missing");
console.log("API Key length:", API_KEY?.length || 0);

if (!API_KEY) {
  throw new Error("VITE_GEMINI_API_KEY is not defined in environment variables");
}
\`\`\`

**Solutions:**
- Verify .env file exists and contains correct key
- Restart development server after .env changes
- Check for typos in environment variable name
- Ensure API key has proper permissions in Google AI Studio

**Authentication Issues:**
\`\`\`typescript
// Authentication debugging
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    console.log("Auth state changed:", user ? "Logged in" : "Logged out");
    setCurrentUser(user);
    setLoading(false);
  });

  return unsubscribe;
}, []);
\`\`\`

**Common Auth Problems:**
- Firebase configuration errors
- Domain not authorized in Firebase console
- Network connectivity issues
- Browser blocking third-party cookies

### 14.2 Performance Issues

**AI Generation Timeouts:**
\`\`\`typescript
// Add timeout handling
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

try {
  const result = await fetch(apiUrl, {
    signal: controller.signal,
    // ... other options
  });
  clearTimeout(timeoutId);
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('Request timed out');
  }
}
\`\`\`

**PDF Generation Issues:**
- Large content causing memory issues
- Browser compatibility with html2canvas
- Network timeouts during generation
- File size limitations

### 14.3 Build and Deployment Issues

**Common Build Errors:**
\`\`\`bash
# TypeScript errors
npm run type-check

# Dependency issues
npm install --legacy-peer-deps

# Clear cache
npm run build --force
\`\`\`

**Deployment Checklist:**
- [ ] Environment variables configured
- [ ] Build process completes successfully
- [ ] All API endpoints accessible
- [ ] Authentication flows working
- [ ] PDF generation functional
- [ ] Mobile responsiveness verified

### 14.4 Error Monitoring

**Production Error Tracking:**
\`\`\`typescript
// Error boundary implementation
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error boundary caught an error:', error, errorInfo);
    // Send to error reporting service
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
\`\`\`

**Monitoring Best Practices:**
- Implement error boundaries for graceful error handling
- Set up error reporting service (Sentry, LogRocket, etc.)
- Monitor API response times and error rates
- Track user engagement and feature usage

---

## CONCLUSION

This technical documentation provides a comprehensive overview of the Aptora codebase, covering all major components, systems, and implementation details. The application represents a modern, well-architected React application with sophisticated AI integration, robust authentication, and excellent user experience design.

The codebase demonstrates best practices in:
- **Component Architecture** - Reusable, composable components
- **Type Safety** - Comprehensive TypeScript implementation
- **Performance** - Optimized rendering and API usage
- **User Experience** - Intuitive interface and error handling
- **Maintainability** - Clear code organization and documentation

For developers working with this codebase, focus on understanding the AI integration patterns, authentication flow, and component composition strategies, as these form the foundation for extending and maintaining the application.

---

**Document Generated:** ${new Date().toLocaleDateString()}
**Version:** 1.0
**Total Pages:** Comprehensive Technical Reference
**Aptora Development Team**
      `;

      await generatePDF(documentContent, "Aptora Codebase Technical Documentation", "aptora_technical_documentation");
      
      toast({
        title: "Documentation Generated",
        description: "Complete technical documentation has been downloaded as PDF.",
      });
    } catch (error) {
      console.error("Error generating documentation:", error);
      toast({
        title: "Error",
        description: "Failed to generate documentation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Codebase Documentation Generator</h1>
        <p className="text-muted-foreground mb-6">
          Generate a comprehensive technical documentation of the entire Aptora codebase
        </p>
        
        <Button 
          onClick={generateDocumentation} 
          disabled={isGenerating}
          size="lg"
          className="min-w-[200px]"
        >
          {isGenerating ? (
            <>
              <FileText className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Generate Documentation
            </>
          )}
        </Button>
        
        <div className="mt-6 text-sm text-muted-foreground max-w-2xl mx-auto">
          <p>
            This will generate a complete technical manual covering:
          </p>
          <ul className="mt-2 space-y-1 text-left">
            <li>• Project architecture and technology stack</li>
            <li>• Component structure and implementation details</li>
            <li>• AI integration and LangChain configuration</li>
            <li>• Authentication system and security</li>
            <li>• UI components and design system</li>
            <li>• Best practices and coding standards</li>
            <li>• Deployment and troubleshooting guides</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
