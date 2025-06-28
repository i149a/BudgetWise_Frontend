import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/StylingFiles/navBar.css'

const Navbar = () => {
    const navigate = useNavigate();

    // Function To Handle Logout Method and Redirect The User Into SignIn Page
    const handleLogout = () => {
        console.log('User logged out');
        navigate('/signin');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo linking to Home Page*/}
                <Link to="/" className="navbar-logo">
                    <img 
                        src="/logo.png" // ISRAA DON'T FORGET TO ADD A LOGO
                        alt="BudgetWise Logo" 
                        width="40" 
                        height="40" 
                    />
                    <span>BudgetWise</span>
                </Link>

                {/* Navigation Links Into The Wanted Pages For The Application*/}
                <ul className="nav-menu">
                    <li className="nav-item">
                        <Link to="/transactions/create" className="nav-link">
                            Create Transaction
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/categories/create" className="nav-link">
                            Create Category
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/categories" className="nav-link">
                            My Categories
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/profile" className="nav-link">
                            Profile
                        </Link>
                    </li>

                    <li className="nav-item">
                        <button onClick={handleLogout} className="nav-link logout-btn">
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;