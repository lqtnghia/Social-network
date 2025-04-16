import { Avatar, Button, TextField } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

const Comment = ({
  comments = [],
  commentText,
  setCommentText,
  isCommenting,
  handleCommentSubmit,
  handleDeleteComment,
  userInfo,
}) => {
  return (
    <div>
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

export default Comment;
