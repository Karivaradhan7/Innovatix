
import React from "react";
import { AIFeature } from "@/components/AIFeature";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const QuizGenerator = () => {
  return (
    <ProtectedRoute>
      <AIFeature
        title="Quiz Generator"
        description="Create customized quizzes with varying difficulty levels to test your knowledge. Select the number of questions you want."
        placeholder="Describe the quiz you need (e.g., 'multiple choice questions about World War II for high school students')"
        feature="quiz"
        showQuantitySelector={true}
      />
    </ProtectedRoute>
  );
};

export default QuizGenerator;
