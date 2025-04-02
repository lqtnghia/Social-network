import { createContext, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4010/', {
  autoConnect: false,
  path: 'api',
});

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

const SocketProvider = ({ children }) => {
  const token = useSelector((store) => store.auth.accessToken);
  useEffect(() => {
    socket.auth = { token };
    socket.connect();
    socket.on('connect', () => {
      console.log('Connected to socket server');
    });
    socket.on('disconnect', () => {
      console.log('Disconnected to socket server');
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.disconnect();
    };
  }, [token]);
  return (
    // các biến để trong value thì các con cháu được bọc bằng context  này thì sẽ đều truy xuất đến và sử dụng được
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
