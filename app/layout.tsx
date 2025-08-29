import type { Metadata } from "next";
import { Manrope, Poppins } from "next/font/google";
import "./globals.css";

// Font configuration
const manrope = Manrope({
  subsets: ["latin", "vietnamese"],
  display: 'swap',
  variable: '--font-manrope', // CSS variable for body font
});

const poppins = Poppins({
  subsets: ["latin"], // Removed "vietnamese"
  weight: ['700', '800', '900'], // Weights for headings
  display: 'swap',
  variable: '--font-poppins', // CSS variable for display font
});

export const metadata: Metadata = {
  title: "VisaHub - Dịch Vụ Xin Visa Chuyên Nghiệp",
  description: "Chuyên cung cấp dịch vụ xin visa uy tín, nhanh chóng và hiệu quả hàng đầu Việt Nam.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${poppins.variable} ${manrope.variable}`}>
      <body className={`font-sans bg-base-200 text-base-content`}>
        {children}
      </body>
    </html>
  );
}
