import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, MapPin, Info, Camera, Clock, HelpCircle, Calendar, Sparkles } from "lucide-react";
import Navbar from "./Navbar";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

<Navbar />

function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const [animatedCards, setAnimatedCards] = useState<number[]>([]);

  useEffect(() => {
    setIsVisible(true);
    // Animate FAQ cards with stagger effect
    const timer = setTimeout(() => {
      setAnimatedCards(prev => [...prev, ...Array.from({length: 10}, (_, i) => i + 1)]);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "Apa saja destinasi wisata wajib dikunjungi di Jogja?",
      answer: "Destinasi wajib di Jogja meliputi Candi Borobudur dan Prambanan (warisan dunia UNESCO), Keraton Yogyakarta, Taman Sari, Malioboro Street, Pantai Parangtritis, Goa Jomblang, dan Hutan Pinus Mangunan. Setiap destinasi memiliki keunikan sejarah dan budaya tersendiri.",
      category: "destinasi"
    },
    {
      id: 2,
      question: "Kapan waktu terbaik untuk berkunjung ke Jogja?",
      answer: "Waktu terbaik berkunjung ke Jogja adalah April-Oktober (musim kemarau) dengan cuaca cerah dan minim hujan. Untuk sunrise di Borobudur, datang sekitar jam 5:30 pagi. Hindari musim liburan sekolah jika ingin menghindari keramaian.",
      category: "praktis"
    },
    {
      id: 3,
      question: "Bagaimana cara menuju ke Candi Borobudur dari pusat kota Jogja?",
      answer: "Dari pusat kota Jogja ke Borobudur sekitar 1 jam perjalanan (42 km). Bisa menggunakan bus Trans Jogja jurusan Borobudur, rental motor, atau mobil pribadi. Tersedia juga paket wisata harian yang mencakup transportasi dan guide lokal.",
      category: "praktis"
    },
    {
      id: 4,
      question: "Apa keunikan budaya yang bisa ditemui di Jogja?",
      answer: "Jogja kaya akan budaya Jawa seperti pertunjukan wayang kulit, tari tradisional, batik tulis asli, dan kerajinan perak Kotagede. Anda bisa menyaksikan upacara adat di Keraton, belajar membatik, atau menikmati gamelan di berbagai venue budaya.",
      category: "budaya"
    },
    {
      id: 5,
      question: "Dimana spot foto terbaik di Jogja untuk photography?",
      answer: "Spot foto terbaik: sunrise di Borobudur, Tebing Breksi dengan formasi batu kapur unik, Hutan Pinus Mangunan dengan hammock, Pantai Timang dengan jembatan gantung, dan Taman Sari dengan kolam pemandian bersejarah. Golden hour di Candi Prambanan juga sangat memukau.",
      category: "fotografi"
    },
    {
      id: 6,
      question: "Apa saja kuliner khas Jogja yang wajib dicoba?",
      answer: "Kuliner wajib: Nasi Gudeg dengan kuah santan dan ayam kampung, Bakpia Pathok isi kacang hijau, Sate Klathak yang dipanggang dengan tusuk besi, Wedang Ronde hangat, dan Geplak dari Bantul. Jangan lewatkan juga Oseng-oseng Mercon yang pedas!",
      category: "kuliner"
    },
    {
      id: 7,
      question: "Bagaimana etika berkunjung ke tempat bersejarah dan budaya?",
      answer: "Hormati aturan berpakaian sopan saat mengunjungi keraton dan candi (hindari pakaian terbuka). Jangan memanjat atau menyentuh relief candi. Minta izin sebelum memotret orang lokal. Jaga kebersihan dan tidak merusak fasilitas. Ikuti instruksi guide lokal.",
      category: "praktis"
    },
    {
      id: 8,
      question: "Apakah ada festival atau event budaya khusus di Jogja?",
      answer: "Event tahunan meliputi: Sekaten (perayaan Maulid Nabi) di Alun-alun Utara, Festival Kesenian Yogyakarta (FKY), Malioboro Festival, dan Borobudur Marathon. Ada juga pertunjukan rutin wayang kulit setiap Sabtu malam di Keraton dan berbagai pameran seni di Taman Budaya.",
      category: "budaya"
    },
    {
      id: 9,
      question: "Apa yang perlu dipersiapkan untuk adventure tourism di Jogja?",
      answer: "Untuk adventure seperti Goa Jomblang: persiapkan sepatu tracking yang kuat, pakaian yang mudah kotor, jaket (suhu dalam goa dingin), dan kondisi fisik yang prima. Untuk river tubing di Sungai Oyo: bawa pakaian ganti dan perlengkapan waterproof untuk gadget.",
      category: "praktis"
    },
    {
      id: 10,
      question: "Bagaimana cara menghargai dan melestarikan wisata lokal?",
      answer: "Dukung ekonomi lokal dengan membeli produk kerajinan langsung dari pengrajin, makan di warung lokal, dan menggunakan jasa guide lokal. Jaga kebersihan destinasi, tidak membuang sampah sembarangan, dan hormati tradisi setempat. Promosikan wisata Jogja secara positif di media sosial.",
      category: "praktis"
    }
  ];

  const categories = [
    { id: "all", name: "Semua", icon: HelpCircle },
    { id: "destinasi", name: "Destinasi", icon: MapPin },
    { id: "praktis", name: "Info Praktis", icon: Info },
    { id: "budaya", name: "Budaya", icon: Calendar },
    { id: "fotografi", name: "Fotografi", icon: Camera },
    { id: "kuliner", name: "Kuliner", icon: Clock }
  ];

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQs = selectedCategory === "all" 
    ? faqData 
    : faqData.filter(faq => faq.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-red-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-64 h-64 bg-red-200 rounded-full opacity-20 animate-bounce" style={{animationDuration: '3s'}}></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-yellow-200 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 animate-pulse"></div>
        </div>
        
        {/* Floating sparkles */}
        <div className="absolute inset-0">
          <Sparkles className="absolute top-20 left-20 w-6 h-6 text-white/40 animate-ping" style={{animationDelay: '0s'}} />
          <Sparkles className="absolute top-32 right-32 w-4 h-4 text-white/40 animate-ping" style={{animationDelay: '1s'}} />
          <Sparkles className="absolute bottom-32 left-1/4 w-5 h-5 text-white/40 animate-ping" style={{animationDelay: '2s'}} />
          <Sparkles className="absolute bottom-20 right-20 w-3 h-3 text-white/40 animate-ping" style={{animationDelay: '0.5s'}} />
        </div>
        
        <div className={`relative z-10 text-center text-white px-4 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h1 className="text-5xl font-bold mb-4 animate-pulse">
            Panduan Wisata Jogja
          </h1>
          <p className="text-xl opacity-90">Pertanyaan Umum Seputar Wisata Yogyakarta</p>
          <div className="mt-6 flex justify-center">
            <div className="w-16 h-1 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
        
        {/* Animated wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                  fill="rgb(249, 250, 251)" className="animate-pulse opacity-80"></path>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Category Filter */}
        <div className={`mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{transitionDelay: '200ms'}}>
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Pilih Kategori Informasi
            </span>
          </h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 font-medium transform hover:scale-105 hover:-translate-y-1 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-xl shadow-orange-500/25'
                    : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-lg border border-gray-200/50'
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: isVisible ? 'slideInUp 0.6s ease-out forwards' : 'none'
                }}
              >
                <category.icon className={`w-5 h-5 transition-transform duration-300 group-hover:rotate-12 ${
                  selectedCategory === category.id ? 'animate-pulse' : ''
                }`} />
                <span>{category.name}</span>
                {selectedCategory === category.id && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-600 to-red-600 opacity-20 animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="space-y-6">
            {filteredFAQs.map((faq, index) => (
              <div 
                key={faq.id} 
                className={`group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-gray-200/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                  animatedCards.includes(faq.id) ? 'animate-slideInScale' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all duration-300"
                >
                  <span className="font-semibold text-gray-800 pr-4 group-hover:text-orange-600 transition-colors duration-300">
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-full transition-all duration-300 ${
                    openItems.includes(faq.id) 
                      ? 'bg-orange-600 text-white rotate-180' 
                      : 'bg-gray-100 text-gray-500 group-hover:bg-orange-100 group-hover:text-orange-600'
                  }`}>
                    {openItems.includes(faq.id) ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </button>
                
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openItems.includes(faq.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-8 pb-6 pt-2 border-t border-gray-100">
                    <div className={`transition-all duration-500 transform ${
                      openItems.includes(faq.id) ? 'translate-y-0' : 'translate-y-4'
                    }`}>
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Information Section */}
        <div className={`bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-200/50 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`} style={{transitionDelay: '600ms'}}>
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Butuh Informasi Lebih Lanjut?
            </span>
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Ingin tahu lebih detail tentang wisata Jogja? Hubungi pusat informasi pariwisata resmi
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Info, title: "Dinas Pariwisata", desc: "Informasi resmi wisata DIY", addr1: "Jl. Malioboro No. 16", addr2: "Yogyakarta 55213", color: "blue" },
              { icon: MapPin, title: "Tourist Info Center", desc: "Bantuan wisatawan", addr1: "Bandara YIA, Stasiun Tugu", addr2: "& Malioboro Street", color: "green" },
              { icon: Calendar, title: "Balai Pelestarian", desc: "Info cagar budaya", addr1: "Candi & Situs Bersejarah", addr2: "Yogyakarta - Jawa Tengah", color: "purple" }
            ].map((item, index) => (
              <div 
                key={index}
                className="group text-center p-8 border border-gray-200/50 rounded-2xl hover:shadow-xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 bg-white/50 backdrop-blur-sm"
                style={{
                  animationDelay: `${800 + index * 200}ms`,
                  animation: isVisible ? 'fadeInUp 0.8s ease-out forwards' : 'none'
                }}
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-${item.color}-100 text-${item.color}-600 rounded-full mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`}>
                  <item.icon className="w-10 h-10" />
                </div>
                <h3 className="font-bold text-gray-800 mb-3 text-xl group-hover:text-orange-600 transition-colors duration-300">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.desc}</p>
                <div className="text-sm text-gray-600">
                  <p>{item.addr1}</p>
                  <p>{item.addr2}</p>
                </div>
                
                {/* Animated border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* Operating Hours */}
          <div className="mt-10 p-8 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-200/50">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-orange-600 animate-pulse" />
              <h3 className="font-bold text-gray-800 text-xl">Jam Operasional Destinasi</h3>
            </div>
            <div className="text-center text-gray-600 space-y-2">
              <p className="text-lg">Umumnya: 06:00 - 17:00 WIB (Candi & Situs Bersejarah)</p>
              <p className="text-lg">Keraton: 08:30 - 14:00 WIB (Tutup Jumat)</p>
              <p className="text-sm mt-3 opacity-75">*Jam operasional dapat berubah pada hari besar atau event khusus</p>
            </div>
          </div>
        </div>

        {/* Travel Tips */}
        <div className={`mt-16 bg-gradient-to-r from-orange-100 via-red-50 to-pink-100 rounded-3xl p-10 border border-orange-200/50 shadow-2xl transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`} style={{transitionDelay: '800ms'}}>
          <h3 className="text-3xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Tips Wisata Jogja
            </span>
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Pelajari Sejarah", desc: "Pahami latar belakang sejarah setiap destinasi untuk pengalaman yang lebih bermakna" },
              { title: "Datang Pagi", desc: "Kunjungi destinasi populer di pagi hari untuk menghindari keramaian dan cuaca panas" },
              { title: "Hormati Budaya", desc: "Berpakaian sopan dan ikuti aturan saat mengunjungi tempat suci dan bersejarah" },
              { title: "Dukung Lokal", desc: "Beli oleh-oleh dari pengrajin lokal dan coba kuliner tradisional di warung asli" }
            ].map((tip, index) => (
              <div key={index} className="group flex gap-6 items-start">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 shadow-lg">
                  {index + 1}
                </div>
                <div className="group-hover:translate-x-2 transition-transform duration-300">
                  <h4 className="font-bold text-gray-800 mb-2 text-lg group-hover:text-orange-600 transition-colors duration-300">{tip.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInScale {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideInScale {
          animation: slideInScale 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default FAQ;