import React, { useState, useEffect } from 'react';
import '../css/MCQQuestion.css';
import ImageComponent from './ImageContainer';
import OptionComponent from './OptionComponent';
import { StringLiteral } from 'typescript';

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
      E?: string;
      F?: string;
    };
    answer: string;
    answerImage?: string;
    explanation?: string;
    explanationImage?: string;
  };
  onSelect: (selected: string[]) => void;
  isCorrect?: boolean;
  selectedOptions: string[];
}

const MCQQuestion: React.FC<MCQQuestionProps> = ({ mcq, onSelect, isCorrect, selectedOptions }) => {
  const [localSelectedOptions, setLocalSelectedOptions] = useState<string[]>(selectedOptions);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setLocalSelectedOptions(selectedOptions);
  }, [selectedOptions]);

  const toggleOption = (option: string) => {
    setLocalSelectedOptions((prev) => {
      let updatedOptions: string[];
      if (mcq.answer.includes(',')) {
        updatedOptions = prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]; // Checkbox behavior
      } else {
        updatedOptions = prev.includes(option) ? [] : [option];  // Radio behavior
      }
      onSelect(updatedOptions);
      return updatedOptions;
    });
  };

  const toggleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const isMultipleAnswer = mcq.answer.includes(',');

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
            isChecked={localSelectedOptions.includes("A")}
            type={isMultipleAnswer ? "checkbox" : "radio"}
          />
        )}
        {mcq.options.B && (
          <OptionComponent
            answer={mcq.answer}
            option={mcq.options.B}
            index="B"
            onSelect={toggleOption}
            isChecked={localSelectedOptions.includes("B")}
            type={isMultipleAnswer ? "checkbox" : "radio"}
          />
        )}
        {mcq.options.C && (
          <OptionComponent
            answer={mcq.answer}
            option={mcq.options.C}
            index="C"
            onSelect={toggleOption}
            isChecked={localSelectedOptions.includes("C")}
            type={isMultipleAnswer ? "checkbox" : "radio"}
          />
        )}
        {mcq.options.D && (
          <OptionComponent
            answer={mcq.answer}
            option={mcq.options.D}
            index="D"
            onSelect={toggleOption}
            isChecked={localSelectedOptions.includes("D")}
            type={isMultipleAnswer ? "checkbox" : "radio"}
          />
        )}
        {mcq.options.E && (
          <OptionComponent
            answer={mcq.answer}
            option={mcq.options.E}
            index="E"
            onSelect={toggleOption}
            isChecked={localSelectedOptions.includes("E")}
            type={isMultipleAnswer ? "checkbox" : "radio"}
          />
        )}
        {mcq.options.F && (
          <OptionComponent
            answer={mcq.answer}
            option={mcq.options.F}
            index="F"
            onSelect={toggleOption}
            isChecked={localSelectedOptions.includes("F")}
            type={isMultipleAnswer ? "checkbox" : "radio"}
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
