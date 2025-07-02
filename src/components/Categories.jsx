import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getCategories, deleteCategory } from '../services/category'

const Categories = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories()
                setCategories(data)
                setLoading(false)
            } catch (err) {
                setError('Failed to fetch categories')
                setLoading(false)
            }
        }
        fetchCategories()
    }, [])

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await deleteCategory(id);
                setCategories(categories.filter((c) => c._id !== id))
            } catch (err) {
                setError('Failed to delete category');
            }
        }
    }

    if (loading) return <div>Loading...</div>

    if (error) return <div>{error}</div>

    return (
        <div className="list-container">
            <h1>My Categories</h1>
            <Link to="/categories/new">
                <button>Add New Category</button>
            </Link>
            <div className="items-list">
                {categories.length > 0 ? (
                    categories.map(category => (
                        <div key={category._id} className="category-item">
                            {category.logo && <img src={category.logo} alt={category.name} className="category-logo" />}
                            <h3>{category.name}</h3>
                            <p>{category.description}</p>
                            <Link to={`/categories/${category._id}`}>
                                <button style={{ marginLeft: '10px' }}>Edit</button>
                            </Link>
                            <button onClick={() => handleDelete(category._id)} style={{ marginLeft: '5px' }}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p>No categories found. Create your first category!</p>
                )}
            </div>
        </div>
    )
}

export default Categories