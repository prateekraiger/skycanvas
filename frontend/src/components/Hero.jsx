import React from "react";
import GlobeDemo from "./ui/globe-demo";
import WordRotate from "./ui/WordRotate";

const rotatingWords = ["Universe", "Cosmos", "Galaxy", "Stars", "Planets"];

function Hero() {
  return (
    <section className="relative w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 pt-4 pb-4 lg:pt-16 lg:pb-16 transition-all duration-700 min-h-fit lg:min-h-[80vh] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-cyan-500/5 to-blue-600/10 animate-gradient-move"></div>
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
      </div>

      {/* Left Side - Text Content */}
      <div className="relative z-10 flex-1 max-w-3xl flex flex-col justify-center space-y-8 animate-fade-in-up">
        {/* Main Heading with Futuristic Styling */}
        <div className="space-y-6">
          {/* Primary heading */}
          <div className="relative">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-none tracking-tight">
              <span className="text-white block mb-2 animate-text-reveal">
                Discover the
              </span>
              <span className="relative inline-block">
                {/* Main text with gradient with WordRotate */}
                <WordRotate
                  words={rotatingWords}
                  duration={3000}
                  className=" bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
                />

                {/* Animated border effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-purple-400/20 rounded-2xl blur-xl -z-30 animate-pulse"></div>
              </span>
            </h1>
          </div>

          {/* Brand subtitle */}
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white/90 leading-tight animate-text-reveal delay-500">
              with <span className="text-cyan-400">SkyCanvas</span>
            </h2>
          </div>
        </div>

        {/* Mission statement */}
        <div className="relative space-y-6">
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-300 leading-relaxed font-light tracking-wide animate-text-reveal delay-1000">
            Your gateway to the cosmos through{" "}
            <span className="text-cyan-400 font-medium">
              NASA's powerful APIs
            </span>
          </p>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 leading-relaxed max-w-2xl animate-text-reveal delay-1500">
            Journey through space with stunning astronomical photography,
            real-time satellite data, Mars rover discoveries, and interactive
            visualizations that bring the universe to your fingertips.
          </p>

          {/* Decorative line */}
          <div className="mt-8 w-32 h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-full"></div>
        </div>

        {/* Live status indicators */}
        <div className="flex flex-wrap gap-6 pt-6">
          <div className="flex items-center space-x-3 bg-gray-800/30 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-700/50">
            <div className="relative">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75"></div>
            </div>
            <span className="text-gray-300 font-medium text-sm">
              NASA APIs Online
            </span>
          </div>

          <div className="flex items-center space-x-3 bg-gray-800/30 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-700/50">
            <div className="relative">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse delay-500"></div>
              <div className="absolute inset-0 w-3 h-3 bg-cyan-400 rounded-full animate-ping opacity-75 delay-500"></div>
            </div>
            <span className="text-gray-300 font-medium text-sm">
              Live Data Stream
            </span>
          </div>
        </div>
      </div>

      {/* Right Side - Globe */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-2xl">
        <div className="w-full px-4 lg:px-8">
          <GlobeDemo />
        </div>

        {/* Floating UI elements around globe */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {/* Data points */}
          <div className="absolute top-1/5 left-4 bg-cyan-400/20 backdrop-blur-sm rounded-lg p-3 border border-cyan-400/30 animate-float">
            <div className="text-cyan-400 text-xs font-mono">APOD</div>
            <div className="text-white text-sm font-semibold">Active</div>
          </div>

          <div className="absolute bottom-2/3 right-8 bg-blue-400/20 backdrop-blur-sm rounded-lg p-3 border border-blue-400/30 animate-float delay-1000">
            <div className="text-blue-400 text-xs font-mono">MARS</div>
            <div className="text-white text-sm font-semibold">Online</div>
          </div>

          <div className="absolute top-1/2 left-4 bg-orange-400/20 backdrop-blur-sm rounded-lg p-3 border border-orange-400/30 animate-float delay-2000">
            <div className="text-orange-400 text-xs font-mono">Asteroids</div>
            <div className="text-white text-sm font-semibold">Active</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
