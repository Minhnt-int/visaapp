
/* eslint-disable no-console */
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import algoliasearch from 'algoliasearch';
import {
  mockVisaContinents,
  mockVisaPageData,
  mockTours,
  mockNews,
  mockTourCategories
} from '../lib/mock-data';

interface AlgoliaRecord {
  objectID: string;
  type: 'visa' | 'tour' | 'blog';
  title: string;
  description: string;
  path: string;
  continent?: string;
  country?: string;
  tags?: string[];
  image: string;
}

// Check for Algolia environment variables
if (!process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || !process.env.ALGOLIA_ADMIN_KEY || !process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME) {
  console.error('Algolia environment variables are not set. Please check your .env.local file.');
  process.exit(1);
}

// Initialize Algolia client
const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_KEY
);

const index = client.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME);

async function syncData() {
  try {
    console.log('🚀 Starting Algolia sync...');
    const records: AlgoliaRecord[] = [];

    // 1. Process Visa Data
    console.log('... Processing Visa data');
    for (const category of mockVisaContinents) {
      for (const country of category.countries) {
        const visaDetail = mockVisaPageData[country.slug];
        if (visaDetail) {
          records.push({
            objectID: `visa-${country.slug}`,
            type: 'visa',
            title: visaDetail.title,
            description: visaDetail.description,
            path: `/dich-vu/${category.slug}/${country.slug}`,
            continent: category.name,
            country: country.name,
            tags: ['visa', country.name, category.name],
            image: visaDetail.heroImage,
          });
        }
      }
    }

    // 2. Process Tour Data
    console.log('... Processing Tour data');
    for (const tour of mockTours) {
      const category = mockTourCategories.find(c => c.slug === tour.categorySlug);
      const description = tour.highlights ? tour.highlights.map(h => h.title).join('. ') : tour.name;

      records.push({
        objectID: `tour-${tour.slug}`,
        type: 'tour',
        title: tour.name,
        description: description,
        path: `/tour-du-lich/${tour.categorySlug}/${tour.slug}`,
        continent: category ? category.name : tour.categorySlug,
        country: tour.country,
        tags: ['tour', category ? category.name : tour.categorySlug, tour.country],
        image: tour.image,
      });
    }

    // 3. Process Blog Data
    console.log('... Processing Blog data');
    for (const post of mockNews) {
      records.push({
        objectID: `blog-${post.slug}`,
        type: 'blog',
        title: post.title,
        description: post.excerpt,
        path: `/tin-tuc/${post.slug}`,
        tags: ['blog', 'Tin tức'], // Default category for now
        image: post.avatarUrl, 
      });
    }
    
    console.log(`... Found ${records.length} records to sync.`);

    if (records.length === 0) {
        console.log('No records to sync. Exiting.');
        return;
    }

    // 4. Clear existing index and upload new records
    console.log('... Clearing existing Algolia index.');
    await index.clearObjects();
    
    console.log('... Uploading new records to Algolia.');
    await index.saveObjects(records).wait();

    console.log('✅ Algolia sync completed successfully!');

  } catch (error) {
    console.error('❌ Error during Algolia sync:', error);
    process.exit(1);
  }
}

syncData();
