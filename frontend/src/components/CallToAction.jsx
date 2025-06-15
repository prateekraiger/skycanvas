import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBtn from "./SearchBtn";

const CallToAction = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/media-library");
  };

  return (
    <div className="relative z-10 border-t border-[#23244a] bg-[#181929]/70 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Explore the Universe?
          </h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of space enthusiasts discovering the cosmos through
            SkyCanvas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SearchBtn onClick={handleGetStartedClick}>Get Started</SearchBtn>
            <a
              href="https://api.nasa.gov/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="px-8 py-3 border border-cyan-400 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-900/20 hover:border-cyan-400 transition-all duration-300">
                View Documentation
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
