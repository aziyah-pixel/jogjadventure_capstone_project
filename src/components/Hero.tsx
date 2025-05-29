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
    <>
      {/* Hero Section */}
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

        <div className="max-w-6xl mx-auto px-4">
          {/* Grid Layout */}
          <div className="grid grid-cols-3 gap-3 h-[780px]">
            {/* Left Column */}
            <div className="flex flex-col gap-3">
              {/* Prambanan */}
              <div className="relative rounded-3xl overflow-hidden shadow-lg group flex-1">
                <img
                  src="/prambanan2.jpg"
                  alt="Prambanan"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Prambanan</h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    Ancient Hindu temple complex featuring stunning architecture
                  </p>
                </div>
              </div>

              {/* Malioboro */}
              <div className="relative rounded-3xl overflow-hidden shadow-lg group h-[300px]">
                <img
                  src="/malioboro.jpg"
                  alt="Malioboro"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold mb-1">Malioboro</h3>
                  <p className="text-white/90 text-xs leading-relaxed">
                    Famous shopping street with local culture
                  </p>
                </div>
              </div>
            </div>

            {/* Middle Column with Navigation Arrows */}
            <div className="flex flex-col gap-3 items-center">
              {/* Tugu Jogja */}
              <div className="relative rounded-3xl overflow-hidden shadow-lg group h-[300px] w-full">
                <img
                  src="/tugujogja.jpg"
                  alt="Tugu Jogja"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold mb-1">Tugu Jogja</h3>
                  <p className="text-white/90 text-xs leading-relaxed">
                    Iconic monument representing the spirit of Yogyakarta
                  </p>
                </div>
              </div>

              {/* Titik Nol Km Jogja */}
              <div className="relative rounded-3xl overflow-hidden shadow-lg group flex-1 max-h-[380px] w-full">
                <img
                  src="/nolkm.jpg"
                  alt="Titik Nol Km Jogja"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Titik Nol Km Jogja</h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    Historical landmark marking the heart of Yogyakarta
                  </p>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex justify-center space-x-4 mt-2">
                {["M15 19l-7-7 7-7", "M9 5l7 7-7 7"].map((path, idx) => (
                  <button
                    key={idx}
                    className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={path}
                      />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-3">
              {/* Parangtritis */}
              <div className="relative rounded-3xl overflow-hidden shadow-lg group flex-1">
                <img
                  src="/parangtritis1.jpg"
                  alt="Parangtritis"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Parangtritis</h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    Beautiful beach with mystical legends
                  </p>
                </div>
              </div>

              {/* Taman Sari */}
              <div className="relative rounded-3xl overflow-hidden shadow-lg group h-[300px]">
                <img
                  src="/tamansari.jpg"
                  alt="Taman Sari"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold mb-1">Taman Sari</h3>
                  <p className="text-white/90 text-xs leading-relaxed">
                    Royal garden complex with beautiful pools
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Searches */}
      <section className="bg-gray-50 py-14 text-center">
        <h2 className="text-2xl font-bold text-primary mb-4">
          Your Recent Searches
        </h2>
        <p className="text-gray-500 mb-6">
          Here are some of the places you have searched
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {["Malioboro", "Taman Sari", "Wisata Jogja", "Pantai di Jogja"].map(
            (term, i) => (
              <button
                key={i}
                className="px-4 py-2 bg-white shadow rounded-full border hover:bg-gray-100 text-sm"
              >
                {term}
              </button>
            )
          )}
        </div>
      </section>

      {/* Testimoni */}
      <section className="bg-white py-16 px-4 text-center">
        <h2 className="text-2xl font-bold text-primary mb-4">
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

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Explore Jogja</h2>
        <p className="mb-6">Yuk temukan destinasi impianmu sekarang juga!</p>
        <button className="bg-white text-orange-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition">
          Mulai Jelajah
        </button>
      </section>
    </>
  );
}

export default Hero;
