import React from "react";
import GlobeDemo from "./ui/globe-demo";

function Hero() {
  return (
    <section className="w-full flex flex-col md:flex-row items-center justify-between gap-8 pt-8 pb-8 transition-all duration-500 min-h-[60vh]">
      <div className="flex-1 max-w-2xl flex flex-col items-start justify-center pb-12 -mt-48 animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-lg text-left">
          Welcome to{" "}
          <span className="text-cyan-400 text-7xl md:text-8xl block leading-tight">
            SkyCanvas
          </span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 mb-6 drop-shadow text-left">
          Explore the wonders of the universe with NASA APIs. Discover stunning
          images, real-time data, and interactive visualizations—all in one
          place.
        </p>
      </div>
      {/* Globe on the right */}
      <div className="flex-1 flex flex-col items-center justify-center min-w-[320px] max-w-lg w-full">
        <GlobeDemo />
      </div>
    </section>
  );
}

export default Hero;

/* Add this to your global CSS or tailwind config for the fade-in animation:
@keyframes fade-in-up {
  0% { opacity: 0; transform: translateY(40px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fade-in-up 1s cubic-bezier(0.4,0,0.2,1) both;
}
*/
