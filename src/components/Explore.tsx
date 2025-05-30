function Explore() {
  return (
    <section className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-xl"> {/* <= BATAS LEBAR */}
        <div className="relative w-full h-44 sm:h-52 md:h-56 lg:h-64 rounded-3xl overflow-hidden shadow-lg">
          {/* Background Image + Gradient Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0,0,0,0.1)), url('/tugujogja.jpg')",
            }}
          />

          {/* Content */}
          <div className="relative z-10 h-full flex items-center justify-between px-5 sm:px-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Explore Jogja
            </h2>

            <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full cursor-pointer border border-white/50 flex items-center justify-center hover:bg-white/20 transition backdrop-blur-sm">
              <svg
                className="w-5 h-5 text-white"
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
        </div>
      </div>
    </section>
  );
}

export default Explore;
