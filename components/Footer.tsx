'use client';
import Link from "next/link";
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
  Shield,
  ArrowRight
} from "lucide-react";
import { useVisaData } from "@/contexts/VisaDataContext";
import { useState, useEffect } from "react";

const socialIcons = {
  Facebook: Facebook,
  Instagram: MessageSquare, // Placeholder
  Twitter: Mail, // Placeholder
  Youtube: Youtube
};

export default function Footer() {
  // CORRECT: Fetch all necessary data asynchronously
const { visaCategories, contactInfo } = useVisaData();
  const footerInfo = {
      companyName: "Kim Quy Travel",
      description: "Chuyên cung cấp dịch vụ visa và tour du lịch trọn gói uy tín hàng đầu. Đồng hành cùng bạn trên mọi hành trình.",
      socials: [
          { label: "Facebook", href: contactInfo.facebook, icon: "Facebook" },
          { label: "Zalo", href: contactInfo.zalo, icon: "Instagram" }, // Using Instagram icon for Zalo
          { label: "Email", href: `mailto:${contactInfo.email}`, icon: "Twitter" }, // Using Twitter icon for Mail
      ],
      quickLinks: [
        { label: "Câu hỏi thường gặp", href: "/faq" },
        { label: "Chính sách bảo mật", href: "/chinh-sach-bao-mat" },
        { label: "Điều khoản sử dụng", href: "/dieu-khoan-su-dung" },
      ]
  }

  return (
    <footer className="bg-neutral-900 text-white">
      {/* Newsletter Section */}
      {/* <div className="bg-gradient-to-r from-primary to-primary-dark py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                Nhận thông tin <span className="text-accent-orange-lighter">mới nhất</span>
              </h3>
              <p className="text-primary-lighter leading-relaxed">
                Đăng ký để nhận những thông tin cập nhật về visa, ưu đãi đặc biệt và kinh nghiệm du lịch
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Nhập email của bạn..."
                className="flex-1 px-4 py-3 rounded-lg text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-accent-orange-light"
              />
              <button className="bg-accent-orange hover:bg-accent-orange-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 whitespace-nowrap">
                <Send size={16} />
                Đăng Ký
              </button>
            </div>
          </div>
        </div>
      </div> */}

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">KQ</span>
              </div>
              <div>
                <div className="text-xl font-bold text-white">{footerInfo.companyName}</div>
                <div className="text-xs text-neutral-400">Uy tín - Nhanh chóng - Hiệu quả</div>
              </div>
            </div>
            <p className="text-neutral-300 mb-6 text-sm leading-relaxed">{footerInfo.description}</p>
            
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-2 bg-accent-green-bg text-accent-green-lighter px-3 py-1 rounded-lg text-xs border border-accent-green-border">
                <Shield size={14} />
                <span>Uy tín</span>
              </div>
              <div className="flex items-center gap-2 bg-accent-yellow-bg text-accent-yellow-light px-3 py-1 rounded-lg text-xs border border-accent-yellow-border">
                <Star size={14} />
                <span>99% thành công</span>
              </div>
            </div>

            <div className="flex gap-3">
              {footerInfo.socials.map((social) => {
                const Icon = socialIcons[social.icon as keyof typeof socialIcons];
                if (!Icon) return null;
                return (
                  <a 
                    key={social.label} 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-9 h-9 bg-neutral-800 hover:bg-primary rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 border border-neutral-700"
                    title={social.label}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Dịch Vụ Visa</h3>
            <ul className="space-y-2">
              {visaCategories.slice(0, 4).map((category) => (
                <li key={category.slug}>
                  <Link 
                    href={`/dich-vu/${category.slug}`}
                    className="text-neutral-300 hover:text-primary-light transition-colors duration-300 flex items-center gap-2 text-sm"
                  >
                    <ArrowRight size={12} className="text-primary-light" />
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Liên Hệ</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-primary-light mt-1" />
                <div className="text-sm">
                  <p className="text-neutral-300">{contactInfo.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-accent-green-lighter" />
                <div>
                  <a href={`tel:${contactInfo.phone}`} className="text-neutral-300 hover:text-primary-light transition-colors text-sm">
                    {contactInfo.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-accent-orange-light" />
                <div>
                  <a href={`mailto:${contactInfo.email}`} className="text-neutral-300 hover:text-primary-light transition-colors text-sm">
                    {contactInfo.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-accent-yellow-light" />
                <div>
                  <p className="text-neutral-300 text-sm">Thứ 2 - Thứ 6: 8:00 - 17:30</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-neutral-800 border-t border-neutral-700 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-neutral-400 text-sm">
              © 2024 {footerInfo.companyName}. Tất cả quyền được bảo lưu.
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/chinh-sach-bao-mat" className="text-neutral-400 hover:text-primary-light transition-colors">
                Chính Sách Bảo Mật
              </Link>
              <Link href="/dieu-khoan-su-dung" className="text-neutral-400 hover:text-primary-light transition-colors">
                Điều Khoản Sử Dụng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
