import { logOut as logOutAction } from '@redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';

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
