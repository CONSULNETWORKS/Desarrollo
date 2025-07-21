import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '@/services/auth.service';
import { SET_MESSAGE } from '@/actions/types';

// Obtenemos el usuario del localStorage para el estado inicial
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  isLoggedIn: !!user,
  user: user || null,
};

export const register = createAsyncThunk(
  'auth/register',
  async ({ name, lastname, username, email, password }, thunkAPI) => {
    try {
      const response = await AuthService.register(name, lastname, username, email, password);
      thunkAPI.dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return thunkAPI.rejectWithValue();
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(username, password);
      if (data.twoFactorEnabled) {
        return data;
      } else {
        return data;
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return thunkAPI.rejectWithValue();
    }
  }
);

export const verify2FA = createAsyncThunk(
  'auth/verify2FA',
  async ({ userId, token }, thunkAPI) => {
    try {
      const data = await AuthService.verify2FA(userId, token);
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  AuthService.logout();
});

// ==============================|| SLICE ||============================== //

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {}, // No necesitamos reducers "sincrónicos" aquí
  extraReducers: (builder) => {
    // Manejamos las respuestas de nuestras acciones asíncronas
    builder
      .addCase(register.fulfilled, (state) => {
        // Redux Toolkit permite mutar el estado en el reducer
        state.isLoggedIn = false;
      })
      .addCase(register.rejected, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        if (!action.payload.twoFactorEnabled) {
          state.isLoggedIn = true;
          state.user = action.payload;
        }
      })
      .addCase(login.rejected, (state) => {
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(verify2FA.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(verify2FA.rejected, (state) => {
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;
      });
  },
});

export default authSlice.reducer;