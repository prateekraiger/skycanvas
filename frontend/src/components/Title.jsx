const Title = ({ text1, text2 }) => {
  return (
    <div className="text-center mb-16 relative">
      {/* Glow effect background */}
      <div className="absolute inset-0 blur-3xl opacity-20">
        <div className="w-full h-20 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full"></div>
      </div>

      {/* Main title */}
      <h1 className="relative text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-none mb-6">
        <span
          className="block text-gray-100 font-mono tracking-wider transform hover:scale-105 transition-transform duration-300"
          style={{
            fontFamily: "'Orbitron', 'Space Mono', monospace",
            textShadow:
              "0 0 20px rgba(255,255,255,0.3), 0 0 40px rgba(255,255,255,0.1)",
          }}
        >
          {text1}
        </span>
        <span
          className="block text-transparent bg-clip-text bg-gradient-to-r  from-cyan-400 via-purple-500 to-pink-500 font-black tracking-widest transform hover:scale-110 transition-all duration-500 mt-2"
          style={{
            fontFamily: "'Exo 2', 'Rajdhani', sans-serif",
            textShadow: "0 0 30px rgba(59, 130, 246, 0.5)",
            filter: "drop-shadow(0 0 20px rgba(139, 92, 246, 0.3))",
          }}
        >
          {text2}
        </span>
      </h1>

      {/* Animated decorative elements */}
      <div className="flex justify-center items-center space-x-4 mt-8">
        <div className="w-8 h-8 border-2 border-cyan-400 rotate-45 animate-pulse"></div>
        <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-40 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        <div
          className="w-6 h-6 border border-purple-500 animate-spin"
          style={{ animationDuration: "8s" }}
        ></div>
      </div>

      {/* Subtitle glow lines */}
      <div className="mt-6 flex justify-center space-x-2">
        <div className="w-3 h-3 bg-cyan-500 rounded-full animate-ping"></div>
        <div className="w-20 h-px bg-gradient-to-r from-cyan-400 to-blue-500 self-center opacity-60"></div>
        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
        <div className="w-20 h-px bg-gradient-to-r from-blue-500 to-purple-500 self-center opacity-60"></div>
        <div className="w-1 h-1 bg-pink-500 rounded-full animate-bounce"></div>
      </div>

      {/* Google Fonts preload */}
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Rubik+Dirt&display=swap");
      `}</style>
    </div>
  );
};

export default Title;
