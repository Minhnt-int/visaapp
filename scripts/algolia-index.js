require('dotenv').config({ path: '.env.local' });

const algoliasearch = require('algoliasearch');
const { visaCategories, tourCategories } = require('../lib/data.ts');

async function main() {
  if (!process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || !process.env.ALGOLIA_ADMIN_KEY || !process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME) {
    throw new Error('Missing Algolia environment variables.');
  }

  const client = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.ALGOLIA_ADMIN_KEY
  );

  const index = client.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME);
  console.log('Successfully connected to Algolia index:', process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME);

  const records = [];

  for (const categoryKey in visaCategories) {
    const category = visaCategories[categoryKey];
    for (const country of category.countries) {
      records.push({
        objectID: `visa-${country.slug}`,
        type: 'Dịch vụ Visa',
        category: category.name,
        name: country.name,
        slug: `/dich-vu/${categoryKey}/${country.slug}`,
        image: country.image
      });
    }
  }

  for (const continentKey in tourCategories) {
    const continent = tourCategories[continentKey];
    for (const tour of continent.tours) {
      for (const destination of tour.destinations) {
        records.push({
          objectID: `tour-${destination.slug}`,
          type: 'Tour Du Lịch',
          category: continent.slug,
          name: destination.name,
          slug: `/tour-du-lich/${continentKey}/${tour.slug}/${destination.slug}`,
          image: destination.image
        });
      }
    }
  }

  console.log(`Prepared ${records.length} records for indexing...`);

  try {
    await index.clearObjects();
    console.log('Cleared existing objects from the index.');

    const { objectIDs } = await index.saveObjects(records);
    console.log(`Successfully indexed ${objectIDs.length} records to Algolia.`);

  } catch (error) {
    console.error('Error indexing data to Algolia:', error);
  }
}

main().catch(console.error);
