
import { getAllNews, getNewsBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CalendarDays, User } from 'lucide-react';
import { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

interface BlogPostPageProps {
  params: { newsSlug: string };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getNewsBySlug(params.newsSlug);

  if (!post) {
    return {};
  }

  const imageUrl = post.avatarUrl.startsWith('http') ? post.avatarUrl : `${SITE_URL}${post.avatarUrl}`;

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    keywords: post.metaKeywords ? post.metaKeywords.split(',').map(keyword => keyword.trim()) : [],
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: [imageUrl],
      url: `${SITE_URL}/tin-tuc/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: [imageUrl],
    },
  };
}

export async function generateStaticParams() {
  const news = await getAllNews();
  return news.map((post) => ({
    newsSlug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getNewsBySlug(params.newsSlug);

  if (!post) {
    notFound();
  }
  
  // To get related posts, we still need all news, but this is acceptable as it's a secondary query.
  const allNews = await getAllNews();
  const relatedPosts = allNews.filter(p => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <div className="bg-base-100">
        <div className="container mx-auto px-4 py-24 sm:py-32">
          <div className="max-w-4xl mx-auto">
            {/* Post Header */}
            <div className="text-center mb-12">
              <h1 className="mt-2 text-4xl font-display font-bold tracking-tight text-neutral-600 sm:text-6xl">{post.title}</h1>
              <div className="mt-6 flex items-center justify-center gap-x-6 text-base-content/80">
                  <div className="flex items-center gap-x-2">
                    <User size={16} />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <CalendarDays size={16} />
                    <time dateTime={post.date}>{post.date}</time>
                  </div>
              </div>
            </div>

            {/* Post Image */}
            <div className="aspect-video overflow-hidden rounded-2xl shadow-2xl mb-12">
              <Image src={post.avatarUrl} alt={post.title} width={1200} height={675} className="w-full h-full object-cover" />
            </div>

            {/* Post Content */}
            <article
              className="prose prose-lg lg:prose-xl max-w-none mx-auto prose-headings:font-display prose-headings:text-primary prose-a:text-secondary hover:prose-a:text-secondary/80"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Related Posts */}
            <div className="mt-24 pt-16 border-t border-base-300">
              <h2 className="text-3xl font-display font-bold tracking-tight text-neutral-600 sm:text-4xl text-center">Bài Viết Liên Quan</h2>
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map(p => (
                  <div key={p.slug} className="bg-base-100 rounded-lg shadow-xl hover:shadow-2xl flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2">
                    <div className="aspect-video overflow-hidden">
                      <Image src={p.avatarUrl} alt={p.title} width={400} height={225} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-display font-bold text-neutral-600 mb-2 flex-grow">{p.title}</h3>
                      <p className="text-base-content/80 line-clamp-3 mb-4">{p.metaDescription || p.excerpt}</p>
                      <Link href={`/tin-tuc/${p.slug}`} className="mt-auto font-semibold text-neutral-600 hover:text-secondary/80 transition-colors self-start">
                          Đọc tiếp →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
