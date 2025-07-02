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
    <div>
      <h1>Welcome to BudgetWise</h1>
      <p>Track your income and expenses easily.</p>
      <button onClick={() => navigate('/login')}>Login</button>
      <button onClick={() => navigate('/register')}>Register</button>
    </div>
  )
}

export default Home