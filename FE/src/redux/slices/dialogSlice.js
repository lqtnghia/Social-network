import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  maxWidth: 'xs',
  fullWidth: true,
  title: null,
  contentType: null,
  additionalData: {},
  actions: null,
};

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState: initialState,
  reducers: {
    openDialog: (state, action) => {
      return { ...state, ...action.payload, open: true };
    },
    closeDialog: () => {
      return initialState;
    },
    //action creator => function ||| action {type, payload} => openSnackbar({message: 'Good job'}) => action {type: 'snackbar/openSnackbar', payload: {message: 'Good job'}}
  },
});

export const { openDialog, closeDialog } = dialogSlice.actions;
export default dialogSlice.reducer;
