import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './WelcomeSection.css';
import AboutMacroMate from './AboutMacroMate';

const WelcomeSection = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated by looking for the token
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    

  }, []);

  return (
    <div className="welcome-section">
      <h1>Welcome to MacroMate</h1>
      <p className="subheading">The Ultimate Macro Tracking Companion</p>
      {isLoggedIn ? (
        // Authenticated user content
        <div>
          <p>Welcome back! You are logged in.</p>
          <div className="buttons">
            <Link to="/Diary">
              <button>Diary</button>
            </Link>
            <Link to="/log-meal">
              <button className="button2">Log a Meal</button>
            </Link>
          </div>
        </div>
      ) : (
        // Guest content
        <div>
          <div className="buttons">
            <Link to="/register">
              <button>Start a Diary</button>
            </Link>
            <Link to="/register">
              <button>Log a Meal</button>
            </Link>
          </div>
        </div>
      )}
     <AboutMacroMate></AboutMacroMate> 
    </div>
  );

};

export default WelcomeSection;

