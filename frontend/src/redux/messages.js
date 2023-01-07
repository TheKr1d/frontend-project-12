import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { getChannelsAsync } from "./asyncThunk.js";
import { uniqueId } from "lodash";

const adapter = createEntityAdapter();
const initialState = adapter.getInitialState();

const slice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const local = JSON.parse(localStorage.getItem('userId'));
      const message = {
        author: local.username,
        id: uniqueId(),
        text: action.payload,
      };
      adapter.addOne(state, message);
    }
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