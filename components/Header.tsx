'use client';

import { useVisaData } from "@/contexts/VisaDataContext";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown, ChevronRight, Phone, Loader2 } from "lucide-react";
import { SearchContainer } from './search/SearchContainer';
import { NavItem } from "@/types";
import { visaContinentsSlugtoName } from "@/lib/visa-mock-data";

export default function Header({navigationLinks} : {navigationLinks : NavItem[]}) {
  // Consume navItem, contactInfo, and loading state directly from the context
  const { navItem, contactInfo, loading } = useVisaData();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSubDropdown, setOpenSubDropdown] = useState<string | null>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleDropdownToggle = (path: string) => {
    setOpenDropdown(openDropdown === path ? null : path);
    setOpenSubDropdown(null);
  };
  const handleSubDropdownToggle = (path: string) => {
    setOpenSubDropdown(openSubDropdown === path ? null : path);
  };
  console.log("header", navigationLinks);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-blue-600 text-white py-2 text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone size={16} />
              {/* CORRECT: Use state for contact info */}
              <span className="font-medium">{contactInfo ? contactInfo.phone : '...'}</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <span>📧</span>
              <span>{contactInfo ? contactInfo.email : '...'}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs">🕒 Làm việc 24/7 - Tư vấn miễn phí</span>
            {loading && <div className="flex items-center gap-1 text-xs"><Loader2 size={12} className="animate-spin" /><span>Đang tải...</span></div>}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-30 w-full border-b border-gray-300 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">V5S</div>
            <div className="hidden md:block">
              <div className="font-bold text-xl text-gray-900">VISA5S</div>
              <div className="text-xs text-gray-600">Dịch vụ Visa & Tour uy tín</div>
            </div>
          </Link>

          {/* Desktop Navigation - Simplified by mapping over navItem */}
          <nav className="hidden lg:flex items-center flex-1 justify-center">
            {navigationLinks.map((link) => (
              <div key={link.href} className="relative group" onMouseLeave={() => setOpenDropdown(null)}>
                <Link href={link.href} className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors" onMouseEnter={() => link.children && setOpenDropdown(link.href)}>
                  {link.label}
                  {link.children && <ChevronDown size={16} />}
                </Link>
                {link.children && (
                  <div className={`absolute top-full left-0 w-64 bg-white shadow-lg border rounded-lg py-2 z-40 transition-all duration-200 ${openDropdown === link.href ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                    {link.children.map((child) => (
                      <div key={child.href} className="relative group/sub" onMouseLeave={() => setOpenSubDropdown(null)}>
                        <Link href={child.href} className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-100" onMouseEnter={() => child.children && setOpenSubDropdown(child.href)}>
                          { visaContinentsSlugtoName(child.label)}
                          {child.children && child.children.length > 0 && <ChevronRight size={16} />}
                        </Link>
                        {child.children && child.children.length > 0 && (
                          <div className={`absolute top-0 left-full w-64 bg-white shadow-lg border rounded-lg py-2 z-50 transition-all duration-200 ${openSubDropdown === child.href ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                            {child.children.map((subChild) => (
                              <Link key={subChild.href} href={subChild.href} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">{subChild.label}</Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Search and Mobile Menu Toggle */}
          <div className="flex items-center gap-2">
            <SearchContainer />
            <div className="lg:hidden"><button onClick={toggleMenu} className="p-2 text-gray-700 hover:text-blue-600" aria-label="Toggle menu">{isMenuOpen ? <X size={24} /> : <Menu size={24} />}</button></div>
          </div>
        </div>

        {/* Mobile Menu - Also simplified */}
        <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white border-t border-gray-200`}>
          <nav className="container mx-auto px-4 pb-4 mt-4 space-y-2">
            {navigationLinks.map((link) => (
              <div key={link.href}>
                <div className="flex justify-between items-center">
                  <Link href={link.href} className="flex-1 py-2 font-medium text-gray-800">{link.label}</Link>
                  {link.children && <button onClick={() => handleDropdownToggle(link.href)} className="p-2"><ChevronDown size={18} className={`transition-transform ${openDropdown === link.href ? 'rotate-180' : ''}`} /></button>}
                </div>
                {link.children && openDropdown === link.href && (
                  <div className="pl-4 border-l-2 border-gray-200 ml-2">
                    {link.children.map((child) => (
                      <div key={child.href}>
                        <div className="flex justify-between items-center">
                          <Link href={child.href} className="flex-1 py-2 text-gray-700">{child.label}</Link>
                          {child.children && child.children.length > 0 && <button onClick={() => handleSubDropdownToggle(child.href)} className="p-2"><ChevronDown size={16} className={`transition-transform ${openSubDropdown === child.href ? 'rotate-180' : ''}`} /></button>}
                        </div>
                        {child.children && child.children.length > 0 && openSubDropdown === child.href && (
                          <div className="pl-4 border-l-2 border-gray-300 ml-2">
                            {child.children.map((subChild) => (
                              <Link key={subChild.href} href={subChild.href} className="block py-2 text-gray-600">{subChild.label}</Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
