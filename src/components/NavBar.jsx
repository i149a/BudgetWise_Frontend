import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = ({ currentUser, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/signin');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">BudgetWise</Link>
            </div>
            {currentUser && (
                <div className="navbar-links">
                    <Link to="/transactions/new">Create Transaction</Link>
                    <Link to="/categories/new">Create Category</Link>
                    <Link to="/profile">Profile</Link>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
            )}
        </nav>
    );
};

export default NavBar;