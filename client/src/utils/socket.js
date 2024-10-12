import { io } from 'socket.io-client';

// Replace with your backend's socket.io server URL
const SOCKET_URL = 'http://localhost:5000'; 

const socket = io(SOCKET_URL, {
  transports: ['websocket'],
  upgrade: false,
});

export default socket;
