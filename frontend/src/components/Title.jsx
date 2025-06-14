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
          className="block text-gray-100 tracking-wider transform hover:scale-105 transition-transform duration-300"
          style={{
            textShadow:
              "0 0 20px rgba(255,255,255,0.3), 0 0 40px #00d1ff33, 0 0 80px #00d1ff22",
          }}
        >
          {text1}
        </span>
      </h1>
      {text2 && (
        <div
          className="relative text-xl md:text-2xl text-cyan-300 font-semibold mb-2"
          style={{ textShadow: "0 0 8px #00d1ff33" }}
        >
          {text2}
        </div>
      )}

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
    </div>
  );
};

export default Title;
