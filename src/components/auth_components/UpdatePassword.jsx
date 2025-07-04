import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updatePassword } from '../../services/auth'

const UpdatePassword = () => {
    // Initialize form state as an object with username, email, and password
    const [formData, setFormData] = useState({ oldPassword: '', newPassword: '', confirmNewPassword: '' })
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/

    const validateForm = () => {
        const newErrors = {}

        if (!formData.oldPassword.trim()) {
            newErrors.oldPassword = 'Old Password is required'
        }

        if (!formData.newPassword) {
            newErrors.newPassword = 'New Password is required'
        } else if (!passwordRegex.test(formData.newPassword)) {
            newErrors.newPassword = 'Password must be at least 8 characters with at least one uppercase, one lowercase, and one number'
        }

        if (formData.newPassword !== formData.confirmNewPassword) {
            newErrors.confirmNewPassword = 'Passwords do not match'
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
                await updatePassword(formData)
                window.alert('Your password updated successfully.')
                navigate('/profile')
            }
        } catch (err) {
            const newErrors = {}
            if (err.response && err.response.data && err.response.data.msg) {
                newErrors.error = `Updating password failed: ${err.response.data.msg}. Please try again.`
            } else {
                newErrors.error = `Updating password failed: ${err}. Please try again.`
            }
            setErrors(newErrors)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor='oldPassword'>Old Password:</label>
                    <input
                        id='oldPassword'
                        type="password"
                        name="oldPassword"
                        value={formData.oldPassword}
                        onChange={handleChange}
                        placeholder="Old Password"
                        required
                    />
                    {errors.oldPassword && <span className="error">{errors.oldPassword}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor='newPassword'>New Password:</label>
                    <input
                        id='newPassword'
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="New Password"
                        required
                    />
                    {errors.password && <span className="error">{errors.newPassword}</span>}
                    <div className="password-hints">
                        <p>Password must:</p>
                        <ul>
                            <li className={formData.newPassword.length >= 8 ? 'valid' : ''}>
                                Be at least 8 characters long
                            </li>

                            <li className={/[A-Z]/.test(formData.newPassword) ? 'valid' : ''}>
                                Contain at least one uppercase letter
                            </li>

                            <li className={/[a-z]/.test(formData.newPassword) ? 'valid' : ''}>
                                Contain at least one lowercase letter
                            </li>

                            <li className={/\d/.test(formData.newPassword) ? 'valid' : ''}>
                                Contain at least one number
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor='confirmNewPassword'>Confirm New Password:</label>
                    <input
                        id='confirmNewPassword'
                        type="password"
                        name="confirmNewPassword"
                        value={formData.confirmNewPassword}
                        onChange={handleChange}
                        required
                    />
                    {errors.confirmNewPassword && <span className="error">{errors.confirmNewPassword}</span>}
                </div>
                <button type="submit" className="auth-btn">Update</button>
                {errors.error && <span className="error">{errors.error}</span>}
            </form>
        </>
    )
}

export default UpdatePassword