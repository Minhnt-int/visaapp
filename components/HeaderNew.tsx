"use client";

import { contactInfo } from "@/lib/data";
import { useVisaData } from "@/contexts/VisaDataContext";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown, ChevronRight, Phone, Loader2 } from "lucide-react";

interface NavSubChild {
  href: string;
  label: string;
}

interface NavChild {
  href: string;
  label: string;
  subChildren?: NavSubChild[];
}

interface NavLink {
  href: string;
  label: string;
  children?: NavChild[];
}

export default function Header() {
  const { groupedCountries, loading } = useVisaData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSubDropdown, setOpenSubDropdown] = useState<string | null>(null);

  // Generate navigation links from API data
  const generateNavLinks = (): NavLink[] => {
    const baseLinks: NavLink[] = [
      { href: "/", label: "Trang chủ" },
    ];

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
        { href: "/tour-du-lich", label: "Tour du lịch" },
        { href: "/tin-tuc", label: "Tin tức" },
        { href: "/lien-he", label: "Liên hệ" }
      ];
    }

    const visaServiceLink: NavLink = {
      href: "/dich-vu",
      label: "Dịch vụ Visa",
      children: [
        {
          href: "/dich-vu/visa-chau-a",
          label: "Visa Châu Á",
          subChildren: groupedCountries["visa-chau-a"]?.map(country => ({
            href: `/dich-vu/visa-chau-a/${country.slug}`,
            label: `${country.flag} ${country.name}`
          })) || []
        },
        {
          href: "/dich-vu/visa-chau-au", 
          label: "Visa Châu Âu",
          subChildren: groupedCountries["visa-chau-au"]?.map(country => ({
            href: `/dich-vu/visa-chau-au/${country.slug}`,
            label: `${country.flag} ${country.name}`
          })) || []
        },
        {
          href: "/dich-vu/visa-chau-my",
          label: "Visa Châu Mỹ", 
          subChildren: groupedCountries["visa-chau-my"]?.map(country => ({
            href: `/dich-vu/visa-chau-my/${country.slug}`,
            label: `${country.flag} ${country.name}`
          })) || []
        },
        {
          href: "/dich-vu/visa-chau-uc",
          label: "Visa Châu Úc",
          subChildren: groupedCountries["visa-chau-uc"]?.map(country => ({
            href: `/dich-vu/visa-chau-uc/${country.slug}`, 
            label: `${country.flag} ${country.name}`
          })) || []
        }
      ]
    };

    return [
      ...baseLinks,
      visaServiceLink,
      { href: "/tour-du-lich", label: "Tour du lịch" },
      { href: "/tin-tuc", label: "Tin tức" },
      { href: "/lien-he", label: "Liên hệ" }
    ];
  };

  const navLinks = generateNavLinks();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDropdownToggle = (href: string) => {
    setOpenDropdown(openDropdown === href ? null : href);
    setOpenSubDropdown(null);
  };

  const handleSubDropdownToggle = (href: string) => {
    setOpenSubDropdown(openSubDropdown === href ? null : href);
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
            {loading && (
              <div className="flex items-center gap-1 text-xs">
                <Loader2 size={12} className="animate-spin" />
                <span>Đang tải menu...</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-300 bg-white shadow-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              V5S
            </div>
            <div className="hidden md:block">
              <div className="font-bold text-xl text-gray-900">VISA5S</div>
              <div className="text-xs text-gray-600">Dịch vụ Visa & Tour uy tín</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  onMouseEnter={() => link.children && setOpenDropdown(link.href)}
                >
                  {link.label}
                  {link.children && <ChevronDown size={16} />}
                </Link>

                {link.children && (
                  <div
                    className={`absolute top-full left-0 w-64 bg-white shadow-lg border rounded-lg py-2 z-40 transition-all duration-200 ${
                      openDropdown === link.href ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {link.children.map((child) => (
                      <div key={child.href} className="relative group/child">
                        <Link
                          href={child.href}
                          className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                          onMouseEnter={() => child.subChildren && child.subChildren.length > 0 && setOpenSubDropdown(child.href)}
                        >
                          <span>{child.label}</span>
                          {child.subChildren && child.subChildren.length > 0 && (
                            <ChevronRight size={16} />
                          )}
                        </Link>

                        {child.subChildren && child.subChildren.length > 0 && (
                          <div
                            className={`absolute top-0 left-full w-56 bg-white shadow-lg border rounded-lg py-2 ml-0 transition-all duration-200 ${
                              openSubDropdown === child.href ? 'opacity-100 visible' : 'opacity-0 invisible'
                            }`}
                            onMouseLeave={() => setOpenSubDropdown(null)}
                          >
                            {child.subChildren.map((subChild: NavSubChild) => (
                              <Link
                                key={subChild.href}
                                href={subChild.href}
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 text-sm"
                              >
                                {subChild.label}
                              </Link>
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

          {/* Contact Info & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <a
              href={`tel:${contactInfo.phone}`}
              className="hidden lg:flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Phone size={16} />
              <span className="font-semibold">Gọi ngay</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-700 hover:text-blue-600"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <nav className="container mx-auto px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <div key={link.href}>
                  <div className="flex items-center justify-between">
                    <Link
                      href={link.href}
                      className="flex-1 py-2 text-gray-700 hover:text-blue-600 font-medium"
                      onClick={() => !link.children && setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                    {link.children && (
                      <button
                        onClick={() => handleDropdownToggle(link.href)}
                        className="p-2 text-gray-500 hover:text-blue-600"
                      >
                        <ChevronDown
                          size={16}
                          className={`transform transition-transform ${
                            openDropdown === link.href ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {link.children && openDropdown === link.href && (
                    <div className="ml-4 mt-2 space-y-1">
                      {link.children.map((child) => (
                        <div key={child.href}>
                          <div className="flex items-center justify-between">
                            <Link
                              href={child.href}
                              className="flex-1 py-2 text-sm text-gray-600 hover:text-blue-600"
                              onClick={() => !child.subChildren && setIsMenuOpen(false)}
                            >
                              {child.label}
                            </Link>
                            {child.subChildren && child.subChildren.length > 0 && (
                              <button
                                onClick={() => handleSubDropdownToggle(child.href)}
                                className="p-2 text-gray-400 hover:text-blue-600"
                              >
                                <ChevronDown
                                  size={14}
                                  className={`transform transition-transform ${
                                    openSubDropdown === child.href ? 'rotate-180' : ''
                                  }`}
                                />
                              </button>
                            )}
                          </div>

                          {child.subChildren && child.subChildren.length > 0 && openSubDropdown === child.href && (
                            <div className="ml-4 mt-1 space-y-1">
                              {child.subChildren.map((subChild: NavSubChild) => (
                                <Link
                                  key={subChild.href}
                                  href={subChild.href}
                                  className="block py-2 text-xs text-gray-500 hover:text-blue-600"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {subChild.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile Contact */}
              <div className="pt-4 border-t border-gray-200">
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="flex items-center gap-2 text-blue-600 font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Phone size={16} />
                  {contactInfo.phone}
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
