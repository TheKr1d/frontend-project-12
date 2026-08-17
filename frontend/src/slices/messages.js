import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../utils/routes';
import { fetchRemoveChannel } from './channels';

const messagesAdapter = createEntityAdapter();

export const getMessages = createAsyncThunk(
  'messages/getMessages',
  async (token, { rejectWithValue }) => {
    if (!token) return [];
    try {
      const response = await axios.get(routes.getMessages(), {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data; // =>[{ id: '1', body: 'text message', channelId: '1', username: 'admin }, ...]
    } catch (error) {
      console.error('Ошибка загрузки сообщений:', error);
      return rejectWithValue(error.message);
    }
  },
);

export const fetchAddMessage = createAsyncThunk(
  'messages/addMessage',
  async ({ token, newMessage }) => {
    if (!token) return [];

    try {
      const response = await axios.post(routes.addMessage(), newMessage, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data; // => { id: '1', body: 'new message', channelId: '1', username: 'admin }
    } catch (error) {
      console.error('Ошибка добавления сообщения:', error);
      return rejectWithValue(error.message);
    }
  },
);

// export const editMessage = createAsyncThunk(
//   'messages/editMessage',
//   async (token, id, editedMessage) => {
//     // { body: 'new body message' };
//     if (!token) return {};
//     try {
//       const response = await axios.patch(
//         routes.editMessage(id),
//         editedMessage,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );
//       return response.data; // => { id: '1', body: 'new body message', channelId: '1', username: 'admin }
//     } catch (error) {
//       console.error('Ошибка изменения сообщения:', error);
//       return rejectWithValue(error.message);
//     }
//   },
// );

// export const removeMessage = createAsyncThunk(
//   'messages/removeMessage',
//   async (token, id) => {
//     if (!token) return {};
//     try {
//       const response = await axios.patch(routes.removeMessage(id), {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return response.data; // => { id: '3' }
//     } catch (error) {
//       console.error('Ошибка изменения сообщения:', error);
//       return rejectWithValue(error.message);
//     }
//   },
// );

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.fulfilled, messagesAdapter.addMany)
      .addCase(fetchRemoveChannel.fulfilled, (state, action) => {
        const { id: channelId } = action.payload;
        const messages = Object.values(state.entities);
        const deleteMessageIds = messages
          .filter((i) => i.channelId === channelId)
          .map((i) => i.id);
        messagesAdapter.removeMany(state, deleteMessageIds);
      });
  },
});

export const {
  selectAll: selectAllMessages,
  selectById: selectMessageById,
  selectIds: selectMessageIds,
  selectTotal: selectTotalMessages,
} = messagesAdapter.getSelectors((state) => state.messages);

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
