import { useGetPostsByAuthorQuery } from '@services/rootApi';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useInfiniteScroll } from './useInfiniteScroll';

export const useLazyLoadPostsByAuthor = (authorId) => {
  const [offset, setOffset] = useState(0);
  const limit = 10;
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const { data, isFetching, isSuccess, error } = useGetPostsByAuthorQuery(
    { authorId, offset, limit },
    { refetchOnMountOrArgChange: true },
  );
  console.log('AuthorId in useLazyLoadPostsByAuthor:', authorId);
  console.log('Data from API:', data);
  console.log('Error from API:', error);

  const previousDataRef = useRef();

  useEffect(() => {
    if (isSuccess && data && previousDataRef.current !== data) {
      if (!data.posts || data.posts.length === 0) {
        setHasMore(false);
        return;
      }
      if (offset === 0) {
        setPosts(data.posts);
      } else {
        setPosts((prevPosts) => {
          const newPosts = data.posts.filter(
            (newPost) => !prevPosts.some((post) => post.id === newPost.id),
          );
          return [...prevPosts, ...newPosts];
        });
      }
      previousDataRef.current = data;
    }
  }, [data, isSuccess, offset]);

  const loadMore = useCallback(() => {
    setOffset((prevOffset) => prevOffset + limit);
  }, []);

  useInfiniteScroll({
    hasMore,
    loadMore,
    isFetching,
    offset,
    resetFun: () => {
      setOffset(0);
      setHasMore(true);
      setPosts([]);
    },
  });

  return { isFetching, posts };
};
