/**
 * Script to test Algolia connection and configuration
 */

require('dotenv').config({ path: '.env.local' });

const algoliasearch = require('algoliasearch');

async function testAlgolia() {
  console.log('🔍 Testing Algolia configuration...\n');

  // Check environment variables
  const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
  const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY;
  const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || 'Kim Quy Travel';

  console.log('Environment Variables:');
  console.log(`  NEXT_PUBLIC_ALGOLIA_APP_ID: ${appId ? '✅ Set' : '❌ Missing'}`);
  console.log(`  NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY: ${apiKey ? '✅ Set' : '❌ Missing'}`);
  console.log(`  NEXT_PUBLIC_ALGOLIA_INDEX_NAME: ${indexName}\n`);

  if (!appId || !apiKey) {
    console.error('❌ Algolia is not configured. Please set environment variables in .env.local');
    console.log('\nExample .env.local:');
    console.log('NEXT_PUBLIC_ALGOLIA_APP_ID=your_app_id');
    console.log('NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY=your_search_key');
    console.log('NEXT_PUBLIC_ALGOLIA_INDEX_NAME=Kim Quy Travel');
    process.exit(1);
  }

  try {
    // Initialize Algolia client
    console.log('📡 Connecting to Algolia...');
    const client = algoliasearch(appId, apiKey);
    const index = client.initIndex(indexName);

    // Test connection by searching
    console.log(`🔍 Testing search on index: ${indexName}...`);
    const result = await index.search('', {
      hitsPerPage: 5,
      facetFilters: ['type:visa']
    });

    console.log(`✅ Algolia connection successful!`);
    console.log(`\nIndex Statistics:`);
    console.log(`  Total hits: ${result.nbHits}`);
    console.log(`  Processing time: ${result.processingTimeMS}ms`);
    console.log(`  Pages: ${result.nbPages}`);

    if (result.hits.length > 0) {
      console.log(`\nSample hits (${result.hits.length}):`);
      result.hits.forEach((hit, i) => {
        console.log(`  ${i + 1}. ${hit.country || hit.title || hit.objectID}`);
      });
    } else {
      console.log('\n⚠️  No hits found. Index might be empty or facetFilters are too restrictive.');
    }

    // Test without filters
    console.log(`\n🔍 Testing search without filters...`);
    const resultAll = await index.search('', { hitsPerPage: 5 });
    console.log(`  Total hits: ${resultAll.nbHits}`);

    console.log('\n✅ Algolia is working correctly!');
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Algolia connection failed:');
    console.error(`  Error: ${error.message}`);
    
    if (error.message.includes('Invalid Application-ID')) {
      console.error('\n  Possible causes:');
      console.error('    - Invalid NEXT_PUBLIC_ALGOLIA_APP_ID');
    } else if (error.message.includes('Invalid API key')) {
      console.error('\n  Possible causes:');
      console.error('    - Invalid NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY');
      console.error('    - Using Admin API key instead of Search-only key');
    } else if (error.message.includes('Index does not exist')) {
      console.error('\n  Possible causes:');
      console.error(`    - Index "${indexName}" does not exist`);
      console.error('    - Run: npm run algolia-sync to sync data');
    }

    process.exit(1);
  }
}

testAlgolia();

