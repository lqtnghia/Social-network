import { Check, Close } from '@mui/icons-material';
import { Button } from '@mui/material';
import { closeDialog } from '@redux/slices/dialogSlice';
import React from 'react';
import { useDispatch } from 'react-redux';

const LiveDialog = () => {
  const dispatch = useDispatch();
  return (
    <div className="!pt-4">
      <div className="h-20 text-center">
        <p>Are you sure you want to live video?</p>
      </div>
      <div className="flex items-center justify-center gap-20 !pb-2">
        <Button
          variant="contained"
          onClick={() => {
            dispatch(closeDialog());
          }}
        >
          <Close color="error" />
          No
        </Button>
        <Button variant="contained">
          <Check color="success" />
          Yes
        </Button>
      </div>
    </div>
  );
};

export default LiveDialog;
