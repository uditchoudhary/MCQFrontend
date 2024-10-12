import React, { useState } from 'react';
import '../css/MCQQuestion.css';
import ImageComponent from './ImageContainer';
import OptionComponent from './OptionComponent';

interface MCQQuestionProps {
  mcq: {
    questionNo?: string;
    question: string;
    questionImage?: string;
    options: {
      A?: string;
      B?: string;
      C?: string;
      D?: string;
    };
    answer: string;
    answerImage?: string;
    explanation?: string;
    explanationImage?: string;
  };
  onSelect: (selected: string[]) => void; // Pass selected options to the parent
  isCorrect?: boolean; // Optional prop to handle correctness
}

const MCQQuestion: React.FC<MCQQuestionProps> = ({ mcq, onSelect, isCorrect }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleOption = (option: string) => {
    setSelectedOptions((prev) => {
      if (prev.includes(option)) {
        return prev.filter((o) => o !== option);
      } else {
        return [option];
      }
    });
    onSelect(selectedOptions); // Pass selected options to parent
  };

  const toggleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div className={`mcq-question ${isCorrect === false ? 'incorrect' : isCorrect === true ? 'correct' : ''}`}>
      {mcq.questionNo && <h3>Question No: {mcq.questionNo}</h3>}
      <p className="question-text">{mcq.question}</p>
      {mcq.questionImage && (
        <ImageComponent src={require(`../../images/${mcq.questionImage}.png`)} />
      )}
      <div className="options">
        {mcq.options.A && (
          <OptionComponent 
            answer={mcq.answer} 
            option={mcq.options.A} 
            index="A" 
            onSelect={toggleOption} // Pass onSelect to OptionComponent
          />
        )}
        {mcq.options.B && (
          <OptionComponent 
            answer={mcq.answer} 
            option={mcq.options.B} 
            index="B" 
            onSelect={toggleOption} // Pass onSelect to OptionComponent
          />
        )}
        {mcq.options.C && (
          <OptionComponent 
            answer={mcq.answer} 
            option={mcq.options.C} 
            index="C" 
            onSelect={toggleOption} // Pass onSelect to OptionComponent
          />
        )}
        {mcq.options.D && (
          <OptionComponent 
            answer={mcq.answer} 
            option={mcq.options.D} 
            index="D" 
            onSelect={toggleOption} // Pass onSelect to OptionComponent
          />
        )}
      </div>
      {showAnswer && (
        <div className="answer-section">
          <p><strong>Answer:</strong> {mcq.answer}</p>
          {mcq.answerImage && (
            <ImageComponent src={require(`../../images/${mcq.answerImage}.png`)} />
          )} 
          <strong>Explanation:</strong>
          {mcq.explanation && <p>{mcq.explanation}</p>}
          {mcq.explanationImage && (
            <ImageComponent src={require(`../../images/${mcq.explanationImage}.png`)} />
          )}
        </div>
      )}
      <button onClick={toggleShowAnswer} className="show-answer-btn">
        {showAnswer ? 'Hide Answer' : 'Show Answer'}
      </button>
    </div>
  );
};

export default MCQQuestion;
