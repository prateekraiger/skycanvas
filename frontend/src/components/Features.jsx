import React from "react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Astronomy Picture of the Day",
    description:
      "Discover the cosmos with NASA's daily featured image and explanation.",
    icon: "fas fa-image",
    color: "#32a6ff",
    to: "/apod",
  },
  {
    title: "Mars Rover Gallery",
    description:
      "Explore Mars through the eyes of NASA's rovers with thousands of surface images.",
    icon: "fas fa-robot",
    color: "#ff5e5e",
    to: "/mars-rover",
  },
  {
    title: "Earth View",
    description:
      "View stunning images of Earth captured by NASA's EPIC camera.",
    icon: "fas fa-globe",
    color: "#34d399",
    to: "/epic",
  },
  {
    title: "Asteroid Tracker",
    description:
      "Track near-Earth objects and visualize asteroid data from NASA's NEO database.",
    icon: "fas fa-meteor",
    color: "#facc15",
    to: "/asteroids",
  },
];

const Card = ({ title, description, icon, color, to }) => (
  <Link
    to={to}
    className="relative w-full h-40 rounded-xl overflow-hidden font-sans text-base flex flex-col isolate bg-[#29292c] group shadow-lg border border-[#23244a] transition-all duration-300 hover:scale-105 hover:border-cyan-400 hover:shadow-[0_0_32px_#00d1ff55]"
  >
    {/* Inner dark background layer */}
    <div className="absolute inset-[1px] bg-[#18181b] rounded-[0.9375rem] z-10"></div>
    {/* Left vertical glow strip */}
    <div
      className="absolute w-1 inset-y-[10px] left-2 rounded-sm bg-gradient-to-b z-20 group-hover:translate-x-1 transition-transform duration-300"
      style={{ background: `linear-gradient(to bottom, ${color}, #23244a)` }}
    ></div>
    {/* Glow effects */}
    <div className="absolute w-[20rem] h-[20rem] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_closest-side,_white,_transparent)] opacity-0 transition-opacity duration-300 z-0 group-hover:opacity-10"></div>
    {/* Content */}
    <div className="relative z-30 pt-4 pl-6 pr-4 pb-2 flex flex-col h-full justify-between">
      <div className="flex items-center gap-3">
        <span className="text-3xl" style={{ color }}>
          <i className={icon}></i>
        </span>
        <span className="text-lg font-semibold text-white">{title}</span>
      </div>
      <div className="text-[#99999d] mt-2 text-sm line-clamp-3">
        {description}
      </div>
    </div>
  </Link>
);

const Features = () => (
  <section className="mb-16">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {features.map((feature) => (
        <Card key={feature.title} {...feature} />
      ))}
    </div>
  </section>
);

export default Features;
