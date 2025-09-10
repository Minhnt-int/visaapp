'use client';

import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Đang tải dữ liệu visa</h2>
        <p className="text-gray-600">Vui lòng đợi trong giây lát...</p>
      </div>
    </div>
  );
}
