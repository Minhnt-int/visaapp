'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getNewsKeywords } from '@/lib/api';
import { Tag as TagIcon, Loader2, ChevronDown, ChevronUp, FilterX } from 'lucide-react';

type Keyword = {
  name: string;
  count: number;
};

const INITIAL_DISPLAY_COUNT = 10;

export default function TagsFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [allTags, setAllTags] = useState<Keyword[]>([]);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);
  const [isUpdating, setIsUpdating] = useState(false);

  // Effect to fetch all available tags on component mount
  useEffect(() => {
    let isMounted = true;
    
    const fetchTags = async () => {
      try {
        setIsLoading(true);
        const tagsFromServer = await getNewsKeywords();
        
        // Only update state if component is still mounted
        if (isMounted) {
          setAllTags(tagsFromServer);
        }
      } catch (error) {
        console.error("Failed to fetch tags:", error);
        if (isMounted) {
          setAllTags([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    fetchTags();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Effect to sync selectedTags state with URL search params on mount and on param change
  useEffect(() => {
    const keywordFromUrl = searchParams?.get('keyword') ?? null;
    const newSelectedTags = new Set(keywordFromUrl ? keywordFromUrl.split(',') : []);
    setSelectedTags(newSelectedTags);
  }, [searchParams?.toString()]);

  // Memoize displayed tags to avoid unnecessary re-renders
  // Must be called before any early returns (React hooks rules)
  const displayedTags = useMemo(() => {
    return allTags.slice(0, displayCount);
  }, [allTags, displayCount]);

  const handleTagClick = useCallback((tagSlug: string) => {
    // Prevent multiple rapid clicks
    if (isUpdating) return;

    setIsUpdating(true);

    setSelectedTags(prev => {
      const newSelectedTags = new Set(prev);
      if (newSelectedTags.has(tagSlug)) {
        newSelectedTags.delete(tagSlug);
      } else {
        newSelectedTags.add(tagSlug);
      }

      // Update URL in next tick
      setTimeout(() => {
        const newParams = new URLSearchParams(searchParams?.toString() ?? '');
        if (newSelectedTags.size > 0) {
          newParams.set('keyword', Array.from(newSelectedTags).join(','));
        } else {
          newParams.delete('keyword');
        }

        newParams.set('_t', Date.now().toString());
        router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
        setTimeout(() => setIsUpdating(false), 500);
      }, 0);

      return newSelectedTags;
    });
  }, [isUpdating, searchParams, pathname, router]);

  const handleClearFilter = useCallback(() => {
    setSelectedTags(new Set());
    router.push(`${pathname}?_t=${Date.now()}`, { scroll: false });
  }, [pathname, router]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 flex justify-center items-center">
        <Loader2 className="animate-spin text-blue-500" />
      </div>
    );
  }

  // Hide component if no tags available (only after loading is complete)
  if (!allTags || allTags.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-xl font-bold text-gray-900">Lọc theo Tags</h4>
        {selectedTags.size > 0 && (
          <button
            onClick={handleClearFilter}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm bg-red-100 text-red-700 hover:bg-red-200 transition-colors font-semibold border border-red-300">
            <FilterX size={14} />
            Xoá bộ lọc
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {displayedTags.map((tag) => {
          // Use tag.name as-is from server
          const tagSlug = tag.name;
          const isSelected = selectedTags.has(tagSlug);
          return (
            <button
              key={tagSlug}
              onClick={() => handleTagClick(tagSlug)}
              disabled={isUpdating}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm transition-all duration-200 border-2 ${
                isSelected
                  ? 'bg-blue-100 border-blue-500 text-blue-700 font-semibold'
                  : 'bg-gray-100 border-transparent text-gray-700 hover:bg-gray-200 hover:border-gray-300'
              } ${isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
              <TagIcon size={12} />
              {tag.name}
              <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                {tag.count}
              </span>
            </button>
          );
        })}
      </div>
      {allTags.length > displayCount && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setDisplayCount(prev => prev + 10)}
            className="flex items-center gap-2 mx-auto text-blue-600 font-semibold hover:text-blue-800 transition-colors">
            <ChevronDown size={16} />
            Xem thêm tags
          </button>
        </div>
      )}
      {displayCount > INITIAL_DISPLAY_COUNT && (
         <div className="mt-4 text-center">
          <button
            onClick={() => setDisplayCount(INITIAL_DISPLAY_COUNT)}
            className="flex items-center gap-2 mx-auto text-gray-500 font-semibold hover:text-gray-700 transition-colors">
            <ChevronUp size={16} />
            Thu gọn
          </button>
        </div>
      )}
    </div>
  );
}
