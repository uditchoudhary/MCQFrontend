import React from 'react';

interface TestSelectionProps {
  numOfTests: number;
  setCurrentTest: (testIndex: number | null) => void;
}

const TestSelection: React.FC<TestSelectionProps> = ({ numOfTests, setCurrentTest }) => {
  return (
    <div>
      {[...Array(numOfTests)].map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentTest(index)}
        >
          Test {index + 1}
        </button>
      ))}
    </div>
  );
};

export default TestSelection;
