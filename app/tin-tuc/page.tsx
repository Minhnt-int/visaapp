import type { Metadata } from 'next';
import { getNewsPreview } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowRight, Search, TrendingUp, FilterX } from 'lucide-react';
import TagsFilter from '@/components/blog/TagsFilter'; // IMPORT the new multi-tag filter component

// REVALIDATION: Ensures the page is re-fetched on every visit, crucial for the new filter system.
export const revalidate = 0;

// SEO OPTIMIZATION: Metadata is now generated based on the selected tags for better SEO.
export async function generateMetadata({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }): Promise<Metadata> {
  const tags = typeof searchParams?.tags === 'string' ? searchParams.tags.split(',') : [];

  let title = 'Tin tức & Cẩm nang Visa - Cập nhật mới nhất';
  let description = 'Cập nhật những tin tức mới nhất về dịch vụ visa, du lịch, định cư và các thông tin, hướng dẫn liên quan.';
  
  if (tags.length > 0) {
    const formattedTags = tags.map(t => t.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())).join(', ');
    title = `Bài viết về ${formattedTags} - Tin tức Visa`;
    description = `Khám phá các bài viết, tin tức và hướng dẫn chuyên sâu về các chủ đề: ${formattedTags}.`;
  }

  const siteUrl = '/tin-tuc';
  const ogImage = 'https://YOUR_DOMAIN/images/og-news.png';
  const canonicalUrl = tags.length > 0 ? `${siteUrl}?tags=${tags.join(',')}`: siteUrl;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: { title, description, url: canonicalUrl, siteName: 'VISA5S', images: [{ url: ogImage, width: 1200, height: 630, alt: title }], type: 'website' },
    twitter: { card: 'summary_large_image', title, description, images: [ogImage] },
  };
}

export default async function TinTucPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined }}) {
  const tags = typeof searchParams?.tags === 'string' ? searchParams.tags : undefined;

  // API call now uses the 'tags' parameter for multi-filtering
  const news = await getNewsPreview({ tags }); 
  const newsData = news.data;

  const featuredPost = newsData.length > 0 ? newsData[0] : null;
  const recentPosts = newsData.length > 1 ? newsData.slice(1, 4) : [];

  const currentFilters = tags ? tags.split(',') : [];

  return (
    <main>
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Tin Tức & Cẩm Nang Visa</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">Cập nhật những thông tin mới nhất và hướng dẫn chi tiết về visa</p>
          </div>
          <div className="max-w-lg mx-auto">
            <div className="relative">
              <input type="text" placeholder="Tìm kiếm bài viết..." className="w-full px-4 py-3 pr-12 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400" />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-orange-500 hover:bg-orange-600 rounded-full text-white"><Search size={16} /></button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        {/* FILTER INFO & CLEAR BUTTON: Displayed when a filter is active */}
        {currentFilters.length > 0 && (
          <div className="mb-12 bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 rounded-r-lg flex items-center justify-between">
            <div>
              <span className="font-semibold">Đang lọc theo {currentFilters.length} tag:</span> 
              {/* FIX: Moved quotes inside the JS expression to avoid unescaped entities error */}
              <span className="italic ml-2">{`"${currentFilters.join(', ')}"`}</span>
            </div>
            <Link href="/tin-tuc" className="flex items-center gap-2 px-4 py-2 bg-white border border-blue-300 rounded-full text-sm font-semibold hover:bg-blue-100 transition-colors">
              <FilterX size={14} />
              Xóa tất cả bộ lọc
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {!newsData || newsData.length === 0 ? (
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold mb-4">Không tìm thấy bài viết nào</h2>
                <p className="text-gray-600">Rất tiếc, không có bài viết nào phù hợp với các tag bạn đã chọn.</p>
                 <Link href="/tin-tuc" className="mt-6 inline-block text-blue-600 font-semibold hover:underline">
                    Bỏ lọc và xem tất cả bài viết
                </Link>
              </div>
            ) : (
              <>
                {featuredPost && (
                  <div className="mb-16">
                    <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-6"><TrendingUp size={16} />Bài viết nổi bật</div>
                    <article className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                      <div className="aspect-video overflow-hidden"><Image src={featuredPost.imageUrl} alt={featuredPost.title} width={800} height={450} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>
                      <div className="p-8">
                        <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-2"><Calendar size={16} />{featuredPost.date}</div>
                          <div className="flex items-center gap-2"><User size={16} />{featuredPost.author}</div>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors"><Link href={`/tin-tuc/${featuredPost.slug}`}>{featuredPost.title}</Link></h2>
                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                        <div className="flex items-center justify-end"><Link href={`/tin-tuc/${featuredPost.slug}`} className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors font-semibold">Đọc tiếp<ArrowRight size={16} /></Link></div>
                      </div>
                    </article>
                  </div>
                )}
                {recentPosts.length > 0 && (
                  <div className="mb-16">
                    <h3 className="text-2xl font-bold text-gray-900 mb-8">Các bài viết khác</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {recentPosts.map((post: any) => (
                        <article key={post.slug} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                          <div className="aspect-video overflow-hidden"><Image src={post.imageUrl} alt={post.title} width={400} height={225} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>
                          <div className="p-6">
                            <h4 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors"><Link href={`/tin-tuc/${post.slug}`}>{post.title}</Link></h4>
                            <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                            <Link href={`/tin-tuc/${post.slug}`} className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors">Xem chi tiết<ArrowRight size={14} /></Link>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          {/* --- Sidebar --- */}
          <aside className="space-y-8">
            {/* UPDATE: The new, interactive TagsFilter component is now used */}
            <TagsFilter />
            
            {/* Recent Posts in Sidebar can still be useful */}
            {newsData.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-6">Bài viết mới nhất</h4>
                <div className="space-y-4">
                  {newsData.slice(0, 4).map((post: any) => (
                    <Link key={post.slug} href={`/tin-tuc/${post.slug}`} className="block group">
                      <div className="flex gap-3">
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0"><Image src={post.imageUrl} alt={post.title} width={64} height={64} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" /></div>
                        <div className="flex-1 min-w-0">
                          <h5 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors mb-1">{post.title}</h5>
                          <p className="text-xs text-gray-500">{post.date}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
