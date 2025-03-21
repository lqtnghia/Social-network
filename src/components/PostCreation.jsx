import { Collections, InsertEmoticon, Videocam } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Stack,
  TextareaAutosize,
  TextField,
} from '@mui/material';
import { openDialog } from '@redux/slices/dialogSlice';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';

export const ImageUploader = ({ image, setImage }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      // Do something with the files
      console.log(acceptedFiles);
      setImage(acceptedFiles[0]);
    },
    [setImage],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxFiles: 1,
    accept: '.jpg, .jpeg, .png',
  });

  return (
    <div>
      <div
        {...getRootProps({
          className:
            'rounded border bg-slate-100 px-6 py-4 text-center cursor-pointer h-20 flex items-center justify-center',
        })}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      {image?.name && (
        <Stack className="mt-2">
          <Chip
            label={image.name}
            onDelete={() => {
              setImage(null);
            }}
            className="font-bold"
          />
        </Stack>
      )}
    </div>
  );
};

const PostCreation = () => {
  const userInfo = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <div className="rounded bg-white shadow">
      <div className="flex gap-2 !p-4">
        <Avatar className="!bg-primary-main">
          {userInfo?.fullName
            ? userInfo.fullName.split(' ').slice(-1)[0].charAt(0).toUpperCase()
            : ''}
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
      <div>
        <Divider
          sx={{
            borderBottomWidth: 2,
            borderBottomStyle: 'solid',
            borderBottomColor: '-moz-initial',
            backgroundColor: 'transparent',
            px: '2px',
          }}
        />
        <div className="flex items-center justify-center !p-2">
          <div className="flex flex-1 justify-center">
            <IconButton
              className="flex w-full gap-1"
              onClick={() => {
                dispatch(
                  openDialog({
                    open: true,
                    title: 'Live Video ',
                    contentType: 'LIVE_DIALOG',
                  }),
                );
              }}
            >
              <Videocam color="error" />
              <p className="text-sm">Live video</p>
            </IconButton>
          </div>
          <div className="flex flex-1 justify-center">
            <IconButton className="flex w-full gap-1">
              <Collections color="success" />
              <p className="text-sm">Photo/video</p>
            </IconButton>
          </div>
          <div className="flex flex-1 justify-center">
            <IconButton className="flex w-full gap-1">
              <InsertEmoticon color="warning" />
              <p className="text-sm">Feeling/activity</p>
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCreation;
