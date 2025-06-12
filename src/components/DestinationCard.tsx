import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "./Navbar"; // Import navbar Anda


const DestinationCard = () => {
    const { id } = useParams(); 

     // Data untuk destinasi
     const destinations = [
        {
          id: 1,
          name: "Prambanan",
          image: "/prambanan2.jpg",
          description:
            "Ancient Hindu temple complex featuring stunning architecture",
          size: "large",
        },
        {
          id: 2,
          name: "Malioboro",
          image: "/malioboro.jpg",
          description: "Famous shopping street with local culture",
          size: "small",
        },
        {
          id: 3,
          name: "Tugu Jogja",
          image: "/tugujogja.jpg",
          description: "Iconic monument representing the spirit of Yogyakarta",
          size: "small",
        },
        {
          id: 4,
          name: "Titik Nol Km Jogja",
          image: "/nolkm.jpg",
          description: "Historical landmark marking the heart of Yogyakarta",
          size: "large",
        },
        {
          id: 5,
          name: "Parangtritis",
          image: "/parangtritis1.jpg",
          description: "Beautiful beach with mystical legends",
          size: "large",
        },
        {
          id: 6,
          name: "Taman Sari",
          image: "/tamansari.jpg",
          description: "Royal garden complex with beautiful pools",
          size: "small",
        },
        {
          id: 7,
          name: "Borobudur",
          image: "/borobudur.jpg",
          description: "World's largest Buddhist temple complex",
          size: "large",
        },
        {
          id: 8,
          name: "Keraton Yogyakarta",
          image: "/keraton.jpg",
          description: "Sultan's palace with rich Javanese culture",
          size: "small",
        },
      ];

      // Find the destination by ID
      const destination = destinations.find(dest => dest.id === parseInt(id));
  if (!destination) {
    return <div>Destination not found</div>; // Handle case where destination is not found
  }

  return (
    <div className="min-h-screen relative bg-white overflow-hidden">
    {/* Navbar */}
    <Navbar />

      <div className="w-full h-full left-0 top-0 absolute bg-zinc-300" />
      <img className="w-full h-full left-0 top-0 absolute" src={destination.image} alt={destination.name} />
      {/*<div className="w-[667px] left-[100px] top-[573px] absolute justify-start text-white text-xl font-normal font-['Poppins']">
        Best time to visit : June-Agustus<br />
        Ideal Time : 3-5 Day<br />
        Location : Sleman, Daerah Istimewa Yogyakarta
  </div>*/}
      <div className="w-[667px] left-[100px] top-[336px] absolute justify-start">
        <span className="text-white text-xl font-bold font-['Poppins']">{destination.name}</span>
        <span className="text-white text-xl font-normal font-['Poppins']"> {destination.description}</span>
      </div>
      <div className="left-[100px] top-[217px] absolute justify-start text-white text-6xl font-bold font-['Poppins']">{destination.name}</div>

       
    </div>
  );
};

export default DestinationCard;
