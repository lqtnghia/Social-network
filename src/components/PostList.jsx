import React from 'react';
import Post from './Post';
import { useGetPostsQuery } from '@services/rootApi';

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
  return (
    <div className="flex flex-col gap-4">
      {/* {isFetching && <p>Loading posts...</p>}
      {isError && (
        <p>Error loading posts: {error?.data?.message || error?.message}</p>
      )}
      {isSuccess && !data?.length && !isFetching && <p>No posts available.</p>} */}
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
      <Post />
    </div>
  );
};

export default PostList;
