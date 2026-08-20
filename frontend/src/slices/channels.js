import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { notificationService } from '../utils/notificationService';
import routes from '../utils/routes';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  activeChannel: null,
  defaultChannel: null,
});

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
      //console.error('Ошибка загрузки каналов:', error);
      return rejectWithValue(error.message);
    }
  },
);

export const fetchAddChannel = createAsyncThunk(
  'channels/fetchAddChannel',
  async ({ token, newChannel }) => {
    if (!token) return [];
    const loadId = notificationService.loading('notifications.channelCreated');
    try {
      const response = await axios.post(routes.addChannel(), newChannel, {
        headers: { Authorization: `Bearer ${token}` },
      });
      notificationService.updateLoadingToSuccess(
        loadId,
        'notifications.channelCreatedSucces',
      );
      return response.data; // =>[{ id: '1', name: 'general', removable: false }, ...]
    } catch (error) {
      //console.error('Ошибка добавления канала:', error);
      notificationService.updateLoadingToError(
        loadId,
        'notifications.channelCreateError',
      );
      return rejectWithValue(error.message);
    }
  },
);

export const fetchEditChannel = createAsyncThunk(
  'channels/fetchEditChannel',
  async ({ token, id, name }) => {
    // editedChannel: { name: 'new name channel' }
    if (!token) return {};
    const loadId = notificationService.loading('notifications.channelRenamed');
    try {
      const response = await axios.patch(
        routes.editChannel(id),
        { name },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      notificationService.updateLoadingToSuccess(
        loadId,
        'notifications.channelRenamedSucces',
      );
      return response.data; // => { id: '3', name: 'new name channel', removable: true }
    } catch (error) {
      //console.error('Ошибка изменения канала:', error);
      notificationService.updateLoadingToError(
        loadId,
        'notifications.channelRenamedError',
      );
      return rejectWithValue(error.message);
    }
  },
);

export const fetchRemoveChannel = createAsyncThunk(
  'channels/fetchRemoveChannel',
  async ({ token, id }) => {
    if (!token) return {};
    const loadId = notificationService.loading('notifications.channelDeleted');
    try {
      const response = await axios.delete(routes.removeChannel(id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      notificationService.updateLoadingToSuccess(
        loadId,
        'notifications.channelDeletedSucces',
      );
      return response.data; // => { id: '3' }
    } catch (error) {
      //console.error('Ошибка изменения канала:', error);
      notificationService.updateLoadingToError(
        loadId,
        'notifications.channelDeletedError',
      );
      return rejectWithValue(error.message);
    }
  },
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setActiveChannel: (state, action) => {
      state.activeChannel = action.payload;
    },
    addChannel: channelsAdapter.addOne,
    removeChannel: (state, action) => {
      channelsAdapter.removeOne(state, action.payload.id);
    },
    edditChannel: (state, action) => {
      channelsAdapter.updateOne(state, {
        id: action.payload.id,
        changes: { name: action.payload.name },
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChannels.fulfilled, (state, action) => {
        channelsAdapter.addMany(state, action.payload);
        if (action.payload.length > 0) {
          const defaultChannel = action.payload.filter((i) => !i.removable)[0];
          state.activeChannel = defaultChannel;
          state.defaultChannel = defaultChannel;
        }
      })
      .addCase(fetchAddChannel.fulfilled, channelsAdapter.addOne);
  },
});

export const { selectAll: selectAllChannels } = channelsAdapter.getSelectors(
  (state) => state.channels,
);

export const { setActiveChannel, addChannel, edditChannel, removeChannel } =
  channelsSlice.actions;
export default channelsSlice.reducer;
