import { useState } from "react";
import { Search, MapPin, Star, Clock, Camera } from "lucide-react";

interface Destination {
  id: number;
  name: string;
  description: string;
  location: string;
  rating: number;
  duration: string;
  image: string;
  category: string;
  price: string;
}

function Destinations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const destinations: Destination[] = [
    {
      id: 1,
      name: "Candi Borobudur",
      description: "Candi Buddha terbesar di dunia dengan arsitektur yang menakjubkan",
      location: "Magelang, Jawa Tengah",
      rating: 4.8,
      duration: "3-4 jam",
      image: "/api/placeholder/400/300",
      category: "heritage",
      price: "Rp 50.000"
    },
    {
      id: 2,
      name: "Candi Prambanan",
      description: "Kompleks candi Hindu terbesar dengan relief yang memukau",
      location: "Sleman, Yogyakarta",
      rating: 4.7,
      duration: "2-3 jam",
      image: "/api/placeholder/400/300",
      category: "heritage",
      price: "Rp 40.000"
    },
    {
      id: 3,
      name: "Pantai Parangtritis",
      description: "Pantai eksotis dengan pemandangan sunset yang menawan",
      location: "Bantul, Yogyakarta",
      rating: 4.5,
      duration: "2-3 jam",
      image: "/api/placeholder/400/300",
      category: "nature",
      price: "Gratis"
    },
    {
      id: 4,
      name: "Malioboro Street",
      description: "Jalan legendaris dengan berbagai toko, kuliner, dan budaya",
      location: "Yogyakarta",
      rating: 4.6,
      duration: "2-4 jam",
      image: "/api/placeholder/400/300",
      category: "culture",
      price: "Gratis"
    },
    {
      id: 5,
      name: "Goa Jomblang",
      description: "Goa vertikal dengan cahaya surga yang memukau",
      location: "Gunung Kidul, Yogyakarta",
      rating: 4.9,
      duration: "5-6 jam",
      image: "/api/placeholder/400/300",
      category: "adventure",
      price: "Rp 450.000"
    },
    {
      id: 6,
      name: "Keraton Yogyakarta",
      description: "Istana Sultan dengan arsitektur Jawa yang megah",
      location: "Yogyakarta",
      rating: 4.4,
      duration: "1-2 jam",
      image: "/api/placeholder/400/300",
      category: "culture",
      price: "Rp 15.000"
    }
  ];

  const categories = [
    { id: "all", name: "Semua", icon: "🏛️" },
    { id: "heritage", name: "Heritage", icon: "🏛️" },
    { id: "nature", name: "Alam", icon: "🌿" },
    { id: "culture", name: "Budaya", icon: "🎭" },
    { id: "adventure", name: "Petualangan", icon: "⛰️" }
  ];

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dest.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || dest.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-700 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">Destinations</h1>
          <p className="text-xl">Temukan keajaiban tersembunyi di Yogyakarta</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Search & Filter Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-center mb-8">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari destinasi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map(destination => (
            <div key={destination.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-semibold text-green-600">
                  {destination.price}
                </div>
                <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                  <Camera className="w-3 h-3" />
                  Photo Spot
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{destination.name}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{destination.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{destination.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{destination.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-gray-700">{destination.rating}/5</span>
                  </div>
                </div>
                
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  Lihat Detail
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Destinasi tidak ditemukan</h3>
            <p className="text-gray-500">Coba ubah kata kunci pencarian atau kategori</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Destinations;