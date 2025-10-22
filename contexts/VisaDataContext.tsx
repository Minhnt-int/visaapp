'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getTourCategories, getVisaContinents, getNewsPreview, getNavigationLinks, getContactInfo, getServices } from '@/lib/api';
import { ContactInfo, NewsPreview, TourCategory, VisaContinent, NavItem } from '@/types';

interface VisaDataContextType {
  visaCategories: VisaContinent[];
  tourCategories: TourCategory[];
  newsPreview: NewsPreview[];
  navItem: NavItem[];
  contactInfo: ContactInfo;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

const VisaDataContext = createContext<VisaDataContextType | null>(null);

export function VisaDataProvider({ children }: { children: React.ReactNode }) {
  const [visaCategories, setVisaCategories] = useState<VisaContinent[]>([]);
  const [tourCategories, setTourCategories] = useState<TourCategory[]>([]);
  const [newsPreview, setNewsPreview] = useState<NewsPreview[]>([]);
  const [navItem, setNavItem] = useState<NavItem[]>([]);
  // CORRECTED: Initial state now matches the ContactInfo type definition.
  const [contactInfo, setContactInfo] = useState<ContactInfo>({ 
    address: '',
    phone: '',
    email: '',
    website: '',
    facebook: '',
    zalo: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [visaCatsRes, countriesRes, tourCatsRes, newsPreviewData, contactInfoData, navItemData] = await Promise.all([
        getVisaContinents(),
        getServices({ limit: 1000 }), // Use new API function
        getTourCategories(),
        getNewsPreview(),
        getContactInfo(),
        getNavigationLinks()
      ]);

      // Enrich visa categories with country data for other pages
      if (countriesRes && countriesRes.data) {
        const services = countriesRes.data;
        const countriesByContinent: { [key: string]: any[] } = {};
        
        // Group services by continent
        services.forEach((service: any) => {
          const continentSlug = service.continentSlug || service.continent_slug;
          if (continentSlug) {
            if (!countriesByContinent[continentSlug]) {
              countriesByContinent[continentSlug] = [];
            }
            countriesByContinent[continentSlug].push({
              id: service.id || service.slug,
              slug: service.slug,
              name: service.country || service.country_name,
              image: service.image || service.hero_image,
              description: service.description
            });
          }
        });
        
        const enrichedCategories = visaCatsRes.map((category: VisaContinent) => ({
          ...category,
          countries: countriesByContinent[category.slug] || []
        }));
        setVisaCategories(enrichedCategories);
      } else {
        setVisaCategories(visaCatsRes);
      }

      setTourCategories(tourCatsRes);
      setNewsPreview(Array.isArray(newsPreviewData.data) ? newsPreviewData.data : []);
      setContactInfo(contactInfoData);
      setNavItem(navItemData); // Set the navigation data for the header

    } catch (err) {
      console.error('❌ Error loading application data:', err); 
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    await loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  const value: VisaDataContextType = {
    visaCategories,
    tourCategories ,
    newsPreview,
    contactInfo,
    navItem,
    loading,
    error,
    refreshData
  };

  return (
    <VisaDataContext.Provider value={value}>
      {children}
    </VisaDataContext.Provider>
  );
}

export function useVisaData() {
  const context = useContext(VisaDataContext);
  if (!context) {
    throw new Error('useVisaData must be used within a VisaDataProvider');
  }
  return context;
}


export function useVisaCategoryBySlug(categorySlug: string) {
  const { visaCategories, loading, error } = useVisaData();
  
  const category = visaCategories.find(
    cat => cat.slug === categorySlug
  );
  
  return {
    category: category || null,
    loading,
    error
  };
}
