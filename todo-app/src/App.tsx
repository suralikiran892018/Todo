import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Login from './pages/Login';
import Register from './pages/Register';
import TodoList from './pages/TodoList';
import TodoForm from './pages/TodoForm';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todos" element={<TodoList />} />
        <Route path="/todos/add" element={<TodoForm />} />
      </Routes>
    </Router>
  );
};

export default App;
