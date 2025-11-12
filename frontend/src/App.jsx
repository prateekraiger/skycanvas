import { useState, useEffect, lazy, Suspense } from "react";
import "./index.css";
import ErrorBoundary from "./components/common/ErrorBoundary";
import SpaceBackground from "./components/SpaceBackground";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";

const LazyHomePage = lazy(() => import("./pages/HomePage"));
const LazyAPODPage = lazy(() => import("./pages/APODPage"));
const LazyAsteroidsPage = lazy(() => import("./pages/AsteroidsPage"));
const LazyMediaLibraryPage = lazy(() => import("./pages/MediaLibraryPage"));

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
              <Suspense fallback={<div>Loading Page...</div>}>
                <Routes>
                  <Route path="/" element={<LazyHomePage />} />
                  <Route path="/apod" element={<LazyAPODPage />} />

                  <Route path="/asteroids" element={<LazyAsteroidsPage />} />
                  <Route
                    path="/media-library"
                    element={<LazyMediaLibraryPage />}
                  />
                </Routes>
              </Suspense>
            </div>
            <Footer />
          </BrowserRouter>
        </div>
      </SpaceBackground>
    </ErrorBoundary>
  );
}

export default App;
