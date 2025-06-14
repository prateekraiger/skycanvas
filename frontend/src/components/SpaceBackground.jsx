import React, { useState, useEffect } from "react";

const SpaceBackground = ({ children }) => {
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      const starArray = [];

      // Large bright stars
      for (let i = 0; i < 30; i++) {
        starArray.push({
          id: `large-${i}`,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 1.5 + 2,
          opacity: Math.random() * 0.4 + 0.6,
          twinkleSpeed: Math.random() * 2 + 3,
          type: "large",
        });
      }

      // Medium stars
      for (let i = 0; i < 80; i++) {
        starArray.push({
          id: `medium-${i}`,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 1 + 1.2,
          opacity: Math.random() * 0.5 + 0.4,
          twinkleSpeed: Math.random() * 3 + 2,
          type: "medium",
        });
      }

      // Small distant stars
      for (let i = 0; i < 150; i++) {
        starArray.push({
          id: `small-${i}`,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 0.8 + 0.3,
          opacity: Math.random() * 0.6 + 0.2,
          twinkleSpeed: Math.random() * 4 + 1,
          type: "small",
        });
      }

      setStars(starArray);
    };

    generateStars();
  }, []);

  // Generate shooting stars with varied trajectories
  useEffect(() => {
    const createShootingStar = () => {
      const directions = [
        {
          startX: -10,
          startY: Math.random() * 50,
          endX: 110,
          endY: Math.random() * 50 + 50,
        },
        {
          startX: Math.random() * 50,
          startY: -10,
          endX: Math.random() * 50 + 50,
          endY: 110,
        },
        {
          startX: 110,
          startY: Math.random() * 50,
          endX: -10,
          endY: Math.random() * 50 + 50,
        },
      ];

      const direction =
        directions[Math.floor(Math.random() * directions.length)];

      const newStar = {
        id: Date.now(),
        ...direction,
        duration: Math.random() * 1.5 + 2,
        brightness: Math.random() * 0.5 + 0.5,
      };

      setShootingStars((prev) => [...prev, newStar]);

      setTimeout(() => {
        setShootingStars((prev) =>
          prev.filter((star) => star.id !== newStar.id)
        );
      }, newStar.duration * 1000);
    };

    const interval = setInterval(
      createShootingStar,
      Math.random() * 4000 + 3000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Deep space background with subtle gradient */}
      <div className="absolute inset-0 -z-10 bg-black"></div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-900 via-black to-black opacity-60"></div>

      {/* Subtle cosmic atmosphere */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-64 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-80 h-56 bg-purple-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-0 w-64 h-48 bg-indigo-400 rounded-full blur-3xl"></div>
      </div>

      {/* Layered stars with different depths */}
      <div className="absolute inset-0 -z-10">
        {stars.map((star) => (
          <div
            key={star.id}
            className={`absolute rounded-full ${
              star.type === "large"
                ? "bg-white shadow-white shadow-sm"
                : star.type === "medium"
                ? "bg-blue-100"
                : "bg-gray-300"
            }`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: `twinkle ${star.twinkleSpeed}s ease-in-out infinite alternate`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Shooting stars with dynamic trails */}
      <div className="absolute inset-0 -z-10">
        {shootingStars.map((star) => (
          <div
            key={star.id}
            className="absolute"
            style={{
              left: `${star.startX}%`,
              top: `${star.startY}%`,
              animation: `shootingStar-${star.id} ${star.duration}s linear forwards`,
            }}
          >
            <div
              className="w-1 h-1 bg-white rounded-full"
              style={{ opacity: star.brightness }}
            >
              <div
                className="absolute w-16 h-px bg-gradient-to-r from-white via-blue-200 to-transparent -translate-y-0.5 -translate-x-8"
                style={{ opacity: star.brightness * 0.8 }}
              />
              <div className="absolute w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent -translate-y-0.5 -translate-x-16 opacity-30" />
            </div>
          </div>
        ))}
      </div>

      {/* Distant galaxy effect */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-white rounded-full blur-sm"></div>
        <div className="absolute top-2/3 left-1/5 w-1 h-1 bg-blue-200 rounded-full blur-sm"></div>
        <div className="absolute top-1/2 right-2/3 w-1.5 h-1.5 bg-purple-200 rounded-full blur-sm"></div>
        <div className="absolute bottom-1/4 left-3/4 w-1 h-1 bg-indigo-200 rounded-full blur-sm"></div>
      </div>

      {/* Floating cosmic dust */}
      <div className="absolute inset-0 -z-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-gray-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 8 + 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Content container */}
      <div className="relative z-10">{children}</div>

      <style jsx>{`
        @keyframes twinkle {
          0% {
            opacity: 0.3;
            transform: scale(1);
          }
          100% {
            opacity: 1;
            transform: scale(1.1);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-10px) translateX(5px);
          }
          50% {
            transform: translateY(-5px) translateX(-3px);
          }
          75% {
            transform: translateY(-15px) translateX(2px);
          }
        }

        ${shootingStars
          .map(
            (star) => `
          @keyframes shootingStar-${star.id} {
            from {
              transform: translateX(0) translateY(0);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            to {
              transform: translateX(${star.endX - star.startX}vw) translateY(${
              star.endY - star.startY
            }vh);
              opacity: 0;
            }
          }
        `
          )
          .join("")}
      `}</style>
    </div>
  );
};

export default SpaceBackground;
