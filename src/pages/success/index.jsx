'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, Home, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, [])
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center p-4">
      <div
        className={`bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-500 ease-in-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-green-100 rounded-full animate-ping"></div>
            <CheckCircle className="w-20 h-20 text-green-500 relative" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mt-4 text-center">
            Payment Successful!
          </h1>
        </div>

        <p className="text-center text-gray-700 text-xl mb-4">
          Thank you for your payment. Your transaction has been completed successfully.
        </p>

        <div className="mt-8 text-center space-y-4">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            <Home className="w-5 h-5 mr-2" />
            Go to Home
          </Link>
          <Link
            href="/build"
            className="inline-flex items-center px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Build again
          </Link>
        </div>
      </div>
    </div>
  );
}
