// import React from 'react';
// import Loading from './Loading';
// import Post from './Post';
// import { useGetPostsQuery } from '@services/rootApi';

// const PostList = () => {
//   const { data, isFetching } = useGetPostsQuery(undefined, {
//     refetchOnMountOrArgChange: true,
//   });

//   return (
//     <div className="flex flex-col gap-4">
//       {(data || []) &&
//         data?.map((post) => (
//           <Post
//             key={post.id}
//             fullName={post.fullName}
//             createAt={post.createdAt}
//             content={post.content}
//             image={post.image ? `http://localhost:4010${post.image}` : null}
//             likes={post.likes || []}
//             comments={post.comments || []}
//             imageAva={
//               post.imageAva ? `http://localhost:4010${post.imageAva}` : null
//             }
//           />
//         ))}
//       {isFetching && <Loading />}
//     </div>
//   );
// };

// export default PostList;

import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import Post from './Post';
import { useGetPostsQuery } from '@services/rootApi';

const PostList = () => {
  const [offset, setOffset] = useState(0);
  const limit = 10;
  const [posts, setPosts] = useState([]);

  const { data, isFetching, isSuccess } = useGetPostsQuery(
    { offset, limit },
    { refetchOnMountOrArgChange: true },
  );

  useEffect(() => {
    if (isSuccess && data) {
      if (offset === 0) {
        // Reset danh sách khi offset về 0
        setPosts(data);
      } else {
        // Thêm các bài đăng mới, loại bỏ trùng lặp
        setPosts((prevPosts) => {
          const newPosts = data.filter(
            (newPost) => !prevPosts.some((post) => post.id === newPost.id),
          );
          return [...prevPosts, ...newPosts];
        });
      }
    }
  }, [data, isSuccess, offset]);

  const loadMorePosts = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  const refreshPosts = () => {
    setOffset(0); // Reset offset về 0 để làm mới danh sách
  };

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={refreshPosts}
        className="mb-4 rounded bg-blue-500 px-4 py-2 text-white"
        disabled={isFetching}
      >
        Làm mới bài đăng
      </button>
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
      {posts.length > 0 && (
        <button
          onClick={loadMorePosts}
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
          disabled={isFetching}
        >
          {isFetching ? 'Đang tải...' : 'Tải thêm bài đăng'}
        </button>
      )}
    </div>
  );
};

export default PostList;
