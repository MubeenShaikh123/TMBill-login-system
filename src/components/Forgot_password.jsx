import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Forgot_Password = () => {
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [otp, setOtp] = useState('')
    const [emailEntered, setEmailEntered] = useState(false)
    const [otpSent, setOtpSent] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        setEmailEntered(e.target.value.length > 0)
    }

    const handleSendOtp = async () => {
        if (!email || !email.includes('@')) {
            alert('Please enter a valid email address')
            return
        }

        setLoading(true)
        try {
            const res = await fetch('http://localhost:5000/api/sendotp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })
            const data = await res.json()

            if (res.ok) {
                setOtpSent(true)
                alert('OTP sent to your email address')
            } else {
                alert(data.message || 'Failed to send OTP')
            }
        } catch (error) {
            alert('Error sending OTP. Please try again.')
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!otpSent) {
            alert('Please verify your email with OTP first')
            return
        }

        if (newPassword !== confirmPassword) {
            alert('Passwords do not match')
            return
        }

        if (newPassword.length < 6) {
            alert('Password must be at least 6 characters long')
            return
        }

        setLoading(true)
        try {
            const res = await fetch('http://localhost:5000/api/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, newPassword, otp }),
            })
            const data = await res.json()

            if (res.ok) {
                alert('Password reset successful! Please log in with your new password.')
                navigate('/login')
            } else {
                alert(data.message || 'Password reset failed')
            }
        } catch (error) {
            alert('Error resetting password. Please try again.')
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gradient-to-br from-blue-50 to-indigo-100 sm:px-6 lg:px-8">
            <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-xl shadow-xl sm:p-8 md:space-y-8">
                <div className="text-center">
                    <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">Reset Password</h2>
                    <p className="mt-2 text-sm text-gray-600">Enter your email to receive a verification code</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="flex mt-1 space-x-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={handleEmailChange}
                                    disabled={otpSent}
                                />
                                {emailEntered && !otpSent && (
                                    <button
                                        type="button"
                                        className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                                        onClick={handleSendOtp}
                                        disabled={loading}
                                    >
                                        {loading ? 'Sending...' : 'Send OTP'}
                                    </button>
                                )}
                            </div>
                        </div>

                        {otpSent && (
                            <div>
                                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                                    OTP Verification
                                </label>
                                <input
                                    id="otp"
                                    name="otp"
                                    type="text"
                                    required
                                    className="relative block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    placeholder="Enter OTP sent to your email"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                                <p className="mt-1 text-xs text-gray-500">
                                    Please check your email for the verification code
                                </p>
                            </div>
                        )}

                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                                New Password
                            </label>
                            <input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="relative block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                placeholder="••••••••"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm New Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="relative block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {newPassword && confirmPassword && newPassword !== confirmPassword && (
                                <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="relative flex justify-center w-full px-4 py-3 text-sm font-medium text-white transition duration-150 bg-blue-600 border border-transparent rounded-md group hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-base disabled:opacity-50"
                            disabled={loading || !otpSent || newPassword !== confirmPassword || newPassword.length < 6}
                        >
                            {loading ? 'Processing...' : 'Reset Password'}
                        </button>
                    </div>
                </form>

                <div className="text-center">
                    <p className="mt-2 text-sm text-gray-600">
                        Remember your password?{' '}
                        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Forgot_Password