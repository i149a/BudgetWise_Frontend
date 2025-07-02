import Client from './api'

// Fetch all categories for the authenticated user
export const getCategories = async (id = '') => {
  try {
    const response = await Client.get('/categories')
    if (id) {
      return response.data.find((t) => t._id == id)
    }
    return response.data
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error
  }
}

// Add a new category
export const addCategory = async (categoryData) => {
  try {
    const response = await Client.post('/categories', categoryData)
    return response.data
  } catch (error) {
    console.error('Error adding category:', error)
    throw error
  }
}

// Update an existing category by ID
export const updateCategory = async (id, categoryData) => {
  try {
    const response = await Client.put(`/categories/${id}`, categoryData)
    return response.data
  } catch (error) {
    console.error('Error updating category:', error)
    throw error
  }
}

// Delete a category by ID
export const deleteCategory = async (id) => {
  try {
    const response = await Client.delete(`/categories/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting category:', error)
    throw error
  }
}