// import { Info, Phone, Videocam } from '@mui/icons-material';
// import { Avatar, Box, IconButton } from '@mui/material';
// import React from 'react';

// const Message = () => {
//   return (
//     <div className="bg-primary-dark !mt-4 h-screen rounded shadow">
//       <div>
//         <Box
//           className="flex justify-between"
//           sx={{
//             padding: '8px 12px',
//             borderRadius: '8px',
//             transition: 'background-color 0.2s ease',
//             '&:hover': {
//               backgroundColor: '#f5f6f8',
//               color: '#1a73e8',
//             },
//           }}
//         >
//           <div className="flex">
//             <Avatar
//               className="!bg-primary-main"
//               sx={{ width: 40, height: 40, fontSize: 15, marginRight: 1 }}
//             >
//               {'Nguyễn Gia Hưng'
//                 .split(' ')
//                 .slice(-1)[0]
//                 .charAt(0)
//                 .toUpperCase()}
//             </Avatar>
//             <div className="flex flex-col justify-center">
//               <p className="text-sm font-bold">Nguyễn Gia Hưng</p>
//               <p className="text-dark-400 text-sm">Active now</p>
//             </div>
//           </div>
//           <div className="flex justify-center gap-4">
//             <IconButton size="medium" sx={{ backgroundColor: '#273352' }}>
//               <Phone fontSize="medium" />
//             </IconButton>
//             <IconButton size="medium" sx={{ backgroundColor: '#273352' }}>
//               <Videocam fontSize="medium" />
//             </IconButton>
//             <IconButton size="medium" sx={{ backgroundColor: '#273352' }}>
//               <Info fontSize="medium" />
//             </IconButton>
//           </div>
//         </Box>
//       </div>
//     </div>
//   );
// };

// export default Message;

import { Info, Phone, Videocam, Send } from '@mui/icons-material';
import { Avatar, Box, IconButton, TextField } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import {
  useGetMessagesQuery,
  useCreateMessageMutation,
  useMarkMessagesAsSeenMutation,
} from '@services/rootApi';
import { useSocketContext } from '@components/SocketProvider'; // Điều chỉnh đường dẫn
import { useSelector } from 'react-redux';

const Message = ({ selectedUserId }) => {
  const currentUserId = useSelector((store) => store.auth.user?.id);
  const { socket } = useSocketContext();

  // Lấy tin nhắn
  const {
    data: messages,
    refetch: refetchMessages,
    isLoading,
    error,
  } = useGetMessagesQuery(
    { userId: selectedUserId },
    { skip: !selectedUserId },
  );

  // Gửi tin nhắn mới
  const [createMessage] = useCreateMessageMutation();

  // Đánh dấu tin nhắn đã xem
  const [markMessagesAsSeen] = useMarkMessagesAsSeenMutation();

  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null); // Ref để auto-scroll

  // Auto-scroll xuống tin nhắn mới nhất
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Lắng nghe tin nhắn mới qua Socket.IO
  useEffect(() => {
    if (socket) {
      socket.on('new-message', (message) => {
        if (message.sender._id === selectedUserId) {
          refetchMessages();
        }
      });
    }

    return () => {
      if (socket) {
        socket.off('new-message');
      }
    };
  }, [socket, selectedUserId, refetchMessages]);

  // Đánh dấu tin nhắn đã xem khi mở cuộc trò chuyện
  useEffect(() => {
    if (selectedUserId) {
      markMessagesAsSeen({ sender: selectedUserId });
    }
  }, [selectedUserId, markMessagesAsSeen]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      await createMessage({
        message: newMessage,
        receiver: selectedUserId,
      });
      setNewMessage('');
    }
  };

  if (isLoading) {
    return <div className="p-4 text-center">Đang tải tin nhắn...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        Lỗi khi tải tin nhắn: {error.message}
      </div>
    );
  }

  return (
    <div className="bg-primary-dark !mt-4 flex h-screen flex-col rounded shadow">
      {/* Header */}
      <Box
        className="flex justify-between"
        sx={{
          padding: '8px 12px',
          borderRadius: '8px',
          transition: 'background-color 0.2s ease',
          '&:hover': {
            backgroundColor: '#f5f6f8',
            color: '#1a73e8',
          },
        }}
      >
        <div className="flex">
          <Avatar
            className="!bg-primary-main"
            sx={{ width: 40, height: 40, fontSize: 15, marginRight: 1 }}
          >
            {selectedUserId?.charAt(0).toUpperCase()}
          </Avatar>
          <div className="flex flex-col justify-center">
            <p className="text-sm font-bold">
              {messages?.[0]?.sender._id === selectedUserId
                ? messages?.[0]?.sender.fullName
                : messages?.[0]?.receiver.fullName}
            </p>
            <p className="text-dark-400 text-sm">Active now</p>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <IconButton size="medium" sx={{ backgroundColor: '#273352' }}>
            <Phone fontSize="medium" />
          </IconButton>
          <IconButton size="medium" sx={{ backgroundColor: '#273352' }}>
            <Videocam fontSize="medium" />
          </IconButton>
          <IconButton size="medium" sx={{ backgroundColor: '#273352' }}>
            <Info fontSize="medium" />
          </IconButton>
        </div>
      </Box>

      {/* Message List */}
      <div className="flex-1 !space-y-4 overflow-y-auto !p-4">
        {messages?.map((message) => (
          <div
            key={message._id}
            className={`flex ${
              message.sender._id === currentUserId
                ? 'justify-end'
                : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs rounded-lg !p-3 ${
                message.sender._id === currentUserId
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
            >
              <p className="text-sm">{message.message}</p>
              <p className="!mt-1 text-xs opacity-70">
                {new Date(message.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-700 !p-4">
        <Box className="flex items-center gap-2">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Nhập tin nhắn..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
                backgroundColor: '#f5f6f8',
              },
            }}
          />
          <IconButton
            onClick={handleSendMessage}
            sx={{
              backgroundColor: '#273352',
              '&:hover': { backgroundColor: '#1a73e8' },
            }}
          >
            <Send fontSize="medium" />
          </IconButton>
        </Box>
      </div>
    </div>
  );
};

export default Message;
