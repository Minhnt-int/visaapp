'use client';

import React, { createContext, useContext, useMemo } from 'react';
import algoliasearch, { SearchClient } from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch';

interface SearchContextProps {
  searchClient: SearchClient;
  indexName: string;
}

const SearchContext = createContext<SearchContextProps | null>(null);

export function SearchProvider({ children, algoliaConfig }: { children: React.ReactNode, algoliaConfig: { appId: string, apiKey: string, indexName: string } }) {
  const searchClient = useMemo(() => {
    if (!algoliaConfig.appId || !algoliaConfig.apiKey) {
        // Return a dummy client to prevent app crashes when keys are missing.
        // CORRECTED: Use the recommended two-step cast (`as unknown as SearchClient`) 
        // to satisfy TypeScript's stricter type checking.
        return {
            search() {
                return Promise.resolve({ results: [] as any });
            },
            searchForFacetValues() {
                return Promise.resolve([]);
            }
        } as unknown as SearchClient; // This is the key change
    }
    return algoliasearch(algoliaConfig.appId, algoliaConfig.apiKey);
  }, [algoliaConfig]);

  const contextValue: SearchContextProps = {
    searchClient,
    indexName: algoliaConfig.indexName,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      <InstantSearch searchClient={searchClient} indexName={algoliaConfig.indexName}>
        {children}
      </InstantSearch>
    </SearchContext.Provider>
  );
}

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
