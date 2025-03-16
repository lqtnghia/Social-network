import {
  Avatar,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog as MUIDialog,
  TextareaAutosize,
} from '@mui/material';
import { closeDialog } from '@redux/slices/dialogSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ImageUploader } from './PostCreation';

const NewPostDialogContent = ({ userInfo }) => (
  <div>
    <div className="flex items-center gap-2">
      <Avatar
        className="!bg-primary-main"
        sx={{ width: '32px', height: '32px' }}
      >
        {
          userInfo?.fullName
            ? userInfo.fullName
                .split(' ') // Tách chuỗi thành mảng các từ
                .slice(-1)[0] // Lấy từ cuối cùng
                .charAt(0) // Lấy ký tự đầu tiên của từ cuối cùng
                .toUpperCase() // Chuyển thành in hoa
            : '' // Giá trị mặc định nếu userInfo hoặc fullName không tồn tại
        }
      </Avatar>
      <p>{userInfo?.fullName}</p>
    </div>
    <TextareaAutosize
      minRows={3}
      placeholder="What's on your mind?"
      className="!mt-4 w-full !p-2"
    />
    <ImageUploader />
  </div>
);

const DynamicContent = ({ contentType, additionalData }) => {
  switch (contentType) {
    case 'NEW_POST_DIALOG':
      return <NewPostDialogContent userInfo={additionalData} />;
    default:
      return <p></p>;
  }
};

const Dialog = () => {
  const dialog = useSelector((state) => state.dialog);
  const dispatch = useDispatch();

  return (
    <div>
      <MUIDialog
        open={dialog.open}
        maxWidth={dialog.maxWidth}
        fullWidth={dialog.fullWidth}
        onClose={() => dispatch(closeDialog())}
      >
        <DialogTitle>{dialog.title}</DialogTitle>
        <DialogContent>
          <DynamicContent
            contentType={dialog.contentType}
            additionalData={dialog.additionalData}
          />
        </DialogContent>
        <DialogActions>{dialog.actions}</DialogActions>
      </MUIDialog>
    </div>
  );
};

export default Dialog;
