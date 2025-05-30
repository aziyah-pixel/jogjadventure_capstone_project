import { useState } from 'react';

function Rekomendasi() {
  const [activeTab, setActiveTab] = useState('Rekomendasi');

  const tabs = ['Rekomendasi', 'Rating', 'Sering Dikunjungi'];

  return (
    <div className="p-4 lg:p-6">
      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center lg:justify-start">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 cursor-pointer rounded-full text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-105 ${
              activeTab === tab
                ? 'bg-orange-500 text-white shadow-lg scale-105'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Content Container */}
      <div className="bg-white rounded-2xl p-4 lg:p-8 relative shadow-lg">
        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-8">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left lg:pr-8">
            <div className="mb-6 lg:mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-third mb-4 lg:mb-6 leading-tight">
                Kami Menyediakan Wisata<br />
                Sightseeing Terbaik di Jogja
              </h1>
              <p className="text-gray-800 text-sm sm:text-base lg:text-lg leading-relaxed">
                Temukan pengalaman wisata tak terlupakan di Jogja, dari<br className="hidden lg:block" />
                candi bersejarah hingga alam yang menawan.
              </p>
            </div>

            {/* Image Gallery - 4 small images in a row */}
            <div className="flex gap-2 sm:gap-3 lg:gap-4 justify-center lg:justify-start">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-lg lg:rounded-xl overflow-hidden transition-transform duration-300 hover:scale-110 hover:shadow-lg">
                <img src="/tamansari.jpg" alt="Taman Sari" className="w-full h-full object-cover" />
              </div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-lg lg:rounded-xl overflow-hidden transition-transform duration-300 hover:scale-110 hover:shadow-lg">
                <img src="/malioboro.jpg" alt="Malioboro" className="w-full h-full object-cover" />
              </div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-lg lg:rounded-xl overflow-hidden transition-transform duration-300 hover:scale-110 hover:shadow-lg">
                <img src="/parangtritis1.jpg" alt="Parangtritis" className="w-full h-full object-cover" />
              </div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-lg lg:rounded-xl overflow-hidden transition-transform duration-300 hover:scale-110 hover:shadow-lg">
                <img src="/prambanan2.jpg" alt="Prambanan" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Right Content - Large Hero Image with rounded top */}
          <div className="flex-shrink-0 relative order-first lg:order-last">
            {/* Outer border/frame */}
            <div className="w-64 h-80 sm:w-72 sm:h-88 lg:w-80 lg:h-96 rounded-t-full rounded-b-3xl border-4 border-pink-300 p-2 bg-white shadow-2xl transition-transform duration-300 hover:scale-105">
              {/* Inner image container */}
              <div className="w-full h-full rounded-t-full rounded-b-2xl overflow-hidden">
                <img src="/tugujogja.jpg" alt="Tugu Jogja" className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rekomendasi;