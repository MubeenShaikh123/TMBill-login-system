import React from 'react'
import { Link } from 'react-router-dom'

const QuickLinks = () => {
    return (
        <>
            {/* Quick Links */}
            <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-3">
                <div className="p-5 text-center bg-white rounded-lg shadow-md">
                    <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 text-blue-600 bg-blue-100 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                    <Link to="/todo" className="font-medium text-blue-600 hover:text-blue-500"
                        style={{ textDecoration: 'underline' }}>
                        Todo List
                    </Link>
                    <p className="mt-1 text-sm text-gray-500">Manage your tasks and stay organized with your todo list.</p>
                </div>
                <div className="p-5 text-center bg-white rounded-lg shadow-md">
                    <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 text-blue-600 bg-blue-100 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Test Section</h3>
                    <p className="mt-1 text-sm text-gray-500">Under development</p>
                </div>
                <div className="p-5 text-center bg-white rounded-lg shadow-md">
                    <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 text-blue-600 bg-blue-100 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Test Section</h3>
                    <p className="mt-1 text-sm text-gray-500">Under development</p>
                </div>
            </div>
        </>
    )
}

export default QuickLinks