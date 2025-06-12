// DestinationDetail.tsx
export interface Destination {
  id: number;
  name: string;
  image: string;
  description: string;
  size: string;
  bestTime: string;
  idealTime: string;
  location: string;
}

export const destinations: Destination[] = [
  {
    id: 1,
    name: "Prambanan",
    image: "/prambanan2.jpg",
    description: "Ancient Hindu temple complex featuring stunning architecture",
    size: "large",
    bestTime: "June-August",
    idealTime: "3-5 Days",
    location: "Sleman, Daerah Istimewa Yogyakarta"
  },
  {
    id: 2,
    name: "Malioboro",
    image: "/malioboro.jpg",
    description: "Famous shopping street with local culture",
    size: "small",
    bestTime: "All year round",
    idealTime: "1-2 Days",
    location: "Yogyakarta City Center"
  },
  {
    id: 3,
    name: "Tugu Jogja",
    image: "/tugujogja.jpg",
    description: "Iconic monument representing the spirit of Yogyakarta",
    size: "small",
    bestTime: "All year round",
    idealTime: "2-3 Hours",
    location: "Yogyakarta City Center"
  },
  {
    id: 4,
    name: "Titik Nol Km Jogja",
    image: "/nolkm.jpg",
    description: "Historical landmark marking the heart of Yogyakarta",
    size: "large",
    bestTime: "All year round",
    idealTime: "1-2 Hours",
    location: "Yogyakarta City Center"
  },
  {
    id: 5,
    name: "Parangtritis",
    image: "/parangtritis1.jpg",
    description: "Beautiful beach with mystical legends",
    size: "large",
    bestTime: "April-October",
    idealTime: "1-2 Days",
    location: "Bantul, Daerah Istimewa Yogyakarta"
  },
  {
    id: 6,
    name: "Taman Sari",
    image: "/tamansari.jpg",
    description: "Royal garden complex with beautiful pools",
    size: "small",
    bestTime: "All year round",
    idealTime: "2-3 Hours",
    location: "Yogyakarta City Center"
  },
  {
    id: 7,
    name: "Borobudur",
    image: "/borobudur.jpg",
    description: "World's largest Buddhist temple complex",
    size: "large",
    bestTime: "May-September",
    idealTime: "1-2 Days",
    location: "Magelang, Central Java"
  },
  {
    id: 8,
    name: "Keraton Yogyakarta",
    image: "/keraton.jpg",
    description: "Sultan's palace with rich Javanese culture",
    size: "small",
    bestTime: "All year round",
    idealTime: "2-4 Hours",
    location: "Yogyakarta City Center"
  },
];

// Helper function to get destination by ID
export const getDestinationById = (id: number): Destination | undefined => {
  return destinations.find(dest => dest.id === id);
};