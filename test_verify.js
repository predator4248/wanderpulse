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

  // 6. Transit Custom City
  await testEndpoint('POST /api/transit/route (Custom Berlin)', '/api/transit/route', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ origin: 'Berlin' })
  }, (res, json) => {
    return res.status === 200 && json.success && json.data.flight;
  });

  // 7. Live Weather
  await testEndpoint('GET /api/weather', '/api/weather', {}, (res, json) => {
    return res.status === 200 && json.temperatureC !== undefined && json.localTime && json.sunset;
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
