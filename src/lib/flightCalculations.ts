/**
 * Flight Navigation Calculations
 * 
 * This module provides functions to calculate flight navigation parameters
 * including drift angle, heading, and ground speed based on wind conditions.
 */

export interface WindData {
  direction: number; // Wind direction in degrees (where wind is coming from)
  speed: number;     // Wind speed in knots
}

export interface FlightData {
  track: number;        // Desired track in degrees
  trueAirspeed: number; // True airspeed in knots
}

export interface NavigationResult {
  heading: number;      // Required heading in degrees
  driftAngle: number;   // Drift angle in degrees (positive = right drift)
  groundSpeed: number;  // Ground speed in knots
}

/**
 * Convert degrees to radians
 */
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Convert radians to degrees
 */
function toDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

/**
 * Normalize angle to 0-360 degrees
 */
function normalizeAngle(angle: number): number {
  angle = angle % 360;
  if (angle < 0) angle += 360;
  return angle;
}

/**
 * Calculate wind velocity components relative to the desired track
 */
function calculateWindComponents(windData: WindData, track: number): { headwind: number; crosswind: number } {
  // Convert wind direction to wind vector (where wind is going to)
  const windVector = normalizeAngle(windData.direction + 180);
  
  // Calculate the difference between wind vector and track
  const windAngle = toRadians(windVector - track);
  
  // Calculate wind components
  const headwind = windData.speed * Math.cos(windAngle);
  const crosswind = windData.speed * Math.sin(windAngle);
  
  return { headwind, crosswind };
}

/**
 * Calculate flight navigation parameters
 * 
 * @param windData Wind direction (where wind is coming from) and speed
 * @param flightData Desired track and true airspeed
 * @returns Navigation result with heading, drift angle, and ground speed
 */
export function calculateNavigation(windData: WindData, flightData: FlightData): NavigationResult {
  const { headwind, crosswind } = calculateWindComponents(windData, flightData.track);
  
  // Calculate drift angle using the wind triangle
  const driftAngleRad = Math.asin(crosswind / flightData.trueAirspeed);
  const driftAngle = toDegrees(driftAngleRad);
  
  // Calculate heading (track minus drift angle)
  const heading = normalizeAngle(flightData.track - driftAngle);
  
  // Calculate ground speed using Pythagorean theorem
  const tas = flightData.trueAirspeed;
  const groundSpeed = Math.sqrt(
    Math.pow(tas * Math.cos(driftAngleRad) + headwind, 2) +
    Math.pow(tas * Math.sin(driftAngleRad), 2)
  );
  
  return {
    heading: Math.round(heading * 10) / 10,        // Round to 1 decimal place
    driftAngle: Math.round(driftAngle * 10) / 10,  // Round to 1 decimal place
    groundSpeed: Math.round(groundSpeed * 10) / 10  // Round to 1 decimal place
  };
}

/**
 * Validate input parameters
 */
export function validateInputs(windData: WindData, flightData: FlightData): string[] {
  const errors: string[] = [];
  
  if (windData.direction < 0 || windData.direction > 360) {
    errors.push('Wind direction must be between 0 and 360 degrees');
  }
  
  if (windData.speed < 0) {
    errors.push('Wind speed cannot be negative');
  }
  
  if (flightData.track < 0 || flightData.track > 360) {
    errors.push('Track must be between 0 and 360 degrees');
  }
  
  if (flightData.trueAirspeed <= 0) {
    errors.push('True airspeed must be greater than 0');
  }
  
  // Check if crosswind component exceeds true airspeed (impossible situation)
  const { crosswind } = calculateWindComponents(windData, flightData.track);
  if (Math.abs(crosswind) > flightData.trueAirspeed) {
    errors.push('Crosswind component exceeds true airspeed - flight is not possible');
  }
  
  return errors;
}

/**
 * Format angle for display (handles 360/0 degree equivalence)
 */
export function formatAngle(angle: number): string {
  const normalized = normalizeAngle(angle);
  return normalized.toFixed(1) + '°';
}

/**
 * Format speed for display
 */
export function formatSpeed(speed: number): string {
  return speed.toFixed(1) + ' kts';
}
