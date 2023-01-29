import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { getChannelsAsync } from "./asyncThunk.js";

const adapter = createEntityAdapter();
const initialState = adapter.getInitialState();

const slice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    addChanel: adapter.addOne,
  },
  extraReducers: {
    [getChannelsAsync.fulfilled]: (state, action) => {
      const { channels, currentChannelId } = action.payload;
      adapter.addMany(state, channels);
    },
  },
});

export const {addChanel} = slice.actions;
export default slice.reducer;
