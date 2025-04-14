import { Comment, ThumbUp } from '@mui/icons-material';
import { Avatar, Button, Menu, MenuItem, TextField } from '@mui/material';
// import { openDialog } from '@redux/slices/dialogSlice';
import {
  useAddCommentMutation,
  useDeleteCommentMutation,
  useLikePostMutation,
  useUnlikePostMutation,
} from '@services/rootApi';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Post = ({
  fullName = '',
  createAt = new Date(),
  content = '',
  image = '',
  likes = [],
  comments = [],
  id,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [privacy, setPrivacy] = useState('Công khai');
  const [commentText, setCommentText] = useState('');
  const [isCommenting, setIsCommenting] = useState(false);
  // const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();
  const [addComment] = useAddCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const isLiked = likes.some((like) => like.userId === userInfo?.id);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePrivacyChange = (value) => {
    setPrivacy(value);
    handleClose();
  };

  const handleOpenDetailPost = () => {
    navigate(`/posts/${id}`);
  };

  const handleLike = async () => {
    try {
      if (isLiked) {
        await unlikePost(id).unwrap();
      } else {
        await likePost(id).unwrap();
      }
    } catch (error) {
      console.error('Lỗi khi thích bài đăng:', error);
    }
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;
    try {
      await addComment({ postId: id, comment: commentText }).unwrap();
      setCommentText('');
      setIsCommenting(false);
    } catch (error) {
      console.error('Lỗi khi thêm bình luận:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment({ postId: id, commentId }).unwrap();
    } catch (error) {
      console.error('Lỗi khi xóa bình luận:', error);
    }
  };

  console.log('Post ID:', id);
  console.log('Comments:', comments);

  return (
    <div className="bg-primary-dark rounded !p-4 shadow">
      <div className="!mb-3 flex items-start justify-between gap-3">
        <div className="flex gap-3">
          <Avatar className="!bg-primary-main">
            {fullName.split(' ').slice(-1)[0].charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <p className="font-bold">{fullName}</p>
            <p className="text-dark-400 text-sm">
              {dayjs(createAt).format('DD/MM/YYYY HH:mm')}
            </p>
          </div>
        </div>
        <div>
          <Button
            aria-controls="privacy-menu"
            aria-haspopup="true"
            onClick={handleClick}
            size="small"
            className="!text-dark-100"
          >
            {privacy} ▼
          </Button>
          <Menu
            id="privacy-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              className: 'bg-primary-dark text-white',
            }}
          >
            <MenuItem
              onClick={() => handlePrivacyChange('Công khai')}
              className="hover:bg-primary-main"
            >
              Công khai
            </MenuItem>
            <MenuItem
              onClick={() => handlePrivacyChange('Bạn bè')}
              className="hover:bg-primary-main"
            >
              Bạn bè
            </MenuItem>
            <MenuItem
              onClick={() => handlePrivacyChange('Chỉ mình tôi')}
              className="hover:bg-primary-main"
            >
              Chỉ mình tôi
            </MenuItem>
          </Menu>
        </div>
      </div>
      <p className="!mb-2">{content}</p>
      {image && (
        <div className="flex justify-center">
          <img
            src={image}
            className="max-h-[418px] max-w-[688px] hover:cursor-pointer"
            onClick={() => {
              handleOpenDetailPost();
            }}
          />
        </div>
      )}
      <div className="!my-2 flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm">
          <ThumbUp fontSize="small" className="text-primary-main" />
          <p>{likes.length}</p>
        </div>
        <div className="text-sm">
          <p>{comments.length} comments</p>
        </div>
      </div>
      <div className="!border-dark-200 flex !border-t !border-b !py-1 text-sm">
        <Button
          size="small"
          className="flex-1 !text-white"
          onClick={handleLike}
        >
          <ThumbUp
            fontSize="small"
            className={`!mr-1 ${isLiked ? 'text-primary-main' : ''}`}
          />{' '}
          {isLiked ? 'Unlike' : 'Like'}
        </Button>
        <Button
          size="small"
          className="flex-1 !text-white"
          onClick={() => setIsCommenting(!isCommenting)}
        >
          <Comment fontSize="small" className="!mr-1" /> Comment
        </Button>
      </div>

      {isCommenting && (
        <div className="!mt-2 flex gap-2">
          <TextField
            fullWidth
            variant="outlined"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Viết bình luận..."
            size="small"
            sx={{
              backgroundColor: '#333',
              borderRadius: '4px',
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': {
                  borderColor: '#555',
                },
                '&:hover fieldset': {
                  borderColor: '#777',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1976d2',
                },
              },
              '& .MuiInputBase-input': {
                color: 'white',
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCommentSubmit}
            disabled={!commentText.trim()}
          >
            Gửi
          </Button>
        </div>
      )}
      {/* Hiển thị danh sách bình luận */}
      {comments.length > 0 && (
        <div className="!mt-4 !p-2">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="border-dark-200 !mb-2 flex items-start gap-2 !border-b !pb-2"
            >
              <Avatar className="!bg-primary-main">
                {comment.user && comment.user.fullName
                  ? comment.user.fullName
                      .split(' ')
                      .slice(-1)[0]
                      .charAt(0)
                      .toUpperCase()
                  : '?'}
              </Avatar>
              <div className="bg-primary-bgdark flex-1 rounded-sm !p-2">
                <div className="flex items-center justify-between">
                  <p className="font-bold">
                    {comment.user && comment.user.fullName
                      ? comment.user.fullName
                      : 'Unknown User'}
                  </p>
                  {comment.user && comment.user.id === userInfo?.id && (
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      Xóa
                    </Button>
                  )}
                </div>
                <p className="text-dark-400 text-sm">
                  {dayjs(comment.createdAt).format('DD/MM/YYYY HH:mm')}
                </p>
                <p>{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;
