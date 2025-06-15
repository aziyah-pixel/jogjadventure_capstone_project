export interface Destination {
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

export interface ApiResponse {
  destinations: Destination[];
  currentPage: number;
  totalPages: number;
  totalDestinations: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}