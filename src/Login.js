import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // Store the token in localStorage or secure storage
        localStorage.setItem('token', data.token);
        // Update the parent component's authentication state
        onLogin();
        // Redirect to a protected route
        navigate('/');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      {error && <p className="login-error">{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <label className="login-label">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="login-input"
            required
          />
        </label>
        <label className="login-label">
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="login-input"
            required
          />
        </label>
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Log in'}
        </button>
      </form>
      <p className="register-link">
        New user? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
