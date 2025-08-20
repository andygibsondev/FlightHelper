'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  calculateNavigation, 
  validateInputs, 
  formatAngle, 
  formatSpeed,
  type WindData, 
  type FlightData, 
  type NavigationResult 
} from '@/lib/flightCalculations';

export default function FlightNavigationCalculator() {
  const [windData, setWindData] = useState<WindData>({
    direction: 270,
    speed: 20
  });
  
  const [flightData, setFlightData] = useState<FlightData>({
    track: 90,
    trueAirspeed: 120
  });
  
  const [result, setResult] = useState<NavigationResult | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleCalculate = () => {
    const validationErrors = validateInputs(windData, flightData);
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setResult(null);
      return;
    }
    
    setErrors([]);
    const navigationResult = calculateNavigation(windData, flightData);
    setResult(navigationResult);
    setShowResults(true);
  };

  const handleReset = () => {
    setWindData({ direction: 270, speed: 20 });
    setFlightData({ track: 90, trueAirspeed: 120 });
    setResult(null);
    setErrors([]);
    setShowResults(false);
  };

  const handleBackToParameters = () => {
    setShowResults(false); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 scrollable">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link 
                href="/"
                className="flex items-center gap-2 text-white hover:text-blue-300 font-medium transition-colors duration-200 touch-manipulation"
              >
                <span className="text-lg">←</span>
                <span className="text-xl font-bold">✈️ FlightNav</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-white/80 text-sm">Calculator</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-16 py-4 px-3 sm:py-8 sm:px-4">
        <div className="max-w-4xl mx-auto mobile-padding">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">
              Flight Navigation Calculator
            </h1>
            <p className="text-base sm:text-lg text-blue-100 px-2">
              Calculate heading, drift angle, and ground speed based on wind conditions
            </p>
          </div>

          {!showResults ? (
            /* Parameters View */
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-4 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6 sm:mb-8 text-center">Flight Parameters</h2>
                
                {/* Error Display */}
                {errors.length > 0 && (
                  <div className="bg-red-500/20 border border-red-400/50 rounded-lg p-4 mb-6">
                    <div className="flex items-center mb-2">
                      <span className="text-red-400 mr-2">⚠️</span>
                      <h3 className="text-red-300 font-medium">Validation Errors</h3>
                    </div>
                    <ul className="text-red-200 text-sm space-y-1">
                      {errors.map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Wind Data Section */}
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-base sm:text-lg font-medium text-blue-100 mb-4 flex items-center">
                    <span className="bg-blue-500/20 p-2 rounded-lg mr-3 text-lg">🌬️</span>
                    Wind Conditions
                  </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="windDirection" className="block text-sm font-medium text-blue-200 mb-2">
                      Wind Direction (°)
                    </label>
                    <input
                      id="windDirection"
                      type="number"
                      min="0"
                      max="360"
                      value={windData.direction}
                      onChange={(e) => setWindData(prev => ({ ...prev, direction: Number(e.target.value) }))}
                      className="w-full px-4 py-4 text-lg bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent touch-manipulation text-white placeholder-white/60"
                      placeholder="270"
                    />
                    <p className="text-xs text-blue-300 mt-1">Where wind is coming from</p>
                  </div>
                  
                  <div>
                    <label htmlFor="windSpeed" className="block text-sm font-medium text-blue-200 mb-2">
                      Wind Speed (kts)
                    </label>
                    <input
                      id="windSpeed"
                      type="number"
                      min="0"
                      value={windData.speed}
                      onChange={(e) => setWindData(prev => ({ ...prev, speed: Number(e.target.value) }))}
                      className="w-full px-4 py-4 text-lg bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent touch-manipulation text-white placeholder-white/60"
                      placeholder="20"
                    />
                  </div>
                </div>
              </div>

                {/* Flight Data Section */}
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-base sm:text-lg font-medium text-green-100 mb-4 flex items-center">
                    <span className="bg-green-500/20 p-2 rounded-lg mr-3 text-lg">✈️</span>
                    Aircraft Parameters
                  </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="track" className="block text-sm font-medium text-green-200 mb-2">
                      Desired Track (°)
                    </label>
                    <input
                      id="track"
                      type="number"
                      min="0"
                      max="360"
                      value={flightData.track}
                      onChange={(e) => setFlightData(prev => ({ ...prev, track: Number(e.target.value) }))}
                      className="w-full px-4 py-4 text-lg bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent touch-manipulation text-white placeholder-white/60"
                      placeholder="90"
                    />
                    <p className="text-xs text-green-300 mt-1">Desired ground track</p>
                  </div>
                  
                  <div>
                    <label htmlFor="trueAirspeed" className="block text-sm font-medium text-green-200 mb-2">
                      True Airspeed (kts)
                    </label>
                    <input
                      id="trueAirspeed"
                      type="number"
                      min="1"
                      value={flightData.trueAirspeed}
                      onChange={(e) => setFlightData(prev => ({ ...prev, trueAirspeed: Number(e.target.value) }))}
                      className="w-full px-4 py-4 text-lg bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent touch-manipulation text-white placeholder-white/60"
                      placeholder="120"
                    />
                  </div>
                </div>
              </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
                  <button
                    onClick={handleCalculate}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium py-4 px-6 sm:px-8 text-lg rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 touch-manipulation"
                  >
                    Calculate Navigation
                  </button>
                  
                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto px-6 sm:px-8 py-4 bg-white/20 hover:bg-white/30 active:bg-white/40 text-white font-medium rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-white/50 focus:ring-offset-2 touch-manipulation"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Results View */
            <div className="max-w-3xl mx-auto">
              {/* Back Button */}
              <div className="mb-4 sm:mb-6 flex justify-between items-center">
                <button
                  onClick={handleBackToParameters}
                  className="flex items-center gap-2 text-blue-300 hover:text-blue-200 font-medium transition-colors duration-200 touch-manipulation text-sm sm:text-base"
                >
                  <span className="text-lg">←</span>
                  <span className="hidden sm:inline">Back to Parameters</span>
                  <span className="sm:hidden">Back</span>
                </button>
                <Link 
                  href="/"
                  className="flex items-center gap-2 text-white/70 hover:text-white font-medium transition-colors duration-200 touch-manipulation text-sm sm:text-base"
                >
                  <span>🏠</span>
                  <span className="hidden sm:inline">Dashboard</span>
                  <span className="sm:hidden">Home</span>
                </Link>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-4 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6 sm:mb-8 text-center">Navigation Results</h2>
              
              {result && (
                <div className="space-y-6">
                  {/* Input Summary */}
                  <div className="bg-white/10 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                    <h3 className="text-sm sm:text-md font-medium text-white mb-3">Flight Configuration</h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm text-blue-200">
                      <div>
                        <p className="font-medium">Wind</p>
                        <p>{windData.direction}° at {windData.speed} kts</p>
                      </div>
                      <div>
                        <p className="font-medium">Track</p>
                        <p>{flightData.track}°</p>
                      </div>
                      <div>
                        <p className="font-medium">True Airspeed</p>
                        <p>{flightData.trueAirspeed} kts</p>
                      </div>
                      <div>
                        <button
                          onClick={handleBackToParameters}
                          className="text-blue-300 hover:text-blue-200 font-medium text-xs sm:text-sm touch-manipulation py-1"
                        >
                          Edit Values
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Results Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Heading */}
                    <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg p-4 sm:p-6 border border-blue-400/30">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex items-center">
                          <span className="bg-blue-500 text-white p-2 sm:p-3 rounded-lg mr-3 sm:mr-4 text-lg">🧭</span>
                          <div>
                            <h3 className="text-lg sm:text-xl font-medium text-white">Required Heading</h3>
                            <p className="text-xs sm:text-sm text-blue-200">Direction to point aircraft</p>
                          </div>
                        </div>
                        <div className="text-center sm:text-right">
                          <div className="text-2xl sm:text-3xl font-bold text-blue-300">
                            {formatAngle(result.heading)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Ground Speed */}
                    <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-lg p-4 sm:p-6 border border-green-400/30">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex items-center">
                          <span className="bg-green-500 text-white p-2 sm:p-3 rounded-lg mr-3 sm:mr-4 text-lg">⚡</span>
                          <div>
                            <h3 className="text-lg sm:text-xl font-medium text-white">Ground Speed</h3>
                            <p className="text-xs sm:text-sm text-green-200">Speed over ground</p>
                          </div>
                        </div>
                        <div className="text-center sm:text-right">
                          <div className="text-2xl sm:text-3xl font-bold text-green-300">
                            {formatSpeed(result.groundSpeed)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Wind Effect - Full Width */}
                  <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-lg p-4 sm:p-6 border border-purple-400/30">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <span className="bg-purple-500 text-white p-2 sm:p-3 rounded-lg text-lg">🌪️</span>
                      <div className="text-center">
                        <h3 className="text-lg sm:text-xl font-medium text-white mb-1 sm:mb-2">Wind Effect</h3>
                        <div className="text-lg sm:text-2xl font-bold text-purple-300">
                          Wind will cause {Math.abs(result.driftAngle).toFixed(1)}° of {result.driftAngle >= 0 ? 'right' : 'left'} drift
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
                    <button
                      onClick={handleBackToParameters}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium py-4 px-6 sm:px-8 text-base sm:text-lg rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 touch-manipulation"
                    >
                      Calculate New Route
                    </button>
                    
                    <button
                      onClick={handleReset}
                      className="w-full sm:w-auto px-6 sm:px-8 py-4 bg-white/20 hover:bg-white/30 active:bg-white/40 text-white font-medium rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-white/50 focus:ring-offset-2 touch-manipulation"
                    >
                      Reset All
                    </button>
                  </div>
                </div>
              )}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="text-center mt-6 sm:mt-8 text-blue-200/70 text-xs sm:text-sm px-4">
            <p>Flight Navigation Calculator • Wind Triangle Calculations</p>
          </div>
        </div>
      </div>
    </div>
  );
}
