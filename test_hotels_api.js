// test_hotels_api.js - Automated Verification Suite for Geoapify Places & Amadeus Hotel Search APIs
const http = require('http');

function request(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${urlPath}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ status: res.statusCode, data: json });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data, error: e.message });
        }
      });
    }).on('error', reject);
  });
}

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failed++;
  }
}

async function runTests() {
  console.log('=== RUNNING GEOAPIFY & AMADEUS HOTELS API VERIFICATION SUITE ===\n');

  // Test 1: Config endpoint
  console.log('1. Checking /api/hotels/config...');
  const cfg = await request('/api/hotels/config');
  assert(cfg.status === 200, `Status is 200 (received ${cfg.status})`);
  assert(cfg.data && cfg.data.success === true, 'Success flag is true');
  assert(typeof cfg.data.amadeusConfigured === 'boolean', 'amadeusConfigured boolean present');
  assert(typeof cfg.data.geoapifyConfigured === 'boolean', 'geoapifyConfigured boolean present');

  // Test 2: Geoapify Places Accommodation Endpoint
  console.log('\n2. Checking /api/hotels/geoapify (Geoapify Places API)...');
  const geo = await request('/api/hotels/geoapify');
  assert(geo.status === 200, `Status is 200 (received ${geo.status})`);
  assert(geo.data && geo.data.success === true, 'Geoapify endpoint success is true');
  assert(Array.isArray(geo.data.data) && geo.data.data.length >= 6, `Returned ${geo.data.data ? geo.data.data.length : 0} hotel GIS entries (>= 6 expected)`);
  const firstGeo = geo.data.data[0];
  assert(firstGeo.properties && firstGeo.properties.formatted, 'Properties include formatted address');
  assert(firstGeo.geometry && Array.isArray(firstGeo.geometry.coordinates), 'Geometry coordinates [lng, lat] present');

  // Test 3: Amadeus Hotel List Endpoint
  console.log('\n3. Checking /api/hotels/amadeus/list (Amadeus Hotel Discovery)...');
  const amadList = await request('/api/hotels/amadeus/list?cityCode=DPS');
  assert(amadList.status === 200, `Status is 200 (received ${amadList.status})`);
  assert(amadList.data && amadList.data.success === true, 'Amadeus list endpoint success is true');
  assert(Array.isArray(amadList.data.data) && amadList.data.data.length >= 6, `Returned ${amadList.data.data ? amadList.data.data.length : 0} GDS hotels`);
  const firstAmad = amadList.data.data[0];
  assert(firstAmad.chainCode && firstAmad.hotelId, `GDS hotel includes chainCode: ${firstAmad.chainCode}, hotelId: ${firstAmad.hotelId}`);
  assert(firstAmad.iataCode === 'DPS', 'IATA city code is DPS (Bali)');

  // Test 4: Amadeus Hotel Offers & Pricing Endpoint
  console.log('\n4. Checking /api/hotels/amadeus/offers (Amadeus Live Rates)...');
  const amadOffers = await request('/api/hotels/amadeus/offers?checkInDate=2026-10-01&checkOutDate=2026-10-04&adults=2');
  assert(amadOffers.status === 200, `Status is 200 (received ${amadOffers.status})`);
  assert(amadOffers.data && amadOffers.data.success === true, 'Offers success is true');
  assert(Array.isArray(amadOffers.data.data) && amadOffers.data.data.length >= 6, `Returned ${amadOffers.data.data ? amadOffers.data.data.length : 0} offer packages`);
  const offerItem = amadOffers.data.data[0];
  assert(offerItem.offers && offerItem.offers.length > 0, 'Offers list populated');
  const subOffer = offerItem.offers[0];
  assert(subOffer.price && subOffer.price.total && subOffer.price.currency === 'USD', `Pricing is USD (${subOffer.price ? subOffer.price.total : 'N/A'})`);
  assert(subOffer.rateCode, `Rate code present: ${subOffer.rateCode}`);

  // Test 5: Enhanced /api/hotels Main Endpoint
  console.log('\n5. Checking /api/hotels with Proximity & Date intelligence...');
  const allHotels = await request('/api/hotels?checkIn=2026-11-01&checkOut=2026-11-05&guests=2');
  assert(allHotels.status === 200, `Status is 200 (received ${allHotels.status})`);
  assert(allHotels.data.count === 6, 'All 6 hotels returned');
  assert(allHotels.data.nights === 4, `Computed nights is 4 (got ${allHotels.data.nights})`);
  const hotelWithOffer = allHotels.data.data[0];
  assert(hotelWithOffer.amadeusOffer, 'Hotel has amadeusOffer attached');
  assert(hotelWithOffer.amadeusOffer.nights === 4, 'Offer reflects 4 nights');
  assert(hotelWithOffer.amadeusOffer.price.taxUSD > 0, `11% Indonesian VAT computed ($${hotelWithOffer.amadeusOffer.price.taxUSD})`);

  // Test 6: Proximity calculation to Tanah Lot
  console.log('\n6. Checking /api/hotels?proximitySpot=tanah-lot (Geoapify Proximity Sorting)...');
  const proxHotels = await request('/api/hotels?proximitySpot=tanah-lot');
  assert(proxHotels.status === 200, 'Status is 200');
  const closest = proxHotels.data.data[0];
  assert(closest.id === 'kos-one-hostel', `Closest hotel to Tanah Lot is Kos One Hostel (got ${closest.id})`);
  assert(closest.geoapifyProximity && closest.geoapifyProximity.distanceKm < 10, `Distance is ${closest.geoapifyProximity ? closest.geoapifyProximity.distanceKm : 'N/A'} km (< 10km expected)`);
  assert(closest.geoapifyProximity.spotName.toLowerCase().includes('tanah lot'), `Spot name matches (${closest.geoapifyProximity.spotName})`);

  // Test 7: Query search filtering
  console.log('\n7. Checking /api/hotels?query=Ubud (Keyword search)...');
  const ubudHotels = await request('/api/hotels?query=Ubud');
  assert(ubudHotels.status === 200, 'Status is 200');
  assert(ubudHotels.data.data.length > 0, `Found ${ubudHotels.data.data.length} Ubud hotels`);
  const hasViceroy = ubudHotels.data.data.some(h => h.id === 'viceroy-bali');
  assert(hasViceroy, 'Viceroy Bali (in Ubud) is matched in results');

  console.log(`\n=== RESULTS: ${passed} PASSED, ${failed} FAILED ===\n`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch(e => {
  console.error('Test run failed:', e);
  process.exit(1);
});
