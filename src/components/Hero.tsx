import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function Hero() {
  const [placeholderText, setPlaceholderText] = useState("Search...");
  const [searchValue, setSearchValue] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const fullText = "Search beautiful places...";

  // Data untuk destinasi
  const destinations = [
    {
      id: 1,
      name: "Prambanan",
      image: "/prambanan2.jpg",
      description:
        "Ancient Hindu temple complex featuring stunning architecture",
      size: "large",
    },
    {
      id: 2,
      name: "Malioboro",
      image: "/malioboro.jpg",
      description: "Famous shopping street with local culture",
      size: "small",
    },
    {
      id: 3,
      name: "Tugu Jogja",
      image: "/tugujogja.jpg",
      description: "Iconic monument representing the spirit of Yogyakarta",
      size: "small",
    },
    {
      id: 4,
      name: "Titik Nol Km Jogja",
      image: "/nolkm.jpg",
      description: "Historical landmark marking the heart of Yogyakarta",
      size: "large",
    },
    {
      id: 5,
      name: "Parangtritis",
      image: "/parangtritis1.jpg",
      description: "Beautiful beach with mystical legends",
      size: "large",
    },
    {
      id: 6,
      name: "Taman Sari",
      image: "/tamansari.jpg",
      description: "Royal garden complex with beautiful pools",
      size: "small",
    },
    {
      id: 7,
      name: "Borobudur",
      image: "/borobudur.jpg",
      description: "World's largest Buddhist temple complex",
      size: "large",
    },
    {
      id: 8,
      name: "Keraton Yogyakarta",
      image: "/keraton.jpg",
      description: "Sultan's palace with rich Javanese culture",
      size: "small",
    },
  ];

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

  // Navigation functions - bergeser satu card per satu
  const goToPrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) =>
      prev === 0 ? destinations.length - 1 : prev - 1
    );
    setTimeout(() => setIsAnimating(false), 600);
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) =>
      prev === destinations.length - 1 ? 0 : prev + 1
    );
    setTimeout(() => setIsAnimating(false), 600);
  };

  // Get current set of destinations to display (6 cards starting from currentSlide)
  const getCurrentDestinations = () => {
    const result = [];
    for (let i = 0; i < 6; i++) {
      const index = (currentSlide + i) % destinations.length;
      result.push(destinations[index]);
    }
    return result;
  };

  const currentDestinations = getCurrentDestinations();

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

      <section className="bg-gradient-to-b from-pink-50 to-white py-16 text-center">
        <h2 className="text-4xl font-bold text-teal-600 mb-2">
          Popular Destinations
        </h2>
        <p className="text-gray-600 mb-12 text-lg">
          The most beautiful place in Yogyakarta for your holiday
        </p>

        <div className="max-w-6xl mx-auto px-4 overflow-hidden">
          {/* Grid Layout with Smooth Slide Animation */}
          <motion.div
            key={currentSlide}
            initial={{ x: 100, opacity: 0.8 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.6,
            }}
            className="grid grid-cols-3 gap-3 h-[780px]"
          >
            {/* Left Column */}
            <div className="flex flex-col gap-3">
              {/* First Large Card */}
              {currentDestinations[0] && (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="relative rounded-3xl overflow-hidden shadow-lg group flex-1"
                >
                  <img
                    src={currentDestinations[0].image}
                    alt={currentDestinations[0].name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-xl font-bold mb-2">
                      {currentDestinations[0].name}
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed">
                      {currentDestinations[0].description}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* First Small Card */}
              {currentDestinations[1] && (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="relative rounded-3xl overflow-hidden shadow-lg group h-[300px]"
                >
                  <img
                    src={currentDestinations[1].image}
                    alt={currentDestinations[1].name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-bold mb-1">
                      {currentDestinations[1].name}
                    </h3>
                    <p className="text-white/90 text-xs leading-relaxed">
                      {currentDestinations[1].description}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Middle Column with Navigation Arrows */}
            <div className="flex flex-col gap-3 items-center">
              {/* Second Small Card */}
              {currentDestinations[2] && (
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                  className="relative rounded-3xl overflow-hidden shadow-lg group h-[300px] w-full"
                >
                  <img
                    src={currentDestinations[2].image}
                    alt={currentDestinations[2].name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-bold mb-1">
                      {currentDestinations[2].name}
                    </h3>
                    <p className="text-white/90 text-xs leading-relaxed">
                      {currentDestinations[2].description}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Second Large Card */}
              {currentDestinations[3] && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                  className="relative rounded-3xl overflow-hidden shadow-lg group flex-1 max-h-[380px] w-full"
                >
                  <img
                    src={currentDestinations[3].image}
                    alt={currentDestinations[3].name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-xl font-bold mb-2">
                      {currentDestinations[3].name}
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed">
                      {currentDestinations[3].description}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Navigation Arrows */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="flex justify-center space-x-4 mt-2"
              >
                {/* Left Arrow */}
                <button
                  onClick={goToPrevious}
                  aria-label="Previous"
                  className="w-12 h-12 cursor-pointer rounded-full bg-white shadow-md ring-1 ring-gray-200 flex items-center justify-center hover:bg-gray-100 hover:shadow-xl transition-all duration-300 group"
                >
                  <svg
                    className="w-6 h-6 text-gray-600 group-hover:text-secondary group-hover:-translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                {/* Slide Indicator */}
                <div className="flex items-center space-x-2">
                  {destinations.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide ? "bg-secondary" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* Right Arrow */}
                <button
                  onClick={goToNext}
                  aria-label="Next"
                  className="w-12 h-12 cursor-pointer rounded-full bg-white shadow-md ring-1 ring-gray-200 flex items-center justify-center hover:bg-gray-100 hover:shadow-xl transition-all duration-300 group"
                >
                  <svg
                    className="w-6 h-6 text-gray-600 group-hover:text-secondary group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-3">
              {/* Third Large Card */}
              {currentDestinations[4] && (
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="relative rounded-3xl overflow-hidden shadow-lg group flex-1"
                >
                  <img
                    src={currentDestinations[4].image}
                    alt={currentDestinations[4].name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-xl font-bold mb-2">
                      {currentDestinations[4].name}
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed">
                      {currentDestinations[4].description}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Third Small Card */}
              {currentDestinations[5] && (
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="relative rounded-3xl overflow-hidden shadow-lg group h-[300px]"
                >
                  <img
                    src={currentDestinations[5].image}
                    alt={currentDestinations[5].name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-bold mb-1">
                      {currentDestinations[5].name}
                    </h3>
                    <p className="text-white/90 text-xs leading-relaxed">
                      {currentDestinations[5].description}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

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

      {/* Testimoni */}
      <section className="bg-white py-16 px-4 text-center">
        <h2 className="text-2xl font-bold text-secondary mb-4">
          Testimoni Jogjadventure
        </h2>
        <div className="max-w-2xl mx-auto bg-gray-100 p-6 rounded-xl shadow">
          <p className="text-gray-700 italic mb-4">
            "Pengalaman yang sangat menyenangkan, di tambah pelayannya ramah
            banget, top banget, rekomen buat yang mau cobain!"
          </p>
          <div className="flex items-center justify-center gap-4">
            <img
              src="/user.png"
              alt="User"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="text-left">
              <p className="font-semibold">Bang Upin</p>
              <span className="text-sm text-gray-500">⭐⭐⭐⭐⭐</span>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section - Explore Jogja */}
      <section className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white py-16 overflow-hidden rounded-2xl">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: "url('/hero-bg.jpg')",
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center px-8">
          <h2 className="text-3xl font-bold mb-4">Explore Jogja</h2>
          <p className="mb-6">Yuk temukan destinasi impianmu sekarang juga!</p>
          <button className="bg-white text-orange-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition">
            Mulai Jelajah
          </button>
        </div>

        {/* Navigation Arrow */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
          <button className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-all duration-300 group">
            <svg
              className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </section>
    </>
  );
}

export default Hero;
