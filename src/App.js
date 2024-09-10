import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import WelcomeSection from './WelcomeSection';
import AboutMacroMate from './AboutMacroMate';
import LogAMeal from './LogAMeal';
import Diary from './Diary';
import AuthenView from './AuthenView';
import Register from './Register';
import Login from './Login';
import Logout from './Logout';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <NavBar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<WelcomeSection />} />
          <Route path="/about" element={<AboutMacroMate />} />
          <Route path="/log-meal" element={<LogAMeal />} />
          <Route path="/diary" element={<Diary />} />
          <Route
            path="/register"
            element={<Register onLogin={handleLogin} />}
          />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/auth" element={<AuthenView />} />
           <Route path="/logout" element={<Logout onLogout={handleLogout}/>}/>
        </Routes>
      
      </div>
    </Router>
  );
}

export default App;
