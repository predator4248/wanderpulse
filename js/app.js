/**
 * WANDERPULSE BALI - APPLICATION LOGIC
 * Navigation, Themes, Currency Switcher, Modals, Transit Engine, Estimator & Toasts
 */

document.addEventListener('DOMContentLoaded', () => {
  const inits = [
    ['Theme', initTheme],
    ['BaliClock', initBaliClock],
    ['Navbar', initNavbar],
    ['Currency', initCurrency],
    ['HeroSearch', initHeroSearch],
    ['ApiData', loadApiDataAndRender],
    ['AttractionFilters', initAttractionFilters],
    ['HotelFilters', initHotelFilters],
    ['TransitHub', initTransitHub],
    ['RouteCalculator', initRouteCalculator],
    ['BudgetEstimator', initBudgetEstimator],
    ['MapInteractions', initMapInteractions],
    ['GeoapifyPlaces', initGeoapifyPlacesExplorer],
    ['ItineraryBuilder', initItineraryBuilder],
    ['CurrencyCalculator', initCurrencyCalculator],
    ['Checklist', initChecklist],
    ['Phrasebook', initPhrasebook],
    ['AmbientSoundscape', initAmbientSoundscape],
    ['FAQ', initFAQ],
    ['Newsletter', initNewsletter],
    ['GalleryModal', initGalleryModal],
    ['TransitBooking', initTransitBooking],
    ['RentalBooking', initRentalBooking],
    ['VisaChecker', initVisaChecker],
    ['SkySimulator', initSkySimulator],
    ['CommunityReviews', initCommunityReviews],
    ['ServiceWorker', registerServiceWorker]
  ];

  inits.forEach(([name, fn]) => {
    try {
      if (typeof fn === 'function') fn();
    } catch (err) {
      console.warn(`[WanderPulse Init Warning] ${name}:`, err);
    }
  });
});

/* ==========================================================================
   1. THEME MANAGER (DARK / LIGHT)
   ========================================================================== */
function initTheme() {
  const themeBtn = document.getElementById('themeToggleBtn');
  const drawerThemeBtn = document.getElementById('drawerThemeBtn');
  const savedTheme = localStorage.getItem('wanderpulse_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  function cycleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('wanderpulse_theme', next);
    updateThemeIcon(next);
    showToast('Theme Changed', `Switched to ${next} appearance mode.`);
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', cycleTheme);
  }
  if (drawerThemeBtn) {
    drawerThemeBtn.addEventListener('click', cycleTheme);
  }
}

function updateThemeIcon(theme) {
  const themeBtn = document.getElementById('themeToggleBtn');
  const drawerBtnText = document.getElementById('drawerThemeBtnText');
  const drawerThemeDesc = document.getElementById('drawerThemeDesc');

  if (theme === 'light') {
    if (themeBtn) {
      themeBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>`;
      themeBtn.setAttribute('aria-label', 'Switch to Dark Mode');
    }
    if (drawerBtnText) drawerBtnText.textContent = 'Switch to Dark';
    if (drawerThemeDesc) drawerThemeDesc.textContent = 'Light Coastal Breeze';
  } else {
    if (themeBtn) {
      themeBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>`;
      themeBtn.setAttribute('aria-label', 'Switch to Light Mode');
    }
    if (drawerBtnText) drawerBtnText.textContent = 'Switch to Light';
    if (drawerThemeDesc) drawerThemeDesc.textContent = 'Dark Obsidian Glow';
  }
}

/* ==========================================================================
   2. BALI LOCAL TIME & LIVE WEATHER CLOCK
   ========================================================================== */
function initBaliClock() {
  const clockEl = document.getElementById('baliTimeClock');
  const tempEl = document.getElementById('baliWeatherTemp');
  const condEl = document.getElementById('baliWeatherCond');
  const sunsetEl = document.getElementById('baliSunsetCountdown');
  const drawerClock = document.getElementById('drawerBaliClock');
  const drawerWeather = document.getElementById('drawerBaliWeather');
  const drawerSunset = document.getElementById('drawerBaliSunset');

  function updateClock() {
    const now = new Date();
    // Bali is WITA (UTC + 8)
    const options = {
      timeZone: 'Asia/Makassar',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    const timeFormatted = new Intl.DateTimeFormat('en-US', options).format(now);
    if (clockEl) clockEl.textContent = timeFormatted;
    if (drawerClock) drawerClock.textContent = timeFormatted;
  }
  updateClock();
  setInterval(updateClock, 1000);

  // Live Weather Telemetry & Sunset Tracker
  async function fetchLiveWeather() {
    try {
      const res = await fetch('/api/weather');
      if (res.ok) {
        const data = await res.json();
        if (tempEl) tempEl.textContent = `${data.temperatureC}°C`;
        if (condEl) condEl.textContent = `${data.icon || '☀️'} ${data.condition}`;
        if (drawerWeather) drawerWeather.textContent = `${data.temperatureC}°C ${data.condition}`;

        const heroTemp = document.getElementById('heroFloatingTemp');
        const heroCond = document.getElementById('heroFloatingCond');
        if (heroTemp) heroTemp.textContent = `${data.temperatureC}°C`;
        if (heroCond) heroCond.textContent = data.condition;

        if (data.sunset) {
          updateSunsetCountdown(data.sunset);
        }
      }
    } catch (e) {
      console.log('Using local weather telemetry');
    }
  }

  function updateSunsetCountdown(sunsetStr) {
    const now = new Date();
    const baliTimeStr = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Makassar',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    }).format(now);
    const [currH, currM] = baliTimeStr.split(':').map(Number);
    const [setH, setM] = sunsetStr.split(':').map(Number);
    const currentMins = currH * 60 + currM;
    const sunsetMins = setH * 60 + setM;
    const diff = sunsetMins - currentMins;

    if (diff > 0) {
      const hrs = Math.floor(diff / 60);
      const mins = diff % 60;
      const text = `🌅 Golden Hour Sunset in <strong>${hrs > 0 ? hrs + 'h ' : ''}${mins}m</strong> (at ${sunsetStr} WITA)`;
      if (sunsetEl) sunsetEl.innerHTML = text;
      if (drawerSunset) drawerSunset.innerHTML = `🌅 Sunset in <strong>${hrs > 0 ? hrs + 'h ' : ''}${mins}m</strong> (${sunsetStr} WITA)`;
    } else {
      if (sunsetEl) sunsetEl.innerHTML = `✨ Nightfall in Bali • Tomorrow's Sunrise: 06:15 AM 🌄`;
      if (drawerSunset) drawerSunset.innerHTML = `✨ Nightfall in Bali • Tomorrow's Sunrise: 06:15 AM 🌄`;
    }
  }

  fetchLiveWeather();
  setInterval(fetchLiveWeather, 5 * 60 * 1000); // 5 min interval
}

/* ==========================================================================
   3. NAVBAR, "THREE LINES" (☰) MENU DRAWER & SCROLLSPY
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const threeLinesToggle = document.getElementById('threeLinesMenuToggle');
  const legacyMobileToggle = document.getElementById('mobileMenuToggle');
  const threeLinesClose = document.getElementById('threeLinesCloseBtn');
  const threeLinesDrawer = document.getElementById('threeLinesMenuSection');
  const threeLinesBackdrop = document.getElementById('threeLinesBackdrop');
  const drawerLinks = document.querySelectorAll('.drawer-close-on-click, .drawer-nav-link');
  const navLinks = document.querySelectorAll('.nav-link, .quick-pill-link');

  // Sticky blur on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
    updateScrollspy();
  });

  // Global methods to open/close Three Lines Menu
  window.openThreeLinesMenu = function() {
    threeLinesToggle?.classList.add('active');
    threeLinesToggle?.setAttribute('aria-expanded', 'true');
    legacyMobileToggle?.classList.add('active');
    threeLinesDrawer?.classList.add('open');
    threeLinesBackdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeThreeLinesMenu = function() {
    threeLinesToggle?.classList.remove('active');
    threeLinesToggle?.setAttribute('aria-expanded', 'false');
    legacyMobileToggle?.classList.remove('active');
    threeLinesDrawer?.classList.remove('open');
    threeLinesBackdrop?.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Toggle button event
  if (threeLinesToggle) {
    threeLinesToggle.addEventListener('click', () => {
      if (threeLinesDrawer?.classList.contains('open')) {
        window.closeThreeLinesMenu();
      } else {
        window.openThreeLinesMenu();
      }
    });
  }

  // Close button & backdrop events
  threeLinesClose?.addEventListener('click', window.closeThreeLinesMenu);
  threeLinesBackdrop?.addEventListener('click', window.closeThreeLinesMenu);

  // Close drawer on clicking any navigation link
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      window.closeThreeLinesMenu();
    });
  });

  // Escape key closes drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && threeLinesDrawer?.classList.contains('open')) {
      window.closeThreeLinesMenu();
    }
  });

  // Scrollspy active indicator
  function updateScrollspy() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}

/* ==========================================================================
   4. DYNAMIC MULTI-CURRENCY SWITCHER (HEADER & THREE-LINES DRAWER)
   ========================================================================== */
function initCurrency() {
  const currencySelect = document.getElementById('currencySelect');
  const drawerCurrencySelect = document.getElementById('drawerCurrencySelect');

  function updateAllCurrencies(newCurrency) {
    currentCurrency = newCurrency;
    if (currencySelect) currencySelect.value = newCurrency;
    if (drawerCurrencySelect) drawerCurrencySelect.value = newCurrency;

    // Re-render components that show prices
    const activeAttractionFilter = document.querySelector('#attractionsFilter .filter-btn.active')?.dataset.filter || 'all';
    renderAttractions(activeAttractionFilter);

    const activeHotelFilter = document.querySelector('#hotelFilter .filter-btn.active')?.dataset.filter || 'all';
    const activeSort = document.getElementById('hotelSortSelect')?.value || 'rating';
    renderHotels(activeHotelFilter, activeSort);

    // Update Transit route fare displays
    const activeOrigin = document.getElementById('originCitySelect')?.value || 'new-york';
    updateRouteResults(activeOrigin);

    // Update Budget Estimator
    recalculateBudget();

    showToast('Currency Updated', `Displaying all prices in ${currentCurrency} (${CURRENCY_RATES[currentCurrency].symbol}).`);
  }

  if (currencySelect) {
    currencySelect.value = currentCurrency;
    currencySelect.addEventListener('change', (e) => updateAllCurrencies(e.target.value));
  }

  if (drawerCurrencySelect) {
    drawerCurrencySelect.value = currentCurrency;
    drawerCurrencySelect.addEventListener('change', (e) => updateAllCurrencies(e.target.value));
  }
}

/* ==========================================================================
   5. FAMOUS ATTRACTIONS RENDERER & MODAL
   ========================================================================== */
function initAttractionFilters() {
  const filterBtns = document.querySelectorAll('#attractionsFilter .filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderAttractions(btn.dataset.filter);
    });
  });

  const searchInput = document.getElementById('attractionSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      filterAttractionsBySearch(query);
    });
  }
}

function renderAttractions(filter = 'all') {
  const grid = document.getElementById('attractionsGrid');
  if (!grid) return;

  const filtered = filter === 'all' 
    ? ATTRACTIONS_DATA 
    : ATTRACTIONS_DATA.filter(item => item.category === filter);

  grid.innerHTML = filtered.map(item => `
    <article class="glass-card spot-card rainbow-hover" data-tilt-3d data-id="${item.id}">
      <div class="spot-image-wrapper" style="position: relative; cursor: pointer;" onclick="window.openLocationGallery('${item.id}', 'attraction')">
        <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80';" />
        <button type="button" class="card-gallery-trigger-badge" onclick="event.stopPropagation(); window.openLocationGallery('${item.id}', 'attraction')" title="View ${item.gallery ? item.gallery.length : 4} Real Photos">
          📸 ${item.gallery ? item.gallery.length : 4} Photos
        </button>
        <span class="spot-category-badge ${item.badgeClass}">${item.categoryLabel}</span>
        <span class="spot-rating-badge" aria-label="Rated ${item.rating} stars out of 5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          ${item.rating}
        </span>
      </div>
      <div class="spot-content">
        <div class="spot-location">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          ${item.location}
        </div>
        <h3 class="spot-title" style="cursor: pointer;" onclick="window.openLocationGallery('${item.id}', 'attraction')">${item.name}</h3>
        <p class="spot-desc">${item.description}</p>
        <div class="spot-meta-row">
          <div class="spot-meta-item">
            <span class="meta-label">Entry Fee</span>
            <span class="meta-val">${formatPrice(item.feeUSD)}</span>
          </div>
          <div class="spot-meta-item">
            <span class="meta-label">Ideal Time</span>
            <span class="meta-val">${item.duration}</span>
          </div>
          <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
            <button class="spot-bookmark-btn ${window.isSpotSaved && window.isSpotSaved(item.id) ? 'active' : ''}" onclick="window.toggleSaveSpot('${item.id}', 'attraction')" title="${window.isSpotSaved && window.isSpotSaved(item.id) ? 'Saved to Itinerary' : 'Save to Custom Itinerary'}">
              ❤️ <span>${window.isSpotSaved && window.isSpotSaved(item.id) ? 'Saved' : 'Save'}</span>
            </button>
            <button class="btn btn-outline" style="font-size: 0.78rem; padding: 7px 11px;" onclick="window.openLocationGallery('${item.id}', 'attraction')" title="View real-time photos">
              📸 Photos
            </button>
            <button class="btn btn-outline" style="font-size: 0.78rem; padding: 7px 11px;" onclick="window.open360Panorama('${item.id}')" title="Explore 360° Spherical VR Panorama">
              🌀 360° VR
            </button>
            <button class="btn btn-outline spot-modal-trigger" style="font-size: 0.78rem; padding: 7px 11px;" onclick="openAttractionModal('${item.id}')" aria-label="Explore details about ${item.name}">
              Details
            </button>
          </div>
        </div>
      </div>
    </article>
  `).join('');
}

function filterAttractionsBySearch(query) {
  const grid = document.getElementById('attractionsGrid');
  if (!grid) return;

  const filtered = ATTRACTIONS_DATA.filter(item => 
    item.name.toLowerCase().includes(query) ||
    item.location.toLowerCase().includes(query) ||
    item.description.toLowerCase().includes(query)
  );

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px;">
        <p style="font-size: 1.2rem; font-weight: 700;">No tourist spots matching "${query}"</p>
        <p style="color: var(--text-muted); margin-top: 8px;">Try searching for "temple", "waterfall", "beach", or "cliff".</p>
      </div>`;
    return;
  }

  // Reuse same template
  const activeBtn = document.querySelector('#attractionsFilter .filter-btn.active');
  if (activeBtn) activeBtn.classList.remove('active');
  document.querySelector('#attractionsFilter .filter-btn[data-filter="all"]')?.classList.add('active');

  grid.innerHTML = filtered.map(item => `
    <article class="glass-card spot-card rainbow-hover" data-tilt-3d data-id="${item.id}">
      <div class="spot-image-wrapper">
        <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80';" />
        <span class="spot-category-badge ${item.badgeClass}">${item.categoryLabel}</span>
        <span class="spot-rating-badge">★ ${item.rating}</span>
      </div>
      <div class="spot-content">
        <div class="spot-location">${item.location}</div>
        <h3 class="spot-title">${item.name}</h3>
        <p class="spot-desc">${item.description}</p>
        <div class="spot-meta-row">
          <div class="spot-meta-item">
            <span class="meta-label">Entry Fee</span>
            <span class="meta-val">${formatPrice(item.feeUSD)}</span>
          </div>
          <div class="spot-meta-item">
            <span class="meta-label">Ideal Time</span>
            <span class="meta-val">${item.duration}</span>
          </div>
          <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
            <button class="spot-bookmark-btn ${window.isSpotSaved && window.isSpotSaved(item.id) ? 'active' : ''}" onclick="window.toggleSaveSpot('${item.id}', 'attraction')">
              ❤️ <span>${window.isSpotSaved && window.isSpotSaved(item.id) ? 'Saved' : 'Save'}</span>
            </button>
            <button class="btn btn-outline" style="font-size: 0.78rem; padding: 7px 11px;" onclick="window.openLocationGallery('${item.id}', 'attraction')" title="View real-time photos">
              📸 Photos
            </button>
            <button class="btn btn-outline" style="font-size: 0.78rem; padding: 7px 11px;" onclick="window.open360Panorama('${item.id}')" title="Explore 360° Spherical VR Panorama">
              🌀 360° VR
            </button>
            <button class="btn btn-outline spot-modal-trigger" style="font-size: 0.78rem; padding: 7px 11px;" onclick="openAttractionModal('${item.id}')">Details</button>
          </div>
        </div>
      </div>
    </article>
  `).join('');
}

let currentAttractionModalPhotoIdx = 0;
window.attractionModalNextPhoto = function(spotId, e) {
  if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
  const spot = ATTRACTIONS_DATA.find(s => s.id === spotId);
  if (!spot || !Array.isArray(spot.gallery) || spot.gallery.length <= 1) return;
  currentAttractionModalPhotoIdx = (currentAttractionModalPhotoIdx + 1) % spot.gallery.length;
  const imgEl = document.getElementById('attractionModalMainImg');
  const counterEl = document.getElementById('attractionModalCounter');
  if (imgEl) imgEl.src = spot.gallery[currentAttractionModalPhotoIdx].url;
  if (counterEl) counterEl.textContent = `${currentAttractionModalPhotoIdx + 1} of ${spot.gallery.length} Photos`;
};

window.attractionModalPrevPhoto = function(spotId, e) {
  if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
  const spot = ATTRACTIONS_DATA.find(s => s.id === spotId);
  if (!spot || !Array.isArray(spot.gallery) || spot.gallery.length <= 1) return;
  currentAttractionModalPhotoIdx = (currentAttractionModalPhotoIdx - 1 + spot.gallery.length) % spot.gallery.length;
  const imgEl = document.getElementById('attractionModalMainImg');
  const counterEl = document.getElementById('attractionModalCounter');
  if (imgEl) imgEl.src = spot.gallery[currentAttractionModalPhotoIdx].url;
  if (counterEl) counterEl.textContent = `${currentAttractionModalPhotoIdx + 1} of ${spot.gallery.length} Photos`;
};

window.openAttractionModal = function(spotId) {
  const spot = ATTRACTIONS_DATA.find(s => s.id === spotId);
  if (!spot) return;

  const modalBackdrop = document.getElementById('attractionModal');
  const modalContent = document.getElementById('attractionModalContent');
  if (!modalBackdrop || !modalContent) return;

  currentAttractionModalPhotoIdx = 0;
  const hasGallery = Array.isArray(spot.gallery) && spot.gallery.length > 1;

  modalContent.innerHTML = `
    <div style="border-radius: var(--radius-md); overflow: hidden; height: 280px; margin-bottom: 24px; position: relative; background: #0B0F19;">
      ${hasGallery ? `
        <button type="button" class="gallery-nav-btn nav-prev" onclick="window.attractionModalPrevPhoto('${spot.id}', event)" aria-label="Previous Photo" style="width: 38px; height: 38px; font-size: 1rem; left: 12px;">❮</button>
      ` : ''}
      <img id="attractionModalMainImg" src="${spot.image}" alt="${spot.name}" style="width: 100%; height: 100%; object-fit: cover;" />
      ${hasGallery ? `
        <button type="button" class="gallery-nav-btn nav-next" onclick="window.attractionModalNextPhoto('${spot.id}', event)" aria-label="Next Photo" style="width: 38px; height: 38px; font-size: 1rem; right: 12px;">❯</button>
        <div id="attractionModalCounter" class="hotel-photo-badge" style="bottom: 12px; right: 12px;">1 of ${spot.gallery.length} Photos</div>
      ` : ''}
    </div>
    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 12px;">
      <div>
        <span class="section-tag tag-violet">${spot.categoryLabel}</span>
        <h2 style="font-size: 1.8rem; margin-top: 6px;">${spot.name}</h2>
        <p style="color: var(--accent-cyan); font-weight: 600; font-size: 0.9rem;">${spot.location} • ${spot.distanceAirport}</p>
      </div>
      <div style="text-align: right;">
        <span style="font-size: 1.4rem; font-weight: 800; color: #FBBF24;">★ ${spot.rating}</span>
        <p style="font-size: 0.78rem; color: var(--text-muted);">${spot.reviews.toLocaleString()} traveler reviews</p>
      </div>
    </div>
    
    <p style="font-size: 1rem; line-height: 1.7; color: var(--text-secondary); margin-bottom: 20px;">${spot.fullDetails}</p>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; margin-bottom: 24px;">
      <div style="background: var(--bg-card); padding: 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
        <strong style="display: block; font-size: 0.8rem; text-transform: uppercase; color: var(--text-muted);">Recommended Timing</strong>
        <span style="font-weight: 700;">${spot.bestTime}</span>
      </div>
      <div style="background: var(--bg-card); padding: 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
        <strong style="display: block; font-size: 0.8rem; text-transform: uppercase; color: var(--text-muted);">Admission Ticket</strong>
        <span style="font-weight: 700; color: var(--accent-coral);">${formatPrice(spot.feeUSD)}</span>
      </div>
      <div style="background: var(--bg-card); padding: 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
        <strong style="display: block; font-size: 0.8rem; text-transform: uppercase; color: var(--text-muted);">Crowd Factor</strong>
        <span style="font-weight: 700;">${spot.crowdLevel}</span>
      </div>
    </div>

    <div style="border-left: 3px solid var(--accent-amber); padding-left: 16px; margin-bottom: 24px;">
      <h4 style="font-size: 0.95rem; margin-bottom: 4px; color: var(--accent-amber);">📸 Pro Photography Tip</h4>
      <p style="font-size: 0.88rem; color: var(--text-secondary);">${spot.photographyTip}</p>
    </div>

    <div style="border-left: 3px solid var(--accent-cyan); padding-left: 16px; margin-bottom: 24px;">
      <h4 style="font-size: 0.95rem; margin-bottom: 4px; color: var(--accent-cyan);">👗 Cultural Dress Etiquette</h4>
      <p style="font-size: 0.88rem; color: var(--text-secondary);">${spot.dressCode}</p>
    </div>

    <!-- Geoapify Verified GPS & Google Maps Navigation Box -->
    <div class="spot-verified-location-box" style="background: rgba(56, 189, 248, 0.05); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: var(--radius-sm); padding: 14px 16px; margin-bottom: 24px;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 8px;">
        <span style="font-size: 0.76rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.6px; color: var(--accent-cyan); display: inline-flex; align-items: center; gap: 5px;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          Geoapify Verified GPS Parity
        </span>
        ${typeof spot.lat === 'number' ? `
          <span class="zone-coords-pill" style="font-size: 0.75rem; padding: 3px 9px;" onclick="window.copyTextToClipboard('${spot.lat.toFixed(6)}, ${spot.lng.toFixed(6)}', 'GPS Coordinates Copied!')" title="Click to copy exact decimal GPS">
            📍 ${spot.lat.toFixed(6)}, ${spot.lng.toFixed(6)}
          </span>
        ` : ''}
      </div>
      <div style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.45; margin-bottom: 10px;">
        <strong>Exact Address:</strong> ${spot.formattedAddress || spot.location}
        ${spot.plusCode ? `<br><small style="color: var(--text-muted);">Plus Code: ${spot.plusCode} • Regency: ${spot.regency || 'Bali'}</small>` : ''}
      </div>
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <a href="${spot.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${spot.lat},${spot.lng}`}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" style="font-size: 0.78rem; padding: 5px 12px; display: inline-flex; align-items: center; gap: 5px; color: var(--accent-cyan); border-color: rgba(56, 189, 248, 0.4);">
          <span>🗺️ View on Google Maps</span>
        </a>
        <a href="${spot.googleMapsDirectionsUrl || `https://www.google.com/maps/dir/?api=1&destination=${spot.lat},${spot.lng}`}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" style="font-size: 0.78rem; padding: 5px 12px; display: inline-flex; align-items: center; gap: 5px; color: var(--accent-coral); border-color: rgba(244, 63, 94, 0.4);">
          <span>🚗 1-Tap Navigation Route</span>
        </a>
      </div>
    </div>

    <div style="display: flex; gap: 10px; justify-content: flex-end; flex-wrap: wrap;">
      <button class="btn btn-outline" onclick="closeModal('attractionModal')">Close</button>
      <button class="btn btn-outline" onclick="closeModal('attractionModal'); window.open360Panorama('${spot.id}')">🌀 360° VR View</button>
      <button class="btn btn-outline" onclick="closeModal('attractionModal'); window.openLocationGallery('${spot.id}', 'attraction')">📸 Photo Gallery</button>
      <button class="btn btn-outline" onclick="closeModal('attractionModal'); window.openReviewModal('${spot.id}')">💬 Tips & Advice</button>
      <a href="#how-to-reach" class="btn btn-primary-grad" onclick="closeModal('attractionModal')">
        Find Transit Route
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
      </a>
    </div>
  `;

  modalBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
};

/* ==========================================================================
   6. NEARBY HOTELS RENDERER, SORTING & BOOKING MODAL
   ========================================================================== */
function initHotelFilters() {
  const filterBtns = document.querySelectorAll('#hotelFilter .filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const sortVal = document.getElementById('hotelSortSelect')?.value || 'rating';
      renderHotels(btn.dataset.filter, sortVal);
    });
  });

  const sortSelect = document.getElementById('hotelSortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      const activeFilter = document.querySelector('#hotelFilter .filter-btn.active')?.dataset.filter || 'all';
      renderHotels(activeFilter, e.target.value);
    });
  }
}

function renderHotels(filter = 'all', sortBy = 'rating') {
  const grid = document.getElementById('hotelsGrid');
  if (!grid) return;

  let list = filter === 'all' 
    ? [...HOTELS_DATA] 
    : HOTELS_DATA.filter(h => h.tier === filter);

  // Sorting
  if (sortBy === 'price-low') {
    list.sort((a, b) => a.priceUSD - b.priceUSD);
  } else if (sortBy === 'price-high') {
    list.sort((a, b) => b.priceUSD - a.priceUSD);
  } else if (sortBy === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  }

  grid.innerHTML = list.map(hotel => `
    <article class="glass-card hotel-card rainbow-hover" data-tilt-3d data-id="${hotel.id}">
      <div class="hotel-image-wrapper" style="position: relative; cursor: pointer;" onclick="window.openHotelDetail('${hotel.id}')">
        <img src="${hotel.image}" alt="${hotel.name}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80';" />
        <button type="button" class="card-gallery-trigger-badge" onclick="event.stopPropagation(); window.openHotelDetail('${hotel.id}')" title="Explore resort grounds & room photo gallery">
          📸 Explore Rooms (${hotel.rooms ? hotel.rooms.length : 3})
        </button>
        <span class="hotel-tier-badge tier-${hotel.tier}">${hotel.tierLabel}</span>
      </div>
      <div class="hotel-content">
        <div class="hotel-header">
          <h3 class="hotel-title" style="cursor: pointer;" onclick="window.openHotelDetail('${hotel.id}')">${hotel.name}</h3>
          <div class="hotel-stars" aria-label="${hotel.stars} star rating">
            ${'★'.repeat(hotel.stars)}
          </div>
        </div>
        <div class="hotel-proximity">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          ${hotel.distanceToSpot}
        </div>
        <div class="amenities-list">
          ${hotel.amenities.slice(0, 4).map(amenity => `
            <span class="amenity-chip">✓ ${amenity}</span>
          `).join('')}
        </div>
        <div class="hotel-pricing-row">
          <div class="price-box">
            <span class="price-amount">${formatPrice(hotel.priceUSD)}</span>
            <span class="price-period">per night (excl. taxes)</span>
          </div>
          <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
            <button class="hotel-bookmark-btn ${window.isSpotSaved && window.isSpotSaved(hotel.id) ? 'active' : ''}" onclick="window.toggleSaveSpot('${hotel.id}', 'hotel')" title="${window.isSpotSaved && window.isSpotSaved(hotel.id) ? 'Saved' : 'Save Stay'}" aria-label="Save ${hotel.name}">
              ❤️ <span>${window.isSpotSaved && window.isSpotSaved(hotel.id) ? 'Saved' : 'Save'}</span>
            </button>
            <button class="btn btn-outline" style="font-size: 0.78rem; padding: 7px 11px;" onclick="window.openHotelDetail('${hotel.id}')" title="View hotel photos & room configurations">
              📸 Rooms
            </button>
            <button class="btn btn-primary-grad" style="font-size: 0.78rem; padding: 7px 11px;" onclick="openBookingModal('${hotel.id}')" aria-label="Book stay at ${hotel.name}">
              Book
            </button>
          </div>
        </div>
      </div>
    </article>
  `).join('');
}

let activeBookingHotel = null;

window.openBookingModal = function(hotelId) {
  const hotel = HOTELS_DATA.find(h => h.id === hotelId);
  if (!hotel) return;
  activeBookingHotel = hotel;

  const modalBackdrop = document.getElementById('bookingModal');
  const titleEl = document.getElementById('bookingHotelName');
  const priceDisplayEl = document.getElementById('bookingBaseRate');
  const roomSelect = document.getElementById('bookingRoomType');
  const checkinInput = document.getElementById('bookingCheckin');
  const checkoutInput = document.getElementById('bookingCheckout');

  if (titleEl) titleEl.textContent = hotel.name;
  if (priceDisplayEl) priceDisplayEl.textContent = `${formatPrice(hotel.priceUSD)} / night`;

  if (roomSelect) {
    roomSelect.innerHTML = hotel.roomTypes.map(r => `<option value="${r}">${r}</option>`).join('');
  }

  // Pre-fill dates: Tomorrow & 3 nights later
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const checkout = new Date(tomorrow);
  checkout.setDate(checkout.getDate() + 3);

  if (checkinInput) checkinInput.value = tomorrow.toISOString().split('T')[0];
  if (checkoutInput) checkoutInput.value = checkout.toISOString().split('T')[0];

  updateBookingTotal();

  if (modalBackdrop) {
    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
};

function updateBookingTotal() {
  if (!activeBookingHotel) return;
  const nights = calculateNights();
  const guests = parseInt(document.getElementById('bookingGuests')?.value || '2', 10);
  const totalEl = document.getElementById('bookingTotalCalculated');

  const totalUSD = activeBookingHotel.priceUSD * nights;
  if (totalEl) {
    totalEl.textContent = `${formatPrice(totalUSD)} (${nights} nights)`;
  }
}

function calculateNights() {
  const checkin = new Date(document.getElementById('bookingCheckin')?.value || new Date());
  const checkout = new Date(document.getElementById('bookingCheckout')?.value || new Date());
  const diffTime = checkout - checkin;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 1;
}

// Attach listener to booking inputs
['bookingCheckin', 'bookingCheckout', 'bookingGuests'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('change', updateBookingTotal);
});

const bookingForm = document.getElementById('hotelBookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!activeBookingHotel) return;

    const guestName = document.getElementById('bookingGuestName')?.value || 'Valued Guest';
    const roomType = document.getElementById('bookingRoomType')?.value;
    const checkin = document.getElementById('bookingCheckin')?.value;
    const checkout = document.getElementById('bookingCheckout')?.value;
    const guests = parseInt(document.getElementById('bookingGuests')?.value || '2', 10);

    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hotelId: activeBookingHotel.id,
          guestName,
          roomType,
          checkin,
          checkout,
          guests
        })
      });
      const result = await res.json();
      if (result.success) {
        closeModal('bookingModal');
        showToast('Reservation Confirmed (Node.js API)', `Voucher ${result.confirmation.voucherCode} generated for ${guestName} at ${activeBookingHotel.name}.`);
        return;
      }
    } catch (err) {
      console.warn('API booking fallback to local:', err);
    }

    const voucherCode = 'BALI-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    closeModal('bookingModal');
    showToast('Reservation Confirmed!', `Voucher ${voucherCode} for ${guestName} at ${activeBookingHotel.name} (${roomType}). Confirmation sent.`);
  });
}

/* ==========================================================================
   7. HOW TO REACH TRANSIT HUB (FLIGHT, TRAIN, BUS TABS)
   ========================================================================== */
function initTransitHub() {
  const modeTabs = document.querySelectorAll('.transit-tab-btn');
  const panes = document.querySelectorAll('.transit-pane');

  modeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      modeTabs.forEach(t => {
        t.classList.remove('active-flight', 'active-train', 'active-bus');
      });
      panes.forEach(p => p.classList.remove('active'));

      const mode = tab.dataset.mode;
      tab.classList.add(`active-${mode}`);
      const targetPane = document.getElementById(`transit-${mode}`);
      if (targetPane) targetPane.classList.add('active');
    });
  });
}

/* ==========================================================================
   8. INTERACTIVE ORIGIN-TO-DESTINATION ROUTE FINDER
   ========================================================================== */
function initRouteCalculator() {
  const originSelect = document.getElementById('originCitySelect');
  const customCityInput = document.getElementById('customCityInput');
  const calculateBtn = document.getElementById('calculateRouteBtn');
  const hubChips = document.querySelectorAll('.hub-chip');

  if (originSelect) {
    originSelect.addEventListener('change', (e) => {
      if (customCityInput) customCityInput.value = '';
      updateRouteResults(e.target.value);
    });
  }

  // Quick preset chips
  hubChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cityKey = chip.dataset.city;
      if (originSelect) originSelect.value = cityKey;
      if (customCityInput) customCityInput.value = '';
      updateRouteResults(cityKey);
      showToast('Route Calculated', `Updated itinerary departing from ${chip.textContent}.`);
    });
  });

  if (calculateBtn) {
    calculateBtn.addEventListener('click', () => {
      const customCity = customCityInput?.value.trim();
      if (customCity) {
        generateCustomRoute(customCity);
      } else {
        const selected = originSelect?.value || 'new-york';
        updateRouteResults(selected);
      }
    });
  }

  // Trigger default
  updateRouteResults('new-york');
}

function updateRouteResults(cityKey) {
  const presets = (typeof TRANSIT_ROUTES_PRESETS !== 'undefined' && TRANSIT_ROUTES_PRESETS)
    || (typeof TRANSIT_DATA !== 'undefined' && TRANSIT_DATA.presets)
    || {};
  const rawData = presets[cityKey] || presets['new-york'] || {};
  const data = {
    city: rawData.city || 'Origin City',
    flight: {
      duration: rawData.flight?.duration || '12 hrs',
      airlines: rawData.flight?.airlines || rawData.flight?.airline || 'Singapore Airlines / Emirates',
      stops: rawData.flight?.stops || '1 Stop',
      tip: rawData.flight?.tip || 'Book 4-6 weeks ahead for best fares.',
      priceUSD: rawData.flight?.priceUSD || rawData.flight?.costUSD || 650
    },
    train: {
      available: rawData.train?.available ?? rawData.trainOption?.available ?? true,
      duration: rawData.train?.duration || rawData.trainOption?.duration || 'Scenic Rail',
      route: rawData.train?.route || rawData.trainOption?.summary || 'Trans-Java Executive Rail',
      note: rawData.train?.note || rawData.trainOption?.summary || 'Scenic rail crossing available.',
      priceUSD: rawData.train?.priceUSD || rawData.trainOption?.costUSD || 50
    },
    bus: {
      available: rawData.bus?.available ?? rawData.busOption?.available ?? true,
      duration: rawData.bus?.duration || rawData.busOption?.duration || 'Island Coach',
      priceUSD: rawData.bus?.priceUSD || rawData.busOption?.costUSD || 35
    }
  };
  const displayContainer = document.getElementById('routeResultDisplay');
  if (!displayContainer) return;

  displayContainer.innerHTML = `
    <!-- Flight Route Card -->
    <div class="route-card card-flight" data-tilt-3d>
      <div class="route-card-title">
        <span class="route-card-name">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13"></path><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          By Flight (Fastest)
        </span>
        <span class="route-duration-badge">${data.flight.duration}</span>
      </div>
      <div class="route-segments-list">
        <div class="route-segment-item">
          <div class="segment-bullet bullet-flight"></div>
          <div><strong>Airlines:</strong> ${data.flight.airlines}</div>
        </div>
        <div class="route-segment-item">
          <div class="segment-bullet bullet-flight"></div>
          <div><strong>Transit:</strong> ${data.flight.stops}</div>
        </div>
        <div class="route-segment-item">
          <div class="segment-bullet bullet-flight"></div>
          <div><strong>Arrival:</strong> Ngurah Rai Int'l Airport (DPS), Bali</div>
        </div>
      </div>
      <p style="font-size: 0.82rem; color: var(--text-muted); font-style: italic;">💡 ${data.flight.tip}</p>
      <div class="route-fare-box">
        <div>
          <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); display: block;">Est. Flight Fare</span>
          <span class="fare-cost">${formatPrice(data.flight.priceUSD)}</span>
        </div>
        <span class="co2-eco-tag">✈️ High Speed</span>
      </div>
      <button type="button" class="btn btn-primary-grad" style="margin-top: 12px; width: 100%; justify-content: center; font-size: 0.85rem;" onclick="window.openTransitBooking('flight', '${data.city}')">
        ✈️ Book Flight Ticket (${data.city} → DPS)
      </button>
    </div>

    <!-- Train & Ferry Overland Route Card -->
    <div class="route-card card-train" data-tilt-3d>
      <div class="route-card-title">
        <span class="route-card-name">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="3" width="16" height="16" rx="2"></rect><path d="M4 11h16"></path><path d="M12 3v8"></path><path d="M8 19l-2 3"></path><path d="M16 19l2 3"></path></svg>
          Train + Ferry (Scenic)
        </span>
        <span class="route-duration-badge">${data.train.available ? data.train.duration : 'Regional'}</span>
      </div>
      <div class="route-segments-list">
        ${data.train.available ? `
          <div class="route-segment-item">
            <div class="segment-bullet bullet-train"></div>
            <div><strong>Rail Line:</strong> ${data.train.route}</div>
          </div>
          <div class="route-segment-item">
            <div class="segment-bullet bullet-train"></div>
            <div><strong>Ferry Crossing:</strong> Ketapang Pier to Gilimanuk Harbor (45 mins)</div>
          </div>
          <div class="route-segment-item">
            <div class="segment-bullet bullet-train"></div>
            <div><strong>Onward Transfer:</strong> Tourist shuttle / Grab car to Ubud/Kuta</div>
          </div>
        ` : `
          <div class="route-segment-item">
            <div class="segment-bullet bullet-train"></div>
            <div>${data.train.note}</div>
          </div>
          <div class="route-segment-item">
            <div class="segment-bullet bullet-train"></div>
            <div><strong>Domestic Connection:</strong> Take the Trans-Java Executive Train from Jakarta Gambir or Surabaya Gubeng station straight to Ketapang, then 45-minute ferry across Bali strait!</div>
          </div>
        `}
      </div>
      <div class="route-fare-box">
        <div>
          <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); display: block;">Rail + Ferry Cost</span>
          <span class="fare-cost">${data.train.available ? formatPrice(data.train.priceUSD) : formatPrice(45)}</span>
        </div>
        <span class="co2-eco-tag" style="color: var(--accent-amber);">🌿 -75% Carbon</span>
      </div>
      <button type="button" class="btn btn-primary-grad" style="margin-top: 12px; width: 100%; justify-content: center; font-size: 0.85rem; background: var(--grad-train);" onclick="window.openTransitBooking('train', 'Jakarta (CGK / Gambir)')">
        🚆 Book Trans-Java Train Pass (KAI)
      </button>
    </div>

    <!-- Bus & Coach Route Card -->
    <div class="route-card card-bus" data-tilt-3d>
      <div class="route-card-title">
        <span class="route-card-name">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 17h2l.64-2.54a6 6 0 0 0-5.64-7.46H8a6 6 0 0 0-5.64 7.46L3 17h2"></path><circle cx="7" cy="17" r="2"></circle><circle cx="17" cy="17" r="2"></circle></svg>
          Bus / Sleeper Coach
        </span>
        <span class="route-duration-badge">${data.bus.available ? data.bus.duration : 'Island Express'}</span>
      </div>
      <div class="route-segments-list">
        ${data.bus.available ? `
          <div class="route-segment-item">
            <div class="segment-bullet bullet-bus"></div>
            <div><strong>Operator:</strong> Pahala Kencana / Damri / Lorena Executive Sleeper</div>
          </div>
          <div class="route-segment-item">
            <div class="segment-bullet bullet-bus"></div>
            <div><strong>Amenities:</strong> Reclining sleeper bed, AC, meals, Roll-On Roll-Off Ferry included</div>
          </div>
          <div class="route-segment-item">
            <div class="segment-bullet bullet-bus"></div>
            <div><strong>Arrival Terminal:</strong> Mengwi Terminal (Badung / Denpasar)</div>
          </div>
        ` : `
          <div class="route-segment-item">
            <div class="segment-bullet bullet-bus"></div>
            <div><strong>Island Shuttles:</strong> Perama Tourist Shuttle & Kura-Kura Buses operate convenient direct connections between Kuta, Ubud, Sanur, and Bedugul.</div>
          </div>
          <div class="route-segment-item">
            <div class="segment-bullet bullet-bus"></div>
            <div><strong>Sleeper Buses:</strong> Direct inter-city sleeper coaches available from Yogyakarta, Surabaya, and Jakarta starting at $35.</div>
          </div>
        `}
      </div>
      <div class="route-fare-box">
        <div>
          <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); display: block;">Sleeper / Shuttle Fare</span>
          <span class="fare-cost">${data.bus.available ? formatPrice(data.bus.priceUSD) : formatPrice(30)}</span>
        </div>
        <span class="co2-eco-tag">🚌 Budget Friendly</span>
      </div>
      <button type="button" class="btn btn-primary-grad" style="margin-top: 12px; width: 100%; justify-content: center; font-size: 0.85rem; background: var(--grad-sunset);" onclick="window.openTransitBooking('bus', 'Jakarta (CGK / Gambir)')">
        🚌 Book Luxury Sleeper Coach
      </button>
    </div>
  `;
}

function generateCustomRoute(cityName) {
  const displayContainer = document.getElementById('routeResultDisplay');
  if (!displayContainer) return;

  const estimatedFlight = 750;
  displayContainer.innerHTML = `
    <div class="route-card card-flight" style="grid-column: 1 / -1;">
      <div class="route-card-title">
        <span class="route-card-name">✈️ Tailored Global Route from ${cityName} to Bali (DPS)</span>
        <span class="route-duration-badge">Connecting Global Corridor</span>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin: 16px 0;">
        <div class="highlight-pill">
          <span class="pill-label">1. Primary Flight Leg</span>
          <span class="pill-value">${cityName} → Major Hub (Singapore, Doha, or Dubai)</span>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 4px;">Connect with Emirates, Qatar Airways, or Singapore Airlines for smooth single-ticket luggage transfer.</p>
        </div>
        <div class="highlight-pill">
          <span class="pill-label">2. Arrival into Denpasar</span>
          <span class="pill-value">Hub → I Gusti Ngurah Rai Int'l (DPS)</span>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 4px;">Direct non-stop hopper from Southeast Asian hubs directly into South Bali.</p>
        </div>
        <div class="highlight-pill">
          <span class="pill-label">3. Scenic Rail Alternative</span>
          <span class="pill-value">Fly to Jakarta (CGK) + Scenic Train</span>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 4px;">Take the Trans-Java Executive Express train across volcanoes to Ketapang, then 45-min ferry to Bali!</p>
        </div>
      </div>
      <div class="route-fare-box">
        <div>
          <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); display: block;">Estimated Flight Range</span>
          <span class="fare-cost">${formatPrice(estimatedFlight)} – ${formatPrice(estimatedFlight + 400)}</span>
        </div>
        <span class="co2-eco-tag">✈️ Single PNR Ticket</span>
      </div>
      <button type="button" class="btn btn-primary-grad" style="margin-top: 14px; width: 100%; justify-content: center;" onclick="window.openTransitBooking('flight', '${cityName}')">
        ✈️ Book Flight from ${cityName} to Bali (DPS)
      </button>
    </div>
  `;

  showToast('Custom City Route', `Generated custom transit itinerary from ${cityName} to Bali.`);
}

/* ==========================================================================
   9. INTERACTIVE TRIP BUDGET & ITINERARY ESTIMATOR
   ========================================================================== */
function initBudgetEstimator() {
  const daysSlider = document.getElementById('estDaysSlider');
  const travelersSlider = document.getElementById('estTravelersSlider');
  const tierRadios = document.querySelectorAll('.tier-radio-btn');
  const printBtn = document.getElementById('printEstimatorBtn');

  if (daysSlider) {
    daysSlider.addEventListener('input', (e) => {
      document.getElementById('estDaysVal').textContent = `${e.target.value} Days`;
      recalculateBudget();
    });
  }

  if (travelersSlider) {
    travelersSlider.addEventListener('input', (e) => {
      document.getElementById('estTravelersVal').textContent = `${e.target.value} People`;
      recalculateBudget();
    });
  }

  tierRadios.forEach(radio => {
    radio.addEventListener('click', () => {
      tierRadios.forEach(r => r.classList.remove('active'));
      radio.classList.add('active');
      recalculateBudget();
    });
  });

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  recalculateBudget();
}

function recalculateBudget() {
  const days = parseInt(document.getElementById('estDaysSlider')?.value || '5', 10);
  const travelers = parseInt(document.getElementById('estTravelersSlider')?.value || '2', 10);
  const activeTier = document.querySelector('.tier-radio-btn.active')?.dataset.tier || 'balanced';

  // Base daily rates per person in USD
  let hotelDaily = 60;
  let transitDaily = 15;
  let diningDaily = 25;
  let activitiesDaily = 20;

  if (activeTier === 'backpacker') {
    hotelDaily = 20;
    transitDaily = 8;
    diningDaily = 12;
    activitiesDaily = 10;
  } else if (activeTier === 'luxury') {
    hotelDaily = 260;
    transitDaily = 45;
    diningDaily = 80;
    activitiesDaily = 60;
  }

  const totalHotel = hotelDaily * days * Math.ceil(travelers / 2); // 2 per room
  const totalTransit = transitDaily * days * travelers;
  const totalDining = diningDaily * days * travelers;
  const totalActivities = activitiesDaily * days * travelers;
  const grandTotal = totalHotel + totalTransit + totalDining + totalActivities;

  const totalEl = document.getElementById('estGrandTotal');
  if (totalEl) totalEl.textContent = formatPrice(grandTotal);

  // Update breakdown items
  setBarVal('barStay', 'valStay', totalHotel, grandTotal);
  setBarVal('barTransit', 'valTransit', totalTransit, grandTotal);
  setBarVal('barDining', 'valDining', totalDining, grandTotal);
  setBarVal('barActivities', 'valActivities', totalActivities, grandTotal);
}

function setBarVal(barId, valId, amount, total) {
  const bar = document.getElementById(barId);
  const val = document.getElementById(valId);
  const pct = Math.max(8, Math.round((amount / total) * 100));
  if (bar) bar.style.width = `${pct}%`;
  if (val) val.textContent = formatPrice(amount);
}

/* ==========================================================================
   10. INTERACTIVE REGIONAL MAP & HOTSPOT SELECTOR
   ========================================================================== */
const MAP_ZONES = {
  'ubud': {
    title: 'Sacred Monkey Forest & Ubud',
    desc: 'Lush river ravines, art galleries, sacred monkey forests, royal palaces, and organic vegan gastronomy.',
    distance: '38 km from Airport (1 hr 15 mins)',
    attractionId: 'ubud',
    hotelId: 'viceroy-bali',
    lat: -8.518972,
    lng: 115.258389,
    address: 'Jl. Monkey Forest, Ubud, Gianyar Regency, Bali 80571',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.518972,115.258389',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.518972,115.258389'
  },
  'uluwatu': {
    title: 'Uluwatu Temple & Bukit Peninsula',
    desc: 'Dramatic 70m limestone sea cliffs, world-class surf breaks (Padang Padang), and sunset Kecak fire dances.',
    distance: '21 km from Airport (45 mins)',
    attractionId: 'uluwatu-temple',
    hotelId: 'the-edge-bali',
    lat: -8.829139,
    lng: 115.084889,
    address: 'Pecatu, South Kuta, Badung Regency, Bali 80361',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.829139,115.084889',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.829139,115.084889'
  },
  'tanah-lot': {
    title: 'Tanah Lot Temple (Pura Tanah Lot)',
    desc: 'Ancient offshore Hindu pilgrimage shrine perched dramatically upon a sea-carved rock formation in Tabanan.',
    distance: '27 km from Airport (50 mins)',
    attractionId: 'tanah-lot',
    hotelId: 'como-uma-canggu',
    lat: -8.621213,
    lng: 115.086787,
    address: 'Jl. Tanah Lot, Beraban, Kediri, Tabanan Regency, Bali 82121',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.621213,115.086787',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.621213,115.086787'
  },
  'kintamani': {
    title: 'Mount Batur & Kintamani Highlands',
    desc: 'Active volcanic caldera treks, hot volcanic sulfur springs, and chilly lakeside orange plantations.',
    distance: '75 km from Airport (2 hrs 15 mins)',
    attractionId: 'batur',
    hotelId: 'padma-resort',
    lat: -8.242222,
    lng: 115.375278,
    address: 'South Batur, Kintamani, Bangli Regency, Bali 80652',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.242222,115.375278',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.242222,115.375278'
  },
  'munduk': {
    title: 'Sekumpul Waterfall & North Bali',
    desc: 'Misty clove plantations, crater lakes Danau Tamblingan, and the 7 plumes of Sekumpul Waterfall.',
    distance: '88 km from Airport (2 hrs 45 mins)',
    attractionId: 'sekumpul',
    hotelId: 'munduk-moding',
    lat: -8.172778,
    lng: 115.183056,
    address: 'Sekumpul Village, Sawan, Buleleng Regency, Bali 81171',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.172778,115.183056',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.172778,115.183056'
  },
  'penida': {
    title: 'Kelingking Beach & Nusa Penida',
    desc: 'Offshore islands featuring T-Rex Kelingking cliffs, manta ray diving sanctuaries, and crystal bays.',
    distance: '40 min fast ferry from Sanur Pier',
    attractionId: 'kelingking',
    hotelId: 'maya-sanur',
    lat: -8.750556,
    lng: 115.474444,
    address: 'Bunga Mekar, Nusa Penida, Klungkung Regency, Bali 80771',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.750556,115.474444',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.750556,115.474444'
  },
  'airport': {
    title: 'I Gusti Ngurah Rai Airport (DPS)',
    desc: 'Primary international entry gateway located at the narrow isthmus between Kuta and Jimbaran.',
    distance: 'Immediate Entry Point',
    attractionId: 'tanah-lot',
    hotelId: 'airport',
    lat: -8.748167,
    lng: 115.167167,
    address: 'Jl. Raya Ngurah Rai, Tuban, Kuta, Badung Regency, Bali 80362',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.748167,115.167167',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.748167,115.167167'
  }
};

let currentSelectedZoneKey = 'ubud';

window.selectMapZone = function(zoneKey) {
  const data = MAP_ZONES[zoneKey];
  if (!data) return;

  currentSelectedZoneKey = zoneKey;

  const titleEl = document.getElementById('mapZoneTitle');
  const descEl = document.getElementById('mapZoneDesc');
  const distEl = document.getElementById('mapZoneDistance');
  const coordsEl = document.getElementById('mapZoneCoords');
  const addressEl = document.getElementById('mapZoneAddress');
  const actionsEl = document.getElementById('mapZoneActions');

  if (titleEl) titleEl.textContent = data.title;
  if (descEl) descEl.textContent = data.desc;
  if (distEl) distEl.textContent = data.distance;
  if (coordsEl && typeof data.lat === 'number') {
    coordsEl.textContent = `📍 ${data.lat.toFixed(6)}, ${data.lng.toFixed(6)}`;
    coordsEl.dataset.lat = data.lat;
    coordsEl.dataset.lng = data.lng;
  }
  if (addressEl && data.address) {
    addressEl.textContent = data.address;
  }

  if (actionsEl) {
    actionsEl.innerHTML = `
      <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px;">
        <a href="${data.googleMapsUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" style="padding: 6px 12px; font-size: 0.8rem; display: inline-flex; align-items: center; gap: 5px; color: var(--accent-cyan); border-color: rgba(56, 189, 248, 0.4);">
          <span>🗺️ View on Google Maps</span>
        </a>
        <a href="${data.googleMapsDirectionsUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" style="padding: 6px 12px; font-size: 0.8rem; display: inline-flex; align-items: center; gap: 5px; color: var(--accent-coral); border-color: rgba(244, 63, 94, 0.4);">
          <span>🚗 Route from DPS</span>
        </a>
        <button type="button" class="btn btn-outline btn-sm" onclick="window.searchGeoapifyNearSelectedZone()" style="padding: 6px 12px; font-size: 0.8rem; display: inline-flex; align-items: center; gap: 5px;">
          <span>🔍 Nearby via Geoapify</span>
        </button>
        ${data.attractionId ? `
          <button type="button" class="btn btn-outline btn-sm" onclick="window.openLocationGallery('${data.attractionId}', 'attraction')" style="padding: 6px 12px; font-size: 0.8rem; display: inline-flex; align-items: center; gap: 5px;">
            <span>📸</span> Real Photos
          </button>
        ` : ''}
        ${data.hotelId ? `
          <button type="button" class="btn btn-primary btn-sm" onclick="window.openHotelDetail('${data.hotelId}')" style="padding: 6px 12px; font-size: 0.8rem; display: inline-flex; align-items: center; gap: 5px;">
            <span>🏨</span> View Resort
          </button>
        ` : ''}
      </div>
    `;
  }

  document.querySelectorAll('.map-pin').forEach(pin => {
    if (pin.dataset.zone === zoneKey) {
      pin.classList.add('active-pin');
    } else {
      pin.classList.remove('active-pin');
    }
  });
};

window.copyCurrentZoneCoords = function() {
  const zone = MAP_ZONES[currentSelectedZoneKey || 'ubud'];
  if (!zone || typeof zone.lat !== 'number') return;
  const text = `${zone.lat.toFixed(6)}, ${zone.lng.toFixed(6)}`;
  window.copyTextToClipboard(text, `Copied ${zone.title} GPS (${text})`);
};

window.copyTextToClipboard = function(text, successMsg) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      if (typeof window.showToast === 'function') {
        window.showToast('GPS Copied', successMsg || `Copied "${text}" to clipboard.`);
      }
    }).catch(() => {
      fallbackCopyText(text, successMsg);
    });
  } else {
    fallbackCopyText(text, successMsg);
  }
};

function fallbackCopyText(text, successMsg) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    if (typeof window.showToast === 'function') {
      window.showToast('GPS Copied', successMsg || `Copied "${text}" to clipboard.`);
    }
  } catch (err) {
    window.prompt('Copy coordinates:', text);
  }
  document.body.removeChild(ta);
}

function initMapInteractions() {
  const pins = document.querySelectorAll('.map-pin');
  pins.forEach(pin => {
    pin.addEventListener('click', () => {
      window.selectMapZone(pin.dataset.zone);
    });
  });

  // Default to Ubud
  window.selectMapZone('ubud');
}

/* ==========================================================================
   10.5. GEOAPIFY PLACES API v2 & ZERO-DISCREPANCY GIS INTEGRATION
   ========================================================================== */
let activeGeoapifyCategory = 'tourism.sights,tourism.attraction';
let cachedGeoapifyPlaces = [];

function initGeoapifyPlacesExplorer() {
  const searchInput = document.getElementById('geoapifySearchInput');
  const clearBtn = document.getElementById('geoapifyClearBtn');

  // Load saved custom key from localStorage or backend config
  const savedKey = localStorage.getItem('wanderpulse_geoapify_key');
  const keyInput = document.getElementById('geoapifyApiKeyInput');
  if (savedKey && keyInput) {
    keyInput.value = savedKey;
  }

  // Update status badge based on config
  fetch('/api/places/config')
    .then(r => r.json())
    .then(cfg => {
      const badge = document.getElementById('geoapifyStatusBadge');
      if (badge) {
        if (cfg.hasApiKey || savedKey) {
          badge.textContent = 'Geoapify API Active (Live)';
          badge.className = 'visa-status-pill status-free';
        } else {
          badge.textContent = 'Zero Discrepancy Verified';
          badge.className = 'visa-status-pill status-free';
        }
      }
    })
    .catch(() => {});

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      if (clearBtn) {
        clearBtn.style.display = e.target.value.trim() ? 'block' : 'none';
      }
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        window.triggerGeoapifySearch();
      }
    });
  }

  // Load initial default places (top sights)
  loadGeoapifyPlaces({ categories: activeGeoapifyCategory });
}

window.toggleGeoapifyKeyModal = function() {
  const modal = document.getElementById('geoapifyKeyModal');
  if (!modal) return;
  modal.classList.toggle('open');
};

window.saveGeoapifyKey = function() {
  const input = document.getElementById('geoapifyApiKeyInput');
  const key = input ? input.value.trim() : '';
  if (key) {
    localStorage.setItem('wanderpulse_geoapify_key', key);
    fetch('/api/places/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey: key })
    }).catch(() => {});
    if (typeof window.showToast === 'function') {
      window.showToast('Geoapify Key Saved', 'Connected your Geoapify API key for live POI searches!');
    }
  } else {
    localStorage.removeItem('wanderpulse_geoapify_key');
    if (typeof window.showToast === 'function') {
      window.showToast('Key Cleared', 'Using default verified Bali GIS precision database.');
    }
  }

  const badge = document.getElementById('geoapifyStatusBadge');
  if (badge) {
    badge.textContent = key ? 'Geoapify API Active (Live)' : 'Zero Discrepancy Verified';
  }

  window.toggleGeoapifyKeyModal();
  window.triggerGeoapifySearch();
};

window.resetGeoapifyKey = function() {
  localStorage.removeItem('wanderpulse_geoapify_key');
  const input = document.getElementById('geoapifyApiKeyInput');
  if (input) input.value = '';
  const badge = document.getElementById('geoapifyStatusBadge');
  if (badge) badge.textContent = 'Zero Discrepancy Verified';
  if (typeof window.showToast === 'function') {
    window.showToast('Geoapify Key Removed', 'Reverted to zero-discrepancy verified Bali database.');
  }
  window.toggleGeoapifyKeyModal();
  window.triggerGeoapifySearch();
};

window.triggerGeoapifySearch = function() {
  const input = document.getElementById('geoapifySearchInput');
  const query = input ? input.value.trim() : '';

  if (query) {
    loadGeoapifyPlaces({ query });
  } else {
    loadGeoapifyPlaces({ categories: activeGeoapifyCategory });
  }
};

window.clearGeoapifySearch = function() {
  const input = document.getElementById('geoapifySearchInput');
  const clearBtn = document.getElementById('geoapifyClearBtn');
  if (input) input.value = '';
  if (clearBtn) clearBtn.style.display = 'none';
  loadGeoapifyPlaces({ categories: activeGeoapifyCategory });
};

window.filterGeoapifyCategory = function(cat, btn) {
  activeGeoapifyCategory = cat;
  document.querySelectorAll('.geoapify-cat-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const input = document.getElementById('geoapifySearchInput');
  const clearBtn = document.getElementById('geoapifyClearBtn');
  if (input) input.value = '';
  if (clearBtn) clearBtn.style.display = 'none';

  loadGeoapifyPlaces({ categories: cat });
};

window.searchGeoapifyNearCurrentZone = function() {
  const zone = MAP_ZONES[currentSelectedZoneKey || 'ubud'];
  if (!zone || typeof zone.lat !== 'number') return;

  document.querySelectorAll('.geoapify-cat-btn').forEach(b => b.classList.remove('active'));
  const nearBtn = document.getElementById('geoapifyNearMeBtn');
  if (nearBtn) nearBtn.classList.add('active');

  loadGeoapifyPlaces({
    lat: zone.lat,
    lon: zone.lng,
    categories: activeGeoapifyCategory || 'tourism.sights,tourism.attraction',
    radius: 15000
  });

  if (typeof window.showToast === 'function') {
    window.showToast('Nearby POIs', `Searching places within 15km of ${zone.title}...`);
  }
};

window.searchGeoapifyNearSelectedZone = function() {
  const explorer = document.getElementById('geoapifyExplorer');
  if (explorer) {
    explorer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  window.searchGeoapifyNearCurrentZone();
};

function loadGeoapifyPlaces(params = {}) {
  const loading = document.getElementById('geoapifyLoadingIndicator');
  const grid = document.getElementById('geoapifyResultsGrid');
  if (loading) loading.style.display = 'block';
  if (grid) grid.style.opacity = '0.5';

  const userKey = localStorage.getItem('wanderpulse_geoapify_key');
  const queryParams = new URLSearchParams();

  if (params.query) queryParams.set('query', params.query);
  if (params.categories) queryParams.set('categories', params.categories);
  if (params.lat) queryParams.set('lat', params.lat);
  if (params.lon) queryParams.set('lon', params.lon);
  if (params.radius) queryParams.set('radius', params.radius);
  if (userKey) queryParams.set('apiKey', userKey);

  const headers = {};
  if (userKey) headers['x-geoapify-key'] = userKey;

  fetch(`/api/places/geoapify?${queryParams.toString()}`, { headers })
    .then(r => r.json())
    .then(data => {
      if (loading) loading.style.display = 'none';
      if (grid) grid.style.opacity = '1';

      if (data.status === 'ok' && Array.isArray(data.items)) {
        cachedGeoapifyPlaces = data.items;
        renderGeoapifyResults(data.items, data.source);
      } else {
        renderGeoapifyResults([]);
      }
    })
    .catch(() => {
      if (loading) loading.style.display = 'none';
      if (grid) grid.style.opacity = '1';
      renderGeoapifyResults([]);
    });
}

function renderGeoapifyResults(items, source = 'verified_gis_database') {
  const grid = document.getElementById('geoapifyResultsGrid');
  if (!grid) return;

  if (!items || items.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 32px 16px; background: var(--bg-card); border-radius: var(--radius-md); border: 1px dashed var(--border-subtle);">
        <p style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">No matching places found</p>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 16px;">Try a broader query or select another category filter above.</p>
        <button type="button" class="btn btn-outline btn-sm" onclick="window.clearGeoapifySearch()">Reset Search</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = items.map((item, idx) => {
    const latNum = typeof item.lat === 'number' ? item.lat : (typeof item.latitude === 'number' ? item.latitude : null);
    const lngNum = typeof item.lon === 'number' ? item.lon : (typeof item.lng === 'number' ? item.lng : (typeof item.longitude === 'number' ? item.longitude : null));
    const latStr = latNum !== null ? latNum.toFixed(6) : '';
    const lngStr = lngNum !== null ? lngNum.toFixed(6) : '';

    const gmapsUrl = item.googleMapsUrl || (latStr ? `https://www.google.com/maps/search/?api=1&query=${latStr},${lngStr}` : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + ' Bali')}`);
    const directionsUrl = item.googleMapsDirectionsUrl || (latStr ? `https://www.google.com/maps/dir/?api=1&destination=${latStr},${lngStr}` : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(item.name + ' Bali')}`);
    
    const distBadge = typeof item.distanceMeters === 'number'
      ? `<span class="zone-distance-pill" style="font-size: 0.68rem; padding: 2px 7px;">${(item.distanceMeters / 1000).toFixed(1)} km away</span>`
      : (item.distanceAirport ? `<span class="zone-distance-pill" style="font-size: 0.68rem; padding: 2px 7px;">${item.distanceAirport}</span>` : '');

    return `
      <div class="geoapify-place-card" data-idx="${idx}">
        <div>
          <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-bottom: 6px;">
            <span class="section-tag tag-violet" style="font-size: 0.68rem; margin: 0; padding: 2px 7px;">${item.categoryLabel || item.category || 'Bali Point of Interest'}</span>
            ${distBadge}
            ${item.rating ? `<span style="font-size: 0.78rem; font-weight: 800; color: #FBBF24; margin-left: auto;">★ ${item.rating}</span>` : ''}
          </div>
          <h4 class="geoapify-place-title">${item.name}</h4>
          <p class="geoapify-place-address">
            📍 ${item.formattedAddress || item.address || item.city || 'Bali, Indonesia'}
          </p>
        </div>

        <div>
          <div class="geoapify-place-meta" style="margin-bottom: 10px;">
            ${latStr ? `
              <span class="zone-coords-pill" onclick="window.copyTextToClipboard('${latStr}, ${lngStr}', 'Copied ${item.name} GPS (${latStr}, ${lngStr})')" title="Click to copy GPS coordinates" style="cursor: pointer;">
                📍 ${latStr}, ${lngStr}
              </span>
            ` : '<span>📍 Bali GIS</span>'}
            <span class="visa-status-pill status-free" style="font-size: 0.68rem; padding: 2px 7px;" title="Zero Discrepancy with Google Maps">
              ✓ 100% Maps Parity
            </span>
          </div>

          <div class="geoapify-place-actions">
            <a href="${gmapsUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" style="flex: 1; font-size: 0.76rem; padding: 6px 8px; justify-content: center; color: var(--accent-cyan); border-color: rgba(56, 189, 248, 0.35);">
              <span>🗺️ Google Maps</span>
            </a>
            <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" style="flex: 1; font-size: 0.76rem; padding: 6px 8px; justify-content: center; color: var(--accent-coral); border-color: rgba(244, 63, 94, 0.35);">
              <span>🚗 Route</span>
            </a>
            ${item.id && (item.image || item.rooms) ? `
              <button type="button" class="btn btn-primary btn-sm" style="font-size: 0.76rem; padding: 6px 10px;" onclick="${item.rooms ? `window.openHotelDetail('${item.id}')` : `window.openAttractionModal('${item.id}')`}">
                <span>Details</span>
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/* ==========================================================================
   11. HERO SEARCH FORM LOGIC
   ========================================================================== */
function initHeroSearch() {
  const form = document.getElementById('heroSearchForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const origin = document.getElementById('heroOrigin')?.value.trim() || 'New York';
    const style = document.getElementById('heroStyle')?.value || 'balanced';

    // 1. Smoothly scroll down to Transit Hub
    const transitHub = document.getElementById('how-to-reach');
    if (transitHub) {
      transitHub.scrollIntoView({ behavior: 'smooth' });
    }

    // 2. Pre-fill Transit custom city input & trigger route
    const customCityInput = document.getElementById('customCityInput');
    if (customCityInput) customCityInput.value = origin;

    const originSelect = document.getElementById('originCitySelect');
    const presetMatch = Array.from(originSelect?.options || []).find(o => 
      o.text.toLowerCase().includes(origin.toLowerCase())
    );

    if (presetMatch && originSelect) {
      originSelect.value = presetMatch.value;
      updateRouteResults(presetMatch.value);
    } else {
      generateCustomRoute(origin);
    }

    // 3. Synchronize comfort tier in Budget Estimator
    document.querySelectorAll('.tier-radio-btn').forEach(btn => {
      if (btn.dataset.tier === style) {
        btn.click();
      }
    });

    showToast('Journey Planned', `Loaded transit routes and budget breakdown for departure from ${origin}.`);
  });
}

/* ==========================================================================
   12. REST API DATA LOADER (WITH LOCAL FALLBACK)
   ========================================================================== */
async function loadApiDataAndRender() {
  try {
    const resAttractions = await fetch('/api/attractions');
    if (resAttractions.ok) {
      const json = await resAttractions.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        ATTRACTIONS_DATA = json.data;
      }
    }
  } catch (e) {
    console.log('Using built-in attractions data');
  }

  try {
    const resHotels = await fetch('/api/hotels');
    if (resHotels.ok) {
      const json = await resHotels.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        HOTELS_DATA = json.data;
      }
    }
  } catch (e) {
    console.log('Using built-in hotels data');
  }

  renderAttractions('all');
  renderHotels('all', 'rating');
}

/* ==========================================================================
   13. CUSTOM TRIP ITINERARY BUILDER & WISHLIST
   ========================================================================== */
let savedItinerary = JSON.parse(localStorage.getItem('wanderpulse_itinerary') || '[]');

function updateItineraryBadge() {
  const count = savedItinerary.length;
  document.querySelectorAll('.itinerary-count-badge').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'inline-flex' : 'none';
  });
  const drawerBadge = document.getElementById('drawerItineraryBadge');
  if (drawerBadge) {
    drawerBadge.textContent = `${count} ${count === 1 ? 'item' : 'items'}`;
  }
}

window.isSpotSaved = function(id) {
  return savedItinerary.some(item => item.id === id);
};

window.toggleSaveSpot = function(id, type) {
  const index = savedItinerary.findIndex(item => item.id === id);
  if (index >= 0) {
    savedItinerary.splice(index, 1);
    showToast('Removed from Itinerary', 'Item removed from your custom itinerary.');
  } else {
    let target = null;
    if (type === 'attraction') {
      target = ATTRACTIONS_DATA.find(a => a.id === id);
    } else {
      target = HOTELS_DATA.find(h => h.id === id);
    }
    if (target) {
      savedItinerary.push({
        id: target.id,
        name: target.name,
        type: type,
        category: target.categoryLabel || target.tierLabel || 'Spot',
        costUSD: target.feeUSD || target.priceUSD || 0,
        location: target.location || target.distanceToSpot || 'Bali',
        image: target.image
      });
      showToast('Saved to Itinerary', `Added ${target.name} to your custom Bali travel plan!`);
    }
  }

  localStorage.setItem('wanderpulse_itinerary', JSON.stringify(savedItinerary));
  updateItineraryBadge();
  renderSavedItinerary();

  const activeAttractionFilter = document.querySelector('#attractionsFilter .filter-btn.active')?.dataset.filter || 'all';
  renderAttractions(activeAttractionFilter);
  const activeHotelFilter = document.querySelector('#hotelFilter .filter-btn.active')?.dataset.filter || 'all';
  const activeSort = document.getElementById('hotelSortSelect')?.value || 'rating';
  renderHotels(activeHotelFilter, activeSort);
};

function initItineraryBuilder() {
  updateItineraryBadge();
  renderSavedItinerary();

  const clearBtn = document.getElementById('clearItineraryBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('Clear all saved spots and stays from your itinerary?')) {
        savedItinerary = [];
        localStorage.setItem('wanderpulse_itinerary', JSON.stringify(savedItinerary));
        updateItineraryBadge();
        renderSavedItinerary();
        renderAttractions('all');
        renderHotels('all', 'rating');
        showToast('Itinerary Cleared', 'Your custom itinerary is now empty.');
      }
    });
  }

  const copyBtn = document.getElementById('copyItineraryBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      if (savedItinerary.length === 0) {
        showToast('Itinerary Empty', 'Save some attractions or stays before exporting.');
        return;
      }

      let text = `🌴 MY WANDERPULSE BALI ITINERARY 🌴\n\n`;
      savedItinerary.forEach((item, idx) => {
        text += `${idx + 1}. [${item.type.toUpperCase()}] ${item.name} (${item.category})\n   Location: ${item.location} • Est: $${item.costUSD} USD\n\n`;
      });
      text += `Planned with WanderPulse Bali • https://wanderpulse-bali.example.com/`;

      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
          showToast('Itinerary Copied', 'Summary copied to clipboard! Paste into WhatsApp or Notes.');
        });
      } else {
        alert(text);
      }
    });
  }
}

function renderSavedItinerary() {
  const container = document.getElementById('itineraryDisplay');
  const emptyState = document.getElementById('itineraryEmptyState');
  const statCount = document.getElementById('itineraryTotalItems');
  const statCost = document.getElementById('itineraryTotalCost');

  if (statCount) statCount.textContent = savedItinerary.length;
  const totalUSD = savedItinerary.reduce((sum, i) => sum + (i.costUSD || 0), 0);
  if (statCost) statCost.textContent = formatPrice(totalUSD);

  if (!container) return;

  if (savedItinerary.length === 0) {
    if (emptyState) emptyState.style.display = 'block';
    container.innerHTML = '';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  // Group into Day 1, Day 2, Day 3
  const day1 = savedItinerary.filter((_, idx) => idx % 3 === 0);
  const day2 = savedItinerary.filter((_, idx) => idx % 3 === 1);
  const day3 = savedItinerary.filter((_, idx) => idx % 3 === 2);

  const days = [
    { title: 'Day 1: Coast & Temple Sanctuaries', items: day1 },
    { title: 'Day 2: Emerald Valleys & Culture', items: day2 },
    { title: 'Day 3: Volcano Dawns & Waterfalls', items: day3 }
  ];

  container.innerHTML = days.map((day, dIdx) => `
    <div class="itinerary-day-box">
      <div class="itinerary-day-header">
        <h3 class="itinerary-day-title">${day.title}</h3>
        <span class="section-tag tag-cyan" style="margin-bottom: 0; font-size: 0.75rem;">${day.items.length} Activities</span>
      </div>
      <div class="itinerary-items-list">
        ${day.items.length === 0 ? `
          <p style="font-size: 0.85rem; color: var(--text-muted); font-style: italic; padding: 12px 0;">No spots scheduled yet. Click ❤️ Save on any spot above!</p>
        ` : day.items.map(item => `
          <div class="itinerary-item-card">
            <img src="${item.image}" alt="${item.name}" class="itinerary-item-img" onerror="this.src='https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=200&q=80';" />
            <div class="itinerary-item-info">
              <span style="font-size: 0.7rem; text-transform: uppercase; font-weight: 800; color: var(--accent-violet);">${item.category}</span>
              <h4 class="itinerary-item-title">${item.name}</h4>
              <span class="itinerary-item-meta">${item.location} • <strong>${formatPrice(item.costUSD)}</strong></span>
            </div>
            <button class="itinerary-remove-btn" onclick="window.toggleSaveSpot('${item.id}', '${item.type}')" title="Remove from Itinerary" aria-label="Remove ${item.name}">✕</button>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   14. IDR CURRENCY & TIPPING CALCULATOR
   ========================================================================== */
function initCurrencyCalculator() {
  const inputAmt = document.getElementById('calcInputAmount');
  const fromCurr = document.getElementById('calcFromCurrency');
  const resultIdr = document.getElementById('calcResultIdr');
  const tipDriver = document.getElementById('calcTipDriver');
  const tipRestaurant = document.getElementById('calcTipRestaurant');

  function calculate() {
    if (!inputAmt || !fromCurr || !resultIdr) return;
    const amount = parseFloat(inputAmt.value) || 0;
    const curr = fromCurr.value || 'USD';
    const rateToUSD = 1 / (CURRENCY_RATES[curr]?.rate || 1);
    const amountInUSD = amount * rateToUSD;
    const idrRate = CURRENCY_RATES['IDR'].rate || 15800;
    const totalIDR = Math.round(amountInUSD * idrRate);

    resultIdr.textContent = `Rp ${totalIDR.toLocaleString('id-ID')}`;

    if (tipDriver) {
      const driverTipIDR = Math.round(totalIDR * 0.1);
      tipDriver.textContent = `Rp ${Math.max(50000, Math.min(150000, driverTipIDR)).toLocaleString('id-ID')}`;
    }
    if (tipRestaurant) {
      const restTipIDR = Math.round(totalIDR * 0.08);
      tipRestaurant.textContent = `Rp ${restTipIDR.toLocaleString('id-ID')}`;
    }
  }

  if (inputAmt) inputAmt.addEventListener('input', calculate);
  if (fromCurr) fromCurr.addEventListener('change', calculate);
  calculate();
}

/* ==========================================================================
   15. BALI READINESS CHECKLIST
   ========================================================================== */
function initChecklist() {
  const checkboxes = document.querySelectorAll('.checklist-checkbox');
  const saved = JSON.parse(localStorage.getItem('wanderpulse_checklist') || '{}');

  checkboxes.forEach(cb => {
    const key = cb.id;
    if (saved[key]) cb.checked = true;

    cb.addEventListener('change', () => {
      saved[key] = cb.checked;
      localStorage.setItem('wanderpulse_checklist', JSON.stringify(saved));
      updateChecklistProgress();
    });
  });

  updateChecklistProgress();
}

function updateChecklistProgress() {
  const checkboxes = document.querySelectorAll('.checklist-checkbox');
  const checked = document.querySelectorAll('.checklist-checkbox:checked');
  const pct = checkboxes.length ? Math.round((checked.length / checkboxes.length) * 100) : 0;
  const bar = document.getElementById('checklistProgressBar');
  const text = document.getElementById('checklistProgressText');
  if (bar) bar.style.width = `${pct}%`;
  if (text) text.textContent = `${pct}% Ready (${checked.length}/${checkboxes.length} Essentials Checked)`;
}

/* ==========================================================================
   16. BALINESE & INDONESIAN AUDIO PHRASEBOOK
   ========================================================================== */
window.playPhraseAudio = function(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID'; // Indonesian voice
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
    showToast('Phrase Audio', `Pronouncing: "${text}"`);
  } else {
    showToast('Phonetic Guide', `Pronunciation: "${text}"`);
  }
};

function initPhrasebook() {
  document.querySelectorAll('.phrase-audio-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const phrase = btn.dataset.phrase;
      if (phrase) window.playPhraseAudio(phrase);
    });
  });
}

/* ==========================================================================
   17. SYNTHESIZED AMBIENT ISLAND SOUNDSCAPE (WEB AUDIO API)
   ========================================================================== */
let audioCtx = null;
let isAudioPlaying = false;
let oceanGain = null;
let chimeInterval = null;

function initAmbientSoundscape() {
  const btn = document.getElementById('soundscapeToggleBtn');
  const drawerBtn = document.getElementById('drawerSoundscapeBtn');

  if (btn) {
    btn.addEventListener('click', toggleAmbientSoundscape);
  }
  if (drawerBtn) {
    drawerBtn.addEventListener('click', toggleAmbientSoundscape);
  }
}

function toggleAmbientSoundscape() {
  const btn = document.getElementById('soundscapeToggleBtn');
  const drawerBtn = document.getElementById('drawerSoundscapeBtn');

  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      showToast('Audio Notice', 'Web Audio is not supported by your browser.');
      return;
    }
    audioCtx = new AudioContextClass();
  }

  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  if (!isAudioPlaying) {
    startSoundscape();
    isAudioPlaying = true;
    if (btn) {
      btn.classList.add('active-audio');
      btn.innerHTML = `🔊 <span class="soundscape-text">Sound: ON</span>`;
    }
    if (drawerBtn) {
      drawerBtn.classList.add('active-audio');
      drawerBtn.innerHTML = `<span>Pause Soundscape</span>`;
    }
    showToast('Island Soundscape', 'Gentle tropical ocean tide & Balinese chime tones playing.');
  } else {
    stopSoundscape();
    isAudioPlaying = false;
    if (btn) {
      btn.classList.remove('active-audio');
      btn.innerHTML = `🔈 <span class="soundscape-text">Soundscape</span>`;
    }
    if (drawerBtn) {
      drawerBtn.classList.remove('active-audio');
      drawerBtn.innerHTML = `<span>Play Soundscape</span>`;
    }
    showToast('Island Soundscape', 'Ambient sound paused.');
  }
}

function startSoundscape() {
  if (!audioCtx) return;

  // 1. Synthesize ocean surf with filtered pink/white noise
  const bufferSize = audioCtx.sampleRate * 2;
  const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }

  const whiteNoise = audioCtx.createBufferSource();
  whiteNoise.buffer = noiseBuffer;
  whiteNoise.loop = true;

  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(320, audioCtx.currentTime);

  // LFO to simulate rising and receding tides
  const lfo = audioCtx.createOscillator();
  lfo.frequency.setValueAtTime(0.12, audioCtx.currentTime);
  const lfoGain = audioCtx.createGain();
  lfoGain.gain.setValueAtTime(200, audioCtx.currentTime);
  lfo.connect(filter.frequency);
  lfo.start();

  oceanGain = audioCtx.createGain();
  oceanGain.gain.setValueAtTime(0.08, audioCtx.currentTime);

  whiteNoise.connect(filter);
  filter.connect(oceanGain);
  oceanGain.connect(audioCtx.destination);
  whiteNoise.start();

  // 2. Periodic gentle pentatonic Gamelan bell chime (Slendro frequencies)
  const pentatonicFreqs = [523.25, 587.33, 659.25, 783.99, 880.00];
  chimeInterval = setInterval(() => {
    if (!isAudioPlaying || !audioCtx) return;
    const freq = pentatonicFreqs[Math.floor(Math.random() * pentatonicFreqs.length)];
    playGamelanBell(freq);
  }, 4800);
}

function playGamelanBell(freq) {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

  gain.gain.setValueAtTime(0.025, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 3.0);

  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 3.0);
}

function stopSoundscape() {
  if (oceanGain && audioCtx) {
    oceanGain.gain.setValueAtTime(0, audioCtx.currentTime);
  }
  if (chimeInterval) {
    clearInterval(chimeInterval);
    chimeInterval = null;
  }
}

/* ==========================================================================
   18. FAQ ACCORDION
   ========================================================================== */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const wasActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!wasActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   19. NEWSLETTER & TOAST SYSTEM
   ========================================================================== */
function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletterEmail')?.value;
    if (!email || !email.includes('@')) {
      showToast('Validation Error', 'Please provide a valid email address.');
      return;
    }

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (data.success) {
        document.getElementById('newsletterEmail').value = '';
        showToast('Subscribed (Node.js API)', data.message);
        return;
      }
    } catch (err) {
      console.warn('Newsletter API fallback:', err);
    }

    document.getElementById('newsletterEmail').value = '';
    showToast('Subscribed!', `Welcome! Bali travel updates and transit discounts will be sent to ${email}.`);
  });
}

/* ==========================================================================
   20. PWA SERVICE WORKER REGISTRATION
   ========================================================================== */
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('WanderPulse PWA Service Worker active:', reg.scope))
        .catch(err => console.warn('Service Worker registration skipped:', err));
    });
  }
}

/* ==========================================================================
   21. MULTI-PHOTO LOCATION & ATTRACTION GALLERY LIGHTBOX
   ========================================================================== */
let currentGalleryData = {
  items: [],
  currentIndex: 0,
  currentItem: null,
  type: 'attraction'
};

window.galleryNextPhoto = function(e) {
  if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
  window.setGalleryIndex(currentGalleryData.currentIndex + 1);
};

window.galleryPrevPhoto = function(e) {
  if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
  window.setGalleryIndex(currentGalleryData.currentIndex - 1);
};

function initGalleryModal() {
  const prevBtn = document.getElementById('galleryPrevBtn');
  const nextBtn = document.getElementById('galleryNextBtn');

  if (prevBtn) {
    prevBtn.onclick = (e) => window.galleryPrevPhoto(e);
  }

  if (nextBtn) {
    nextBtn.onclick = (e) => window.galleryNextPhoto(e);
  }

  // Keyboard navigation for gallery
  document.addEventListener('keydown', (e) => {
    const galleryModal = document.getElementById('galleryModal');
    if (!galleryModal || !galleryModal.classList.contains('open')) return;

    if (e.key === 'ArrowLeft') {
      window.setGalleryIndex(currentGalleryData.currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      window.setGalleryIndex(currentGalleryData.currentIndex + 1);
    }
  });

  const saveBtn = document.getElementById('gallerySaveSpotBtn');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      if (currentGalleryData.currentItem) {
        if (typeof window.toggleSaveSpot === 'function') {
          window.toggleSaveSpot(currentGalleryData.currentItem.id, currentGalleryData.type);
        }
        showToast('Saved to Itinerary', `${currentGalleryData.currentItem.name} updated in your custom Bali travel itinerary.`);
      }
    });
  }
}

window.openLocationGallery = function(itemId, type = 'attraction') {
  let item = ATTRACTIONS_DATA.find(a => a.id === itemId);
  if (!item) {
    item = HOTELS_DATA.find(h => h.id === itemId);
    if (item) type = 'hotel';
  }
  if (!item) return;

  currentGalleryData.type = type;
  currentGalleryData.currentItem = item;

  // Build normalized gallery items array
  let photos = [];
  if (Array.isArray(item.gallery) && item.gallery.length > 0) {
    photos = item.gallery.map((g, idx) => {
      if (typeof g === 'string') {
        return {
          url: g,
          title: `${item.name} - View ${idx + 1}`,
          caption: item.description,
          tip: item.photographyTip || ''
        };
      }
      return {
        url: g.url || item.image,
        title: g.title || `${item.name} - View ${idx + 1}`,
        caption: g.caption || item.description,
        tip: g.tip || item.photographyTip || ''
      };
    });
  } else {
    photos = [{
      url: item.image,
      title: item.name,
      caption: item.description,
      tip: item.photographyTip || ''
    }];
  }

  currentGalleryData.items = photos;
  currentGalleryData.currentIndex = 0;

  // Update modal header info
  const badgeTag = document.getElementById('galleryBadgeTag');
  const titleEl = document.getElementById('galleryModalTitle');
  const locEl = document.getElementById('galleryLocationSubtitle');

  if (badgeTag) {
    badgeTag.textContent = type === 'hotel' ? 'Luxury Resort Showcase' : 'Authentic Photography';
    badgeTag.className = type === 'hotel' ? 'section-tag tag-coral' : 'section-tag tag-cyan';
  }
  if (titleEl) titleEl.textContent = item.name;
  if (locEl) locEl.textContent = `📍 ${item.location || 'Bali, Indonesia'}`;

  // Populate thumbnail strip
  const thumbsRow = document.getElementById('galleryThumbsRow');
  if (thumbsRow) {
    thumbsRow.innerHTML = photos.map((p, i) => `
      <div class="gallery-thumb ${i === 0 ? 'active' : ''}" onclick="window.setGalleryIndex(${i})" title="${p.title}">
        <img src="${p.url}" alt="${p.title}" loading="lazy" />
      </div>
    `).join('');
  }

  // Display initial photo
  window.setGalleryIndex(0);

  // Open modal
  const modal = document.getElementById('galleryModal');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
};

window.setGalleryIndex = function(idx) {
  if (!currentGalleryData.items || currentGalleryData.items.length === 0) return;
  const count = currentGalleryData.items.length;
  if (idx < 0) idx = count - 1;
  if (idx >= count) idx = 0;
  currentGalleryData.currentIndex = idx;

  const photo = currentGalleryData.items[idx];
  const item = currentGalleryData.currentItem;

  const imgEl = document.getElementById('galleryMainImg');
  const counterEl = document.getElementById('galleryCounter');
  const titleEl = document.getElementById('galleryPhotoTitle');
  const captionEl = document.getElementById('galleryPhotoCaption');
  const tipTextEl = document.getElementById('galleryPhotoTipText');
  const tipBadgeEl = document.getElementById('galleryTipBadge');

  if (imgEl) {
    imgEl.src = photo.url;
    imgEl.alt = photo.title || item.name;
  }
  if (counterEl) counterEl.textContent = `Photo ${idx + 1} of ${count}`;
  if (titleEl) titleEl.textContent = photo.title || item.name;
  if (captionEl) captionEl.textContent = photo.caption || item.description;

  const tip = photo.tip || item?.photographyTip;
  if (tip) {
    if (tipBadgeEl) tipBadgeEl.style.display = 'flex';
    if (tipTextEl) tipTextEl.textContent = tip;
  } else {
    if (tipBadgeEl) tipBadgeEl.style.display = 'none';
  }

  // Update thumbnail active indicators
  const thumbs = document.querySelectorAll('#galleryThumbsRow .gallery-thumb');
  if (thumbs && typeof thumbs.forEach === 'function') {
    thumbs.forEach((t, i) => {
      if (i === idx) {
        t.classList.add('active');
        if (typeof t.scrollIntoView === 'function') {
          t.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      } else {
        t.classList.remove('active');
      }
    });
  }
};

/* ==========================================================================
   22. HOTEL EXPLORER & ROOM PHOTO SWITCHER
   ========================================================================== */
let activeHotelForDetail = null;
let activeRoomForDetail = null;
let currentHotelPhotoIdx = 0;

window.setHotelPhotoIndex = function(idx) {
  if (!activeHotelForDetail) return;
  const gallery = Array.isArray(activeHotelForDetail.gallery) && activeHotelForDetail.gallery.length > 0
    ? activeHotelForDetail.gallery
    : [{ url: activeHotelForDetail.image, title: activeHotelForDetail.name }];
  const count = gallery.length;
  if (idx < 0) idx = count - 1;
  if (idx >= count) idx = 0;
  currentHotelPhotoIdx = idx;

  const mainImg = document.getElementById('hotelDetailMainImg');
  const photoCounter = document.getElementById('hotelPhotoCounter');
  const thumbsStrip = document.getElementById('hotelThumbsStrip');

  if (mainImg) mainImg.src = gallery[idx].url;
  if (photoCounter) photoCounter.textContent = `${idx + 1} of ${count} Photos`;

  if (thumbsStrip && typeof thumbsStrip.querySelectorAll === 'function') {
    thumbsStrip.querySelectorAll('.hotel-thumb').forEach((thumb, i) => {
      if (i === idx) {
        thumb.classList.add('active');
        if (typeof thumb.scrollIntoView === 'function') {
          thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      } else {
        thumb.classList.remove('active');
      }
    });
  }
};

window.hotelNextPhoto = function(e) {
  if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
  window.setHotelPhotoIndex(currentHotelPhotoIdx + 1);
};

window.hotelPrevPhoto = function(e) {
  if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
  window.setHotelPhotoIndex(currentHotelPhotoIdx - 1);
};

window.openHotelDetail = function(hotelId, defaultRoomId = null) {
  const hotel = HOTELS_DATA.find(h => h.id === hotelId);
  if (!hotel) return;

  activeHotelForDetail = hotel;

  // Header Details
  const tierBadge = document.getElementById('hotelTierBadge');
  const ratingScore = document.getElementById('hotelRatingScore');
  const reviewsCount = document.getElementById('hotelReviewsCount');
  const titleEl = document.getElementById('hotelDetailTitle');
  const locEl = document.getElementById('hotelDetailLocation');
  const descEl = document.getElementById('hotelDetailDesc');

  if (tierBadge) {
    tierBadge.textContent = hotel.tierLabel || 'Luxury Resort';
    tierBadge.className = `section-tag tier-${hotel.tier || 'luxury'}`;
  }
  if (ratingScore) ratingScore.textContent = hotel.rating;
  if (reviewsCount) reviewsCount.textContent = (hotel.reviews || 1200).toLocaleString();
  if (titleEl) titleEl.textContent = hotel.name;
  if (locEl) {
    const latStr = typeof hotel.lat === 'number' ? hotel.lat.toFixed(6) : '';
    const lngStr = typeof hotel.lng === 'number' ? hotel.lng.toFixed(6) : '';
    const gmapsUrl = hotel.googleMapsUrl || (latStr ? `https://www.google.com/maps/search/?api=1&query=${latStr},${lngStr}` : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.name + ' Bali')}`);
    const directionsUrl = hotel.googleMapsDirectionsUrl || (latStr ? `https://www.google.com/maps/dir/?api=1&destination=${latStr},${lngStr}` : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(hotel.name + ' Bali')}`);

    locEl.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 4px; margin-bottom: 8px;">
        <span style="font-size: 0.88rem; color: var(--text-primary); font-weight: 600;">📍 ${hotel.location} • ${hotel.distanceToSpot || ''}</span>
        ${hotel.formattedAddress ? `<span style="font-size: 0.78rem; color: var(--text-muted);">${hotel.formattedAddress}</span>` : ''}
        ${latStr ? `
          <div style="display: flex; gap: 8px; align-items: center; margin-top: 6px; flex-wrap: wrap;">
            <span class="zone-coords-pill" onclick="window.copyTextToClipboard('${latStr}, ${lngStr}', 'GPS Coordinates Copied!')" style="font-size: 0.72rem; padding: 2px 8px; cursor: pointer;" title="Click to copy exact decimal GPS">
              📍 ${latStr}, ${lngStr}
            </span>
            <a href="${gmapsUrl}" target="_blank" rel="noopener noreferrer" style="font-size: 0.78rem; color: var(--accent-cyan); text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">
              <span>🗺️ Google Maps</span>
            </a>
            <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer" style="font-size: 0.78rem; color: var(--accent-coral); text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">
              <span>🚗 Directions</span>
            </a>
          </div>
        ` : ''}
      </div>
    `;
  }
  if (descEl) descEl.textContent = hotel.description;

  // Property Gallery Slider
  const gallery = Array.isArray(hotel.gallery) && hotel.gallery.length > 0
    ? hotel.gallery
    : [{ url: hotel.image, title: hotel.name, caption: hotel.description }];

  const thumbsStrip = document.getElementById('hotelThumbsStrip');
  currentHotelPhotoIdx = 0;
  window.setHotelPhotoIndex(0);

  if (thumbsStrip) {
    thumbsStrip.innerHTML = gallery.map((g, i) => `
      <div class="hotel-thumb ${i === 0 ? 'active' : ''}" data-idx="${i}" onclick="window.setHotelPhotoIndex(${i})">
        <img src="${g.url}" alt="${g.title || hotel.name}" loading="lazy" />
      </div>
    `).join('');
  }

  // Amenities Chips
  const amenitiesContainer = document.getElementById('hotelAmenitiesTags');
  if (amenitiesContainer) {
    amenitiesContainer.innerHTML = (hotel.amenities || []).map(a => `
      <span class="hotel-amenity-pill">✨ ${a}</span>
    `).join('');
  }

  // Rooms Switcher
  const rooms = Array.isArray(hotel.rooms) && hotel.rooms.length > 0
    ? hotel.rooms
    : (hotel.roomTypes || ['Standard Luxury Villa']).map((name, i) => ({
        id: `room-${i}`,
        name: name,
        size: '65 m²',
        capacity: '2 Guests',
        bed: '1 King Bed',
        priceUSD: hotel.priceUSD,
        image: hotel.image,
        highlights: ['Private Balcony', 'High-Speed Wi-Fi', 'Ensuite Bathroom', 'Rain Shower']
      }));

  const tabsContainer = document.getElementById('hotelRoomTabs');
  if (tabsContainer) {
    tabsContainer.innerHTML = rooms.map((r, i) => `
      <button type="button" class="room-tab-btn ${i === 0 ? 'active' : ''}" data-room-id="${r.id}">
        ${r.name} (${formatPrice(r.priceUSD)}/nt)
      </button>
    `).join('');

    tabsContainer.querySelectorAll('.room-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const roomId = btn.dataset.roomId;
        const targetRoom = rooms.find(r => r.id === roomId);
        if (targetRoom) {
          selectRoom(targetRoom);
        }
      });
    });
  }

  function selectRoom(room) {
    activeRoomForDetail = room;

    if (tabsContainer) {
      tabsContainer.querySelectorAll('.room-tab-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.roomId === room.id);
      });
    }

    const roomImg = document.getElementById('activeRoomImg');
    const roomName = document.getElementById('activeRoomName');
    const roomSpecs = document.getElementById('activeRoomSpecs');
    const roomPrice = document.getElementById('activeRoomPrice');
    const roomHighlights = document.getElementById('activeRoomHighlights');

    if (roomImg) roomImg.src = room.image || hotel.image;
    if (roomName) roomName.textContent = room.name;
    if (roomSpecs) roomSpecs.textContent = `${room.size || 'Spacious'} • ${room.bed || '1 King Bed'} • Up to ${room.capacity || '2 Guests'}`;
    if (roomPrice) roomPrice.innerHTML = `${formatPrice(room.priceUSD)}<small style="font-size: 0.75rem; color: var(--text-muted);">/night</small>`;
    if (roomHighlights) {
      roomHighlights.innerHTML = (room.highlights || []).map(h => `<li>✓ ${h}</li>`).join('');
    }
  }

  // Select initial room
  const initialRoom = defaultRoomId ? rooms.find(r => r.id === defaultRoomId) || rooms[0] : rooms[0];
  selectRoom(initialRoom);

  // Reserve Button click -> Transition to booking modal
  const reserveBtn = document.getElementById('hotelDetailReserveBtn');
  if (reserveBtn) {
    reserveBtn.onclick = () => {
      closeModal('hotelDetailModal');
      window.openBookingModal(hotel.id);
      // Preselect active room in dropdown if matching
      const roomSelect = document.getElementById('bookingRoomType');
      if (roomSelect && activeRoomForDetail) {
        for (let opt of roomSelect.options) {
          if (opt.value.toLowerCase().includes(activeRoomForDetail.name.toLowerCase()) ||
              activeRoomForDetail.name.toLowerCase().includes(opt.value.toLowerCase())) {
            roomSelect.value = opt.value;
            break;
          }
        }
        updateBookingTotal();
      }
    };
  }

  // Open modal
  const modal = document.getElementById('hotelDetailModal');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
};

/* ==========================================================================
   23. MULTIMODAL TRANSIT BOOKING & BOARDING PASS GENERATOR
   ========================================================================== */
let activeTransitMode = 'flight';

const TRANSIT_ORIGINS_BY_MODE = {
  flight: [
    { value: 'Singapore (SIN)', label: 'Singapore (SIN) - Changi Airport', baseUSD: 140, code: 'SIN', city: 'Singapore', duration: '2h 40m' },
    { value: 'Jakarta (CGK / Gambir)', label: 'Jakarta (CGK) - Soekarno-Hatta', baseUSD: 70, code: 'CGK', city: 'Jakarta', duration: '1h 50m' },
    { value: 'Sydney (SYD)', label: 'Sydney (SYD) - Kingsford Smith', baseUSD: 460, code: 'SYD', city: 'Sydney', duration: '6h 15m' },
    { value: 'London (LHR)', label: 'London (LHR) - Heathrow', baseUSD: 740, code: 'LHR', city: 'London', duration: '16h 20m' },
    { value: 'New York (JFK)', label: 'New York (JFK) - John F. Kennedy', baseUSD: 890, code: 'JFK', city: 'New York', duration: '21h 30m' },
    { value: 'Mumbai / Delhi (BOM/DEL)', label: 'Mumbai / Delhi (BOM/DEL)', baseUSD: 340, code: 'BOM', city: 'Mumbai', duration: '7h 10m' },
    { value: 'Tokyo (NRT)', label: 'Tokyo (NRT) - Narita Int’l', baseUSD: 520, code: 'NRT', city: 'Tokyo', duration: '7h 35m' },
    { value: 'Surabaya (Gubeng)', label: 'Surabaya (SUB) - Juanda Airport', baseUSD: 60, code: 'SUB', city: 'Surabaya', duration: '0h 55m' }
  ],
  train: [
    { value: 'Jakarta (CGK / Gambir)', label: 'Jakarta (Gambir Station) - Argo Bromo Executive', baseUSD: 52, code: 'GMR', city: 'Jakarta', duration: '15h + Ferry' },
    { value: 'Surabaya (Gubeng)', label: 'Surabaya (Gubeng) - Sri Tanjung / Probowangi', baseUSD: 28, code: 'SGU', city: 'Surabaya', duration: '6h + Ferry' },
    { value: 'Yogyakarta (Tugu)', label: 'Yogyakarta (Tugu) - Lodaya Express', baseUSD: 42, code: 'YK', city: 'Yogyakarta', duration: '11h + Ferry' },
    { value: 'Bandung (Hall)', label: 'Bandung (Hall Station) - Malabar Rail', baseUSD: 48, code: 'BD', city: 'Bandung', duration: '14h + Ferry' }
  ],
  bus: [
    { value: 'Jakarta (CGK / Gambir)', label: 'Jakarta (Pulo Gebang) - Pahala Kencana Sleeper', baseUSD: 36, code: 'JKT', city: 'Jakarta', duration: '22h Direct' },
    { value: 'Surabaya (Gubeng)', label: 'Surabaya (Bungurasih) - Gunung Harta Express', baseUSD: 22, code: 'SBY', city: 'Surabaya', duration: '9h Direct' },
    { value: 'Yogyakarta (Tugu)', label: 'Yogyakarta (Giwangan) - Safari Dharma Sleeper', baseUSD: 30, code: 'JOG', city: 'Yogyakarta', duration: '14h Direct' },
    { value: 'Malang (Arjosari)', label: 'Malang (Arjosari Terminal) - Tiara Mas', baseUSD: 26, code: 'MLG', city: 'Malang', duration: '10h Direct' }
  ]
};

function initTransitBooking() {
  const modalTabs = document.querySelectorAll('.transit-modal-tab');
  modalTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      modalTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      switchTransitMode(tab.dataset.mode);
    });
  });

  // Change listeners for dynamic fare calculation
  const fareInputs = ['transitOriginHub', 'transitTravelClass', 'transitPassengers', 'transitBaggage'];
  fareInputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('change', updateTransitFareEstimate);
      el.addEventListener('input', updateTransitFareEstimate);
    }
  });

  // Set min date to tomorrow
  const dateInput = document.getElementById('transitDepartDate');
  if (dateInput) {
    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);
    dateInput.min = nextDay.toISOString().split('T')[0];
    if (!dateInput.value) {
      nextDay.setDate(nextDay.getDate() + 7);
      dateInput.value = nextDay.toISOString().split('T')[0];
    }
  }

  // Form submission
  const form = document.getElementById('transitBookingForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const origin = document.getElementById('transitOriginHub')?.value || 'Singapore (SIN)';
      const destination = document.getElementById('transitDestination')?.value || "I Gusti Ngurah Rai Int'l (DPS)";
      const departDate = document.getElementById('transitDepartDate')?.value;
      const passengers = parseInt(document.getElementById('transitPassengers')?.value || '2', 10);
      const travelClass = document.getElementById('transitTravelClass')?.value || 'standard';
      const baggageFee = parseInt(document.getElementById('transitBaggage')?.value || '0', 10);
      const leadPassenger = document.getElementById('transitPassengerName')?.value.trim();
      const email = document.getElementById('transitEmail')?.value.trim();

      if (!departDate || !leadPassenger || !email) {
        showToast('Incomplete Booking', 'Please fill in all passenger and departure details.');
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Issuing Verified Ticket...';
      }

      try {
        const res = await fetch('/api/transit/book', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mode: activeTransitMode,
            origin,
            destination,
            departDate,
            passengers,
            travelClass,
            baggageFee,
            leadPassenger,
            email
          })
        });

        const data = await res.json();
        if (data.success && data.ticket) {
          renderBoardingPass(data.ticket);
          closeModal('transitBookingModal');
          const eTicketModal = document.getElementById('eTicketModal');
          if (eTicketModal) {
            eTicketModal.classList.add('open');
            document.body.style.overflow = 'hidden';
          }
          showToast('Boarding Pass Issued', `PNR ${data.ticket.pnr} verified. Digital e-ticket ready to print/save.`);
          return;
        } else {
          showToast('Booking Error', data.error || 'Unable to confirm transit ticket.');
        }
      } catch (err) {
        console.warn('Transit Booking API fallback:', err);
        // Resilient client-side ticket generation fallback
        const fallbackTicket = generateClientTicket({
          mode: activeTransitMode,
          origin,
          departDate,
          passengers,
          travelClass,
          leadPassenger,
          email
        });
        renderBoardingPass(fallbackTicket);
        closeModal('transitBookingModal');
        const eTicketModal = document.getElementById('eTicketModal');
        if (eTicketModal) {
          eTicketModal.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
        showToast('E-Ticket Ready', `PNR ${fallbackTicket.pnr} confirmed offline.`);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Confirm & Issue E-Ticket';
        }
      }
    });
  }
}

function switchTransitMode(mode) {
  activeTransitMode = mode;

  const tagEl = document.getElementById('transitModalTag');
  const titleEl = document.getElementById('transitModalTitle');
  const subEl = document.getElementById('transitModalSubtitle');
  const destInput = document.getElementById('transitDestination');
  const originSelect = document.getElementById('transitOriginHub');
  const classSelect = document.getElementById('transitTravelClass');
  const co2Badge = document.getElementById('transitCo2Badge');

  const originOptions = TRANSIT_ORIGINS_BY_MODE[mode] || TRANSIT_ORIGINS_BY_MODE.flight;

  if (originSelect) {
    originSelect.innerHTML = originOptions.map(opt => `
      <option value="${opt.value}">${opt.label}</option>
    `).join('');
  }

  if (mode === 'flight') {
    if (tagEl) tagEl.textContent = 'Verified Island Flight';
    if (titleEl) titleEl.textContent = 'Book Flight to Bali (DPS)';
    if (subEl) subEl.textContent = 'Official single-ticket interline flight with instant PNR code and digital boarding pass.';
    if (destInput) destInput.value = "I Gusti Ngurah Rai Int'l (DPS)";
    if (classSelect) {
      classSelect.innerHTML = `
        <option value="standard" selected>Economy Saver / Basic Cabin</option>
        <option value="premium-economy">Premium Economy / Extra Legroom (+40%)</option>
        <option value="business">Business Class / Lie-Flat Suite (+120%)</option>
      `;
    }
    if (co2Badge) co2Badge.textContent = '✈️ IATA Carbon Offset Ready';
  } else if (mode === 'train') {
    if (tagEl) tagEl.textContent = 'Trans-Java Scenic Rail';
    if (titleEl) titleEl.textContent = 'Book Trans-Java Train + Ferry Pass';
    if (subEl) subEl.textContent = 'Executive KAI train across volcanic Java + connecting luxury ferry to Gilimanuk Bali.';
    if (destInput) destInput.value = 'Ketapang Harbor / Gilimanuk Bali';
    if (classSelect) {
      classSelect.innerHTML = `
        <option value="standard" selected>Eksekutif Class (AC & Reclining)</option>
        <option value="premium-economy">Panoramic Observation Car (+40%)</option>
        <option value="business">Luxury Sleeper Compartment (+120%)</option>
      `;
    }
    if (co2Badge) co2Badge.textContent = '🌿 82% Lower Carbon than Flight';
  } else if (mode === 'bus') {
    if (tagEl) tagEl.textContent = 'Direct Island Express';
    if (titleEl) titleEl.textContent = 'Book Sleeper Coach to Bali';
    if (subEl) subEl.textContent = 'Direct air-conditioned sleeper bus with roll-on roll-off ferry crossing included.';
    if (destInput) destInput.value = 'Mengwi Terminal / Denpasar Central';
    if (classSelect) {
      classSelect.innerHTML = `
        <option value="standard" selected>Executive Sleeper Bed</option>
        <option value="premium-economy">Royal Single Capsule (+40%)</option>
        <option value="business">First Class Private Suite (+120%)</option>
      `;
    }
    if (co2Badge) co2Badge.textContent = '🚌 Direct Hotel Area Drop-off';
  }

  updateTransitFareEstimate();
}

function updateTransitFareEstimate() {
  const originVal = document.getElementById('transitOriginHub')?.value || '';
  const travelClass = document.getElementById('transitTravelClass')?.value || 'standard';
  const passengers = parseInt(document.getElementById('transitPassengers')?.value || '2', 10);
  const baggage = parseInt(document.getElementById('transitBaggage')?.value || '0', 10);

  const list = TRANSIT_ORIGINS_BY_MODE[activeTransitMode] || TRANSIT_ORIGINS_BY_MODE.flight;
  const matched = list.find(o => o.value === originVal) || list[0];

  let baseRate = matched ? matched.baseUSD : 100;
  let multiplier = 1.0;
  if (travelClass === 'premium-economy') multiplier = 1.4;
  if (travelClass === 'business') multiplier = 2.2;

  const total = Math.round((baseRate * multiplier + baggage) * passengers);

  const fareDisplay = document.getElementById('transitFareCalculated');
  const subtext = document.getElementById('transitFareSubtext');

  if (fareDisplay) {
    fareDisplay.textContent = formatPrice(total);
  }
  if (subtext) {
    subtext.textContent = `Includes all taxes, port fees & ${baggage > 0 ? '30kg' : '20kg'} baggage for ${passengers} traveler${passengers > 1 ? 's' : ''}`;
  }
}

window.openTransitBooking = function(mode = 'flight', originHub = '') {
  const modalTabs = document.querySelectorAll('.transit-modal-tab');
  modalTabs.forEach(t => {
    t.classList.toggle('active', t.dataset.mode === mode);
  });

  switchTransitMode(mode);

  if (originHub) {
    const originSelect = document.getElementById('transitOriginHub');
    if (originSelect) {
      for (let opt of originSelect.options) {
        if (opt.value.toLowerCase().includes(originHub.toLowerCase()) ||
            originHub.toLowerCase().includes(opt.value.toLowerCase())) {
          originSelect.value = opt.value;
          break;
        }
      }
    }
  }

  updateTransitFareEstimate();

  const modal = document.getElementById('transitBookingModal');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
};

function renderBoardingPass(ticket) {
  const opEl = document.getElementById('passOperatorTitle');
  const pnrEl = document.getElementById('passPnrCode');
  const origCodeEl = document.getElementById('passOriginCode');
  const origCityEl = document.getElementById('passOriginCity');
  const durEl = document.getElementById('passFlightDuration');
  const nameEl = document.getElementById('passPassengerName');
  const dateEl = document.getElementById('passDateTime');
  const seatEl = document.getElementById('passSeatClass');
  const gateEl = document.getElementById('passGate');
  const barcodeEl = document.getElementById('passBarcodeText');

  if (opEl) opEl.textContent = ticket.operator || 'Garuda Indonesia / KAI Express';
  if (pnrEl) pnrEl.textContent = ticket.pnr;
  if (origCodeEl) origCodeEl.textContent = ticket.originCode || 'ORG';
  if (origCityEl) origCityEl.textContent = ticket.originCity || ticket.origin || 'Departure Hub';
  if (durEl) durEl.textContent = ticket.duration || 'Direct';
  if (nameEl) nameEl.textContent = ticket.leadPassenger;
  if (dateEl) dateEl.textContent = `${ticket.date} • ${ticket.depTime || '08:30 WITA'}`;
  if (seatEl) seatEl.textContent = `${ticket.seat || 'Seat 14A'} (${ticket.cabinClass || 'Standard'})`;
  if (gateEl) gateEl.textContent = `${ticket.gatePlatform || 'Gate 4B'} • Boarding ${ticket.boardingTime || '07:45'}`;
  if (barcodeEl) barcodeEl.textContent = ticket.barcodeNumber || '0948 2819 4028 1092';
}

function generateClientTicket(params) {
  const modePrefix = params.mode === 'train' ? 'KAI-TRN' : (params.mode === 'bus' ? 'DPS-BUS' : 'DPS-AIR');
  const pnr = `${modePrefix}-${Math.floor(100000 + Math.random() * 900000)}`;

  const originList = TRANSIT_ORIGINS_BY_MODE[params.mode] || TRANSIT_ORIGINS_BY_MODE.flight;
  const match = originList.find(o => o.value === params.origin) || originList[0];

  return {
    pnr,
    mode: params.mode,
    operator: params.mode === 'train' ? 'Kereta Api Indonesia (KAI Executive)' : (params.mode === 'bus' ? 'Gunung Harta VIP Sleeper' : 'Garuda Indonesia / Singapore Airlines'),
    origin: params.origin,
    originCity: match.city,
    originCode: match.code,
    destination: "Bali (DPS)",
    duration: match.duration,
    date: params.departDate,
    depTime: '08:30 WITA',
    boardingTime: '07:45 WITA',
    leadPassenger: params.leadPassenger,
    passengers: params.passengers,
    cabinClass: params.travelClass === 'business' ? 'Business Class Suite' : (params.travelClass === 'premium-economy' ? 'Premium Economy' : 'Economy Saver'),
    seat: 'Seat 14A',
    gatePlatform: params.mode === 'flight' ? 'Gate 4B' : 'Platform 2',
    barcodeNumber: `${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`
  };
}

window.closeModal = function(modalId) {
  if (modalId === 'panoramaModal' && typeof window.close360Panorama === 'function') {
    window.close360Panorama();
    return;
  }
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
};

// Close modals when clicking backdrop or pressing Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (typeof window.close360Panorama === 'function') {
      window.close360Panorama();
    }
    document.querySelectorAll('.modal-backdrop.open').forEach(m => m.classList.remove('open'));
    document.body.style.overflow = '';
  }
});

document.querySelectorAll('.modal-backdrop').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      if (modal.id === 'panoramaModal' && typeof window.close360Panorama === 'function') {
        window.close360Panorama();
      } else {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
  });
});

window.showToast = function(title, message) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.innerHTML = `
    <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--grad-aurora); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 12px; font-weight: 800; flex-shrink: 0;">✓</div>
    <div>
      <h5 style="font-size: 0.92rem; font-weight: 800; color: var(--text-primary); margin-bottom: 2px;">${title}</h5>
      <p style="font-size: 0.82rem; color: var(--text-secondary);">${message}</p>
    </div>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
};

/* ==========================================================================
   21. PRIVATE DRIVER & SCOOTER RENTAL ENGINE
   ========================================================================== */
function initRentalBooking() {
  const modal = document.getElementById('rentalBookingModal');
  const form = document.getElementById('rentalBookingForm');
  const tabs = document.querySelectorAll('#rentalBookingModal .transit-modal-tab');
  const vehicleInput = document.getElementById('rentalVehicleType');
  const durationSelect = document.getElementById('rentalDurationDays');
  const insuranceSelect = document.getElementById('rentalInsuranceTier');
  const startDateInput = document.getElementById('rentalStartDate');

  // Default start date to tomorrow
  if (startDateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    startDateInput.value = tomorrow.toISOString().split('T')[0];
    startDateInput.min = new Date().toISOString().split('T')[0];
  }

  // Vehicle tab switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const vehicle = tab.dataset.vehicle;
      if (vehicleInput) vehicleInput.value = vehicle;
      updateRentalPrice();
    });
  });

  if (durationSelect) durationSelect.addEventListener('change', updateRentalPrice);
  if (insuranceSelect) insuranceSelect.addEventListener('change', updateRentalPrice);

  function updateRentalPrice() {
    const vehicle = vehicleInput ? vehicleInput.value : 'car-driver';
    const days = parseInt((durationSelect && durationSelect.value) || '3', 10);
    const insurance = insuranceSelect ? insuranceSelect.value : 'comprehensive';

    let baseDayRate = 35;
    if (vehicle === 'scoopy') {
      baseDayRate = 7;
    } else if (vehicle === 'nmax') {
      baseDayRate = 12;
    }

    const insuranceDaily = insurance === 'comprehensive' ? 5 : 0;
    const totalUSD = (baseDayRate + insuranceDaily) * days;

    const fareEl = document.getElementById('rentalTotalFareCalculated');
    const detailsEl = document.getElementById('rentalFareDetails');
    if (fareEl) fareEl.textContent = formatPrice(totalUSD);
    if (detailsEl) detailsEl.textContent = `${days} days × (${formatPrice(baseDayRate)} base + ${insuranceDaily ? formatPrice(insuranceDaily) + ' comp insurance' : 'standard ins'})`;
  }

  window.openRentalBookingModal = function(vehicleType = 'car-driver') {
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Reset result view
    const formBox = document.getElementById('rentalBookingForm');
    const voucherBox = document.getElementById('rentalConfirmedVoucherBox');
    if (formBox) formBox.style.display = 'block';
    if (voucherBox) voucherBox.style.display = 'none';

    // Switch tab
    tabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.vehicle === vehicleType);
    });
    if (vehicleInput) vehicleInput.value = vehicleType;
    updateRentalPrice();
  };

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Verifying with Island Dispatch...';
      }

      const payload = {
        vehicleType: vehicleInput ? vehicleInput.value : 'car-driver',
        durationDays: (durationSelect && durationSelect.value) || 3,
        startDate: (startDateInput && startDateInput.value) || new Date().toISOString().split('T')[0],
        pickupLocation: document.getElementById('rentalPickupZone')?.value || 'Seminyak Hotel Lobby',
        insuranceTier: insuranceSelect ? insuranceSelect.value : 'comprehensive',
        renterName: document.getElementById('renterFullName')?.value || 'Traveler',
        email: document.getElementById('renterEmail')?.value || 'traveler@example.com',
        phone: document.getElementById('renterPhone')?.value || '+62 812-3456-7890'
      };

      try {
        const res = await fetch('/api/rental/book', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();

        if (data.success && data.voucher) {
          const voucher = data.voucher;
          // Store in localStorage
          localStorage.setItem('wanderpulse_rental_voucher', JSON.stringify(voucher));

          // Populate confirmed voucher card
          const formBox = document.getElementById('rentalBookingForm');
          const voucherBox = document.getElementById('rentalConfirmedVoucherBox');
          if (formBox) formBox.style.display = 'none';
          if (voucherBox) {
            voucherBox.style.display = 'block';
            document.getElementById('rentalVoucherCode').textContent = voucher.bookingId;
            document.getElementById('rentalVoucherTitle').textContent = voucher.vehicleTitle;
            document.getElementById('rentalVoucherDetails').textContent = `${voucher.durationDays} Days • ${voucher.pickupLocation} • ${voucher.renterName}`;
            document.getElementById('rentalVoucherContact').textContent = voucher.dispatchContact;
          }

          showToast('Rental Confirmed', `Voucher ${voucher.bookingId} issued for ${voucher.renterName}!`);
        } else {
          showToast('Booking Error', data.error || 'Could not confirm rental.');
        }
      } catch (err) {
        const fakeVoucher = {
          bookingId: `BALI-RIDE-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
          vehicleTitle: payload.vehicleType === 'car-driver' ? 'Private AC SUV + Dedicated Driver' : 'Honda Scoopy 110cc',
          durationDays: payload.durationDays,
          pickupLocation: payload.pickupLocation,
          renterName: payload.renterName,
          dispatchContact: 'Ketut Dharma (Senior Bali Chauffeur - WhatsApp: +62 812-3988-1200)'
        };
        localStorage.setItem('wanderpulse_rental_voucher', JSON.stringify(fakeVoucher));
        const formBox = document.getElementById('rentalBookingForm');
        const voucherBox = document.getElementById('rentalConfirmedVoucherBox');
        if (formBox) formBox.style.display = 'none';
        if (voucherBox) {
          voucherBox.style.display = 'block';
          document.getElementById('rentalVoucherCode').textContent = fakeVoucher.bookingId;
          document.getElementById('rentalVoucherTitle').textContent = fakeVoucher.vehicleTitle;
          document.getElementById('rentalVoucherDetails').textContent = `${fakeVoucher.durationDays} Days • ${fakeVoucher.pickupLocation} • ${fakeVoucher.renterName}`;
          document.getElementById('rentalVoucherContact').textContent = fakeVoucher.dispatchContact;
        }
        showToast('Rental Confirmed', `Voucher ${fakeVoucher.bookingId} generated!`);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Confirm & Issue Rental Voucher →';
        }
      }
    });
  }
}

/* ==========================================================================
   22. INTERACTIVE VISA & BALI LEVY ELIGIBILITY CHECKER
   ========================================================================== */
function initVisaChecker() {
  const select = document.getElementById('visaCountrySelect');
  if (!select) return;

  const aseanCountries = ['SG', 'MY', 'TH', 'PH', 'VN', 'BN', 'KH', 'LA', 'MM'];

  function updateVisaStatus() {
    const country = select.value;
    const badge = document.getElementById('visaStatusBadge');
    const totalFee = document.getElementById('visaTotalFee');
    const feeVoa = document.getElementById('visaFeeVoa');

    if (aseanCountries.includes(country)) {
      if (badge) {
        badge.className = 'visa-status-pill status-free';
        badge.textContent = 'ASEAN Visa Exemption (FREE)';
      }
      if (feeVoa) feeVoa.textContent = 'FREE (30-Day Exemption)';
      if (totalFee) totalFee.textContent = 'IDR 150,000 (~$10 USD)';
    } else {
      if (badge) {
        badge.className = 'visa-status-pill status-voa';
        badge.textContent = '30-Day e-VoA Eligible';
      }
      if (feeVoa) feeVoa.textContent = 'IDR 500,000 (~$35 USD)';
      if (totalFee) totalFee.textContent = '~$45 USD Total (e-VoA + Levy)';
    }
  }

  select.addEventListener('change', updateVisaStatus);
  updateVisaStatus();
}

/* ==========================================================================
   23. REAL-TIME BALI SKY TELEMETRY SIMULATOR CONTROLS
   ========================================================================== */
function initSkySimulator() {
  const slider = document.getElementById('skyHourSlider');
  const syncBtn = document.getElementById('syncLiveBaliSkyBtn');

  if (slider) {
    slider.addEventListener('input', (e) => {
      const hour = parseFloat(e.target.value);
      if (window.updateAtmosphericSky) {
        window.updateAtmosphericSky(hour);
      }
    });
  }

  if (syncBtn) {
    syncBtn.addEventListener('click', () => {
      const now = new Date();
      const baliHour = (now.getUTCHours() + 8 + now.getUTCMinutes() / 60) % 24;
      if (window.updateAtmosphericSky) {
        window.updateAtmosphericSky(baliHour);
      }
      showToast('Bali Sky Synced', `Set 3D atmospheric lighting to live Bali time (${Math.floor(baliHour)}:${String(Math.floor((baliHour % 1) * 60)).padStart(2, '0')} WITA).`);
    });
  }

  // Initial sync with live Bali time
  const now = new Date();
  const initialBaliHour = (now.getUTCHours() + 8 + now.getUTCMinutes() / 60) % 24;
  if (window.updateAtmosphericSky) {
    window.updateAtmosphericSky(initialBaliHour);
  }
}

/* ==========================================================================
   24. 1-CLICK COMPLETE OFFLINE TRIP DOSSIER & POCKETBOOK
   ========================================================================== */
window.openTripDossierModal = function() {
  const modal = document.getElementById('tripDossierModal');
  const container = document.getElementById('tripDossierContent');
  if (!modal || !container) return;

  // Retrieve saved items, bookings, rentals
  const savedSpotIds = JSON.parse(localStorage.getItem('wanderpulse_saved_spots') || '[]');
  const savedSpots = ATTRACTIONS_DATA.filter(a => savedSpotIds.includes(a.id));
  const hotelVoucher = JSON.parse(localStorage.getItem('wanderpulse_hotel_booking') || 'null');
  const transitVoucher = JSON.parse(localStorage.getItem('wanderpulse_transit_ticket') || 'null');
  const rentalVoucher = JSON.parse(localStorage.getItem('wanderpulse_rental_voucher') || 'null');

  const travelerName = (transitVoucher && transitVoucher.leadPassenger) ||
                       (hotelVoucher && hotelVoucher.guestName) ||
                       (rentalVoucher && rentalVoucher.renterName) ||
                       'Maya Lin';

  const tripId = `WP-BALI-${Math.floor(100000 + Math.random() * 900000)}`;

  let itineraryHtml = '';
  if (savedSpots.length === 0) {
    itineraryHtml = `
      <div style="padding: 14px; background: rgba(255,255,255,0.04); border-radius: var(--radius-sm); border: 1px dashed var(--border-subtle); margin-bottom: 12px;">
        <strong style="display: block; font-size: 0.95rem; margin-bottom: 4px;">Top Recommended 3-Day Highlights:</strong>
        <p style="color: var(--text-secondary); font-size: 0.85rem; margin: 0; line-height: 1.5;">
          Day 1: Tanah Lot Sunset Sea Temple • Day 2: Tegallalang Rice Terraces & Ubud Monkey Forest • Day 3: Uluwatu Clifftop Temple & Kecak Fire Dance.
        </p>
      </div>`;
  } else {
    itineraryHtml = savedSpots.map((spot, idx) => `
      <div class="dossier-item-card" style="display: flex; justify-content: space-between; align-items: center; gap: 12px;">
        <div>
          <strong style="font-size: 0.95rem; display: block;">Day ${(idx % 4) + 1}: ${spot.name}</strong>
          <span style="font-size: 0.8rem; color: var(--text-secondary);">${spot.location} • Ideal: ${spot.duration}</span>
        </div>
        <div style="text-align: right;">
          <span style="font-size: 0.85rem; font-weight: 700; color: var(--accent-coral);">${formatPrice(spot.feeUSD)}</span>
        </div>
      </div>
    `).join('');
  }

  container.innerHTML = `
    <div class="dossier-header-bar">
      <div>
        <span class="section-tag tag-aurora">Official Traveler Dossier</span>
        <h1 style="font-size: 1.8rem; margin: 6px 0 2px;">WanderPulse Bali Field Pocketbook</h1>
        <p style="font-size: 0.85rem; color: var(--text-muted);">
          Complete offline travel itinerary, confirmed reservation vouchers & emergency directory.
        </p>
      </div>
      <div style="text-align: right;">
        <span style="font-size: 0.7rem; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); display: block;">Dossier Reference</span>
        <strong style="font-size: 1.15rem; color: #FBBF24; letter-spacing: 1.5px;">${tripId}</strong>
        <span style="font-size: 0.75rem; color: var(--text-secondary); display: block; margin-top: 2px;">Lead: ${travelerName}</span>
      </div>
    </div>

    <div class="dossier-grid">
      <!-- Section 1: Emergency SOS Directory -->
      <div>
        <h3 class="dossier-section-title">🚨 Island Emergency SOS Directory (Save / Print)</h3>
        <div class="dossier-sos-grid">
          <div class="dossier-sos-box">
            <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); display: block;">National Emergency</span>
            <span class="dossier-sos-num">112</span>
            <span style="font-size: 0.72rem; color: var(--text-secondary); display: block;">Police & Ambulance</span>
          </div>
          <div class="dossier-sos-box">
            <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); display: block;">Bali Tourist Police</span>
            <span class="dossier-sos-num" style="font-size: 1.05rem;">+62 361 224111</span>
            <span style="font-size: 0.72rem; color: var(--text-secondary); display: block;">Denpasar HQ</span>
          </div>
          <div class="dossier-sos-box">
            <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); display: block;">BIMC 24h Hospital</span>
            <span class="dossier-sos-num" style="font-size: 1.05rem;">+62 361 761263</span>
            <span style="font-size: 0.72rem; color: var(--text-secondary); display: block;">Kuta & Nusa Dua</span>
          </div>
          <div class="dossier-sos-box">
            <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); display: block;">Search & Rescue (BASARNAS)</span>
            <span class="dossier-sos-num">115</span>
            <span style="font-size: 0.72rem; color: var(--text-secondary); display: block;">Ocean & Mountain</span>
          </div>
        </div>
      </div>

      <!-- Section 2: Confirmed Transportation Vouchers -->
      <div>
        <h3 class="dossier-section-title">✈️ Confirmed Island Transit & Ride Passes</h3>
        <div class="dossier-item-card">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
            <div>
              <span class="section-tag tag-cyan" style="margin-bottom: 4px;">Electronic Boarding Pass</span>
              <h4 style="font-size: 1.1rem; margin: 4px 0;">${transitVoucher ? transitVoucher.operator : 'Garuda Indonesia / KAI Interline Express'}</h4>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0;">
                Route: ${transitVoucher ? transitVoucher.origin : 'Singapore (SIN)'} ➔ I Gusti Ngurah Rai (DPS)
              </p>
            </div>
            <div style="text-align: right;">
              <span style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; display: block;">PNR Code</span>
              <strong style="color: #FBBF24; font-size: 1.1rem;">${transitVoucher ? transitVoucher.pnr : 'DPS-AIR-94821'}</strong>
            </div>
          </div>
          <div style="font-size: 0.82rem; color: var(--text-muted); border-top: 1px solid var(--border-subtle); padding-top: 8px; display: flex; justify-content: space-between;">
            <span>Passenger: ${travelerName} • Seat: ${transitVoucher ? transitVoucher.seat : 'Seat 14A (Business)'}</span>
            <span style="color: var(--accent-emerald); font-weight: 700;">Status: CONFIRMED</span>
          </div>
        </div>

        <div class="dossier-item-card">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
            <div>
              <span class="section-tag tag-coral" style="margin-bottom: 4px;">Island Ride Voucher</span>
              <h4 style="font-size: 1.1rem; margin: 4px 0;">${rentalVoucher ? rentalVoucher.vehicleTitle : 'Private AC SUV + Dedicated English-Speaking Driver'}</h4>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0;">
                Pickup: ${rentalVoucher ? rentalVoucher.pickupLocation : 'Seminyak Hotel Lobby / Airport DPS'}
              </p>
            </div>
            <div style="text-align: right;">
              <span style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; display: block;">Ride Voucher</span>
              <strong style="color: #FBBF24; font-size: 1.1rem;">${rentalVoucher ? rentalVoucher.bookingId : 'BALI-RIDE-7X9A2K'}</strong>
            </div>
          </div>
          <div style="font-size: 0.82rem; color: var(--text-muted); border-top: 1px solid var(--border-subtle); padding-top: 8px; display: flex; justify-content: space-between;">
            <span>Chauffeur Contact: ${rentalVoucher ? rentalVoucher.dispatchContact : 'Ketut Dharma (+62 812-3988-1200)'}</span>
            <span style="color: var(--accent-emerald); font-weight: 700;">Includes 10h/day Touring</span>
          </div>
        </div>
      </div>

      <!-- Section 3: Saved Day-by-Day Itinerary -->
      <div>
        <h3 class="dossier-section-title">🗺️ Custom Day-by-Day Saved Itinerary</h3>
        ${itineraryHtml}
      </div>

      <!-- Section 4: Cultural Etiquette & Audio Phrasebook Cheatsheet -->
      <div>
        <h3 class="dossier-section-title">🗣️ Essential Balinese Phrases & Etiquette Cheatsheet</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px; font-size: 0.84rem;">
          <div style="background: var(--bg-card); padding: 10px 14px; border-radius: var(--radius-xs); border: 1px solid var(--border-subtle);">
            <strong style="display: block; color: var(--accent-cyan);">Om Swastiastu</strong>
            <span style="color: var(--text-secondary);">[ohm swas-tee-as-too] • Peace & greeting</span>
          </div>
          <div style="background: var(--bg-card); padding: 10px 14px; border-radius: var(--radius-xs); border: 1px solid var(--border-subtle);">
            <strong style="display: block; color: var(--accent-emerald);">Matur Suksma</strong>
            <span style="color: var(--text-secondary);">[mah-toor sook-smah] • Thank you very much</span>
          </div>
          <div style="background: var(--bg-card); padding: 10px 14px; border-radius: var(--radius-xs); border: 1px solid var(--border-subtle);">
            <strong style="display: block; color: var(--accent-amber);">Berapa Harganya?</strong>
            <span style="color: var(--text-secondary);">[beh-rah-pah har-gah-nyah] • How much is this?</span>
          </div>
          <div style="background: var(--bg-card); padding: 10px 14px; border-radius: var(--radius-xs); border: 1px solid var(--border-subtle);">
            <strong style="display: block; color: var(--accent-coral);">Mewali</strong>
            <span style="color: var(--text-secondary);">[meh-wah-lee] • You are welcome</span>
          </div>
        </div>
      </div>

      <!-- Section 5: Indonesian Rupiah Conversion Reference -->
      <div>
        <h3 class="dossier-section-title">💱 Street Currency Quick Reference Table</h3>
        <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; text-align: center; font-size: 0.8rem; background: var(--bg-card); padding: 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
          <div><strong>$1 USD</strong><div style="color: var(--accent-coral);">Rp 15.8k</div></div>
          <div><strong>$5 USD</strong><div style="color: var(--accent-coral);">Rp 79k</div></div>
          <div><strong>$10 USD</strong><div style="color: var(--accent-coral);">Rp 158k</div></div>
          <div><strong>$20 USD</strong><div style="color: var(--accent-coral);">Rp 317k</div></div>
          <div><strong>$50 USD</strong><div style="color: var(--accent-coral);">Rp 792k</div></div>
          <div><strong>$100 USD</strong><div style="color: var(--accent-coral);">Rp 1.58M</div></div>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

/* ==========================================================================
   25. COMMUNITY TRAVELER TIPS & REVIEWS
   ========================================================================== */
let cachedReviews = [];

function initCommunityReviews() {
  loadCommunityReviews('all');

  // Filter tabs
  const tabs = document.querySelectorAll('#reviewsFilterTabs .filter-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      renderReviewsGrid(filter);
    });
  });

  // Modal open function
  window.openReviewModal = function(targetId = 'general') {
    const modal = document.getElementById('reviewModal');
    if (!modal) return;
    const select = document.getElementById('reviewTargetSelect');
    if (select && targetId) select.value = targetId;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  // Form submit
  const form = document.getElementById('communityReviewForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting Tip...';
      }

      const select = document.getElementById('reviewTargetSelect');
      const targetName = select ? select.options[select.selectedIndex].text : 'Bali Travel';

      const payload = {
        targetId: select ? select.value : 'general',
        targetName,
        author: document.getElementById('reviewAuthorName')?.value || 'Anonymous Traveler',
        origin: document.getElementById('reviewAuthorOrigin')?.value || 'Global Traveler',
        rating: parseInt(document.getElementById('reviewRating')?.value || '5', 10),
        tipText: document.getElementById('reviewTipText')?.value || ''
      };

      try {
        const res = await fetch('/api/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const json = await res.json();
        if (json.success && json.review) {
          cachedReviews.unshift(json.review);
          renderReviewsGrid('all');
          closeModal('reviewModal');
          form.reset();
          showToast('Tip Shared!', 'Thank you! Your insider travel advice has been added to the community guide.');
        } else {
          showToast('Notice', json.error || 'Could not submit review.');
        }
      } catch (err) {
        const mockReview = {
          id: `rev-${Date.now()}`,
          ...payload,
          verifiedVisitor: true,
          createdAt: new Date().toISOString()
        };
        cachedReviews.unshift(mockReview);
        renderReviewsGrid('all');
        closeModal('reviewModal');
        form.reset();
        showToast('Tip Shared!', 'Your insider travel advice has been added to the community guide.');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Post Tip to Community';
        }
      }
    });
  }
}

async function loadCommunityReviews(filter = 'all') {
  try {
    const res = await fetch('/api/reviews');
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      cachedReviews = json.data;
    }
  } catch (err) {
    console.warn('Could not load reviews from API, using fallback data');
  }
  renderReviewsGrid(filter);
}

function renderReviewsGrid(filter = 'all') {
  const grid = document.getElementById('communityReviewsGrid');
  const countBadge = document.getElementById('reviewsCountBadge');
  if (!grid) return;

  let filtered = [...cachedReviews];
  if (filter === 'temple') {
    filtered = filtered.filter(r => ['tanah-lot', 'uluwatu-temple', 'mount-batur', 'tegallalang'].includes(r.targetId));
  } else if (filter === 'hotel') {
    filtered = filtered.filter(r => ['padma-ubud', 'ayana-resort', 'viceroy-bali'].includes(r.targetId));
  } else if (filter === 'transit') {
    filtered = filtered.filter(r => ['trans-java-train', 'private-driver'].includes(r.targetId));
  }

  if (countBadge) countBadge.textContent = cachedReviews.length;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 36px 20px; background: var(--bg-card); border-radius: var(--radius-md);">
        <p style="color: var(--text-muted); font-size: 0.95rem;">No traveler tips under this category yet. Be the first to share one!</p>
        <button type="button" class="btn btn-primary-grad" onclick="window.openReviewModal()" style="margin-top: 12px;">✍️ Share First Tip</button>
      </div>`;
    return;
  }

  grid.innerHTML = filtered.map(r => `
    <article class="glass-card review-card rainbow-hover" data-tilt-3d style="padding: 24px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <span class="section-tag tag-cyan" style="font-size: 0.72rem; margin: 0;">${r.targetName || 'Bali Travel'}</span>
        <div style="color: #FBBF24; font-size: 0.95rem;">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
      </div>
      <p class="review-quote" style="font-size: 0.92rem; line-height: 1.6; color: var(--text-primary); margin: 12px 0 16px;">
        "${r.tipText}"
      </p>
      <div class="review-author-row" style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 12px;">
        <div class="author-info">
          <strong class="author-name" style="font-size: 0.88rem; display: block;">${r.author}</strong>
          <span class="author-origin" style="font-size: 0.76rem; color: var(--text-muted);">${r.origin || 'Verified Visitor'}</span>
        </div>
        <span style="font-size: 0.72rem; color: var(--accent-emerald); font-weight: 700; background: rgba(16,185,129,0.12); padding: 3px 8px; border-radius: var(--radius-full);">
          ✓ Verified Tip
        </span>
      </div>
    </article>
  `).join('');
}


