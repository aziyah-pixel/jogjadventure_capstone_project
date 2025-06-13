import {
  Users,
  Award,
  MapPin,
  Heart,
  Camera,
  Globe,
  Github,
  Linkedin,
  Instagram,
  ArrowRight,
  Star,
  Sparkles,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";

// Counter animation component
function AnimatedCounter({ end, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  
  useEffect(() => {
    if (!hasStarted) return;
    
    let startTime = null;
    const startCount = 0;
    
    const animate = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration, hasStarted]);
  
  useEffect(() => {
    const timer = setTimeout(() => setHasStarted(true), 500);
    return () => clearTimeout(timer);
  }, []);
  
  return count;
}

// Intersection Observer Hook
function useIntersectionObserver(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState({});
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.dataset.section]: true }));
          }
        });
      },
      { threshold }
    );

    const elements = document.querySelectorAll('[data-section]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold]);
  
  return isVisible;
}

function About() {
  const isVisible = useIntersectionObserver();
  
  const stats = [
    { icon: Users, number: 10000, suffix: "+", label: "Happy Travelers" },
    { icon: MapPin, number: 50, suffix: "+", label: "Destinations" },
    { icon: Award, number: 5, suffix: "", label: "Years Experience" },
    { icon: Camera, number: 1000, suffix: "+", label: "Memories Created" },
  ];

  const team = [
    {
      name: "Musyaffa Arwiin Syah Bahtiar",
      position: "Team Leader & Full-Stack Developer",
      description: "Ketua tim di Capstone Projek Jogjadventure Dicoding 2025.",
      image: "/public/ourteam/musyaffa.jpg",
      socials: {
        github: "https://github.com/Musyaffaa2/",
        linkedin: "https://www.linkedin.com/in/musyaffa-arwiin",
        instagram: "https://instagram.com/yaaffaaa_",
      },
    },
    {
      name: "Soraya Indah Setiani",
      position: "Deputy Team Leader & Machine Learning Engineer",
      description: "Wakil Ketua tim di Capstone Projek Jogjadventure Dicoding 2025.",
      image: "/public/ourteam/raya.jpg",
      socials: {
        github: "https://github.com/sorayaindahs",
        linkedin: "https://www.linkedin.com/in/sorayaindahs/",
        instagram: "http://instagram.com/soraaya.aa",
      },
    },
    {
      name: "Aulaa Mustika",
      position: "Machine Learning Engineer",
      description: "Machine Learning Engineer yang berfokus pada pengembangan model AI",
      image: "/public/ourteam/aula.png",
      socials: {
        github: "https://github.com/AulaaMustika36",
        linkedin: "https://www.linkedin.com/in/aulaa-mustika-228363248/",
        instagram: "https://www.instagram.com/aul_aa.ami?igsh=dHYzenFiazNqd290",
      },
    },
    {
      name: "Optra Dananjaya",
      position: "Machine Learning Engineer",
      description: "Machine Learning Engineer yang berfokus pada pengembangan model AI",
      image: "/public/ourteam/optra.png",
      socials: {
        github: "https://github.com/Optra123",
        linkedin: "https://www.linkedin.com/in/optra-dananjaya/",
        instagram: "https://www.instagram.com/merhmerah/",
      },
    },
    {
      name: "Nanda Nur Aziyah",
      position: "Front-End Developer",
      description: "Desainer UI/UX yang berfokus pada pengalaman pengguna",
      image: "/public/ourteam/nanda.png",
      socials: {
        github: "https://github.com/aziyah-pixel",
        linkedin: "https://www.linkedin.com/in/nanda-aziyah-76a8b9346/",
        instagram: "https://www.instagram.com/aziyahnanda12",
      },
    },
    {
      name: "Moh. Musayffak",
      position: " Back-End Developer & User Interface Designer",
      description: "Back-End Developer yang berfokus pada pengembangan API dan integrasi sistem",
      image: "/public/ourteam/raya.jpg",
      socials: {
        github: "https://github.com/msyfk",
        linkedin: "https://www.linkedin.com/in/moh-musyaffak-42a3232a9",
        instagram: "https://instagram.com/ea.msyfkaaa__",
      },
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Passion for Jogja",
      description: "Kami lahir dan besar di Jogja, memahami setiap sudut kota istimewa ini dengan hati",
      color: "from-red-400 to-pink-600",
    },
    {
      icon: Users,
      title: "Personal Touch",
      description: "Setiap perjalanan dirancang khusus sesuai minat dan kebutuhan Anda",
      color: "from-blue-400 to-indigo-600",
    },
    {
      icon: Globe,
      title: "Authentic Experience",
      description: "Menghadirkan pengalaman otentik yang tidak bisa Anda dapatkan dari tempat lain",
      color: "from-green-400 to-teal-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Navbar />

      {/* Floating particles background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          >
            <Sparkles className="w-4 h-4 text-orange-400" />
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <div className="relative h-screen bg-gradient-to-br from-orange-600 via-red-600 to-purple-700 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Animated background shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-pulse" />
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-orange-300/20 rounded-full animate-bounce" style={{ animationDuration: '3s' }} />
          <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-pink-300/30 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
        </div>
        
        <div className="relative z-10 text-center text-white px-4">
          <div className="mb-6">
            <Star className="w-12 h-12 mx-auto mb-4 text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} />
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-200 to-orange-200 bg-clip-text text-transparent animate-pulse">
            About Us
          </h1>
          <p className="text-2xl mb-8 opacity-0 animate-pulse" style={{ animationDelay: '0.3s', animation: 'fadeIn 1s ease-out 0.5s forwards' }}>
            Passion meets expertise in every journey
          </p>
          <div className="animate-bounce mt-12">
            <ArrowRight className="w-8 h-8 mx-auto rotate-90" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Our Story Section */}
        <div 
          data-section="story"
          className={`mb-20 text-center max-w-4xl mx-auto transition-all duration-1000 ${
            isVisible.story ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-block p-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-full mb-6">
            <Heart className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-8 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Our Story
          </h2>
          <div className="space-y-6">
            <p className="text-lg text-gray-600 leading-relaxed p-6 bg-white/80 backdrop-blur rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Jogjadventure lahir dari kecintaan mendalam terhadap Yogyakarta – kota istimewa yang kaya akan budaya, sejarah, dan keindahan alam. Dimulai pada tahun 2019, kami adalah sekelompok anak muda lokal yang bersemangat berbagi pesona Jogja dengan dunia.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed p-6 bg-white/80 backdrop-blur rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Dari jalanan Malioboro yang ramai hingga keheningan Candi Borobudur di pagi hari, dari petualangan seru di Goa Jomblang hingga sunset romantis di Pantai Parangtritis – kami percaya setiap sudut Jogja memiliki cerita yang layak untuk dibagikan.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div 
          data-section="stats"
          className={`mb-20 transition-all duration-1000 ${
            isVisible.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center group hover:scale-110 transition-all duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-600 text-white rounded-2xl mb-6 shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:rotate-12">
                  <stat.icon className="w-10 h-10" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse" />
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-2 tabular-nums">
                  {isVisible.stats && <AnimatedCounter end={stat.number} />}
                  {stat.suffix}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div 
          data-section="values"
          className={`mb-20 transition-all duration-1000 ${
            isVisible.values ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                <div className="relative p-8 text-center">
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${value.color} text-white rounded-2xl mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <value.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 bg-gradient-to-r group-hover:bg-clip-text">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div 
          data-section="team"
          className={`mb-20 transition-all duration-1000 ${
            isVisible.team ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-red-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-8 text-center">
                  <div className="relative mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-400 rounded-full border-4 border-white shadow-lg animate-pulse" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-3 text-sm uppercase tracking-wide">
                    {member.position}
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                    {member.description}
                  </p>
                  <div className="flex justify-center space-x-4">
                    {member.socials.github && (
                      <a 
                        href={member.socials.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-100 rounded-full hover:bg-gray-800 hover:text-white transition-all duration-300 hover:scale-110"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {member.socials.linkedin && (
                      <a 
                        href={member.socials.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-100 rounded-full hover:bg-blue-700 hover:text-white transition-all duration-300 hover:scale-110"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {member.socials.instagram && (
                      <a 
                        href={member.socials.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-100 rounded-full hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all duration-300 hover:scale-110"
                      >
                        <Instagram className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div 
          data-section="mission"
          className={`mb-16 transition-all duration-1000 ${
            isVisible.mission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-white via-orange-50 to-red-50 rounded-3xl shadow-2xl p-8 md:p-16 text-center max-w-4xl mx-auto">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-orange-200 to-red-200 rounded-full -translate-x-16 -translate-y-16 opacity-50" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full translate-x-20 translate-y-20 opacity-50" />
            
            <div className="relative z-10">
              <div className="inline-block p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-8">
                <Globe className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-8 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Our Mission
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Misi kami sederhana namun bermakna: memberikan pengalaman wisata yang autentik, berkesan, dan berkelanjutan di Yogyakarta. Kami tidak hanya menunjukkan tempat-tempat indah, tetapi juga berbagi cerita, budaya, dan kehangatan masyarakat Jogja.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Setiap perjalanan bersama kami adalah undangan untuk merasakan Jogja seperti seorang lokal – dengan hati yang terbuka dan mata yang penuh keajaiban.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div 
          data-section="cta"
          className={`text-center transition-all duration-1000 ${
            isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl p-12 text-white shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">Ready to Explore Jogja?</h3>
            <p className="text-xl mb-8 opacity-90">
              Mari bergabung dengan ribuan traveler yang telah merasakan keajaiban Jogja bersama kami
            </p>
            <button className="group relative inline-flex items-center gap-3 bg-white text-orange-600 px-10 py-4 rounded-2xl hover:bg-orange-50 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105">
              Start Your Journey
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default About;