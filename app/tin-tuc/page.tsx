import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { blogPosts } from "@/lib/data";
import Image from "next/image";

export default function NewsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <div className="bg-primary text-white">
          <div className="container mx-auto px-4 py-24 sm:py-32 text-center">
            <h1 className="text-4xl font-display font-bold tracking-tight text-white sm:text-6xl">Tin Tức & Cẩm Nang Visa</h1>
            <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
              Cập nhật những thông tin mới nhất, hướng dẫn chi tiết và các mẹo hữu ích cho hành trình xin visa của bạn.
            </p>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="bg-base-100">
          <div className="container mx-auto px-4 py-24 sm:py-32">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <div key={post.id} className="bg-base-100 rounded-lg shadow-xl hover:shadow-2xl flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2">
                    <div className="aspect-video overflow-hidden">
                        <Image src={post.imageUrl} alt={post.title} width={400} height={225} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                        <h3 className="mt-2 text-xl font-display font-bold text-primary mb-2 flex-grow">{post.title}</h3>
                        <p className="text-base-content/80 line-clamp-3 mb-4">{post.excerpt}</p>
                        <Link href={`/tin-tuc/${post.slug}`} className="mt-auto font-semibold text-secondary hover:text-secondary/80 transition-colors self-start">
                            Đọc tiếp →
                        </Link>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
