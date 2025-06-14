import React from "react";
import AnimatedTitle from "./AnimatedTitle";
import { Link } from "react-router-dom";

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
    icon: "🌍",
    title: "Earth from Space",
    desc: "Live imagery from NASA's EPIC camera",
    to: "/epic",
  },
  {
    icon: "☄️",
    title: "Asteroid Tracking",
    desc: "NEO database visualization and monitoring",
    to: "/asteroids",
  },
];

const About = () => {
  return (
    <section className="relative mt-0 mb-0 pt-0">
      <div className="relative p-0 md:p-0 rounded-3xl shadow-none border-none overflow-visible bg-transparent">
        <div className="relative z-10 flex flex-col lg:flex-row gap-0 items-center">
          {/* Content section */}
          <div className="flex-1 space-y-8">
            {/* AnimatedTitle heading */}
            <AnimatedTitle text1="About " text2="SkyCanvas" />
            {/* Description with better typography */}
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p className="text-xl text-gray-200">
                Your{" "}
                <span className="font-bold text-cyan-300">
                  interactive gateway
                </span>{" "}
                to the wonders of space, powered by NASA's cutting-edge APIs.
              </p>
              <p>
                Dive into daily cosmic imagery, explore Mars through rover eyes,
                track asteroids, and view our planet from space—all in one
                seamless, beautiful experience designed for the modern space
                explorer.
              </p>
            </div>
            {/* Feature cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-0">
              {features.map((feature, index) => (
                <Link
                  key={index}
                  to={feature.to}
                  className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-cyan-400/30 hover:shadow-lg hover:shadow-cyan-400/20 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <div className="text-3xl mb-3 transition-transform duration-300 group-hover:animate-bounce group-active:scale-90 group-hover:scale-110">
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
            {/* Call to action */}
            <div className="flex flex-wrap gap-4 pt-6">
              <div className="flex items-center gap-3 text-gray-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Powered by NASA APIs</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <div
                  className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <span className="text-sm">Open Source & Free</span>
              </div>
            </div>
          </div>
          {/* Visual element - Enhanced */}
          <div className="relative flex-shrink-0">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              {/* Central content */}
              <div className="absolute inset-4 rounded-full bg-slate-900/80 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div
                    className="text-6xl lg:text-7xl animate-bounce"
                    style={{ animationDuration: "3s" }}
                  >
                    🚀
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-cyan-300">
                      Explore
                    </div>
                    <div className="text-2xl font-bold text-blue-400">
                      Discover
                    </div>
                    <div className="text-2xl font-bold text-blue-300">
                      Wonder
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating elements around the circle */}
              <div className="absolute -top-4 left-1/4 w-8 h-8 bg-cyan-400/30 rounded-full blur-sm animate-pulse"></div>
              <div
                className="absolute top-1/4 -right-4 w-6 h-6 bg-purple-400/30 rounded-full blur-sm animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute -bottom-4 right-1/4 w-10 h-10 bg-pink-400/30 rounded-full blur-sm animate-pulse"
                style={{ animationDelay: "2s" }}
              ></div>
              <div
                className="absolute bottom-1/4 -left-4 w-4 h-4 bg-indigo-400/30 rounded-full blur-sm animate-pulse"
                style={{ animationDelay: "1.5s" }}
              ></div>
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
