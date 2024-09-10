import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

const Register = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    goal: '',
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
      // Send the registration data to the backend
      const response = await fetch('http://localhost:5001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('User registered successfully');
        if (onLogin) {
          onLogin();
        }
        navigate('/login');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      {error && <p className="register-error">{error}</p>}
      <form onSubmit={handleSubmit} className="register-form">
        <label className="register-label">
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="register-input"
            required
          />
        </label>
        <label className="register-label">
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="register-input"
            required
          />
        </label>
        <label className="register-label">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="register-input"
            required
          />
        </label>
        <label className="register-label">
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="register-input"
            required
          />
        </label>
        <label className="register-label">
          What is your goal for using MacroMate?
          <select
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            className="register-input"
            required
          >
            <option value="">Select your goal</option>
            <option value="lose_weight">Lose Weight</option>
            <option value="build_muscle">Build Muscle</option>
            <option value="maintain_health">Maintain Health</option>
            <option value="other">Other</option>
          </select>
        </label>

        <button type="submit" className="register-button" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <p className="login-link">
        Already a user? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
