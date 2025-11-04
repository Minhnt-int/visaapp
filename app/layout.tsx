
import type { Metadata } from "next";
import Script from "next/script";
import { Manrope, Poppins } from "next/font/google";
import { getNavigationLinks, getSiteConfig } from "@/lib/api";
import { PRIMARY_COLOR_HEX_VALUE } from "@/lib/theme.config";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { VisaDataProvider } from "@/contexts/VisaDataContext";
import { SearchProvider } from "@/context/SearchContext";
import { LoadingProvider } from "@/contexts/LoadingContext";
import GlobalLoading from "@/components/GlobalLoading";
import LoadingInitializer from "@/components/LoadingInitializer";
import EmergencyReset from "@/components/EmergencyReset";
import ThemeColorRuntime from "@/components/ThemeColorRuntime";

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

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();
  
  // Fallback values if siteConfig is not available
  const siteName = siteConfig?.name || 'Kim Quy Travel';
  const siteDescription = siteConfig?.description || 'Dịch vụ visa và tour du lịch chuyên nghiệp';
  const siteUrl = siteConfig?.url || 'https://kimquytravel.vn';
  const ogImage = siteConfig?.ogImage || '/images/og-default.jpg';
  
  const metadata: Metadata = {
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: siteDescription,
    openGraph: {
        type: 'website',
        locale: 'vi_VN',
        url: siteUrl,
        title: siteName,
        description: siteDescription,
        siteName: siteName,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: siteName,
          },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: siteName,
        description: siteDescription,
        images: [ogImage],
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

export const revalidate = 600; 

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // CORRECTED: Fixed the typo in the environment variable name.
  const algoliaConfig = {
    appId: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '',
    apiKey: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY || '',
    indexName: process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || 'Kim Quy Travel',
  };

  // Check if Algolia is properly configured, but don't crash the app
  const isAlgoliaConfigured = algoliaConfig.appId && algoliaConfig.apiKey && algoliaConfig.indexName;

  const navigationLinks = await getNavigationLinks();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3002';
  
  return (
    <html lang="vi" className={`${poppins.variable} ${manrope.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content={process.env.NEXT_PUBLIC_THEME_COLOR || PRIMARY_COLOR_HEX_VALUE} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Inline script để apply theme ngay từ đầu, tránh flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedColor = localStorage.getItem('theme_color');
                  if (savedColor) applyTheme(savedColor);
                  
                  fetch('${backendUrl}/api/theme')
                    .then(function(res) { return res.json(); })
                    .then(function(data) {
                      if (data.success && data.color) applyTheme(data.color);
                    })
                    .catch(function() {});
                  
                  function applyTheme(hex) {
                    if (!hex || !hex.startsWith('#')) return;
                    var r = parseInt(hex.substr(1, 2), 16) / 255;
                    var g = parseInt(hex.substr(3, 2), 16) / 255;
                    var b = parseInt(hex.substr(5, 2), 16) / 255;
                    var max = Math.max(r, g, b), min = Math.min(r, g, b);
                    var h = 0, s = 0, l = (max + min) / 2;
                    if (max !== min) {
                      var d = max - min;
                      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                      if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                      else if (max === g) h = ((b - r) / d + 2) / 6;
                      else h = ((r - g) / d + 4) / 6;
                    }
                    h = Math.round(h * 360); s = Math.round(s * 100); l = Math.round(l * 100);
                    var root = document.documentElement;
                    root.style.setProperty('--color-primary', h + ' ' + s + '% ' + l + '%');
                    root.style.setProperty('--color-primary-light', h + ' ' + s + '% ' + Math.min(100, l + 10) + '%');
                    root.style.setProperty('--color-primary-lighter', h + ' ' + s + '% ' + Math.min(100, l + 20) + '%');
                    root.style.setProperty('--color-primary-lightest', h + ' ' + s + '% ' + Math.min(100, l + 30) + '%');
                    root.style.setProperty('--color-primary-dark', h + ' ' + s + '% ' + Math.max(0, l - 10) + '%');
                    root.style.setProperty('--color-primary-darker', h + ' ' + s + '% ' + Math.max(0, l - 20) + '%');
                    root.style.setProperty('--color-primary-darkest', h + ' ' + s + '% ' + Math.max(0, l - 35) + '%');
                    var meta = document.querySelector('meta[name="theme-color"]');
                    if (meta) meta.setAttribute('content', hex);
                    localStorage.setItem('theme_color', hex);
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`font-sans bg-background text-foreground antialiased`}>
        <LoadingProvider>
          <VisaDataProvider>
              {isAlgoliaConfigured ? (
                  <SearchProvider algoliaConfig={algoliaConfig}>
                      <Header navigationLinks={navigationLinks} />
                      <main>{children}</main>
                      <Footer />
                  </SearchProvider>
              ) : (
                  <>
                      <Header navigationLinks={navigationLinks} />
                      <main>{children}</main>
                      <Footer />
                  </>
              )}
              <ThemeColorRuntime />
              <GlobalLoading />
              <LoadingInitializer />
              <EmergencyReset />
          </VisaDataProvider>
        </LoadingProvider>

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
