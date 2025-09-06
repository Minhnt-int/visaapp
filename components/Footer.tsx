import { footerInfo, navLinks, contactInfo, visaCategories, partners } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { 
  Facebook, 
  MessageSquare, 
  Mail, 
  Youtube, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  Star,
  Shield
} from "lucide-react";

const socialIcons = {
  Facebook: Facebook,
  MessageCircle: MessageSquare, // Fix: MessageCircle thay vì Zalo
  Mail: Mail,
  Youtube: Youtube
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Đăng Ký Nhận Thông Tin Visa Mới Nhất
          </h3>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Nhận thông tin cập nhật về chính sách visa, ưu đãi đặc biệt và những mẹo hữu ích từ chuyên gia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Nhập email của bạn..."
              className="flex-1 px-4 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full transition-colors duration-300 flex items-center justify-center gap-2">
              {/* <Send size={16} /> */}
              📧
              Đăng Ký
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <span className="text-2xl font-bold text-white">{footerInfo.companyName}</span>
            </div>
            <h4 className="font-bold text-lg mb-3">{footerInfo.fullCompanyName}</h4>
            <p className="text-gray-300 mb-6 leading-relaxed">{footerInfo.description}</p>
            
            {/* Trust Badges */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2 bg-green-600/20 text-green-400 px-3 py-2 rounded-full text-sm">
                <Shield size={16} />
                <span>Uy tín</span>
              </div>
              <div className="flex items-center gap-2 bg-yellow-600/20 text-yellow-400 px-3 py-2 rounded-full text-sm">
                <Star size={16} />
                <span>99% đậu</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {footerInfo.socials.map((social) => {
                const Icon = socialIcons[social.icon as keyof typeof socialIcons];
                if (!Icon) {
                  console.error(`Icon "${social.icon}" not found in socialIcons`);
                  return null; // Skip undefined icons
                }
                return (
                  <a 
                    key={social.name} 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    title={social.name}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6">Dịch Vụ Visa</h3>
            <ul className="space-y-3">
              {Object.entries(visaCategories).map(([key, category]) => (
                <li key={key}>
                  <Link 
                    href={`/dich-vu/${key}`}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Thông Tin Chung</h3>
            <ul className="space-y-3">
              {footerInfo.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Điều Hướng</h4>
              <ul className="space-y-2">
                {navLinks.filter(link => !link.hasDropdown).map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Liên Hệ</h3>
            
            {/* Office Addresses */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="text-blue-400 mt-1 flex-shrink-0" size={18} />
                <div>
                  <h4 className="font-semibold text-sm mb-1">VP HCM:</h4>
                  <p className="text-gray-300 text-sm">{contactInfo.addresses.hcm}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="text-blue-400 mt-1 flex-shrink-0" size={18} />
                <div>
                  <h4 className="font-semibold text-sm mb-1">VP Bình Dương:</h4>
                  <p className="text-gray-300 text-sm">{contactInfo.addresses.binhDuong}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="text-blue-400 mt-1 flex-shrink-0" size={18} />
                <div>
                  <h4 className="font-semibold text-sm mb-1">VP Hà Nội:</h4>
                  <p className="text-gray-300 text-sm">{contactInfo.addresses.hanoi}</p>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="text-green-400" size={18} />
                <div>
                  <a href={`tel:${contactInfo.phone}`} className="text-white hover:text-green-400 font-semibold">
                    {contactInfo.phone}
                  </a>
                  <p className="text-gray-400 text-xs">Hotline chính</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-green-400" size={18} />
                <div>
                  <a href={`tel:${contactInfo.phoneSecondary}`} className="text-white hover:text-green-400 font-semibold">
                    {contactInfo.phoneSecondary}
                  </a>
                  <p className="text-gray-400 text-xs">Hotline phụ</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-blue-400" size={18} />
                <a href={`mailto:${contactInfo.email}`} className="text-white hover:text-blue-400">
                  {contactInfo.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="text-orange-400" size={18} />
                <span className="text-gray-300 text-sm">24/7 - Tư vấn miễn phí</span>
              </div>
            </div>
          </div>
        </div>

        {/* Partners Section */}
        <div className="border-t border-gray-800 pt-12 mb-12">
          <h3 className="text-center text-xl font-bold mb-8">Đối Tác Của Visa5s</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 hover:opacity-100 transition-opacity duration-300">
            {partners.map((partner, index) => (
              <div key={index} className="grayscale hover:grayscale-0 transition-all duration-300">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={120}
                  height={60}
                  className="h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-800 border-t border-gray-700 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm text-center md:text-left">
              <p>&copy; {new Date().getFullYear()} {footerInfo.companyName} | All Rights Reserved</p>
              <p className="mt-1">Được vận hành bởi {footerInfo.fullCompanyName}</p>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <Link href="/chinh-sach" className="hover:text-white transition-colors">
                Chính sách
              </Link>
              <Link href="/bao-mat" className="hover:text-white transition-colors">
                Bảo mật
              </Link>
              <a 
                href="https://goo.gl/maps/AsdR6" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Xem bản đồ
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
