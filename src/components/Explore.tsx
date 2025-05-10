import React, { useState } from "react";
import { motion } from "framer-motion";

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
  const [activeIndex, setActiveIndex] = useState(1);
  const [expanded, setExpanded] = useState(false);

  const handleCardClick = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    setExpanded(false);
  };

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const getCardPosition = (index: number) => {
    if (index === activeIndex) {
      return {
        rotate: "rotate-0",
        translateX: "translate-x-0",
        zIndex: 30,
        scale: "scale-105",
        shadow: "shadow-2xl",
        isCenter: true,
      };
    } else if ((index + 1) % 3 === activeIndex) {
      return {
        rotate: "-rotate-12",
        translateX: "-translate-x-40",
        zIndex: 20,
        scale: "scale-95",
        shadow: "shadow-md",
        isCenter: false,
      };
    } else {
      return {
        rotate: "rotate-12",
        translateX: "translate-x-40",
        zIndex: 20,
        scale: "scale-95",
        shadow: "shadow-md",
        isCenter: false,
      };
    }
  };

  return (
    <div className="w-full flex flex-col items-center mt-10 px-4 bg-primary py-20 rounded-t-3xl shadow-inner">
      <h2 className="text-3xl font-bold mb-10 font-montserrat text-white">
        Explore Destinations
      </h2>

      <div className="relative w-full max-w-5xl h-[600px] flex justify-center items-start">
        {destinationsData.map((dest, index) => {
          const pos = getCardPosition(index);
          return (
            <DestinationCard
              key={index}
              {...dest}
              rotate={pos.rotate}
              translateX={pos.translateX}
              zIndex={pos.zIndex}
              scale={pos.scale}
              shadow={pos.shadow}
              isCenter={pos.isCenter}
              expanded={expanded && index === activeIndex}
              onClick={() => handleCardClick(index)}
              onToggleExpand={handleToggleExpand}
            />
          );
        })}
      </div>
    </div>
  );
};

interface Props extends Destination {
  rotate?: string;
  zIndex?: number;
  translateX?: string;
  scale?: string;
  shadow?: string;
  onClick?: () => void;
  onToggleExpand?: () => void;
  isCenter?: boolean;
  expanded?: boolean;
}

const DestinationCard: React.FC<Props> = ({
  name,
  location,
  image,
  description,
  reviews,
  rotate = "rotate-0",
  zIndex = 10,
  translateX = "translate-x-0",
  scale = "scale-100",
  shadow = "shadow-lg",
  onClick,
  onToggleExpand,
  isCenter = false,
  expanded = false,
}) => {
  const averageRating =
    reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length;

  return (
    <motion.div
      onClick={onClick}
      className={`absolute top-0 w-72 rounded-3xl overflow-hidden bg-white/80 backdrop-blur-md border border-white cursor-pointer transition-all duration-700 ease-in-out transform ${rotate} ${translateX} ${scale} ${shadow} ${
        isCenter && expanded ? "h-[520px]" : "h-96"
      } hover:scale-105 hover:shadow-xl`}
      style={{ zIndex }}
      whileTap={{ scale: 1.05 }}
    >
      <img src={image} alt={name} className="w-full h-1/2 object-cover" />
      <div className="p-4 flex flex-col justify-between h-1/2">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{name}</h3>
          <p className="text-sm text-pink-600 mt-1 flex items-center gap-1">
            📍 {location}
          </p>
          <p className="text-xs text-yellow-500 mt-1">
            ⭐ {averageRating.toFixed(1)} dari {reviews.length} review
          </p>
        </div>

        {isCenter && !expanded && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand && onToggleExpand();
            }}
            className="mt-4 py-2 px-4 bg-blue-600 text-white text-sm rounded-full shadow hover:bg-blue-700 transition"
          >
            Lihat Detail
          </button>
        )}

        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 space-y-2 overflow-auto"
          >
            <p className="text-sm text-gray-700">{description}</p>
            {reviews.slice(0, 2).map((r, i) => (
              <div key={i} className="text-xs text-gray-600 border-t pt-2">
                <p className="font-semibold">
                  {r.user}{" "}
                  <span className="text-yellow-500">⭐ {r.rating}</span>
                </p>
                <p className="italic">"{r.comment}"</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Explore;
