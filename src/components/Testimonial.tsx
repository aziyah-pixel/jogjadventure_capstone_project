
function Testimonial() {

    return (
      <>
       
        {/* Testimoni */}
        <section className="bg-white py-16 px-4 text-center">
          <h2 className="text-2xl font-bold text-secondary mb-4">
            Testimoni Jogjadventure
          </h2>
          <div className="max-w-2xl mx-auto bg-gray-100 p-6 rounded-xl shadow">
            <p className="text-gray-700 italic mb-4">
              "Pengalaman yang sangat menyenangkan, di tambah pelayannya ramah
              banget, top banget, rekomen buat yang mau cobain!"
            </p>
            <div className="flex items-center justify-center gap-4">
              <img
                src="/user.png"
                alt="User"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-left">
                <p className="font-semibold">Bang Upin</p>
                <span className="text-sm text-gray-500">⭐⭐⭐⭐⭐</span>
              </div>
            </div>
          </div>
        </section>
  
       
      </>
    );
  }
  
  export default Testimonial;
  