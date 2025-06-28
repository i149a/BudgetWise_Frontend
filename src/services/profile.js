import Client from './app.js'

// Fetch the user's profile data
export const getProfile = async () => {
  try {
    const response = await Client.get('/profile')
    return response.data
  } catch (error) {
    console.error('Error fetching profile:', error)
    throw error
  }
}

// Update the user's profile picture
export const updateProfilePicture = async (picture) => {
  try {
    const response = await Client.put('/profile/picture', { picture })
    return response.data
  } catch (error) {
    console.error('Error updating profile picture:', error)
    throw error
  }
}