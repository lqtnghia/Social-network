import { ImageUploader } from '@components/PostCreation';
import {
  Avatar,
  Button,
  DialogActions,
  DialogContent,
  TextareaAutosize,
} from '@mui/material';
import React from 'react';

const NewPostDialog = ({ userInfo }) => (
  <div>
    <DialogContent className="!pt-4">
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
    </DialogContent>
    <DialogActions className="!py-6 !pt-0 !pb-5">
      <Button fullWidth variant="contained">
        Post
      </Button>
    </DialogActions>
  </div>
);

export default NewPostDialog;
