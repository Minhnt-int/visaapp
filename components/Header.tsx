import { navLinks, contactInfo } from "@/lib/data";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold text-foreground font-display">
          VisaHub
        </Link>
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="font-medium text-muted-foreground hover:text-foreground transition-colors duration-300">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-6">
            <a 
              href={`tel:${contactInfo.phone}`} 
              className="font-semibold text-foreground hidden sm:block hover:text-primary transition-colors duration-300">
              {contactInfo.phone}
            </a>
            <Link 
              href="/lien-he" 
              className="bg-primary text-primary-foreground font-bold px-6 py-3 rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Tư Vấn Ngay
            </Link>
        </div>
      </div>
    </header>
  );
}
