import React, { useState } from 'react';
import './MCQQuestion.css';
import ImageComponent from './ImageContainer';

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
}

const MCQQuestion: React.FC<MCQQuestionProps> = ({ mcq }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  console.table(mcq);
  return (
    <div className="mcq-question">
      {mcq.questionNo && <h3>Question No: {mcq.questionNo}</h3>}
      <p className="question-text">{mcq.question}</p>
      {mcq.questionImage && <ImageComponent src={require(`../images/${mcq.questionImage}.png`)} />}
      <div className="options">
        {mcq.options.A && <p><strong>A.</strong> {mcq.options.A}</p>}
        {mcq.options.B && <p><strong>B.</strong> {mcq.options.B}</p>}
        {mcq.options.C && <p><strong>C.</strong> {mcq.options.C}</p>}
        {mcq.options.D && <p><strong>D.</strong> {mcq.options.D}</p>}
      </div>
      {showAnswer && (
        <div className="answer-section">
          <p><strong>Answer:</strong> {mcq.answer}</p>
          {mcq.answerImage && <ImageComponent src={require(`../images/${mcq.answerImage}.png`)} />}
          <strong>Explanation:</strong>
          {mcq.explanation && <p> {mcq.explanation}</p>}
          {mcq.explanationImage && <ImageComponent src={require(`../images/${mcq.explanationImage}.png`)} />}

        </div>
      )}
      <button onClick={toggleShowAnswer} className="show-answer-btn">
        {showAnswer ? 'Hide Answer' : 'Show Answer'}
      </button>
    </div>
  );
};

export default MCQQuestion;
