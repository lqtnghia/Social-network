import { logOut as logOutAction } from '@redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useGetPostsQuery } from '@services/rootApi';
import { useCallback } from 'react';
import { useMemo } from 'react';
import { throttle } from 'lodash';

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(logOutAction());
    navigate('/login', { replace: true });
  };

  return { logOut };
};

export const useUserInfo = () => {
  return useSelector((state) => state.auth.user);
};

export const useDetectLayout = () => {
  const theme = useTheme();
  const isMinimizeLayout = useMediaQuery(theme.breakpoints.down('md'));
  return { isMinimizeLayout };
};

export const useLazyLoadPosts = () => {
  const [offset, setOffset] = useState(0);
  const limit = 11;
  const [posts, setPosts] = useState([]);
  const { data, isSuccess, isFetching } = useGetPostsQuery(
    {
      offset,
      limit,
    },
    { refetchOnMountOrArgChange: true }, // Buộc gọi lại API khi tham số thay đổi
  );
  const previousDataRef = useRef();
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    if (isSuccess && data && previousDataRef.current !== data) {
      if (!data.length) {
        setHasMore(false);
        return;
      }
      previousDataRef.current = data;
      setPosts((prevPosts) => {
        return [...prevPosts, ...data];
      });
    }
  }, [isSuccess, data]);
  const loadMore = useCallback(() => {
    setOffset((offset) => offset + limit);
  }, []);

  useInifiniteScroll({ hasMore, loadMore, isFetching });

  return { isFetching, posts };
};

export const useInifiniteScroll = ({
  hasMore,
  loadMore,
  isFetching,
  threshold = 50,
  throttleMs = 500,
}) => {
  const handleScroll = useMemo(() => {
    return throttle(() => {
      if (!hasMore) {
        return;
      }
      const scrollTop = document.documentElement.scrollTop; //b
      const scrollHeight = document.documentElement.scrollHeight; //a
      const scrollClient = document.documentElement.clientHeight; //c

      if (scrollClient + scrollTop + threshold >= scrollHeight && !isFetching) {
        loadMore();
      }
    }, throttleMs);
  }, [isFetching, hasMore, loadMore, throttleMs, threshold]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      handleScroll.cancel();
    };
  }, [handleScroll]);
};
