import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth.js';
import channelsSlice from './channels.js';
import messagesSlice from './messages.js';
import socketSlice from './socket.js';

export default configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsSlice,
    messages: messagesSlice,
    socket: socketSlice,
  },
});
