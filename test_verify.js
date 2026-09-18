/**
 * WANDERPULSE BALI - AUTOMATED ENDPOINT VERIFICATION TEST SUITE
 * Tests: Health Check, Attractions, Hotels, Transit Calculator, Weather, Booking & Newsletter
 */

const http = require('http');
const { spawn } = require('child_process');

const TEST_PORT = 3099;
process.env.PORT = String(TEST_PORT);

console.log('🚀 Starting WanderPulse Bali Test Verification Suite...');

// Start server process
const serverProcess = spawn('node', ['server.js'], {
  env: { ...process.env, PORT: String(TEST_PORT) },
  stdio: 'pipe'
});

let serverReady = false;

serverProcess.stdout.on('data', (data) => {
  const msg = data.toString();
  if (msg.includes('SERVER RUNNING')) {
    serverReady = true;
  }
});

serverProcess.stderr.on('data', (err) => {
  console.error('Server err:', err.toString());
});

async function runTests() {
  // Wait up to 5 seconds for server to start
  for (let i = 0; i < 25; i++) {
    if (serverReady) break;
    await new Promise(r => setTimeout(r, 200));
  }

  const baseUrl = `http://127.0.0.1:${TEST_PORT}`;
  let passed = 0;
  let failed = 0;

  async function testEndpoint(name, url, options = {}, validator) {
    try {
      const res = await fetch(baseUrl + url, options);
      const json = await res.json();
      const isValid = validator(res, json);
      if (isValid) {
        console.log(`  ✅ PASS: ${name}`);
        passed++;
      } else {
        console.error(`  ❌ FAIL: ${name} (validation failed)`);
        console.error('     Response:', JSON.stringify(json).slice(0, 200));
        failed++;
      }
    } catch (err) {
      console.error(`  ❌ FAIL: ${name} (${err.message})`);
      failed++;
    }
  }

  console.log('\n--- Running API Endpoint Checks ---');

  // 1. Health
  await testEndpoint('GET /api/health', '/api/health', {}, (res, json) => {
    return res.status === 200 && json.status === 'online';
  });

  // 2. Attractions
  await testEndpoint('GET /api/attractions', '/api/attractions', {}, (res, json) => {
    return res.status === 200 && json.success && Array.isArray(json.data) && json.data.length >= 6;
  });

  // 3. Attractions Category Filter
  await testEndpoint('GET /api/attractions?category=temple', '/api/attractions?category=temple', {}, (res, json) => {
    return res.status === 200 && json.success && json.data.every(i => i.category === 'temple');
  });

  // 4. Hotels
  await testEndpoint('GET /api/hotels', '/api/hotels', {}, (res, json) => {
    return res.status === 200 && json.success && Array.isArray(json.data) && json.data.length >= 6;
  });

  // 5. Transit Preset
  await testEndpoint('POST /api/transit/route (Preset New York)', '/api/transit/route', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ origin: 'new-york' })
  }, (res, json) => {
    return res.status === 200 && json.success && json.isPreset && json.data.flight;
  });

  // 5b. Transit Preset Jakarta
  await testEndpoint('POST /api/transit/route (Preset Jakarta)', '/api/transit/route', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ origin: 'jakarta' })
  }, (res, json) => {
    return res.status === 200 && json.success && json.isPreset && json.data.trainOption.available;
  });

  // 5c. Transit Preset Melbourne
  await testEndpoint('POST /api/transit/route (Preset Melbourne)', '/api/transit/route', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ origin: 'melbourne' })
  }, (res, json) => {
    return res.status === 200 && json.success && json.isPreset && json.data.flight;
  });

  // 5d. Intra-Island Commute Engine (Airport to Ubud)
  await testEndpoint('POST /api/transit/commute (Airport to Ubud)', '/api/transit/commute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ origin: 'airport', destination: 'ubud' })
  }, (res, json) => {
    return res.status === 200 && json.success && json.distanceKm > 0 && json.durationCar && json.googleMapsUrl;
  });

  // 5e. Marine Conditions API
  await testEndpoint('GET /api/transit/marine-conditions', '/api/transit/marine-conditions', {}, (res, json) => {
    return res.status === 200 && json.success && json.waveHeightM !== undefined && json.status;
  });

  // 6. Transit Custom City
  await testEndpoint('POST /api/transit/route (Custom Berlin)', '/api/transit/route', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ origin: 'Berlin' })
  }, (res, json) => {
    return res.status === 200 && json.success && json.data.flight;
  });

  // 7. Live Weather with 5-Day Forecast (Google Weather API)
  await testEndpoint('GET /api/weather (5-Day Forecast)', '/api/weather', {}, (res, json) => {
    return res.status === 200 &&
      json.temperatureC !== undefined &&
      json.localTime &&
      json.sunset &&
      Array.isArray(json.forecast) &&
      json.forecast.length >= 4 &&
      json.forecast[0].dayName &&
      json.forecast[0].maxTempC !== undefined &&
      json.forecast[0].recommendation &&
      // Wind must be a compact abbreviation (ESE), never a raw Google enum (EAST_SOUTHEAST)
      typeof json.windDirection === 'string' &&
      !json.windDirection.includes('_') &&
      json.windDirection.length <= 3;
  });

  // 7.1. Live Weather Regional Telemetry (Ubud Highlands)
  await testEndpoint('GET /api/weather?region=ubud', '/api/weather?region=ubud', {}, (res, json) => {
    return res.status === 200 &&
      json.temperatureC !== undefined &&
      json.regionKey === 'ubud' &&
      Array.isArray(json.forecast) &&
      json.forecast.length >= 4;
  });

  // 7.2. Real-Time Bali Local News (Google News Syndication)
  await testEndpoint('GET /api/news', '/api/news', {}, (res, json) => {
    return res.status === 200 &&
      json.success === true &&
      Array.isArray(json.articles) &&
      json.articles.length > 0 &&
      json.articles[0].title &&
      json.articles[0].link &&
      json.articles[0].source;
  });

  // 7.3. Bali Local News with Category Filter
  await testEndpoint('GET /api/news?category=tourism', '/api/news?category=tourism', {}, (res, json) => {
    return res.status === 200 &&
      json.success === true &&
      json.category === 'tourism' &&
      Array.isArray(json.articles) &&
      json.articles.length > 0;
  });

  // 7.4. Dispatch hygiene: no duplicated source tail, no raw HTML entities, newest-first
  await testEndpoint('GET /api/news (Headline Hygiene & Ordering)', '/api/news?limit=10', {}, (res, json) => {
    if (res.status !== 200 || !Array.isArray(json.articles) || json.articles.length === 0) return false;

    const suffixFree = json.articles.every(a => !a.title.endsWith(` - ${a.source}`));
    const entityFree = json.articles.every(a => !/&(amp|quot|#39|apos|lt|gt|nbsp);/i.test(a.title));

    // Feed is badged "live", so dispatches must run newest-first
    const dated = json.articles.filter(a => a.publishedAt);
    let ordered = true;
    for (let i = 1; i < dated.length; i++) {
      if (dated[i].publishedAt > dated[i - 1].publishedAt) { ordered = false; break; }
    }

    return suffixFree && entityFree && ordered;
  });

  // 7.5. Island relevance: a Bali dispatch feed must not drift into generic regional wire copy
  await testEndpoint('GET /api/news (Bali Relevance Guard)', '/api/news?limit=10', {}, (res, json) => {
    if (res.status !== 200 || !Array.isArray(json.articles) || json.articles.length === 0) return false;
    const islandPattern = /(bali|denpasar|ubud|kuta|seminyak|canggu|uluwatu|sanur|nusa|lombok|indonesia|jakarta|java|bmkg)/i;
    const relevant = json.articles.filter(a => islandPattern.test(`${a.title} ${a.source}`));
    return relevant.length === json.articles.length;
  });

  // 7.6. Category filtering must actually change what comes back
  await testEndpoint('GET /api/news (Category Filter Is Distinct)', '/api/news?category=transit&limit=8', {}, (res, json) => {
    return res.status === 200 &&
      json.category === 'transit' &&
      Array.isArray(json.articles) &&
      json.articles.length > 0;
  });

  // 8. Hotel Booking Success
  await testEndpoint('POST /api/book (Valid)', '/api/book', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      hotelId: 'padma-ubud',
      guestName: 'Jordan Taylor',
      roomType: 'Premier Forest View',
      checkin: '2026-10-01',
      checkout: '2026-10-05',
      guests: 2
    })
  }, (res, json) => {
    return res.status === 201 && json.success && json.confirmation.voucherCode.startsWith('BALI-');
  });

  // 9. Hotel Booking Validation (Check-out before Check-in)
  await testEndpoint('POST /api/book (Invalid Date Logic)', '/api/book', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      hotelId: 'padma-ubud',
      guestName: 'Jordan Taylor',
      checkin: '2026-10-10',
      checkout: '2026-10-05'
    })
  }, (res, json) => {
    return res.status === 400 && json.success === false;
  });

  // 10. Newsletter
  await testEndpoint('POST /api/newsletter (Valid)', '/api/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'traveler@example.com' })
  }, (res, json) => {
    return res.status === 200 && json.success;
  });

  // 11. Multimodal Transit Booking - Flight
  await testEndpoint('POST /api/transit/book (Flight to DPS)', '/api/transit/book', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      mode: 'flight',
      origin: 'Singapore (SIN)',
      destination: "I Gusti Ngurah Rai Int'l (DPS)",
      departDate: '2026-11-15',
      passengers: 2,
      travelClass: 'business',
      baggageFee: 30,
      leadPassenger: 'Maya Lin',
      email: 'maya@example.com'
    })
  }, (res, json) => {
    return res.status === 201 && json.success && json.ticket && json.ticket.pnr.startsWith('DPS-AIR-') && json.ticket.operator;
  });

  // 12. Multimodal Transit Booking - Trans-Java Rail
  await testEndpoint('POST /api/transit/book (Trans-Java Train)', '/api/transit/book', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      mode: 'train',
      origin: 'Jakarta (CGK / Gambir)',
      destination: 'Ketapang Harbor / Gilimanuk Bali',
      departDate: '2026-11-20',
      passengers: 1,
      travelClass: 'standard',
      baggageFee: 0,
      leadPassenger: 'Alex Rivera',
      email: 'alex@example.com'
    })
  }, (res, json) => {
    return res.status === 201 && json.success && json.ticket && json.ticket.pnr.startsWith('KAI-TRN-') && json.ticket.gatePlatform;
  });

  // 12b. Multimodal Transit Booking - Fast Boat
  await testEndpoint('POST /api/transit/book (Fast Boat Marine)', '/api/transit/book', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      mode: 'boat',
      origin: 'Sanur (SNR) - New Harbor',
      destination: 'Nusa Penida (Toyapakeh)',
      departDate: '2026-11-22',
      passengers: 2,
      travelClass: 'standard',
      leadPassenger: 'Liam Davies',
      email: 'liam@example.com'
    })
  }, (res, json) => {
    return res.status === 201 && json.success && json.ticket && json.ticket.pnr.startsWith('DPS-SEA-') && json.ticket.gatePlatform;
  });

  // 12c. Multimodal Transit Booking - Airport Transfer
  await testEndpoint('POST /api/transit/book (Airport Chauffeur Transfer)', '/api/transit/book', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      mode: 'airport-transfer',
      origin: 'DPS ➔ Ubud Highland',
      destination: 'Padma Resort Ubud Lobby',
      departDate: '2026-11-25',
      passengers: 2,
      travelClass: 'business',
      leadPassenger: 'Sarah Connor',
      email: 'sarah@example.com'
    })
  }, (res, json) => {
    return res.status === 201 && json.success && json.ticket && json.ticket.pnr.startsWith('DPS-TRF-') && json.ticket.operator;
  });

  // 13. Multimodal Transit Booking - Validation Error (Missing lead passenger)
  await testEndpoint('POST /api/transit/book (Validation - Missing Name)', '/api/transit/book', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      mode: 'flight',
      origin: 'Singapore (SIN)',
      departDate: '2026-11-15',
      passengers: 2
      // Missing leadPassenger & email
    })
  }, (res, json) => {
    return res.status === 400 && json.success === false;
  });

  // 14. Private Driver & Scooter Booking - SUV with Driver
  await testEndpoint('POST /api/rental/book (Private AC SUV + Driver)', '/api/rental/book', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      vehicleType: 'car-driver',
      durationDays: 3,
      startDate: '2026-10-15',
      pickupLocation: 'Ngurah Rai Airport (DPS)',
      insuranceTier: 'comprehensive',
      renterName: 'Clara Oswald',
      email: 'clara@example.com',
      phone: '+44 7911 123456'
    })
  }, (res, json) => {
    return res.status === 201 && json.success && json.voucher.bookingId.startsWith('BALI-RIDE-') && json.voucher.totalPriceUSD === 120;
  });

  // 15. Scooter Booking - Honda Scoopy
  await testEndpoint('POST /api/rental/book (Honda Scoopy 110cc)', '/api/rental/book', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      vehicleType: 'scoopy',
      durationDays: 5,
      startDate: '2026-10-20',
      pickupLocation: 'Canggu Villa Delivery',
      insuranceTier: 'basic',
      renterName: 'Felix Braun',
      email: 'felix@example.com'
    })
  }, (res, json) => {
    return res.status === 201 && json.success && json.voucher.bookingId.startsWith('BALI-RIDE-') && json.voucher.totalPriceUSD === 35;
  });

  // 16. Rental Booking - Missing Required Fields Validation
  await testEndpoint('POST /api/rental/book (Validation - Missing Vehicle Type)', '/api/rental/book', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      durationDays: 3,
      renterName: 'Incomplete Booking'
    })
  }, (res, json) => {
    return res.status === 400 && json.success === false;
  });

  // 17. Community Traveler Tips - GET /api/reviews
  await testEndpoint('GET /api/reviews', '/api/reviews', {}, (res, json) => {
    return res.status === 200 && json.success && Array.isArray(json.data) && json.data.length >= 6;
  });

  // 18. Community Traveler Tips - POST /api/reviews
  await testEndpoint('POST /api/reviews (Submit Traveler Tip)', '/api/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      targetId: 'tanah-lot',
      targetName: 'Tanah Lot Sea Temple',
      author: 'Sophia Zhang',
      origin: 'Toronto, Canada',
      rating: 5,
      tipText: 'The low tide causeway walk at sunset is magical. Bring slip-resistant sandals!'
    })
  }, (res, json) => {
    return res.status === 201 && json.success && json.review && json.review.id.startsWith('rev-');
  });

  // 19. Community Traveler Tips - Validation Error (Missing author / tipText)
  await testEndpoint('POST /api/reviews (Validation - Missing Tip Text)', '/api/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      targetId: 'tanah-lot',
      rating: 5
    })
  }, (res, json) => {
    return res.status === 400 && json.success === false;
  });

  // 20. Gemini 3.8 Flash AI - GET /api/ai/config
  await testEndpoint('GET /api/ai/config', '/api/ai/config', {}, (res, json) => {
    return res.status === 200 && json.success && json.model && json.features && json.features.tripPlanning;
  });

  // 21. Gemini 3.8 Flash AI - POST /api/ai/config
  await testEndpoint('POST /api/ai/config', '/api/ai/config', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'gemini-3.8-flash'
    })
  }, (res, json) => {
    return res.status === 200 && json.success && json.model === 'gemini-3.8-flash';
  });

  // 22. Gemini 3.8 Flash AI - POST /api/ai/chat (Itinerary Query)
  await testEndpoint('POST /api/ai/chat (5-day itinerary)', '/api/ai/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: 'Plan a 5-day itinerary in Bali for beaches and temples',
      context: {
        savedItinerary: [{ name: 'Tanah Lot' }, { name: 'Uluwatu Temple' }]
      }
    })
  }, (res, json) => {
    return res.status === 200 && json.success && json.reply && json.reply.length > 50 && Array.isArray(json.suggestions);
  });

  // 23. Gemini 3.8 Flash AI - POST /api/ai/chat (Validation - Missing Message)
  await testEndpoint('POST /api/ai/chat (Validation - Empty Message)', '/api/ai/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: ''
    })
  }, (res, json) => {
    return res.status === 400 && json.success === false;
  });

  // 24. Google Maps Platform - GET /api/maps/config
  await testEndpoint('GET /api/maps/config', '/api/maps/config', {}, (res, json) => {
    return res.status === 200 && json.success && json.configured && json.hasApiKey && json.apiKey && json.services && json.services.javascriptMaps;
  });

  // 25. Google Maps Platform - POST /api/maps/config
  await testEndpoint('POST /api/maps/config (Dynamic Key Update)', '/api/maps/config', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      apiKey: 'AIzaSyD4NKHACPBorcaMKx_VaJxAGcvIhHy6QtU'
    })
  }, (res, json) => {
    return res.status === 200 && json.success && json.configured;
  });

  // 26. Google Places API (New) - GET /api/maps/places
  await testEndpoint('GET /api/maps/places (Live Google Places Search)', '/api/maps/places?query=Tanah+Lot', {}, (res, json) => {
    return res.status === 200 && json.success && Array.isArray(json.data) && json.data.length > 0 && json.data[0].lat && json.data[0].googleMapsUrl;
  });

  // 27. Google Routes API (v2) - POST /api/transit/commute with Route Polyline
  await testEndpoint('POST /api/transit/commute (Google Routes Navigation & Polyline)', '/api/transit/commute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      origin: 'airport',
      destination: 'ubud'
    })
  }, (res, json) => {
    return res.status === 200 && json.success && json.googleRoute && json.googleRoute.distanceMeters > 0 && json.googleRoute.durationMins > 0 && json.googleRoute.encodedPolyline;
  });

  console.log(`\n=========================================`);
  console.log(`Test Results: ${passed} passed, ${failed} failed`);
  console.log(`=========================================\n`);

  serverProcess.kill();

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTests().catch(err => {
  console.error('Fatal test error:', err);
  serverProcess.kill();
  process.exit(1);
});
