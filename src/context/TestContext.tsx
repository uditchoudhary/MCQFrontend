import React, { createContext, useState, ReactNode, useContext } from 'react';

interface TestContextType {
  currentTest: number | null;
  setCurrentTest: React.Dispatch<React.SetStateAction<number | null>>;
  userSelections: { [key: string]: { [key: string]: string[] } };
  setUserSelections: React.Dispatch<React.SetStateAction<{ [key: string]: { [key: string]: string[] } }>>;
  results: { [key: string]: any[] };
  setResults: React.Dispatch<React.SetStateAction<{ [key: string]: any[] }>>;
  showSummary: boolean;
  setShowSummary: React.Dispatch<React.SetStateAction<boolean>>;
}

const TestContext = createContext<TestContextType | undefined>(undefined);

export const TestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTest, setCurrentTest] = useState<number | null>(null);
  const [userSelections, setUserSelections] = useState<{ [key: string]: { [key: string]: string[] } }>({});
  const [results, setResults] = useState<{ [key: string]: any[] }>({});
  const [showSummary, setShowSummary] = useState(false);

  return (
    <TestContext.Provider value={{ currentTest, setCurrentTest, userSelections, setUserSelections, results, setResults, showSummary, setShowSummary }}>
      {children}
    </TestContext.Provider>
  );
};

export const useTestContext = () => {
  const context = useContext(TestContext);
  if (!context) {
    throw new Error('useTestContext must be used within a TestProvider');
  }
  return context;
};
