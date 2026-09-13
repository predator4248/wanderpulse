/**
 * Automated Verification Script: Bali Location Accuracy & Geoapify Integration
 */
const http = require('http');
const assert = require('assert');
const { ATTRACTIONS_DATA, HOTELS_DATA, GEOAPIFY_VERIFIED_PLACES } = require('./js/data.js');

function fetchJson(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          reject(new Error(`Failed to parse JSON from ${path}: ${data}`));
        }
      });
    }).on('error', reject);
  });
}

async function runTests() {
  console.log('🌍 Verifying Bali Location Accuracy & Geoapify API Integration...\n');
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

  // 1. Data model tests
  test('All attractions have 6-decimal coordinates and Google Maps links', () => {
    assert(ATTRACTIONS_DATA.length >= 8, 'Expected at least 8 attractions');
    for (const a of ATTRACTIONS_DATA) {
      assert(typeof a.lat === 'number', `${a.id} missing numeric lat`);
      assert(typeof a.lng === 'number', `${a.id} missing numeric lng`);
      assert(a.lat < -8.0 && a.lat > -9.0, `${a.id} lat ${a.lat} outside Bali latitude range (-9.0 to -8.0)`);
      assert(a.lng > 114.4 && a.lng < 115.8, `${a.id} lng ${a.lng} outside Bali longitude range (114.4 to 115.8)`);
      assert(a.formattedAddress && a.formattedAddress.length > 10, `${a.id} missing formattedAddress`);
      assert(a.googleMapsUrl && a.googleMapsUrl.includes(a.lat.toFixed(6)), `${a.id} googleMapsUrl does not contain lat`);
      assert(a.googleMapsDirectionsUrl && a.googleMapsDirectionsUrl.includes(a.lat.toFixed(6)), `${a.id} directions URL does not contain lat`);
    }
  });

  test('All hotels have 6-decimal coordinates and Google Maps links', () => {
    assert(HOTELS_DATA.length >= 6, `Expected at least 6 hotels, got ${HOTELS_DATA.length}`);
    for (const h of HOTELS_DATA) {
      assert(typeof h.lat === 'number', `${h.id} missing numeric lat`);
      assert(typeof h.lng === 'number', `${h.id} missing numeric lng`);
      assert(h.lat < -8.0 && h.lat > -9.0, `${h.id} lat ${h.lat} outside Bali latitude range (-9.0 to -8.0)`);
      assert(h.lng > 114.4 && h.lng < 115.8, `${h.id} lng ${h.lng} outside Bali longitude range (114.4 to 115.8)`);
      assert(h.formattedAddress && h.formattedAddress.length > 10, `${h.id} missing formattedAddress`);
      assert(h.googleMapsUrl && h.googleMapsUrl.includes(h.lat.toFixed(6)), `${h.id} googleMapsUrl does not contain lat`);
      assert(h.googleMapsDirectionsUrl && h.googleMapsDirectionsUrl.includes(h.lat.toFixed(6)), `${h.id} directions URL does not contain lat`);
    }
  });

  test('GEOAPIFY_VERIFIED_PLACES dictionary has 15 verified entries', () => {
    const keys = Object.keys(GEOAPIFY_VERIFIED_PLACES);
    assert(keys.length >= 15, `Expected 15 entries, got ${keys.length}`);
    for (const [id, place] of Object.entries(GEOAPIFY_VERIFIED_PLACES)) {
      assert(place.lat && place.lng, `${id} missing lat/lng`);
      assert(place.formattedAddress, `${id} missing formattedAddress`);
      assert(place.googleMapsUrl, `${id} missing googleMapsUrl`);
    }
  });

  // 2. 3D GIS projection math tests
  test('GIS latLngTo3D mathematical projection produces bounded coordinates', () => {
    const scale = 16.5;
    const centerLat = -8.50;
    const centerLng = 115.22;
    function project(lat, lng) {
      return {
        x: (lng - centerLng) * scale,
        z: -(lat - centerLat) * scale
      };
    }
    const tanahLot3D = project(-8.621213, 115.086787);
    assert(Math.abs(tanahLot3D.x) < 5.0, `tanahLot x ${tanahLot3D.x} out of bounds`);
    assert(Math.abs(tanahLot3D.z) < 5.0, `tanahLot z ${tanahLot3D.z} out of bounds`);

    const batur3D = project(-8.242222, 115.375278);
    assert(batur3D.z < 0, 'Mount Batur should project to northern Bali (negative z in Three.js coordinates)');
    assert(tanahLot3D.z > 0, 'Tanah Lot should project to southern Bali (positive z in Three.js coordinates)');
  });

  // 3. Backend API endpoint tests
  await asyncTest('GET /api/places/config returns API configuration', async () => {
    const res = await fetchJson('/api/places/config');
    assert.strictEqual(res.status, 200);
    assert(res.data.status === 'ok');
    assert('hasApiKey' in res.data);
    assert('source' in res.data);
  });

  await asyncTest('GET /api/places/geoapify?query=Tanah+Lot returns exact verified match', async () => {
    const res = await fetchJson('/api/places/geoapify?query=Tanah+Lot');
    assert.strictEqual(res.status, 200);
    assert(res.data.status === 'ok');
    assert(res.data.items.length >= 1, 'Expected at least 1 match');
    const first = res.data.items[0];
    assert(first.name.includes('Tanah Lot'), `Expected Tanah Lot, got ${first.name}`);
    assert.strictEqual(first.lat, -8.621213);
    assert(Math.abs(first.lng - 115.086782) < 0.0001, `Expected ~115.086782, got ${first.lng}`);
    assert(first.googleMapsUrl.includes('-8.621213'));
  });

  await asyncTest('GET /api/places/geoapify?lat=-8.5190&lon=115.2584 sorts by Haversine distance', async () => {
    const res = await fetchJson('/api/places/geoapify?lat=-8.5190&lon=115.2584&radius=15000');
    assert.strictEqual(res.status, 200);
    assert(res.data.items.length >= 2, 'Expected multiple nearby results');
    // Verify distance sorting
    for (let i = 0; i < res.data.items.length - 1; i++) {
      assert(res.data.items[i].distanceMeters <= res.data.items[i + 1].distanceMeters,
        `Items not sorted by distance: ${res.data.items[i].distanceMeters} > ${res.data.items[i + 1].distanceMeters}`);
    }
  });

  await asyncTest('GET /api/places/verify/uluwatu-temple returns verified GIS record', async () => {
    const res = await fetchJson('/api/places/verify/uluwatu-temple');
    assert.strictEqual(res.status, 200);
    assert(res.data.status === 'ok');
    assert(Math.abs(res.data.place.lat - (-8.829141)) < 0.0001);
    assert(Math.abs(res.data.place.lng - 115.084915) < 0.0001);
    assert(res.data.place.googleMapsUrl.includes('-8.829141'));
  });

  await asyncTest('GET /api/places/verify/invalid-spot returns 404', async () => {
    const res = await fetchJson('/api/places/verify/invalid-spot');
    assert.strictEqual(res.status, 404);
    assert.strictEqual(res.data.status, 'not_found');
  });

  console.log('\n=========================================');
  console.log(`Verification Results: ${passed} passed, ${failed} failed`);
  console.log('=========================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
