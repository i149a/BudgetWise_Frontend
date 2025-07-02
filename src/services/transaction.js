import Client from './api'

// Fetch all transactions for the authenticated user
export const getTransactions = async (id = '') => {
  try {
    const response = await Client.get('/transactions')
    if (id) {
      return response.data.find((t) => t._id == id)
    }
    return response.data
  } catch (error) {
    console.error('Error fetching transactions:', error)
    throw error
  }
}

// Add a new transaction
export const addTransaction = async (transactionData) => {
  try {
    const response = await Client.post('/transactions', transactionData)
    return response.data
  } catch (error) {
    console.error('Error adding transaction:', error)
    throw error
  }
}

// Update an existing transaction by ID
export const updateTransaction = async (id, transactionData) => {
  try {
    const response = await Client.put(`/transactions/${id}`, transactionData)
    return response.data
  } catch (error) {
    console.error('Error updating transaction:', error)
    throw error
  }
}

// Delete a transaction by ID
export const deleteTransaction = async (id) => {
  try {
    const response = await Client.delete(`/transactions/${id}`)
    return response.data; // Returns { status: 'Success', msg: 'Transaction deleted' }
  } catch (error) {
    console.error('Error deleting transaction:', error)
    throw error
  }
}