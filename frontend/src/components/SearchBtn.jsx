import React from "react";

const SearchBtn = ({ onClick, children = "Search" }) => {
  return (
    <>
      {/* SVG Filter for gooey effect */}
      <svg
        className="block h-0 w-0"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Button Component */}
      <button
        onClick={onClick}
        className="relative inline-block cursor-pointer border-2 border-cyan-400 px-4 py-2 text-sm font-bold uppercase tracking-wider text-cyan-400 transition-all duration-700 ease-in-out hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 rounded-lg group"
        style={{ zIndex: 1 }}
      >
        {children}

        {/* Gooey blobs container */}
        <div
          className="absolute -bottom-1 -right-px left-0 top-0 h-full overflow-hidden"
          style={{
            filter: "url(#goo)",
            zIndex: -1,
          }}
        >
          {/* Blob 1 */}
          <div
            className="absolute h-full w-1/3 rounded-full bg-cyan-400 transition-all duration-700 ease-in-out group-hover:translate-y-0"
            style={{
              left: "-5%",
              transform: "scale(1.4) translateY(125%) translateZ(0)",
            }}
          />

          {/* Blob 2 */}
          <div
            className="absolute h-full w-1/3 rounded-full bg-cyan-400 transition-all duration-700 ease-in-out group-hover:translate-y-0"
            style={{
              left: "30%",
              transform: "scale(1.4) translateY(125%) translateZ(0)",
              transitionDelay: "60ms",
            }}
          />

          {/* Blob 3 */}
          <div
            className="absolute h-full w-1/3 rounded-full bg-cyan-400 transition-all duration-700 ease-in-out group-hover:translate-y-0"
            style={{
              left: "66%",
              transform: "scale(1.4) translateY(125%) translateZ(0)",
              transitionDelay: "25ms",
            }}
          />
        </div>
      </button>
    </>
  );
};

export default SearchBtn;
