import { NextResponse } from 'next/server';
// CORRECTED: Import from the correct file path and add necessary data
import { mockVisaCategories, mockTourCategories, mockVisaPageData } from '@/lib/mock-data';

export const dynamic = 'force-dynamic';

interface SearchResult {
  title: string;
  href: string;
  category: 'Visa' | 'Tour' | 'Tin tức';
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.toLowerCase().trim() || '';

    const allResults: SearchResult[] = [];

    if (!query) {
        return NextResponse.json({ all: [] });
    }

    // Search Visa Services
    // CORRECTED: The original logic was broken. This now searches through the actual visa page data.
    mockVisaCategories.forEach(category => {
      category.countries.forEach(country => {
        const visaPage = mockVisaPageData[country.slug];
        if (visaPage && (visaPage.title.toLowerCase().includes(query) || country.name.toLowerCase().includes(query))) {
          allResults.push({
            title: visaPage.title,
            href: `/dich-vu/${category.slug}/${country.slug}`,
            category: 'Visa',
          });
        }
      });
    });

    // Search Tours
    mockTourCategories.forEach(category => {
      category.tours.forEach(tour => {
        if (tour.name.toLowerCase().includes(query)) {
          allResults.push({
            title: tour.name,
            href: `/tour-du-lich/${category.slug}/${tour.slug}`,
            category: 'Tour',
          });
        }
      });
    });

    // In the future, we could add News search here as well.

    return NextResponse.json({ all: allResults.slice(0, 10) }); // Return top 10 results

  } catch (error) {
    console.error('Search API error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
