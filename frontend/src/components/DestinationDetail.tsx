import React from 'react';
import { ArrowLeft, Star, MapPin, Clock, Calendar, Users, Wallet, Phone, Globe, Navigation, Loader2 } from 'lucide-react';

interface Destination {
  id: string;
  place_id: number;
  place_name: string;
  name: string;
  description: string;
  location: string;
  city: string;
  city_new: string;
  rating: number;
  average_rating: number;
  total_reviews: number;
  duration: string;
  image: string;
  images: Array<{
    url?: string;
    image_url?: string;
    caption?: string;
    alt_text?: string;
  }>;
  category: string;
  price: string | number;
  gallery: string[];
  facilities: string[];
  activities: string[];
  openingHours: string;
  contact: string;
  website?: string;
  bestTime: string;
  capacity: string;
  detailedDescription: string;
  tips: string[];
  coordinates: { lat: number; lng: number };
  coordinate: { lat: number; lng: number };
  latitude: string;
  longitude: string;
  address: string;
  reviews?: any[];
}

interface DestinationDetailProps {
  destination: Destination;
  onBack: () => void;
  loading: boolean;
}

function DestinationDetail({ destination, onBack, loading }: DestinationDetailProps) {
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Memuat detail destinasi...</span>
      </div>
    );
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, fallbackId: string) => {
    const target = e.currentTarget;
    target.src = `https://picsum.photos/800/400?random=${fallbackId}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali ke Daftar
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-96">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
          onError={(e) => handleImageError(e, destination.place_id?.toString() || destination.id)}
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-4xl font-bold mb-2">{destination.name}</h1>
          <div className="flex items-center gap-4 text-lg">
            <span className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-current text-yellow-400" />
              {destination.rating}/5
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-5 h-5" />
              {destination.city}
            </span>
            <span className="text-sm">({destination.total_reviews} ulasan)</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Tentang Destinasi</h2>
              <p className="text-gray-600 leading-relaxed">{destination.detailedDescription}</p>
              {destination.address && (
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Alamat</h3>
                  <p className="text-gray-600">{destination.address}</p>
                </div>
              )}
            </div>

            {/* Activities */}
            {destination.activities && destination.activities.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Aktivitas</h2>
                <div className="grid grid-cols-2 gap-3">
                  {destination.activities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">{activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Facilities */}
            {destination.facilities && destination.facilities.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Fasilitas</h2>
                <div className="grid grid-cols-3 gap-3">
                  {destination.facilities.map((facility, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{facility}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tips */}
            {destination.tips && destination.tips.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Tips Berkunjung</h2>
                <div className="space-y-3">
                  {destination.tips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                      <div className="w-6 h-6 bg-yellow-400 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <span className="text-gray-700">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            {destination.reviews && destination.reviews.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Ulasan Pengunjung</h2>
                <div className="space-y-4">
                  {destination.reviews.slice(0, 5).map((review, index) => (
                    <div key={index} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {review.user_id?.profile?.name?.[0] || review.user_id?.username?.[0] || '?'}
                        </div>
                        <span className="font-medium text-gray-800">
                          {review.user_id?.profile?.name || review.user_id?.username || 'Anonymous'}
                        </span>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < review.rating ? 'fill-current text-yellow-500' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Informasi Cepat</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Wallet className="w-5 h-5 text-green-500" />
                  <div>
                    <div className="text-sm text-gray-500">Harga Tiket</div>
                    <div className="font-semibold text-green-600">{destination.price}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="text-sm text-gray-500">Jam Operasional</div>
                    <div className="font-semibold">{destination.openingHours}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-purple-500" />
                  <div>
                    <div className="text-sm text-gray-500">Waktu Terbaik</div>
                    <div className="font-semibold">{destination.bestTime}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-orange-500" />
                  <div>
                    <div className="text-sm text-gray-500">Kapasitas</div>
                    <div className="font-semibold">{destination.capacity}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Kontak</h3>
              <div className="space-y-3">
                {destination.contact && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-green-500" />
                    <a href={`tel:${destination.contact}`} className="text-blue-600 hover:underline">
                      {destination.contact}
                    </a>
                  </div>
                )}
                
                {destination.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-blue-500" />
                    <a href={`https://${destination.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {destination.website}
                    </a>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <Navigation className="w-5 h-5 text-red-500" />
                  <a 
                    href={`https://maps.google.com/?q=${destination.coordinates.lat},${destination.coordinates.lng}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Buka di Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-md">
                Booking Sekarang
              </button>
              <button className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 transition-all font-semibold">
                Tambah ke Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DestinationDetail;