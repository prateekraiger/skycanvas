import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import Logo from "./Logo"; // Uncomment if you have a Logo component

const navItems = [
  { name: "Home", path: "/" },
  { name: "APOD", path: "/apod" },
  { name: "Mars Rover", path: "/mars-rover" },
  { name: "Earth View", path: "/epic" },
  { name: "Media Library", path: "/media-library" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black/60 backdrop-blur-md z-50 border-b border-[#23244a]/60 shadow-lg transition-all duration-300">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 select-none">
            <motion.div
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.2 }}
            >
              {/* {Logo ? <Logo /> : */}
              <i className="fas fa-rocket text-cyan-400 text-2xl"></i>
              {/* } */}
            </motion.div>
            <span
              className="font-black text-xl tracking-wide heading"
              style={{ fontFamily: "Merriweather, serif" }}
            >
              SkyCanvas
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 flex-wrap relative max-w-full">
            {navItems.map((item) => (
              <motion.div key={item.name} whileHover={{ scale: 1.1 }}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `relative px-2 py-1 rounded-lg font-semibold text-base transition-colors duration-300 group focus:outline-none focus:ring-2 focus:ring-cyan-400 nav-link ${
                      isActive
                        ? "text-cyan-400"
                        : "text-gray-200 hover:text-cyan-300"
                    }`
                  }
                  style={{ fontFamily: "Lexend, sans-serif" }}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full group-focus:w-full"></span>
                </NavLink>
              </motion.div>
            ))}
          </div>

          {/* Mobile Navigation Button */}
          <motion.button
            className="md:hidden text-gray-300 hover:text-cyan-400 p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? (
              <XMarkIcon className="h-7 w-7" />
            ) : (
              <Bars3Icon className="h-7 w-7" />
            )}
          </motion.button>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden bg-black/80 backdrop-blur-md rounded-b-2xl border-b border-[#23244a]/60 shadow-lg"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg font-semibold text-base transition-colors duration-300 nav-link ${
                        isActive
                          ? "text-cyan-400"
                          : "text-gray-200 hover:text-cyan-300"
                      }`
                    }
                    style={{ fontFamily: "Lexend, sans-serif" }}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
