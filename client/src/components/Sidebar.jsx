import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <h2>Menu</h2>

      <ul className="sidebar-links">
        <li>
          <Link to="/">📊 Dashboard</Link>
        </li>

        {isLoggedIn && (
          <>
            <li>
              <Link to="/create-task">➕ Create Task</Link>
            </li>

            <li>
              <Link to="/profile">👤 Profile</Link>
            </li>

            <li>
              <button className="sidebar-logout" onClick={handleLogout}>
                🚪 Logout
              </button>
            </li>
          </>
        )}

        {!isLoggedIn && (
          <>
            <li>
              <Link to="/login">🔐 Login</Link>
            </li>

            <li>
              <Link to="/register">📝 Register</Link>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
}

export default Sidebar;