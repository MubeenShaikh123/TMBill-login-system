import React, { Children, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const Layout = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifySession = async () => {
            console.log('verifying session');
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
                    setLoading(false);
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

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-lg text-gray-700">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
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
            <div className="flex-grow px-4 py-8 md:py-16">
                <div className="max-w-4xl mx-auto">
                    <Outlet context={{ user }} /> {/* Children will render here */}
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

export default Layout