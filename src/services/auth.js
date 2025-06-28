import Client from './app.js'

// Register a new user
export const register = async (userData) => {
  try {
    const response = await Client.post('/auth/register', userData)
    return response.data
  } catch (error) {
    console.error('Error registering user:', error)
    throw error
  }
}

// Login with email and password
export const login = async (credentials) => {
  try {
    const response = await Client.post('/auth/login', credentials)
    const { token } = response.data
    localStorage.setItem('token', token)
    return response.data
  } catch (error) {
    console.error('Error logging in:', error)
    throw error
  }
}

// Sign out by removing the token from localStorage
export const signout = () => {
  localStorage.removeItem('token')
}

// Update the user's password
export const updatePassword = async (passwordData) => {
  try {
    const response = await Client.put('/auth/update-password', passwordData)
    return response.data
  } catch (error) {
    console.error('Error updating password:', error)
    throw error
  }
}

// Check the current session
export const checkSession = async () => {
  try {
    const response = await Client.get('/auth/session')
    return response.data
  } catch (error) {
    console.error('Error checking session:', error)
    throw error
  }
}