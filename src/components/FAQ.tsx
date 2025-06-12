import { useState } from "react";
import { ChevronDown, ChevronUp, Phone, Mail, MessageCircle, Clock, HelpCircle } from "lucide-react";
import Navbar from "./Navbar";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "Bagaimana cara memesan tour dengan Jogjadventure?",
      answer: "Anda dapat memesan tour melalui website ini dengan mengklik tombol 'Book Now' pada destinasi yang diinginkan, atau menghubungi kami langsung via WhatsApp/telepon. Tim kami akan membantu merencanakan perjalanan sesuai kebutuhan Anda.",
      category: "booking"
    },
    {
      id: 2,
      question: "Apakah harga tour sudah termasuk tiket masuk destinasi?",
      answer: "Harga tour yang tercantum belum termasuk tiket masuk destinasi. Namun, kami akan menginformasikan secara detail biaya tiket masuk setiap lokasi saat proses booking untuk transparansi penuh.",
      category: "pricing"
    },
    {
      id: 3,
      question: "Apakah bisa request custom itinerary?",
      answer: "Tentu saja! Kami sangat welcome dengan request custom itinerary. Beritahu kami destinasi yang ingin dikunjungi, durasi trip, dan preferensi Anda. Tim kami akan merancang itinerary khusus sesuai keinginan.",
      category: "booking"
    },
    {
      id: 4,
      question: "Berapa minimal peserta untuk private tour?",
      answer: "Tidak ada minimal peserta untuk private tour. Kami melayani individual traveler, couple, keluarga, hingga group besar. Harga akan disesuaikan dengan jumlah peserta.",
      category: "booking"
    },
    {
      id: 5,
      question: "Apakah guide bisa berbahasa Inggris?",
      answer: "Ya, sebagian guide kami dapat berkomunikasi dalam bahasa Inggris. Harap informasikan kebutuhan bahasa saat booking agar kami dapat mencarikan guide yang sesuai.",
      category: "service"
    },
    {
      id: 6,
      question: "Bagaimana kebijakan pembatalan tour?",
      answer: "Pembatalan 48 jam sebelum tour: refund 100%. Pembatalan 24 jam sebelum tour: refund 50%. Pembatalan di hari yang sama: no refund. Namun, kami flexible untuk reschedule jika ada kondisi khusus.",
      category: "policy"
    },
    {
      id: 7,
      question: "Apakah tersedia fasilitas pick up dari hotel?",
      answer: "Ya, kami menyediakan layanan pick up dari hotel/penginapan di area Yogyakarta. Untuk area di luar kota, akan ada tambahan biaya transportasi yang akan diinformasikan saat booking.",
      category: "service"
    },
    {
      id: 8,
      question: "Apa yang perlu dipersiapkan untuk adventure tour?",
      answer: "Untuk adventure tour seperti Goa Jomblang, persiapkan: sepatu yang nyaman dan anti-slip, pakaian yang mudah kotor, kamera waterproof, dan kondisi fisik yang fit. Kami akan provide safety equipment.",
      category: "preparation"
    },
    {
      id: 9,
      question: "Apakah ada paket tour untuk fotografer?",
      answer: "Ada! Kami memiliki paket khusus photography tour dengan guide yang paham spot-spot foto terbaik dan golden hour di setiap destinasi. Cocok untuk pre-wedding atau photography enthusiast.",
      category: "service"
    },
    {
      id: 10,
      question: "Bagaimana jika cuaca buruk saat tour?",
      answer: "Jika cuaca ekstrem dan tidak memungkinkan untuk tour, kami akan menawarkan reschedule tanpa biaya tambahan atau refund sesuai kebijakan. Safety adalah prioritas utama kami.",
      category: "policy"
    }
  ];

  const categories = [
    { id: "all", name: "Semua", icon: HelpCircle },
    { id: "booking", name: "Booking", icon: Phone },
    { id: "pricing", name: "Harga", icon: MessageCircle },
    { id: "service", name: "Layanan", icon: Clock },
    { id: "policy", name: "Kebijakan", icon: Mail },
    { id: "preparation", name: "Persiapan", icon: HelpCircle }
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
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">FAQ & Bantuan</h1>
          <p className="text-xl">Pertanyaan yang Sering Diajukan</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Category Filter */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Pilih Kategori</h2>
          <div className="flex flex-wrap justify-center gap-3">
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
                <category.icon className="w-4 h-4" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="space-y-4">
            {filteredFAQs.map(faq => (
              <div key={faq.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-800 pr-4">{faq.question}</span>
                  {openItems.includes(faq.id) ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                
                {openItems.includes(faq.id) && (
                  <div className="px-6 pb-4 pt-2 border-t border-gray-100">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Butuh Bantuan Lebih Lanjut?</h2>
          <p className="text-center text-gray-600 mb-8">
            Tidak menemukan jawaban yang Anda cari? Tim customer service kami siap membantu Anda 24/7
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* WhatsApp */}
            <div className="text-center p-6 border rounded-lg hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">WhatsApp</h3>
              <p className="text-gray-600 mb-4">Respon cepat via WhatsApp</p>
              <a 
                href="https://wa.me/6281234567890" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Chat Sekarang
              </a>
            </div>

            {/* Phone */}
            <div className="text-center p-6 border rounded-lg hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Telepon</h3>
              <p className="text-gray-600 mb-4">Hubungi langsung tim kami</p>
              <a 
                href="tel:+6281234567890"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                (0274) 123-4567
              </a>
            </div>

            {/* Email */}
            <div className="text-center p-6 border rounded-lg hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-full mb-4">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Email</h3>
              <p className="text-gray-600 mb-4">Kirim pertanyaan detail</p>
              <a 
                href="mailto:info@jogjadventure.com"
                className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Send Email
              </a>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-gray-600" />
              <h3 className="font-bold text-gray-800">Jam Operasional</h3>
            </div>
            <div className="text-center text-gray-600">
              <p>Senin - Minggu: 08:00 - 22:00 WIB</p>
              <p className="text-sm mt-1">Customer service siap membantu Anda setiap hari</p>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">Tips Booking</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Book in Advance</h4>
                <p className="text-gray-600 text-sm">Booking 3-7 hari sebelumnya untuk mendapatkan guide dan slot terbaik</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Flexible Schedule</h4>
                <p className="text-gray-600 text-sm">Berikan 2-3 pilihan tanggal untuk fleksibilitas scheduling</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Communicate Needs</h4>
                <p className="text-gray-600 text-sm">Informasikan kebutuhan khusus (dietary, accessibility, dll)</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Ask Questions</h4>
                <p className="text-gray-600 text-sm">Jangan ragu bertanya apapun sebelum dan selama tour</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;