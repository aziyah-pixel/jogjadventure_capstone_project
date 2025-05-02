function Hero() {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/prambanan.jpg')" }}
    >
      {/* Hero Content */}
      <div className="flex flex-col justify-center items-center text-center h-full text-white px-4 backdrop-brightness-75">
        {/* Search */}
        <div className="flex items-center mb-4 bg-white rounded-full overflow-hidden w-[280px] sm:w-[360px]">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 text-dark outline-none"
          />
          <button className="px-4 py-2 text-dark font-bold cursor-pointer">
            🔍
          </button>
        </div>

        {/* Judul */}
        <h1 className="text-4xl md:text-5xl font-bold leading-snug">
          Explore The Beauty <br />
          of <span className="text-secondary">Jogja</span>

        </h1>

        <p className="mt-2 text-sm md:text-base text-white/80">
          The wonderful of Jogja
        </p>
      </div>
    </div>
  );
}

export default Hero;
