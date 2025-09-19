'use client'

import { useSearchBox } from 'react-instantsearch';
import { Search } from 'lucide-react';

export function CustomSearchBox(props: any) {
  const { query, refine } = useSearchBox(props);

  return (
    <div className="relative">
      <input
        type="search"
        value={query}
        onChange={(e) => refine(e.currentTarget.value)}
        placeholder={props.placeholder || "Tìm kiếm..."}
        onFocus={props.onFocus}
        className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
}
