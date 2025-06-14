import { motion } from "framer-motion";
import clsx from "clsx";

const lineVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    rotateX: 60,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 12,
    },
  },
};

const AnimatedTitle = ({ text1, text2, desc, containerClass = "" }) => {
  return (
    <motion.div
      className={clsx(
        "animated-title text-center mt-2 mb-2 md:mt-4 md:mb-4 relative",
        containerClass
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
    >
      {/* Main animated heading (text1 + text2 side by side) */}
      <motion.div
        className="flex justify-center flex-wrap gap-2 px-4 md:gap-3 mb-2 md:mb-3"
        variants={lineVariants}
      >
        {text1 &&
          text1.split(" ").map((word, idx) => (
            <motion.span
              key={"t1-" + idx}
              className="animated-word text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none text-cyan-100 drop-shadow"
              variants={wordVariants}
              style={{
                fontFamily: "Orbitron, 'Anta', 'Merriweather', serif",
              }}
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        {text2 &&
          text2.split(" ").map((word, idx) => (
            <motion.span
              key={"t2-" + idx}
              className="animated-word text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none text-blue-400 drop-shadow"
              variants={wordVariants}
              style={{
                fontFamily: "Orbitron, 'Anta', 'Merriweather', serif",
              }}
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
      </motion.div>
      {/* Description (desc) */}
      {desc && (
        <div
          className="mx-auto max-w-2xl mt-4 md:mt-6 text-cyan-300 text-base md:text-lg font-medium tracking-wide opacity-80"
          style={{ fontFamily: "Lexend, 'Anta', 'Merriweather', serif" }}
        >
          {desc}
        </div>
      )}
    </motion.div>
  );
};

export default AnimatedTitle;
