// src/components/Rekomendasi.tsx

import React, { useState } from "react";

// Definisikan tipe data untuk rekomendasi agar lebih aman
interface Recommendation {
  Place_Name: string;
  Description: string;
  Category: string;
  Price: number;
  Rating: number;
  City: string;
}

const Rekomendasi = () => {
  const [placeName, setPlaceName] = useState("");
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlaceName(event.target.value);
  };

  const getRecommendations = async () => {
    if (!placeName) {
      setError("Silakan masukkan nama tempat wisata.");
      return;
    }

    setIsLoading(true);
    setError("");
    setRecommendations([]);

    try {
      // Kirim request ke backend Flask
      const response = await fetch("http://127.0.0.1:5000/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ place_name: placeName }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Terjadi kesalahan pada server.");
      }

      const data: Recommendation[] = await response.json();
      setRecommendations(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan yang tidak diketahui.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="rekomendasi" className="p-8">
      <h2 className="text-3xl font-bold text-center mb-6">
        Dapatkan Rekomendasi Wisata
      </h2>
      <div className="max-w-xl mx-auto flex gap-2">
        <input
          type="text"
          value={placeName}
          onChange={handleInputChange}
          placeholder="Contoh: Candi Borobudur"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={getRecommendations}
          disabled={isLoading}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isLoading ? "Mencari..." : "Cari"}
        </button>
      </div>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((rec, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-lg">
            <h3 className="text-xl font-semibold mb-2">{rec.Place_Name}</h3>
            <p className="text-gray-600 mb-2">
              {rec.Description.substring(0, 100)}...
            </p>
            <div className="text-sm">
              <p>
                <strong>Kategori:</strong> {rec.Category}
              </p>
              <p>
                <strong>Kota:</strong> {rec.City}
              </p>
              <p>
                <strong>Harga:</strong> Rp{rec.Price.toLocaleString("id-ID")}
              </p>
              <p>
                <strong>Rating:</strong> {rec.Rating} / 5
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Rekomendasi;
