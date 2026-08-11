import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../utils/routes';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({ activeChannelId: null });

export const getChannels = createAsyncThunk(
  'channels/getChannels',
  async (token, { rejectWithValue }) => {
    if (!token) return [];
    try {
      const response = await axios.get(routes.getChannels(), {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Ошибка загрузки каналов:', error);
      return rejectWithValue(error.message);
    }
  },
);

// export const addChannel = createAsyncThunk(
//   'channels/addChannel',
//   async (token) => {
//     if (!token) return [];
//     try {
//       const response = await axios.get(routes.addChannel(), {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return response.data; // =>[{ id: '1', name: 'general', removable: false }, ...]
//     } catch (error) {
//       console.error('Ошибка добавления канала:', error);
//       return rejectWithValue(error.message);
//     }
//   },
// );

// export const editChannel = createAsyncThunk(
//   'channels/editChannel',
//   async (token, id, editedChannel) => {
//     // editedChannel: { name: 'new name channel' }
//     if (!token) return {};
//     try {
//       const response = await axios.patch(
//         routes.editChannel(id),
//         editedChannel,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );
//       return response.data; // => { id: '3', name: 'new name channel', removable: true }
//     } catch (error) {
//       console.error('Ошибка изменения канала:', error);
//       return rejectWithValue(error.message);
//     }
//   },
// );

// export const removeChannel = createAsyncThunk(
//   'channels/removeChannel',
//   async (token, id) => {
//     if (!token) return {};
//     try {
//       const response = await axios.patch(routes.removeChannel(id), {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return response.data; // => { id: '3' }
//     } catch (error) {
//       console.error('Ошибка изменения канала:', error);
//       return rejectWithValue(error.message);
//     }
//   },
// );

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setActiveChannelId: (state, action) => {
      state.activeChannelId = action.payload;
    },
    addChannel: channelsAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(getChannels.fulfilled, (state, action) => {
      channelsAdapter.addMany(state, action.payload);
      if (action.payload.length > 0) {
        state.activeChannelId = action.payload[0].id;
      }
    });
  },
});

export const {
  selectAll: selectAllChannels,
  selectById: selectChannelById,
  selectIds: selectChannelIds,
  selectTotal: selectTotalChannels,
} = channelsAdapter.getSelectors((state) => state.channels);

export const selectActiveChannelId = (state) => state.channels.activeChannelId;
export const { setActiveChannelId, addChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
