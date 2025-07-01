import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryForm = ({ currentUser, onCreateCategory }) => {
    const [formData, setFormData] = useState({
        name: '',
        logo: '',
        description: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreateCategory({
            ...formData,
            user: currentUser._id
        });
        navigate('/categories');
    };

    return (
        <div className="form-container">
            <h2>Create New Category</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
        
                <div className="form-group">
                    <label>Logo URL:</label>
                    <input
                        type="text"
                        name="logo"
                        value={formData.logo}
                        onChange={handleChange}
                    />
                </div>
        
                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
        
                <button type="submit" className="submit-btn">Create Category</button>
            </form>
        </div>
    );
};

export default CategoryForm;