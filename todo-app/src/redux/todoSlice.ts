import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axiosInstance';
import { RootState } from './store';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: TodoState = {
  todos: JSON.parse(localStorage.getItem('todos') || '[]'),
  status: 'idle',
  error: null,
};

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { getState }) => {
    const { user } = (getState() as RootState).auth;
    if (!user) throw new Error('User not authenticated');
    const response = await axiosInstance.get(`http://localhost:3000/todos/${user.username}`);
    return response.data;
  }
);

export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async (title: string, { getState }) => {
    const { user } = (getState() as RootState).auth;
    if (!user) throw new Error('User not authenticated');
    const response = await axiosInstance.post('http://localhost:3000/todos/', { title, username: user.username });
    return response.data;
  }
);

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async (todo: Todo) => {
    const response = await axiosInstance.patch(`http://localhost:3000/todos/${todo.id}`, todo);
    return response.data;
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id: number) => {
    await axiosInstance.delete(`http://localhost:3000/todos/${id}`);
    return id;
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'idle';
        state.todos = action.payload;
        localStorage.setItem('todos', JSON.stringify(action.payload));
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch todos';
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
        localStorage.setItem('todos', JSON.stringify(state.todos));
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to add todo';
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
          localStorage.setItem('todos', JSON.stringify(state.todos));
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
        localStorage.setItem('todos', JSON.stringify(state.todos));
      });
  },
});

export default todoSlice.reducer;
