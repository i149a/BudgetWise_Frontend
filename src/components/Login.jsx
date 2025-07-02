import { useState } from 'react'
import { login } from '../services/auth'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    // Initialize form state as an object with email and password
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    // Handle input changes by updating the corresponding field in formValues
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    // Submit the form by passing the formValues object to the login service
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await login(formData) // Pass the entire formValues object
            navigate('/dashboard')
        } catch (err) {
            setError('Login failed. Please check your credentials.')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor='email'>Email:</label>
                <input
                    id='email'
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor='password'>Password:</label>
                <input
                    id='password'
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                />
            </div>
            <button type="submit" className="auth-btn">Login</button>
            {error && <p>{error}</p>}
            <p>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </form>
    )
}

export default Login