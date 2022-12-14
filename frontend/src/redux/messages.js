import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { getChannelsAsync } from "./asyncThunk.js";

const adapter = createEntityAdapter();
const initialState = adapter.getInitialState();

const slice = createSlice({
  name: "messages",
  initialState,
  reducers: {
  },
  extraReducers: {
    [getChannelsAsync.fulfilled]: (state, action) => {
      const { messages } = action.payload;
      adapter.addMany(state, messages);
    }
  }
});

export default slice.reducer;