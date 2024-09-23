// /frontend/src/components/AboutFriend.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AboutFriend = () => {
  const [friendInfo, setFriendInfo] = useState(null);

  useEffect(() => {
    // Replace with actual API call to get friend's data
    const fetchFriendInfo = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/sessions/friend-info');
        setFriendInfo(data);
      } catch (error) {
        console.error('Error fetching friend info:', error);
      }
    };
    fetchFriendInfo();
  }, []);

  if (!friendInfo) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-purple-100">
      <h1 className="text-3xl font-bold mb-6">About {friendInfo.name}</h1>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Would You Rather Answers:</h2>
        <ul className="list-disc">
          {friendInfo.answers.map((answer, index) => (
            <li key={index} className="mb-1">{answer}</li>
          ))}
        </ul>
      </div>
      <div className="w-full max-w-lg">
        <h2 className="text-xl font-bold mb-2">Drawings:</h2>
        <div className="grid grid-cols-2 gap-4">
          {friendInfo.drawings.map((drawing, index) => (
            <img key={index} src={drawing} alt={`Drawing ${index + 1}`} className="border border-gray-300 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutFriend;
