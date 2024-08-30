// src/pages/TodoForm.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../redux/todoSlice';
import { RootState } from '../redux/store';

const TodoForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleAddTodo = () => {
    if (user) {
      dispatch(addTodo(title) as any); // Use `as any` to bypass TypeScript error, ideally fix types
      setTitle('');
    } else {
      alert('Please log in to add todos');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="New Todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
};

export default TodoForm;
