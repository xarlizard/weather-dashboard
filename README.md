# Weather Dashboard

A modern, responsive weather dashboard built with React and Vite, featuring real-time weather data, geolocation, interactive maps, and theme customization.

## Features

- 🌍 Interactive world map for location selection
- 📍 Current location detection
- 🔍 Location search functionality
- 🌡️ Real-time weather data from OpenWeatherMap
- 🎨 Multiple theme options (Light, Dark, Winter, Summer)
- 📱 Fully responsive design
- ⚡ Built with modern React patterns
- 🗺️ Interactive maps using Leaflet
- 💾 Location favorites system

## Prerequisites

- Node.js >= 18.0.0
- npm >= 8.0.0

## Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/xarlizard/weather-dashboard.git
   cd weather-dashboard
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Configure environment variables:**

   - Copy `.env.example` to `.env`
   - Add your OpenWeatherMap API key:

   ```sh
   cp .env.example .env
   # Then edit .env and set VITE_APP_Key=your_api_key
   ```

4. **Run the development server:**
   ```sh
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint the codebase

## Tech Stack

- React 19
- Vite
- React Router v7
- React Bootstrap
- React Leaflet
- Axios
- ESLint

## Project Structure

```
src/
  ├── components/     # React components
  ├── contexts/      # React context providers
  ├── hooks/         # Custom React hooks
  ├── config/        # Configuration files
  ├── utils/         # Utility functions
  ├── mocks/         # Mock data
  └── test/          # Test helpers
```

## Environment Variables

| Variable     | Description            |
| ------------ | ---------------------- |
| VITE_APP_Key | OpenWeatherMap API key |

## License

This project is licensed under the MIT License.

## Author

Charlie ([@xarlizard](https://github.com/xarlizard))

---

**Note:** You need a free API key from [OpenWeatherMap](https://openweathermap.org/api)
