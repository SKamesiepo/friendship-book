// /frontend/src/components/WouldYouRather.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const questions = [
  { text: 'Would you rather eat pizza or a hamburger?', options: ['🍕', '🍔'] },
  { text: 'Would you rather play video games or watch a movie?', options: ['🎮', '🎬'] },
  { text: 'Would you rather go swimming or play soccer?', options: ['🏊', '⚽'] },
  { text: 'Would you rather have a dog or a cat?', options: ['🐶', '🐱'] },
  { text: 'Would you rather read a book or draw a picture?', options: ['📚', '🖍️'] },
  { text: 'Would you rather fly a kite or ride a bike?', options: ['🪁', '🚴'] },
  { text: 'Would you rather go to the beach or the mountains?', options: ['🏖️', '🏞️'] },
  { text: 'Would you rather eat ice cream or cake?', options: ['🍦', '🍰'] },
];

const WouldYouRather = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (currentQuestion === questions.length) {
      setFinished(true);
    }
  }, [currentQuestion]);

  const handleAnswer = async (answer) => {
    setAnswers([...answers, answer]);
    setCurrentQuestion(currentQuestion + 1);

    // Example of saving the answer to the database (replace with real API call)
    try {
      await axios.post('http://localhost:5000/api/sessions/submit-answer', {
        question: questions[currentQuestion].text,
        answer,
      });
    } catch (error) {
      console.error('Error saving answer:', error);
    }
  };

  if (finished) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-pink-100">
        <h1 className="text-2xl font-bold mb-4">Game Over! Here are your answers:</h1>
        <ul className="list-disc">
          {answers.map((answer, index) => (
            <li key={index} className="mb-2">{`${questions[index].text} - ${answer}`}</li>
          ))}
        </ul>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700"
          onClick={() => window.location.reload()}
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-pink-100">
      <h2 className="text-xl font-bold mb-4">{questions[currentQuestion].text}</h2>
      <div className="flex space-x-4">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            className="text-3xl p-4 rounded bg-white shadow hover:bg-gray-100"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WouldYouRather;
