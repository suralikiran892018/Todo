// src/components/TodoList.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from '../redux/todoSlice';
import type { RootState, AppDispatch } from '../redux/store';

const TodoList: React.FC = () => {
  const [todoText, setTodoText] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null); // State to track the todo being edited
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todo.todos);
  const status = useSelector((state: RootState) => state.todo.status);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddOrUpdateTodo = () => {
    if (todoText.trim()) {
      if (editingId !== null) {
        // Update the existing todo
        dispatch(updateTodo({ id: editingId, title: todoText, completed: false }));
        setEditingId(null); // Reset editing state
      } else {
        // Add a new todo
        dispatch(addTodo(todoText));
      }
      setTodoText(''); // Clear the input field
    }
  };

  const handleEditTodo = (todo: { id: number; title: string }) => {
    setTodoText(todo.title); // Populate the input with the current todo text
    setEditingId(todo.id); // Set the todo ID for editing
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '50px auto',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
      }}
    >
      <h2>Todo List</h2>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          placeholder="Add or update a todo"
          style={{
            width: '75%',
            padding: '10px',
            marginRight: '10px',
            borderRadius: '5px',
            border: '1px solid #ced4da',
          }}
        />
        <button
          onClick={handleAddOrUpdateTodo}
          style={{
            padding: '10px 20px',
            backgroundColor: editingId !== null ? '#ffc107' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {editingId !== null ? 'Update Todo' : 'Add Todo'}
        </button>
      </div>

      <ul
        style={{
          listStyleType: 'none',
          padding: '0',
          marginTop: '20px',
          backgroundColor: '#ffffff',
          borderRadius: '5px',
        }}
      >
        {status === 'loading' ? (
          <li style={{ padding: '10px', textAlign: 'center' }}>Loading...</li>
        ) : (
          todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                padding: '10px',
                borderBottom: '1px solid #ced4da',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span
                onClick={() => handleEditTodo(todo)}
                style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
              >
                {todo.title}
              </span>
              <div>
                <button
                  onClick={() => handleEditTodo(todo)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#ffc107',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginLeft: '5px',
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginLeft: '5px',
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TodoList;
