import React from 'react';
import MCQQuestion from './MCQQuestion';
import { useTestContext } from '../context/TestContext';

const QUESTIONS_PER_TEST = 150;

const QuestionList: React.FC<{ questions: any[] }> = ({ questions }) => {
  const { currentTest, userSelections, setUserSelections } = useTestContext();

  const toggleOption = (questionIndex: number, options: string[]) => {
    if (currentTest === null) return;
    setUserSelections((prev) => ({
      ...prev,
      [currentTest]: {
        ...prev[currentTest],
        [`Q${questionIndex + 1}`]: options,
      },
    }));
  };

  if (currentTest === null) return null;

  const currentQuestions = questions.slice(currentTest * QUESTIONS_PER_TEST, (currentTest + 1) * QUESTIONS_PER_TEST);

  return (
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
  );
};

export default QuestionList;