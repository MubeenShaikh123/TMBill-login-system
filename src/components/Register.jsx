import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [otp, setOtp] = useState('')
    const [emailEntered, setEmailEntered] = useState(false)
    const [otpSent, setOtpSent] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSendOtp = async () => {
        if (!email || !email.includes('@')) {
            alert('Please enter a valid email address')
            return
        }

        setLoading(true)
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/sendotp`, {
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

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        setEmailEntered(e.target.value.length > 0)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!otpSent) {
            alert('Please verify your email with OTP first')
            return
        }

        if (phoneNumber.length!=10) {
            alert('Enter a valid phone number with 10 digits, without spaces or special characters.');
            return
        }

        if (password.length<8) {
            alert('Password should be at least 8 characters long...!')
            return
        }

        setLoading(true)
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, phoneNumber, otp }),
            })
            const data = await res.json()

            if (res.ok) {
                alert('Registration successful! Please log in.')
                navigate('/login')
            } else {
                alert(data.message || 'Registration failed')
            }
        } catch (error) {
            alert('Error during registration. Please try again.')
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gradient-to-br from-blue-50 to-indigo-100 sm:px-6 lg:px-8">
            <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-xl shadow-xl sm:p-8 md:space-y-8">
                <div className="text-center">
                    <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">Create account</h2>
                    <p className="mt-2 text-sm text-gray-600">Sign up to get started</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                maxLength={20}
                                className="relative block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

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
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                                Phone Number
                            </label>
                            <input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="tel"
                                autoComplete="tel"
                                required
                                className="relative block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                placeholder="1234567890"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="relative block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="relative flex justify-center w-full px-4 py-3 text-sm font-medium text-white transition duration-150 bg-blue-600 border border-transparent rounded-md group hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-base disabled:opacity-50"
                            disabled={loading || !otpSent}
                        >
                            {loading ? 'Processing...' : 'Create account'}
                        </button>
                    </div>
                </form>

                <div className="text-center">
                    <p className="mt-2 text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register