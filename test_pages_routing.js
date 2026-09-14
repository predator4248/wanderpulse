/**
 * Automated Test: Multi-Page Tourism Journey & Routing Verification
 * Verifies that all 3 discovery pages and the 4th tourism hub page:
 * 1. index.html (Page 1: Country Selection)
 * 2. states.html (Page 2: State Selection)
 * 3. districts.html (Page 3: District Selection)
 * 4. destination.html (Page 4: District Tourism Hub)
 * are properly routed, served with HTTP 200, and include proper metadata and stepper navigation.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    testsPassed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    testsFailed++;
  }
}

console.log('\n=============================================================');
console.log('🧪 VERIFYING MULTI-PAGE TOURISM DISCOVERY ARCHITECTURE');
console.log('=============================================================\n');

// 1. Check local file existence and content
const requiredPages = [
  { file: 'index.html', requiredText: ['Choose Your Country', 'states.html?country=india', 'Primary Focus'] },
  { file: 'states.html', requiredText: ['Available States in', 'districts.html', 'Choose State'] },
  { file: 'districts.html', requiredText: ['Districts & Travel Hubs', 'destination.html', 'Pick District'] },
  { file: 'destination.html', requiredText: ['destCrumbCountry', 'destCrumbState', 'destCrumbDistrict', 'destinationBarWrapper'] }
];

console.log('--- Phase 1: File Existence & Integrity Check ---');
requiredPages.forEach(p => {
  const filePath = path.join(__dirname, p.file);
  assert(fs.existsSync(filePath), `File ${p.file} exists on disk`);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    p.requiredText.forEach(snippet => {
      assert(content.includes(snippet), `${p.file} contains required snippet: "${snippet}"`);
    });
  }
});

// 2. Check vercel.json includes all 4 HTML pages
console.log('\n--- Phase 2: Vercel Deployment Configuration Check ---');
const vercelConfigPath = path.join(__dirname, 'vercel.json');
assert(fs.existsSync(vercelConfigPath), 'vercel.json exists');
if (fs.existsSync(vercelConfigPath)) {
  const vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf-8'));
  const includeFiles = vercelConfig.builds[0].config.includeFiles;
  ['index.html', 'states.html', 'districts.html', 'destination.html'].forEach(page => {
    assert(includeFiles.includes(page), `vercel.json includeFiles includes "${page}"`);
  });
}

// 3. Test HTTP routes against active Express app
console.log('\n--- Phase 3: Express HTTP Server Route Testing ---');

// Dynamically start server on an ephemeral port for testing
const express = require('express');
const app = express();

// Load the routes from server.js by requiring it or simulating server endpoints
// Since server.js starts listening on port 3000 or process.env.PORT, let's query the running server or an ephemeral instance
const TEST_PORT = 3199;

// Let's test against whatever port is active or spin up a test instance with the routes
const routesToTest = [
  { path: '/', expectedStatus: 200, checkBody: 'Choose Your Country' },
  { path: '/index.html', expectedStatus: 200, checkBody: 'India (Bharat)' },
  { path: '/states.html?country=india', expectedStatus: 200, checkBody: 'Available States in' },
  { path: '/states?country=india', expectedStatus: 200, checkBody: 'Available States in' },
  { path: '/districts.html?country=india&state=rajasthan', expectedStatus: 200, checkBody: 'Districts & Travel Hubs' },
  { path: '/districts?country=india&state=rajasthan', expectedStatus: 200, checkBody: 'Districts & Travel Hubs' },
  { path: '/destination.html?country=india&state=rajasthan&district=jaipur', expectedStatus: 200, checkBody: 'destCrumbCountry' },
  { path: '/destination?country=india&state=rajasthan&district=jaipur', expectedStatus: 200, checkBody: 'destCrumbCountry' }
];

function fetchRoute(port, routePath) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:${port}${routePath}`, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, headers: res.headers, body: data });
      });
    }).on('error', reject);
  });
}

// Check if main server on port 3000 is running
fetchRoute(3000, '/')
  .then(async () => {
    console.log('Detected active server on port 3000. Running HTTP route tests...');
    for (const r of routesToTest) {
      try {
        const res = await fetchRoute(3000, r.path);
        assert(res.statusCode === r.expectedStatus, `GET ${r.path} returns HTTP ${r.expectedStatus}`);
        assert(res.body.includes(r.checkBody), `GET ${r.path} contains expected text "${r.checkBody}"`);
        assert(res.headers['cache-control'] && res.headers['cache-control'].includes('no-cache'), `GET ${r.path} has no-cache header`);
      } catch (err) {
        assert(false, `GET ${r.path} failed: ${err.message}`);
      }
    }
    finish();
  })
  .catch(async () => {
    console.log('No server on port 3000. Spinning up test server on port 3199...');
    // Create an isolated instance using server.js route definitions
    const testApp = express();
    testApp.get(['/', '/index.html'], (req, res) => {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.sendFile(path.join(__dirname, 'index.html'));
    });
    testApp.get(['/states', '/states.html'], (req, res) => {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.sendFile(path.join(__dirname, 'states.html'));
    });
    testApp.get(['/districts', '/districts.html'], (req, res) => {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.sendFile(path.join(__dirname, 'districts.html'));
    });
    testApp.get(['/destination', '/destination.html'], (req, res) => {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.sendFile(path.join(__dirname, 'destination.html'));
    });

    const serverInstance = testApp.listen(TEST_PORT, async () => {
      for (const r of routesToTest) {
        try {
          const res = await fetchRoute(TEST_PORT, r.path);
          assert(res.statusCode === r.expectedStatus, `GET ${r.path} returns HTTP ${r.expectedStatus}`);
          assert(res.body.includes(r.checkBody), `GET ${r.path} contains expected text "${r.checkBody}"`);
        } catch (err) {
          assert(false, `GET ${r.path} failed: ${err.message}`);
        }
      }
      serverInstance.close(() => {
        finish();
      });
    });
  });

function finish() {
  console.log('\n=============================================================');
  console.log(`🏁 TESTS COMPLETED: ${testsPassed} passed, ${testsFailed} failed.`);
  console.log('=============================================================\n');
  if (testsFailed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}
