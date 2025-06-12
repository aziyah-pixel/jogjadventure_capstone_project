import { Users, Award, MapPin, Heart, Camera, Globe } from "lucide-react";
import Navbar from "./Navbar";

function About() {
  const stats = [
    { icon: Users, number: "10,000+", label: "Happy Travelers" },
    { icon: MapPin, number: "50+", label: "Destinations" },
    { icon: Award, number: "5", label: "Years Experience" },
    { icon: Camera, number: "1000+", label: "Memories Created" }
  ];

  const team = [
    {
      name: "Ahmad Rizki",
      position: "Founder & Head Guide",
      description: "Local Jogja dengan pengalaman 8 tahun sebagai guide wisata",
      image: "/api/placeholder/200/200"
    },
    {
      name: "Sari Dewi",
      position: "Cultural Expert",
      description: "Ahli budaya Jawa dan sejarah Yogyakarta",
      image: "/api/placeholder/200/200"
    },
    {
      name: "Budi Santoso",
      position: "Adventure Guide",
      description: "Spesialis wisata alam dan petualangan ekstrem",
      image: "/api/placeholder/200/200"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Passion for Jogja",
      description: "Kami lahir dan besar di Jogja, memahami setiap sudut kota istimewa ini dengan hati"
    },
    {
      icon: Users,
      title: "Personal Touch",
      description: "Setiap perjalanan dirancang khusus sesuai minat dan kebutuhan Anda"
    },
    {
      icon: Globe,
      title: "Authentic Experience",
      description: "Menghadirkan pengalaman otentik yang tidak bisa Anda dapatkan dari tempat lain"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl">Passion meets expertise in every journey</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Our Story Section */}
        <div className="mb-16">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Jogjadventure lahir dari kecintaan mendalam terhadap Yogyakarta - kota istimewa yang kaya akan budaya, 
              sejarah, dan keindahan alam. Dimulai pada tahun 2019, kami adalah sekelompok anak muda lokal yang 
              bersemangat berbagi pesona Jogja dengan dunia.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Dari jalanan Malioboro yang ramai hingga keheningan Candi Borobudur di pagi hari, dari petualangan 
              seru di Goa Jomblang hingga sunset romantis di Pantai Parangtritis - kami percaya setiap sudut Jogja 
              memiliki cerita yang layak untuk dibagikan.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-orange-600 rounded-full mb-6">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center bg-white rounded-xl shadow-lg p-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                />
                <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-4">{member.position}</p>
                <p className="text-gray-600 leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Misi kami sederhana namun bermakna: memberikan pengalaman wisata yang autentik, berkesan, 
              dan berkelanjutan di Yogyakarta. Kami tidak hanya menunjukkan tempat-tempat indah, 
              tetapi juga berbagi cerita, budaya, dan kehangatan masyarakat Jogja.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Setiap perjalanan bersama kami adalah undangan untuk merasakan Jogja seperti seorang lokal - 
              dengan hati yang terbuka dan mata yang penuh keajaiban.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Explore Jogja?</h3>
          <p className="text-gray-600 mb-6">Mari bergabung dengan ribuan traveler yang telah merasakan keajaiban Jogja bersama kami</p>
          <a
            href="/"
            className="inline-block bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors font-semibold cursor-pointer"
          >
            Start Your Journey
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;