import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isShow: false,
  type: null, // rename, delete
  channelId: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setType: (state, { payload }) => {
      state.type = payload.type;
      state.channelId = payload.channelId;
      state.isShow = true;
    },
    close: (state, _action) => {
      state.isShow = false;
      state.type = null;
      state.channelId = null;
    },
  },
});

export const { setType, close } = modalSlice.actions;
export default modalSlice.reducer;
