import React, { useState } from "react";

const SearchBtn = ({ onClick, children = "Search" }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e) => {
    setIsClicked(true);
    if (onClick) {
      onClick(e);
    }

    // Reset animation state after duration
    setTimeout(() => {
      setIsClicked(false);
    }, 700);
  };

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
        onClick={handleClick}
        className="relative inline-block cursor-pointer border-2 border-cyan-400 px-4 py-2 text-sm font-bold uppercase tracking-wider text-cyan-400 transition-all duration-700 ease-in-out hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 rounded-lg overflow-hidden z-10 pointer-events-auto"
      >
        <span className="relative z-10 block pointer-events-auto">
          {children}
        </span>

        {/* Gooey blobs container */}
        <div
          className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none"
          style={{
            filter: isClicked ? "url(#goo)" : "none",
            zIndex: -1,
            bottom: "-3px",
            right: "-1px",
          }}
        >
          {/* Blob 1 */}
          <div
            className={`absolute h-full w-1/3 rounded-full bg-cyan-400 transition-all duration-700 ease-in-out transform ${
              isClicked
                ? "scale-[1.3] translate-y-0 opacity-100"
                : "scale-[0.1] translate-y-[125%] opacity-0"
            }`}
            style={{
              left: "-5%",
            }}
          />

          {/* Blob 2 */}
          <div
            className={`absolute h-full w-1/3 rounded-full bg-cyan-400 transition-all duration-700 ease-in-out transform ${
              isClicked
                ? "scale-[1.3] translate-y-0 opacity-100"
                : "scale-[0.1] translate-y-[125%] opacity-0"
            }`}
            style={{
              left: "30%",
            }}
          />

          {/* Blob 3 */}
          <div
            className={`absolute h-full w-1/3 rounded-full bg-cyan-400 transition-all duration-700 ease-in-out transform ${
              isClicked
                ? "scale-[1.3] translate-y-0 opacity-100"
                : "scale-[0.1] translate-y-[125%] opacity-0"
            }`}
            style={{
              left: "66%",
            }}
          />
        </div>
      </button>
    </>
  );
};

export default SearchBtn;
