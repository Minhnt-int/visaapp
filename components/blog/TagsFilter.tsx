'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getNewsKeywords, normalizeVietnamese } from '@/lib/api';
import { Tag as TagIcon, Loader2, ChevronDown, ChevronUp, FilterX } from 'lucide-react';

// Note: normalizeVietnamese is imported but used in the fetch effect to normalize server tags

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
    const fetchTags = async () => {
      try {
        setIsLoading(true);
        const tagsFromServer = await getNewsKeywords();
        // Normalize tag names to ensure consistency with URL parameters
        const normalizedTags = tagsFromServer.map(tag => ({
          ...tag,
          name: normalizeVietnamese(tag.name)
        }));
        setAllTags(normalizedTags);
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTags();
  }, []);

  // Effect to sync selectedTags state with URL search params on mount and on param change
  useEffect(() => {
    const keywordFromUrl = searchParams.get('keyword');
    const newSelectedTags = new Set(keywordFromUrl ? keywordFromUrl.split(',') : []);
    setSelectedTags(newSelectedTags);
  }, [searchParams]);

  const handleTagClick = (tagSlug: string) => {
    // Prevent multiple rapid clicks
    if (isUpdating) return;

    setIsUpdating(true);

    const newSelectedTags = new Set(selectedTags);
    if (newSelectedTags.has(tagSlug)) {
      newSelectedTags.delete(tagSlug);
    } else {
      newSelectedTags.add(tagSlug);
    }

    // Update local state immediately for UI feedback
    setSelectedTags(newSelectedTags);

    // Create a new URLSearchParams object to manage the query string
    const newParams = new URLSearchParams(searchParams.toString());
    if (newSelectedTags.size > 0) {
      newParams.set('keyword', Array.from(newSelectedTags).join(','));
    } else {
      newParams.delete('keyword');
    }

    // Add timestamp to force cache refresh
    newParams.set('_t', Date.now().toString());

    // Use router.push to navigate to the new URL, triggering a re-render of the page component
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });

    // Reset updating flag after a short delay
    setTimeout(() => setIsUpdating(false), 500);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 flex justify-center items-center">
        <Loader2 className="animate-spin text-blue-500" />
      </div>
    );
  }

  const handleClearFilter = () => {
    setSelectedTags(new Set());
    // Add timestamp to force cache refresh
    router.push(`${pathname}?_t=${Date.now()}`, { scroll: false });
  };

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
        {allTags.slice(0, displayCount).map((tag) => {
          // tag.name is already normalized from the fetch
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
