import React, { useState } from 'react';
import axios from 'axios';
import MCQQuestion from './components/MCQQuestion';
import './css/App.css';
import PMPquestions from './PMP.json';

const App: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>(PMPquestions);
  const [userSelections, setUserSelections] = useState<{ [key: string]: string[] }>({});
  const [showSummary, setShowSummary] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('pdf', file);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setQuestions(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const toggleOption = (questionIndex: number, options: string[]) => {
    setUserSelections((prev) => ({
      ...prev,
      [`Q${questionIndex + 1}`]: options,
    }));
  };

  const handleSubmit = () => {
    const newResults = questions.map((mcq, index) => {
      const userAnswer = userSelections[`Q${index + 1}`] || [];
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

    setResults(newResults);
    setShowSummary(true);
  };

  return (
    <div className="App">
      <h1>MCQ Application</h1>
      <input type="file" onChange={handleFileChange} accept=".pdf" />
      <button onClick={handleUpload}>Upload PDF</button>
      <div className="question-list">
        {questions.map((mcq, index) => (
          <MCQQuestion
            key={index}
            mcq={mcq}
            onSelect={(selected: string[]) => toggleOption(index, selected)}
          />
        ))}
      </div>
      <button onClick={handleSubmit} className="submit-button">Submit Answers</button>
      {showSummary && (
        <>
          <h2>Summary of Answers</h2>
          <div>
            {results.map((result, index) => (
              <div key={index} className={result.isCorrect ? 'correct  summary-list' : 'incorrect summary-list'}>
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

export default App;
