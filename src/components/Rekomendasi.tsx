import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Rekomendasi() {
  const [activeTab, setActiveTab] = useState("Rekomendasi");

  const tabs = ["Rekomendasi", "Rating", "Sering Dikunjungi"];

  // Data untuk setiap tab
  const tabContent = {
    Rekomendasi: {
      title: "Kami Menyediakan Wisata\nSightseeing Terbaik di Jogja",
      subtitle:
        "Temukan pengalaman wisata tak terlupakan di Jogja, dari candi bersejarah hingga alam yang menawan.",
      mainImage: "/tugujogja.jpg",
      mainImageAlt: "Tugu Jogja",
      borderColor: "border-pink-300",
      stats: [
        { label: "Destinasi", value: "50+" },
        { label: "Pelanggan", value: "1000+" },
        { label: "Rating", value: "4.9★" },
      ],
      galleryImages: [
        { src: "/tamansari.jpg", alt: "Taman Sari", label: "Taman Sari" },
        { src: "/malioboro.jpg", alt: "Malioboro", label: "Malioboro" },
        {
          src: "/parangtritis1.jpg",
          alt: "Parangtritis",
          label: "Parangtritis",
        },
        { src: "/prambanan2.jpg", alt: "Prambanan", label: "Prambanan" },
      ],
    },
    Rating: {
      title: "Destinasi dengan Rating\nTertinggi di Jogja",
      subtitle:
        "Pilihan wisata terbaik berdasarkan ulasan dan rating dari ribuan pengunjung yang puas.",
      mainImage: "/borobudur.jpg",
      mainImageAlt: "Borobudur",
      borderColor: "border-yellow-400",
      stats: [
        { label: "Rating Rata-rata", value: "4.8★" },
        { label: "Total Review", value: "2500+" },
        { label: "Kepuasan", value: "98%" },
      ],
      galleryImages: [
        { src: "/borobudur.jpg", alt: "Borobudur", label: "Borobudur 4.9★" },
        { src: "/prambanan2.jpg", alt: "Prambanan", label: "Prambanan 4.8★" },
        { src: "/keraton.jpg", alt: "Keraton", label: "Keraton 4.7★" },
        { src: "/tamansari.jpg", alt: "Taman Sari", label: "Taman Sari 4.6★" },
      ],
    },
    "Sering Dikunjungi": {
      title: "Destinasi Paling Populer\ndi Kalangan Wisatawan",
      subtitle:
        "Tempat-tempat wisata favorit yang selalu ramai dikunjungi dan menjadi pilihan utama wisatawan.",
      mainImage: "/malioboro.jpg",
      mainImageAlt: "Malioboro",
      borderColor: "border-blue-400",
      stats: [
        { label: "Pengunjung/Bulan", value: "50K+" },
        { label: "Foto Diambil", value: "100K+" },
        { label: "Repeat Visit", value: "85%" },
      ],
      galleryImages: [
        { src: "/malioboro.jpg", alt: "Malioboro", label: "Malioboro" },
        { src: "/tugujogja.jpg", alt: "Tugu Jogja", label: "Tugu Jogja" },
        { src: "/nolkm.jpg", alt: "Titik Nol Km", label: "Titik Nol Km" },
        {
          src: "/parangtritis1.jpg",
          alt: "Parangtritis",
          label: "Parangtritis",
        },
      ],
    },
  };

  const currentContent = tabContent[activeTab];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="p-4 lg:p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      {/* Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap gap-2 mb-8 justify-center lg:justify-start"
      >
        {tabs.map((tab, index) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`px-6 py-3 cursor-pointer rounded-full text-sm font-medium transition-all duration-300 ease-in-out relative overflow-hidden ${
              activeTab === tab
                ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg"
                : "text-gray-600 hover:text-gray-800 hover:bg-white hover:shadow-md bg-white/80"
            }`}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Main Content Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 lg:p-10 relative shadow-xl border border-white/20"
        >
          {/* Content Layout */}
          <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-8 lg:gap-12">
            {/* Left Content */}
            <motion.div
              variants={itemVariants}
              className="flex-1 text-center lg:text-left lg:pr-8"
            >
              <div className="mb-8 lg:mb-10">
                <motion.h1
                  variants={itemVariants}
                  className="text-3xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-6 lg:mb-8 leading-tight"
                >
                  {currentContent.title.split("\n").map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < currentContent.title.split("\n").length - 1 && (
                        <br />
                      )}
                    </span>
                  ))}
                </motion.h1>
                <motion.p
                  variants={itemVariants}
                  className="text-gray-700 text-base sm:text-lg lg:text-xl leading-relaxed mb-6"
                >
                  {currentContent.subtitle}
                </motion.p>

                {/* Statistics */}
                <motion.div
                  variants={itemVariants}
                  className="flex justify-center lg:justify-start gap-6 mb-8"
                >
                  {currentContent.stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl lg:text-3xl font-bold text-teal-600">
                        {stat.value}
                      </div>
                      <div className="text-sm lg:text-base text-gray-600">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Image Gallery - 4 small images in a row */}
              <motion.div
                variants={itemVariants}
                className="flex gap-3 sm:gap-4 lg:gap-6 justify-center lg:justify-start"
              >
                {currentContent.galleryImages.map((image, index) => (
                  <motion.div
                    key={index}
                    variants={imageVariants}
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    className="group relative"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28 rounded-xl lg:rounded-2xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-2xl bg-gradient-to-br from-white to-gray-100 p-1">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover rounded-lg lg:rounded-xl"
                      />
                    </div>
                    {/* Tooltip */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                      {image.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.div
                variants={itemVariants}
                className="mt-8 flex justify-center lg:justify-start"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                >
                  Jelajahi Sekarang
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Content - Large Hero Image */}
            <motion.div
              variants={imageVariants}
              className="flex-shrink-0 relative order-first lg:order-last"
            >
              {/* Floating elements */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 2, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full opacity-70 z-10"
              />
              <motion.div
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -2, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -top-2 -right-6 w-6 h-6 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full opacity-70 z-10"
              />

              {/* Main image container */}
              <div
                className={`w-72 h-96 sm:w-80 sm:h-104 lg:w-96 lg:h-120 rounded-t-full rounded-b-3xl ${currentContent.borderColor} border-4 p-3 bg-white shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl relative overflow-hidden`}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-t-full rounded-b-3xl z-10 pointer-events-none" />

                {/* Inner image container */}
                <div className="w-full h-full rounded-t-full rounded-b-2xl overflow-hidden relative">
                  <motion.img
                    key={currentContent.mainImage}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    src={currentContent.mainImage}
                    alt={currentContent.mainImageAlt}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />

                  {/* Image overlay with location info */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 z-20">
                    <h3 className="font-semibold text-gray-800 text-sm">
                      {currentContent.mainImageAlt}
                    </h3>
                    <p className="text-xs text-gray-600">
                      Yogyakarta, Indonesia
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Rekomendasi;
