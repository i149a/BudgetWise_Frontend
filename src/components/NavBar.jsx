import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signout } from '../services/auth';

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogout = () => {
    signout(); // Removes token from localStorage
    navigate('/'); // Redirects to home page
    setIsDrawerOpen(false); // Close drawer on logout
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <nav className="navbar">
      {token ? (
        <>
          {/* All links for large screens, visible links for mobile */}
          <div className="nav-group visible-links">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profile</Link>
            {/* Inline links for large screens */}
            <div className="inline-links">
              <Link to="/transactions">Transactions</Link>
              <Link to="/categories">Categories</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>

          {/* Drawer toggle button for mobile */}
          <button
            className="drawer-toggle"
            onClick={toggleDrawer}
            aria-label={isDrawerOpen ? 'Close menu' : 'Open menu'}
          >
            {isDrawerOpen ? (
              // Close Icon SVG
              <svg
                className="drawer-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Hamburger Icon SVG
              <svg
                className="drawer-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          {/* Drawer content for mobile */}
          <div className={`drawer-content ${isDrawerOpen ? 'open' : ''}`}>
            <div className="nav-group">
              <Link to="/transactions" onClick={() => setIsDrawerOpen(false)}>
                Transactions
              </Link>
              <Link to="/categories" onClick={() => setIsDrawerOpen(false)}>
                Categories
              </Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </>
      ) : (
        <div className="nav-group">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;