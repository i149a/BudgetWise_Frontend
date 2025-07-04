import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCategories, addCategory, updateCategory } from '../../services/category'

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
        let error = ""
        if (err.response && err.response.data && err.response.data.msg) {
          error = `Failed to load category: ${err.response.data.msg}. Please try again.`
        } else {
          error = `Failed to load category: ${err}. Please try again.`
        }
        setError(error)
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
    e.preventDefault()
    try {
      if (id) {
        await updateCategory(id, formData)
      } else {
        await addCategory(formData)
      }
      navigate('/categories')
    } catch (err) {
      let error = ""
      if (err.response && err.response.data && err.response.data.msg) {
        error = `Failed to save category: ${err.response.data.msg}. Please try again.`
      } else {
        error = `Failed to save category: ${err}. Please try again.`
      }
      setError(error)
    }
  }

  if (loading) return <div className='loading-screen'>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div className='form-container'>
      <h2>{id ? 'Edit Category' : 'New Category'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            id='catname'
            type="text"
            name="catname"
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
        <button type="submit" className='submit-btn'>{id ? 'Update' : 'Add'} Category</button>
        <button type="button" className='cancel-btn' onClick={() => navigate('/categories')}>
          Cancel
        </button>
      </form>
    </div>
  )
}

export default CategoryForm