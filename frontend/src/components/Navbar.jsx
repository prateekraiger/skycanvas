import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
    <nav className="bg-black/40 shadow-md backdrop-blur-md">
      <div className="px-4 sm:px-6 lg:px-8">
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
  );
};

export default Navbar;
