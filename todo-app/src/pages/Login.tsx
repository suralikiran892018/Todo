// src/components/Login.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/authSlice';
import type { AppDispatch, RootState } from '../redux/store';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMessage('Please enter valid details');
      return;
    }

    try {
      setErrorMessage('');
      await dispatch(loginUser({ username, password })).unwrap();
      navigate('/todos'); // Redirect to the todos page
    } catch (error) {
      setErrorMessage('Invalid username or password. Please try again.');
    }
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '50px auto',
        padding: '30px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
      <input
      
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          width: '95%',
          padding: '10px',
          marginBottom: '15px',
          borderRadius: '5px',
          border: '1px solid #ced4da',
        }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: '95%',
          padding: '10px',
          marginBottom: '15px',
          borderRadius: '5px',
          border: '1px solid #ced4da',
        }}
      />
      <button
        onClick={handleLogin}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Login
      </button>
      {errorMessage && (
        <div style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>{errorMessage}</div>
      )}
      {auth.status === 'loading' && <div>Loading...</div>}
      {auth.status === 'failed' && (
        <div style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>{auth.error}</div>
      )}
    </div>
  );
};

export default Login;
