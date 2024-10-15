import React, { createContext, useContext, useState } from 'react';

interface SelectionContextProps {
  userSelections: { [key: number]: { [key: string]: string[] } };
  setUserSelections: React.Dispatch<React.SetStateAction<{ [key: number]: { [key: string]: string[] } }>>;
  results: { [key: number]: any[] };
  setResults: React.Dispatch<React.SetStateAction<{ [key: number]: any[] }>>;
  submittedTests: boolean[];
  markTestAsSubmitted: (testIndex: number) => void;
}

const SelectionContext = createContext<SelectionContextProps | undefined>(undefined);

export const SelectionProvider: React.FC<{ numOfTests: number, children: React.ReactNode }> = ({ numOfTests, children }) => {
  const [userSelections, setUserSelections] = useState<{ [key: number]: { [key: string]: string[] } }>({});
  const [results, setResults] = useState<{ [key: number]: any[] }>({});
  const [submittedTests, setSubmittedTests] = useState<boolean[]>(Array(numOfTests).fill(false));

  const markTestAsSubmitted = (testIndex: number) => {
    setSubmittedTests((prev) => {
      const updated = [...prev];
      updated[testIndex] = true;
      return updated;
    });
  };

  return (
    <SelectionContext.Provider value={{ userSelections, setUserSelections, results, setResults, submittedTests, markTestAsSubmitted }}>
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }
  return context;
};
