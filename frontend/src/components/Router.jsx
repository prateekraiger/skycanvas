import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import HomePage from "../pages/HomePage";
import APODPage from "../pages/APODPage";
import MarsRoverPage from "../pages/MarsRoverPage";
import EPICPage from "../pages/EPICPage";
import AsteroidsPage from "../pages/AsteroidsPage";
import MediaLibraryPage from "../pages/MediaLibraryPage";

const Router = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on window resize to prevent UI issues
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        {/* Navigation */}
        <nav className="bg-slate-800 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <NavLink to="/" className="flex-shrink-0 flex items-center">
                  <i className="fas fa-rocket text-blue-400 text-2xl mr-2"></i>
                  <span className="font-bold text-xl">SkyCanvas</span>
                </NavLink>
              </div>

              {/* Mobile menu button */}
              <div className="flex items-center md:hidden">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-slate-700 focus:outline-none"
                >
                  <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
                </button>
              </div>

              {/* Desktop navigation */}
              <div className="hidden md:flex md:items-center md:space-x-4">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? "bg-slate-700 text-white"
                        : "text-gray-300 hover:bg-slate-700 hover:text-white"
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/apod"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? "bg-slate-700 text-white"
                        : "text-gray-300 hover:bg-slate-700 hover:text-white"
                    }`
                  }
                >
                  APOD
                </NavLink>
                <NavLink
                  to="/mars-rover"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? "bg-slate-700 text-white"
                        : "text-gray-300 hover:bg-slate-700 hover:text-white"
                    }`
                  }
                >
                  Mars Rover
                </NavLink>
                <NavLink
                  to="/epic"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? "bg-slate-700 text-white"
                        : "text-gray-300 hover:bg-slate-700 hover:text-white"
                    }`
                  }
                >
                  Earth View
                </NavLink>
                <NavLink
                  to="/asteroids"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? "bg-slate-700 text-white"
                        : "text-gray-300 hover:bg-slate-700 hover:text-white"
                    }`
                  }
                >
                  Asteroid Tracker
                </NavLink>
                <NavLink
                  to="/media-library"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? "bg-slate-700 text-white"
                        : "text-gray-300 hover:bg-slate-700 hover:text-white"
                    }`
                  }
                >
                  Media Library
                </NavLink>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive
                        ? "bg-slate-700 text-white"
                        : "text-gray-300 hover:bg-slate-700 hover:text-white"
                    }`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/apod"
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive
                        ? "bg-slate-700 text-white"
                        : "text-gray-300 hover:bg-slate-700 hover:text-white"
                    }`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  APOD
                </NavLink>
                <NavLink
                  to="/mars-rover"
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive
                        ? "bg-slate-700 text-white"
                        : "text-gray-300 hover:bg-slate-700 hover:text-white"
                    }`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  Mars Rover
                </NavLink>
                <NavLink
                  to="/epic"
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive
                        ? "bg-slate-700 text-white"
                        : "text-gray-300 hover:bg-slate-700 hover:text-white"
                    }`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  Earth View
                </NavLink>
                <NavLink
                  to="/asteroids"
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive
                        ? "bg-slate-700 text-white"
                        : "text-gray-300 hover:bg-slate-700 hover:text-white"
                    }`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  Asteroid Tracker
                </NavLink>
                <NavLink
                  to="/media-library"
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive
                        ? "bg-slate-700 text-white"
                        : "text-gray-300 hover:bg-slate-700 hover:text-white"
                    }`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  Media Library
                </NavLink>
              </div>
            </div>
          )}
        </nav>

        {/* Main Content */}
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

        {/* Footer */}
        <footer className="bg-slate-800 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-gray-400 text-sm">
                  SkyCanvas - Exploring NASA's APIs
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Powered by NASA's Open APIs
                </p>
              </div>
              <div className="flex space-x-4">
                <a
                  href="https://api.nasa.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <i className="fas fa-globe"></i>
                </a>
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default Router;
