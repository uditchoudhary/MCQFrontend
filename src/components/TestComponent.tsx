import React, { useState, useEffect, useMemo, useCallback } from 'react';
import MCQQuestion from './MCQQuestion';
import Timer from './Timer'; // Import the Timer component
import { useSelection } from './../context/SelectionContext';

interface TestComponentProps {
  currentTest: number;
  questions: any[];
  QUESTIONS_PER_TEST: number;
}

const TestComponent: React.FC<TestComponentProps> = ({
  currentTest,
  questions,
  QUESTIONS_PER_TEST,
}) => {
  const { userSelections, setUserSelections, results, setResults, markTestAsSubmitted } = useSelection();
  const [showSummary, setShowSummary] = useState(false);
  const [breakTime, setBreakTime] = useState(false);

  const calculateTime = useCallback((numQuestions: number) => {
    const time = numQuestions === 180 ? 230 : Math.round((numQuestions / 180) * 230);
    return time * 60; // Convert minutes to seconds
  }, []);

  const numQuestions = questions.slice(
    currentTest * QUESTIONS_PER_TEST,
    (currentTest + 1) * QUESTIONS_PER_TEST
  ).length;

  const initialTime = useMemo(() => calculateTime(numQuestions), [calculateTime, numQuestions]);

  const handleTimeUp = () => {
    handleSubmit();
  };

  const handleBreak = () => {
    setBreakTime(true);
  };

  const handleResume = () => {
    setBreakTime(false);
  };

  const toggleOption = (questionIndex: number, options: string[]) => {
    setUserSelections((prev) => ({
      ...prev,
      [currentTest]: {
        ...prev[currentTest],
        [`Q${questionIndex + 1}`]: options,
      },
    }));
  };

  const handleSubmit = () => {
    const currentQuestions = questions.slice(
      currentTest * QUESTIONS_PER_TEST,
      (currentTest + 1) * QUESTIONS_PER_TEST
    );

    const newResults = currentQuestions.map((mcq, index) => {
      const userAnswer = userSelections[currentTest]?.[`Q${index + 1}`] || [];
      const correctAnswerKeys = mcq.answer.split(',').map((a: string) => a.trim());
      const correctAnswerTexts = correctAnswerKeys.map((key: string) => `${key}: ${mcq.options[key]}`);
      const userAnswerTexts = userAnswer.map((key: string) => `${key}: ${mcq.options[key]}`);

      const isCorrect = userAnswer.sort().toString() === correctAnswerKeys.sort().toString();
      return {
        question: mcq.question,
        userAnswerTexts,
        correctAnswerTexts,
        isCorrect,
      };
    });

    setResults((prev) => ({
      ...prev,
      [currentTest]: newResults,
    }));
    setShowSummary(true);
    markTestAsSubmitted(currentTest);  // Mark the test as submitted
  };

  return (
    <div>
      {!breakTime && <Timer initialTime={initialTime} onTimeUp={handleTimeUp} />}
      <div className="question-list">
        {questions.slice(
          currentTest * QUESTIONS_PER_TEST,
          (currentTest + 1) * QUESTIONS_PER_TEST
        ).map((mcq, index) => (
          <MCQQuestion
            key={index}
            mcq={mcq}
            onSelect={(selected: string[]) => toggleOption(index, selected)}
            selectedOptions={userSelections[currentTest]?.[`Q${index + 1}`] || []}
          />
        ))}
      </div>
      <button onClick={handleSubmit} className="submit-button">Submit Answers</button>
      {Object.keys(userSelections[currentTest] || {}).length > 60 && !breakTime && (
        <button onClick={handleBreak} className="break-button">Take a Break</button>
      )}
      {showSummary && results[currentTest] && (
        <div className='summary'>
          <h2>Summary of Answers</h2>
          <div>
            {results[currentTest].map((result: any, index: any) => (
              <div key={index} className={result.isCorrect ? 'correct summary-list' : 'incorrect summary-list'}>
                <p><strong>Question:</strong> {result.question}</p>
                <p><strong>Your Answer:</strong> {result.userAnswerTexts.join(', ') || 'No answer provided'}</p>
                <p><strong>Correct Answer:</strong> {result.correctAnswerTexts.join(', ')}</p>
              </div>
            ))}
            <p>Total: {results[currentTest].filter((r: any) => r.isCorrect).length}/{questions.slice(
              currentTest * QUESTIONS_PER_TEST,
              (currentTest + 1) * QUESTIONS_PER_TEST
            ).length}</p>
          </div>
        </div>
      )}
      {breakTime && (
        <div>
          <p>Take a 10-minute break. Timer will resume after the break.</p>
          <Timer initialTime={600} onTimeUp={handleResume} />
          <button onClick={handleResume}>Resume Test</button>
        </div>
      )}
    </div>
  );
};

export default TestComponent;
