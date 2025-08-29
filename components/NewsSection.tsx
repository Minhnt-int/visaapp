import { blogPosts } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";

export default function NewsSection() {
    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <h2 className="text-5xl lg:text-6xl font-display font-bold \
                               bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
                        Tin Tức & Cẩm Nang
                    </h2>
                    <p className="text-lg mt-4 text-muted-foreground max-w-2xl mx-auto">
                        Những thông tin mới nhất và kinh nghiệm hữu ích về visa.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {blogPosts.map((post) => (
                        <div 
                          key={post.id} 
                          className="bg-card rounded-xl shadow-lg hover:shadow-2xl flex flex-col overflow-hidden \
                                     transition-all duration-300 hover:-translate-y-2 border border-gray-200/50 group"
                        >
                            <Link href={`/tin-tuc/${post.slug}`} className="block overflow-hidden">
                                <Image
                                    src={post.imageUrl}
                                    alt={post.title}
                                    width={400}
                                    height={250}
                                    className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </Link>
                            <div className="p-6 flex flex-col flex-grow">
                                <p className="text-sm text-muted-foreground mb-2">{post.date} &bull; {post.author}</p>
                                <h3 className="text-xl font-display font-bold text-foreground mb-3 flex-grow">
                                    <Link href={`/tin-tuc/${post.slug}`} className="hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </Link>
                                </h3>
                                <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                                <div className="mt-auto">
                                    <Link href={`/tin-tuc/${post.slug}`} className="font-semibold text-primary hover:underline">
                                        Đọc tiếp →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-20">
                    <Link 
                      href="/tin-tuc" 
                      className="bg-primary text-primary-foreground font-bold py-4 px-12 rounded-full \
                                 hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 \
                                 shadow-lg hover:shadow-primary/40"
                    >
                        Xem tất cả bài viết
                    </Link>
                </div>
            </div>
        </section>
    );
}
