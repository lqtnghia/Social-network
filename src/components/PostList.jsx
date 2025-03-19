import React from 'react';

import { useGetPostsQuery } from '@services/rootApi';
import Loading from './Loading';
import Post from './Post';

const PostList = () => {
  const { data, isSuccess, isFetching, isError, error } = useGetPostsQuery();
  console.log('Data from useGetPostsQuery:', {
    data,
    isSuccess,
    isFetching,
    isError,
    error,
  });
  console.log(data);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4">
      {(data || []) &&
        data?.map((post) => (
          <Post
            key={post.id}
            fullName={post.fullName}
            createAt={post.createdAt}
            content={post.content}
            image={post.image ? `http://localhost:4010${post.image}` : null}
            likes={post.likes || []}
            comments={post.comments || []}
            imageAva={
              post.imageAva ? `http://localhost:4010${post.imageAva}` : null
            }
          />
        ))}
    </div>
  );
};

export default PostList;
