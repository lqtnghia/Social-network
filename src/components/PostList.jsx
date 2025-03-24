import React from 'react';
import Loading from './Loading';
import Post from './Post';
import { useLazyLoadPosts } from '@hooks/useLazyLoadPosts';

const PostList = () => {
  const { isFetching, posts } = useLazyLoadPosts();

  return (
    <div className="flex flex-col gap-4">
      {(posts || []).map((post) => (
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
      {isFetching && <Loading />}
    </div>
  );
};

export default PostList;
