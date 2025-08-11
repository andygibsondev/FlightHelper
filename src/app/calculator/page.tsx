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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
            >
              <span>←</span>
              Return to Dashboard
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Flight Navigation Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Calculate heading, drift angle, and ground speed based on wind conditions
          </p>
        </div>

{!showResults ? (
          /* Parameters View */
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Flight Parameters</h2>
              
              {/* Error Display */}
              {errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center mb-2">
                    <span className="text-red-600 mr-2">⚠️</span>
                    <h3 className="text-red-800 font-medium">Validation Errors</h3>
                  </div>
                  <ul className="text-red-700 text-sm space-y-1">
                    {errors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Wind Data Section */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
                  <span className="bg-blue-100 p-2 rounded-lg mr-3">🌬️</span>
                  Wind Conditions
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="windDirection" className="block text-sm font-medium text-gray-600 mb-2">
                      Wind Direction (°)
                    </label>
                    <input
                      id="windDirection"
                      type="number"
                      min="0"
                      max="360"
                      value={windData.direction}
                      onChange={(e) => setWindData(prev => ({ ...prev, direction: Number(e.target.value) }))}
                      className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="270"
                    />
                    <p className="text-xs text-gray-500 mt-1">Where wind is coming from</p>
                  </div>
                  
                  <div>
                    <label htmlFor="windSpeed" className="block text-sm font-medium text-gray-600 mb-2">
                      Wind Speed (kts)
                    </label>
                    <input
                      id="windSpeed"
                      type="number"
                      min="0"
                      value={windData.speed}
                      onChange={(e) => setWindData(prev => ({ ...prev, speed: Number(e.target.value) }))}
                      className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="20"
                    />
                  </div>
                </div>
              </div>

              {/* Flight Data Section */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
                  <span className="bg-green-100 p-2 rounded-lg mr-3">✈️</span>
                  Aircraft Parameters
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="track" className="block text-sm font-medium text-gray-600 mb-2">
                      Desired Track (°)
                    </label>
                    <input
                      id="track"
                      type="number"
                      min="0"
                      max="360"
                      value={flightData.track}
                      onChange={(e) => setFlightData(prev => ({ ...prev, track: Number(e.target.value) }))}
                      className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="90"
                    />
                    <p className="text-xs text-gray-500 mt-1">Desired ground track</p>
                  </div>
                  
                  <div>
                    <label htmlFor="trueAirspeed" className="block text-sm font-medium text-gray-600 mb-2">
                      True Airspeed (kts)
                    </label>
                    <input
                      id="trueAirspeed"
                      type="number"
                      min="1"
                      value={flightData.trueAirspeed}
                      onChange={(e) => setFlightData(prev => ({ ...prev, trueAirspeed: Number(e.target.value) }))}
                      className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="120"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-8">
                <button
                  onClick={handleCalculate}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-8 text-lg rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Calculate Navigation
                </button>
                
                <button
                  onClick={handleReset}
                  className="px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
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
            <div className="mb-6 flex justify-between items-center">
              <button
                onClick={handleBackToParameters}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
              >
                <span>←</span>
                Back to Parameters
              </button>
              <Link 
                href="/"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-700 font-medium transition-colors duration-200"
              >
                <span>🏠</span>
                Dashboard
              </Link>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Navigation Results</h2>
              
              {result && (
                <div className="space-y-6">
                  {/* Input Summary */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h3 className="text-md font-medium text-gray-800 mb-3">Flight Configuration</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-600">
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
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                        >
                          Edit Values
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Results Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Heading */}
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="bg-blue-500 text-white p-3 rounded-lg mr-4">🧭</span>
                          <div>
                            <h3 className="text-xl font-medium text-gray-800">Required Heading</h3>
                            <p className="text-sm text-gray-600">Direction to point aircraft</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-blue-600">
                            {formatAngle(result.heading)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Ground Speed */}
                    <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="bg-green-500 text-white p-3 rounded-lg mr-4">⚡</span>
                          <div>
                            <h3 className="text-xl font-medium text-gray-800">Ground Speed</h3>
                            <p className="text-sm text-gray-600">Speed over ground</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-green-600">
                            {formatSpeed(result.groundSpeed)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Wind Effect - Full Width */}
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6">
                    <div className="flex items-center justify-center">
                      <span className="bg-purple-500 text-white p-3 rounded-lg mr-4">🌪️</span>
                      <div className="text-center">
                        <h3 className="text-xl font-medium text-gray-800 mb-2">Wind Effect</h3>
                        <div className="text-2xl font-bold text-purple-600">
                          Wind will cause {Math.abs(result.driftAngle).toFixed(1)}° of {result.driftAngle >= 0 ? 'right' : 'left'} drift
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 mt-8">
                    <button
                      onClick={handleBackToParameters}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-8 text-lg rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Calculate New Route
                    </button>
                    
                    <button
                      onClick={handleReset}
                      className="px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
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
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Flight Navigation Calculator • Wind Triangle Calculations</p>
        </div>
      </div>
    </div>
  );
}
