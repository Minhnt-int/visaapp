"use client";

import { blogPosts } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, Clock, ArrowRight, Tag, Newspaper } from "lucide-react";
import { useState } from "react";

export default function NewsSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = ['all', 'Visa Hàn Quốc', 'Visa Châu Âu', 'Visa Châu Á', 'Hướng dẫn'];
  
  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts.slice(0, 6)
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Newspaper size={16} />
            Tin Tức Mới Nhất
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Tin Tức & <span className="text-orange-500">Cẩm Nang Visa</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cập nhật những thông tin mới nhất về visa, kinh nghiệm và hướng dẫn hữu ích từ các chuyên gia
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-600'
              }`}
            >
              {category === 'all' ? 'Tất cả' : category}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredPosts.slice(0, 6).map((post) => (
            <article 
              key={post.id} 
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group overflow-hidden"
            >
              <Link href={`/tin-tuc/${post.slug}`} className="block">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>
              </Link>

              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors overflow-hidden"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}>
                  <Link href={`/tin-tuc/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                <p className="text-gray-600 mb-4 overflow-hidden"
                   style={{
                     display: '-webkit-box',
                     WebkitLineClamp: 3,
                     WebkitBoxOrient: 'vertical'
                   }}>
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <User size={14} />
                    <span>{post.author}</span>
                  </div>
                  <Link 
                    href={`/tin-tuc/${post.slug}`}
                    className="flex items-center gap-1 text-blue-600 font-medium text-sm hover:gap-2 transition-all duration-300"
                  >
                    Đọc tiếp
                    <ArrowRight size={14} />
                  </Link>
                </div>

                {/* Tags */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link 
            href="/tin-tuc"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <span>Xem Tất Cả Bài Viết</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
