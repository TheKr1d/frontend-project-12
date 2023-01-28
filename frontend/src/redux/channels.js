import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { getChannelsAsync } from "./asyncThunk.js";

const adapter = createEntityAdapter();
const initialState = adapter.getInitialState();

const slice = createSlice({
  name: "channels",
  initialState,
  reducers: {},
  extraReducers: {
    [getChannelsAsync.fulfilled]: (state, action) => {
      const { channels, currentChannelId } = action.payload;
      console.log(currentChannelId)
      adapter.addMany(state, channels);
    },
  },
});

export default slice.reducer;
