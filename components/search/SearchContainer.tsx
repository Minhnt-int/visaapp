'use client';

import { useState, useRef, useEffect } from 'react';
import { useSearchBox, useHits } from 'react-instantsearch';
import Link from 'next/link';
import { useSearchSafe } from '@/context/SearchContext';

interface SearchContainerProps {
  className?: string;
  placeholder?: string;
}

function SearchWithAlgolia({ className, placeholder }: SearchContainerProps) {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [hoveredHit, setHoveredHit] = useState<any>(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const hoveredElRef = useRef<HTMLElement | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const { query, refine } = useSearchBox({});
  const { hits } = useHits({});

  // Đóng kết quả khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchContainerRef]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/tin-tuc?search=${encodeURIComponent(query.trim())}`;
    }
  };

  // Hiển thị kết quả khi focus vào input (kể cả khi chưa có query)
  const showResults = isSearchActive;

  const updatePopupFromRect = (rect: DOMRect) => {
    // For position: fixed, use viewport coordinates (no scroll offsets)
    const popupWidth = 320; // w-80
    const margin = 8;
    const top = rect.bottom + margin;
    // Clamp left within viewport
    const maxLeft = window.innerWidth - popupWidth - margin;
    const left = Math.max(margin, Math.min(rect.left, maxLeft));
    setPopupPosition({ top, left });
  };

  const handleMouseEnter = (hit: any, event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget as HTMLElement;
    hoveredElRef.current = target;
    const rect = target.getBoundingClientRect();
    setHoveredHit(hit);
    updatePopupFromRect(rect);
  };

  const handleMouseLeave = () => {
    setHoveredHit(null);
    hoveredElRef.current = null;
  };

  // Recalculate popup position on scroll/resize while hovering
  useEffect(() => {
    if (!hoveredHit) return;
    const handler = () => {
      if (hoveredElRef.current) {
        updatePopupFromRect(hoveredElRef.current.getBoundingClientRect());
      }
    };
    window.addEventListener('scroll', handler, true);
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('scroll', handler, true);
      window.removeEventListener('resize', handler);
    };
  }, [hoveredHit]);

  return (
    <div ref={searchContainerRef} className={`relative ${className || ''}`}>
        <form onSubmit={handleSearch} className="relative">
            <input
                type="text"
                placeholder={placeholder || "Tìm kiếm..."}
                value={query}
                onChange={(e) => refine(e.target.value)}
                onFocus={() => setIsSearchActive(true)}
                className="w-full px-4 py-3 pr-12 rounded-full text-gray-900 placeholder-gray-500 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors"
            />
            <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-orange-500 hover:bg-orange-600 rounded-full text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>
        </form>

        {/* Kết quả tìm kiếm dropdown */}
        {showResults && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-lg max-h-96 overflow-y-auto z-50">
            <div className="p-2">
              {hits.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  Không tìm thấy kết quả nào
                </div>
              ) : (
                hits.map((hit: any) => {
                  const href = hit.slug || hit.path || '#';
                  const title = hit.name || hit.title || 'Untitled';
                  const type = hit.type || 'Item';
                  
                  return (
                    <div
                      key={hit.objectID}
                      className="group relative"
                      onMouseEnter={(e) => handleMouseEnter(hit, e)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Link
                        href={href}
                        className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => setIsSearchActive(false)}
                      >
                        <div className="flex items-center gap-3">
                          {hit.image && (
                            <img
                              src={hit.image}
                              alt={title}
                              className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-gray-900 truncate">{title}</div>
                            <div className="text-sm text-gray-500">{type}</div>
                            {hit.category && (
                              <div className="text-xs text-blue-600 mt-1">{hit.category}</div>
                            )}
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Popup tooltip với chi tiết item */}
        {hoveredHit && (
          <div
            ref={popupRef}
            className="fixed z-[60] w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden pointer-events-none"
            style={{
              top: `${popupPosition.top - 20}px`,
              left: `${popupPosition.left + 120}px`,
              animation: 'fadeIn 0.2s ease-out'
            }}
          >
            {/* Image */}
            {hoveredHit.image && (
              <div className="relative w-full h-48 bg-gray-100">
                <img
                  src={hoveredHit.image}
                  alt={hoveredHit.name || hoveredHit.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            )}

            {/* Content */}
            <div className="p-4 space-y-3">
              {/* Title & Type */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                  {hoveredHit.name || hoveredHit.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                    {hoveredHit.type || 'Item'}
                  </span>
                </div>
              </div>

              {/* Country/Continent */}
              {(hoveredHit.country || hoveredHit.continent) && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{hoveredHit.country || hoveredHit.continent}</span>
                </div>
              )}

              {/* Category */}
              {hoveredHit.category && (
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <span>{hoveredHit.category}</span>
                </div>
              )}

              {/* Description */}
              {hoveredHit.description && (
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {hoveredHit.description}
                  </p>
                </div>
              )}

              {/* Tags */}
              {hoveredHit.tags && hoveredHit.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100">
                  {hoveredHit.tags.slice(0, 3).map((tag: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
    </div>
  );
}

function SearchWithoutAlgolia({ className, placeholder }: SearchContainerProps) {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Đóng kết quả khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchContainerRef]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/tin-tuc?search=${encodeURIComponent(searchTerm.trim())}`;
    }
  };

  return (
    <div ref={searchContainerRef} className={`relative ${className || ''}`}>
        <form onSubmit={handleSearch} className="relative">
            <input
                type="text"
                placeholder={placeholder || "Tìm kiếm..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchActive(true)}
                className="w-full px-4 py-3 pr-12 rounded-full text-gray-900 placeholder-gray-500 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors"
            />
            <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-orange-500 hover:bg-orange-600 rounded-full text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>
        </form>
    </div>
  );
}

export function SearchContainer(props: SearchContainerProps) {
  // Safely check if we're inside SearchProvider
  const context = useSearchSafe();
  
  // If we have context with searchClient and indexName, use Algolia
  if (context && context.searchClient && context.indexName) {
    return <SearchWithAlgolia {...props} />;
  }
  
  // Otherwise, render without Algolia
  return <SearchWithoutAlgolia {...props} />;
}
