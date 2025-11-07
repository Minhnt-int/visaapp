'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ContinentPaginationProps {
  totalPages: number
  continentSlug: string
  currentPage: number
}

export function ContinentPagination({ totalPages, continentSlug, currentPage }: ContinentPaginationProps) {
  const searchParams = useSearchParams()

  // Tạo URL với pagination cho continent này, giữ nguyên các params khác
  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams?.toString() ?? '');
    const paramKey = `${continentSlug.replace('visa-', '')}-page`;
    
    if (pageNumber === 1) {
      // Nếu page 1 thì xóa param để URL gọn hơn
      params.delete(paramKey);
    } else {
      params.set(paramKey, pageNumber.toString());
    }
    
    // Hash ở cuối để scroll đến section
    const queryString = params.toString();
    return `/dich-vu${queryString ? `?${queryString}` : ''}#${continentSlug}`;
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  // Không hiển thị pagination nếu chỉ có 1 trang
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center justify-center gap-2 mt-8">
      <Link
        href={createPageURL(currentPage - 1)}
        className={cn(
          "inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
          currentPage <= 1 ? "pointer-events-none text-gray-400" : "hover:bg-gray-100 dark:hover:bg-gray-800"
        )}
      >
        <ChevronLeft size={16} />
        <span className="hidden sm:inline">Trước</span>
      </Link>

      <div className="hidden items-center gap-1 md:flex">
        {pages.map((page) => (
          <Link
            key={page}
            href={createPageURL(page)}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              currentPage === page ? "bg-gray-900 text-white dark:bg-gray-50 dark:text-gray-900" : "hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
          >
            {page}
          </Link>
        ))}
      </div>

      <Link
        href={createPageURL(currentPage + 1)}
        className={cn(
          "inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
          currentPage >= totalPages ? "pointer-events-none text-gray-400" : "hover:bg-gray-100 dark:hover:bg-gray-800"
        )}
      >
        <span className="hidden sm:inline">Sau</span>
        <ChevronRight size={16} />
      </Link>
    </nav>
  )
}

