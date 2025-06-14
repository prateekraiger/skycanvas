import { useState, useEffect } from "react";
import "./index.css";
import ErrorBoundary from "./components/common/ErrorBoundary";
import SpaceBackground from "./components/SpaceBackground";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import APODPage from "./pages/APODPage";
import MarsRoverPage from "./pages/MarsRoverPage";
import EPICPage from "./pages/EPICPage";
import AsteroidsPage from "./pages/AsteroidsPage";
import MediaLibraryPage from "./pages/MediaLibraryPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading resources
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <h1 className="text-3xl font-bold mt-6 text-white">SkyCanvas</h1>
          <p className="text-gray-300 mt-2">Loading the universe...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <SpaceBackground>
        <div className="min-h-screen text-white flex flex-col">
          <BrowserRouter>
            <Navbar />
            <div className="h-16 w-full" aria-hidden="true"></div>
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/apod" element={<APODPage />} />
                <Route path="/mars-rover" element={<MarsRoverPage />} />
                <Route path="/epic" element={<EPICPage />} />
                <Route path="/asteroids" element={<AsteroidsPage />} />
                <Route path="/media-library" element={<MediaLibraryPage />} />
              </Routes>
            </div>
            <Footer />
          </BrowserRouter>
        </div>
      </SpaceBackground>
    </ErrorBoundary>
  );
}

export default App;
