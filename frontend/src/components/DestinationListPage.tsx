// components/DestinationListPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DestinationApiService } from '../services/destinationApi';
import { Destination } from '../types/destination';
import DestinationList from './DestinationList';
import Navbar from './Navbar';

const DestinationListPage = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch destinations from API - sementara hanya dengan page number
      const data = await DestinationApiService.fetchDestinations(currentPage);
      
      // Handle berbagai format response yang mungkin
      let destinationsList: Destination[] = [];
      let calculatedTotalPages = 1;
      
      if (Array.isArray(data)) {
        // Jika data adalah array langsung
        destinationsList = data as Destination[];
        
        // Filter berdasarkan search term dan category jika ada
        if (searchTerm) {
          destinationsList = destinationsList.filter(dest =>
            dest.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dest.description?.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        
        if (selectedCategory) {
          destinationsList = destinationsList.filter(dest =>
            dest.category === selectedCategory
          );
        }
        
        // Hitung total pages berdasarkan hasil filter
        calculatedTotalPages = Math.ceil(destinationsList.length / 10);
      } else if (data && typeof data === 'object') {
        // Jika data adalah object dengan properti
        const apiResponse = data as any;
        
        if (apiResponse.destinations && Array.isArray(apiResponse.destinations)) {
          destinationsList = apiResponse.destinations;
        } else if (apiResponse.data && Array.isArray(apiResponse.data)) {
          destinationsList = apiResponse.data;
        }
        
        // Ambil totalPages jika ada
        if (apiResponse.totalPages) {
          calculatedTotalPages = apiResponse.totalPages;
        } else if (apiResponse.total) {
          calculatedTotalPages = Math.ceil(apiResponse.total / 10);
        } else {
          calculatedTotalPages = Math.ceil(destinationsList.length / 10);
        }
        
        // Filter berdasarkan search term dan category jika API tidak support
        if (searchTerm) {
          destinationsList = destinationsList.filter(dest =>
            dest.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dest.description?.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        
        if (selectedCategory) {
          destinationsList = destinationsList.filter(dest =>
            dest.category === selectedCategory
          );
        }
      }
      
      setDestinations(destinationsList);
      setTotalPages(Math.max(1, calculatedTotalPages));
      
    } catch (err) {
      console.error('Error fetching destinations:', err);
      setError(err instanceof Error ? err.message : 'Gagal memuat destinasi. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, [currentPage, searchTerm, selectedCategory]);

  const handleViewDetail = (destination: Destination) => {
    navigate(`/destination/${destination.id}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetry = () => {
    fetchDestinations();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Destinasi Wisata Jogja</h1>
          <p className="text-gray-600">Temukan destinasi wisata terbaik di Yogyakarta</p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cari Destinasi
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Masukkan nama destinasi..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Semua Kategori</option>
                <option value="Wisata Alam">Wisata Alam</option>
                <option value="Wisata Budaya">Wisata Budaya</option>
                <option value="Wisata Kuliner">Wisata Kuliner</option>
                <option value="Wisata Religi">Wisata Religi</option>
                <option value="Wisata Belanja">Wisata Belanja</option>
              </select>
            </div>
          </div>
        </div>

        {/* Destination List */}
        <DestinationList
          destinations={destinations}
          loading={loading}
          error={error}
          currentPage={currentPage}
          totalPages={totalPages}
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          onViewDetail={handleViewDetail}
          onPageChange={handlePageChange}
          onRetry={handleRetry}
        />
      </div>
    </div>
  );
};

export default DestinationListPage;