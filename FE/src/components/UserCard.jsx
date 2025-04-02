import { Check, Close, MessageOutlined, PersonAdd } from '@mui/icons-material';
import { Avatar, Button, CircularProgress } from '@mui/material';
import { useSendFriendRequestMutation } from '@services/rootApi';
import React from 'react';
import { Link } from 'react-router-dom';

const UserCard = ({
  id,
  isFriend,
  fullName = '',
  requestSent,
  requestReceived,
  refetch,
}) => {
  const [sendFriendRequest, { isLoading }] = useSendFriendRequestMutation();

  const handleSendFriendRequest = async () => {
    try {
      await sendFriendRequest(id).unwrap(); // Gửi yêu cầu kết bạn
      refetch(); // Gọi refetch để làm mới dữ liệu
    } catch (error) {
      console.error('Failed to send friend request:', error);
    }
  };

  function getActionButtons() {
    if (isFriend) {
      return (
        <Button variant="contained" size="small">
          <MessageOutlined fontSize="small" /> Message
        </Button>
      );
    }
    if (requestSent) {
      return (
        <Button variant="contained" size="small" disabled>
          <Check fontSize="small" /> Request Sent
        </Button>
      );
    }
    if (requestReceived) {
      return (
        <div className="!space-x-1">
          <Button variant="contained" size="small">
            <Check fontSize="small" className="!mr-1" /> Accept
          </Button>
          <Button variant="contained" size="small">
            <Close fontSize="small" className="!mr-1" /> Cancel
          </Button>
        </div>
      );
    }
    return (
      <Button
        variant="outlined"
        size="small"
        onClick={() => handleSendFriendRequest()}
        disabled={isLoading}
      >
        {isLoading ? (
          <CircularProgress className="!mr-1 animate-spin" size="16px" />
        ) : (
          <PersonAdd fontSize="small" className="!mr-1" />
        )}
        Add Friend
      </Button>
    );
  }
  return (
    <div className="card bg-slate- flex flex-col items-center bg-slate-500">
      <Avatar className="!bg-primary-main !mb-3 !h-12 !w-12">
        {fullName.split(' ').slice(-1)[0].charAt(0).toUpperCase()}
      </Avatar>
      <Link className="text-lg font-bold">{fullName}</Link>
      <div className="!mt-4">{getActionButtons()}</div>
    </div>
  );
};

export default UserCard;
