import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axiosInstance';

interface AuthState {
  user: { id: number; username: string } | null;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  status: 'idle',
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('http://localhost:3000/users/login', credentials);
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (error: any) {
      return rejectWithValue('Login failed. Please check your credentials.');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('http://localhost:3000/users/register', credentials);
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        return rejectWithValue('Username already exists');
      }
      return rejectWithValue('An error occurred during registration');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
