import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../utils/routes';

const channelsAdapter = createEntityAdapter();

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

export const addChannel = createAsyncThunk(
  'channels/addChannel',
  async (token) => {
    if (!token) return [];
    try {
      const response = await axios.get(routes.addChannel(), {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data; // =>[{ id: '1', name: 'general', removable: false }, ...]
    } catch (error) {
      console.error('Ошибка добавления канала:', error);
      return rejectWithValue(error.message);
    }
  },
);

export const editChannel = createAsyncThunk(
  'channels/editChannel',
  async (token, id, editedChannel) => {
    // editedChannel: { name: 'new name channel' }
    if (!token) return {};
    try {
      const response = await axios.patch(
        routes.editChannel(id),
        editedChannel,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return response.data; // => { id: '3', name: 'new name channel', removable: true }
    } catch (error) {
      console.error('Ошибка изменения канала:', error);
      return rejectWithValue(error.message);
    }
  },
);

export const removeChannel = createAsyncThunk(
  'channels/removeChannel',
  async (token, id) => {
    if (!token) return {};
    try {
      const response = await axios.patch(routes.removeChannel(id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data; // => { id: '3' }
    } catch (error) {
      console.error('Ошибка изменения канала:', error);
      return rejectWithValue(error.message);
    }
  },
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChannels.fulfilled, channelsAdapter.addMany)
      .addCase(addChannel.fulfilled, channelsAdapter.addOne)
      .addCase(removeChannel.fulfilled, channelsAdapter.removeOne)
      .addCase(editChannel.fulfilled, channelsAdapter.updateMany);
  },
});

export const {
  selectAll: selectAllChannels,
  selectById: selectChannelById,
  selectIds: selectChannelIds,
  selectTotal: selectTotalChannels,
} = channelsAdapter.getSelectors((state) => state.channels);

export default channelsSlice.reducer;
