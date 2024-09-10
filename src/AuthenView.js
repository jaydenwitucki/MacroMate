import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AuthenicatedView.css';

const AuthenticatedView = ({ onLogout }) => {
  // State to hold user information
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // UseEffect to fetch user information when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/get-user-info', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Send the stored token for authentication
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.log('User State:', user);
          console.error('Failed to fetch user information');
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    fetchUser();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const handleLogout = () => {
    // Perform logout logic, such as clearing the token
    // Upon successful logout, update the parent component's authentication state
    if (onLogout) {
      onLogout();
    }
    localStorage.removeItem('token');
    // Redirect the user to the home page or another route
    navigate('/');
  };

  return (
    <div>
      <h1>Welcome Back!</h1>
      <p>{user && <p>Hello {user.firstName}!</p>}</p>

      {/* Link to add a new item (Log Meal) */}
      <Link to="/log-meal">
        <button>Add a New Item (Log Meal)</button>
      </Link>

      {/* Logout button */}
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default AuthenticatedView;
