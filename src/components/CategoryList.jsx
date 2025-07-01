import React from 'react';
import { Link } from 'react-router-dom';

const CategoryList = ({ categories, currentUser }) => {
    const userCategories = categories.filter(cat => cat.user === currentUser._id);

    return (
        <div className="list-container">
            <h2>My Categories</h2>
            <Link to="/categories/new" className="add-btn">Add New Category</Link>
            <div className="items-list">
                {userCategories.length > 0 ? (
                    userCategories.map(category => (
                        <div key={category._id} className="category-item">
                            {category.logo && <img src={category.logo} alt={category.name} className="category-logo" />}
                            <h3>{category.name}</h3>
                            <p>{category.description}</p>
                        </div>
                    ))
                ) : (
                    <p>No categories found. Create your first category!</p>
                )}
            </div>
        </div>
    );
};

export default CategoryList;