import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import QuickLinks from './QuickLinks'

const Home = ({ user }) => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
    </div>
  )
}

export default Home