"use client";

import { navLinks, contactInfo } from "@/lib/data";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown, Phone, MessageCircle } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDropdownToggle = (href: string) => {
    setOpenDropdown(openDropdown === href ? null : href);
  };

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-blue-600 text-white py-2 text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span className="font-medium">{contactInfo.phone}</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <span>📧</span>
              <span>{contactInfo.email}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs">🕒 Làm việc 24/7 - Tư vấn miễn phí</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-300 bg-white shadow-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">V</span>
            </div>
            <span className="text-2xl font-bold text-blue-600">Visa5s</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group">
                <Link 
                  href={link.href} 
                  className="flex items-center gap-1 font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300">
                  {link.label}
                  {link.hasDropdown && <ChevronDown size={16} />}
                </Link>
                
                {/* Dropdown Menu */}
                {link.hasDropdown && link.children && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="py-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Contact & CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href={`tel:${contactInfo.phone}`} 
              className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              <Phone size={18} />
              <span>{contactInfo.phone}</span>
            </a>
            <Link 
              href="/lien-he" 
              className="bg-orange-500 text-white font-bold px-6 py-2 rounded-full hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg">
              Tư Vấn Ngay
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-700 hover:text-blue-600">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-300 shadow-lg z-40">
            <div className="py-4">
              {navLinks.map((link) => (
                <div key={link.href} className="px-4">
                  <div className="flex items-center justify-between">
                    <Link 
                      href={link.href}
                      className="py-3 text-gray-700 font-medium hover:text-blue-600"
                      onClick={() => !link.hasDropdown && setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                    {link.hasDropdown && (
                      <button
                        onClick={() => handleDropdownToggle(link.href)}
                        className="p-1"
                      >
                        <ChevronDown 
                          size={16} 
                          className={`transition-transform ${
                            openDropdown === link.href ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    )}
                  </div>
                  
                  {/* Mobile Dropdown */}
                  {link.hasDropdown && link.children && openDropdown === link.href && (
                    <div className="pl-4 pb-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block py-2 text-sm text-gray-600 hover:text-blue-600"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Mobile Contact */}
              <div className="px-4 pt-4 border-t border-gray-300 mt-4">
                <a 
                  href={`tel:${contactInfo.phone}`}
                  className="flex items-center gap-2 py-2 text-blue-600 font-semibold"
                >
                  <Phone size={18} />
                  <span>{contactInfo.phone}</span>
                </a>
                <Link 
                  href="/lien-he"
                  className="block mt-2 bg-orange-500 text-white text-center font-bold py-3 rounded-lg hover:bg-orange-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tư Vấn Ngay
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Fixed Contact Buttons */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
        {/* Zalo Button */}
        <a
          href={`https://zalo.me/${contactInfo.zalo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce"
          title="Chat Zalo"
        >
          <MessageCircle className="text-white" size={24} />
        </a>
        
        {/* Facebook Button */}
        <a
          href={contactInfo.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-blue-700 hover:bg-blue-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
          title="Facebook"
        >
          <span className="text-white font-bold text-xl">f</span>
        </a>
        
        {/* Phone Button */}
        <a
          href={`tel:${contactInfo.phone}`}
          className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
          title="Gọi điện"
        >
          <Phone className="text-white" size={20} />
        </a>
      </div>
    </>
  );
}
