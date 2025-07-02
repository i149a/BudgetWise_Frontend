import { Link, useNavigate } from 'react-router-dom'
import { signout } from '../services/auth'

const NavBar = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const handleLogout = () => {
    signout() // Removes token from localStorage
    navigate('/') // Redirects to home page
  }

  return (
    <nav>
      {token ? (
        <>
          <Link to="/dashboard">Dashboard</Link>&nbsp;
          <Link to="/transactions">Transactions</Link>&nbsp;
          <Link to="/categories">Categories</Link>&nbsp;
          <Link to="/profile">Profile</Link>&nbsp;
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>&nbsp;
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  )
}

export default NavBar