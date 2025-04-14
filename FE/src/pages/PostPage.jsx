import Loading from '@components/Loading/Loading';
import { Comment, ThumbUp } from '@mui/icons-material';
import { Avatar, Button } from '@mui/material';
import { useGetPostByIdQuery } from '@services/rootApi';
import dayjs from 'dayjs';
import React from 'react';

import { useParams } from 'react-router-dom';

const PostPage = () => {
  const { id } = useParams();
  const { data: post, isError, isLoading, error } = useGetPostByIdQuery(id);

  // console.log(post);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <div>Error: {error?.data?.message || 'Failed to load post'}</div>;
  }

  if (!post) {
    return <div>No post found</div>;
  }
  return (
    <div className="bg-primary-bgdark flex h-screen gap-2 !p-6">
      <div className="bg-primary-dark flex-3">
        {post.image && (
          <img
            src={`http://localhost:4010${post.image}`}
            className="!mx-auto max-h-[730px] !p-3"
          />
        )}
      </div>
      <div className="bg-primary-dark flex-1 !p-6">
        <div className="!mb-3 flex items-start justify-between gap-3">
          <div className="flex gap-3">
            <Avatar className="!bg-primary-main">
              {post.fullName.split(' ').slice(-1)[0].charAt(0).toUpperCase()}
            </Avatar>
            <div>
              <p className="font-bold">{post.fullName}</p>
              <p className="text-dark-400 text-sm">
                {dayjs(post.createAt).format('DD/MM/YYYY HH:mm')}
              </p>
            </div>
          </div>
        </div>
        <p className="!mb-2">{post.content}</p>
        <div className="!my-2 flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm">
            <ThumbUp fontSize="small" className="text-primary-main" />
            <p>{post.likes.length}</p>
          </div>
          <div className="text-sm">
            <p>{post.comments.length} comments</p>
          </div>
        </div>
        <div className="!border-dark-200 flex !border-t !border-b !py-1 text-sm">
          <Button size="small" className="flex-1 !text-white">
            <ThumbUp fontSize="small" className="!mr-1" /> Like
          </Button>
          <Button size="small" className="flex-1 !text-white">
            <Comment fontSize="small" className="!mr-1" /> Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostPage;

// import Loading from '@components/Loading/Loading';
// import {
//   Comment as CommentIcon,
//   ThumbUp,
//   Favorite,
//   EmojiEmotions,
//   Gif,
//   Photo,
// } from '@mui/icons-material';
// import {
//   Avatar,
//   Button,
//   TextField,
//   Typography,
//   IconButton,
// } from '@mui/material';
// import { useGetPostByIdQuery } from '@services/rootApi';
// import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime'; // Để tính thời gian tương đối (ví dụ: "3D")
// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';

// // Thêm plugin để tính thời gian tương đối
// dayjs.extend(relativeTime);

// const PostPage = () => {
//   const { id } = useParams();
//   const { data: post, isError, isLoading, error } = useGetPostByIdQuery(id);
//   console.log(post);

//   // State để quản lý nội dung bình luận mới
//   const [newComment, setNewComment] = useState('');

//   if (isLoading) {
//     return <Loading />;
//   }
//   if (isError) {
//     return <div>Error: {error?.data?.message || 'Failed to load post'}</div>;
//   }
//   if (!post) {
//     return <div>No post found</div>;
//   }

//   // Hàm xử lý khi gửi bình luận (tạm thời log ra console)
//   const handleSubmitComment = () => {
//     if (newComment.trim()) {
//       console.log('New comment:', newComment);
//       // TODO: Gọi API để gửi bình luận lên server
//       setNewComment(''); // Xóa ô nhập sau khi gửi
//     }
//   };

//   return (
//     <div className="bg-primary-bgdark flex h-screen gap-2 !p-6">
//       <div className="bg-primary-dark flex-3">
//         {post.image && (
//           <img
//             src={`http://localhost:4010${post.image}`}
//             className="!mx-auto max-h-[730px] !p-3"
//             alt="Post"
//           />
//         )}
//       </div>
//       <div className="bg-primary-dark flex-1 !p-6">
//         {/* Thông tin bài đăng */}
//         <div className="!mb-3 flex items-start justify-between gap-3">
//           <div className="flex gap-3">
//             <Avatar className="!bg-primary-main">
//               {post.fullName.split(' ').slice(-1)[0].charAt(0).toUpperCase()}
//             </Avatar>
//             <div>
//               <p className="font-bold">{post.fullName}</p>
//               <p className="text-dark-400 text-sm">
//                 {dayjs(post.createdAt).format('DD/MM/YYYY HH:mm')}
//               </p>
//             </div>
//           </div>
//         </div>
//         <p className="!mb-2">{post.content}</p>
//         <div className="!my-2 flex items-center justify-between">
//           <div className="flex items-center gap-1 text-sm">
//             <ThumbUp fontSize="small" className="text-primary-main" />
//             <p>{post.likes.length}</p>
//           </div>
//           <div className="text-sm">
//             <p>{post.comments.length} comments</p>
//           </div>
//         </div>
//         <div className="!border-dark-200 flex !border-t !border-b !py-1 text-sm">
//           <Button size="small" className="!text-dark-100 flex-1">
//             <ThumbUp fontSize="small" className="!mr-1" /> Like
//           </Button>
//           <Button size="small" className="!text-dark-100 flex-1">
//             <CommentIcon fontSize="small" className="!mr-1" /> Comment
//           </Button>
//         </div>

//         {/* Phần bình luận */}
//         <div className="mt-4">
//           {/* Danh sách bình luận */}
//           <div className="max-h-[300px] overflow-y-auto">
//             {post.comments.length > 0 ? (
//               post.comments.map((comment) => (
//                 <div key={comment.id} className="mb-3 flex gap-2">
//                   <Avatar
//                     src={
//                       comment.user.imageAva
//                         ? `http://localhost:4010${comment.user.imageAva}`
//                         : undefined
//                     }
//                     className="!h-8 !w-8"
//                   >
//                     {!comment.user.imageAva &&
//                       comment.user.fullName
//                         .split(' ')
//                         .slice(-1)[0]
//                         .charAt(0)
//                         .toUpperCase()}
//                   </Avatar>
//                   <div className="flex-1">
//                     <div className="relative rounded-lg bg-[#3A3B3C] p-2">
//                       <Typography
//                         variant="body2"
//                         className="font-bold text-white"
//                       >
//                         {comment.user.fullName}
//                       </Typography>
//                       <Typography variant="body2" className="text-white">
//                         {comment.content}
//                       </Typography>
//                       {/* Giả sử có emoji trong nội dung, bạn có thể tách và hiển thị riêng */}
//                       {comment.content.includes('😆') && (
//                         <span className="absolute top-2 right-2">😆</span>
//                       )}
//                     </div>
//                     <div className="mt-1 flex items-center gap-2">
//                       <Typography variant="caption" className="text-dark-400">
//                         {dayjs(comment.createdAt).fromNow(true).toUpperCase()}
//                       </Typography>
//                       <Button
//                         size="small"
//                         className="!text-dark-400 !text-xs !capitalize"
//                       >
//                         Like
//                       </Button>
//                       <Button
//                         size="small"
//                         className="!text-dark-400 !text-xs !capitalize"
//                       >
//                         Reply
//                       </Button>
//                       {/* Giả sử số lượt thích là 0 nếu không có dữ liệu */}
//                       {comment.likes?.length > 0 && (
//                         <Typography variant="caption" className="text-dark-400">
//                           {comment.likes.length}
//                           {comment.likes.length > 1 ? (
//                             <Favorite
//                               fontSize="small"
//                               className="ml-1 text-red-500"
//                             />
//                           ) : (
//                             <ThumbUp
//                               fontSize="small"
//                               className="ml-1 text-blue-500"
//                             />
//                           )}
//                         </Typography>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <Typography variant="body2" className="text-dark-400">
//                 No comments yet. Be the first to comment!
//               </Typography>
//             )}
//           </div>

//           {/* Ô nhập bình luận */}
//           <div className="mt-4 flex items-center gap-2">
//             <Avatar className="!h-8 !w-8">
//               {/* Giả sử người dùng hiện tại */}
//               {'U'}
//             </Avatar>
//             <div className="relative flex-1">
//               <TextField
//                 variant="outlined"
//                 placeholder="Write a comment..."
//                 value={newComment}
//                 onChange={(e) => setNewComment(e.target.value)}
//                 className="w-full"
//                 InputProps={{
//                   className: 'bg-[#3A3B3C] text-white !rounded-full  !px-3',
//                 }}
//                 sx={{
//                   '& .MuiOutlinedInput-root': {
//                     '& fieldset': { border: 'none' },
//                     '&:hover fieldset': { border: 'none' },
//                     '&.Mui-focused fieldset': { border: 'none' },
//                   },
//                 }}
//               />
//               <div className="absolute top-1/2 right-2 flex -translate-y-1/2 transform gap-1">
//                 <IconButton size="small" className="!text-dark-400">
//                   <EmojiEmotions fontSize="small" />
//                 </IconButton>
//                 <IconButton size="small" className="!text-dark-400">
//                   <Gif fontSize="small" />
//                 </IconButton>
//                 <IconButton size="small" className="!text-dark-400">
//                   <Photo fontSize="small" />
//                 </IconButton>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostPage;
