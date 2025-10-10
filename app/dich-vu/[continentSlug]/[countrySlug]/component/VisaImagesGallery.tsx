'use client';

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
// CORRECTED: The unused VisaImage type is removed.
import { ProductMedia } from "@/types";

interface VisaImagesGalleryProps {
  // CORRECTED: The prop name is updated for clarity.
  media: ProductMedia[];
  countryName: string;
}

// CORRECTED: The component is updated to use the new prop name.
export function VisaImagesGallery({ media, countryName }: VisaImagesGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      // CORRECTED: Use 'media.length' instead of 'visaImages.length'
      setSelectedImage((selectedImage + 1) % media.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      // CORRECTED: Use 'media.length' instead of 'visaImages.length'
      setSelectedImage(selectedImage === 0 ? media.length - 1 : selectedImage - 1);
    }
  };

  // CORRECTED: Check for 'media' prop.
  if (!media || media.length === 0) {
    return null;
  }

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Hình ảnh Visa {countryName}
      </h2>
      
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {media.map((image, index) => (
          <div 
            key={image.id} // Use a unique ID for the key
            className="group relative bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-blue-300 transition-colors cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <div className="aspect-[4/3] relative">
              <Image
                src={image.url}
                // CORRECTED: Use 'altText' or 'name' for the alt attribute.
                alt={image.altText || image.name || `Visa Image ${index + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                    <Eye className="w-6 h-6 text-gray-700" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              {/* CORRECTED: Use the 'name' property for the title. */}
              <h3 className="font-semibold text-gray-900 mb-2 text-center">{image.name || image.type}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 rounded-full p-2 text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation buttons */}
            {media.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-2 text-white transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-2 text-white transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image */}
            <div className="relative aspect-[4/3] w-full max-w-2xl">
              <Image
                src={media[selectedImage].url}
                // CORRECTED: Use 'altText' or 'name' for alt text
                alt={media[selectedImage].altText || media[selectedImage].name || 'Visa Image'}
                fill
                className="object-contain"
              />
            </div>

            {/* Image info */}
            <div className="mt-4 text-center">
              <h3 className="text-xl font-semibold text-white mb-2">
                {/* CORRECTED: Use the 'name' property. */}
                {media[selectedImage].name || media[selectedImage].type}
              </h3>
              <p className="text-gray-300">
                {/* CORRECTED: Use 'altText' instead of 'description'. */}
                {media[selectedImage].altText}
              </p>
              <div className="mt-2 text-gray-400 text-sm">
                {selectedImage + 1} / {media.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
