'use client'

import { useState, useEffect } from 'react'
import { XCircle, Home } from 'lucide-react'
import Link from 'next/link'

export default function Page() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center p-4">
      <div 
        className={`bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-500 ease-in-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-red-100 rounded-full animate-ping"></div>
            <XCircle className="w-20 h-20 text-red-500 relative" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mt-4 text-center">Payment Cancelled</h1>
        </div>
        <p className="text-center text-gray-700 text-xl mb-8">
          Payment cancel by user
        </p>
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            <Home className="w-5 h-5 mr-2" />
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}