import { blogPosts } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CalendarDays, User } from 'lucide-react';

// Generate static paths for each blog post
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Component to render the blog post details
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Get 3 related posts (excluding the current one)
  const relatedPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 3);

  // In a real app, the content would be more extensive and unique
  const fullContent = `
    <p>${post.excerpt}</p>
    <p>Đây là nội dung chi tiết của bài viết. Để giữ cho ví dụ đơn giản, chúng ta sẽ lặp lại đoạn trích dẫn. Trong một ứng dụng thực tế, bạn sẽ có nội dung đầy đủ (full content) cho mỗi bài viết trong file dữ liệu của mình. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.</p>
    <blockquote>&quot;Đây là một trích dẫn hay hoặc một điểm nhấn quan trọng trong bài viết để thu hút người đọc.&quot;</blockquote>
    <p>Bạn có thể tiếp tục thêm các đoạn văn, danh sách, hình ảnh khác vào đây để làm phong phú nội dung bài viết. Việc trình bày nội dung một cách rõ ràng, dễ đọc sẽ giúp giữ chân người dùng lâu hơn trên trang của bạn. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
    <h2>Tiêu đề phụ</h2>
    <p>Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet.</p>
  `;

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
              <Image src={post.imageUrl} alt={post.title} width={1200} height={675} className="w-full h-full object-cover" />
            </div>

            {/* Post Content */}
            <article 
              className="prose prose-lg lg:prose-xl max-w-none mx-auto prose-headings:font-display prose-headings:text-primary prose-a:text-secondary hover:prose-a:text-secondary/80"
              dangerouslySetInnerHTML={{ __html: fullContent }}
            />

            {/* Related Posts */}
            <div className="mt-24 pt-16 border-t border-base-300">
              <h2 className="text-3xl font-display font-bold tracking-tight text-neutral-600 sm:text-4xl text-center">Bài Viết Liên Quan</h2>
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map(p => (
                  <div key={p.id} className="bg-base-100 rounded-lg shadow-xl hover:shadow-2xl flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2">
                    <div className="aspect-video overflow-hidden">
                      <Image src={p.imageUrl} alt={p.title} width={400} height={225} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-display font-bold text-neutral-600 mb-2 flex-grow">{p.title}</h3>
                      <p className="text-base-content/80 line-clamp-3 mb-4">{p.excerpt}</p>
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
