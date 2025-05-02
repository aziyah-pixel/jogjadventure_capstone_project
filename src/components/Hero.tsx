import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function Hero() {
  const [placeholderText, setPlaceholderText] = useState("Search...");
  const [searchValue, setSearchValue] = useState("");
  const fullText = "Search beautiful places...";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setPlaceholderText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        index = 0;
      }
    }, 120);
    return () => clearInterval(interval);
  }, []);

  const handleClear = () => setSearchValue("");

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/prambanan.jpg')" }}
    >
      <div className="flex flex-col justify-center items-center text-center h-full text-white px-4 bg-black/40">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative mb-6 w-[320px] sm:w-[480px]"
        >
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={placeholderText}
            className="shadow-lg border border-gray-300 px-5 pr-12 py-3 rounded-full w-full transition-all duration-300 outline-none text-black bg-white placeholder-gray-400 focus:ring-2 focus:ring-secondary hover:shadow-xl"
            name="search"
            type="text"
          />
          <svg
            onClick={searchValue ? handleClear : undefined}
            className={`w-5 h-5 absolute top-3.5 right-4 text-gray-500 ${
              searchValue ? "cursor-pointer hover:text-gray-700" : "pointer-events-none"
            }`}
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {searchValue ? (
              <path
                d="M6 6l12 12M6 18L18 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <path
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold leading-snug"
        >
          Explore The Beauty <br />
          of <span className="text-secondary">Jogja</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="mt-2 text-sm md:text-base text-white/80"
        >
          The wonderful of Jogja
        </motion.p>
      </div>
    </div>
  );
}

export default Hero;
