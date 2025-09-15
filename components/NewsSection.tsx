
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { NewsCard } from './NewsCard';

const newsData = [
  {
    id: 1,
    slug: 'bi-quyet-xin-visa-du-lich-my-thanh-cong',
    imageUrl: '/images/news/news-1.jpg',
    title: 'Bí quyết xin visa du lịch Mỹ thành công 99%',
    category: 'Visa Mỹ',
    excerpt: 'Khám phá những bí quyết và kinh nghiệm thực tế để chuẩn bị hồ sơ và phỏng vấn xin visa du lịch Mỹ một cách hiệu quả nhất.',
    author: 'Văn phòng visa',
    date: '15/07/2024',
    readTime: '6 phút đọc',
  },
  {
    id: 2,
    slug: 'nhung-thay-doi-moi-nhat-ve-chinh-sach-visa-schengen-2024',
    imageUrl: '/images/news/news-2.jpg',
    title: 'Những thay đổi mới nhất về chính sách visa Schengen 2024',
    category: 'Visa Châu Âu',
    excerpt: 'Cập nhật các quy định mới, lệ phí và yêu cầu về hồ sơ khi xin visa Schengen để bạn có sự chuẩn bị tốt nhất cho chuyến đi châu Âu.',
    author: 'Chuyên gia di trú',
    date: '12/07/2024',
    readTime: '4 phút đọc',
  },
  {
    id: 3,
    slug: 'kinh-nghiem-du-lich-bui-han-quoc-khong-can-visa',
    imageUrl: '/images/news/news-3.jpg',
    title: 'Kinh nghiệm "săn" vé máy bay giá rẻ đi Canada',
    category: 'Visa Canada',
    excerpt: 'Tổng hợp các mẹo và công cụ hữu ích giúp bạn tìm kiếm và đặt vé máy bay đi Canada với chi phí tiết kiệm nhất.',
    author: 'Travel Blogger',
    date: '10/07/2024',
    readTime: '5 phút đọc',
  },
];

export default function NewsSection() { // Changed to export default
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
          {newsData.map((post) => (
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
