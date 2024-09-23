// /frontend/src/components/DrawingBoard.jsx
import React, { useRef, useState } from 'react';
import socket from '../socket';

const DrawingBoard = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [done, setDone] = useState(false);
  const [receivedDrawing, setReceivedDrawing] = useState('');

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current.getContext('2d');
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current.getContext('2d');
    context.lineTo(offsetX, offsetY);
    context.stroke();
    socket.emit('draw', { offsetX, offsetY });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    socket.emit('done');
  };

  const handleDone = () => {
    setDone(true);
    // Optionally, save the drawing or perform another action
  };

  socket.on('draw', (data) => {
    const context = canvasRef.current.getContext('2d');
    context.lineTo(data.offsetX, data.offsetY);
    context.stroke();
  });

  socket.on('done', () => {
    // Swap drawings logic
    const drawingData = canvasRef.current.toDataURL();
    setReceivedDrawing(drawingData);
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-yellow-100">
      {!done ? (
        <>
          <h2 className="text-xl font-bold mb-4">Draw something for your friend!</h2>
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            width="600"
            height="400"
            className="border border-gray-300"
          />
          <button
            onClick={handleDone}
            className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-700"
          >
            Done
          </button>
        </>
      ) : receivedDrawing ? (
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">Here is your friend's drawing!</h2>
          <img src={receivedDrawing} alt="Friend's Drawing" className="border border-gray-300" />
        </div>
      ) : (
        <p>Waiting for your friend to finish...</p>
      )}
    </div>
  );
};

export default DrawingBoard;
