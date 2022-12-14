import { configureStore } from '@reduxjs/toolkit';
import sliceChannels from './channels.js';
import sliceAsyncThunk from './asyncThunk.js';
import sliceMessages from './messages.js';

export default configureStore({
    reducer: {
        asyncThunk: sliceAsyncThunk,
        channels: sliceChannels,
        messages: sliceMessages,
    }
})