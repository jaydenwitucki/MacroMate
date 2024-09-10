import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from './imgs/aaa-modified.png';
import './NavBar.css';

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated by looking for the token
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="navbar">
      <div className="logo-container">
        <img className='logo1' src={logoImg} alt="Logo" />
        <span>Macro Mate</span>
      </div>
      <div className="nav-links">
        {/* <a href="/">Diary</a> */}
        <a href="/">Home</a>
        <Link to="/diary">Diary</Link>
        {isLoggedIn ? (
          <Link to="/logout" onClick={handleLogout}>Sign Out</Link>
        ) : (
          <Link to="/register">Login/Signup</Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
