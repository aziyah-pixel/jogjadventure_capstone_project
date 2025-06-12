import { useState } from 'react';

interface ExploreProps {
  onClick?: () => void;
  className?: string;
}

function Explore({ onClick, className = '' }: ExploreProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className={`relative bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 py-12 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="mx-auto w-full max-w-xl">
        <div 
          className="relative w-full h-44 sm:h-52 md:h-56 lg:h-64 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group"
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Background Image + Gradient Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0,0,0,0.2)), url('/tugujogja.jpg')",
            }}
          />

          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-transparent to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Content */}
          <div className="relative z-10 h-full flex items-center justify-between px-5 sm:px-8">
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 group-hover:translate-x-1 transition-transform duration-300">
                Explore Jogja
              </h2>
              <p className="text-white/80 text-sm sm:text-base opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-100">
                Temukan keajaiban kota istimewa
              </p>
            </div>

            {/* Arrow Button */}
            <button 
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/50 flex items-center justify-center transition-all duration-300 backdrop-blur-sm ${
                isHovered 
                  ? 'bg-white/30 border-white/80 scale-110' 
                  : 'hover:bg-white/20 hover:border-white/70'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onClick?.();
              }}
            >
              <svg
                className={`w-5 h-5 text-white transition-transform duration-300 ${
                  isHovered ? 'translate-x-0.5' : ''
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-4 right-4 w-16 h-16 border border-white/20 rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border border-white/20 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
        </div>

        {/* Optional: Quick Stats */}
        <div className="mt-4 flex justify-center space-x-6 text-white/80 text-sm">
          <div className="text-center">
            <div className="font-semibold">150+</div>
            <div className="text-xs">Destinasi</div>
          </div>
          <div className="text-center">
            <div className="font-semibold">4.8★</div>
            <div className="text-xs">Rating</div>
          </div>
          <div className="text-center">
            <div className="font-semibold">50K+</div>
            <div className="text-xs">Wisatawan</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Explore;