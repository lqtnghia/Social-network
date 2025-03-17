import React from 'react';
import Post from './Post';

const PostList = () => {
  return (
    <div className="flex flex-col gap-4">
      <Post />
      <Post
        content="Đi bộ vuốt râu"
        image="https://cdnphoto.dantri.com.vn/7PdTjv-TDnGC7M63NQFas8HXJhE=/zoom/1200_630/2020/04/07/hai-huoc-khi-cr-7-docx-1586259968920.jpeg"
      />
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default PostList;
