// src/components/Navbar.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice'; // Import logout action
import type { RootState } from '../redux/store';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav
      style={{
        backgroundColor: '#007bff',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      {auth.user ? (
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: '#d9534f',
            color: 'white',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      ) : (
        <>
          <Link
            to="/login"
            style={{
              color: 'white',
              textDecoration: 'none',
              marginLeft: '15px',
              padding: '8px 12px',
              borderRadius: '5px',
              backgroundColor: '#0056b3',
              transition: 'background-color 0.3s ease', // Smooth transition effect
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = '#003d80') // Darker shade on hover
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = '#0056b3') // Original color on mouse leave
            }
          >
            Login
          </Link>
          <Link
            to="/register"
            style={{
              color: 'white',
              textDecoration: 'none',
              marginLeft: '15px',
              padding: '8px 12px',
              borderRadius: '5px',
              backgroundColor: '#0056b3',
              transition: 'background-color 0.3s ease', // Smooth transition effect
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = '#003d80') // Darker shade on hover
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = '#0056b3') // Original color on mouse leave
            }
          >
            Register
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
