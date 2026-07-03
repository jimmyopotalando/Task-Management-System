import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check auth status
  const checkAuth = () => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkAuth();

    // Listen for login/logout changes in other tabs/components
    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setIsLoggedIn(false);

    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h1 className="logo">Task Manager 🚀</h1>

      <ul className="nav-links">
        <li><Link to="/">Dashboard</Link></li>

        {!isLoggedIn && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}

        {isLoggedIn && (
          <>
            <li><Link to="/profile">Profile</Link></li>
            <li>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </li>
          </>
        )}
      </ul>

      {/* Theme is now handled ONLY here */}
      <ThemeToggle />
    </nav>
  );
}

export default Navbar;