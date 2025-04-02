import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';

export const useDetectLayout = () => {
  const theme = useTheme();
  const isMinimizeLayout = useMediaQuery(theme.breakpoints.down('md'));
  return { isMinimizeLayout };
};
