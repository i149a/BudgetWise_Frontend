import { useState } from 'react'
import { register } from '../../services/auth'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
    // Initialize form state as an object with username, email, and password
    const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '', picture: '' })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/

    const validateForm = () => {
        const newErrors = {}

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required'
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid'
        }

        if (!formData.password) {
            newErrors.password = 'Password is required'
        } else if (!passwordRegex.test(formData.password)) {
            newErrors.password = 'Password must be at least 8 characters with at least one uppercase, one lowercase, and one number'
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // Handle input changes by updating the corresponding field in formValues
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    // Submit the form by passing the formValues object to the register service
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (validateForm()) {
                setLoading(true)
                await register(formData) // Pass the entire formValues object
                setLoading(false)
                navigate('/login')
            }
        } catch (err) {
            const newErrors = {}
            if (err.response && err.response.data && err.response.data.msg) {
                newErrors.error = `Registration failed: ${err.response.data.msg}. Please try again.`
            } else {
                newErrors.error = `Registration failed: ${err}. Please try again.`
            }
            setErrors(newErrors)
            setLoading(false)
        }
    }
    if (loading) {
        return <div className='loading-screen'>Loading...</div>
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor='username'>Username:</label>
                    <input
                        id='username'
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Username"
                        required
                    />
                    {errors.username && <span className="error">{errors.username}</span>}
                </div>
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
                    {errors.email && <span className="error">{errors.email}</span>}
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
                        required
                    />
                    {errors.password && <span className="error">{errors.password}</span>}
                    <div className="password-hints">
                        <p>Password must:</p>
                        <ul>
                            <li className={formData.password.length >= 8 ? 'valid' : ''}>
                                Be at least 8 characters long
                            </li>

                            <li className={/[A-Z]/.test(formData.password) ? 'valid' : ''}>
                                Contain at least one uppercase letter
                            </li>

                            <li className={/[a-z]/.test(formData.password) ? 'valid' : ''}>
                                Contain at least one lowercase letter
                            </li>

                            <li className={/\d/.test(formData.password) ? 'valid' : ''}>
                                Contain at least one number
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor='confirmPassword'>Confirm Password:</label>
                    <input
                        id='confirmPassword'
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor='picture'>Profile Picture URL:</label>
                    <input
                        id='picture'
                        type="text"
                        name="picture"
                        value={formData.picture}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="auth-btn">Register</button>
            </form>
            {errors.error && <span className="error">{errors.error}</span>}
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </>
    )
}

export default Register