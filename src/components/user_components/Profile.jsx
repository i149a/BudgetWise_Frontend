import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProfile, updateProfilePicture } from '../../services/profile'

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
        let error = ""
        if (err.response && err.response.data && err.response.data.msg) {
          error = `Failed to fetch profile: ${err.response.data.msg}. Please try again.`
        } else {
          error = `Failed to fetch profile: ${err}. Please try again.`
        }
        setError(error)
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const handleUpdatePicture = async () => {
    setLoading(true)
    try {
      const updatedProfile = await updateProfilePicture(newPicture)
      setProfile(updatedProfile)
      setNewPicture('')
      setIsEditingPicture(false)
      setUpdateError(null)
      setLoading(false)
    } catch (err) {
      let error = ""
      if (err.response && err.response.data && err.response.data.msg) {
        error = `Failed to update profile picture: ${err.response.data.msg}. Please try again.`
      } else {
        error = `Failed to update profile picture: ${err}. Please try again.`
      }
      setError(error)
      setLoading(false)
    }
  }

  if (loading) {
    return <div className='loading-screen'>Loading...</div>
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
            <button className='submit-btn' onClick={handleUpdatePicture}>Save</button>
            <button className='cancel-btn' onClick={() => setIsEditingPicture(false)}>Cancel</button>
            {updateError && <p>{updateError}</p>}
          </div>
        ) : (
          <div>
          <button className='add-btn' onClick={() => {
            setIsEditingPicture(true)
            setUpdateError(null)
          }}>Change Picture</button> </div>
        )}
      </div>

      <div className="profile-info">
        <p>Username: {profile.username}</p>
        <p>Email: {profile.email}</p>
      </div>

      <div className="profile-links">
        <Link to="/transactions" className="profile-link">My Transactions</Link>
        <Link to="/categories" className="profile-link">My Categories</Link>
        <Link to="/profile/update-password" className="profile-link">
          <span className="profile-link-icon">🔑</span>
          Update Password
        </Link>
      </div>

    </div>
  )
}

export default Profile