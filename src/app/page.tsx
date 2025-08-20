'use client';

import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 scrollable">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-white text-xl font-bold">✈️ FlightNav</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-white/80 text-sm">v1.0.0</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-16">
        <div className="max-w-7xl mx-auto mobile-padding px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
          <div className="text-center">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-4 sm:mb-6">
              Flight Navigation
              <span className="block text-blue-300">Dashboard</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-8 sm:mb-12 max-w-3xl mx-auto px-2">
              Professional aviation calculation tools for pilots, flight instructors, and aviation enthusiasts
            </p>
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <div className="max-w-7xl mx-auto mobile-padding px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Navigation Tools
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto px-2">
            Choose from our suite of professional aviation calculation tools
          </p>
        </div>

        {/* Tool Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Wind Triangle Calculator */}
          <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <div className="mb-6">
              <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-400 transition-colors duration-300">
                <span className="text-2xl">🧭</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Wind Triangle Calculator</h3>
              <p className="text-blue-100 mb-6">
                Calculate heading, drift angle, and ground speed based on wind conditions and true airspeed.
              </p>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-blue-200">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                Wind triangle calculations
              </div>
              <div className="flex items-center text-sm text-blue-200">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                Real-time results
              </div>
              <div className="flex items-center text-sm text-blue-200">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                Input validation
              </div>
              <div className="flex items-center text-sm text-blue-200">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                Mobile friendly
              </div>
            </div>

            <Link 
              href="/calculator"
              className="block w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-4 px-6 rounded-xl text-center transition-colors duration-200 group-hover:bg-blue-500 touch-manipulation"
            >
              Open Calculator
            </Link>
          </div>

          {/* Coming Soon: Distance Calculator */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10 opacity-75">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gray-500 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">📏</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Distance Calculator</h3>
              <p className="text-blue-100 mb-6">
                Calculate great circle distances between airports and waypoints with bearing information.
              </p>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-gray-400">
                <span className="w-2 h-2 bg-gray-500 rounded-full mr-3"></span>
                Great circle calculations
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <span className="w-2 h-2 bg-gray-500 rounded-full mr-3"></span>
                Airport database
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <span className="w-2 h-2 bg-gray-500 rounded-full mr-3"></span>
                Waypoint support
              </div>
            </div>

            <div className="w-full bg-gray-600 text-gray-300 font-semibold py-4 px-6 rounded-xl text-center cursor-not-allowed">
              Coming Soon
            </div>
          </div>

          {/* Coming Soon: Weight & Balance */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10 opacity-75">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gray-500 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">⚖️</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Weight & Balance</h3>
              <p className="text-blue-100 mb-6">
                Calculate center of gravity and ensure aircraft weight and balance compliance.
              </p>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-gray-400">
                <span className="w-2 h-2 bg-gray-500 rounded-full mr-3"></span>
                CG calculations
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <span className="w-2 h-2 bg-gray-500 rounded-full mr-3"></span>
                Aircraft profiles
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <span className="w-2 h-2 bg-gray-500 rounded-full mr-3"></span>
                Load planning
              </div>
            </div>

            <div className="w-full bg-gray-600 text-gray-300 font-semibold py-4 px-6 rounded-xl text-center cursor-not-allowed">
              Coming Soon
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white/5 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose FlightNav?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Built by pilots, for pilots, with precision and ease of use in mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Precision</h3>
              <p className="text-blue-200">Industry-standard calculations with validated algorithms</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Fast</h3>
              <p className="text-blue-200">Instant results with real-time calculation updates</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Mobile Ready</h3>
              <p className="text-blue-200">Optimized for all devices, from cockpit to desktop</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Reliable</h3>
              <p className="text-blue-200">Thoroughly tested and validated by aviation professionals</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/5 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-white text-xl font-bold">✈️ FlightNav</span>
              <span className="text-blue-200 ml-4">Professional Aviation Tools</span>
            </div>
            <div className="text-blue-200 text-sm">
              <p>&copy; 2024 FlightNav. Built for the aviation community.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}