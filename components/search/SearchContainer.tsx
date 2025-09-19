'use client';

import { useSearch } from '@/context/SearchContext';
import { SearchBox, Hits } from './SearchBox'; // Sửa lại import ở đây
import { useState, useRef, useEffect } from 'react';

interface SearchContainerProps {
  className?: string;
  placeholder?: string;
}

export function SearchContainer({ className, placeholder }: SearchContainerProps) {
  const { searchClient, indexName } = useSearch();
  const [isSearchActive, setIsSearchActive] = useState(false);
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

  // Nếu không có client, không render gì cả để tránh lỗi
  if (!searchClient) {
    return null;
  }

  return (
    <div ref={searchContainerRef} className={`relative ${className || ''}`}>
        <SearchBox 
            onFocus={() => setIsSearchActive(true)} 
            placeholder={placeholder} // Truyền placeholder xuống
        />
        {isSearchActive && (
            <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg z-50">
                <Hits hitComponent={({ hit }: { hit: any }) => (
                    <a href={`/visa/${hit.objectID}`} className="block p-4 hover:bg-gray-100">
                        <h3 className="font-semibold">{hit.country}</h3>
                        <p className="text-sm text-gray-600">{hit.description}</p>
                    </a>
                )} />
            </div>
        )}
    </div>
  );
}
