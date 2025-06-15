import React, { useState } from "react";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Explore NASA's vast media collection...",
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full md:max-w-2xl font-mono">
      <input
        placeholder={placeholder}
        className={`w-full py-3 px-4 text-cyan-200 bg-[#23244a] border rounded-xl outline-none shadow-lg transition-all duration-300 ease-in-out
          ${
            isFocused
              ? "border-cyan-400 shadow-[0_0_20px_rgba(0,209,255,0.4)]"
              : "border-[#23244a]"
          }
        `}
        type="text"
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};

export default SearchBar;
