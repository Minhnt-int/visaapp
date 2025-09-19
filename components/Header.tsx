'use client';

import { getContactInfo } from "@/lib/data"; // CORRECT: Import async function
import { useVisaData } from "@/contexts/VisaDataContext";
import Link from "next/link";
import { useState, useEffect } from "react"; // CORRECT: Import hooks
import { Menu, X, ChevronDown, ChevronRight, Phone, Loader2 } from "lucide-react";
import { SearchContainer } from './search/SearchContainer';
import { VisaCategory } from '@/types';

// Interfaces for navigation structure
interface NavSubChild { href: string; label: string; }
interface NavChild { href: string; label: string; subChildren?: NavSubChild[]; }
interface NavLink { href: string; label: string; children?: NavChild[]; }

// CORRECT: Define a type for contact info state
interface ContactInfoState {
  phone: string;
  email: string;
}

export default function Header() {
  const { visaCategories, loading } = useVisaData(); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSubDropdown, setOpenSubDropdown] = useState<string | null>(null);
  
  // CORRECT: Fetch contact info on the client side
  const [contact, setContact] = useState<ContactInfoState | null>(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const info = await getContactInfo();
        setContact(info);
      } catch (error) {
        console.error("Failed to fetch contact info:", error);
        // Set default or error state if needed
        setContact({ phone: "N/A", email: "N/A" });
      }
    };
    fetchContactInfo();
  }, []);

  // This function dynamically builds the navigation links based on visa data
  const generateNavLinks = (): NavLink[] => {
    const baseLinks: NavLink[] = [
      { href: "/", label: "Trang chủ" },
    ];

    const staticLinks: NavLink[] = [
        { href: "/tour-du-lich", label: "Tour du lịch" },
        { href: "/tin-tuc", label: "Tin tức" },
        { href: "/lien-he", label: "Liên hệ" }
    ];

    // Create a placeholder while data is loading
    if (loading) {
      return [
        ...baseLinks,
        { 
          href: "/dich-vu", 
          label: "Dịch vụ Visa",
          children: [
            { href: "#", label: "Đang tải dữ liệu...", subChildren: [] }
          ]
        },
        ...staticLinks
      ];
    }

    // Construct the Visa Service link dynamically from fetched visaCategories
    const visaServiceLink: NavLink = {
      href: "/dich-vu",
      label: "Dịch vụ Visa",
      children: visaCategories.map((category: VisaCategory) => ({
        href: `/dich-vu/${category.slug}`,
        label: `Visa ${category.name}`,
        subChildren: category.countries.map(country => ({
          href: `/dich-vu/${category.slug}/${country.slug}`,
          label: country.name
        }))
      }))
    };

    return [
      ...baseLinks,
      visaServiceLink,
      ...staticLinks
    ];
  };

  const navLinks = generateNavLinks();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleDropdownToggle = (href: string) => {
    setOpenDropdown(openDropdown === href ? null : href);
    setOpenSubDropdown(null);
  };
  const handleSubDropdownToggle = (href: string) => {
    setOpenSubDropdown(openSubDropdown === href ? null : href);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-blue-600 text-white py-2 text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone size={16} />
              {/* CORRECT: Use state for contact info */}
              <span className="font-medium">{contact ? contact.phone : '...'}</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
                <span>📧</span>
                <span>{contact ? contact.email : '...'}</span>
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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center flex-1 justify-center">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group" onMouseLeave={() => setOpenDropdown(null)}>
                <Link href={link.href} className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors" onMouseEnter={() => link.children && setOpenDropdown(link.href)}>
                  {link.label}
                  {link.children && <ChevronDown size={16} />}
                </Link>
                {link.children && (
                  <div className={`absolute top-full left-0 w-64 bg-white shadow-lg border rounded-lg py-2 z-40 transition-all duration-200 ${openDropdown === link.href ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                    {link.children.map((child) => (
                      <div key={child.href} className="relative group/sub" onMouseLeave={() => setOpenSubDropdown(null)}>
                        <Link href={child.href} className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-100" onMouseEnter={() => child.subChildren && setOpenSubDropdown(child.href)}>
                          {child.label}
                          {child.subChildren && child.subChildren.length > 0 && <ChevronRight size={16} />}
                        </Link>
                        {child.subChildren && child.subChildren.length > 0 && (
                          <div className={`absolute top-0 left-full w-64 bg-white shadow-lg border rounded-lg py-2 z-50 transition-all duration-200 ${openSubDropdown === child.href ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                            {child.subChildren.map((subChild) => (
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

        {/* Mobile Menu */}
        <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white border-t border-gray-200`}>
          <nav className="container mx-auto px-4 pb-4 mt-4 space-y-2">
            {navLinks.map((link) => (
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
                          {child.subChildren && child.subChildren.length > 0 && <button onClick={() => handleSubDropdownToggle(child.href)} className="p-2"><ChevronDown size={16} className={`transition-transform ${openSubDropdown === child.href ? 'rotate-180' : ''}`} /></button>}
                        </div>
                        {child.subChildren && child.subChildren.length > 0 && openSubDropdown === child.href && (
                          <div className="pl-4 border-l-2 border-gray-300 ml-2">
                            {child.subChildren.map((subChild) => (
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
