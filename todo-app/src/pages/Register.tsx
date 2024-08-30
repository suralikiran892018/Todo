// src/pages/Register.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/authSlice';
import type { AppDispatch, RootState } from '../redux/store'; // Import AppDispatch type

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  const [successMessage, setSuccessMessage] = useState(''); // State for success messages
  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch type
  const auth = useSelector((state: RootState) => state.auth);

  const handleRegister = async () => {
    if (!username || !password) {
      setErrorMessage('Please enter all required details');
      return;
    }

    try {
      setErrorMessage('');
      await dispatch(registerUser({ username, password })).unwrap();
      setSuccessMessage('Registration successful! Please login.');
      setUsername('');
      setPassword('');
    } catch (error: any) {
      if (auth.error) {
        setErrorMessage(auth.error); // Display the error from the store
      } else {
        setErrorMessage('Registration failed. Please try again.');
      }
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
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Registration </h2>
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
        onClick={handleRegister}
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
        Register
      </button>
      {errorMessage && (
        <div style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>{errorMessage}</div>
      )}
      {successMessage && (
        <div style={{ color: 'green', marginTop: '10px', textAlign: 'center' }}>{successMessage}</div>
      )}
    </div>
  );
};

export default Register;
