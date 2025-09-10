"use client";

import { blogPosts } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, Clock, ArrowRight, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function NewsSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = ['all', 'Visa Hàn Quốc', 'Visa Châu Âu', 'Visa Châu Á', 'Hướng dẫn'];
  
  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts.slice(0, 6)
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header - Visana Style */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-blue-100">
            <TrendingUp size={16} />
            Tin Tức & Kiến Thức
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Cập nhật <span className="text-blue-600">thông tin mới nhất</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Khám phá những bài viết hữu ích về visa, kinh nghiệm du lịch và hướng dẫn chi tiết
          </p>
        </div>

        {/* Category Filter - Clean Style */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              {category === 'all' ? 'Tất cả' : category}
            </button>
          ))}
        </div>

        {/* Articles Grid - Visana Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredPosts.slice(0, 6).map((post) => (
            <article 
              key={post.id} 
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group overflow-hidden"
            >
              <Link href={`/tin-tuc/${post.slug}`} className="block">
                <div className="relative h-48 overflow-hidden rounded-t-2xl">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
              </Link>

              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  <Link href={`/tin-tuc/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <User size={12} />
                    <span>{post.author}</span>
                  </div>
                  <Link 
                    href={`/tin-tuc/${post.slug}`}
                    className="flex items-center gap-1 text-blue-600 font-medium text-sm hover:gap-2 transition-all duration-300"
                  >
                    Đọc tiếp
                    <ArrowRight size={12} />
                  </Link>
                </div>

                {/* Tags */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button - Visana Style */}
        <div className="text-center">
          <Link 
            href="/tin-tuc"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <span>Xem Tất Cả Tin Tức</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
