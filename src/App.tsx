import React, { useState } from 'react';
import axios from 'axios';
import MCQQuestion from './MCQQuestion';
import './App.css';
import PMPquestions from './PMP.json';

const App: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>(PMPquestions);
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

  return (
    <div className="App">
      <h1>MCQ Application</h1>
      <input type="file" onChange={handleFileChange} accept=".pdf" />
      <button onClick={handleUpload}>Upload PDF</button>

      <div className="question-list">
        {questions.length > 0 &&
          questions.map((mcq, index) => (
            <MCQQuestion key={index} mcq={mcq} />
          ))}
      </div>
    </div>
  );
};

export default App;
