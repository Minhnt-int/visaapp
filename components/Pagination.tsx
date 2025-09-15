'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PaginationProps {
  totalPages: number
  basePath: string
}

export function Pagination({ totalPages, basePath }: PaginationProps) {
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams?.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams ?? undefined);
    params.set('page', pageNumber.toString());
    return `${basePath}?${params.toString()}`;
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav className="flex items-center justify-center gap-4 py-12">
      <Link
        href={createPageURL(currentPage - 1)}
        className={cn(
          "inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors",
          currentPage <= 1 ? "pointer-events-none text-gray-400" : "hover:bg-gray-100 dark:hover:bg-gray-800"
        )}
      >
        <ChevronLeft size={16} />
        <span>Previous</span>
      </Link>

      <div className="hidden items-center gap-2 md:flex">
        {pages.map((page) => (
          <Link
            key={page}
            href={createPageURL(page)}
            className={cn(
              "rounded-md px-4 py-2 text-sm font-medium transition-colors",
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
          "inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors",
          currentPage >= totalPages ? "pointer-events-none text-gray-400" : "hover:bg-gray-100 dark:hover:bg-gray-800"
        )}
      >
        <span>Next</span>
        <ChevronRight size={16} />
      </Link>
    </nav>
  )
}
