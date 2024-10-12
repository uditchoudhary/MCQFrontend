import React, { useState } from 'react';
import MCQQuestion from './MCQQuestion';
import { useSelection } from '../context/SelectionContext';

interface TestComponentProps {
  currentTest: number;
  questions: any[];
  QUESTIONS_PER_TEST: number;
  results: { [key: number]: any[] };
  setResults: React.Dispatch<React.SetStateAction<{ [key: number]: any[] }>>;
}

const TestComponent: React.FC<TestComponentProps> = ({
  currentTest,
  questions,
  QUESTIONS_PER_TEST,
  results,
  setResults,
}) => {
  const { userSelections, setUserSelections } = useSelection();
  const [showSummary, setShowSummary] = useState(false);

  const currentQuestions = questions.slice(
    currentTest * QUESTIONS_PER_TEST,
    (currentTest + 1) * QUESTIONS_PER_TEST
  );

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
  };

  return (
    <div>
      <div className="question-list">
        {currentQuestions.map((mcq, index) => (
          <MCQQuestion
            key={index}
            mcq={mcq}
            onSelect={(selected: string[]) => toggleOption(index, selected)}
            selectedOptions={userSelections[currentTest]?.[`Q${index + 1}`] || []}
          />
        ))}
      </div>
      <button onClick={handleSubmit} className="submit-button">Submit Answers</button>
      {showSummary && results[currentTest] && (
        <>
          <h2>Summary of Answers</h2>
          <div>
            {results[currentTest].map((result, index) => (
              <div key={index} className={result.isCorrect ? 'correct summary-list' : 'incorrect summary-list'}>
                <p><strong>Question:</strong> {result.question}</p>
                <p><strong>Your Answer:</strong> {result.userAnswerTexts.join(', ') || 'No answer provided'}</p>
                <p><strong>Correct Answer:</strong> {result.correctAnswerTexts.join(', ')}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TestComponent;
