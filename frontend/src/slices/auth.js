import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import i18n from '../i18n.js';
import { addToken, getToken, removeToken } from '../utils/funcLocalStorage';
import { notificationService } from '../utils/notificationService';
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
    const loadId = notificationService.loading('notifications.loginUserLoad');
    try {
      const response = await axios.post(routes.login(), { username, password });
      console.log('📦 Ответ от бэкенда:', response.data); // 👈 ДОБАВЬТЕ ЭТО
      addToken({
        username: response.data.username,
        token: response.data.token,
      });
      notificationService.updateLoadingToSuccess(
        loadId,
        'notifications.loginUserSucces',
      );
      return {
        username: response.data.username,
        token: response.data.token,
      };
    } catch (error) {
      //console.error('notifications.fetchError', error);
      notificationService.updateLoadingToError(
        loadId,
        'notifications.loginUserError',
      );
      if (error.response) {
        return rejectWithValue(
          error.response.data?.message || i18n.t('notifications.serverError'),
        );
      } else if (error.request) {
        return rejectWithValue(i18n.t('notifications.serverIsNotResponding'));
      } else {
        return rejectWithValue(
          error.message || i18n.t('notifications.fetchError'),
        );
      }
    }
  },
);

export const createNewUser = createAsyncThunk(
  'auth/createNewUser',
  async ({ username, password }, { rejectWithValue }) => {
    const loadId = notificationService.loading('notifications.authUserLoad');
    try {
      const response = await axios.post(routes.newUser(), {
        username,
        password,
      });
      addToken({
        username: response.data.username,
        token: response.data.token,
      });
      notificationService.updateLoadingToSuccess(
        loadId,
        'notifications.authUserSucces',
      );
      return {
        username: response.data.username,
        token: response.data.token,
      };
    } catch (error) {
      //console.error('Ошибка запроса:', error);
      notificationService.updateLoadingToError(
        loadId,
        'notifications.authUserError',
      );
      if (error.response) {
        if (error.response.status === 401) {
          return rejectWithValue(
            i18n.t('notifications.authUserErrorUsernameAndPass'),
          );
        }
        return rejectWithValue(
          error.response.data?.message || i18n.t('notifications.serverError'),
        );
      } else if (error.request) {
        return rejectWithValue(i18n.t('notifications.serverIsNotResponding'));
      } else {
        return rejectWithValue(
          error.message || i18n.t('notifications.fetchError'),
        );
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
      removeToken();
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
        state.error = i18n.t('notifications.authUserError');
        state.isAuthorized = false;
      })

      .addCase(createNewUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthorized = false;
      })
      .addCase(createNewUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.username;
        state.token = action.payload.token;
        state.isAuthorized = true;
      })
      .addCase(createNewUser.rejected, (state, _action) => {
        state.loading = false;
        state.error = 'notifications.authUserError';
        state.isAuthorized = false;
      });
  },
});

export const { logout, clearError, restoreAuth } = authSlice.actions;
export default authSlice.reducer;
