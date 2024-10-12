// QuestionContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

// Define the shape of the context
interface QuestionContextType {
  questions: any[];
  setQuestions: (questions: any[]) => void;
}

// Create the context
export const QuestionContext = createContext<QuestionContextType | undefined>(undefined);

// Provider component
export const QuestionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [questions, setQuestions] = useState<any[]>([]);

  return (
    <QuestionContext.Provider value={{ questions, setQuestions }}>
      {children}
    </QuestionContext.Provider>
  );
};
