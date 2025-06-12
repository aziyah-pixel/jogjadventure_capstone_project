import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Destination from './DestinationPopular';
import Testimonial from './Testimonial';
import Explore from './Jelajah';
import Footer from "./Footer";
import Rekomendasi from "./Rekomendasi";


function Hero() {
  const [placeholderText, setPlaceholderText] = useState("Search...");
  const [searchValue, setSearchValue] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const fullText = "Search beautiful places...";


  // Typing effect for placeholder
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

  // Load recent searches from memory (replacing localStorage)
  useEffect(() => {
    // Simulated initial data
    setRecentSearches(["Prambanan", "Borobudur"]);
  }, []);

  const handleClear = () => setSearchValue("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchValue.trim() !== "") {
      const newSearch = searchValue.trim();
      let updatedSearches = [
        newSearch,
        ...recentSearches.filter((term) => term !== newSearch),
      ];

      // Batasi maksimal 5 pencarian terakhir
      if (updatedSearches.length > 5)
        updatedSearches = updatedSearches.slice(0, 5);

      setRecentSearches(updatedSearches);
      setSearchValue("");
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div
        className="relative w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
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
              onKeyDown={handleKeyDown}
              placeholder={placeholderText}
              className="shadow-lg border border-gray-300 px-5 pr-12 py-3 rounded-full w-full transition-all duration-300 outline-none text-black bg-white placeholder-gray-400 focus:ring-2 focus:ring-secondary hover:shadow-xl"
              name="search"
              type="text"
            />
            <svg
              onClick={searchValue ? handleClear : undefined}
              className={`w-5 h-5 absolute top-3.5 right-4 text-gray-500 ${
                searchValue
                  ? "cursor-pointer hover:text-gray-700"
                  : "pointer-events-none"
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

      <Destination />

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <section className="bg-gray-50 py-14 text-center">
          <h2 className="text-2xl font-bold text-secondary mb-4">
            Your Recent Searches
          </h2>
          <p className="text-gray-500 mb-6">
            Here are some of the places you have searched
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {recentSearches.map((term, i) => (
              <button
                key={i}
                className="px-4 py-2 cursor-pointer bg-white shadow rounded-full border hover:bg-gray-200 text-sm"
              >
                {term}
              </button>
            ))}
          </div>
        </section>
      )}
      <Rekomendasi/>
      <Testimonial />
      <Explore />
      <Footer />
    </>
  );
}

export default Hero;
