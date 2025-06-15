import React from "react";

const LoadingIndicator = ({ msg }) => (
  <>
    <style>{`
      @keyframes move {
        0% {
          opacity: 0;
          transform: translateX(0) rotate(0deg);
        }
        20% {
          opacity: 1;
        }
        40% {
          transform: translateX(-40px) rotate(0deg);
        }
        50% {
          opacity: 1;
          transform: translateX(-50px) rotate(22deg);
        }
        85% {
          opacity: 1;
          transform: translateX(-85px) rotate(60deg);
        }
        100% {
          opacity: 0;
          transform: translateX(-100px) rotate(65deg);
        }
      }
      .animate-move {
        animation: move 2.8s linear infinite;
      }
      .delay-0 {
        animation-delay: -0.4s;
      }
      .delay-1 {
        animation-delay: -0.8s;
      }
      .delay-2 {
        animation-delay: -1.2s;
      }
      .delay-3 {
        animation-delay: -1.6s;
      }
      .delay-4 {
        animation-delay: -2s;
      }
      .delay-5 {
        animation-delay: -2.4s;
      }
      .delay-6 {
        animation-delay: -2.8s;
      }
    `}</style>
    <div className="flex flex-col items-center justify-center p-6">
      <div className="relative w-24 h-8">
        <span className="absolute right-0 w-1 h-full bg-cyan-400 rounded animate-move delay-0 origin-bottom"></span>
        <span className="absolute right-0 w-1 h-full bg-cyan-400 rounded animate-move delay-1 origin-bottom"></span>
        <span className="absolute right-0 w-1 h-full bg-cyan-400 rounded animate-move delay-2 origin-bottom"></span>
        <span className="absolute right-0 w-1 h-full bg-cyan-400 rounded animate-move delay-3 origin-bottom"></span>
        <span className="absolute right-0 w-1 h-full bg-cyan-400 rounded animate-move delay-4 origin-bottom"></span>
        <span className="absolute right-0 w-1 h-full bg-cyan-400 rounded animate-move delay-5 origin-bottom"></span>
        <span className="absolute right-0 w-1 h-full bg-cyan-400 rounded animate-move delay-6 origin-bottom"></span>
      </div>
      {msg && (
        <p className="mt-6 text-cyan-300 text-lg font-medium select-none">
          {msg}
        </p>
      )}
    </div>
  </>
);

export default LoadingIndicator;
