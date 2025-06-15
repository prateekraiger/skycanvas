# SkyCanvas: Your Universe Explorer

![SkyCanvas Screenshot/Demo](path/to/your/screenshot.png)

SkyCanvas is a modern, interactive web application designed to bring the wonders of NASA's public data and imagery directly to your browser. It serves as a personal gateway to explore the cosmos, offering a rich collection of features from daily astronomical pictures to detailed Mars Rover missions, and real-time asteroid data.

## ✨ Features

- **Astronomy Picture of the Day (APOD):** Discover a new fascinating image or photograph of our universe daily with detailed explanations.
- **Mars Rover Gallery:** Dive into thousands of images captured by NASA's Curiosity, Opportunity, Spirit, and Perseverance rovers, with advanced filtering by rover, Martian day (sol), Earth date, and camera.
- **Asteroids (Near-Earth Objects):** Browse near-Earth asteroids and their close approaches, providing insights into their orbital data.
- **NASA Media Library Search:** Search and browse NASA's extensive collection of images, videos, and audio.
- **Responsive & Intuitive UI:** Built with React and Tailwind CSS for a seamless experience across devices.
- **Robust Backend API Gateway:** Features data fetching, caching, and rate limiting to optimize requests to NASA's APIs.

## 🚀 Tech Stack

- **Frontend:**

  - [React](https://reactjs.org/): A JavaScript library for building user interfaces.
  - [Vite](https://vitejs.dev/): A fast frontend build tool.
  - [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapid UI development.

- **Backend:**

  - [Node.js](https://nodejs.org/): A JavaScript runtime built on Chrome's V8 JavaScript engine.
  - [Express.js](https://expressjs.com/): A fast, unopinionated, minimalist web framework for Node.js.
  - [Axios](https://axios-http.com/): Promise-based HTTP client for the browser and Node.js.
  - [Node-Cache](https://www.npmjs.com/package/node-cache): A simple caching module for Node.js.

- **APIs:**
  - [NASA Open APIs](https://api.nasa.gov/): The primary data source for all astronomical and planetary data.

## 📖 Getting Started

Follow these steps to get SkyCanvas up and running on your local machine.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)

### API Key Setup

SkyCanvas utilizes NASA's public APIs, which require an API key to function. While a `DEMO_KEY` can be used for initial testing, it has strict rate limits. For stable operation and higher request limits, it is **highly recommended** to obtain your own API key.

1. **Get Your NASA API Key:**
   Visit [https://api.nasa.gov/](https://api.nasa.gov/) and register for a free API key.

2. **Configure Backend API Key:**

   ```
   NASA_API_KEY=YOUR_PERSONAL_NASA_API_KEY_HERE
   ```

### Installation & Running Locally

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourname/skycanvas.git
   cd skycanvas # Navigate into the project directory
   ```

2. **Install Backend Dependencies & Start Server:**

   ```bash
   cd backend
   npm install
   npm run dev # Starts the backend in development mode (with nodemon)
   # The backend will typically run on http://localhost:5000
   ```

3. **Install Frontend Dependencies & Start Dev Server:**
   In a **new terminal window/tab**, navigate to the `frontend` directory:

   ```bash
   cd ../frontend
   npm install
   npm run dev
   # The frontend will typically run on http://localhost:5173
   ```

4. **Open in Browser:**
   Once both the backend and frontend servers are running, open your web browser and visit: `http://localhost:5173` (or the URL displayed in your frontend terminal).

## ⚙️ Configuration

Environment variables are used to manage sensitive information and configuration settings.

- **`backend/.env`:**

  - `NASA_API_KEY`: Your personal NASA API key.

- **`frontend/.env`:**
  - `VITE_API_BASE_URL`: The URL of your backend API (e.g., `http://localhost:5000/api/nasa`).
