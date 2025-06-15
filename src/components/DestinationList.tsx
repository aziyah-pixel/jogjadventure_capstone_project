// components/DestinationList.tsx
import React from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { Destination } from '../../backend/types/destination';
import DestinationCard from './DestinationCard';

interface DestinationListProps {
  destinations: Destination[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  searchTerm: string;
  selectedCategory: string;
  onViewDetail: (destination: Destination) => void;
  onPageChange: (page: number) => void;
  onRetry: () => void;
}

const DestinationList: React.FC<DestinationListProps> = ({
  destinations,
  loading,
  error,
  currentPage,
  totalPages,
  onViewDetail,
  onPageChange,
  onRetry
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Memuat destinasi...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <div className="flex items-center">
          <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
          <h3 className="text-lg font-semibold text-red-800">Terjadi Kesalahan</h3>
        </div>
        <p className="text-red-700 mt-2">{error}</p>
        <button 
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  if (destinations.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">Destinasi tidak ditemukan</h3>
        <p className="text-gray-500">Coba ubah kata kunci pencarian atau kategori</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map(destination => (
          <DestinationCard
            key={destination.id}
            destination={destination}
            onViewDetail={onViewDetail}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-12 space-x-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNum = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
            if (pageNum > totalPages) return null;
            
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`px-4 py-2 text-sm font-medium rounded-lg ${
                  currentPage === pageNum
                    ? 'text-white bg-blue-600'
                    : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default DestinationList;