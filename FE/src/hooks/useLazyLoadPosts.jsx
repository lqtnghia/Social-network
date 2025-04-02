import { useGetPostsQuery } from '@services/rootApi';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useInfiniteScroll } from './useInfiniteScroll';

export const useLazyLoadPosts = () => {
  const [offset, setOffset] = useState(0);
  const limit = 10;
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const { data, isFetching, isSuccess } = useGetPostsQuery(
    { offset, limit },
    { refetchOnMountOrArgChange: true },
  );
  console.log(data);
  const previousDataRef = useRef();

  useEffect(() => {
    if (isSuccess && data && previousDataRef.current !== data) {
      if (!data.length) {
        setHasMore(false);
        return;
      }
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

  const loadMore = useCallback(() => {
    setOffset((offset) => offset + limit);
  }, []);

  useInfiniteScroll({ hasMore, loadMore, isFetching });

  return { isFetching, posts };
};
