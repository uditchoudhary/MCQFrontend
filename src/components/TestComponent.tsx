import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import MCQQuestion from './MCQQuestion';
import Timer from './Timer'; // Import the Timer component
import { useSelection } from './../context/SelectionContext';

// Timer styles (default and fixed)
const timerStyles: React.CSSProperties = {
  width: '100%',
  backgroundColor: '#f8f9fa',
  padding: '10px 0',
  textAlign: 'center',
};

const fixedTimerStyles: React.CSSProperties = {
  ...timerStyles,
  position: 'fixed',
  top: 0,
  left: 0,
  // right: 0,
  margin: '0 auto',
  width: '20%', // Keeps the timer width at 20%
  zIndex: 1000,
  height: '15%',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

// Modal styles
const modalStyles: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const popupContentStyles: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  textAlign: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

// Scroll to Top Button styles
const scrollButtonStyles: React.CSSProperties = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  padding: '10px',
  // backgroundColor: '#007bff',
  // color: '#fff',
  // border: 'none',
  // borderRadius: '50%',
  cursor: 'pointer',
  fontSize: '16px',
  zIndex: 1000,
};

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
  // const [breakTime, setBreakTime] = useState(false);

  // Time variables 
  const [time, setTime] = useState(0); // Time in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [showPausePopup, setShowPausePopup] = useState(false);
  const [isFixed, setIsFixed] = useState(false); // New state to control fixed positioning
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const timerContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (!isRunning && timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  useEffect(() => {
    const handleScroll = () => {
      if (timerContainerRef.current) {
        const offsetTop = timerContainerRef.current.offsetTop;
        if (window.scrollY > offsetTop) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatTime = (time: number) => {
    const hours = String(Math.floor(time / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleStartPause = () => {
    if (isRunning) {
      setShowPausePopup(true);
      setIsRunning(false)
    } else {
      setIsRunning(true);
      setShowPausePopup(false);
    }
  };

  const handleResumeTimer = () => {
    setIsRunning(true);
    setShowPausePopup(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setShowPausePopup(false);
  };

  const calculateTime = useCallback((numQuestions: number) => {
    const time = numQuestions === 180 ? 230 : Math.round((numQuestions / 180) * 230);
    return time * 60; // Convert minutes to seconds
  }, []);

  const numQuestions = questions.slice(
    currentTest * QUESTIONS_PER_TEST,
    (currentTest + 1) * QUESTIONS_PER_TEST
  ).length;

  // const initialTime = useMemo(() => calculateTime(numQuestions), [calculateTime, numQuestions]);

  // const handleTimeUp = () => {
  //   handleSubmit();
  // };

  // const handleBreak = () => {
  //   setBreakTime(true);
  // };

  // const handleResume = () => {
  //   setBreakTime(false);
  // };

  const toggleOption = (questionIndex: number, options: string[]) => {
    setUserSelections((prev) => ({
      ...prev,
      [currentTest]: {
        ...prev[currentTest],
        [`Q${questionIndex + 1}`]: options,
      },
    }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      {/* {!breakTime && <Timer initialTime={initialTime} onTimeUp={handleTimeUp} />} */}
      <div>
      <div
        ref={timerContainerRef}
        style={isFixed ? fixedTimerStyles : timerStyles} // Apply fixed styles only when isFixed is true
      >
        <h2>{formatTime(time)}</h2>
        <button onClick={handleStartPause}>{isRunning ? 'Pause' : 'Start'}</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      {/* Pause Popup Modal */}
      {showPausePopup && (
        <div style={modalStyles}>
          <div style={popupContentStyles}>
            <p>Test is paused. Click on Resume to continue.</p>
            <button onClick={handleResumeTimer}>Resume</button>
          </div>
        </div>
      )}
    </div>
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
      {/* {Object.keys(userSelections[currentTest] || {}).length > 60 && !breakTime && (
        <button onClick={handleBreak} className="break-button">Take a Break</button>
      )} */}
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
      {/* {breakTime && (
        <div>
          <p>Take a 10-minute break. Timer will resume after the break.</p>
          <Timer initialTime={600} onTimeUp={handleResume} />
          <button onClick={handleResume}>Resume Test</button>
        </div>
      )} */}
            {/* Scroll to Top Button */}
            <button onClick={scrollToTop} style={scrollButtonStyles}>
        ⬆️ Top
      </button>
    </div>
  );
};

export default TestComponent;
