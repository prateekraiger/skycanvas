import React from "react";

const Footer = () => (
  <footer className="bg-gradient-to-t from-[#10111a] to-[#181a24] border-t border-[#23244a] py-8 px-4 mt-8 shadow-inner">
    <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="text-center md:text-left">
        <p className="text-cyan-300 text-base font-semibold tracking-wide">
          SkyCanvas
        </p>
        <p className="text-gray-400 text-xs mt-1">
          Exploring NASA's APIs &mdash; Powered by NASA's Open APIs
        </p>
        <p className="text-gray-600 text-xs mt-2">
          &copy; {new Date().getFullYear()} SkyCanvas. All rights reserved.
        </p>
      </div>
      <div className="flex space-x-6 mt-4 md:mt-0">
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
  </footer>
);

export default Footer;
