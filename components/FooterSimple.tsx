import { footerInfo, navLinks, contactInfo, visaCategories, partners } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Footer Component Test</h2>
        <p className="text-gray-300">Đây là footer đơn giản để test</p>
        
        <div className="mt-8">
          <p className="text-sm text-gray-400">
            © 2024 {footerInfo.companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
