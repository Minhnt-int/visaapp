import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RelatedArticle } from '@/types';
import { ArrowRight } from 'lucide-react';

interface RelatedArticlesSectionProps {
  articles: RelatedArticle[];
}

export default function RelatedArticlesSection({ articles }: RelatedArticlesSectionProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Bài viết liên quan
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <Link 
            key={article.id} 
            href={article.url} 
            className="group block bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden"
          >
            <div className="relative h-48 w-full">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                {article.title}
              </h3>
              <div className="flex items-center text-blue-600 font-medium text-sm">
                Đọc thêm <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
