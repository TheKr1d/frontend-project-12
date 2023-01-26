import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { getChannelsAsync } from "./asyncThunk.js";

const adapter = createEntityAdapter();
const initialState = adapter.getInitialState();

const slice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: adapter.addOne,
  },
  extraReducers: {
    [getChannelsAsync.fulfilled]: (state, action) => {
      const { messages } = action.payload;
      adapter.addMany(state, messages);
    }
  }
});

export const { addMessage } = slice.actions;
export default slice.reducer;