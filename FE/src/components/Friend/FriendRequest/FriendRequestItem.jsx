import Button from '@components/Button/Button';
import { Check, Close } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import {
  useAcceptFriendRequestMutation,
  useCancelFriendRequestMutation,
} from '@services/rootApi';
import React from 'react';

const FriendRequestItem = ({ fullName = '', id, onRequestAccepted }) => {
  const [acceptFriendRequest, { isLoading: isAccepting }] =
    useAcceptFriendRequestMutation();
  const [cancelFriendRequest, { isLoading: isCanceling }] =
    useCancelFriendRequestMutation();

  const handleAccept = async () => {
    try {
      console.log('Accepting friend request for senderId:', id);
      await acceptFriendRequest(id).unwrap();
      onRequestAccepted(id);
    } catch (error) {
      console.error('Lỗi khi chấp nhận yêu cầu kết bạn:', error);
      alert(
        'Đã có lỗi xảy ra khi chấp nhận yêu cầu kết bạn. Vui lòng thử lại.',
      );
    }
  };

  const handleCancel = async () => {
    try {
      console.log('Canceling friend request for senderId:', id);
      await cancelFriendRequest(id).unwrap();
      onRequestAccepted(id);
    } catch (error) {
      console.error('Lỗi khi hủy yêu cầu kết bạn:', error);
      if (
        error.status === 400 &&
        error.data.message.includes('Yêu cầu kết bạn không tồn tại')
      ) {
        onRequestAccepted(id);
      } else {
        alert('Đã có lỗi xảy ra khi hủy yêu cầu kết bạn. Vui lòng thử lại.');
      }
    }
  };

  return (
    <div className="bg-primary-dark flex flex-col gap-2 rounded !p-3">
      <div className="flex gap-2">
        <div>
          <Avatar className="!bg-primary-main">
            {fullName.split(' ').slice(-1)[0].charAt(0).toUpperCase()}
          </Avatar>
        </div>
        <div>
          <p className="font-bold">{fullName}</p>
          <p className="text-dark-400 text-sm"> 4 mutual friends</p>
        </div>
      </div>
      <div className="!mt-2 flex justify-center !space-x-1">
        <Button
          size="small"
          variant="contained"
          onClick={handleAccept}
          icon={<Check className="!mr-1" fontSize="small" />}
          isLoading={isAccepting}
        >
          Accept
        </Button>
        <Button
          size="small"
          variant="outlined"
          onClick={handleCancel}
          icon={<Close className="!mr-1" fontSize="small" />}
          isLoading={isCanceling}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default FriendRequestItem;
