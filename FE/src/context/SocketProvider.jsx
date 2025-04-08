// import { createContext, useContext, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { io } from 'socket.io-client';

// const socket = io('http://localhost:4010', {
//   autoConnect: false,
//   path: '/api/socket.io',
// });

// const SocketContext = createContext();

// export const useSocketContext = () => {
//   return useContext(SocketContext);
// };

// const SocketProvider = ({ children }) => {
//   const token = useSelector((store) => store.auth.accessToken);

//   useEffect(() => {
//     if (token) {
//       console.log('Socket.IO: Connecting with token:', token);
//       socket.auth = { token };
//       socket.connect();

//       socket.on('connect', () => {
//         console.log('Socket.IO: Connected to socket server');
//       });

//       socket.on('connect_error', (error) => {
//         console.error('Socket.IO: Connection error:', error.message);
//       });

//       socket.on('disconnect', () => {
//         console.log('Socket.IO: Disconnected from socket server');
//       });
//     }

//     return () => {
//       socket.off('connect');
//       socket.off('connect_error');
//       socket.off('disconnect');
//       socket.disconnect();
//     };
//   }, [token]);

//   return (
//     <SocketContext.Provider value={{ socket }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

// export default SocketProvider;

import { createContext, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

// Khởi tạo socket
const socket = io('http://localhost:4010', {
  autoConnect: false,
  path: '/api/socket.io',
});

const SocketContext = createContext();

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocketContext must be used within a SocketProvider');
  }
  return context;
};

const SocketProvider = ({ children }) => {
  const token = useSelector((store) => store.auth.accessToken);

  useEffect(() => {
    if (token) {
      console.log('Socket.IO: Connecting with token:', token);
      socket.auth = { token };
      socket.connect();

      socket.on('connect', () => {
        console.log('Socket.IO: Connected to socket server');
      });

      socket.on('connect_error', (error) => {
        console.error('Socket.IO: Connection error:', error.message);
      });

      socket.on('disconnect', (reason) => {
        console.log(
          'Socket.IO: Disconnected from socket server, reason:',
          reason,
        );
      });

      // Log tất cả sự kiện nhận được để debug
      socket.onAny((event, ...args) => {
        console.log(`Socket.IO: Received event: ${event}`, args);
      });
    }

    return () => {
      socket.off('connect');
      socket.off('connect_error');
      socket.off('disconnect');
      socket.offAny();
      socket.disconnect();
    };
  }, [token]);

  const value = { socket };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
