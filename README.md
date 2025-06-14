# SkyCanvas

SkyCanvas is a modern web application for exploring and visualizing NASA's public data and imagery. It provides a beautiful, interactive interface to access Astronomy Picture of the Day (APOD), Mars Rover photos, EPIC Earth images, asteroid data, and NASA's media library.

## Features
- View Astronomy Picture of the Day (APOD)
- Browse Mars Rover photos by date, camera, and rover
- Explore EPIC (Earth Polychromatic Imaging Camera) images
- Search and view NASA's media library
- Asteroid (NeoWS) data and statistics
- Fast, responsive UI built with React and Tailwind CSS
- Backend API gateway with caching and rate limiting

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express, Axios, Node-Cache
- **APIs:** NASA Open APIs

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Setup

#### 1. Clone the repository
```sh
git clone <your-repo-url>
cd workspace
```

#### 2. Backend Setup
```sh
cd backend
npm install
# Start the backend server (development mode)
npm run dev
```

#### 3. Frontend Setup
```sh
cd ../frontend
npm install
# Start the frontend dev server
npm run dev
```

#### 4. Open in Browser
Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal) to use SkyCanvas.

## Configuration
- **Backend:**
  - NASA API key and base URL are set in `backend/.env`.
  - Rate limiting is disabled in development for smooth local use.
- **Frontend:**
  - API base URL is set in `frontend/.env` as `VITE_API_BASE_URL`.

## Scripts
- `npm run dev` — Start dev server (frontend or backend)
- `npm start` — Start production server (backend only)

## Project Structure
```
workspace/
  backend/    # Express API gateway
  frontend/   # React web app
```

## Credits
- Built by the SkyCanvas Team
- Powered by NASA Open APIs

## License
MIT
