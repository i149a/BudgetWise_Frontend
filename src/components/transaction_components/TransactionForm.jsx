import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getTransactions, addTransaction, updateTransaction } from '../../services/transaction'
import { getCategories } from '../../services/category'

const TransactionForm = () => {
  const { id } = useParams() // Get transaction ID from URL if editing
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'expense',
    date: new Date().toISOString().split('T')[0], // Default to today
    description: '',
    category: '',
  });
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getCategories()
        setCategories(categoriesData);

        if (id) {
          const transactionData = await getTransactions(id)
          setFormData({
            title: transactionData.title,
            amount: transactionData.amount,
            type: transactionData.type,
            date: new Date(transactionData.date).toISOString().split('T')[0],
            description: transactionData.description || '',
            category: transactionData.category._id,
          })
        }
        setLoading(false)
      } catch (err) {
        let error = ""
        if (err.response && err.response.data && err.response.data.msg) {
          error = `Failed to load transactions: ${err.response.data.msg}. Please try again.`
        } else {
          error = `Failed to load transactions: ${err}. Please try again.`
        }
        setError(error)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (id) {
        // Update existing transaction
        await updateTransaction(id, {
          ...formData,
          amount: parseFloat(formData.amount),
        })
      } else {
        // Create new transaction
        await addTransaction({
          ...formData,
          amount: parseFloat(formData.amount),
        })
      }
      navigate('/transactions') // Redirect to transaction list
    } catch (err) {
      let error = ""
      if (err.response && err.response.data && err.response.data.msg) {
        error = `Failed to save transaction: ${err.response.data.msg}. Please try again.`
      } else {
        error = `Failed to save transaction: ${err}. Please try again.`
      }
      setError(error)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div className='form-container'>
      <h2>{id ? 'Edit Transaction' : 'New Transaction'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            step="0.01"
          />
        </div>
        <div>
          <label>Type:</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
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
        <div>
          <label>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className='submit-btn'>{id ? 'Update' : 'Add'} Transaction</button>
        <button type="button" className='cancel-btn' onClick={() => navigate('/transactions')}>
          Cancel
        </button>
      </form>
    </div>
  )
}

export default TransactionForm