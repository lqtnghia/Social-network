import { throttle } from 'lodash';
import { useEffect, useMemo } from 'react';

export const useInfiniteScroll = ({ hasMore, loadMore, isFetching }) => {
  const handleScroll = useMemo(() => {
    return throttle(() => {
      if (!hasMore) {
        return;
      }
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      if (clientHeight + scrollTop + 50 >= scrollHeight && !isFetching) {
        loadMore();
      }
    }, 500);
  }, [hasMore, isFetching, loadMore]);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      handleScroll.cancel();
    };
  }, [handleScroll]);
};
