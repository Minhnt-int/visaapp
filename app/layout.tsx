
import type { Metadata } from "next";
import Script from "next/script";
import { Manrope, Poppins } from "next/font/google";
import { getSiteConfig } from "@/lib/api"; // CORRECT: Import the async function
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { VisaDataProvider } from "@/contexts/VisaDataContext";
import { SearchProvider } from "@/context/SearchContext";

// Font configuration
const manrope = Manrope({
  subsets: ["latin", "vietnamese"],
  display: 'swap',
  variable: '--font-manrope',
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-poppins',
});

// CORRECT: Use generateMetadata to fetch data asynchronously
export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();
  const metadata: Metadata = {
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    openGraph: {
        type: 'website',
        locale: 'vi_VN',
        url: siteConfig.url,
        title: siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name,
        images: [
          {
            url: siteConfig.ogImage,
            width: 1200,
            height: 630,
            alt: siteConfig.name,
          },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: siteConfig.name,
        description: siteConfig.description,
        images: [siteConfig.ogImage],
    },
    robots: {
        index: true,
        follow: true,
    },
    verification: {
        google: 'your-google-verification-code', // Replace if you have one
    },
  };
  return metadata;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const algoliaConfig = {
    appId: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
    apiKey: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY!,
    indexName: process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!,
  };

  return (
    <html lang="vi" className={`${poppins.variable} ${manrope.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`font-sans bg-white text-gray-900 antialiased`}>
        <VisaDataProvider>
            <SearchProvider algoliaConfig={algoliaConfig}>
                <Header />
                <main>{children}</main>
                <Footer />
            </SearchProvider>
        </VisaDataProvider>

        {/* Facebook Pixel Script */}
        {process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID && (
          <Script id="fb-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document, 'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}

      </body>
    </html>
  );
}
