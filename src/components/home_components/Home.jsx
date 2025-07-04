import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/dashboard') // Redirect to dashboard if logged in
    }
  }, [navigate]);

  return (
    <div className='container'>
      <h1>Welcome to BudgetWise</h1>
      <p>Track your income and expenses easily.</p>
      <button className='submit-btn' onClick={() => navigate('/login')}>Login</button>
      <button className='cancel-btn' onClick={() => navigate('/register')}>Register</button>
    </div>
  )
}

export default Home