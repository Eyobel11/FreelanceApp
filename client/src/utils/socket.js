import { io } from 'socket.io-client';

// Replace with your backend's socket.io server URL
const SOCKET_URL = 'https://freelanceapp-backend.onrender.com'; 

const socket = io(SOCKET_URL, {
  transports: ['websocket'],
  upgrade: false,
});

export default socket;
