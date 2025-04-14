import { throttle } from 'lodash';
import { useEffect, useMemo } from 'react';

export const useInfiniteScroll = ({
  hasMore,
  loadMore,
  isFetching,
  offset,
  resetFn,
}) => {
  const handleScroll = useMemo(() => {
    return throttle(() => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      if (scrollTop < 100 && offset > 0) {
        resetFn();
        return;
      }
      if (!hasMore) {
        return;
      }
      if (clientHeight + scrollTop + 50 >= scrollHeight && !isFetching) {
        loadMore();
      }
    }, 500);
  }, [hasMore, isFetching, loadMore, offset, resetFn]);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      handleScroll.cancel();
    };
  }, [handleScroll]);
};
