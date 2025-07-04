import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getCategories, deleteCategory } from '../../services/category'

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
                let error = ""
                if (err.response && err.response.data && err.response.data.msg) {
                    error = `Failed to fetch categories: ${err.response.data.msg}. Please try again.`
                } else {
                    error = `Failed to fetch categories: ${err}. Please try again.`
                }
                setError(error)
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
                let error = ""
                if (err.response && err.response.data && err.response.data.msg) {
                    error = `Failed to delete category: ${err.response.data.msg}. Please try again.`
                } else {
                    error = `Failed to delete category: ${err}. Please try again.`
                }
                setError(error)
            }
        }
    }

    if (loading) return <div>Loading...</div>

    if (error) return <div>{error}</div>

    return (
        <div className="list-container">
            <h1>My Categories</h1>
            <Link to="/categories/new">
                <button className='add-btn'>Add New Category</button>
            </Link>
            <table className='table-container'>
                <thead>
                    <tr>
                        <th>Logo</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category._id}>
                            <td>{category.logo && <img src={category.logo} alt={category.name} className="category-logo" />}</td>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                            <td>
                                <Link to={`/categories/${category._id}`}>
                                    <button className='add-btn'>Edit</button>
                                </Link>
                                <button className='delete-btn' onClick={() => handleDelete(category._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* <div className="items-list">
                {categories.length > 0 ? (
                    categories.map(category => (
                        <div key={category._id} className="category-item">
                            {category.logo && <img src={category.logo} alt={category.name} className="category-logo" />}
                            <h3>{category.name}</h3>
                            <p>{category.description}</p>
                            <Link to={`/categories/${category._id}`}>
                                <button className='add-btn'>Edit</button>
                            </Link>
                            <button className='delete-btn' onClick={() => handleDelete(category._id)} style={{ marginLeft: '5px' }}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p>No categories found. Create your first category!</p>
                )}
            </div> */}
        </div>
    )
}

export default Categories