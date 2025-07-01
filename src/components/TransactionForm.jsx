import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TransactionForm = ({ currentUser, categories, onCreateTransaction }) => {
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        type: 'expense',
        date: new Date().toISOString().split('T')[0],
        description: '',
        category: '',
        user: currentUser._id
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreateTransaction({
            ...formData,
            amount: parseFloat(formData.amount)
        });
        navigate('/transactions');
    };

    const userCategories = categories.filter(cat => cat.user === currentUser._id);

    return (
        <div className="form-container">
            <h2>Create New Transaction</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
        
                <div className="form-group">
                    <label>Amount:</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        required
                    />
                </div>
        
                <div className="form-group">
                    <label>Type:</label>
                    <select name="type" value={formData.type} onChange={handleChange} required>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
        
                <div className="form-group">
                    <label>Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>
        
                <div className="form-group">
                    <label>Category:</label>
                    <select name="category" value={formData.category} onChange={handleChange} required>
                        <option value="">Select a category</option>
                            {userCategories.map(cat => (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))}
                    </select>
                </div>
        
                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
        
                <button type="submit" className="submit-btn">Create Transaction</button>
            </form>
        </div>
    );
};

export default TransactionForm;