// /frontend/src/components/LandingPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LandingPage = () => {
  const [friendName, setFriendName] = useState('');
  const navigate = useNavigate();

  const handleStart = async () => {
    if (!friendName.trim()) return alert("Please enter your friend's name");

    try {
      // Replace with actual backend endpoint
      await axios.post('http://localhost:5000/api/sessions/start-session', {
        user1: 'You',
        user2: friendName,
      });
      navigate('/menu');
    } catch (error) {
      console.error('Error starting session:', error);
      alert('Failed to start session');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100">
      <h1 className="text-4xl font-bold mb-6">Friendship Book 📖</h1>
      <input
        type="text"
        placeholder="Enter Your Friend's Name"
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
        className="border-2 border-blue-300 rounded p-2 mb-4"
      />
      <button
        onClick={handleStart}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Start
      </button>
    </div>
  );
};

export default LandingPage;
