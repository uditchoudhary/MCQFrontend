import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import TestSelection from './components/TestSelection';
import TestComponent from './components/TestComponent';
import { SelectionProvider } from './context/SelectionContext';
import './css/App.css';
import PMPquestions from './PMP.json';

const QUESTIONS_PER_TEST = 180;

const App: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>(PMPquestions);
  const [currentTest, setCurrentTest] = useState<number | null>(null);
  const [results, setResults] = useState<{ [key: number]: any[] }>({});
  // const [file, setFile] = useState<File | null>(null);

  // useEffect(() => {
  //   if (file) {
  //     handleUpload();
  //   }
  // }, [file]);

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files) {
  //     setFile(event.target.files[0]);
  //   }
  // };

  // const handleUpload = async () => {
  //   if (!file) return;
  //   const formData = new FormData();
  //   formData.append('pdf', file);
  //   try {
  //     const response = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, formData, {
  //       headers: { 'Content-Type': 'multipart/form-data' }
  //     });
  //     setQuestions(response.data);
  //   } catch (error) {
  //     console.error('Error uploading file:', error);
  //   }
  // };

  const numOfTests = Math.ceil(questions.length / QUESTIONS_PER_TEST);

  return (
    <SelectionProvider>
      <div className="App">
        <h1>MCQ Application</h1>
        {/* <input type="file" onChange={handleFileChange} accept=".pdf" /> */}
        {/* <button onClick={handleUpload}>Upload PDF</button> */}
        <TestSelection
          numOfTests={numOfTests}
          setCurrentTest={setCurrentTest}
        />
        {currentTest !== null && (
          <TestComponent
            currentTest={currentTest}
            questions={questions}
            QUESTIONS_PER_TEST={QUESTIONS_PER_TEST}
            results={results}
            setResults={setResults}
          />
        )}
      </div>
    </SelectionProvider>
  );
};

export default App;
