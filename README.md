# Weather Dashboard

A modern, responsive weather dashboard built with React and Vite, featuring real-time weather data, geolocation, interactive maps, and theme customization.

## Features

- **Home overview** – Weather for 5 major cities (Milan, Barcelona, Bristol, Amsterdam, Tokyo)
- **Favorites** – Save locations with one click; view on home and the dedicated Favorites page
- **Interactive map** – Click anywhere to get weather for that location
- **Search** – Find weather by coordinates or city name
- **Current location** – Use device geolocation for instant weather
- **Real-time data** – Weather from OpenWeatherMap API
- **Themes** – Light, Dark, Winter, and Summer
- **Responsive** – Works on desktop, tablet, and mobile

## Prerequisites

- Node.js >= 20 (required for Vite 8)
- [Bun](https://bun.sh) or npm

## Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/xarlizard/weather-dashboard.git
   cd weather-dashboard
   ```

2. **Install dependencies:**

   ```sh
   bun install
   # or: npm install
   ```

3. **Configure environment variables:**

   - Copy `.env.example` to `.env`
   - Add your OpenWeatherMap API key:

   ```sh
   cp .env.example .env
   # Edit .env and set VITE_APP_Key=your_api_key
   ```

4. **Run the development server:**

   ```sh
   bun dev
   # or: npm run dev
   ```

## Available Scripts

| Command | Description |
|---------|-------------|
| `bun dev` / `npm run dev` | Start development server |
| `bun run build` / `npm run build` | Build for production |
| `bun run preview` / `npm run preview` | Preview production build |
| `bun run lint` / `npm run lint` | Lint the codebase |
| `bun run lint:fix` / `npm run lint:fix` | Lint and fix issues |

## Tech Stack

- **React 19** – UI framework
- **Vite 8** – Build tool
- **React Router v7** – Routing
- **Tailwind CSS v4** – Styling
- **shadcn/ui** – Component library
- **Lucide React** – Icons
- **React Leaflet** – Interactive maps
- **Axios** – HTTP client

## Project Structure

```
src/
├── components/
│   ├── common/          # Shared components
│   ├── features/       # Feature-specific components
│   │   ├── map/        # Map selector
│   │   ├── search/     # Coordinate & city search
│   │   └── weather/    # Weather cards, favorites
│   ├── layout/         # Dashboard layout, sidebar
│   └── ui/             # shadcn components
├── config/             # Theme configuration
├── contexts/           # React context (Weather)
├── hooks/              # useWeather, useFavorites, useTheme
├── lib/                # Utilities (cn)
└── mocks/              # Mock data
```

## Deployment (Cloudflare Pages)

The project is configured for Cloudflare Pages:

- **wrangler.toml** – Pages configuration and build output
- **.nvmrc** – Node.js 22 for Vite 8 compatibility

1. Connect your GitHub repo to Cloudflare Pages
2. Build command: `bun run build` (or `npm run build`)
3. Build output directory: `dist`
4. Add `VITE_APP_Key` as an environment variable in Cloudflare

## Environment Variables

| Variable     | Description            |
|-------------|------------------------|
| VITE_APP_Key | OpenWeatherMap API key |

Get a free API key at [OpenWeatherMap](https://openweathermap.org/api).

## License

MIT License

## Author

Charlie ([@xarlizard](https://github.com/xarlizard))
