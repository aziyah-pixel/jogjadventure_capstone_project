import { motion } from "framer-motion";
import { useState } from "react";

function Testimonial() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

    // Data untuk destinasi
    const testimonial = [
      {
        id: 1,
        name: "Bang Upin",
        image: "/prambanan2.jpg",
        description:
        "Pengalaman yang sangat menyenangkan, di tambah pelayannya ramah banget, top banget, rekomen buat yang mau cobain!",
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


  // Navigation functions - bergeser satu card per satu
  const goToPrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) =>
      prev === 0 ? testimonial.length - 1 : prev - 1
    );
    setTimeout(() => setIsAnimating(false), 600);
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) =>
      prev === testimonial.length - 1 ? 0 : prev + 1
    );
    setTimeout(() => setIsAnimating(false), 600);
  };

   // Get current set of destinations to display (6 cards starting from currentSlide)
   const getCurrentTestimonial = () => {
    const result = [];
    for (let i = 0; i < 6; i++) {
      const index = (currentSlide + i) % testimonial.length;
      result.push(testimonial[index]);
    }
    return result;
  };

  const currentTestimonial = getCurrentTestimonial();


    return (
      <>
      <section className="bg-white py-16 px-4 text-center ">
         <div className="flex flex-col md:flex-row rounded-lg p-8 mx-auto">
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
              className="flex flex-col items-center w-full md:w-1/2"
            >

              {/* Left Column */}
              <div className="flex flex-col items-center ">
                {/* First Large Card */}
                {currentTestimonial[0] && (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="flex flex-col rounded-3xl overflow-hidden shadow-lg group flex-1 w-full"
                  >
                    <img
                      src={currentTestimonial[0].image}
                      alt={currentTestimonial[0].name}
                      className="w-14 h-14 rounded-full mr-4"
                    />
                     <div>
                        <h2 className="text-xl font-semibold">{currentTestimonial[0].name}</h2>
                        <span className="text-yellow-500">★★★★★</span>
                      </div>
                      <p className="m-4 text-gray-700">
                      {currentTestimonial[0].description}
                      </p>
                  </motion.div>

                )}
                </div>
            </motion.div>
  
            
            <div className="w-full md:w-1/2 mt-8 md:mt-0 md:ml-8 items-center">
                <h3 className="text-2xl font-bold text-teal-600">Testimoni Jogjadventure</h3>
                <p className="mt-2 text-gray-600">
                    Apasih yang pelanggan kami rasakan ketika bersama Jogjadventure, cek disamping ini yu!
                </p>
                 {/* Navigation Arrows */}
                 <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                  className="flex justify-center space-x-4 mt-2 "
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
        </div>
      </section>
        {/* Testimoni 
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
                        */}
       
      </>
    );
  }
  
  export default Testimonial;
  