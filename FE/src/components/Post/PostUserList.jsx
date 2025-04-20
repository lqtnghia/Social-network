import React from 'react';
import Post from './Post';
import Loading from '@components/Loading/Loading';
import { useLazyLoadPostsByAuthor } from '@hooks/useLazyLoadPostsByAuthor';

const PostUserList = ({ authorId, isOwnProfile, fullName }) => {
  const { isFetching, posts } = useLazyLoadPostsByAuthor(authorId);
  console.log('AuthorId in PostUserList:', authorId);
  console.log('Posts in PostUserList:', posts);

  return (
    <div className="!mt-4 flex min-h-[300px] flex-col gap-4">
      {posts.length === 0 && !isFetching ? (
        <p className="text-center text-gray-500">
          {isOwnProfile
            ? 'Bạn chưa có bài đăng nào.'
            : `${fullName} chưa có bài đăng nào hoặc bạn không có quyền xem.`}
        </p>
      ) : (
        posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            fullName={post.fullName || 'Unknown User'}
            createAt={post.createdAt}
            content={post.content}
            image={post.image ? `http://localhost:4010${post.image}` : null}
            likes={post.likes || []}
            comments={post.comments || []}
            imageAva={
              post.imageAva ? `http://localhost:4010${post.imageAva}` : null
            }
          />
        ))
      )}
      {isFetching && <Loading />}
    </div>
  );
};

export default PostUserList;
