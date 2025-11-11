import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBtn from "./SearchBtn";

const CallToAction = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/media-library");
  };

  return (
    <section id="cta" className="relative mt-10 lg:mt-20 mb-10 py-16">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 via-gray-900/80 to-blue-900/50"></div>
        <div className="absolute -top-1/2 -left-1/4 w-full h-full bg-cyan-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-1/2 -right-1/4 w-full h-full bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 sm:p-12 text-center overflow-hidden border border-gray-700/50">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 animate-fade-in-up">
            Ready to Explore the Universe?
          </h3>
          <p
            className="text-gray-300 text-lg sm:text-xl mb-8 max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            Join thousands of space enthusiasts discovering the cosmos through
            SkyCanvas.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
            style={{ animationDelay: "400ms" }}
          >
            <SearchBtn
              onClick={handleGetStartedClick}
              className="transform hover:scale-105 transition-transform duration-300"
            >
              Get Started
            </SearchBtn>
            <a
              href="https://api.nasa.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <button className="px-8 py-3 border border-cyan-400 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-400 hover:text-gray-900 transition-all duration-300 transform hover:scale-105 group-hover:shadow-[0_0_20px_rgba(0,209,255,0.7)]">
                View Documentation
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
