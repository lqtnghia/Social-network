// import { ImageUploader } from '@components/PostCreation';
// import {
//   Avatar,
//   Button,
//   CircularProgress,
//   DialogActions,
//   DialogContent,
//   TextareaAutosize,
// } from '@mui/material';
// import { closeDialog } from '@redux/slices/dialogSlice';
// import { openSnackbar } from '@redux/slices/snackbarSlice';
// import { useCreatePostMutation, rootApi } from '@services/rootApi';
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';

// const NewPostDialog = ({ userInfo }) => {
//   const [image, setImage] = useState(null);

//   // eslint-disable-next-line no-unused-vars
//   const [createNewPost, { data, isSuccess, isLoading }] =
//     useCreatePostMutation();

//   const [content, setContent] = useState('');
//   const dispatch = useDispatch();

//   const handelCreateNewPost = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('content', content);
//       formData.append('image', image);

//       console.log('Dữ liệu gửi đi:', { content, image });
//       const result = await createNewPost(formData).unwrap();
//       console.log('Phản hồi từ createPost:', result);

//       //qt
//       dispatch(
//         rootApi.endpoints.getPosts.initiate(undefined, { forceRefetch: true }),
//       );

//       dispatch(closeDialog());
//       dispatch(openSnackbar({ message: 'Create Post Successfully!' }));
//     } catch (err) {
//       console.error('Lỗi khi tạo bài đăng:', err);
//       dispatch(openSnackbar({ type: 'error', message: err?.data?.message }));
//     }
//   };
//   const isValid = !!(content || image);

//   return (
//     <div>
//       <DialogContent className="!pt-4">
//         <div className="flex items-center gap-2">
//           <Avatar
//             className="!bg-primary-main"
//             sx={{ width: '32px', height: '32px' }}
//           >
//             {userInfo.fullName.split(' ').slice(-1)[0].charAt(0).toUpperCase()}
//           </Avatar>
//           <p>{userInfo?.fullName}</p>
//         </div>
//         <TextareaAutosize
//           minRows={3}
//           placeholder="What's on your mind?"
//           className="!mt-4 w-full !p-2"
//           value={content}
//           onChange={(e) => {
//             setContent(e.target.value);
//           }}
//         />
//         <ImageUploader image={image} setImage={setImage} />
//       </DialogContent>
//       <DialogActions className="!py-6 !pt-0 !pb-5">
//         <Button
//           disabled={!isValid}
//           fullWidth
//           variant="contained"
//           onClick={() => {
//             handelCreateNewPost();
//           }}
//         >
//           {isLoading && <CircularProgress size="20px" className="mr-1" />}
//           Post
//         </Button>
//       </DialogActions>
//     </div>
//   );
// };

// export default NewPostDialog;

import { ImageUploader } from '@components/PostCreation';
import {
  Avatar,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  TextareaAutosize,
} from '@mui/material';
import { closeDialog } from '@redux/slices/dialogSlice';
import { openSnackbar } from '@redux/slices/snackbarSlice';
import { useCreatePostMutation, rootApi } from '@services/rootApi';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const NewPostDialog = ({ userInfo }) => {
  const [image, setImage] = useState(null);
  const [createNewPost, { data, isSuccess, isLoading }] =
    useCreatePostMutation();
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const handelCreateNewPost = async () => {
    try {
      const formData = new FormData();
      formData.append('content', content);
      formData.append('image', image);

      console.log('Dữ liệu gửi đi:', { content, image });
      const result = await createNewPost(formData).unwrap();
      console.log('Phản hồi từ createPost:', result);

      // Gọi getPosts với tham số phù hợp
      dispatch(
        rootApi.endpoints.getPosts.initiate(
          { offset: 0, limit: 10 },
          { forceRefetch: true },
        ),
      );

      dispatch(closeDialog());
      dispatch(openSnackbar({ message: 'Create Post Successfully!' }));
    } catch (err) {
      console.error('Lỗi khi tạo bài đăng:', err);
      dispatch(openSnackbar({ type: 'error', message: err?.data?.message }));
    }
  };

  const isValid = !!(content || image);

  return (
    <div>
      <DialogContent className="!pt-4">
        <div className="flex items-center gap-2">
          <Avatar
            className="!bg-primary-main"
            sx={{ width: '32px', height: '32px' }}
          >
            {userInfo.fullName.split(' ').slice(-1)[0].charAt(0).toUpperCase()}
          </Avatar>
          <p>{userInfo?.fullName}</p>
        </div>
        <TextareaAutosize
          minRows={3}
          placeholder="What's on your mind?"
          className="!mt-4 w-full !p-2"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <ImageUploader image={image} setImage={setImage} />
      </DialogContent>
      <DialogActions className="!py-6 !pt-0 !pb-5">
        <Button
          disabled={!isValid}
          fullWidth
          variant="contained"
          onClick={() => {
            handelCreateNewPost();
          }}
        >
          {isLoading && <CircularProgress size="20px" className="mr-1" />}
          Post
        </Button>
      </DialogActions>
    </div>
  );
};

export default NewPostDialog;
