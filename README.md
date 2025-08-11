# Flight Navigation Calculator

A modern Next.js application for calculating flight navigation parameters including drift angle, heading, and ground speed based on wind conditions.

## Features

- **Wind Triangle Calculations**: Accurate navigation calculations using classical wind triangle methods
- **Real-time Results**: Instant calculation updates as you modify parameters
- **Input Validation**: Comprehensive validation to ensure realistic flight scenarios
- **Modern UI**: Clean, responsive interface with intuitive controls
- **Mobile Friendly**: Fully responsive design that works on all devices

## Flight Parameters

### Input Parameters
- **Wind Direction**: Direction the wind is coming from (0-360°)
- **Wind Speed**: Wind velocity in knots
- **Desired Track**: The ground track you want to fly (0-360°)
- **True Airspeed**: Aircraft's true airspeed in knots

### Calculated Results
- **Required Heading**: The compass heading to fly to maintain the desired track
- **Drift Angle**: Wind correction angle (positive = right drift, negative = left drift)
- **Ground Speed**: Actual speed over the ground in knots

## How It Works

The application uses the wind triangle method to solve navigation problems:

1. **Wind Components**: Calculates headwind and crosswind components relative to the desired track
2. **Drift Angle**: Uses trigonometry to determine how much the wind will push the aircraft off course
3. **Heading**: Calculates the required compass heading to compensate for wind drift
4. **Ground Speed**: Determines the actual speed over the ground considering wind effects

## Getting Started

### Prerequisites
- Node.js 18.18.0 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd flight-nav
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Technology Stack

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React**: UI library

## Example Calculations

### Example 1: Crosswind Landing
- Wind: 270° at 20 knots
- Desired Track: 090°
- True Airspeed: 120 knots

**Results:**
- Heading: ~099.6°
- Drift Angle: ~9.6° (right drift)
- Ground Speed: ~118.3 knots

### Example 2: Headwind
- Wind: 090° at 30 knots  
- Desired Track: 090°
- True Airspeed: 150 knots

**Results:**
- Heading: 090.0°
- Drift Angle: 0.0°
- Ground Speed: 120.0 knots

## Navigation Theory

The calculations are based on the classical wind triangle, which represents the vector relationship between:
- **Air Vector**: Aircraft's velocity relative to the air mass
- **Wind Vector**: Air mass velocity relative to the ground
- **Ground Vector**: Aircraft's velocity relative to the ground

The application solves for the unknown vectors using trigonometric relationships and vector addition principles commonly used in aviation navigation.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This tool is for educational and planning purposes. Always use official navigation equipment and follow proper aviation procedures for actual flight operations.