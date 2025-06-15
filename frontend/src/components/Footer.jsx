import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => (
  <footer className="bg-gradient-to-t from-[#10111a] to-[#181a24] border-t border-[#23244a] pt-8 px-4 mt-8 shadow-inner">
    <div className="w-full flex flex-col md:flex-row md:items-start justify-between items-center gap-8 pb-4">
      <div className="flex items-center justify-center md:justify-start gap-3 text-center md:text-left flex-1 min-w-[180px]">
        <img
          src="/logo.png"
          alt="SkyCanvas Logo"
          className="h-16 w-auto"
          style={{ maxHeight: "56px" }}
        />
        <div>
          <h6 className="text-cyan-300 text-base font-semibold tracking-wide">
            SkyCanvas
          </h6>
          <p className="text-gray-400 text-xs mt-1">
            Exploring NASA's APIs &mdash; Powered by NASA's Open APIs
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center flex-1 min-w-[160px]">
        <h6 className="text-cyan-200 text-sm font-semibold mb-1 tracking-wide">
          Quick Links
        </h6>
        <nav className="flex flex-col md:flex-row md:gap-6 gap-1 text-sm items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-gray-300 hover:text-cyan-400 transition-colors${
                isActive ? " font-bold text-cyan-400" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/apod"
            className={({ isActive }) =>
              `text-gray-300 hover:text-cyan-400 transition-colors${
                isActive ? " font-bold text-cyan-400" : ""
              }`
            }
          >
            APOD
          </NavLink>
          <NavLink
            to="/mars-rover"
            className={({ isActive }) =>
              `text-gray-300 hover:text-cyan-400 transition-colors${
                isActive ? " font-bold text-cyan-400" : ""
              }`
            }
          >
            Mars Rover
          </NavLink>
          <NavLink
            to="/asteroids"
            className={({ isActive }) =>
              `text-gray-300 hover:text-cyan-400 transition-colors${
                isActive ? " font-bold text-cyan-400" : ""
              }`
            }
          >
            Asteroids
          </NavLink>
          <NavLink
            to="/media-library"
            className={({ isActive }) =>
              `text-gray-300 hover:text-cyan-400 transition-colors${
                isActive ? " font-bold text-cyan-400" : ""
              }`
            }
          >
            Media Library
          </NavLink>
        </nav>
      </div>
      <div className="flex flex-col items-center md:items-end flex-1 min-w-[120px] mt-4 md:mt-0">
        <div className="flex space-x-4">
          <a
            href="https://api.nasa.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-white text-2xl transition-colors duration-200"
            aria-label="NASA APIs"
          >
            <i className="fas fa-globe"></i>
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-white text-2xl transition-colors duration-200"
            aria-label="GitHub"
          >
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>
    </div>
    <div className="w-full border-t border-[#23244a] pt-4 pb-2 flex flex-col items-center">
      <p className="text-gray-500 text-xs">
        &copy; 2025 SkyCanvas. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
