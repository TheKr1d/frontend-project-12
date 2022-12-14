import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";
import routes, { getAuthHeader } from "../path/path";

export const getChannelsAsync = createAsyncThunk("channels/getChannels", async () => {
    try {
      const responce = await axios.get(routes.usersPath(), {
        headers: getAuthHeader(),
      });
      return responce.data;
    } catch (e) {}
});

const adapter = createEntityAdapter();
const initialState = adapter.getInitialState({loadingState: 'idle', error: null});

const slice = createSlice({
  name: "asyncThunk",
  initialState,
  reducers: {
  },
  extraReducers: {
    [getChannelsAsync.fulfilled]: (state, action) => {
        state.loadingState = 'idle';
        state.error = null;
    }
  }
});

export default slice.reducer;
