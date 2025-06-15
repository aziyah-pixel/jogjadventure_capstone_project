import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DestinationApiService } from '../services/destinationApi';
import DestinationDetail from './DestinationDetail';
import type { Destination } from '../types/destination'; 

function DestinationDetailPage() {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestinationDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Validasi id
        if (!id) {
          throw new Error('ID destinasi tidak valid');
        }
        
        // Fetch destination detail by ID
        const data = await DestinationApiService.fetchDestinationById(id);
        
        // Transform data untuk memastikan semua field yang dibutuhkan ada
        const transformedDestination: Destination = {
          id: String(data.id || data.place_id), // Convert to string
          place_id: Number(data.place_id || data.id), // Convert to number
          name: data.name || data.place_name,
          place_name: data.place_name || data.name,
          description: data.description || 'Deskripsi tidak tersedia',
          detailedDescription: data.detailedDescription || data.description || 'Deskripsi detail tidak tersedia',
          location: data.location || data.city,
          city: data.city || data.city_new || data.location || 'Yogyakarta',
          city_new: data.city_new || data.city,
          rating: data.rating || data.average_rating || 0,
          average_rating: data.average_rating || data.rating || 0,
          total_reviews: data.total_reviews || 0,
          duration: data.duration || '2-3 jam',
          image: data.image || `https://picsum.photos/800/400?random=${data.id || data.place_id}`,
          images: data.images || [],
          category: data.category || 'Wisata',
          price: data.price || 'Gratis',
          gallery: data.gallery || [],
          facilities: data.facilities || ['Parkir', 'Toilet', 'Musholla'],
          activities: data.activities || ['Foto', 'Jalan-jalan', 'Bersantai'],
          openingHours: data.openingHours || '08:00 - 17:00',
          contact: data.contact || '-',
          website: data.website || undefined, // Change null to undefined
          bestTime: data.bestTime || 'Pagi hingga sore',
          capacity: data.capacity || '100 orang',
          tips: data.tips || ['Datang pagi hari', 'Bawa kamera', 'Pakai alas kaki nyaman'],
          coordinates: data.coordinates || data.coordinate || { 
            lat: parseFloat(data.latitude) || -7.7956, 
            lng: parseFloat(data.longitude) || 110.3695 
          },
          coordinate: data.coordinate || data.coordinates || { 
            lat: parseFloat(data.latitude) || -7.7956, 
            lng: parseFloat(data.longitude) || 110.3695 
          },
          latitude: data.latitude || '-7.7956',
          longitude: data.longitude || '110.3695',
          address: data.address || 'Yogyakarta, Indonesia',
          reviews: data.reviews || []
        };
        
        setDestination(transformedDestination);
      } catch (err) {
        console.error('Error fetching destination detail:', err);
        setError(err instanceof Error ? err.message : 'Gagal memuat detail destinasi. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDestinationDetail();
    } else {
      setError('ID destinasi tidak ditemukan');
      setLoading(false);
    }
  }, [id]);

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Memuat detail destinasi...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !destination) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="mb-4">
            <svg className="w-16 h-16 mx-auto text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Destinasi Tidak Ditemukan</h3>
            <p className="text-gray-600 mb-4">{error || 'Destinasi yang Anda cari tidak ditemukan.'}</p>
          </div>
          <div className="space-y-3">
            <button 
              onClick={handleBack}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Kembali
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="block mx-auto px-6 py-2 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <DestinationDetail 
      destination={destination} 
      onBack={handleBack}
      loading={false}
    />
  );
}

export default DestinationDetailPage;