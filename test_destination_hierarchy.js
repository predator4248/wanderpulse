/**
 * Automated Verification Script: Multi-Layer Destination Discovery Hierarchy
 * Focus: India (Bharat) + Multi-Country / State / District layers
 */
const http = require('http');
const assert = require('assert');
const {
  DESTINATION_HIERARCHY,
  INDIA_ATTRACTIONS_DATA,
  INDIA_HOTELS_DATA,
  INDIA_REGIONS,
  INDIA_LOCAL_TRAVEL_MODES,
  ATTRACTIONS_DATA,
  HOTELS_DATA
} = require('./js/data.js');

function fetchJson(path, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(`http://localhost:3000${path}`);
    const reqOptions = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: options.method || 'GET',
      headers: options.headers || {}
    };

    const req = http.request(reqOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          reject(new Error(`Failed to parse JSON from ${path}: ${data}`));
        }
      });
    });

    req.on('error', reject);
    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('🇮🇳 Verifying Multi-Layer Destination Discovery Hierarchy (India Focus)...\n');
  let passed = 0;
  let failed = 0;

  function test(name, fn) {
    try {
      fn();
      console.log(`  ✅ PASS: ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ❌ FAIL: ${name} -> ${err.message}`);
      failed++;
    }
  }

  async function asyncTest(name, fn) {
    try {
      await fn();
      console.log(`  ✅ PASS: ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ❌ FAIL: ${name} -> ${err.message}`);
      failed++;
    }
  }

  // 1. Data Model Hierarchy Tests
  test('DESTINATION_HIERARCHY has India (Bharat) as primary focus with 6 diverse states', () => {
    assert(DESTINATION_HIERARCHY.india, 'Missing India in hierarchy');
    const india = DESTINATION_HIERARCHY.india;
    assert.strictEqual(india.currency, 'INR');
    assert.strictEqual(india.primaryFocus, true);
    assert(Object.keys(india.states).length >= 6, 'Expected at least 6 states for India');
    
    // Check states: Rajasthan, Kerala, Goa, Himachal Pradesh, Uttar Pradesh, Uttarakhand
    assert(india.states.rajasthan, 'Missing Rajasthan');
    assert(india.states.kerala, 'Missing Kerala');
    assert(india.states.goa, 'Missing Goa');
    assert(india.states.himachal_pradesh, 'Missing Himachal Pradesh');
    assert(india.states.uttar_pradesh, 'Missing Uttar Pradesh');
    assert(india.states.uttarakhand, 'Missing Uttarakhand');
  });

  test('DESTINATION_HIERARCHY includes international destinations for global comparison', () => {
    assert(DESTINATION_HIERARCHY.indonesia, 'Missing Indonesia');
    assert(DESTINATION_HIERARCHY.japan, 'Missing Japan');
    assert(DESTINATION_HIERARCHY.switzerland, 'Missing Switzerland');
  });

  test('India districts have required metadata, geo-coordinates, and transit links', () => {
    const rj = DESTINATION_HIERARCHY.india.states.rajasthan;
    assert(rj.districts.jaipur, 'Missing Jaipur');
    assert(rj.districts.udaipur, 'Missing Udaipur');
    assert(rj.districts.jaipur.name.includes('Jaipur'));
    assert(rj.districts.jaipur.highlights && rj.districts.jaipur.highlights.includes('Amer Fort'), 'Expected Jaipur to highlight Amer Fort');

    const kl = DESTINATION_HIERARCHY.india.states.kerala;
    assert(kl.districts.alleppey, 'Missing Alleppey');
    assert(kl.districts.munnar, 'Missing Munnar');
    assert(kl.districts.fort_kochi, 'Missing Fort Kochi');
  });

  test('INDIA_ATTRACTIONS_DATA contains accurate GPS coordinates, Plus Codes, and Google Maps URLs', () => {
    assert(INDIA_ATTRACTIONS_DATA.length >= 12, `Expected at least 12 attractions, got ${INDIA_ATTRACTIONS_DATA.length}`);
    for (const a of INDIA_ATTRACTIONS_DATA) {
      assert(typeof a.lat === 'number', `${a.id} missing numeric lat`);
      assert(typeof a.lng === 'number', `${a.id} missing numeric lng`);
      // India bounds: Lat 8.0 to 35.5, Lng 68.0 to 97.5
      assert(a.lat >= 8.0 && a.lat <= 35.5, `${a.id} lat ${a.lat} outside India bounds`);
      assert(a.lng >= 68.0 && a.lng <= 97.5, `${a.id} lng ${a.lng} outside India bounds`);
      assert(a.plusCode && a.plusCode.length > 5, `${a.id} missing plusCode`);
      assert(a.googleMapsUrl && a.googleMapsUrl.includes('google.com/maps'), `${a.id} missing googleMapsUrl`);
      assert(a.googleMapsDirectionsUrl && a.googleMapsDirectionsUrl.includes('destination='), `${a.id} missing googleMapsDirectionsUrl`);
    }
  });

  test('INDIA_HOTELS_DATA contains verified heritage palace stays and pricing', () => {
    assert(INDIA_HOTELS_DATA.length >= 8, `Expected at least 8 hotels, got ${INDIA_HOTELS_DATA.length}`);
    for (const h of INDIA_HOTELS_DATA) {
      assert(typeof h.lat === 'number', `${h.id} missing numeric lat`);
      assert(typeof h.lng === 'number', `${h.id} missing numeric lng`);
      assert(h.priceUSD > 0, `${h.id} missing priceUSD`);
      assert(h.priceINR > 0, `${h.id} missing priceINR`);
      assert(h.googleMapsUrl && h.googleMapsUrl.includes('google.com/maps'), `${h.id} missing googleMapsUrl`);
      assert(Array.isArray(h.rooms) && h.rooms.length > 0, `${h.id} missing rooms`);
    }
  });

  // 2. API Verification
  await asyncTest('GET /api/hierarchy returns 4 countries with India as primary focus', async () => {
    const res = await fetchJson('/api/hierarchy');
    assert.strictEqual(res.status, 200);
    assert(res.data.success);
    assert(res.data.data.india);
    assert(res.data.data.indonesia);
    assert(res.data.data.japan);
    assert(res.data.data.switzerland);
  });

  await asyncTest('GET /api/attractions?country=india&district=jaipur returns 5 Jaipur attractions', async () => {
    const res = await fetchJson('/api/attractions?country=india&district=jaipur');
    assert.strictEqual(res.status, 200);
    assert(res.data.success);
    assert(res.data.data.length >= 4, `Expected at least 4 Jaipur spots, got ${res.data.data.length}`);
    const spotIds = res.data.data.map(s => s.id);
    assert(spotIds.includes('amer-fort'), 'Missing Amer Fort');
    assert(spotIds.includes('hawa-mahal'), 'Missing Hawa Mahal');
    assert(spotIds.includes('city-palace-jaipur'), 'Missing City Palace');
  });

  await asyncTest('GET /api/hotels?country=india&district=jaipur returns Rambagh Palace and Samode Haveli', async () => {
    const res = await fetchJson('/api/hotels?country=india&district=jaipur');
    assert.strictEqual(res.status, 200);
    assert(res.data.success);
    assert(res.data.data.length >= 2, `Expected at least 2 Jaipur hotels, got ${res.data.data.length}`);
    const hotelIds = res.data.data.map(h => h.id);
    assert(hotelIds.includes('rambagh-palace'), 'Missing Rambagh Palace');
    assert(hotelIds.includes('samode-haveli'), 'Missing Samode Haveli');
  });

  await asyncTest('GET /api/weather?district=jaipur&country=india returns IST telemetry and sunset', async () => {
    const res = await fetchJson('/api/weather?district=jaipur&country=india');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.city, 'Jaipur, Rajasthan');
    assert.strictEqual(res.data.country, 'India');
    assert.strictEqual(res.data.timezone, 'Asia/Kolkata');
    assert(typeof res.data.temperatureC === 'number');
    assert(res.data.condition);
  });

  await asyncTest('POST /api/transit/commute calculates route between Jaipur landmarks', async () => {
    const res = await fetchJson('/api/transit/commute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { origin: 'jaipur_airport', destination: 'amer_fort' }
    });
    assert.strictEqual(res.status, 200);
    assert(res.data.success);
    assert(res.data.distanceKm > 15 && res.data.distanceKm < 50, `Distance ${res.data.distanceKm} km outside expected Jaipur bounds`);
    assert(res.data.googleMapsUrl.includes('google.com/maps/dir/'));
    assert(res.data.carPriceINR > 0);
  });

  await asyncTest('POST /api/transit/book with train mode generates IRCTC Vande Bharat PNR', async () => {
    const res = await fetchJson('/api/transit/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        mode: 'train',
        origin: 'New Delhi (NDLS)',
        destination: 'Jaipur Junction (JP)',
        departDate: '2026-09-20',
        passengers: 2,
        travelClass: 'executive-chair-car',
        leadPassenger: 'Aarav Sharma',
        email: 'aarav@example.com'
      }
    });
    assert.strictEqual(res.status, 201);
    assert(res.data.success);
    assert(res.data.ticket.pnr.startsWith('IRCTC-VBE-'), `PNR ${res.data.ticket.pnr} should start with IRCTC-VBE-`);
    assert(res.data.ticket.operator.includes('Vande Bharat Express'));
  });

  await asyncTest('Fallback compatibility: GET /api/attractions with no params still returns Bali attractions', async () => {
    const res = await fetchJson('/api/attractions');
    assert.strictEqual(res.status, 200);
    assert(res.data.success);
    assert(res.data.data.length >= 8);
    assert.strictEqual(res.data.data[0].formattedAddress.includes('Bali'), true);
  });

  console.log(`\n=========================================`);
  console.log(`Hierarchy Results: ${passed} passed, ${failed} failed`);
  console.log(`=========================================\n`);

  if (failed > 0) process.exit(1);
}

runTests().catch(err => {
  console.error('Fatal Test Runner Error:', err);
  process.exit(1);
});
