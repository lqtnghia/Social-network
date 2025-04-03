import { io } from 'socket.io-client';

let socketInstance = null;

const initializeSocket = (userId, token) => {
  if (!socketInstance) {
    socketInstance = io(
      import.meta.env.VITE_BASE_URL || 'http://localhost:4010',
      {
        autoConnect: false, // Không tự động kết nối
        path: '/socket.io', // Đồng bộ với server
        auth: { token }, // Gửi token ngay từ đầu
        reconnection: true,
        reconnectionAttempts: 5,
      },
    );

    socketInstance.on('connect', () => {
      console.log('Socket connected:', socketInstance.id);
      if (userId) {
        socketInstance.emit('join', userId);
      }
    });

    socketInstance.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    socketInstance.on('connect_error', (error) => {
      console.error('Socket connection error:', error.message);
    });
  }

  return socketInstance;
};

const getSocket = () => {
  if (!socketInstance) {
    throw new Error('Socket has not been initialized');
  }
  return socketInstance;
};

const disconnectSocket = () => {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }
};

export { initializeSocket, getSocket, disconnectSocket };
