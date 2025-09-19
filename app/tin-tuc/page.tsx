import { getAllNews } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowRight, Tag, Search, TrendingUp } from 'lucide-react';

export default async function TinTucPage() {
  // CORRECTED: Import path and function name
  const news = await getAllNews();

  // Handle case where news might be empty
  const featuredPost = news.length > 0 ? news[0] : null;
  const recentPosts = news.length > 1 ? news.slice(1, 4) : [];
  const allPosts = news.length > 4 ? news.slice(4) : [];

  // NOTE: Categories and Tags are hardcoded for now as they are not in the data model.
  const categories = [
    { name: 'Hướng dẫn Visa', count: 15 },
    { name: 'Tin tức', count: 23 },
    { name: 'Kinh nghiệm', count: 18 },
    { name: 'Du lịch', count: 12 },
    { name: 'Định cư', count: 8 },
  ];

  const tags = ['Visa Mỹ', 'Visa Canada', 'Visa Úc', 'Visa Châu Âu', 'Du lịch', 'Định cư', 'Hướng dẫn'];

  return (
    <main>
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Tin Tức & Cẩm Nang Visa</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Cập nhật những thông tin mới nhất và hướng dẫn chi tiết về visa
            </p>
          </div>
          <div className="max-w-lg mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                className="w-full px-4 py-3 pr-12 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-orange-500 hover:bg-orange-600 rounded-full text-white">
                <Search size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {featuredPost && (
              <div className="mb-16">
                <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <TrendingUp size={16} />
                  Bài viết nổi bật
                </div>
                <article className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="aspect-video overflow-hidden">
                    {/* CORRECTED: Use avatarUrl */}
                    <Image 
                      src={featuredPost.avatarUrl} 
                      alt={featuredPost.title}
                      width={800}
                      height={450}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        {featuredPost.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <User size={16} />
                        {featuredPost.author}
                      </div>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors">
                      <Link href={`/tin-tuc/${featuredPost.slug}`}>
                        {featuredPost.title}
                      </Link>
                    </h2>
                    <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center justify-end">
                      {/* REMOVED: featuredPost.category does not exist */}
                      <Link 
                        href={`/tin-tuc/${featuredPost.slug}`}
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors font-semibold"
                      >
                        Đọc tiếp
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </article>
              </div>
            )}

            {recentPosts.length > 0 && (
              <div className="mb-16">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Bài viết gần đây</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {recentPosts.map((post) => (
                    <article key={post.slug} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className="aspect-video overflow-hidden">
                        {/* CORRECTED: Use avatarUrl */}
                        <Image 
                          src={post.avatarUrl} 
                          alt={post.title}
                          width={400}
                          height={225}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                          <span>{post.date}</span>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                          <Link href={`/tin-tuc/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h4>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <Link 
                          href={`/tin-tuc/${post.slug}`}
                          className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                        >
                          Xem chi tiết
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {allPosts.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Tất cả bài viết</h3>
                <div className="space-y-6">
                  {allPosts.map((post) => (
                    <article key={post.slug} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                      <div className="md:flex">
                        <div className="md:w-1/3">
                          <div className="aspect-video md:aspect-square overflow-hidden">
                            {/* CORRECTED: Use avatarUrl */}
                            <Image 
                              src={post.avatarUrl} 
                              alt={post.title}
                              width={300}
                              height={200}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        </div>
                        <div className="md:w-2/3 p-6">
                          <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>Bởi {post.author}</span>
                          </div>
                          <h4 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                            <Link href={`/tin-tuc/${post.slug}`}>
                              {post.title}
                            </Link>
                          </h4>
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-end">
                            {/* REMOVED: post.category does not exist */}
                            <Link 
                              href={`/tin-tuc/${post.slug}`}
                              className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                            >
                              Đọc tiếp →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-6">Danh mục</h4>
              <div className="space-y-3">
                {categories.map((category, index) => (
                  <Link 
                    key={index}
                    href={`/tin-tuc?category=${category.name.toLowerCase()}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </span>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                      {category.count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-6">Tags phổ biến</h4>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Link 
                    key={index}
                    href={`/tin-tuc?tag=${tag.toLowerCase()}`}
                    className="bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-sm hover:bg-blue-100 hover:text-blue-600 transition-colors"
                  >
                    <Tag size={12} className="inline mr-1" />
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {news.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-6">Bài viết mới nhất</h4>
                <div className="space-y-4">
                  {news.slice(0, 4).map((post) => (
                    <Link 
                      key={post.slug}
                      href={`/tin-tuc/${post.slug}`}
                      className="block group"
                    >
                      <div className="flex gap-3">
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          {/* CORRECTED: Use avatarUrl */}
                          <Image 
                            src={post.avatarUrl} 
                            alt={post.title}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors mb-1">
                            {post.title}
                          </h5>
                          <p className="text-xs text-gray-500">
                            {post.date}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
