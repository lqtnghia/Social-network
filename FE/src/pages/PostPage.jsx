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
  // console.log(id);

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
