import type { Metadata } from "next";
import Script from "next/script";
import { Manrope, Poppins } from "next/font/google";
import { siteConfig } from "@/lib/data";
import "./globals.css";

// Font configuration
const manrope = Manrope({
  subsets: ["latin", "vietnamese"],
  display: 'swap',
  variable: '--font-manrope', // CSS variable for body font
});

const poppins = Poppins({
  subsets: ["latin"], // Removed "vietnamese"
  weight: ['400', '500', '600', '700', '800', '900'], // Added more weights
  display: 'swap',
  variable: '--font-poppins', // CSS variable for display font
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${poppins.variable} ${manrope.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`font-sans bg-white text-gray-900 antialiased`}>
        {children}
        
        {/* Google Analytics - Replace with your tracking ID */}
        <Script
          src="https://www.google-analytics.com/analytics.js"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            ga('create', 'UA-XXXXX-Y', 'auto');
            ga('send', 'pageview');
          `}
        </Script>

        {/* Facebook Pixel - Replace with your pixel ID */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window,document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', 'YOUR_PIXEL_ID');
              fbq('track', 'PageView');
            `,
          }}
        />

        {/* Zalo OA Chat Widget */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var za = document.createElement('script'); za.type = 'text/javascript'; za.async = true;
                za.src = 'https://sp.zalo.me/plugins/sdk.js';
                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(za, s);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
