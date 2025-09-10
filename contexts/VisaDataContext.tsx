'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { VisaCountryItem, getAllVisaCountries, groupCountriesByCategory } from '@/lib/api';

interface VisaDataContextType {
  countries: VisaCountryItem[];
  groupedCountries: Record<string, VisaCountryItem[]>;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

const VisaDataContext = createContext<VisaDataContextType | null>(null);

export function VisaDataProvider({ children }: { children: React.ReactNode }) {
  const [countries, setCountries] = useState<VisaCountryItem[]>([]);
  const [groupedCountries, setGroupedCountries] = useState<Record<string, VisaCountryItem[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Loading visa countries data...');
      const data = await getAllVisaCountries();
      
      setCountries(data);
      setGroupedCountries(groupCountriesByCategory(data));
      
      console.log('✅ Visa countries data loaded:', {
        totalCountries: data.length,
        categories: Object.keys(groupCountriesByCategory(data))
      });
      
    } catch (err) {
      console.error('❌ Error loading visa data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load visa data');
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
    countries,
    groupedCountries,
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

// Helper hooks for specific use cases
export function useVisaCountriesByCategory(categorySlug: string) {
  const { groupedCountries, loading, error } = useVisaData();
  
  return {
    countries: groupedCountries[categorySlug] || [],
    loading,
    error
  };
}

export function useVisaCountryBySlug(categorySlug: string, countrySlug: string) {
  const { countries, loading, error } = useVisaData();
  
  const country = countries.find(
    c => c.categorySlug === categorySlug && c.slug === countrySlug
  );
  
  return {
    country: country || null,
    loading,
    error
  };
}
