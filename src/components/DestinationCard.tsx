// components/DestinationCard.tsx
import React from 'react';
import { MapPin, Star, Clock, Camera } from 'lucide-react';
import { Destination } from '../../backend/types/destination';
import { handleImageError } from '../../backend/utils/destinationUtils';

interface DestinationCardProps {
  destination: Destination;
  onViewDetail: (destination: Destination) => void;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ 
  destination, 
  onViewDetail 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div className="relative">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-48 object-cover"
          onError={(e) => handleImageError(e, destination.place_id?.toString() || destination.id)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-green-600 shadow-md">
          {destination.price}
        </div>
        <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1 backdrop-blur-sm">
          <Camera className="w-3 h-3" />
          Photo Spot
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{destination.name}</h3>
        <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">{destination.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin className="w-4 h-4 text-blue-500" />
            <span>{destination.city}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4 text-green-500" />
            <span>{destination.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Star className="w-4 h-4 fill-current text-yellow-500" />
            <span className="text-gray-700 font-medium">{destination.rating}/5</span>
            <span className="text-gray-500">({destination.total_reviews} ulasan)</span>
          </div>
        </div>
        
        <button 
          onClick={() => onViewDetail(destination)}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-md hover:shadow-lg"
        >
          Lihat Detail
        </button>
      </div>
    </div>
  );
};

export default DestinationCard;