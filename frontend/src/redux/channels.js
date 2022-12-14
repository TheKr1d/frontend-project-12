import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { getChannelsAsync } from "./asyncThunk.js";

const adapter = createEntityAdapter();
const initialState = adapter.getInitialState();

const slice = createSlice({
  name: "channels",
  initialState,
  reducers: {
  },
  extraReducers: {
    [getChannelsAsync.fulfilled]: (state, action) => {
      const { channels } = action.payload;
      const newChannels = channels
      .filter((item) => !item.removable)
      .map(({id, name}) => ({id, name}))
      adapter.addMany(state, newChannels);
    }
  }
});

export default slice.reducer;
