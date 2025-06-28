import { useState, useEffect } from 'react'
import { getProfile, updateProfilePicture } from '../services/profile'

const Profile = () => {
  const [profile, setProfile] = useState(null)
  const [newPicture, setNewPicture] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile()
        setProfile(data)
      } catch (err) {
        setError('Failed to load profile.')
      }
    }
    fetchProfile()
  }, [])

  const handleChange = (e) => {
    setNewPicture({ pictureUrl: e.target.value })
  }

  const handleUpdatePicture = async () => {
    try {
      const updatedUser = await updateProfilePicture(newPicture)
      setProfile(updatedUser)
      setNewPicture('')
    } catch (err) {
      setError('Failed to update profile picture.')
    }
  }

  if (!profile) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Profile</h2>
      <p>Username: {profile.username}</p>
      <p>Email: {profile.email}</p>
      {profile.picture ? (
        <img
          src={profile.picture}
          alt="Profile"
          style={{ width: '100px', height: '100px' }}
        />
      ) : (
        <p>No profile picture</p>
      )}
      <div>
        <input
          type="text"
          value={newPicture}
          onChange={handleChange}
          placeholder="New profile picture URL"
        />
        <button onClick={handleUpdatePicture}>Update Picture</button>
      </div>
      {error && <p>{error}</p>}
    </div>
  )
}

export default Profile