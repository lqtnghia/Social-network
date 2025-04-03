// import { createContext, useContext, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { io } from 'socket.io-client';

// const socket = io('http://localhost:4010/', {
//   autoConnect: false,
//   path: 'api',
// });

// const SocketContext = createContext();

// export const useSocketContext = () => {
//   return useContext(SocketContext);
// };

// const SocketProvider = ({ children }) => {
//   const token = useSelector((store) => store.auth.accessToken);
//   useEffect(() => {
//     socket.auth = { token };
//     socket.connect();
//     socket.on('connect', () => {
//       console.log('Connected to socket server');
//     });
//     socket.on('disconnect', () => {
//       console.log('Disconnected to socket server');
//     });

//     return () => {
//       socket.off('connect');
//       socket.off('disconnect');
//       socket.disconnect();
//     };
//   }, [token]);
//   return (
//     // các biến để trong value thì các con cháu được bọc bằng context  này thì sẽ đều truy xuất đến và sử dụng được
//     <SocketContext.Provider value={{ socket }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

// export default SocketProvider;

import { createContext, useContext, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

const SocketProvider = ({ children }) => {
  const token = useSelector((store) => store.auth.accessToken);
  const user = useSelector((store) => store.auth.user);

  const socket = useMemo(() => {
    // Loại bỏ '/api' khỏi base URL
    const baseUrl = (
      import.meta.env.VITE_BASE_URL || 'http://localhost:4010'
    ).replace(/\/api$/, '');
    console.log('Khởi tạo socket với URL:', baseUrl);
    const socketInstance = io(baseUrl, {
      autoConnect: false,
      path: '/socket.io',
    });
    return socketInstance;
  }, []);

  useEffect(() => {
    if (token && user?.id) {
      console.log('Kết nối với token:', token, 'User ID:', user.id);
      socket.auth = { token };
      socket.connect();

      socket.on('connect', () => {
        console.log('Đã kết nối đến server:', socket.id);
        socket.emit('join', user.id);
      });

      socket.on('connect_error', (error) => {
        console.error('Lỗi kết nối:', error.message, error.stack);
      });

      socket.on('disconnect', (reason) => {
        console.log('Đã ngắt kết nối:', reason);
      });

      return () => {
        socket.off('connect');
        socket.off('connect_error');
        socket.off('disconnect');
        socket.disconnect();
      };
    } else {
      console.warn('Không có token hoặc user ID, bỏ qua kết nối');
    }
  }, [token, user?.id, socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
