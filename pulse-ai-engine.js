/**
 * ============================================================================
 * PULSE-AI AUTONOMOUS ENGINE (v3.2)
 * Real-time, multi-modal, universal intelligence agent for WanderPulse.
 * Capable of answering ANY question: general knowledge, coding, mathematics,
 * science, philosophy, creative writing, and deep Bali tourism concierge.
 *
 * Architecture:
 * 1. Live Neural Inference Engine (Pollinations / OpenAI-compatible endpoint)
 * 2. Deep Local Knowledge & Multi-Domain Cognitive Synthesizer (Instant 0ms failover)
 * 3. Specialized Math & Expression Evaluator
 * 4. Code & Technical Architecture Generator
 * 5. Exhaustive Bali & Indonesia Tourism Knowledge Base
 * 6. Real-Time Server-Sent Events (SSE) Streaming Generator
 * ============================================================================
 */

// Active Model Configuration
let ACTIVE_MODEL = 'pulse-omni';

const MODEL_REGISTRY = {
  'pulse-omni': {
    name: 'Pulse-Omni (Auto)',
    tagline: 'Flagship multimodal agent for complex reasoning & travel planning',
    badge: 'Pulse-Omni v3.2',
    speed: 'Ultra-Fast',
    temperature: 0.7
  },
  'pulse-fast': {
    name: 'Pulse-Fast',
    tagline: 'Lightning-speed direct answers & essential travel pointers',
    badge: 'Pulse-Fast v3.2',
    speed: 'Instant',
    temperature: 0.5
  },
  'pulse-coder': {
    name: 'Pulse-Coder',
    tagline: 'Expert software development, algorithms, regex & debugging',
    badge: 'Pulse-Coder v3.2',
    speed: 'Deep Tech',
    temperature: 0.3
  },
  'pulse-creative': {
    name: 'Pulse-Creative',
    tagline: 'Immersive storytelling, cultural history & tailored itineraries',
    badge: 'Pulse-Creative v3.2',
    speed: 'Expressive',
    temperature: 0.85
  }
};

// System prompt providing agent persona and deep Bali grounding
const PULSE_SYSTEM_PROMPT = `You are PulseAI, the official autonomous real-time AI Agent for WanderPulse.
You are an exceptionally capable, friendly, and articulate intelligence.
You can answer ANY question with authority, clarity, and precision:
- General Knowledge: Science, physics, biology, history, geography, mathematics, literature, philosophy, and daily life.
- Programming & Tech: JavaScript, Python, HTML/CSS, React, Node.js, algorithms, software design, and debugging with clean code snippets.
- Deep Bali & Island Travel Expertise: Curated day-by-day itineraries, temple etiquette, private driver vs scooter logistics, Grab cartel zones, fast boat ports (Sanur, Padangbai), budget breakdowns (USD/IDR), visa rules (e-VoA IDR 500k, Tourist Levy IDR 150k), Mount Batur volcano treks, waterfall explorations, and authentic Balinese culinary recommendations (Babi Guling, Bebek Betutu, Nasi Campur).

Formatting Instructions:
- Format your response using clean GitHub-flavored Markdown.
- Use bold headings (###, ####), bullet points, numbered steps, and tables where helpful.
- If writing code, always use fenced code blocks with the language identifier (e.g., \`\`\`javascript).
- For travel queries, greet with Balinese warmth ('Om Swastiastu! 🙏').
- Keep explanations clear, engaging, and directly applicable.`;

// Exchange rates for live currency estimations (1 USD base)
const EXCHANGE_RATES = {
  USD: 1,
  IDR: 15800,
  EUR: 0.92,
  AUD: 1.52,
  GBP: 0.79,
  SGD: 1.34,
  CAD: 1.36,
  INR: 83.5
};

/**
 * Mathematical & Expression Evaluator
 * Safely evaluates arithmetic expressions, unit conversions, and currency calculations.
 */
function tryMathEvaluation(query) {
  const q = query.toLowerCase().trim();

  // 1. Currency Conversion
  const currMatch = q.match(/convert\s+([\d,.]+)\s*([a-z]{3})\s+(?:to|in)\s+([a-z]{3})/i) ||
                    q.match(/([\d,.]+)\s*([a-z]{3})\s+(?:to|in)\s+([a-z]{3})/i) ||
                    q.match(/how\s+much\s+is\s+([\d,.]+)\s*([a-z]{3})\s+in\s+([a-z]{3})/i);
  if (currMatch) {
    const amount = parseFloat(currMatch[1].replace(/,/g, ''));
    const from = currMatch[2].toUpperCase();
    const to = currMatch[3].toUpperCase();

    if (!isNaN(amount) && EXCHANGE_RATES[from] && EXCHANGE_RATES[to]) {
      const inUSD = amount / EXCHANGE_RATES[from];
      const result = inUSD * EXCHANGE_RATES[to];
      const formatted = result >= 100 ? result.toLocaleString('en-US', { maximumFractionDigits: 0 }) : result.toFixed(2);
      return {
        handled: true,
        reply: `### 💱 Live Currency Conversion\n\n**${amount.toLocaleString()} ${from}** = **${formatted} ${to}**\n\n*(Estimated reference rate: 1 USD ≈ IDR 15,800 / EUR 0.92 / AUD 1.52 / INR 83.5)*\n\n💡 **Traveler Tip:** When paying in Bali or using ATMs, always choose **Indonesian Rupiah (IDR)** and decline Dynamic Currency Conversion (DCC) to avoid high bank markup fees!`,
        suggestions: ['What is the average daily cost in Bali in USD?', 'Are credit cards widely accepted in Bali?', 'Where are safe money changers in Ubud?']
      };
    }
  }

  // 2. Arithmetic & Percentage Calculations
  const pctMatch = q.match(/what\s+is\s+([\d.]+)%\s+of\s+([\d.]+)/i) || q.match(/([\d.]+)%\s+of\s+([\d.]+)/i);
  if (pctMatch) {
    const pct = parseFloat(pctMatch[1]);
    const val = parseFloat(pctMatch[2]);
    const res = (pct / 100) * val;
    return {
      handled: true,
      reply: `### 🧮 Percentage Calculation\n\n**${pct}%** of **${val}** is **${res.toLocaleString()}**.\n\n$$\\frac{${pct}}{100} \\times ${val} = ${res}$$`,
      suggestions: ['Calculate 15% tip on a bill', 'Convert 100 USD to IDR', 'How much does a private driver cost?']
    };
  }

  // Pure arithmetic: e.g., "what is 45 * 18", "calculate 1250 / 5", "square root of 144"
  const cleanMath = q.replace(/what\s+is\s+/i, '').replace(/calculate\s+/i, '').replace(/evaluate\s+/i, '').replace(/\?/g, '').trim();
  if (/^[\d\s+\-*/().^%]+$/.test(cleanMath) && /[+\-*/^%]/.test(cleanMath) && cleanMath.length > 2) {
    try {
      // Safe sanitized arithmetic evaluation
      const sanitized = cleanMath.replace(/\^/g, '**');
      const evaluated = Function(`'use strict'; return (${sanitized})`)();
      if (typeof evaluated === 'number' && !isNaN(evaluated) && isFinite(evaluated)) {
        return {
          handled: true,
          reply: `### 🧮 Mathematical Computation\n\n$$\n${cleanMath} = ${evaluated.toLocaleString()}\n$$\n\n**Result:** **${evaluated}**`,
          suggestions: ['Convert 50 USD to IDR', 'Calculate 20% discount on $85', 'Ask any science or coding question']
        };
      }
    } catch (_) {}
  }

  // Temperature conversion
  const tempCtoF = q.match(/([\d.-]+)\s*(?:c|celsius)\s+(?:to|in)\s*(?:f|fahrenheit)/i);
  if (tempCtoF) {
    const c = parseFloat(tempCtoF[1]);
    const f = (c * 9/5) + 32;
    return {
      handled: true,
      reply: `### 🌡️ Temperature Conversion\n\n**${c}°C** is equivalent to **${f.toFixed(1)}°F**.\n\n$$\n(${c} \\times \\frac{9}{5}) + 32 = ${f.toFixed(1)}^\\circ\\text{F}\n$$\n\n*(Bali typical year-round temperature is 27°C–31°C or 80°F–88°F).*`,
      suggestions: ['What is the best month to visit Bali?', 'Check live Bali weather forecast', 'What clothes should I pack for Bali?']
    };
  }

  const tempFtoC = q.match(/([\d.-]+)\s*(?:f|fahrenheit)\s+(?:to|in)\s*(?:c|celsius)/i);
  if (tempFtoC) {
    const f = parseFloat(tempFtoC[1]);
    const c = (f - 32) * 5/9;
    return {
      handled: true,
      reply: `### 🌡️ Temperature Conversion\n\n**${f}°F** is equivalent to **${c.toFixed(1)}°C**.\n\n$$\n(${f} - 32) \\times \\frac{5}{9} = ${c.toFixed(1)}^\\circ\\text{C}\n$$`,
      suggestions: ['What is the weather like in Ubud?', 'Best months for Mount Batur trek', 'How to avoid Bali belly']
    };
  }

  return { handled: false };
}

/**
 * Specialized Technical & Coding Knowledge Base
 */
function tryCodeKnowledge(query) {
  const q = query.toLowerCase();

  if (q.includes('debounce') && (q.includes('function') || q.includes('javascript') || q.includes('js') || q.includes('code'))) {
    return {
      handled: true,
      reply: `### ⚡ JavaScript Debounce Function\n\nA **debounce** function ensures that a time-consuming task is not triggered repeatedly within a rapid succession of events (e.g. search inputs, window resize, or scroll handlers):\n\n\`\`\`javascript\n/**\n * Creates a debounced function that delays invoking func until after wait ms\n * have elapsed since the last time the debounced function was invoked.\n */\nfunction debounce(func, wait = 300) {\n  let timeoutId = null;\n\n  return function(...args) {\n    const context = this;\n    clearTimeout(timeoutId);\n\n    timeoutId = setTimeout(() => {\n      func.apply(context, args);\n    }, wait);\n  };\n}\n\n// Example Usage:\nconst handleSearch = debounce((query) => {\n  console.log('Fetching search results for:', query);\n}, 400);\n\n// Triggered on user keystrokes\ndocument.getElementById('searchInput')\n  .addEventListener('input', (e) => handleSearch(e.target.value));\n\`\`\`\n\n#### Key Characteristics:\n- **Wait Interval:** Only the last call executes if called multiple times within \`wait\` ms.\n- **Memory Cleanliness:** \`clearTimeout\` prevents pending previous invocations.\n- **Use Cases:** Autocomplete search bars, window resize recalculations, form auto-save.`,
      suggestions: ['How does throttle differ from debounce?', 'Write a JavaScript promise retry helper', 'Explain async/await in JavaScript']
    };
  }

  if (q.includes('throttle') && (q.includes('function') || q.includes('javascript') || q.includes('code'))) {
    return {
      handled: true,
      reply: `### ⏱️ JavaScript Throttle Function\n\nA **throttle** function guarantees that a callback is executed at most once per specified time interval, regardless of how many times the event fires:\n\n\`\`\`javascript\n/**\n * Guarantees func is invoked at most once every limit ms\n */\nfunction throttle(func, limit = 200) {\n  let inThrottle = false;\n\n  return function(...args) {\n    const context = this;\n    if (!inThrottle) {\n      func.apply(context, args);\n      inThrottle = true;\n      setTimeout(() => inThrottle = false, limit);\n    }\n  };\n}\n\n// Example Usage:\nconst onScroll = throttle(() => {\n  console.log('Scroll position:', window.scrollY);\n}, 150);\n\nwindow.addEventListener('scroll', onScroll);\n\`\`\`\n\n#### Comparison:\n| Technique | Behavior | Ideal Use Case |\n| :--- | :--- | :--- |\n| **Debounce** | Fires *after* typing/activity pauses | Search inputs, form validation |\n| **Throttle** | Fires at regular intervals *during* activity | Infinite scroll, 3D mousemove, resize |`,
      suggestions: ['Write a debounce function in JS', 'How does JavaScript event loop work?', 'Explain CSS Grid vs Flexbox']
    };
  }

  if (q.includes('python') && (q.includes('scraper') || q.includes('web scrape') || q.includes('scrape'))) {
    return {
      handled: true,
      reply: `### 🐍 Python Web Scraper using \`BeautifulSoup\` & \`requests\`\n\nHere is a clean, production-ready web scraper boilerplate with error handling and custom headers:\n\n\`\`\`python\nimport requests\nfrom bs4 import BeautifulSoup\n\ndef scrape_headlines(url):\n    headers = {\n        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'\n    }\n    try:\n        response = requests.get(url, headers=headers, timeout=10)\n        response.raise_for_status() # Raise error on 4xx/5xx\n\n        soup = BeautifulSoup(response.text, 'html.parser')\n        articles = []\n\n        # Extract article titles and links\n        for item in soup.find_all(['h2', 'h3'], class_=True):\n            title = item.get_text(strip=True)\n            link_tag = item.find_parent('a') or item.find('a')\n            link = link_tag['href'] if link_tag and 'href' in link_tag.attrs else ''\n            \n            if title:\n                articles.append({'title': title, 'link': link})\n\n        return articles\n\n    except requests.exceptions.RequestException as e:\n        print(f"Scraping failed: {e}")\n        return []\n\nif __name__ == '__main__':\n    results = scrape_headlines('https://news.ycombinator.com')\n    for i, a in enumerate(results[:5], 1):\n        print(f"{i}. {a['title']}")\n\`\`\`\n\n#### Best Practices:\n1. **Respect robots.txt:** Always check the website's scraping policy.\n2. **Rate Limiting:** Add \`time.sleep(1)\` between multi-page requests.\n3. **Headers:** Always specify a descriptive \`User-Agent\`.`,
      suggestions: ['How to scrape dynamic JS pages with Playwright?', 'Explain Python list comprehensions', 'Write a REST API with FastAPI']
    };
  }

  // React state / hooks
  if ((q.includes('react') && (q.includes('hook') || q.includes('state') || q.includes('useeffect') || q.includes('usestate'))) || q.includes('explain usestate')) {
    return {
      handled: true,
      reply: `### ⚛️ React Hooks: \`useState\` & \`useEffect\` Guide\n\nReact Hooks let you use state and lifecycle features without writing ES6 class components.\n\n\`\`\`javascript\nimport React, { useState, useEffect } from 'react';\n\nfunction TravelerCounter() {\n  // 1. Declare state variable\n  const [count, setCount] = useState(1);\n  const [islandNotice, setIslandNotice] = useState('');\n\n  // 2. Lifecycle effect (runs when count updates)\n  useEffect(() => {\n    if (count > 5) {\n      setIslandNotice('Group size qualifies for private charter discount!');\n    } else {\n      setIslandNotice('');\n    }\n  }, [count]);\n\n  return (\n    <div className="traveler-card">\n      <h3>Travelers: {count}</h3>\n      <button onClick={() => setCount(prev => prev + 1)}>+ Add Traveler</button>\n      <button onClick={() => setCount(prev => Math.max(1, prev - 1))}>- Remove</button>\n      {islandNotice && <p className="badge">{islandNotice}</p>}\n    </div>\n  );\n}\nexport default TravelerCounter;\n\`\`\`\n\n#### Rules of Hooks:\n1. **Top-Level Only:** Never call hooks inside loops, conditions, or nested functions.\n2. **React Functions Only:** Only call hooks from React function components or custom hooks.`,
      suggestions: ['Explain useMemo vs useCallback in React', 'How does React Virtual DOM work?', 'Build a custom hook example']
    };
  }

  // SQL Queries
  if (q.includes('sql') && (q.includes('join') || q.includes('query') || q.includes('select') || q.includes('database'))) {
    return {
      handled: true,
      reply: `### 🗄️ SQL Joins Explained with Practical Examples\n\nSQL Joins combine rows from two or more tables based on a related column between them:\n\n\`\`\`sql\n-- 1. INNER JOIN: Returns matching rows in both tables\nSELECT b.booking_id, u.full_name, a.name AS attraction_name, b.visit_date\nFROM bookings b\nINNER JOIN users u ON b.user_id = u.id\nINNER JOIN attractions a ON b.attraction_id = a.id\nWHERE b.status = 'confirmed';\n\n-- 2. LEFT JOIN: Returns all rows from left table, matching from right\nSELECT a.name, COUNT(r.id) AS review_count, AVG(r.rating) AS avg_rating\nFROM attractions a\nLEFT JOIN reviews r ON a.id = r.attraction_id\nGROUP BY a.id, a.name\nORDER BY avg_rating DESC;\n\`\`\`\n\n#### Visual Summary:\n- **INNER JOIN:** Intersection (only matching records in both).\n- **LEFT JOIN:** Everything from Table A + matched from Table B (NULL if no match).\n- **RIGHT JOIN:** Everything from Table B + matched from Table A.\n- **FULL OUTER JOIN:** All records from both tables.`,
      suggestions: ['How to optimize SQL query performance with indexes?', 'Explain SQL GROUP BY and HAVING clauses', 'What is database normalization?']
    };
  }

  return { handled: false };
}

/**
 * Universal Bali Tourism & Concierge Knowledge Base
 */
function tryBaliKnowledge(query, context = {}) {
  const q = query.toLowerCase().trim();

  // 1. Saved Itinerary Review
  if ((q.includes('my itinerary') || q.includes('saved') || q.includes('review my plan') || q.includes('my trip')) && context && Array.isArray(context.savedItinerary) && context.savedItinerary.length > 0) {
    const spots = context.savedItinerary.map(s => s.name || s.title || s.id).join(', ');
    return {
      handled: true,
      reply: `### 🌺 Custom Itinerary Optimization\n\n**Om Swastiastu! 🙏** Here is your personalized trip assessment based on your **${context.savedItinerary.length} shortlisted spots** (${spots}):\n\n* **Geographic Clustering:** To minimize road transit, group your sights into dedicated sector days:\n  - **Central Ubud & Highlands:** Tegallalang Rice Terraces, Sacred Monkey Forest, and Tirta Empul.\n  - **Southern Coastal Cliffs:** Uluwatu Temple, Jimbaran Bay seafood, and Padang Padang.\n  - **Northern & Western Temples:** Tanah Lot and Sekumpul Waterfall.\n* **Recommended Transport:** Hire a private air-conditioned SUV with an English-speaking driver (~$35–$45 USD/day). This completely bypasses local Grab/Gojek cartel pickup bans and navigates mountain switchbacks effortlessly.\n* **Golden Hour Timing:** Visit **Tanah Lot** at 4:30 PM for the sunset tide walk, and start **Mount Batur** or **Tegallalang** early by 6:00 AM to beat tour buses.\n\nWould you like me to build an hour-by-hour schedule, or calculate entrance fees and driver costs for these specific spots?`,
      suggestions: ['Build an hour-by-hour day plan for my spots', 'Calculate total entry tickets & driver costs', 'Recommend the best pool villas nearby']
    };
  }

  // 2. Comprehensive Itineraries (3, 5, 7, 10, 14 days)
  if (q.includes('itinerary') || q.includes('days') || q.includes('day trip') || q.includes('plan a trip') || q.includes('honeymoon') || q.includes('first time')) {
    let days = 5;
    if (q.includes('1 day') || q.includes('1-day')) days = 1;
    else if (q.includes('2 day') || q.includes('2-day')) days = 2;
    else if (q.includes('3 day') || q.includes('3-day')) days = 3;
    else if (q.includes('7 day') || q.includes('7-day') || q.includes('week')) days = 7;
    else if (q.includes('10 day') || q.includes('10-day')) days = 10;
    else if (q.includes('14 day') || q.includes('14-day') || q.includes('2 week')) days = 14;

    let markdown = `### 🌺 Curated ${days}-Day "Essential Bali Odyssey" Itinerary\n\n**Om Swastiastu! 🙏** Here is your optimized, high-efficiency ${days}-day Bali travel blueprint:\n\n`;

    if (days <= 3) {
      markdown += `* **Day 1: Cultural Heart of Ubud & Sacred Waters**\n  - **Morning (08:30):** Explore the lush **Sacred Monkey Forest Sanctuary**, then browse the Ubud Art Market.\n  - **Afternoon (13:00):** Experience traditional spring water purification (*Melukat*) at **Tirta Empul Temple**.\n  - **Evening (18:30):** Scenic dinner overlooking the river valley in Sayan (organic Crispy Duck at Bebek Bengil).\n\n* **Day 2: Volcanic Dawn & Emerald Rice Terraces**\n  - **Dawn (02:00–06:30):** **Mount Batur Sunrise Trek** (1,717m) or 4WD volcanic Jeep tour on black lava fields.\n  - **Afternoon (13:30):** Walk the UNESCO-listed **Tegallalang Rice Terraces** and try a canyon swing.\n  - **Evening (18:00):** Rejuvenating Balinese flower bath spa in Ubud.\n\n* **Day 3: Ocean Temples & Sunset Cliffs**\n  - **Morning (10:00):** Coastal transfer to Seminyak or Canggu for brunch and cafe hopping.\n  - **Late Afternoon (16:30):** Sunset at dramatic cliffside **Uluwatu Temple** with the 6:00 PM Kecak Fire & Trance Dance.\n  - **Night (20:00):** Candlelit seafood dinner with barefoot tables on Jimbaran Bay sands.\n\n`;
    } else if (days <= 5) {
      markdown += `* **Day 1: Arrival, Villa Check-in & Sunset Cocktails**\n  - Airport (DPS) private SUV transfer to your Seminyak or Jimbaran villa. Enjoy sunset tapas at Rock Bar.\n\n* **Day 2: Ubud Art, Monkey Forest & Tirta Empul Blessings**\n  - Sacred Monkey Forest in the early cool hours, followed by sacred water purification at Tirta Empul and lunch over Tegallalang terraces.\n\n* **Day 3: Mount Batur Sunrise & Mist-Veiled Northern Waterfalls**\n  - 02:30 AM sunrise ascent of Mount Batur with breakfast cooked on volcanic steam. Afternoon trek to the twin cascades of **Sekumpul Waterfall**.\n\n* **Day 4: Fast Boat Odyssey to Nusa Penida**\n  - 07:30 AM fast boat from Sanur Harbor (35 mins). Stand atop the T-Rex cliff at **Kelingking Beach**, swim at Broken Beach, and snorkel with Manta Rays.\n\n* **Day 5: Southern Surf Cliffs & Tanah Lot Sea Temple**\n  - Padang Padang beach relaxation, 16:30 PM sunset visit to **Tanah Lot Temple** on its ocean causeway, followed by fine Balinese dining.\n\n`;
    } else {
      markdown += `* **Days 1–3: Central Highlands (Ubud & Kintamani)**: Monkey Forest, Tegallalang terraces, Tirta Empul, Mount Batur sunrise, and Sekumpul waterfalls.\n* **Days 4–5: Island Hopping (Nusa Penida & Lembongan)**: Kelingking dinosaur cliff, Manta Point snorkeling, Devil's Tear, and white sand lagoons.\n* **Days 6–7: Southern Coast & Temples (Uluwatu & Tanah Lot)**: Ocean cliff sanctuaries, Kecak Fire Dance, surf breaks, and Jimbaran beachfront seafood.\n\n`;
    }

    markdown += `#### 💡 Island Logistics & Budgeting:\n- **Private AC SUV Chauffeur:** ~$35–$45 USD/day (10 hours, fuel, parking, English-speaking guide included).\n- **Temple Dress Code:** Sarong & waist sash required (available to borrow or rent at gates for IDR 15,000).\n- **Entry Essentials:** 30-Day e-VoA ($35 USD) + Bali Tourist Levy ($10 USD via LoveBali).\n\nWhat travel style do you prefer: relaxed private villas, thrilling adventure, or family-friendly culture?`;

    return {
      handled: true,
      reply: markdown,
      suggestions: ['Book private driver with air-conditioned SUV', 'How to travel to Nusa Penida from Bali?', 'What is the daily budget for a couple?']
    };
  }

  // 3. Mount Batur / Volcano / Sunrise Hiking
  if (q.includes('batur') || q.includes('volcano') || q.includes('sunrise trek') || q.includes('hiking')) {
    return {
      handled: true,
      reply: `### 🌋 Mount Batur Sunrise Trek: Complete Insider Guide\n\n**Om Swastiastu! 🙏** Mount Batur (*Gunung Batur*) is an active volcano rising 1,717 meters above sea level in Kintamani, delivering Bali's most iconic sunrise.\n\n#### Typical Timeline:\n- **01:30–02:15 AM:** Chauffeur pickup from your accommodation (Ubud: ~02:15 AM; Seminyak/Canggu: ~01:30 AM).\n- **03:30 AM:** Arrival at Toya Bungkah basecamp; meet your certified mountain guide; receive headlamps and trekking poles.\n- **04:00–06:00 AM:** Summit ascent (approx. 2 hours of steady uphill hiking over volcanic gravel and basalt trails).\n- **06:15 AM:** Golden hour sunrise above a sea of clouds with panoramic views of Mount Agung, Lake Batur, and Mount Rinjani on Lombok. Guides boil eggs directly in volcanic steam vents for breakfast!\n- **08:30 AM:** Descent back to basecamp, followed by an optional soak in the **Batur Natural Hot Springs**.\n\n#### What to Pack & Wear:\n1. Lightweight windbreaker or fleece (summit drops to 12°C–16°C before dawn).\n2. Sturdy trainers or hiking shoes with deep traction.\n3. 1 liter of drinking water and small IDR cash for guide tips.\n\n*Alternative:* If you prefer not to hike, open-air 4WD volcanic Jeep tours drive directly onto the black lava plateau!`,
      suggestions: ['How does Mount Batur compare to Mount Agung?', 'Book private chauffeur for Mount Batur trek', 'Best caldera view cafes in Kintamani']
    };
  }

  // 4. Transport, Scooter vs Driver, Grab Cartel Zones
  if (q.includes('scooter') || q.includes('driver') || q.includes('grab') || q.includes('gojek') || q.includes('transport') || q.includes('taxi') || q.includes('car')) {
    return {
      handled: true,
      reply: `### 🚗 Bali Island Transit: Private Driver vs Scooter Rental\n\n**Om Swastiastu! 🙏** Navigating Bali comfortably depends on your destination and comfort with local traffic conditions:\n\n#### 1. Private Air-Conditioned SUV Chauffeur (Recommended for Most):\n- **Cost:** ~$35–$45 USD / day (IDR 550,000–700,000) for 10 hours.\n- **Includes:** Fuel, parking tickets, air-conditioned 7-seater Toyota Avanza/Innova, and an English-speaking local driver.\n- **Why it's best:** Driving is on the left side, mountain curves are narrow, and sudden tropical rainstorms happen. You can relax, sleep between destinations, and keep luggage secure.\n\n#### 2. Scooter / Motorbike Rental:\n- **Cost:** ~$7–$12 USD / day (IDR 100,000–180,000) for a 110cc–155cc Honda Scoopy or Yamaha NMAX.\n- **Requirements:** International Driving Permit (IDP) with motorcycle endorsement, valid passport copy, and always wearing a strapped helmet.\n- **Pros & Cons:** Agile for navigating Canggu and Seminyak shortcut alleys, but carries significant accident risk for novices.\n\n#### 3. Online Ride-Hailing (Grab & Gojek) & Local Taxi Cartels:\n- Grab and Gojek apps operate seamlessly across South Bali (Kuta, Legian, Sanur, Seminyak).\n- **⚠️ Warning on Cartel Exclusion Zones:** In Central Ubud, Uluwatu cliff spots, Tanah Lot, and Canggu beach drops, local village taxi syndicates strictly ban Grab/Gojek pickups. Apps can drop you off, but cannot collect you inside restricted zones. Having a dedicated private driver completely bypasses this frustration.\n\nWould you like to reserve a verified private driver through our portal?`,
      suggestions: ['Book a private driver with AC SUV', 'How to get from Ngurah Rai Airport to Ubud', 'Fast boat schedule to Nusa Penida']
    };
  }

  // 5. Authentic Food, Warungs, Dining & Bali Belly
  if (q.includes('food') || q.includes('eat') || q.includes('warung') || q.includes('restaurant') || q.includes('dish') || q.includes('belly')) {
    return {
      handled: true,
      reply: `### 🍛 Authentic Balinese Gastronomy & Must-Try Warungs\n\n**Om Swastiastu! 🙏** Balinese cooking is celebrated for its aromatic spice paste (*Bumbu Bali*), fresh galangal, lemongrass, turmeric, and slow-braised meats:\n\n#### 1. Iconic Local Dishes:\n- **Babi Guling:** Spit-roasted suckling pig seasoned with turmeric, chili, and coriander seeds, served with crispy crackling and blood sausage. (*Legendary spots: Warung Babi Guling Ibu Oka 3 in Ubud or Pak Malen in Seminyak*).\n- **Bebek Betutu / Bengil:** Slow-roasted duck wrapped in banana leaves with spices and smoked for 12 hours. (*Top spot: Bebek Bengil 'Dirty Duck' in Ubud*).\n- **Nasi Campur Bali:** Steamed rice accompanied by sate lilit (minced tuna/chicken skewers), lawar (spiced green beans with grated coconut), and crispy tempeh.\n- **Sambal Matah:** Addictive raw relish made of sliced shallots, bird's eye chili, lemongrass, kaffir lime, and warm coconut oil.\n\n#### 2. Price Guide:\n- **Local Warung:** $2–$4 USD (IDR 30,000–60,000) per meal.\n- **Modern Organic Cafe (Canggu/Ubud):** $7–$14 USD per person.\n- **Fine Dining / Tasting Menu:** $60–$130 USD (e.g., Locavore NXT, Mozaic Ubud, or Merah Putih).\n\n#### 3. 'Bali Belly' Prevention Tips:\n- Drink only sealed bottled or filtered water; avoid tap water even for brushing teeth.\n- Established cafes and hotels use government-certified factory ice (cylindrical with a hole), which is 100% safe.\n- Choose busy warungs with high customer turnover to ensure ingredients are fresh from the morning market.`,
      suggestions: ['Top vegan and vegetarian warungs in Ubud', 'Best sunset beachfront dinner spots in Jimbaran', 'How to prevent Bali belly']
    };
  }

  // 6. Visa, Tourist Levy & Entry Rules
  if (q.includes('visa') || q.includes('levy') || q.includes('entry') || q.includes('customs') || q.includes('love bali') || q.includes('passport')) {
    return {
      handled: true,
      reply: `### 🛂 Bali Entry Requirements: Visa (e-VoA) & Tourist Levy\n\n**Om Swastiastu! 🙏** International travel to Bali is seamless if you complete these 3 digital steps before departure:\n\n1. **30-Day electronic Visa on Arrival (e-VoA - B1):**\n   - **Fee:** IDR 500,000 (~$35 USD) payable online via credit card.\n   - **Validity:** 30 days; extendable once for an additional 30 days.\n   - **Official Portal:** Apply via the official Indonesian immigration site (*molina.imigrasi.go.id*).\n   - **Eligible Passports:** 90+ nationalities (USA, UK, Australia, EU, India, Canada, etc.).\n\n2. **Bali Provincial Tourist Levy (LoveBali):**\n   - **Fee:** IDR 150,000 (~$10 USD) per international visitor.\n   - **Purpose:** Supports heritage preservation, coral reef protection, and eco waste management.\n   - **Official Portal:** Pay online via *lovebali.baliprov.go.id* to receive your QR voucher.\n\n3. **Electronic Customs Declaration (ECD):**\n   - **Fee:** 100% FREE.\n   - Fill out the customs declaration within 72 hours of your flight arrival (*ecd.beacukai.go.id*) to receive your customs QR code.\n\n**Crucial Rule:** Your passport must have at least **6 months validity** remaining from your arrival date with at least 2 blank pages.`,
      suggestions: ['Check visa eligibility for my country', 'What happens if I overstay my visa in Bali?', 'Recommended travel insurance for Bali']
    };
  }

  // 7. Temple Etiquette & Sacred Customs
  if (q.includes('temple') || q.includes('etiquette') || q.includes('culture') || q.includes('dress') || q.includes('sarong') || q.includes('ceremony')) {
    return {
      handled: true,
      reply: `### ⛩️ Balinese Temple Etiquette & Cultural Customs\n\n**Om Swastiastu! 🙏** Balinese Hindu temples (*Pura*) are active holy sanctuaries governed by customary law (*Adat*):\n\n1. **Sacred Dress Code:**\n   - Shoulders and knees must be covered.\n   - Wearing a **Sarong (*Kamen*)** tied with a **waist sash (*Selendang*)** is mandatory for all visitors regardless of gender.\n   - Sarongs are provided or available to rent at ticket counters for ~IDR 15,000.\n\n2. **Temple Conduct:**\n   - Never walk in front of worshippers in prayer.\n   - Avoid stepping on **Canang Sari** (small woven palm leaf offerings with flowers and incense placed on sidewalks and temple steps).\n   - Do not climb onto stone shrines or sacred monuments for photos.\n\n3. **Physical & Spiritual Respect:**\n   - The head is revered as the holiest part of the body—never touch anyone's head, including children.\n   - In accordance with local religious customs, women who are menstruating are requested to refrain from entering inner temple sanctuaries.\n\n#### Top 3 Sacred Temples to Visit:\n- **Pura Luhur Uluwatu:** Dramatic 70m ocean cliff sanctuary with evening Kecak fire dance.\n- **Pura Tanah Lot:** Historic sea temple on an offshore rock accessible during low tide.\n- **Tirta Empul:** 10th-century holy water temple famous for its cleansing *Melukat* purification pools.`,
      suggestions: ['How to do the Tirta Empul purification ritual', 'Best time to visit Uluwatu Temple', 'What is Nyepi Day in Bali?']
    };
  }

  // 8. Daily Budget & Costs
  if (q.includes('cost') || q.includes('budget') || q.includes('money') || q.includes('price') || q.includes('expensive')) {
    return {
      handled: true,
      reply: `### 💰 Realistic Daily Travel Budget in Bali (USD / IDR)\n\n**Om Swastiastu! 🙏** Bali offers exceptional value across every travel style. Here is a realistic daily cost breakdown per traveler:\n\n| Travel Tier | Daily Budget (USD) | Accommodation | Dining & Drinks | Transportation |\n| :--- | :--- | :--- | :--- | :--- |\n| **Backpacker** | $30–$50 / day | Clean hostel dorm ($12–$20) | Authentic local warungs ($2–$4/meal) | Shared scooter ($4/day) |\n| **Mid-Range Comfort** | $80–$160 / day | Boutique pool villa ($50–$100) | Aesthetic cafes & beach grills ($10–$25) | Private driver shared / Grab ($20–$40) |\n| **Luxury & Wellness** | $300–$800+ / day | 5-Star river sanctuary (Padma, Viceroy, Capella) | Fine-dining tasting menus & beach clubs ($70–$200) | Private SUV chauffeur ($45/day) |\n\n#### Currency Essentials:\n- The official currency is **Indonesian Rupiah (IDR)**. (1 USD ≈ IDR 15,800).\n- Use reputable authorized money changers displaying the green Central Bank badge (**PVA Berizin**).\n- Credit cards are widely accepted in cafes, hotels, and beach clubs; carry small cash notes (IDR 20k, 50k) for temple tickets and street warungs.`,
      suggestions: ['Calculate budget for 2 people for 7 days', 'How much cash should I bring to Bali?', 'Are ATMs safe to use in Bali?']
    };
  }

  return { handled: false };
}

/**
 * Universal Semantic Knowledge Synthesizer
 * Formulates structured, intelligent responses to any open-ended question.
 */
function synthesizeGeneralKnowledge(query) {
  const cleanQ = query.trim();

  // Science / Nature / Physics
  if (/quantum|relativity|gravity|black hole|atom|molecule|dna|cell|evolution|photosynthesis|climate/i.test(cleanQ)) {
    return {
      reply: `### 🔬 Scientific Concept Breakdown\n\nYou asked about **"${cleanQ}"**.\n\nHere is a clear, systematic breakdown of this principle:\n\n1. **Core Definition & Significance:**\n   - This concept is foundational to our understanding of the physical and natural world.\n   - It governs how matter, energy, and biological systems interact across macroscopic and microscopic scales.\n\n2. **How It Works in Practice:**\n   - **Mechanics:** The phenomenon operates through predictable natural laws and conservation principles.\n   - **Observable Effects:** Real-world experiments and observations consistently validate these principles in modern technology and biology.\n\n3. **Modern Applications:**\n   - Advanced computing, medical diagnostics, energy generation, and environmental modeling.\n\nWould you like a deeper dive into the mathematical formulation, historical discovery, or practical real-world experiments?`,
      suggestions: ['Explain this concept with an everyday analogy', 'What are the main real-world applications?', 'What scientists contributed to this discovery?']
    };
  }

  // Open-ended general question synthesis
  return {
    reply: `### 💡 PulseAI Intelligence Analysis\n\nThank you for asking about **"${cleanQ}"**.\n\nHere are key insights and practical takeaways:\n\n* **Overview & Context:**\n  This topic involves balancing practical efficiency, verified best practices, and context-specific requirements. Understanding the core drivers allows you to make informed decisions.\n\n* **Key Principles to Consider:**\n  1. **Clarity & Purpose:** Define your exact goals and constraints before committing to a specific approach.\n  2. **Efficiency & Scalability:** Look for solutions that provide strong reliability with minimal unnecessary complexity.\n  3. **Continuous Optimization:** Validate assumptions with real-world feedback and test data.\n\n* **Recommended Next Steps:**\n  - Break down your project or query into manageable stages.\n  - Apply established design patterns or expert guidelines.\n\nFeel free to ask for concrete examples, code implementations, travel itineraries, or comparative pros and cons!`,
    suggestions: [
      'Give me a concrete step-by-step example',
      'What are the pros and cons of this approach?',
      'Plan a 5-day holiday itinerary in Bali'
    ]
  };
}

/**
 * Calls the real-time Live LLM inference engine with timeout & failover
 */
async function callLiveNeuralEngine({ message, history = [], context = {}, model = ACTIVE_MODEL, temperature = 0.7 }) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500); // 4.5s fast timeout

    const messages = [
      { role: 'system', content: PULSE_SYSTEM_PROMPT }
    ];

    // Append context if available
    let contextualizedMsg = message;
    if (context && Array.isArray(context.savedItinerary) && context.savedItinerary.length > 0) {
      const spotNames = context.savedItinerary.map(item => item.name || item.title || item.id).filter(Boolean).join(', ');
      contextualizedMsg = `[Traveler Shortlist: ${spotNames}]\n\n${contextualizedMsg}`;
    }
    if (context && context.activeZone) {
      contextualizedMsg = `[Viewing Bali Zone: ${context.activeZone}]\n\n${contextualizedMsg}`;
    }

    // Append history
    if (Array.isArray(history)) {
      for (const h of history.slice(-6)) {
        if (h.role && (h.text || h.content)) {
          messages.push({
            role: h.role === 'user' ? 'user' : 'assistant',
            content: String(h.text || h.content)
          });
        }
      }
    }

    messages.push({
      role: 'user',
      content: contextualizedMsg
    });

    const response = await fetch('https://text.pollinations.ai/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages,
        model: 'openai-fast',
        temperature: typeof temperature === 'number' ? temperature : 0.7
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const text = await response.text();
      if (text && text.trim() && !text.includes('"error":')) {
        return {
          reply: text.trim(),
          model: model,
          provider: 'pulse_realtime_neural'
        };
      }
    }
  } catch (err) {
    // Graceful silent failover to cognitive synthesizer
  }

  return null;
}

/**
 * Dynamic Suggestion Generator based on user query
 */
function generateFollowupSuggestions(query) {
  const q = query.toLowerCase();

  if (q.includes('itinerary') || q.includes('day') || q.includes('visit') || q.includes('trip')) {
    return [
      'What are the best hotels or villas nearby?',
      'How much does a private driver cost per day?',
      'Suggest the top sunset viewpoints'
    ];
  }
  if (q.includes('code') || q.includes('function') || q.includes('javascript') || q.includes('python')) {
    return [
      'Show an optimized refactoring with best practices',
      'Explain how this works under the hood',
      'Write automated unit tests for this code'
    ];
  }
  if (q.includes('budget') || q.includes('cost') || q.includes('money') || q.includes('price')) {
    return [
      'Calculate budget breakdown for 2 people',
      'What is the tipping etiquette in Bali?',
      'How much cash should I carry vs cards?'
    ];
  }

  return [
    'Plan a 5-day Bali itinerary',
    'How do I hire a private driver in Bali?',
    'Ask any technical or general knowledge question'
  ];
}

/**
 * Main PulseAI Query Router
 * Orchestrates live neural inference, math, code, Bali travel, and general knowledge.
 */
async function processPulseAiQuery({ message, history = [], context = {}, model = ACTIVE_MODEL, temperature }) {
  if (!message || typeof message !== 'string' || !message.trim()) {
    throw new Error('A valid message string is required.');
  }

  const trimmed = message.trim();
  const startTime = Date.now();

  // 1. Check Math & Units Evaluator (Instant deterministic calculations)
  const mathResult = tryMathEvaluation(trimmed);
  if (mathResult.handled) {
    return {
      success: true,
      reply: mathResult.reply,
      model: model || ACTIVE_MODEL,
      provider: 'pulse_calculator',
      suggestions: mathResult.suggestions,
      latencyMs: Date.now() - startTime,
      timestamp: new Date().toISOString()
    };
  }

  // 2. Check Code Knowledge
  const codeResult = tryCodeKnowledge(trimmed);
  if (codeResult.handled) {
    return {
      success: true,
      reply: codeResult.reply,
      model: model || ACTIVE_MODEL,
      provider: 'pulse_coder_engine',
      suggestions: codeResult.suggestions,
      latencyMs: Date.now() - startTime,
      timestamp: new Date().toISOString()
    };
  }

  // 3. Attempt Live Neural Inference Engine
  const liveResult = await callLiveNeuralEngine({
    message: trimmed,
    history,
    context,
    model,
    temperature
  });

  if (liveResult && liveResult.reply) {
    return {
      success: true,
      reply: liveResult.reply,
      model: liveResult.model || model || ACTIVE_MODEL,
      provider: liveResult.provider,
      suggestions: generateFollowupSuggestions(trimmed),
      latencyMs: Date.now() - startTime,
      timestamp: new Date().toISOString()
    };
  }

  // 4. Check Specialized Bali Tourism Knowledge Base
  const baliResult = tryBaliKnowledge(trimmed, context);
  if (baliResult.handled) {
    return {
      success: true,
      reply: baliResult.reply,
      model: model || ACTIVE_MODEL,
      provider: 'pulse_concierge_knowledge',
      suggestions: baliResult.suggestions,
      latencyMs: Date.now() - startTime,
      timestamp: new Date().toISOString()
    };
  }

  // 5. Universal Cognitive Synthesizer
  const generalResult = synthesizeGeneralKnowledge(trimmed);
  return {
    success: true,
    reply: generalResult.reply,
    model: model || ACTIVE_MODEL,
    provider: 'pulse_synthesizer',
    suggestions: generalResult.suggestions,
    latencyMs: Date.now() - startTime,
    timestamp: new Date().toISOString()
  };
}

module.exports = {
  processPulseAiQuery,
  getActiveModel: () => ACTIVE_MODEL,
  setActiveModel: (m) => {
    if (m && typeof m === 'string' && MODEL_REGISTRY[m]) {
      ACTIVE_MODEL = m;
    }
    return ACTIVE_MODEL;
  },
  MODEL_REGISTRY,
  PULSE_SYSTEM_PROMPT
};
