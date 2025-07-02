import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCategories, addCategory, updateCategory } from '../services/category'

const CategoryForm = () => {
  const { id } = useParams() // Get category ID from URL if editing
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    description: '',
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const categoryData = await getCategories(id)
          setFormData({
            name: categoryData.name,
            logo: categoryData.logo || '',
            description: categoryData.description || '',
          });
        }
        setLoading(false)
      } catch (err) {
        setError('Failed to load category')
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateCategory(id, formData)
      } else {
        await addCategory(formData)
      }
      navigate('/categories')
    } catch (err) {
      setError('Failed to save category')
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div>
      <h2>{id ? 'Edit Category' : 'New Category'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Logo URL:</label>
          <input
            type="text"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <button type="submit">{id ? 'Update' : 'Add'} Category</button>
        <button type="button" onClick={() => navigate('/categories')}>
          Cancel
        </button>
      </form>
    </div>
  )
}

export default CategoryForm