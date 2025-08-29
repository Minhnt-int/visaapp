import { footerInfo, navLinks, contactInfo } from "@/lib/data";
import Link from "next/link";
import { Facebook, MessageSquare, Mail } from "lucide-react";

const socialIcons = {
  Facebook: Facebook,
  Zalo: MessageSquare,
  Email: Mail,
};

export default function Footer() {
  return (
    <footer className="bg-card border-t border-gray-200">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-muted-foreground">
          
          {/* Company Info */}
          <div className="md:col-span-2">
            <Link href="/" className="text-3xl font-display font-bold text-foreground mb-4 block">{footerInfo.companyName}</Link>
            <p className="max-w-md">{footerInfo.description}</p>
            <div className="flex gap-4 mt-6">
              {footerInfo.socials.map((social) => {
                const Icon = socialIcons[social.name as keyof typeof socialIcons];
                return (
                  <a 
                    key={social.name} 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-muted p-2.5 rounded-full text-muted-foreground hover:bg-primary/80 hover:text-primary-foreground transition-colors"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xl font-display font-bold text-foreground mb-5">Điều Hướng</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-display font-bold text-foreground mb-5">Liên Hệ</h3>
            <address className="not-italic space-y-3">
              <p>{footerInfo.address}</p>
              <a href={`tel:${contactInfo.phone}`} className="block hover:text-primary transition-colors">{contactInfo.phone}</a>
              <a href={`mailto:${contactInfo.email}`} className="block hover:text-primary transition-colors">{contactInfo.email}</a>
            </address>
          </div>

        </div>
      </div>
      <div className="bg-muted/50 py-5 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {footerInfo.companyName}. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
