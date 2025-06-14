import React from "react";

const CubeSpinner = () => {
  // Use a CSS variable for cube depth so it scales with the container
  const cubeDepth = 32; // px, base size for md:w-32/h-32
  const faces = [
    { style: { transform: `translateZ(-${cubeDepth / 2}px) rotateY(180deg)` } },
    {
      style: {
        transform: `rotateY(-270deg) translateX(50%)`,
        transformOrigin: "top right",
      },
    },
    {
      style: {
        transform: `rotateY(270deg) translateX(-50%)`,
        transformOrigin: "center left",
      },
    },
    {
      style: {
        transform: `rotateX(90deg) translateY(-50%)`,
        transformOrigin: "top center",
      },
    },
    {
      style: {
        transform: `rotateX(-90deg) translateY(50%)`,
        transformOrigin: "bottom center",
      },
    },
    { style: { transform: `translateZ(${cubeDepth / 2}px)` } },
  ];

  return (
    <div
      className="relative w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 animate-[spinCube_2s_ease_infinite]"
      style={{
        transformStyle: "preserve-3d",
        "--cube-depth": `${cubeDepth}px`,
      }}
    >
      {faces.map((face, index) => (
        <div
          key={index}
          className="absolute w-full h-full border border-[#004dff] bg-[rgba(0,77,255,0.2)]"
          style={{ ...face.style, boxSizing: "border-box" }}
        />
      ))}
      <style>{`
        @keyframes spinCube {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }
        .animate-\[spinCube_2s_ease_infinite\] {
          animation: spinCube 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default CubeSpinner;
