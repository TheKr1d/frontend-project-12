// slices/socket.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isConnected: false,
  error: null,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    socketConnected: (state) => {
      state.isConnected = true;
      state.error = null;
    },
    socketDisconnected: (state) => {
      state.isConnected = false;
    },
    socketError: (state, action) => {
      state.isConnected = false;
      state.error = action.payload;
    },
  },
});

export const { socketConnected, socketDisconnected, socketError } =
  socketSlice.actions;
export const selectIsConnected = (state) => state.socket.isConnected;
export default socketSlice.reducer;
