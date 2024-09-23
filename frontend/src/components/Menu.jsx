// /frontend/src/components/Menu.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100">
      <h1 className="text-3xl font-bold mb-6">Menu</h1>
      <button
        onClick={() => navigate('/would-you-rather')}
        className="bg-purple-500 text-white px-6 py-2 rounded mb-4 hover:bg-purple-700"
      >
        Would You Rather
      </button>
      <button
        onClick={() => navigate('/drawing-board')}
        className="bg-yellow-500 text-white px-6 py-2 rounded mb-4 hover:bg-yellow-600"
      >
        Collaborative Drawing Board
      </button>
      <button
        onClick={() => navigate('/about-friend')}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        About Your Friend
      </button>
    </div>
  );
};

export default Menu;
