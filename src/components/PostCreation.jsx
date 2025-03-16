import { Avatar, Button, TextareaAutosize, TextField } from '@mui/material';
import { openDialog } from '@redux/slices/dialogSlice';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';

export const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles);
    setImage(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxFiles: 1,
    accept: '.jpg, .jpeg, .png',
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
      <div>{image?.name}</div>
    </div>
  );
};

const PostCreation = () => {
  const userInfo = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  return (
    <div className="flex gap-2 rounded bg-white !p-4 shadow">
      <Avatar className="!bg-primary-main">
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
      <TextField
        className="flex-1"
        size="small"
        placeholder="What's on your mind?"
        onClick={() => {
          dispatch(
            openDialog({
              open: true,
              title: 'Create Post ',
              contentType: 'NEW_POST_DIALOG',
              additionalData: userInfo,
              // actions: (
              //   <Button
              //     variant="contained"
              //     color="primary"
              //     onClick={() => dispatch(closeDialog())}
              //   >
              //     Post
              //   </Button>
              // ),
            }),
          );
        }}
      />
    </div>
  );
};

export default PostCreation;
