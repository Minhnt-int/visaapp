'use client';

import { Suspense } from 'react';
import TagsFilter from './TagsFilter';
import { Loader2 } from 'lucide-react';

export default function TagsFilterWrapper() {
  return (
    <Suspense fallback={
      <div className="bg-white rounded-xl shadow-lg p-6 flex justify-center items-center">
        <Loader2 className="animate-spin text-blue-500" />
      </div>
    }>
      <TagsFilter />
    </Suspense>
  );
}
