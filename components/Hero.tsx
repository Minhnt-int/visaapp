import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-cover bg-center text-foreground">
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/50 to-transparent"></div>
      <div className="container mx-auto px-4 py-48 text-center relative">
        <h1 
          className="font-display text-7xl font-extrabold leading-tight mb-4 \
                     bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent drop-shadow-lg"
        >
          Dịch Vụ Xin Visa Chuyên Nghiệp
        </h1>
        <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
          Mở ra cánh cửa khám phá thế giới với dịch vụ visa uy tín, nhanh chóng và tỷ lệ đậu cao.
        </p>
        <Link 
          href="/dich-vu" 
          className="bg-primary text-primary-foreground font-bold py-4 px-12 rounded-full \
                     hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 \
                     shadow-2xl hover:shadow-primary/40 ring-2 ring-primary/50 ring-offset-4 ring-offset-background"
        >
          Xem Dịch Vụ
        </Link>
      </div>
    </section>
  );
}
