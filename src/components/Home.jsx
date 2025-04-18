import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import QuickLinks from './QuickLinks'

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "user@example.com", name: "Username" })

  useEffect(() => {
    const verifySession = async () => {
      const jwtToken = localStorage.getItem("tmbill-acccess-token");

      if (!jwtToken) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/verify-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          console.log('Session verified:', data.user);
          setUser(data.user);
        } else {
          console.error('Session invalid:', data.message);
          navigate('/login');
        }
      } catch (err) {
        console.error('Error verifying session:', err);
        navigate('/login');
      }
    };

    verifySession();
  }, [navigate]);


  const handleLogout = () => {
    localStorage.removeItem("tmbill-acccess-token");
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="px-4 py-4 bg-white shadow-md sm:px-6 lg:px-8">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="text-xl font-bold text-blue-600">TMBILL</div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">Welcome, {user?.name || user?.email || "Username"}</span>
            <button
              onClick={handleLogout}
              className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Card */}
          <div className="p-6 bg-white rounded-xl shadow-lg md:p-8">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-16 h-16 mb-6 text-white bg-blue-600 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h1 className="mb-3 text-2xl font-bold text-gray-900 md:text-3xl">Welcome to TMBILL!</h1>
              <p className="mb-6 text-gray-600">
                We're thrilled to have you here. Your account has been successfully created and you're now logged in.
              </p>

            </div>
          </div>

          <QuickLinks />
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 mt-12 text-center bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm text-gray-500">© 2025 TMBILL. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Home