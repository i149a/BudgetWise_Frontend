import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Client from '../services/api';
import '../components/StylingFiles/form.css';

const TransactionForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0], // Default to today
        type: 'expense',
        categoryId: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch categories
                const categoriesResponse = await Client.get('/categories');
                setCategories(categoriesResponse.data);

                // If in edit mode, fetch transaction data
                if (id) {
                    const transactionResponse = await Client.get(`/transactions/${id}`);
                    setFormData({
                        amount: Math.abs(transactionResponse.data.amount),
                        description: transactionResponse.data.description,
                        date: transactionResponse.data.date.split('T')[0],
                        type: transactionResponse.data.amount >= 0 ? 'income' : 'expense',
                        categoryId: transactionResponse.data.categoryId
                    });
                }
            } catch (err) {
                setError('Failed to load form data');
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const transactionData = {
                ...formData,
                amount: formData.type === 'income' ? 
                Number(formData.amount) : 
                -Number(formData.amount)
            };

        if (id) {
            // Update existing transaction
            await Client.put(`/transactions/${id}`, transactionData);
        } else {
            // Create new transaction
            await Client.post('/transactions', transactionData);
        }

        navigate('/transactions'); // Redirect to transactions list
        } catch (err) {
            setError(err.response?.data?.message || 'Transaction failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="form-container">
            <div className="form-card">
                <h2>{id ? 'Edit Transaction' : 'Add New Transaction'}</h2>
                {error && <div className="form-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Amount</label>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            min="0.01"
                            step="0.01"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                            >
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <select
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            required
                            >
                                <option value="">Select a category</option>
                                {categories.map(category => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={() => navigate('/transactions')}
                            >
                                Cancel
                        </button>
                        <button
                            type="submit"
                            className="submit-button"
                            disabled={isLoading}
                            >
                                {isLoading ? 'Saving...' : 'Save Transaction'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TransactionForm;