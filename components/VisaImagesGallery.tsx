'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

interface VisaImage {
  type: string;
  url: string;
  description: string;
  alt?: string;
}

interface VisaImagesGalleryProps {
  visaImages: VisaImage[];
  countryName: string;
}

export default function VisaImagesGallery({ visaImages, countryName }: VisaImagesGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % visaImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? visaImages.length - 1 : selectedImage - 1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedImage !== null) {
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') setSelectedImage(null);
    }
  };

  // Add event listener for keyboard navigation
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeyDown as any);
  }

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
        Mẫu Visa {countryName}
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Các mẫu visa thật được cấp cho khách hàng của VISA5S
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visaImages.map((image, index) => (
          <div
            key={index}
            className="relative group cursor-pointer bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            onClick={() => setSelectedImage(index)}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={image.url}
                alt={image.alt || image.type}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
                <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{image.type}</h3>
              <p className="text-sm text-gray-600">{image.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation Buttons */}
            {visaImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </>
            )}

            {/* Image */}
            <div className="relative max-h-[80vh] aspect-[4/3]">
              <Image
                src={visaImages[selectedImage].url}
                alt={visaImages[selectedImage].alt || visaImages[selectedImage].type}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            {/* Image Info */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="bg-black bg-opacity-50 rounded-lg p-4">
                <h3 className="font-bold text-lg mb-2">{visaImages[selectedImage].type}</h3>
                <p className="text-sm opacity-90">{visaImages[selectedImage].description}</p>
                <p className="text-xs opacity-70 mt-2">
                  {selectedImage + 1} / {visaImages.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
