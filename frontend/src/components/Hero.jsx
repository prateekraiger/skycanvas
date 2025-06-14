import React from "react";
import GlobeDemo from "./ui/globe-demo";

function Hero() {
  return (
    <section className="w-full flex flex-col md:flex-row items-center justify-between gap-8 py-12 md:py-20">
      <div className="flex-1 max-w-xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Welcome to <span className="text-cyan-400">Skycanvas</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6">
          Explore the wonders of the universe with NASA APIs. Discover stunning
          images, real-time data, and interactive visualizations—all in one
          place.
        </p>
      </div>
      <div className="flex-1 flex items-center justify-center min-w-[320px] max-w-lg w-full">
        <GlobeDemo />
      </div>
    </section>
  );
}

export default Hero;
