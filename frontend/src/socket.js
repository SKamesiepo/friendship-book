// /frontend/src/socket.js
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Connect to your backend server

export default socket;
