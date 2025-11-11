import React from "react";
import AnimatedTitle from "./AnimatedTitle";
import { Link } from "react-router-dom";
import CubeSpinner from "./CubeSpinner";

const features = [
  {
    icon: "🌌",
    title: "Daily APOD",
    desc: "Astronomy Picture of the Day with detailed explanations",
    to: "/apod",
  },
  {
    icon: "🚀",
    title: "Mars Exploration",
    desc: "Rover galleries and real mission data",
    to: "/mars-rover",
  },
  {
    icon: "☄️",
    title: "Asteroids (NEO)",
    desc: "Browse near-Earth asteroids and their close approaches.",
    to: "/asteroids",
  },
  {
    icon: "🖼️",
    title: "Media Library",
    desc: "Browse NASA's vast collection of images, videos, and audio.",
    to: "/media-library",
  },
];

const About = () => {
  return (
    <section
      id="about"
      className="relative mt-10 lg:mt-20 mb-10 pt-0"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-cyan-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
      </div>
      <div className="relative p-0 md:p-0 rounded-3xl shadow-none border-none overflow-visible bg-transparent">
        <div className="relative z-10 flex flex-col lg:flex-row-reverse gap-16 items-center">
          {/* Content section */}
          <div className="flex-1 space-y-8">
            {/* AnimatedTitle heading */}
            <AnimatedTitle text1="About " text2="SkyCanvas" />
            {/* Description with better typography */}
            <div className="space-y-6 text-xl md:text-2xl text-gray-300 leading-normal tracking-wide">
              <p className="text-xl text-gray-200">
                Your{" "}
                <span className="font-extrabold text-cyan-300 drop-shadow-md">
                  interactive gateway
                </span>{" "}
                to the wonders of space, powered by NASA's cutting-edge APIs.
              </p>
              <p>
                Dive into daily cosmic imagery, explore Mars through rover eyes,
                and view our planet from space—all in one seamless, beautiful
                experience designed for the modern space explorer.
              </p>
            </div>
            {/* Feature cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-0">
              {features.map((feature, index) => (
                <Link
                  key={index}
                  to={feature.to}
                  className="group relative bg-gray-900/70 backdrop-blur-sm rounded-xl px-6 py-3 hover:bg-cyan-900/50 transition-all duration-300 border border-gray-700 hover:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 hover:shadow-[0_10px_30px_rgba(0,209,255,0.4)] hover:-translate-y-1 transform animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="text-3xl mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2 text-gray-300 group-hover:text-cyan-300">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-white mb-2 text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
          {/* Visual element - Compact Cube Spinner */}
          <div className="relative flex-shrink-0 flex flex-col items-center justify-center w-full sm:w-80 md:w-72 lg:w-80 lg:mr-auto">
            <div className="flex flex-col items-center justify-center py-2">
              <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 flex items-center justify-center">
                <CubeSpinner />
              </div>
              <div className="mt-3 text-center">
                <div className="text-base font-semibold text-cyan-200">
                  Explore Universe
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom section with additional info */}
        <div className="relative z-10 mt-0 pt-2 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-gray-400">
            <p className="text-sm">
              Built for space enthusiasts, students, and explorers of all ages.
              All data sourced directly from NASA's public repositories.
            </p>
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-white/5 rounded-full text-xs font-medium border border-white/10">
                NASA Certified Data
              </div>
              <div className="px-4 py-2 bg-white/5 rounded-full text-xs font-medium border border-white/10">
                Real-time Updates
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
