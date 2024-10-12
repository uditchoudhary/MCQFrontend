// SelectionContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface SelectionContextProps {
  userSelections: { [key: number]: { [key: string]: string[] } };
  setUserSelections: React.Dispatch<React.SetStateAction<{ [key: number]: { [key: string]: string[] } }>>;
}

const SelectionContext = createContext<SelectionContextProps | undefined>(undefined);

export const SelectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userSelections, setUserSelections] = useState<{ [key: number]: { [key: string]: string[] } }>({});

  return (
    <SelectionContext.Provider value={{ userSelections, setUserSelections }}>
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => {
  const context = useContext(SelectionContext);
  if (context === undefined) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }
  return context;
};
