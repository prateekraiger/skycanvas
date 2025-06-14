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
import MediaLibraryPage from "./pages/MediaLibraryPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading resources
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0a1a2f] via-[#181929] to-[#23244a]">
        <Loader />
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
