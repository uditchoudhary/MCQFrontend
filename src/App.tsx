import React, { useState } from 'react';
import TestSelection from './components/TestSelection';
import TestComponent from './components/TestComponent';
import { SelectionProvider } from './context/SelectionContext';
import './css/App.css';
import PMPquestions from './PMP.json';

const QUESTIONS_PER_TEST = 180;

const App: React.FC = () => {
  const [questions] = useState<any[]>(PMPquestions);
  const [currentTest, setCurrentTest] = useState<number | null>(null);

  const numOfTests = Math.ceil(questions.length / QUESTIONS_PER_TEST);

  return (
    <SelectionProvider numOfTests={numOfTests}>
      <div className="App">
        <h1>MCQ Application</h1>
        <TestSelection
          numOfTests={numOfTests}
          setCurrentTest={setCurrentTest}
        />
        {currentTest !== null && (
          <TestComponent
            currentTest={currentTest}
            questions={questions}
            QUESTIONS_PER_TEST={QUESTIONS_PER_TEST}
          />
        )}
      </div>
    </SelectionProvider>
  );
};

export default App;
