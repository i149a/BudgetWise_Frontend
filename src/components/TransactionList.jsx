import React from 'react';
import { Link } from 'react-router-dom';

const TransactionList = ({ transactions, categories, currentUser }) => {
    const userTransactions = transactions.filter(t => t.user === currentUser._id);

    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat._id === categoryId);
        return category ? category.name : 'Unknown';
    };

    return (
        <div className="list-container">
            <h2>My Transactions</h2>
            <Link to="/transactions/new" className="add-btn">Add New Transaction</Link>
            <div className="items-list">
                {userTransactions.length > 0 ? (
                    userTransactions.map(transaction => (
                        <div key={transaction._id} className={`transaction-item ${transaction.type}`}>
                            <h3>{transaction.title}</h3>
                            <p>Amount: ${transaction.amount.toFixed(2)}</p>
                            <p>Type: {transaction.type}</p>
                            <p>Date: {new Date(transaction.date).toLocaleDateString()}</p>
                            <p>Category: {getCategoryName(transaction.category)}</p>
                            {transaction.description && <p>Description: {transaction.description}</p>}
                        </div>
                    ))
                ) : (
                        <p>No transactions found. Create your first transaction!</p>
                    )}
            </div>
        </div>
    );
};

export default TransactionList;