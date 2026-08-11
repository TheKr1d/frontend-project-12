import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { addToken, getToken } from '../utils/funcLocalStorage';
import routes from '../utils/routes';

const initialState = {
  user: null,
  isAuthorized: false,
  token: null,
  error: null,
  loading: false,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(routes.login(), { username, password });
      addToken({
        username: response.data.username,
        token: response.data.token,
      });
      return {
        username: response.data.username,
        token: response.data.token,
      };
    } catch (error) {
      console.error('Ошибка запроса:', error);

      if (error.response) {
        return rejectWithValue(
          error.response.data?.message || 'Ошибка сервера',
        );
      } else if (error.request) {
        return rejectWithValue('Сервер не отвечает');
      } else {
        return rejectWithValue(error.message || 'Ошибка отправки запроса');
      }
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthorized = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    restoreAuth: (state) => {
      const dataStorage = getToken();
      if (dataStorage) {
        state.user = dataStorage.username;
        state.token = dataStorage.token;
        state.isAuthorized = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthorized = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.username;
        state.token = action.payload.token;
        state.isAuthorized = true;
      })
      .addCase(loginUser.rejected, (state, _action) => {
        state.loading = false;
        state.error = 'Ошибка авторизации';
        state.isAuthorized = false;
      });
  },
});

export const { logout, clearError, restoreAuth } = authSlice.actions;
export default authSlice.reducer;
