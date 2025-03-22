import React from 'react';
import Loading from './Loading';
import Post from './Post';
import { useGetPostsQuery } from '@services/rootApi';

const PostList = () => {
  const { data, isFetching } = useGetPostsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

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
      {isFetching && <Loading />}
    </div>
  );
};

export default PostList;
