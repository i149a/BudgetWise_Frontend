import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getTransactions, deleteTransaction } from '../services/transaction'

const Transactions = () => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const transactionsData = await getTransactions()
        setTransactions(transactionsData)
        setLoading(false)
      } catch (err) {
        setError(`Failed to fetch transactions: ${err}`)
        setLoading(false)
      }
    }
    fetchTransactions()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await deleteTransaction(id)
        setTransactions(transactions.filter((t) => t._id !== id))
      } catch (err) {
        setError('Failed to delete transaction')
      }
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="list-container">
      <h1>My Transactions</h1>
      <Link to="/transactions/new">
        <button>Add New Transaction</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Category</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{new Date(transaction.date).toLocaleDateString()}</td>
              <td>{transaction.title}</td>
              <td>${transaction.amount.toFixed(2)}</td>
              <td>{transaction.type}</td>
              <td>{transaction.category.name}</td>
              <td>{transaction.description}</td>
              <td>
                <Link to={`/transactions/${transaction._id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(transaction._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Transactions