import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProfile, updateProfilePicture } from '../services/profile'

const Profile = () => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isEditingPicture, setIsEditingPicture] = useState(false)
  const [newPicture, setNewPicture] = useState('')
  const [updateError, setUpdateError] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile()
        setProfile(data)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch profile')
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const handleUpdatePicture = async () => {
    try {
      const updatedProfile = await updateProfilePicture(newPicture)
      setProfile(updatedProfile)
      setNewPicture('')
      setIsEditingPicture(false)
      setUpdateError(null)
    } catch (err) {
      setUpdateError('Failed to update profile picture')
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <div className="profile-info">
        {profile.picture ? (
          <img src={profile.picture} alt="Profile Picture" />
        ) : (
          <p>No profile picture</p>
        )}
        {isEditingPicture ? (
          <div>
            <input
              type="text"
              value={newPicture}
              onChange={(e) => setNewPicture(e.target.value)}
              placeholder="New Picture URL"
            />
            <button onClick={handleUpdatePicture}>Save</button>
            <button onClick={() => setIsEditingPicture(false)}>Cancel</button>
            {updateError && <p>{updateError}</p>}
          </div>
        ) : (
          <button onClick={() => {
            setIsEditingPicture(true)
            setUpdateError(null)
          }}>Change Picture</button>
        )}
        <p>Username: {profile.username}</p>
        <p>Email: {profile.email}</p>
      </div>

      <div className="profile-links">
        <Link to="/transactions" className="profile-link">My Transactions</Link>&nbsp;
        <Link to="/categories" className="profile-link">My Categories</Link>
      </div>

    </div>
  )
}

export default Profile