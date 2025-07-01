import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = ({ onSignUp }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        picture: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,8}$/;

    const validateForm = () => {
        const newErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (!passwordRegex.test(formData.password)) {
            newErrors.password = 'Password must be 6-8 characters with at least one uppercase, one lowercase, and one number';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (validateForm()) {
            onSignUp(formData);
            navigate('/');
        }
    };

    return (
        <div className="auth-container">
            <h1>Welcome to BudgetWise</h1>
            <h2>Sign Up to Get Started</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    {errors.username && <span className="error">{errors.username}</span>}
                </div>
            
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
        
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <span className="error">{errors.password}</span>}
                
                    <div className="password-hints">
                        <p>Password must:</p>
                        <ul>
                            <li className={formData.password.length >= 6 && formData.password.length <= 8 ? 'valid' : ''}>
                                Be 6-8 characters long
                            </li>
              
                            <li className={/[A-Z]/.test(formData.password) ? 'valid' : ''}>
                                Contain at least one uppercase letter
                            </li>

                            <li className={/[a-z]/.test(formData.password) ? 'valid' : ''}>
                                Contain at least one lowercase letter
                            </li>

                            <li className={/\d/.test(formData.password) ? 'valid' : ''}>
                                Contain at least one number
                            </li>
                        </ul>
                    </div>
                </div>
        
                <div className="form-group">
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                </div>
        
                <div className="form-group">
                    <label>Profile Picture URL:</label>
                    <input
                            type="text"
                            name="picture"
                            value={formData.picture}
                            onChange={handleChange}
                    />
                </div>

                <button type="submit" className="auth-btn">Sign Up</button>
            </form>
            
            <p>
                Already have an account? <Link to="/signin">Sign In</Link>
            </p>
        </div>
    );
};

export default SignUp;