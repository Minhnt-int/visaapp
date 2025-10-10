/* eslint-disable no-console */
const path = require('path');
const dotenv = require('dotenv');

// CORRECTED: Resolve path to .env.local relative to this script's directory.
// This ensures the file is always found, regardless of where the script is run from.
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const algoliasearch = require('algoliasearch');
const {
  mockVisaPageData,
  mockTours,
  mockNews,
  mockTourCategories,
  mockVisaContinents
} = require('../lib/mock-data.js');


// Check for Algolia environment variables
if (!process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || !process.env.ALGOLIA_ADMIN_KEY || !process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || process.env.NEXT_PUBLIC_ALGOLIA_APP_ID === 'your_app_id') {
  console.error('Algolia environment variables are not set correctly. Please check your visaapp/.env.local file.');
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
    const records = [];

    // 1. Process Visa Data
    console.log('... Processing Visa data');
    for (const visaDetail of mockVisaPageData) {
        const continent = mockVisaContinents.find(c => c.slug === visaDetail.continentSlug);
        records.push({
            objectID: `${visaDetail.slug}`,
            type: 'visa',
            title: visaDetail.title,
            description: visaDetail.description,
            path: `/dich-vu/${visaDetail.continentSlug}/${visaDetail.slug}`,
            continent: continent ? continent.slug : visaDetail.continentSlug,
            country: visaDetail.countryName,
            tags: ['visa', visaDetail.countryName, continent ? continent.name : visaDetail.continentSlug],
            image: visaDetail.heroImage,
        });
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
        tags: post.keyword ? ['blog', ...post.keyword] : ['blog', 'Tin tức'],
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
