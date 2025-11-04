'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight, Shield, Award } from 'lucide-react';

interface BannerSlide {
  imgSrc: string;
  alt: string;
  subheading: string;
  heading: string;
  btnText: string;
  link: string;
}

interface BannerCarouselProps {
  slides: BannerSlide[];
}

export default function BannerCarousel({ slides }: BannerCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  if (!slides || slides.length === 0) {
    return null;
  }

  const currentSlideData = slides[currentSlide];

  // Parse heading into primary and secondary parts
  const headingParts = currentSlideData.heading.split(' ');
  const primaryPart = headingParts.slice(0, Math.floor(headingParts.length / 2)).join(' ');
  const secondaryPart = headingParts.slice(Math.floor(headingParts.length / 2)).join(' ');

  return (
    <section className="relative w-full h-[50vh] sm:h-[55vh] md:h-[60vh] lg:aspect-video flex items-center justify-center overflow-hidden bg-transparent">
      {/* Background Layer - Blurred Fill */}
      <div 
        className="absolute inset-0 scale-110 blur-sm transition-opacity duration-1000"
        style={{
          backgroundImage: `url('${currentSlideData.imgSrc}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Main Image - Full Display */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          <Image
            src={currentSlideData.imgSrc}
            alt={currentSlideData.alt || 'Hero Banner'}
            fill
            className="object-contain transition-opacity duration-1000"
            priority
            quality={90}
          />
        </div>
      </div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Navigation Arrows - Only show if more than 1 slide */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all duration-200 hidden sm:flex items-center justify-center"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all duration-200 hidden sm:flex items-center justify-center"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </>
      )}
      
      {/* Text Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white py-6 sm:py-8 hidden sm:block">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3 sm:mb-4 px-2">
          {currentSlideData.subheading && (
            <span className="block text-sm sm:text-base md:text-lg lg:text-xl lg:text-2xl font-normal opacity-95 mb-2 sm:mb-3">
              {currentSlideData.subheading}
            </span>
          )}
          <span className="inline">{primaryPart} </span>
          <span className="inline text-primary-lighter">{secondaryPart}</span>
        </h1>
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mt-4 sm:mt-6 px-2">
          {currentSlideData.btnText && currentSlideData.link && (
            <Link
              href={currentSlideData.link}
              className="inline-flex items-center justify-center gap-2 font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base bg-primary text-white hover:bg-primary-dark"
            >
              <Shield size={16} className="sm:w-[18px] sm:h-[18px]" />
              {currentSlideData.btnText}
              <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
            </Link>
          )}
        </div>
      </div>

      {/* Slide Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 bg-white'
                  : 'w-2 bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

