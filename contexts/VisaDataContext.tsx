'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getVisaCategories } from '@/lib/api'; // Use the new API call
import { VisaCategory } from '@/types'; // Use the updated VisaCategory type

interface VisaDataContextType {
  visaCategories: VisaCategory[];
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

const VisaDataContext = createContext<VisaDataContextType | null>(null);

export function VisaDataProvider({ children }: { children: React.ReactNode }) {
  const [visaCategories, setVisaCategories] = useState<VisaCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch both static categories and dynamic country data
      const [categories, countriesRes] = await Promise.all([
        getVisaCategories(),
        fetch('/api/visa').then(res => res.json())
      ]);
      
      // If we have country data, attach it to the matching category
      if (countriesRes.success && countriesRes.data) {
        const countriesByContinent = countriesRes.data;
        
        // Combine static categories with dynamic country lists
        const enrichedCategories = categories.map(category => ({
          ...category,
          countries: countriesByContinent[category.slug] || []
        }));
        
        setVisaCategories(enrichedCategories);
      } else {
        setVisaCategories(categories);
      }
      
    } catch (err) {
      console.error('❌ Error loading visa categories:', err); 
      setError(err instanceof Error ? err.message : 'Failed to load visa categories');
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

// No longer directly grouping countries by category here
// The data now comes pre-grouped by category from the API (mock data)

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
