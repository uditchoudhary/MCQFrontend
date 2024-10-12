import React, { useState, useEffect } from 'react';
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
  onSelect: (selected: string[]) => void;
  isCorrect?: boolean;
}

const MCQQuestion: React.FC<MCQQuestionProps> = ({ mcq, onSelect, isCorrect }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleOption = (option: string) => {
    setSelectedOptions((prev) => {
      const updatedOptions = prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option];
      onSelect(updatedOptions); // Ensure options are passed after updating
      return updatedOptions;
    });
  };

  const toggleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  useEffect(() => {
    onSelect(selectedOptions); // Ensure onSelect is called whenever selectedOptions changes
  }, [selectedOptions, onSelect]);

  return (
    <div className={`mcq-question ${isCorrect === false ? 'incorrect' : isCorrect === true ? 'correct' : ''}`}>
      {mcq.questionNo && <h3>Question No: {mcq.questionNo}</h3>}
      <p className="question-text">{mcq.question}</p>
      {mcq.questionImage && <ImageComponent src={require(`../../images/${mcq.questionImage}.png`)} />}
      <div className="options">
        {mcq.options.A && (
          <OptionComponent
            answer={mcq.answer}
            option={mcq.options.A}
            index="A"
            onSelect={toggleOption}
          />
        )}
        {mcq.options.B && (
          <OptionComponent
            answer={mcq.answer}
            option={mcq.options.B}
            index="B"
            onSelect={toggleOption}
          />
        )}
        {mcq.options.C && (
          <OptionComponent
            answer={mcq.answer}
            option={mcq.options.C}
            index="C"
            onSelect={toggleOption}
          />
        )}
        {mcq.options.D && (
          <OptionComponent
            answer={mcq.answer}
            option={mcq.options.D}
            index="D"
            onSelect={toggleOption}
          />
        )}
      </div>
      {showAnswer && (
        <div className="answer-section">
          <p><strong>Answer:</strong> {mcq.answer}</p>
          {mcq.answerImage && <ImageComponent src={require(`../../images/${mcq.answerImage}.png`)} />}
          {mcq.explanation && <p>{mcq.explanation}</p>}
          {mcq.explanationImage && <ImageComponent src={require(`../../images/${mcq.explanationImage}.png`)} />}
        </div>
      )}
      <button onClick={toggleShowAnswer} className="show-answer-btn">
        {showAnswer ? 'Hide Answer' : 'Show Answer'}
      </button>
    </div>
  );
};

export default MCQQuestion;
