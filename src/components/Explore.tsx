
function Explore() {
  return (
    <>
      {/* Hero Section - Explore Jogja */}
      <section className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 text-white overflow-hidden shadow-2xl">
        {/* Inner Container */}
        <div className="relative h-55 w m-18">
          {/* Background Image Container */}
          <div className="absolute inset-0 bg-gray-800  rounded-2xl overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/tugujogja.jpg')",
              }}
            />
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 h-full flex items-center justify-between px-8">
            {/* Left Content */}
            <div className="text-left">
              <h2 className="text-4xl font-bold mb-2">Explore Jogja</h2>
            </div>

            {/* Navigation Arrow */}
            <div className="flex-shrink-0">
              <button className="bg-white/20 cursor-pointer backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-all duration-300 group border border-white/20">
                <svg
                  className="w-8 h-8 text-white group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Explore;








/* import React from "react";
import Navbar from "../components/Navbar";
import { FaHeart, FaMapMarkerAlt } from "react-icons/fa";

interface Review {
  user: string;
  comment: string;
  rating: number;
}

interface Destination {
  name: string;
  location: string;
  image: string;
  description: string;
  reviews: Review[];
}

const destinationsData: Destination[] = [
  {
    name: "Candi Prambanan",
    location: "Yogyakarta",
    image: "/prambanan1.jpg",
    description: "Candi Hindu terbesar di Indonesia dengan arsitektur megah.",
    reviews: [
      { user: "Dewi", comment: "Indah dan bersejarah!", rating: 5 },
      { user: "Andi", comment: "Sangat menarik untuk dikunjungi.", rating: 4 },
    ],
  },
  {
    name: "Malioboro",
    location: "Yogyakarta",
    image: "/malioboro.jpg",
    description: "Jalan ikonik penuh dengan pedagang, budaya, dan kuliner.",
    reviews: [
      { user: "Rina", comment: "Belanja dan kuliner top!", rating: 4 },
      { user: "Budi", comment: "Suasana malamnya keren banget.", rating: 5 },
    ],
  },
  {
    name: "Pantai Parangtritis",
    location: "Yogyakarta",
    image: "/parangtritis.jpg",
    description: "Pantai mistis dengan ombak besar dan pasir hitam yang eksotis.",
    reviews: [
      { user: "Sinta", comment: "Romantis dan mistis.", rating: 4 },
      { user: "Raka", comment: "Anginnya kencang tapi keren!", rating: 4 },
    ],
  },
];

const Explore: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fdf5ef] text-gray-800 font-montserrat">
      <Navbar />
      <section className="py-16 px-4 md:px-10">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-teal-600 mb-14 leading-relaxed">
          Let's Explore your Dream <br /> destination here!
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {destinationsData.map((dest, index) => {
            const avgRating =
              dest.reviews.reduce((acc, r) => acc + r.rating, 0) / dest.reviews.length;

            return (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-lg overflow-hidden group transform transition duration-300 hover:scale-[1.03] hover:shadow-xl relative"
              >
                <div className="relative">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="h-56 w-full object-cover transition duration-300 group-hover:brightness-90"
                  />
                  <div className="absolute top-3 right-3 bg-white text-red-500 px-3 py-1 rounded-full shadow flex items-center text-sm font-semibold gap-1">
                    <FaHeart className="text-red-500" /> 4.5
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-1 text-gray-800">{dest.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <FaMapMarkerAlt className="text-teal-500" /> {dest.location}
                  </p>
                  <p className="text-sm text-gray-600 mt-1 italic line-clamp-2">
                    {dest.description}
                  </p>
                  <p className="text-sm text-yellow-500 mt-2 font-medium">
                    ⭐ {avgRating.toFixed(1)} rating
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Explore;

*/




/* import React from "react";
import Navbar from "../components/Navbar";
import { FaHeart, FaMapMarkerAlt } from "react-icons/fa";

interface Review {
  user: string;
  comment: string;
  rating: number;
}

interface Destination {
  name: string;
  location: string;
  image: string;
  description: string;
  reviews: Review[];
}

const destinationsData: Destination[] = [
  {
    name: "Candi Prambanan",
    location: "Yogyakarta",
    image: "/prambanan1.jpg",
    description: "Candi Hindu terbesar di Indonesia dengan arsitektur megah.",
    reviews: [
      { user: "Dewi", comment: "Indah dan bersejarah!", rating: 5 },
      { user: "Andi", comment: "Sangat menarik untuk dikunjungi.", rating: 4 },
    ],
  },
  {
    name: "Malioboro",
    location: "Yogyakarta",
    image: "/malioboro.jpg",
    description: "Jalan ikonik penuh dengan pedagang, budaya, dan kuliner.",
    reviews: [
      { user: "Rina", comment: "Belanja dan kuliner top!", rating: 4 },
      { user: "Budi", comment: "Suasana malamnya keren banget.", rating: 5 },
    ],
  },
  {
    name: "Pantai Parangtritis",
    location: "Yogyakarta",
    image: "/parangtritis.jpg",
    description: "Pantai mistis dengan ombak besar dan pasir hitam yang eksotis.",
    reviews: [
      { user: "Sinta", comment: "Romantis dan mistis.", rating: 4 },
      { user: "Raka", comment: "Anginnya kencang tapi keren!", rating: 4 },
    ],
  },
];

const Explore: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fdf5ef] text-gray-800 font-montserrat">
      <Navbar />
      <section className="py-16 px-4 md:px-10">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-teal-600 mb-14 leading-relaxed">
          Let's Explore your Dream <br /> destination here!
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {destinationsData.map((dest, index) => {
            const avgRating =
              dest.reviews.reduce((acc, r) => acc + r.rating, 0) / dest.reviews.length;

            return (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-lg overflow-hidden group transform transition duration-300 hover:scale-[1.03] hover:shadow-xl relative"
              >
                <div className="relative">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="h-56 w-full object-cover transition duration-300 group-hover:brightness-90"
                  />
                  <div className="absolute top-3 right-3 bg-white text-red-500 px-3 py-1 rounded-full shadow flex items-center text-sm font-semibold gap-1">
                    <FaHeart className="text-red-500" /> 4.5
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-1 text-gray-800">{dest.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <FaMapMarkerAlt className="text-teal-500" /> {dest.location}
                  </p>
                  <p className="text-sm text-gray-600 mt-1 italic line-clamp-2">
                    {dest.description}
                  </p>
                  <p className="text-sm text-yellow-500 mt-2 font-medium">
                    ⭐ {avgRating.toFixed(1)} rating
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Explore;

*/