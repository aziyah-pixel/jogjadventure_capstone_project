function Explore() {
    const destinations = [
      {
        title: "Candi Prambanan",
        description: "Candi Hindu terbesar di Indonesia.",
        image: "/prambanan.jpg",
      },
      {
        title: "Pantai Parangtritis",
        description: "Pantai legendaris dengan ombak besar.",
        image: "/parangtritis.jpg",
      },
      {
        title: "Taman Sari",
        description: "Istana air peninggalan Keraton.",
        image: "/tamansari.jpg",
      },
    ];
  
    return (
      <section className="py-16 px-6 md:px-12 bg-white text-gray-800">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Explore Wisata</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {destinations.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
  export default Explore;
  