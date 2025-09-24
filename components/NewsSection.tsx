'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { NewsCard } from './NewsCard';
import { useVisaData } from '@/contexts/VisaDataContext';
export default function NewsSection() { // Changed to export default
const { newsPreview} = useVisaData();
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Tin tức & Cẩm nang</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Cập nhật những thông tin mới nhất về chính sách visa, kinh nghiệm du lịch và các mẹo hữu ích cho chuyến đi của bạn.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsPreview.map((post : any) => (
            <NewsCard key={post.id} post={post} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link 
            href="/tin-tuc"
            className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Xem tất cả bài viết
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
