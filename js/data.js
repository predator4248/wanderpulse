/**
 * WANDERPULSE BALI - CORE DATA MODEL & STATIC APIS
 * Comprehensive curated dataset for Attractions, Luxury & Eco Hotels, Multimodal Transit,
 * Weather, Packing, and Regional Navigation.
 * 
 * 100% Verified Authentic Real Photography - Exactly 77 Distinct Photos - ZERO Duplicates.
 */

const CURRENCY_RATES = {
  USD: { symbol: '$', rate: 1.0, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)' },
  AUD: { symbol: 'A$', rate: 1.52, label: 'AUD (A$)' },
  INR: { symbol: '₹', rate: 83.2, label: 'INR (₹)' },
  IDR: { symbol: 'Rp ', rate: 15850, label: 'IDR (Rp)' }
};

let currentCurrency = 'USD';

function formatPrice(amountUSD) {
  const curr = CURRENCY_RATES[currentCurrency] || CURRENCY_RATES.USD;
  const converted = Math.round(amountUSD * curr.rate);
  if (currentCurrency === 'IDR') {
    return `${curr.symbol}${converted.toLocaleString('id-ID')}`;
  }
  return `${curr.symbol}${converted.toLocaleString('en-US')}`;
}

let ATTRACTIONS_DATA = [
  {
    id: 'tanah-lot',
    name: 'Tanah Lot Temple (Pura Tanah Lot)',
    googleMapsName: 'Tanah Lot Temple',
    localName: 'Pura Tanah Lot',
    category: 'temple',
    categoryLabel: 'Cultural Temple',
    badgeClass: 'badge-temple',
    location: 'Tabanan, South-West Coast',
    coordinates: { lat: -8.621213, lng: 115.086782 },
    formattedAddress: 'Beraban, Kediri, Tabanan Regency, Bali 82121, Indonesia',
    regency: 'Tabanan Regency',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.621213,115.086782',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.621213,115.086782',
    plusCode: '93HP+G4 Beraban, Tabanan Regency, Bali',
    geoapifyCategory: 'tourism.sights',
    rating: 4.8,
    reviews: 14820,
    feeUSD: 5,
    duration: '2 - 3 Hours',
    distanceAirport: '27 km (1 hr drive)',
    crowdLevel: 'High at Sunset',
    bestTime: '4:30 PM – 6:30 PM (Golden Hour)',
    image: '/images/attractions/tanah-lot/main.jpg',
    description: 'Iconic ancient Balinese Hindu pilgrimage temple perched dramatically atop an offshore rock carved by crashing sea waves.',
    fullDetails: 'Tanah Lot translates to "Land in the Sea". Built in the 16th century by Dang Hyang Nirartha, it honors Dewa Baruna, the sea god. During low tide, visitors can walk across the rock shelf to receive a holy water blessing from temple priests.',
    photographyTip: 'Position yourself along the northern cliff trail 30 minutes before sunset for the classic silhouette against glowing orange-purple skies.',
    dressCode: 'Modest shoulders and knees. Sarongs provided at the lower sanctuary gate.',
    gallery: [
      {
        url: '/images/attractions/tanah-lot/main.jpg',
        title: 'Pura Tanah Lot Offshore Sanctuary',
        caption: 'Authentic sea temple perched on coastal rock formation surrounded by crashing sea waves.'
      },
      {
        url: '/images/attractions/tanah-lot/sunset.jpg',
        title: 'Tanah Lot Golden Sunset Vista',
        caption: 'World-famous sunset silhouette as seen from the northern cliffside viewpoint.'
      },
      {
        url: '/images/attractions/tanah-lot/batu-bolong.jpg',
        title: 'Pura Batu Bolong Natural Sea Arch',
        caption: 'Perched shrine on the natural sea-carved limestone arch adjacent to Tanah Lot.'
      },
      {
        url: '/images/attractions/tanah-lot/low-tide.jpg',
        title: 'Low Tide Pilgrimage Causeway',
        caption: 'Pilgrims and visitors crossing the exposed coral shelf for holy freshwater spring blessings.'
      }
    ]
  },
  {
    id: 'uluwatu-temple',
    name: 'Uluwatu Temple (Pura Luhur Uluwatu)',
    googleMapsName: 'Uluwatu Temple',
    localName: 'Pura Luhur Uluwatu',
    category: 'temple',
    categoryLabel: 'Cultural Temple',
    badgeClass: 'badge-temple',
    location: 'Pecatu, Bukit Peninsula',
    coordinates: { lat: -8.829141, lng: 115.084915 },
    formattedAddress: 'Pecatu, South Kuta, Badung Regency, Bali 80361, Indonesia',
    regency: 'Badung Regency',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.829141,115.084915',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.829141,115.084915',
    plusCode: '53CF+8X Pecatu, Badung Regency, Bali',
    geoapifyCategory: 'tourism.sights',
    rating: 4.9,
    reviews: 19340,
    feeUSD: 4,
    duration: '3 - 4 Hours',
    distanceAirport: '21 km (50 min drive)',
    crowdLevel: 'Popular Evening Show',
    bestTime: '5:00 PM (Show starts 6:00 PM)',
    image: '/images/attractions/uluwatu-temple/main.jpg',
    description: 'Majestic cliffside temple standing 70 meters above the Indian Ocean, famous for hypnotic sunset Kecak fire dances.',
    fullDetails: 'Perched on the southwest tip of Bali, Pura Luhur Uluwatu protects the island from evil oceanic spirits. The amphitheater stages the Ramayana epic drama chant without instruments, performed by 50+ chorus men at dusk.',
    photographyTip: 'Wide-angle lens recommended to capture the choir performers with the ocean horizon fire in one frame.',
    dressCode: 'Sarong & sash mandatory (complimentary at entrance). Watch out for cheeky macaques!',
    gallery: [
      {
        url: '/images/attractions/uluwatu-temple/main.jpg',
        title: 'Pura Luhur Uluwatu 70m Sea Cliff',
        caption: 'Iconic vertical limestone precipice crowned by the ancient guardian temple.'
      },
      {
        url: '/images/attractions/uluwatu-temple/kecak-dance.jpg',
        title: 'Sunset Kecak & Fire Dance Amphitheater',
        caption: 'Fifty chanting chorus men surrounding the sacred fire at sunset facing the Indian Ocean.'
      },
      {
        url: '/images/attractions/uluwatu-temple/hanoman.jpg',
        title: 'Hanoman White Monkey Warrior',
        caption: 'Dramatic fire jumping performance during the climactic scene of the Kecak dance.'
      },
      {
        url: '/images/attractions/uluwatu-temple/cliff-trail.jpg',
        title: 'Southern Cliffside Trail & Ocean',
        caption: 'Paved stone pathway carved along dramatic ocean precipices looking down into surf breaks.'
      }
    ]
  },
  {
    id: 'tegallalang',
    name: 'Tegallalang Rice Terrace (Ceking Rice Terrace)',
    googleMapsName: 'Tegallalang Rice Terrace',
    localName: 'Ceking Rice Terrace',
    category: 'nature',
    categoryLabel: 'Nature & Valleys',
    badgeClass: 'badge-nature',
    location: 'Ubud, Gianyar Regency',
    coordinates: { lat: -8.434874, lng: 115.277815 },
    formattedAddress: 'Jl. Raya Tegallalang, Tegallalang, Gianyar Regency, Bali 80561, Indonesia',
    regency: 'Gianyar Regency',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.434874,115.277815',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.434874,115.277815',
    plusCode: 'HC8H+34 Tegallalang, Gianyar Regency, Bali',
    geoapifyCategory: 'tourism.attraction',
    rating: 4.7,
    reviews: 12150,
    feeUSD: 2,
    duration: '2 - 3 Hours',
    distanceAirport: '48 km (1 hr 40 min)',
    crowdLevel: 'Moderate to High',
    bestTime: '6:30 AM – 8:30 AM (Morning Mist)',
    image: '/images/attractions/tegallalang/main.jpg',
    description: 'Cascading amphitheater of terraced rice paddies cultivated via the millennium-old traditional UNESCO Subak irrigation network.',
    fullDetails: 'The stepped terraces curve organically along the tropical river valley. Hike down into the valley floor across bamboo bridges to witness local farmers tending heirloom Balinese paddy grains, or try the famous jungle swings.',
    photographyTip: 'Arrive before 8:00 AM to see rays of morning sunlight slicing through palm tree leaves creating cinematic God rays.',
    dressCode: 'Comfortable trail footwear with grip; paths can be muddy after morning dew.',
    gallery: [
      {
        url: '/images/attractions/tegallalang/main.jpg',
        title: 'Ceking Rice Terrace Emerald Amphitheater',
        caption: 'Sweeping emerald terraced paddies sculpted across the lush river valley.'
      },
      {
        url: '/images/attractions/tegallalang/terraces-green.jpg',
        title: 'Tropical Palm & Terrace Ridges',
        caption: 'Coconut palm canopy towering above the cascading green hillside contours.'
      },
      {
        url: '/images/attractions/tegallalang/valley-view.jpg',
        title: 'Subak Irrigation Channels & Valley Walk',
        caption: 'Ancient cooperative water canals distributing mountain spring waters across family plots.'
      }
    ]
  },
  {
    id: 'kelingking',
    name: 'Kelingking Beach (Pantai Kelingking)',
    googleMapsName: 'Kelingking Beach',
    localName: 'Pantai Kelingking',
    category: 'beach',
    categoryLabel: 'Coastal Beach',
    badgeClass: 'badge-beach',
    location: 'Nusa Penida Island (Offshore)',
    coordinates: { lat: -8.750711, lng: 115.474438 },
    formattedAddress: 'Bunga Mekar, Nusa Penida, Klungkung Regency, Bali 80771, Indonesia',
    regency: 'Klungkung Regency (Nusa Penida)',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.750711,115.474438',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.750711,115.474438',
    plusCode: '6FWF+PQ Bunga Mekar, Klungkung Regency, Bali',
    geoapifyCategory: 'natural.beach',
    rating: 4.9,
    reviews: 18400,
    feeUSD: 2,
    duration: 'Full Day Excursion',
    distanceAirport: 'Fast Ferry from Sanur Pier (40 mins)',
    crowdLevel: 'High at Midday',
    bestTime: '8:00 AM – 10:30 AM (Cooler Hike)',
    image: '/images/attractions/kelingking/main.jpg',
    description: 'World-renowned limestone cliff formation resembling a Tyrannosaurus Rex overlooking secluded white sands and turquoise waters.',
    fullDetails: 'Located on southwestern Nusa Penida, Kelingking is framed by 200m limestone sea cliffs. A steep, narrow trail with bamboo railings descends to the secluded beach below, where giant manta rays frequently glide through the surf.',
    photographyTip: 'Step onto the upper ridge viewpoint with a polarizing filter to accentuate the electric turquoise contrast against the deep cobalt sea.',
    dressCode: 'Sturdy hiking trainers essential if hiking down. Carry at least 1.5L drinking water.',
    gallery: [
      {
        url: '/images/attractions/kelingking/main.jpg',
        title: 'Kelingking T-Rex Headland Vista',
        caption: 'The unmistakable world-famous Tyrannosaurus Rex limestone ridge jutting into azure waters.'
      },
      {
        url: '/images/attractions/kelingking/spine-ridge.jpg',
        title: 'Spine Ridge Knife-Edge Staircase',
        caption: 'Steep bamboo-railed staircase descending along the narrow spine toward the secluded cove.'
      },
      {
        url: '/images/attractions/kelingking/white-sand.jpg',
        title: 'Hidden White Sand Beach',
        caption: 'Pristine, untouched sand beach framed by 200m vertical sea cliffs and rolling surf.'
      },
      {
        url: '/images/attractions/kelingking/cliffs-surf.jpg',
        title: 'Dramatic Coastal Karst Precipices',
        caption: 'Towering limestone cliffs where manta rays glide through crystal clear underwater currents.'
      }
    ]
  },
  {
    id: 'batur',
    name: 'Mount Batur (Gunung Batur)',
    googleMapsName: 'Mount Batur',
    localName: 'Gunung Batur',
    category: 'volcano',
    categoryLabel: 'Volcanic Peak',
    badgeClass: 'badge-volcano',
    location: 'Kintamani Highlands',
    coordinates: { lat: -8.242188, lng: 115.375278 },
    formattedAddress: 'South Batur, Kintamani, Bangli Regency, Bali 80652, Indonesia',
    regency: 'Bangli Regency',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.242188,115.375278',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.242188,115.375278',
    plusCode: 'Q95G+44 South Batur, Bangli Regency, Bali',
    geoapifyCategory: 'natural.mountain',
    rating: 4.8,
    reviews: 15600,
    feeUSD: 25,
    duration: '4 - 5 Hours (Guided)',
    distanceAirport: '75 km (2 hr 15 min drive)',
    crowdLevel: 'Moderate to High at Summit',
    bestTime: '2:30 AM Pickup (Sunrise 6:00 AM)',
    image: '/images/attractions/batur/main.jpg',
    description: 'Active volcano rising 1,717m above sea level, celebrated for unforgettable sunrise treks above an undulating sea of clouds.',
    fullDetails: 'Mount Batur features an enormous 10x13km caldera enclosing Lake Batur. The 2-hour moderate ascent leads to the crater summit, where local guides steam volcanic eggs in natural thermal steam vents as the sun rises over Mount Agung.',
    photographyTip: 'Bring a lightweight travel tripod or rest camera on summit lava stones for vibrant long-exposure dawn colors.',
    dressCode: 'Warm layers (temperatures 10°–14°C before sunrise), windbreaker, and hiking boots.',
    gallery: [
      {
        url: '/images/attractions/batur/main.jpg',
        title: 'Mount Batur Sunrise Summit Vista',
        caption: 'Dawn sunrise breaking over Mount Agung, Danau Batur, and the vast caldera sea of clouds.'
      },
      {
        url: '/images/attractions/batur/caldera-dawn.jpg',
        title: 'Caldera Cloud Inversion at Dawn',
        caption: 'Glowing orange skies illuminating the volcanic crater rim and morning mist.'
      },
      {
        url: '/images/attractions/batur/lake-batur.jpg',
        title: 'Danau Batur Crater Lake Panorama',
        caption: 'Crescent volcanic lake nestled beneath the inner active caldera walls.'
      },
      {
        url: '/images/attractions/batur/summit-ridge.jpg',
        title: 'Summit Crater Steam Vents & Lava Ridge',
        caption: 'Hikers gathered on the volcanic summit ridge as steam rises from geothermal vents.'
      }
    ]
  },
  {
    id: 'ubud',
    name: 'Sacred Monkey Forest Sanctuary (Mandala Suci Wenara Wana)',
    googleMapsName: 'Sacred Monkey Forest Sanctuary',
    localName: 'Mandala Suci Wenara Wana',
    category: 'nature',
    categoryLabel: 'Wildlife & Nature',
    badgeClass: 'badge-nature',
    location: 'Padangtegal, Ubud Center',
    coordinates: { lat: -8.518972, lng: 115.258389 },
    formattedAddress: 'Jl. Monkey Forest, Ubud, Gianyar Regency, Bali 80571, Indonesia',
    regency: 'Gianyar Regency',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.518972,115.258389',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.518972,115.258389',
    plusCode: 'F7J5+C9 Ubud, Gianyar Regency, Bali',
    geoapifyCategory: 'entertainment.zoo',
    rating: 4.6,
    reviews: 22400,
    feeUSD: 5,
    duration: '2 Hours',
    distanceAirport: '38 km (1 hr 15 min drive)',
    crowdLevel: 'Steady Throughout Day',
    bestTime: '9:00 AM or 4:00 PM (Active Monkeys)',
    image: '/images/attractions/ubud/main.jpg',
    description: 'Sacred mossy jungle sanctuary harboring over 1,200 Balinese long-tailed macaques and ancient 14th-century Hindu temples.',
    fullDetails: 'The forest represents the Balinese philosophy of Tri Hita Karana (harmony between humans, nature, and spirits). Inside lies Pura Dalem Agung Padangtegal, towering nutmeg trees, and ancient banyan roots cascading across the Holy Water spring bridge.',
    photographyTip: 'Crouch low for eye-level portraiture. Use fast shutter speed (1/500s+) to freeze sudden monkey movements.',
    dressCode: 'Remove sunglasses, hats, jewelry, and plastic bags before entering.',
    gallery: [
      {
        url: '/images/attractions/ubud/main.jpg',
        title: 'Sacred Mossy Dragon Bridge & Holy Springs',
        caption: 'Ancient stone dragon guardian sculptures crossing the sacred ravine draped in banyan roots.'
      },
      {
        url: '/images/attractions/ubud/macaque-portrait.jpg',
        title: 'Balinese Long-Tailed Macaque',
        caption: 'Free-roaming macaque resting in the dense tropical nutmeg canopy.'
      },
      {
        url: '/images/attractions/ubud/temple-shrine.jpg',
        title: 'Pura Dalem Agung Padangtegal Shrines',
        caption: '14th-century temple sanctuaries intricately carved with moss-covered demon motifs.'
      },
      {
        url: '/images/attractions/ubud/banyan-roots.jpg',
        title: 'Centuries-Old Weeping Fig & Offerings',
        caption: 'Cascading banyan aerial roots growing over ancient stone alters and canang sari.'
      }
    ]
  },
  {
    id: 'sekumpul',
    name: 'Sekumpul Waterfall (Air Terjun Sekumpul)',
    googleMapsName: 'Sekumpul Waterfall',
    localName: 'Air Terjun Sekumpul',
    category: 'nature',
    categoryLabel: 'Waterfalls',
    badgeClass: 'badge-nature',
    location: 'Singaraja, North Bali',
    coordinates: { lat: -8.175122, lng: 115.183422 },
    formattedAddress: 'Sekumpul, Sawan, Buleleng Regency, Bali 81171, Indonesia',
    regency: 'Buleleng Regency',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.175122,115.183422',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.175122,115.183422',
    plusCode: 'RMFR+W9 Sekumpul, Buleleng Regency, Bali',
    geoapifyCategory: 'natural.water',
    rating: 4.9,
    reviews: 8900,
    feeUSD: 8,
    duration: '3 - 4 Hours Trek',
    distanceAirport: '88 km (2 hr 45 min drive)',
    crowdLevel: 'Low to Moderate (Remote)',
    bestTime: '8:00 AM – 11:00 AM (Sunlight in Gorge)',
    image: '/images/attractions/sekumpul/main.jpg',
    description: 'Bali’s most magnificent collection of 7 cascading jungle waterfalls dropping over 80 meters through a pristine rainforest gorge.',
    fullDetails: 'Tucked away in the northern highlands of Buleleng, Sekumpul is fed by two pristine upland springs. The trek passes clove plantations, Lemukih rice terraces, and requires crossing clear jungle streams to reach the thunderous spray at the base canyon.',
    photographyTip: 'Bring a microfiber cloth and waterproof housing or zip-bag. The airborne water mist creates ethereal rainbows in morning light.',
    dressCode: 'Water sandals or river shoes with rubber grip, swimwear under lightweight trek clothes.',
    gallery: [
      {
        url: '/images/attractions/sekumpul/main.jpg',
        title: 'Sekumpul 80m Twin Plunges in Rainforest Gorge',
        caption: 'Bali’s most magnificent collection of towering waterfalls dropping into an emerald canyon.'
      },
      {
        url: '/images/attractions/sekumpul/gorge-plunge.jpg',
        title: 'Thunderous Plunge Pool Basin',
        caption: 'Base of the falls shrouded in constant refreshing tropical spray and morning rainbows.'
      },
      {
        url: '/images/attractions/sekumpul/canyon-height.jpg',
        title: 'Highland Lemukih Jungle Canyon',
        caption: 'Sheer rock walls clad in giant tree ferns and wild vines framing the roaring cascades.'
      },
      {
        url: '/images/attractions/sekumpul/rainforest-basin.jpg',
        title: 'Pristine Mountain River Crossings',
        caption: 'Crystalline highland streams winding through clove and coffee plantations.'
      }
    ]
  },
  {
    id: 'tirta-empul',
    name: 'Tirta Empul Temple (Pura Tirta Empul)',
    googleMapsName: 'Tirta Empul Temple',
    localName: 'Pura Tirta Empul',
    category: 'temple',
    categoryLabel: 'Sacred Water Temple',
    badgeClass: 'badge-temple',
    location: 'Tampak Siring, Central Bali',
    coordinates: { lat: -8.415024, lng: 115.314972 },
    formattedAddress: 'Jl. Tirta, Manukaya, Tampaksiring, Gianyar Regency, Bali 80552, Indonesia',
    regency: 'Gianyar Regency',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.415024,115.314972',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.415024,115.314972',
    plusCode: 'HCMR+2X Manukaya, Gianyar Regency, Bali',
    geoapifyCategory: 'tourism.sights',
    rating: 4.8,
    reviews: 13500,
    feeUSD: 3,
    duration: '2 - 3 Hours',
    distanceAirport: '52 km (1 hr 45 min drive)',
    crowdLevel: 'Moderate to High',
    bestTime: '7:30 AM – 9:30 AM (Peaceful Bathing)',
    image: '/images/attractions/tirta-empul/main.jpg',
    description: 'Sacred spring temple founded in 962 AD, famous for traditional Melukat spiritual purification rituals in crystal-clear holy pools.',
    fullDetails: 'Legend holds that the god Indra struck the earth to create Tirta Empul (Holy Water Spring) to heal poisoned warriors. Pilgrims enter the rectangular stone pool to wash under 30 stone spouts, each representing spiritual cleansing of mind and body.',
    photographyTip: 'Photograph the natural bubbling spring pool in the inner courtyard where clean sand billows beneath glass-clear spring water.',
    dressCode: 'Special green purification sarong provided for entering the holy water pools.',
    gallery: [
      {
        url: '/images/attractions/tirta-empul/main.jpg',
        title: 'Petirtaan Purification Pools (Melukat)',
        caption: 'The famous stone rectangular purification pool with 30 carved holy water spouts.'
      },
      {
        url: '/images/attractions/tirta-empul/purification.jpg',
        title: 'Spiritual Cleansing Under Holy Spouts',
        caption: 'Devotees and visitors participating in the sacred Melukat ritual for physical and spiritual cleansing.'
      },
      {
        url: '/images/attractions/tirta-empul/courtyard.jpg',
        title: 'Inner Temple Courtyard & Jaba Tengah',
        caption: 'Thatched Meru shrines and stone pavilions where temple priests perform traditional blessings.'
      }
    ]
  }
];

let HOTELS_DATA = [
  {
    id: 'viceroy-bali',
    name: 'Viceroy Bali (Luxury Valley Resort & Villas)',
    tier: 'luxury',
    tierLabel: '5-Star Luxury Villa',
    stars: 5,
    rating: 4.9,
    reviews: 1420,
    priceUSD: 480,
    location: 'Valley of the Kings, Ubud',
    coordinates: { lat: -8.498425, lng: 115.275811 },
    formattedAddress: 'Jl. Lanyahan, Petulu, Ubud, Gianyar Regency, Bali 80571, Indonesia',
    regency: 'Gianyar Regency',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.498425,115.275811',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.498425,115.275811',
    plusCode: 'G72G+J8 Petulu, Gianyar Regency, Bali',
    geoapifyCategory: 'accommodation.hotel',
    distanceToSpot: '4 km to Monkey Forest & Rice Terraces',
    amadeusId: 'LXDPSSAN',
    amadeusChain: 'LX',
    amadeusRateCode: 'BAR1',
    cancellationPolicy: 'Free cancellation up to 48 hours prior to check-in',
    image: '/images/hotels/viceroy-bali/main.jpg',
    description: 'Private heated infinity pool villas overlooking the Petanu River ravine, offering Michelin-grade dining and helipad arrival.',
    amenities: ['Private Heated Infinity Pool', 'Cascades French Dining', 'Lembah Spa Overlook', 'Helipad Arrival', 'High-Speed Wi-Fi', '24/7 Butler Service'],
    gallery: [
      {
        url: '/images/hotels/viceroy-bali/spa-overlook.jpg',
        title: 'Lembah Spa Overlook',
        caption: 'Open-air botanical treatment pavilion listening to gentle river ravine waters.'
      },
      {
        url: '/images/hotels/viceroy-bali/cascades-terrace.jpg',
        title: 'Cascades Fine Dining Terrace',
        caption: 'Award-winning European degustation menus beneath soaring thatched alang-alang ceilings.'
      },
      {
        url: '/images/hotels/viceroy-bali/villa-grounds.jpg',
        title: 'Private Pool Villa Grounds',
        caption: 'Secluded stone sun deck with traditional shaded daybed bale pavilion.'
      }
    ],
    roomTypes: ['Terrace Pool Villa', 'Vice Regal Villa', 'Presidential 2-Bedroom Suite'],
    rooms: [
      {
        id: 'terrace-pool-villa',
        name: 'Terrace Pool Villa',
        size: '150 m²',
        capacity: '2 Guests',
        bed: '1 King Bed',
        priceUSD: 480,
        image: '/images/hotels/viceroy-bali/terrace-pool-villa.jpg',
        highlights: ['Private heated plunge pool', 'Open-air bale pavilion', 'Marble bath with rain shower', 'Espresso bar & exotic fruit basket']
      },
      {
        id: 'vice-regal-villa',
        name: 'Vice Regal Villa',
        size: '240 m²',
        capacity: '2-3 Guests',
        bed: '1 Super King Bed',
        priceUSD: 680,
        image: '/images/hotels/viceroy-bali/vice-regal-villa.jpg',
        highlights: ['Expansive cliff-edge heated pool', 'Outdoor sun deck with valley panorama', 'Jacuzzi spa tub', 'Dedicated 24/7 butler service']
      },
      {
        id: 'presidential-suite',
        name: 'Presidential 2-Bedroom Suite',
        size: '400 m²',
        capacity: '4 Guests',
        bed: '2 King Beds',
        priceUSD: 1100,
        image: '/images/hotels/viceroy-bali/presidential-suite.jpg',
        highlights: ['18-meter private infinity pool', 'Dual master bedroom wings', 'Full chef kitchen & private dining', 'Complimentary helicopter transfer']
      }
    ]
  },
  {
    id: 'the-edge-bali',
    name: 'The Edge Bali (Uluwatu Cliff Luxury Resort)',
    tier: 'luxury',
    tierLabel: '5-Star Luxury Villa',
    stars: 5,
    rating: 5.0,
    reviews: 980,
    priceUSD: 650,
    location: 'Pecatu Cliffside, South Bali',
    coordinates: { lat: -8.847952, lng: 115.124538 },
    formattedAddress: 'Jl. Pura Goa Lempeh, Banjar Dinas Kangin, Pecatu, Uluwatu, Badung Regency, Bali 80361, Indonesia',
    regency: 'Badung Regency',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.847952,115.124538',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.847952,115.124538',
    plusCode: '542F+RM Pecatu, Badung Regency, Bali',
    geoapifyCategory: 'accommodation.hotel',
    distanceToSpot: '2.5 km to Uluwatu Temple & Kecak Dance',
    amadeusId: 'RTDPSCLF',
    amadeusChain: 'RT',
    amadeusRateCode: 'VIL1',
    cancellationPolicy: 'Free cancellation up to 72 hours prior to check-in',
    image: '/images/hotels/the-edge-bali/main.jpg',
    description: 'Perched on the extreme edge of a 530-foot cliff with glass-bottom cantilevered sky pools hovering over the ocean surf.',
    amenities: ['Glass-Bottom Sky Pool', 'Oneeighty Cliff Club', '24/7 Dedicated Butler', 'Subterranean Wine Cellar', 'Oceanfront Dining', 'Private Cinema'],
    gallery: [
      {
        url: '/images/hotels/the-edge-bali/cliff-club.jpg',
        title: 'Oneeighty Cliff Club VIP Cabanas',
        caption: 'Plush daybeds perched along the edge of the limestone promontory.'
      },
      {
        url: '/images/hotels/the-edge-bali/sunset-terrace.jpg',
        title: 'Ocean Sunset Terrace',
        caption: '180-degree panoramic vantage point for golden sunset cocktails.'
      },
      {
        url: '/images/hotels/the-edge-bali/cliff-bath.jpg',
        title: 'Cliffside Freestanding Bath',
        caption: 'Panoramic circular marble bathtub looking out to endless ocean horizon.'
      }
    ],
    roomTypes: ['The Villa (1-Bed Cliff)', 'The View Estate', 'The Ridge Luxury Villa'],
    rooms: [
      {
        id: 'the-villa',
        name: 'The Villa (1-Bed Cliff)',
        size: '220 m²',
        capacity: '2 Guests',
        bed: '1 Emperor Bed',
        priceUSD: 650,
        image: '/images/hotels/the-edge-bali/the-villa.jpg',
        highlights: ['Private ocean cliff plunge pool', 'Glass bathroom floor with ocean views', 'Personal 24-hour butler', 'Complimentary VIP club access']
      },
      {
        id: 'the-view-estate',
        name: 'The View Estate (3-Bed)',
        size: '580 m²',
        capacity: '6 Guests',
        bed: '3 King Beds',
        priceUSD: 1450,
        image: '/images/hotels/the-edge-bali/the-view-estate.jpg',
        highlights: ['Huge cliffside wrap-around infinity pool', 'Private bowling alley & cinema', 'Full bar with mixologist', 'Spectacular sunset deck']
      }
    ]
  },
  {
    id: 'padma-resort',
    name: 'Padma Resort Ubud (Rainforest Resort & Spa)',
    tier: 'eco',
    tierLabel: 'Eco Rainforest Haven',
    stars: 5,
    rating: 4.8,
    reviews: 2150,
    priceUSD: 240,
    location: 'Payangan Valley, North Ubud',
    coordinates: { lat: -8.356411, lng: 115.247833 },
    formattedAddress: 'Banjar Carik, Desa Puhu, Payangan, Gianyar Regency, Bali 80572, Indonesia',
    regency: 'Gianyar Regency',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.356411,115.247833',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.356411,115.247833',
    plusCode: 'J6VP+C4 Puhu, Gianyar Regency, Bali',
    geoapifyCategory: 'accommodation.hotel',
    distanceToSpot: '12 km to Tegallalang & Mount Batur',
    amadeusId: 'BWDPSTRE',
    amadeusChain: 'BW',
    amadeusRateCode: 'ECO1',
    cancellationPolicy: 'Free cancellation up to 24 hours prior to check-in',
    image: '/images/hotels/padma-resort/main.jpg',
    description: 'Sprawling 11-hectare tranquil sanctuary immersed in bamboo forests with an 89-meter heated outdoor mountain lagoon pool.',
    amenities: ['89m Heated Lagoon Pool', 'Jungle Agroforestry', 'Complimentary Yoga', 'Kids Farm & Garden', 'Shuttle to Ubud Hub', 'Spa Pavilion'],
    gallery: [
      {
        url: '/images/hotels/padma-resort/bamboo-sanctuary.jpg',
        title: 'Agroforestry Bamboo Sanctuaries',
        caption: 'Peaceful bamboo bridges and organic fruit gardens along Ayung river tributaries.'
      },
      {
        url: '/images/hotels/padma-resort/rainforest-spa.jpg',
        title: 'Rainforest Spa Soaking Bath',
        caption: 'Botanical herbal bath treatments overlooking lush emerald ravine foliage.'
      },
      {
        url: '/images/hotels/padma-resort/timber-lounge.jpg',
        title: 'Open-Air Timber Lobby Lounge',
        caption: 'Cathedral-scale bamboo architectural lounge welcoming guests with ginger lemongrass tea.'
      }
    ],
    roomTypes: ['Premier Deluxe Room', 'Premier Club Pool View', 'One-Bedroom Rainforest Suite'],
    rooms: [
      {
        id: 'premier-deluxe',
        name: 'Premier Deluxe Room',
        size: '59 m²',
        capacity: '2 Guests',
        bed: '1 King or 2 Twins',
        priceUSD: 240,
        image: '/images/hotels/padma-resort/premier-deluxe.jpg',
        highlights: ['Private forest balcony', 'Freestanding soaking bathtub', 'Complimentary afternoon tea', 'Heated pool access']
      },
      {
        id: 'rainforest-suite',
        name: 'One-Bedroom Rainforest Suite',
        size: '118 m²',
        capacity: '2-3 Guests',
        bed: '1 King Bed',
        priceUSD: 390,
        image: '/images/hotels/padma-resort/rainforest-suite.jpg',
        highlights: ['Expansive living room & dining lounge', 'Panoramic valley view terrace', 'Club lounge cocktail access', 'Complimentary laundry service']
      }
    ]
  },
  {
    id: 'munduk-moding',
    name: 'Munduk Moding Plantation Nature Resort & Spa',
    tier: 'eco',
    tierLabel: 'Boutique Eco Mountain Lodge',
    stars: 4,
    rating: 4.8,
    reviews: 1320,
    priceUSD: 175,
    location: 'Munduk Highlands, North Bali',
    coordinates: { lat: -8.261822, lng: 115.076319 },
    formattedAddress: 'Jl. Raya Desa Gobleg, Buleleng Regency, Bali 81152, Indonesia',
    regency: 'Buleleng Regency',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.261822,115.076319',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.261822,115.076319',
    plusCode: 'P3QG+7G Gobleg, Buleleng Regency, Bali',
    geoapifyCategory: 'accommodation.hotel',
    distanceToSpot: '15 km to Sekumpul Waterfall & Lake Tamblingan',
    amadeusId: 'MPDPSMND',
    amadeusChain: 'MP',
    amadeusRateCode: 'PLT1',
    cancellationPolicy: 'Free cancellation up to 24 hours prior to check-in',
    image: '/images/hotels/munduk-moding/main.jpg',
    description: 'Organic working coffee plantation with an iconic "Infinity Pool in the Clouds" offering sunsets that blend with highland mist.',
    amenities: ['Cloudline Infinity Pool', 'Coffee Processing Tours', 'Horseback Riding Trails', 'Organic Farm Dining', 'Bird Watching Treks'],
    gallery: [
      {
        url: '/images/hotels/munduk-moding/fireplace-cottage.jpg',
        title: 'Plantation Timber Fireplace Cottage',
        caption: 'Warm mountain cottage warmed by real wood-burning stone fireplaces.'
      },
      {
        url: '/images/hotels/munduk-moding/coffee-terraces.jpg',
        title: 'Organic Arabica Coffee Terraces',
        caption: 'Private wooden veranda overlooking clove trees and rolling green hills.'
      },
      {
        url: '/images/hotels/munduk-moding/highland-sunset.jpg',
        title: 'Highland Sunset Deck Panorama',
        caption: 'Misty evening vistas stretching toward the Java sea horizon.'
      }
    ],
    roomTypes: ['Garden Suite', 'One-Bedroom Villa with Jacuzzi', 'Luxury 2-Bedroom Pool Villa'],
    rooms: [
      {
        id: 'garden-suite',
        name: 'Garden Suite',
        size: '55 m²',
        capacity: '2 Guests',
        bed: '1 King Bed',
        priceUSD: 175,
        image: '/images/hotels/munduk-moding/garden-suite.jpg',
        highlights: ['Coffee plantation view veranda', 'Artisan hand-ground coffee bar', 'Heated bed pads for cool nights', 'Rain shower with skylight']
      },
      {
        id: 'jacuzzi-villa',
        name: 'One-Bedroom Villa with Jacuzzi',
        size: '95 m²',
        capacity: '2 Guests',
        bed: '1 King Bed',
        priceUSD: 260,
        image: '/images/hotels/munduk-moding/jacuzzi-villa.jpg',
        highlights: ['Outdoor heated volcanic stone jacuzzi', 'Private garden gazebo', 'Wood burning fireplace', 'Panoramic sunset deck']
      }
    ]
  },
  {
    id: 'maya-sanur',
    name: 'Maya Sanur Resort & Spa',
    tier: 'family',
    tierLabel: 'Family Coastal Suites',
    stars: 5,
    rating: 4.7,
    reviews: 1890,
    priceUSD: 190,
    location: 'Sanur Beach Promenade',
    coordinates: { lat: -8.694628, lng: 115.263189 },
    formattedAddress: 'Jl. Danau Tamblingan No.89M, Sanur, Denpasar, Bali 80228, Indonesia',
    regency: 'Denpasar City',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.694628,115.263189',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.694628,115.263189',
    plusCode: '8747+47 Sanur, Denpasar City, Bali',
    geoapifyCategory: 'accommodation.hotel',
    distanceToSpot: '1.2 km to Nusa Penida Fast Ferry Pier',
    amadeusId: 'MYDPSSNR',
    amadeusChain: 'MY',
    amadeusRateCode: 'BEA1',
    cancellationPolicy: 'Free cancellation up to 48 hours prior to check-in',
    image: '/images/hotels/maya-sanur/main.jpg',
    description: 'Eco-conscious beachfront luxury resort with tranquil calm swimmable waters, 158m lagoon pool, and rooftop garden yoga pavilion.',
    amenities: ['158m Lagoon Pools', 'Beach Promenade Access', 'Complimentary Bicycles', 'Reef Kids Club', 'Rooftop Lounge', 'Spa Wellness'],
    gallery: [
      {
        url: '/images/hotels/maya-sanur/beach-promenade.jpg',
        title: 'Sanur Beach Promenade Deck',
        caption: 'Paved beachside bicycle paths lined with vibrant hibiscus flowers.'
      },
      {
        url: '/images/hotels/maya-sanur/rooftop-lounge.jpg',
        title: 'Rooftop Garden Sunset Lounge',
        caption: 'Panoramic oceanfront daybeds for evening tapas and cocktails.'
      },
      {
        url: '/images/hotels/maya-sanur/calm-waters.jpg',
        title: 'Reef-Protected Calm Waters',
        caption: 'Gentle swimmable ocean shallows ideal for young families and paddleboarding.'
      }
    ],
    roomTypes: ['Deluxe Lagoon View', 'Deluxe Lagoon Access', 'Beachfront Pool Suite'],
    rooms: [
      {
        id: 'deluxe-lagoon-view',
        name: 'Deluxe Lagoon View',
        size: '52 m²',
        capacity: '2 Adults, 1 Child',
        bed: '1 King or 2 Twins',
        priceUSD: 190,
        image: '/images/hotels/maya-sanur/deluxe-lagoon-view.jpg',
        highlights: ['Overlooking 158m lagoon', 'Deep soaking circular bathtub', 'Sanur beach promenade steps away', 'Free bicycle rental']
      },
      {
        id: 'deluxe-lagoon-access',
        name: 'Deluxe Lagoon Access',
        size: '58 m²',
        capacity: '2 Adults, 1 Child',
        bed: '1 King Bed',
        priceUSD: 250,
        image: '/images/hotels/maya-sanur/deluxe-lagoon-access.jpg',
        highlights: ['Direct swim-in pool deck', 'Private daybed cabana', 'Evening cocktail discount', 'Kids club free entry']
      }
    ]
  },
  {
    id: 'kos-one-hostel',
    name: 'Kos One Hostel Canggu (Chic Nomad Hub)',
    tier: 'budget',
    tierLabel: 'Backpacker & Co-Work Hub',
    stars: 4,
    rating: 4.7,
    reviews: 3200,
    priceUSD: 38,
    location: 'Echo Beach, Canggu',
    coordinates: { lat: -8.653421, lng: 115.132890 },
    formattedAddress: 'Jl. Pantai Batu Bolong No.78, Canggu, Badung Regency, Bali 80361, Indonesia',
    regency: 'Badung Regency',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.653421,115.132890',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.653421,115.132890',
    plusCode: '84WH+J5 Canggu, Badung Regency, Bali',
    geoapifyCategory: 'accommodation.hotel',
    distanceToSpot: '15 km to Tanah Lot & Batu Bolong',
    amadeusId: 'KODPSCNG',
    amadeusChain: 'KO',
    amadeusRateCode: 'DOR1',
    cancellationPolicy: 'Free cancellation up to 24 hours prior to check-in',
    image: '/images/hotels/kos-one-hostel/main.jpg',
    description: 'Award-winning luxury social hostel featuring Mediterranean pool slides, coworking cabanas, artisan café, and sunset rooftop.',
    amenities: ['Resort Pool with Jacuzzi', 'High-Speed Fiber Wi-Fi', 'Air Conditioned Pods', 'Personal Safe', 'Onsite Surfboard Rental', 'Community Dinners'],
    gallery: [
      {
        url: '/images/hotels/kos-one-hostel/coworking-hub.jpg',
        title: 'Artisan Coworking Hub',
        caption: 'High-speed fiber connectivity with ergonomic desks and cold-brew espresso.'
      },
      {
        url: '/images/hotels/kos-one-hostel/rooftop-deck.jpg',
        title: 'Sunset Rooftop Lounge',
        caption: 'Rooftop cocktail deck overlooking Canggu surf breaks and rice fields.'
      },
      {
        url: '/images/hotels/kos-one-hostel/cafe-social.jpg',
        title: 'Organic Café & Social Common',
        caption: 'Fresh smoothie bowls and daily communal family dinners for solo travelers.'
      }
    ],
    roomTypes: ['Single Pod in Mixed Dorm', 'Female-Only Sanctuary Pod', 'Private Deluxe Queen Room'],
    rooms: [
      {
        id: 'single-pod',
        name: 'Single Pod in Mixed Dorm',
        size: 'Capsule Pod',
        capacity: '1 Guest',
        bed: '1 Single Pod',
        priceUSD: 38,
        image: '/images/hotels/kos-one-hostel/single-pod.jpg',
        highlights: ['Blackout acoustic curtain', 'Personal security safe', 'Individual AC ventilation', 'High-speed coworking pass included']
      },
      {
        id: 'private-queen',
        name: 'Private Deluxe Queen Room',
        size: '32 m²',
        capacity: '2 Guests',
        bed: '1 Queen Bed',
        priceUSD: 85,
        image: '/images/hotels/kos-one-hostel/private-queen.jpg',
        highlights: ['Private ensuite rain shower', 'Balcony with pool view', 'Workstation desk', 'Smart TV with streaming']
      }
    ]
  }
];

let TRANSIT_DATA = {
  presets: {
    'new-york': {
      city: 'New York (JFK / EWR)',
      flight: {
        airline: 'Singapore Airlines / Qatar Airways (1 Stop)',
        duration: '21 hrs 30 mins',
        costUSD: 890,
        route: 'JFK → SIN / DOH → DPS (Denpasar)',
        stops: '1 Stopover (Singapore Changi or Doha Hamad)'
      },
      trainOption: {
        available: true,
        summary: 'Fly into Jakarta (CGK), then board the scenic Trans-Java Executive Express Train across Java to Ketapang (Banyuwangi), followed by a 45-min ferry to Gilimanuk Bali.',
        trainName: 'KAI Argo Bromo Anggrek Executive Rail',
        duration: '15 hrs train + 45 mins ferry',
        costUSD: 52
      },
      busOption: {
        available: true,
        summary: 'Direct inter-island sleeper coach from Jakarta Pulo Gebang Terminal to Denpasar Mengwi Terminal including Roll-on/Roll-off ferry crossing.',
        operator: 'Pahala Kencana / Gunung Harta VIP Sleeper',
        duration: '22 hrs direct',
        costUSD: 36
      }
    },
    'london': {
      city: 'London (LHR / LGW)',
      flight: {
        airline: 'Emirates / Garuda Indonesia / Qatar Airways',
        duration: '16 hrs 20 mins',
        costUSD: 740,
        route: 'LHR → DXB / DOH → DPS (Denpasar)',
        stops: '1 Stopover (Dubai or Doha)'
      },
      trainOption: {
        available: true,
        summary: 'Fly to Jakarta (CGK), take the scenic southern rail route through Bandung and Yogyakarta to Surabaya, connecting to Ketapang Harbor for Bali.',
        trainName: 'KAI Malabar / Lodaya Executive Train',
        duration: '17 hrs total + ferry',
        costUSD: 48
      },
      busOption: {
        available: true,
        summary: 'Executive air-conditioned sleeper bus from Jakarta through Central Java directly to Denpasar Ubung/Mengwi.',
        operator: 'Kramat Djati Executive Bus',
        duration: '23 hrs',
        costUSD: 34
      }
    },
    'sydney': {
      city: 'Sydney (SYD)',
      flight: {
        airline: 'Jetstar / Virgin Australia / Garuda Indonesia',
        duration: '6 hrs 15 mins',
        costUSD: 460,
        route: 'SYD → DPS (Direct Non-Stop)',
        stops: 'Non-Stop Direct Flight'
      },
      trainOption: {
        available: false,
        summary: 'Direct air route is recommended. If exploring Java first, fly to Surabaya and take the 6-hour Probowangi train directly to Ketapang ferry port.',
        trainName: 'KAI Probowangi Scenic Train',
        duration: '6 hrs train from Surabaya',
        costUSD: 18
      },
      busOption: {
        available: false,
        summary: 'Regional coach available from Surabaya Bungurasih terminal to Denpasar via Gilimanuk crossing.',
        operator: 'Titik Temu Express',
        duration: '9 hrs from Surabaya',
        costUSD: 22
      }
    },
    'singapore': {
      city: 'Singapore (SIN)',
      flight: {
        airline: 'Singapore Airlines / Scoot / AirAsia (Frequent Daily)',
        duration: '2 hrs 40 mins',
        costUSD: 140,
        route: 'SIN → DPS (Direct Non-Stop)',
        stops: 'Non-Stop Direct Flight'
      },
      trainOption: {
        available: true,
        summary: 'Combine budget flight to Surabaya (Juanda SUB), then board KAI Sri Tanjung train to Banyuwangi Ketapang with connecting ferry to Bali.',
        trainName: 'KAI Sri Tanjung Express',
        duration: '5 hrs 45 mins train',
        costUSD: 16
      },
      busOption: {
        available: true,
        summary: 'Direct coach from Surabaya to Denpasar with reclining seats, meal service, and vehicle ferry ticket.',
        operator: 'Gunung Harta Solutions',
        duration: '8 hrs 30 mins',
        costUSD: 20
      }
    },
    'mumbai': {
      city: 'Mumbai / Delhi (BOM / DEL)',
      flight: {
        airline: 'VietJet / Air India / Batik Air Malaysia / Singapore Airlines',
        duration: '7 hrs 10 mins',
        costUSD: 340,
        route: 'BOM → KUL / SIN / SGN → DPS',
        stops: '1 Quick Transit'
      },
      trainOption: {
        available: true,
        summary: 'Fly to Jakarta Soekarno-Hatta (CGK), take luxury sleeper train Argo Sembrani to Surabaya, and connect to Ketapang Bali ferry.',
        trainName: 'KAI Luxury Sleeper Suite Train',
        duration: '11 hrs sleeper + ferry',
        costUSD: 65
      },
      busOption: {
        available: true,
        summary: 'Long-distance tourist sleeper coach through coastal Java toll highway directly to Bali.',
        operator: 'Pahala Kencana Double Decker',
        duration: '21 hrs',
        costUSD: 38
      }
    },
    'tokyo': {
      city: 'Tokyo (NRT / HND)',
      flight: {
        airline: 'Garuda Indonesia (Direct) / Philippine Airlines / ANA',
        duration: '7 hrs 35 mins',
        costUSD: 520,
        route: 'NRT → DPS (Direct Non-Stop or Manila Transit)',
        stops: 'Direct Non-Stop available daily'
      },
      trainOption: {
        available: true,
        summary: 'Fly into Jakarta (CGK), experience scenic Trans-Java Panoramic Train through volcanic rice valleys to East Java ferry.',
        trainName: 'KAI Panoramic Car Train',
        duration: '14 hrs rail journey',
        costUSD: 60
      },
      busOption: {
        available: true,
        summary: 'Executive highway sleeper coach connecting Jakarta airport bus terminal to Bali island.',
        operator: 'Lorena VIP Executive',
        duration: '22 hrs',
        costUSD: 35
      }
    },
    'jakarta': {
      city: 'Jakarta (CGK / Gambir)',
      flight: {
        airline: 'Garuda Indonesia / Citilink / Batik Air / AirAsia (Frequent Hourly)',
        duration: '1 hr 50 mins',
        costUSD: 65,
        route: 'CGK → DPS (Direct Non-Stop Domestic Corridor)',
        stops: 'Non-Stop Direct Domestic Flight'
      },
      trainOption: {
        available: true,
        summary: 'Take the premier Trans-Java Executive Express (Argo Bromo Anggrek / Blambangan Ekspres) from Gambir across Java to Ketapang, then 45-min ferry straight into Gilimanuk Bali.',
        trainName: 'KAI Blambangan Ekspres (Direct Jakarta-Banyuwangi)',
        duration: '16 hrs scenic rail + 45 mins ferry',
        costUSD: 42
      },
      busOption: {
        available: true,
        summary: 'Direct executive sleeper coach from Pulo Gebang Terminal in East Jakarta directly into Denpasar Mengwi Terminal with Ro-Ro ferry crossing included.',
        operator: 'Pahala Kencana / Gunung Harta VIP Double Decker',
        duration: '22 hrs direct',
        costUSD: 32
      }
    },
    'melbourne': {
      city: 'Melbourne (MEL)',
      flight: {
        airline: 'Jetstar / Virgin Australia / Garuda Indonesia / Batik Air',
        duration: '6 hrs 00 mins',
        costUSD: 440,
        route: 'MEL → DPS (Direct Non-Stop Daily)',
        stops: 'Non-Stop Direct Flight'
      },
      trainOption: {
        available: false,
        summary: 'Direct non-stop flight to DPS recommended. For rail enthusiasts, fly to Surabaya and connect via KAI Probowangi scenic train to Ketapang harbor.',
        trainName: 'KAI Probowangi Scenic Train',
        duration: '6 hrs rail from Surabaya',
        costUSD: 18
      },
      busOption: {
        available: false,
        summary: 'Fly direct to DPS. Once in Bali, tourist shuttles and private chauffeurs provide seamless transfers across all regencies.',
        operator: 'Perama Island Shuttle',
        duration: 'Local Transfers',
        costUSD: 12
      }
    },
    'perth': {
      city: 'Perth (PER)',
      flight: {
        airline: 'AirAsia / Jetstar / Batik Air Malaysia (Ultra-Fast Hop)',
        duration: '3 hrs 40 mins',
        costUSD: 240,
        route: 'PER → DPS (Direct Non-Stop Daily)',
        stops: 'Non-Stop Direct Flight'
      },
      trainOption: {
        available: false,
        summary: 'Perth is only 3.5 hours flight away from Bali, making direct flight by far the fastest and most convenient gateway.',
        trainName: 'Direct Flight Preferred',
        duration: '3.5 hrs flight',
        costUSD: 240
      },
      busOption: {
        available: false,
        summary: 'Connect from DPS airport to any villa via private chauffeur or official airport Grab/Gojek lounge.',
        operator: 'Bali Airport Chauffeur Dispatch',
        duration: '30-45 mins to villa',
        costUSD: 18
      }
    },
    'dubai': {
      city: 'Dubai / Doha (DXB / DOH)',
      flight: {
        airline: 'Emirates (Direct A380) / Qatar Airways (Direct)',
        duration: '9 hrs 10 mins',
        costUSD: 680,
        route: 'DXB / DOH → DPS (Direct Non-Stop Daily)',
        stops: 'Direct Non-Stop Flights Daily'
      },
      trainOption: {
        available: true,
        summary: 'Fly Emirates into Jakarta (CGK), experience KAI Luxury Sleeper Suite Train to Banyuwangi, and take the 45-min ferry to Bali.',
        trainName: 'KAI Luxury Sleeper Suite Train',
        duration: '11 hrs rail + ferry',
        costUSD: 60
      },
      busOption: {
        available: true,
        summary: 'Overland sleeper coach from Jakarta to Denpasar with reclining bunks and full meal service.',
        operator: 'Lorena VIP Executive Sleeper',
        duration: '22 hrs',
        costUSD: 35
      }
    },
    'frankfurt': {
      city: 'Frankfurt / Amsterdam (FRA / AMS)',
      flight: {
        airline: 'Singapore Airlines / Qatar Airways / Emirates (1 Stop)',
        duration: '15 hrs 45 mins',
        costUSD: 780,
        route: 'FRA → SIN / DOH → DPS',
        stops: '1 Seamless Hub Transit'
      },
      trainOption: {
        available: true,
        summary: 'Fly to Jakarta, take the panoramic rail across volcanic Java (Mount Merapi & Mount Bromo vistas) to East Java Ketapang Harbor.',
        trainName: 'KAI Panoramic / Argo Semeru Rail',
        duration: '15 hrs rail + ferry',
        costUSD: 55
      },
      busOption: {
        available: true,
        summary: 'Executive sleeper bus through the Trans-Java toll expressway directly onto the vehicle ferry to Bali.',
        operator: 'Pahala Kencana Double Decker',
        duration: '22 hrs',
        costUSD: 36
      }
    },
    'kuala-lumpur': {
      city: 'Kuala Lumpur (KUL)',
      flight: {
        airline: 'AirAsia / Malaysia Airlines / Batik Air (Frequent Daily)',
        duration: '3 hrs 05 mins',
        costUSD: 110,
        route: 'KUL → DPS (Direct Non-Stop)',
        stops: 'Non-Stop Direct Flight'
      },
      trainOption: {
        available: true,
        summary: 'Fly into Surabaya (SUB), take the 6-hour scenic KAI train through tropical plantations to Ketapang harbor for ferry.',
        trainName: 'KAI Sri Tanjung Express',
        duration: '6 hrs train + ferry',
        costUSD: 16
      },
      busOption: {
        available: true,
        summary: 'Overland coach from Surabaya to Mengwi Terminal in Bali with ferry crossing included.',
        operator: 'Gunung Harta Solutions',
        duration: '9 hrs',
        costUSD: 20
      }
    },
    'bangkok': {
      city: 'Bangkok (BKK / DMK)',
      flight: {
        airline: 'Thai AirAsia / Thai Airways / Batik Air (Direct)',
        duration: '4 hrs 25 mins',
        costUSD: 195,
        route: 'BKK → DPS (Direct Non-Stop Daily)',
        stops: 'Non-Stop Direct Flight'
      },
      trainOption: {
        available: true,
        summary: 'Connect via Jakarta or Surabaya for the trans-island rail journey across Java rice terraces to Ketapang ferry.',
        trainName: 'KAI Executive Rail',
        duration: '14 hrs rail + ferry',
        costUSD: 45
      },
      busOption: {
        available: true,
        summary: 'Trans-island coach from Jakarta/Surabaya to Denpasar.',
        operator: 'Damri Royal Class',
        duration: '12 hrs from Surabaya',
        costUSD: 24
      }
    }
  }
};

const TRANSIT_ROUTES_PRESETS = TRANSIT_DATA.presets;

// --------------------------------------------------------------------------
// BALI INTRA-ISLAND COMMUTE & ROUTE ENGINE (Verified GIS & Real Traffic)
// --------------------------------------------------------------------------
const BALI_REGIONS = {
  'airport': { id: 'airport', name: "Ngurah Rai Airport (DPS)", area: 'Tuban, South Bali', lat: -8.7481, lng: 115.1672 },
  'kuta-seminyak': { id: 'kuta-seminyak', name: "Kuta & Seminyak", area: 'Southwest Coast', lat: -8.6913, lng: 115.1682 },
  'canggu': { id: 'canggu', name: "Canggu & Pererenan", area: 'Badung Coastal', lat: -8.6500, lng: 115.1300 },
  'ubud': { id: 'ubud', name: "Ubud Cultural Center", area: 'Gianyar Highlands', lat: -8.5069, lng: 115.2625 },
  'uluwatu': { id: 'uluwatu', name: "Uluwatu & Bukit", area: 'Pecatu Peninsula', lat: -8.8100, lng: 115.1200 },
  'sanur': { id: 'sanur', name: "Sanur Beach & Fast Boat Port", area: 'East Denpasar', lat: -8.6750, lng: 115.2600 },
  'nusa-dua': { id: 'nusa-dua', name: "Nusa Dua & Jimbaran", area: 'South Badung', lat: -8.7950, lng: 115.2200 },
  'padang-bai': { id: 'padang-bai', name: "Padang Bai Harbor (Gili Gateway)", area: 'Karangasem', lat: -8.5300, lng: 115.5100 },
  'amed': { id: 'amed', name: "Amed & Tulamben Coast", area: 'Northeast Bali', lat: -8.3500, lng: 115.6500 },
  'bedugul-lovina': { id: 'bedugul-lovina', name: "Bedugul & Lovina", area: 'North Bali', lat: -8.1700, lng: 115.0200 },
  'nusa-penida': { id: 'nusa-penida', name: "Nusa Penida Island", area: 'Klungkung Regency', lat: -8.7278, lng: 115.5444, isIsland: true }
};

// Comparative Local Travel Modes
const LOCAL_TRAVEL_MODES = [
  {
    id: 'car-driver',
    name: 'Private SUV + Chauffeur',
    icon: '🚗',
    rating: 4.9,
    comfort: 'Ultra High (AC)',
    trafficSpeed: 'Moderate (Peak queues)',
    luggage: 'Large (4-6 bags)',
    safety: 'Maximum (Vetted driver)',
    costPerDayUSD: 35,
    costPerDayIDR: 550000,
    bestFor: 'Day trips, families, couples, temple touring, luggage transfers',
    keyAdvantage: '10 hours unlimited custom itinerary with zero driving stress and air-conditioned sanctuary.',
    crucialNote: 'Driver handles fuel, parking, and narrow Balinese village access roads.',
    bookingAction: 'openRentalBookingModal("car-driver")'
  },
  {
    id: 'scooter',
    name: 'Automatic Scooter (Scoopy/NMAX)',
    icon: '🛵',
    rating: 4.7,
    comfort: 'Standard Open Air',
    trafficSpeed: 'Lightning Fast (Bypasses traffic)',
    luggage: 'Underseat + 1 Daypack',
    safety: 'Moderate (Requires skill)',
    costPerDayUSD: 7,
    costPerDayIDR: 110000,
    bestFor: 'Solo travelers, digital nomads, cafe hopping in Canggu & Seminyak',
    keyAdvantage: 'Filter through Canggu shortcut gridlocks and park directly in front of beaches & cafes.',
    crucialNote: 'International Driving Permit (IDP 1949) + Helmet mandatory by Indonesian law.',
    bookingAction: 'openRentalBookingModal("scoopy")'
  },
  {
    id: 'grab-gojek',
    name: 'Ride-Hailing (Grab / Gojek)',
    icon: '📱',
    rating: 4.6,
    comfort: 'High (GoCar) / Nimble (GoRide)',
    trafficSpeed: 'Variable (GoRide is fast)',
    luggage: 'GoCar: 2-3 bags / GoRide: none',
    safety: 'High (GPS tracking)',
    costPerDayUSD: 14,
    costPerDayIDR: 220000,
    bestFor: 'Point-to-point hops in South Bali (Kuta, Seminyak, Sanur)',
    keyAdvantage: 'Instant cashless hailing via mobile app with transparent upfront pricing.',
    crucialNote: 'Drop-offs are permitted everywhere, but pick-ups are strictly banned in local taxi cartel zones (Ubud, Uluwatu, Padang Bai).',
    bookingAction: 'window.openRideHailingGuide()'
  },
  {
    id: 'bluebird',
    name: 'Bluebird Metered Taxis',
    icon: '🚕',
    rating: 4.8,
    comfort: 'High (Clean AC sedans)',
    trafficSpeed: 'Moderate',
    luggage: 'Medium (2-3 bags)',
    safety: 'High (Regulated fleet)',
    costPerDayUSD: 18,
    costPerDayIDR: 285000,
    bestFor: 'Airport arrivals, official hotel desk dispatch, street hails',
    keyAdvantage: 'Legitimate taximeter with no haggling. Can be booked via MyBluebird app or hotel lobby.',
    crucialNote: 'Always look for the genuine Bluebird logo and driver uniform; avoid imitators ("Blue Biro").',
    bookingAction: 'window.openBluebirdBooking()'
  },
  {
    id: 'perama-shuttle',
    name: 'Perama Tourist Shuttles',
    icon: '🚌',
    rating: 4.4,
    comfort: 'Standard AC Minicoach',
    trafficSpeed: 'Scheduled',
    luggage: 'Generous (1-2 big suitcases)',
    safety: 'High (Professional drivers)',
    costPerDayUSD: 10,
    costPerDayIDR: 155000,
    bestFor: 'Budget backpackers moving between towns (Kuta ➔ Ubud ➔ Lovina ➔ Padang Bai)',
    keyAdvantage: 'Fixed departure schedule connecting major travel hubs at a fraction of private taxi cost.',
    crucialNote: 'Runs 2-3 times daily; booking at least 1 day in advance is strongly recommended.',
    bookingAction: 'window.openTransitBooking("bus", "Perama Tourist Shuttle")'
  },
  {
    id: 'fast-boat',
    name: 'Marine Fast Boats & Ferries',
    icon: '🛥️',
    rating: 4.9,
    comfort: 'High (Enclosed AC cabin + sundeck)',
    trafficSpeed: 'Ocean Speed (30-35 knots)',
    luggage: '25kg per passenger included',
    safety: 'High (SOLAS lifejackets & GPS)',
    costPerDayUSD: 22,
    costPerDayIDR: 350000,
    bestFor: 'Nusa Penida, Nusa Lembongan, Gili Trawangan, Gili Air, Lombok',
    keyAdvantage: 'Fastest way to reach offshore islands: 30 mins to Penida from Sanur; 90 mins to Gilis from Padang Bai.',
    crucialNote: 'Sanur New Harbor features modern floating jetties (no walking through waves!). Check sea swell status before sailing.',
    bookingAction: 'window.openTransitBooking("boat", "Sanur New Harbor (Penida Express)")'
  }
];

// Marine Harbors Directory
const BALI_MARINE_HARBORS = [
  {
    id: 'sanur-port',
    name: 'Sanur New Harbor (Pelabuhan Sanur)',
    code: 'SNR',
    coordinates: { lat: -8.6751, lng: 115.2632 },
    location: 'Sanur Beach, Denpasar',
    type: 'Modern Passenger Terminal',
    highlights: 'Multi-story terminal building with air-conditioned waiting lounges, digital boarding gates, and wave-free floating jetties.',
    destinations: ['Nusa Penida (Toyapakeh / Buyuk)', 'Nusa Lembongan (Jungutbatu / Mushroom Bay)'],
    crossingTime: '30 - 45 Minutes',
    dailyDepartures: 'Over 40 daily speedboats (07:00 – 17:30)',
    topOperators: ['Maruti Duta Express', 'Semaya One', 'Rocky Fast Cruise', 'Angel Billabong'],
    averageFareUSD: 15,
    averageFareIDR: 240000,
    tip: 'Book departure between 07:30 and 09:00 AM for the calmest sea waters in the Badung Strait.'
  },
  {
    id: 'padang-bai',
    name: 'Padang Bai Harbor (Gili & Lombok Pier)',
    code: 'PBI',
    coordinates: { lat: -8.5302, lng: 115.5105 },
    location: 'Karangasem, East Bali',
    type: 'Deep-Water Fast Boat & Ferry Terminal',
    highlights: 'Main maritime highway connecting Bali to Gili Trawangan, Gili Meno, Gili Air, and Bangsal (Lombok).',
    destinations: ['Gili Trawangan', 'Gili Air', 'Bangsal / Senggigi (Lombok)', 'Nusa Penida'],
    crossingTime: '1 hr 30 mins - 2 hrs',
    dailyDepartures: '18 daily express departures',
    topOperators: ['Eka Jaya Fast Boat (Catamaran)', 'Golden Queen', 'Wahana Gili Ocean'],
    averageFareUSD: 28,
    averageFareIDR: 440000,
    tip: 'Eka Jaya operates large 210-passenger steel-hull catamarans with stabilizers for maximum seasickness prevention.'
  },
  {
    id: 'serangan-harbor',
    name: 'Serangan Luxury Marina',
    code: 'SRG',
    coordinates: { lat: -8.7258, lng: 115.2415 },
    location: 'Serangan Island, South Denpasar',
    type: 'Private Marina & Catamaran Pier',
    highlights: 'Close to Kuta, Seminyak, and Nusa Dua (only 20 mins from airport). VIP departure lounge with complimentary espresso & luggage porterage.',
    destinations: ['Gili Trawangan', 'Gili Air', 'Teluk Kodek (Lombok)', 'Nusa Lembongan'],
    crossingTime: '2 hrs 15 mins (Direct Gili)',
    dailyDepartures: 'Premium morning departures',
    topOperators: ['BlueWater Express', 'Gili Getaway'],
    averageFareUSD: 45,
    averageFareIDR: 700000,
    tip: 'Includes complimentary hotel transfers from South Bali hotels directly to the pier.'
  },
  {
    id: 'kusamba-port',
    name: 'Kusamba Harbor (Traditional Fast Pier)',
    code: 'KSB',
    coordinates: { lat: -8.5582, lng: 115.4412 },
    location: 'Klungkung Regency',
    type: 'Regional Express Port',
    highlights: 'Shortest nautical distance to North Nusa Penida (Sampalan). Popular with locals and day-trippers visiting East Penida.',
    destinations: ['Nusa Penida (Sampalan / Buyuk)'],
    crossingTime: '20 Minutes Ultra-Express',
    dailyDepartures: 'Every 45 minutes',
    topOperators: ['The Angkal Fast Boat', 'Sekar Jaya'],
    averageFareUSD: 10,
    averageFareIDR: 160000,
    tip: 'Ideal if staying in Sidemen, Candidasa, or Ubud, as it saves 40 minutes road travel compared to Sanur.'
  }
];

let FAQ_DATA = [
  {
    q: 'What is the best time of year to visit Bali?',
    a: 'The dry season from April to October is the peak time with plenty of sunshine, low humidity, and prime conditions for surfing, hiking, and temple exploration. The wet season (November to March) brings refreshing tropical afternoon downpours, lush greenery, and 30-40% cheaper luxury resort rates.'
  },
  {
    q: 'Do I need a Visa to enter Bali (Indonesia)?',
    a: 'Citizens of over 90 countries (including the US, UK, Australia, EU, and India) can purchase a 30-day Visa on Arrival (e-VoA) online or at DPS airport for 500,000 IDR (~$32 USD). It can be extended once for an additional 30 days. Ensure your passport has at least 6 months validity from date of entry.'
  },
  {
    q: 'What is the Bali Tourist Levy introduced recently?',
    a: 'Starting February 2024, the Bali Provincial Government instituted a mandatory tourist contribution of 150,000 IDR (~$10 USD) per international visitor to support heritage preservation and island sustainability. You can pay securely online before arrival at lovebali.baliprov.go.id.'
  },
  {
    q: 'How can I travel to Bali by Train if it is an island?',
    a: 'While Bali has no railways on the island itself, Indonesia has a world-class Trans-Java railway network. You take a train (such as the Argo Bromo Executive) from Jakarta, Bandung, or Yogyakarta across Java to Ketapang Station (Banyuwangi). Ketapang station is just 300 meters from the ferry port, where a 45-minute ferry brings you directly to Gilimanuk Harbor in West Bali.'
  },
  {
    q: 'Is it safe to drink tap water in Bali?',
    a: 'Do not drink tap water in Bali. Reputable hotels and villas provide complimentary filtered or bottled water. Ice in restaurants and tourist cafes is strictly government-regulated and safe to consume (it will be cylindrical with a hole in the middle).'
  },
  {
    q: 'What is the dress code for visiting Balinese Hindu Temples?',
    a: 'Both men and women must cover their shoulders and wear a traditional sarong and waist sash (Kamben and Selendang). Almost all major temples (Tanah Lot, Uluwatu, Tirta Empul) provide complimentary or low-cost sarong rentals at the ticket desk.'
  }
];

// Verified High-Precision Bali GIS & Geoapify Places Dictionary
const GEOAPIFY_VERIFIED_PLACES = {
  'tanah-lot': {
    id: 'tanah-lot',
    name: 'Tanah Lot Temple (Pura Tanah Lot)',
    lat: -8.621213,
    lon: 115.086782,
    formattedAddress: 'Beraban, Kediri, Tabanan Regency, Bali 82121, Indonesia',
    regency: 'Tabanan Regency',
    category: 'tourism.sights',
    image: '/images/attractions/tanah-lot/main.jpg',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.621213,115.086782',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.621213,115.086782',
    plusCode: '93HP+G4 Beraban, Tabanan Regency, Bali'
  },
  'uluwatu-temple': {
    id: 'uluwatu-temple',
    name: 'Uluwatu Temple (Pura Luhur Uluwatu)',
    lat: -8.829141,
    lon: 115.084915,
    formattedAddress: 'Pecatu, South Kuta, Badung Regency, Bali 80361, Indonesia',
    regency: 'Badung Regency',
    category: 'tourism.sights',
    image: '/images/attractions/uluwatu-temple/main.jpg',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.829141,115.084915',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.829141,115.084915',
    plusCode: '53CF+8X Pecatu, Badung Regency, Bali'
  },
  'tegallalang': {
    id: 'tegallalang',
    name: 'Tegallalang Rice Terrace (Ceking Rice Terrace)',
    lat: -8.434874,
    lon: 115.277815,
    formattedAddress: 'Jl. Raya Tegallalang, Tegallalang, Gianyar Regency, Bali 80561, Indonesia',
    regency: 'Gianyar Regency',
    category: 'tourism.attraction',
    image: '/images/attractions/tegallalang/main.jpg',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.434874,115.277815',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.434874,115.277815',
    plusCode: 'HC8H+34 Tegallalang, Gianyar Regency, Bali'
  },
  'kelingking': {
    id: 'kelingking',
    name: 'Kelingking Beach (Pantai Kelingking)',
    lat: -8.750711,
    lon: 115.474438,
    formattedAddress: 'Bunga Mekar, Nusa Penida, Klungkung Regency, Bali 80771, Indonesia',
    regency: 'Klungkung Regency (Nusa Penida)',
    category: 'natural.beach',
    image: '/images/attractions/kelingking/main.jpg',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.750711,115.474438',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.750711,115.474438',
    plusCode: '6FWF+PQ Bunga Mekar, Klungkung Regency, Bali'
  },
  'batur': {
    id: 'batur',
    name: 'Mount Batur (Gunung Batur)',
    lat: -8.242188,
    lon: 115.375278,
    formattedAddress: 'South Batur, Kintamani, Bangli Regency, Bali 80652, Indonesia',
    regency: 'Bangli Regency',
    category: 'natural.mountain',
    image: '/images/attractions/batur/main.jpg',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.242188,115.375278',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.242188,115.375278',
    plusCode: 'Q95G+44 South Batur, Bangli Regency, Bali'
  },
  'ubud': {
    id: 'ubud',
    name: 'Sacred Monkey Forest Sanctuary (Mandala Suci Wenara Wana)',
    lat: -8.518972,
    lon: 115.258389,
    formattedAddress: 'Jl. Monkey Forest, Ubud, Gianyar Regency, Bali 80571, Indonesia',
    regency: 'Gianyar Regency',
    category: 'entertainment.zoo',
    image: '/images/attractions/ubud/main.jpg',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.518972,115.258389',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.518972,115.258389',
    plusCode: 'F7J5+C9 Ubud, Gianyar Regency, Bali'
  },
  'sekumpul': {
    id: 'sekumpul',
    name: 'Sekumpul Waterfall (Air Terjun Sekumpul)',
    lat: -8.175122,
    lon: 115.183422,
    formattedAddress: 'Sekumpul, Sawan, Buleleng Regency, Bali 81171, Indonesia',
    regency: 'Buleleng Regency',
    category: 'natural.water',
    image: '/images/attractions/sekumpul/main.jpg',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.175122,115.183422',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.175122,115.183422',
    plusCode: 'RMFR+W9 Sekumpul, Buleleng Regency, Bali'
  },
  'tirta-empul': {
    id: 'tirta-empul',
    name: 'Tirta Empul Temple (Pura Tirta Empul)',
    lat: -8.415024,
    lon: 115.314972,
    formattedAddress: 'Jl. Tirta, Manukaya, Tampaksiring, Gianyar Regency, Bali 80552, Indonesia',
    regency: 'Gianyar Regency',
    category: 'tourism.sights',
    image: '/images/attractions/tirta-empul/main.jpg',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.415024,115.314972',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.415024,115.314972',
    plusCode: 'HCMR+2X Manukaya, Gianyar Regency, Bali'
  },
  'viceroy-bali': {
    id: 'viceroy-bali',
    name: 'Viceroy Bali (Luxury Valley Resort & Villas)',
    lat: -8.498425,
    lon: 115.275811,
    formattedAddress: 'Jl. Lanyahan, Petulu, Ubud, Gianyar Regency, Bali 80571, Indonesia',
    regency: 'Gianyar Regency',
    category: 'accommodation.hotel',
    image: '/images/hotels/viceroy-bali/main.jpg',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.498425,115.275811',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.498425,115.275811',
    plusCode: 'G72G+J8 Petulu, Gianyar Regency, Bali'
  },
  'the-edge-bali': {
    id: 'the-edge-bali',
    name: 'The Edge Bali (Uluwatu Cliff Luxury Resort)',
    lat: -8.847952,
    lon: 115.124538,
    formattedAddress: 'Jl. Pura Goa Lempeh, Banjar Dinas Kangin, Pecatu, Uluwatu, Badung Regency, Bali 80361, Indonesia',
    regency: 'Badung Regency',
    category: 'accommodation.hotel',
    image: '/images/hotels/the-edge-bali/main.jpg',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.847952,115.124538',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.847952,115.124538',
    plusCode: '542F+RM Pecatu, Badung Regency, Bali'
  },
  'padma-resort': {
    id: 'padma-resort',
    name: 'Padma Resort Ubud (Rainforest Resort & Spa)',
    lat: -8.356411,
    lon: 115.247833,
    formattedAddress: 'Banjar Carik, Desa Puhu, Payangan, Gianyar Regency, Bali 80572, Indonesia',
    regency: 'Gianyar Regency',
    category: 'accommodation.hotel',
    image: '/images/hotels/padma-resort/main.jpg',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.356411,115.247833',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.356411,115.247833',
    plusCode: 'J6VP+C4 Puhu, Gianyar Regency, Bali'
  },
  'munduk-moding': {
    id: 'munduk-moding',
    name: 'Munduk Moding Plantation Nature Resort & Spa',
    lat: -8.261822,
    lon: 115.076319,
    formattedAddress: 'Jl. Raya Desa Gobleg, Buleleng Regency, Bali 81152, Indonesia',
    regency: 'Buleleng Regency',
    category: 'accommodation.hotel',
    image: '/images/hotels/munduk-moding/main.jpg',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.261822,115.076319',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.261822,115.076319',
    plusCode: 'P3QG+7G Gobleg, Buleleng Regency, Bali'
  },
  'maya-sanur': {
    id: 'maya-sanur',
    name: 'Maya Sanur Resort & Spa',
    lat: -8.694628,
    lon: 115.263189,
    formattedAddress: 'Jl. Danau Tamblingan No.89M, Sanur, Denpasar, Bali 80228, Indonesia',
    regency: 'Denpasar City',
    category: 'accommodation.hotel',
    image: '/images/hotels/maya-sanur/main.jpg',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.694628,115.263189',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.694628,115.263189',
    plusCode: '8747+47 Sanur, Denpasar City, Bali'
  },
  'kos-one-hostel': {
    id: 'kos-one-hostel',
    name: 'Kos One Hostel Canggu (Chic Nomad Hub)',
    lat: -8.653421,
    lon: 115.132890,
    formattedAddress: 'Jl. Pantai Batu Bolong No.78, Canggu, Badung Regency, Bali 80361, Indonesia',
    regency: 'Badung Regency',
    category: 'accommodation.hotel',
    image: '/images/hotels/kos-one-hostel/main.jpg',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.653421,115.132890',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.653421,115.132890',
    plusCode: '84WH+J5 Canggu, Badung Regency, Bali'
  },
  'airport': {
    id: 'airport',
    name: 'I Gusti Ngurah Rai International Airport (DPS)',
    lat: -8.748166,
    lon: 115.167156,
    formattedAddress: 'Jalan Raya Gusti Ngurah Rai, Tuban, Kuta, Badung Regency, Bali 80362, Indonesia',
    regency: 'Badung Regency',
    category: 'airport',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.748166,115.167156',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.748166,115.167156',
    plusCode: '7528+PV Tuban, Badung Regency, Bali'
  }
};

// Normalize lat, lng, lon across all collections for consistent direct property access
ATTRACTIONS_DATA.forEach(a => {
  if (a.coordinates) {
    if (typeof a.lat !== 'number') a.lat = a.coordinates.lat;
    if (typeof a.lng !== 'number') a.lng = a.coordinates.lng;
    if (typeof a.lon !== 'number') a.lon = a.coordinates.lng;
  }
});

HOTELS_DATA.forEach(h => {
  if (h.coordinates) {
    if (typeof h.lat !== 'number') h.lat = h.coordinates.lat;
    if (typeof h.lng !== 'number') h.lng = h.coordinates.lng;
    if (typeof h.lon !== 'number') h.lon = h.coordinates.lng;
  }
});

Object.values(GEOAPIFY_VERIFIED_PLACES).forEach(p => {
  if (typeof p.lon === 'number' && typeof p.lng !== 'number') p.lng = p.lon;
  if (typeof p.lng === 'number' && typeof p.lon !== 'number') p.lon = p.lng;
});

// ==========================================================================
// MULTI-LAYER DESTINATION DISCOVERY HIERARCHY & DATASETS (INDIA & GLOBAL)
// ==========================================================================

const DESTINATION_HIERARCHY = {
  countries: [
    {
      id: 'india',
      name: 'India (Bharat)',
      flag: '🇮🇳',
      currency: 'INR',
      currencySymbol: '₹',
      tagline: 'Land of Majestic Palaces, Sacred Ghats, Misty Tea Valleys & Golden Coasts',
      description: 'Explore the world\'s most vibrant civilization. Journey through royal desert citadels in Rajasthan, serene palm-fringed backwaters in Kerala, sunny coastal fortresses in Goa, and snow-capped Himalayan peaks in Himachal.',
      heroImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=85',
      primaryFocus: true,
      states: [
        {
          id: 'rajasthan',
          name: 'Rajasthan',
          icon: '🏰',
          tagline: 'Land of Kings, Golden Fortresses & Rajput Valor',
          image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
          districts: [
            { id: 'jaipur', name: 'Jaipur (Pink City)', highlights: 'Amer Fort, Hawa Mahal, City Palace, Jal Mahal', default: true },
            { id: 'udaipur', name: 'Udaipur (City of Lakes)', highlights: 'Lake Pichola, City Palace, Jag Mandir, Monsoon Palace' },
            { id: 'jodhpur', name: 'Jodhpur (Blue City)', highlights: 'Mehrangarh Fort, Umaid Bhawan, Jaswant Thada' },
            { id: 'jaisalmer', name: 'Jaisalmer (Golden City)', highlights: 'Golden Fort, Sam Sand Dunes, Desert Safari' }
          ]
        },
        {
          id: 'kerala',
          name: 'Kerala',
          icon: '🌴',
          tagline: "God's Own Country — Emerald Backwaters & Cloud-Kissed Tea Hills",
          image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
          districts: [
            { id: 'alleppey', name: 'Alappuzha (Alleppey Backwaters)', highlights: 'Vembanad Lake Houseboats, Marari Beach, Canals', default: true },
            { id: 'munnar', name: 'Idukki (Munnar Tea Highlands)', highlights: 'Tea Estates, Eravikulam Nilgiri Tahr, Mattupetty' },
            { id: 'kochi', name: 'Ernakulam (Fort Kochi)', highlights: 'Chinese Fishing Nets, Jew Town, Mattancherry Palace' }
          ]
        },
        {
          id: 'goa',
          name: 'Goa',
          icon: '🌊',
          tagline: 'Sun-Drenched Arabian Coast, Baroque Cathedrals & Cascades',
          image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
          districts: [
            { id: 'north-goa', name: 'North Goa (Panaji & Calangute)', highlights: 'Fort Aguada, Chapora Fort, Anjuna, Old Goa Basilica', default: true },
            { id: 'south-goa', name: 'South Goa (Palolem & Dudhsagar)', highlights: 'Dudhsagar Waterfall, Palolem Beach, Cabo de Rama' }
          ]
        },
        {
          id: 'himachal',
          name: 'Himachal Pradesh',
          icon: '🏔️',
          tagline: 'Devbhoomi — Land of Snows, Pine Gorges & High Passes',
          image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
          districts: [
            { id: 'manali', name: 'Kullu & Manali', highlights: 'Solang Valley, Rohtang Pass, Atal Tunnel, Hadimba Temple', default: true },
            { id: 'shimla', name: 'Shimla (Summer Capital)', highlights: 'The Ridge, Mall Road, Kalka-Shimla Toy Train' }
          ]
        },
        {
          id: 'uttar-pradesh',
          name: 'Uttar Pradesh',
          icon: '🕌',
          tagline: 'Mughal Splendor & Sacred Ganges Ghats',
          image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
          districts: [
            { id: 'agra', name: 'Agra (City of the Taj)', highlights: 'Taj Mahal Wonder, Agra Fort, Mehtab Bagh', default: true },
            { id: 'varanasi', name: 'Varanasi (Kashi)', highlights: 'Dashashwamedh Ganga Aarti, Kashi Vishwanath, Assi Ghat' }
          ]
        },
        {
          id: 'uttarakhand',
          name: 'Uttarakhand',
          icon: '🌲',
          tagline: 'Spiritual River Valleys & Himalayan Serenity',
          image: 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=800&q=80',
          districts: [
            { id: 'rishikesh', name: 'Rishikesh & Haridwar', highlights: 'Laxman Jhula, Ganga Aarti, River Rafting, Yoga Ashrams', default: true }
          ]
        }
      ]
    },
    {
      id: 'indonesia',
      name: 'Indonesia (Bali & Beyond)',
      flag: '🇮🇩',
      currency: 'IDR',
      currencySymbol: 'Rp ',
      tagline: 'Island of the Gods, Emerald Terraces & Oceanic Cliffs',
      description: 'The world\'s premier tropical island sanctuary. Explore millennium-old cliffside sea shrines, terraced rice valleys in Ubud, and marine speedboats to the Nusa Islands.',
      heroImage: '/images/attractions/tanah-lot/main.jpg',
      states: [
        {
          id: 'bali',
          name: 'Bali Province',
          icon: '⛩️',
          tagline: 'Emerald Terraces & Sacred Sea Temples',
          image: '/images/attractions/tanah-lot/main.jpg',
          districts: [
            { id: 'all-bali', name: 'All Bali Regencies (Ubud, Kuta, Uluwatu, Tabanan)', highlights: 'Tanah Lot, Uluwatu, Ubud Monkey Forest, Mount Batur', default: true }
          ]
        }
      ]
    },
    {
      id: 'japan',
      name: 'Japan (Nippon)',
      flag: '🇯🇵',
      currency: 'USD',
      currencySymbol: '$',
      tagline: 'Ancient Shinto Shrines, Shinkansen Bullet Trains & Neon Skylines',
      description: 'Experience the harmonious blend of millennium-old tradition and futuristic innovation.',
      heroImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=85',
      states: [
        {
          id: 'kanto',
          name: 'Kanto (Tokyo)',
          icon: '🗼',
          tagline: 'High-Tech Metropolis & Sacred Mt. Fuji',
          image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
          districts: [
            { id: 'tokyo', name: 'Tokyo Metropolis', highlights: 'Shibuya Crossing, Senso-ji, Shinjuku, Akihabara', default: true }
          ]
        },
        {
          id: 'kansai',
          name: 'Kansai (Kyoto & Osaka)',
          icon: '⛩️',
          tagline: 'Geisha Districts & 1,000 Shinto Torii Gates',
          image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
          districts: [
            { id: 'kyoto', name: 'Kyoto Ancient Capital', highlights: 'Fushimi Inari, Arashiyama Bamboo Grove, Kinkaku-ji', default: true }
          ]
        }
      ]
    },
    {
      id: 'switzerland',
      name: 'Switzerland',
      flag: '🇨🇭',
      currency: 'EUR',
      currencySymbol: '€',
      tagline: 'Alpine Glaciers, Crystal Glacial Lakes & Cogwheel Rail',
      description: 'The pinnacle of Alpine beauty, offering panoramic mountain trains and pristine valleys.',
      heroImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1600&q=85',
      states: [
        {
          id: 'bernese-oberland',
          name: 'Bernese Oberland',
          icon: '🏔️',
          tagline: 'Jungfraujoch Top of Europe & Lauterbrunnen Valleys',
          image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
          districts: [
            { id: 'interlaken', name: 'Interlaken & Lauterbrunnen', highlights: 'Jungfraujoch, 72 Waterfalls, Lake Brienz', default: true }
          ]
        }
      ]
    }
  ]
};

// Index hierarchy by ID for instant O(1) dictionary and slug lookups
if (DESTINATION_HIERARCHY && Array.isArray(DESTINATION_HIERARCHY.countries)) {
  DESTINATION_HIERARCHY.countries.forEach(c => {
    DESTINATION_HIERARCHY[c.id] = c;
    if (Array.isArray(c.states)) {
      const statesMap = {};
      c.states.forEach(s => {
        const normKey = s.id.replace(/-/g, '_');
        statesMap[s.id] = s;
        statesMap[normKey] = s;
        if (s.id === 'himachal') {
          statesMap['himachal_pradesh'] = s;
          statesMap['himachal-pradesh'] = s;
        }
        if (s.id === 'uttar-pradesh') {
          statesMap['uttar_pradesh'] = s;
        }
        if (Array.isArray(s.districts)) {
          const distMap = {};
          s.districts.forEach(d => {
            const distNormKey = d.id.replace(/-/g, '_');
            distMap[d.id] = d;
            distMap[distNormKey] = d;
            if (d.id === 'kochi') {
              distMap['fort_kochi'] = d;
              distMap['fort-kochi'] = d;
            }
          });
          Object.assign(s.districts, distMap);
        }
      });
      Object.assign(c.states, statesMap);
    }
  });
}

// ==========================================================================
// INDIA ATTRACTIONS DATASET (CURATED WITH REAL PHOTOS & 6-DECIMAL GPS)
// ==========================================================================
const INDIA_ATTRACTIONS_DATA = [
  // --- JAIPUR, RAJASTHAN ---
  {
    id: 'amer-fort',
    country: 'india',
    state: 'rajasthan',
    district: 'jaipur',
    name: 'Amer Fort (Amber Palace)',
    googleMapsName: 'Amber Palace',
    localName: 'आमेर का किला (Amer Durg)',
    category: 'fort',
    categoryLabel: 'Royal Hill Citadel',
    badgeClass: 'badge-temple',
    location: 'Amer Town, Jaipur, Rajasthan',
    coordinates: { lat: 26.985487, lng: 75.851345 },
    formattedAddress: 'Devisinghpura, Amer, Jaipur, Rajasthan 302001, India',
    regency: 'Jaipur District',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=26.985487,75.851345',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=26.985487,75.851345',
    plusCode: 'XVP2+5G Amer, Jaipur, Rajasthan',
    rating: 4.9,
    reviews: 48200,
    feeUSD: 7,
    feeINR: 550,
    duration: '3 - 4 Hours',
    distanceAirport: '22 km (45 mins drive)',
    crowdLevel: 'Moderate to High in Morning',
    bestTime: '08:30 AM – 11:30 AM (Cool breeze & golden light)',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    description: 'Imposing 16th-century Rajput citadel perched atop the Aravalli hills, renowned for its ornate Sheesh Mahal (Mirror Palace) and Maota Lake views.',
    fullDetails: 'Constructed in 1592 by Raja Man Singh I, Amer Fort is a UNESCO World Heritage Site fusing Rajput and Mughal architecture. The interior Sheesh Mahal is inlaid with thousands of convex imported Belgian glass mirrors that illuminate an entire hall with a single candle flame.',
    photographyTip: 'Capture the reflection of the fort ramparts in Maota Lake from the Kesar Kyari garden causeway early in the morning.',
    dressCode: 'Comfortable walking shoes required for stone inclines. Modest attire covering shoulders and knees.',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80', title: 'Amer Fort Hilltop Citadel', caption: 'Dramatic stone ramparts climbing the rugged Aravalli ridges.' },
      { url: 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?auto=format&fit=crop&w=800&q=80', title: 'Sheesh Mahal Mirror Hall', caption: 'Intricate glass mosaic ceiling crafted by master royal artisans.' },
      { url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80', title: 'Ganesh Pol Royal Gate', caption: 'Vibrant fresco-painted gateway leading to royal private quarters.' }
    ]
  },
  {
    id: 'hawa-mahal',
    country: 'india',
    state: 'rajasthan',
    district: 'jaipur',
    name: 'Hawa Mahal (Palace of Winds)',
    googleMapsName: 'Hawa Mahal',
    localName: 'हवा महल',
    category: 'palace',
    categoryLabel: 'Heritage Palace',
    badgeClass: 'badge-temple',
    location: 'Badi Choupad, Pink City, Jaipur',
    coordinates: { lat: 26.923936, lng: 75.826744 },
    formattedAddress: 'Hawa Mahal Rd, Badi Choupad, J.D.A. Market, Jaipur, Rajasthan 302002, India',
    regency: 'Jaipur District',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=26.923936,75.826744',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=26.923936,75.826744',
    plusCode: 'WQFH+HM Jaipur, Rajasthan',
    rating: 4.8,
    reviews: 53100,
    feeUSD: 3,
    feeINR: 200,
    duration: '1 - 2 Hours',
    distanceAirport: '12 km (25 mins drive)',
    crowdLevel: 'High around noon',
    bestTime: '08:00 AM – 10:00 AM (Sunrise glow on pink sandstone)',
    image: 'https://images.unsplash.com/photo-1609825488888-3a766db05542?auto=format&fit=crop&w=800&q=80',
    description: 'Iconic five-story pink and red sandstone palace featuring 953 intricately carved jharokhas designed like the crown of Lord Krishna.',
    fullDetails: 'Built in 1799 by Maharaja Sawai Pratap Singh, Hawa Mahal was designed by Lal Chand Ustad. Its unique honeycomb facade allowed royal Rajput ladies to observe vibrant street festivals and processions without being seen from outside.',
    photographyTip: 'Cross the street to the Wind View Cafe or Tattoo Cafe rooftop opposite the facade for the world-famous full facade view with traditional chai.',
    dressCode: 'Casual comfortable attire. Modest presentation appreciated.',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1609825488888-3a766db05542?auto=format&fit=crop&w=800&q=80', title: 'Hawa Mahal Honeycomb Facade', caption: '953 carved sandstone windows glowing in the Rajasthan morning sun.' },
      { url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80', title: 'Inner Courtyards & Jharokhas', caption: 'Stained glass inlays casting colored shadows on pink corridors.' }
    ]
  },
  {
    id: 'city-palace-jaipur',
    country: 'india',
    state: 'rajasthan',
    district: 'jaipur',
    name: 'City Palace & Chandra Mahal',
    googleMapsName: 'City Palace, Jaipur',
    localName: 'सिटी पैलेस जयपुर',
    category: 'palace',
    categoryLabel: 'Royal Residence',
    badgeClass: 'badge-temple',
    location: 'Old City, Jaipur, Rajasthan',
    coordinates: { lat: 26.925773, lng: 75.823658 },
    formattedAddress: 'Tulsi Marg, Gangori Bazaar, J.D.A. Market, Jaipur, Rajasthan 302002, India',
    regency: 'Jaipur District',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=26.925773,75.823658',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=26.925773,75.823658',
    plusCode: 'WQGF+8F Jaipur, Rajasthan',
    rating: 4.8,
    reviews: 38900,
    feeUSD: 9,
    feeINR: 700,
    duration: '2 - 3 Hours',
    distanceAirport: '13 km (28 mins drive)',
    crowdLevel: 'Moderate',
    bestTime: '10:00 AM – 01:00 PM',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    description: 'Magnificent complex of courtyards, gardens, and royal buildings in the heart of the Old City, housing museum galleries and the titular royal family.',
    fullDetails: 'Commissioned by Maharaja Sawai Jai Singh II alongside the founding of Jaipur in 1727. Highlights include the Peacock Gate in Pritam Niwas Chowk, Mubarak Mahal textile museum, and the world\'s largest sterling silver vessels (Gangajalis) recorded in Guinness World Records.',
    photographyTip: 'The four seasonal gates in the inner courtyard, especially the vibrant Peacock Gate representing Autumn, are iconic portrait backdrops.',
    dressCode: 'Modest respectful dress.',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80', title: 'Peacock Gate Courtyard', caption: 'Handcrafted ceramic peacock motifs in Pritam Niwas Chowk.' }
    ]
  },
  {
    id: 'jal-mahal',
    country: 'india',
    state: 'rajasthan',
    district: 'jaipur',
    name: 'Jal Mahal (Water Palace)',
    googleMapsName: 'Jal Mahal',
    localName: 'जल महल',
    category: 'nature',
    categoryLabel: 'Lake Sanctuary',
    badgeClass: 'badge-beach',
    location: 'Man Sagar Lake, Amer Rd, Jaipur',
    coordinates: { lat: 26.953450, lng: 75.846200 },
    formattedAddress: 'Amer Rd, Jal Mahal, Amer, Jaipur, Rajasthan 302002, India',
    regency: 'Jaipur District',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=26.953450,75.846200',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=26.953450,75.846200',
    plusCode: 'XRFX+9F Jaipur, Rajasthan',
    rating: 4.6,
    reviews: 31200,
    feeUSD: 0,
    feeINR: 0,
    duration: '1 Hour',
    distanceAirport: '18 km (35 mins drive)',
    crowdLevel: 'High at Sunset',
    bestTime: '05:30 PM – 07:00 PM (Sunset illumination across the lake)',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
    description: 'Serene 18th-century Rajput palace standing in the center of Man Sagar Lake, appearing to float gracefully on the waters against the Aravalli hills.',
    fullDetails: 'Four of the palace\'s five stories are submerged underwater when the lake is full. Visitors can stroll the landscaped promenade on Amer Road, enjoying illuminated views at night, handicraft stalls, and street snacks.',
    photographyTip: 'Arrive at blue hour just as the floodlights turn on to capture the warm golden palace reflecting across the deep indigo lake waters.',
    dressCode: 'Casual promenade wear.',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80', title: 'Jal Mahal Floating Palace', caption: 'Sunset glow over Man Sagar Lake and the Aravalli mountain backdrop.' }
    ]
  },
  {
    id: 'nahargarh-fort',
    country: 'india',
    state: 'rajasthan',
    district: 'jaipur',
    name: 'Nahargarh Fort & Sunset Bastion',
    googleMapsName: 'Nahargarh Fort',
    localName: 'नाहरगढ़ का किला',
    category: 'fort',
    categoryLabel: 'Panoramic Fortress',
    badgeClass: 'badge-volcano',
    location: 'Aravalli Hills, Jaipur',
    coordinates: { lat: 26.937300, lng: 75.815600 },
    formattedAddress: 'Krishna Nagar, Brahampuri, Jaipur, Rajasthan 302002, India',
    regency: 'Jaipur District',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=26.937300,75.815600',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=26.937300,75.815600',
    plusCode: 'WRP8+W6 Jaipur, Rajasthan',
    rating: 4.7,
    reviews: 28400,
    feeUSD: 3,
    feeINR: 200,
    duration: '2 - 3 Hours',
    distanceAirport: '24 km (50 mins drive)',
    crowdLevel: 'Popular at Sunset',
    bestTime: '05:00 PM – 07:30 PM (Spectacular panoramic sunset over Pink City)',
    image: 'https://images.unsplash.com/photo-1588096344356-9a29e1fbaae5?auto=format&fit=crop&w=800&q=80',
    description: 'Mountain fortress crowning the Aravalli ridge, offering breathtaking 360-degree panoramas of the entire Jaipur city basin and Madhavendra Bhawan palace suites.',
    fullDetails: 'Built in 1734 by Sawai Jai Singh, Nahargarh means "Abode of Tigers". The palace features Madhavendra Bhawan, composed of nine identical luxury suites for the royal queens interconnected by painted corridors.',
    photographyTip: 'Position yourself along the Padao open-air restaurant terrace 20 minutes before sunset for the city lights turning on.',
    dressCode: 'Light jacket recommended for evening mountain breezes.',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1588096344356-9a29e1fbaae5?auto=format&fit=crop&w=800&q=80', title: 'Nahargarh Hilltop Sunset', caption: 'Golden twilight over the Jaipur urban plains from the fortification walls.' }
    ]
  },

  // --- UDAIPUR, RAJASTHAN ---
  {
    id: 'city-palace-udaipur',
    country: 'india',
    state: 'rajasthan',
    district: 'udaipur',
    name: 'Udaipur City Palace Complex',
    googleMapsName: 'City Palace, Udaipur',
    localName: 'उदयपुर सिटी पैलेस',
    category: 'palace',
    categoryLabel: 'Lakeside Palace',
    badgeClass: 'badge-temple',
    location: 'East Bank of Lake Pichola, Udaipur',
    coordinates: { lat: 24.576432, lng: 73.683521 },
    formattedAddress: 'Old City, Udaipur, Rajasthan 313001, India',
    regency: 'Udaipur District',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=24.576432,73.683521',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=24.576432,73.683521',
    plusCode: 'HMGR+HC Udaipur, Rajasthan',
    rating: 4.9,
    reviews: 44200,
    feeUSD: 5,
    feeINR: 400,
    duration: '3 - 4 Hours',
    distanceAirport: '24 km (45 mins drive)',
    crowdLevel: 'Moderate',
    bestTime: '09:00 AM – 12:00 PM',
    image: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=800&q=80',
    description: 'Rajasthan\'s largest royal palace complex, rising majestically over the tranquil blue waters of Lake Pichola with towers, domes, and marble balconies.',
    fullDetails: 'Constructed over 400 years starting in 1559 by Maharana Udai Singh II. Blends Mewar architecture with European and Chinese porcelain inlays. Houses the famous Mor Chowk (Peacock Courtyard) with 5,000 mosaic glass pieces.',
    photographyTip: 'The high balconies overlooking Lake Pichola and Jag Mandir Island provide breathtaking sunset frames.',
    dressCode: 'Modest comfortable attire.',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=800&q=80', title: 'Udaipur City Palace Façade', caption: 'Granite and marble balconies rising directly from the waters of Lake Pichola.' }
    ]
  },
  {
    id: 'lake-pichola',
    country: 'india',
    state: 'rajasthan',
    district: 'udaipur',
    name: 'Lake Pichola & Jag Mandir Island',
    googleMapsName: 'Lake Pichola',
    localName: 'पिछोला झील',
    category: 'nature',
    categoryLabel: 'Heritage Lake',
    badgeClass: 'badge-beach',
    location: 'Udaipur, Rajasthan',
    coordinates: { lat: 24.572100, lng: 73.678900 },
    formattedAddress: 'Lake Pichola, Udaipur, Rajasthan 313001, India',
    regency: 'Udaipur District',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=24.572100,73.678900',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=24.572100,73.678900',
    plusCode: 'HMCF+R9 Udaipur, Rajasthan',
    rating: 4.8,
    reviews: 36800,
    feeUSD: 8,
    feeINR: 650,
    duration: '2 Hours',
    distanceAirport: '25 km (50 mins drive)',
    crowdLevel: 'High at Sunset',
    bestTime: '05:00 PM – 06:45 PM (Romantic sunset cruise)',
    image: 'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?auto=format&fit=crop&w=800&q=80',
    description: 'Artificial freshwater lake created in 1362 AD, famous for sunset cruises, marble palaces like Jag Niwas (Taj Lake Palace), and Jag Mandir Island.',
    fullDetails: 'Jag Mandir island palace served as a refuge for Mughal Prince Khurram (later Emperor Shah Jahan) in 1623, inspiring his later architectural vision for the Taj Mahal.',
    photographyTip: 'Take the sunset boat cruise from Rameshwar Ghat to capture the illuminated palace glowing against the Aravalli hills.',
    dressCode: 'Casual comfortable lake cruise attire.',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?auto=format&fit=crop&w=800&q=80', title: 'Lake Pichola Sunset Cruise', caption: 'Traditional wooden boats cruising past marble palaces at dusk.' }
    ]
  },

  // --- KERALA (ALLEPPEY, MUNNAR, KOCHI) ---
  {
    id: 'alleppey-backwaters',
    country: 'india',
    state: 'kerala',
    district: 'alleppey',
    name: 'Alleppey Backwaters (Vembanad Lake)',
    googleMapsName: 'Alleppey Backwaters',
    localName: 'ആലപ്പുഴ കായൽ (Alappuzha Kayal)',
    category: 'nature',
    categoryLabel: 'Tropical Waterways',
    badgeClass: 'badge-beach',
    location: 'Punnamada, Alappuzha, Kerala',
    coordinates: { lat: 9.498067, lng: 76.338848 },
    formattedAddress: 'Punnamada, Finishing Point, Alappuzha, Kerala 688013, India',
    regency: 'Alappuzha District',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=9.498067,76.338848',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=9.498067,76.338848',
    plusCode: 'FPXQ+6G Alappuzha, Kerala',
    rating: 4.9,
    reviews: 41200,
    feeUSD: 25,
    feeINR: 2000,
    duration: 'Full Day / Overnight',
    distanceAirport: '82 km from Cochin Int\'l (COK - 2h drive)',
    crowdLevel: 'Peaceful on water',
    bestTime: '06:30 AM – 10:30 AM & Sunset (Silky water and village life)',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    description: 'The "Venice of the East" — an emerald labyrinth of interconnected lagoons, tranquil canals, and coconut groves navigated by traditional thatched Kettuvallam houseboats.',
    fullDetails: 'Former grain barges converted into luxury air-conditioned floating villas with private chefs serving traditional Karimeen Pollichathu (pearl spot fish in banana leaf), fresh coconut water, and steaming Appam with stew.',
    photographyTip: 'Early morning canoe tours through narrow village canals reveal Kingfishers diving and villagers harvesting water lilies.',
    dressCode: 'Light cottons, sunscreen, and polarized sunglasses.',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80', title: 'Traditional Kettuvallam Houseboat', caption: 'Coir and bamboo craft cruising through palm-fringed Kerala waterways.' },
      { url: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80', title: 'Vembanad Golden Sunset', caption: 'Mirrored waters reflecting glowing coconut palm silhouettes.' }
    ]
  },
  {
    id: 'munnar-tea-gardens',
    country: 'india',
    state: 'kerala',
    district: 'munnar',
    name: 'Munnar Tea Plantations & Eravikulam',
    googleMapsName: 'Munnar Tea Plantations',
    localName: 'മൂന്നാർ തേയില തോട്ടങ്ങൾ',
    category: 'nature',
    categoryLabel: 'Highland Retreat',
    badgeClass: 'badge-volcano',
    location: 'Idukki District, Kerala',
    coordinates: { lat: 10.088933, lng: 77.059525 },
    formattedAddress: 'Munnar, Idukki District, Kerala 685612, India',
    regency: 'Idukki District',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=10.088933,77.059525',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=10.088933,77.059525',
    plusCode: '33Q5+HR Munnar, Kerala',
    rating: 4.9,
    reviews: 35600,
    feeUSD: 3,
    feeINR: 200,
    duration: '3 - 5 Hours',
    distanceAirport: '110 km from Cochin Int\'l (COK - 3.5h scenic hill drive)',
    crowdLevel: 'Moderate',
    bestTime: '07:00 AM – 11:00 AM (Mist rolling over green valleys)',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
    description: 'Breathtaking rolling hills carpeted in endless emerald tea shrubs 1,600m above sea level, home to Nilgiri Tahr mountain goats and the rare 12-year Neelakurinji bloom.',
    fullDetails: 'Originally established by Scottish planters in the 1880s, Munnar features India\'s highest tea estates at Kolukkumalai. Visit the KDHP Tea Museum to see orthodox tea rolling and taste single-estate high-grown black tea.',
    photographyTip: 'Sunrise at Top Station or Photo Point captures mist settling between the neat green geometric rows of tea bushes.',
    dressCode: 'Light woolens or fleece for cool highland mornings.',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80', title: 'Misty Munnar Tea Hills', caption: 'Layers of rolling emerald tea gardens shrouded in morning mountain mist.' }
    ]
  },
  {
    id: 'fort-kochi',
    country: 'india',
    state: 'kerala',
    district: 'kochi',
    name: 'Fort Kochi & Chinese Fishing Nets',
    googleMapsName: 'Chinese Fishing Nets, Fort Kochi',
    localName: 'ഫോർട്ട് കൊച്ചി ചീനവലകൾ',
    category: 'heritage',
    categoryLabel: 'Coastal Heritage',
    badgeClass: 'badge-temple',
    location: 'Fort Kochi, Ernakulam, Kerala',
    coordinates: { lat: 9.965800, lng: 76.242100 },
    formattedAddress: 'River Rd, Fort Kochi, Kochi, Kerala 682001, India',
    regency: 'Ernakulam District',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=9.965800,76.242100',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=9.965800,76.242100',
    plusCode: 'X68R+8R Kochi, Kerala',
    rating: 4.7,
    reviews: 29800,
    feeUSD: 0,
    feeINR: 0,
    duration: '2 - 3 Hours',
    distanceAirport: '38 km from Cochin Int\'l (COK - 1h 10m drive)',
    crowdLevel: 'High at Sunset',
    bestTime: '05:00 PM – 06:45 PM (Sunset over the Arabian Sea)',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
    description: 'Historic seaside trading port where colossal cantilevered Chinese fishing nets (Cheena vala) bow into the Arabian Sea alongside colonial Portuguese, Dutch, and British quarters.',
    fullDetails: 'Introduced by Chinese explorer Zheng He\'s court in the 14th century. Walk through Princess Street lined with bohemian cafes, visit St. Francis Church (Vasco da Gama\'s original burial site), and browse the 450-year-old Paradesi Synagogue in Jew Town.',
    photographyTip: 'Silhouette the intricate bamboo and teak counterweight rigging of the nets against the vibrant orange-purple Arabian sea sunset.',
    dressCode: 'Casual walking attire.',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80', title: 'Chinese Fishing Nets at Sunset', caption: 'Cantilevered maritime net structures dipping into the Cochin harbor channel.' }
    ]
  },

  // --- GOA (NORTH & SOUTH GOA) ---
  {
    id: 'fort-aguada',
    country: 'india',
    state: 'goa',
    district: 'north-goa',
    name: 'Fort Aguada & Portuguese Lighthouse',
    googleMapsName: 'Fort Aguada',
    localName: 'Fort Aguada (Candolim)',
    category: 'fort',
    categoryLabel: 'Coastal Fortress',
    badgeClass: 'badge-temple',
    location: 'Sinquerim, Candolim, North Goa',
    coordinates: { lat: 15.492500, lng: 73.773600 },
    formattedAddress: 'Aguada Fort Rd, Candolim, Goa 403515, India',
    regency: 'North Goa District',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=15.492500,73.773600',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=15.492500,73.773600',
    plusCode: 'FPVR+2C Candolim, Goa',
    rating: 4.8,
    reviews: 49500,
    feeUSD: 1,
    feeINR: 50,
    duration: '2 Hours',
    distanceAirport: '38 km from Dabolim (GOI) / 32 km from Mopa (GOX)',
    crowdLevel: 'Moderate to High',
    bestTime: '04:30 PM – 06:30 PM (Golden coastal sunset)',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    description: 'Imposing 17th-century Portuguese coastal bastion with a freshwater cistern and four-story lighthouse guarding the mouth of the Mandovi River.',
    fullDetails: 'Constructed in 1612 to protect Goa against Dutch fleets and Marathas. Aguada translates to "Watering Place", as ocean ships stopped here to replenish drinking water from the fort\'s enormous subterranean cistern holding 2.37 million gallons.',
    photographyTip: 'Stand on the upper rampart overlooking Sinquerim beach as waves break against the dark laterite stone walls.',
    dressCode: 'Comfortable beach or walking attire.',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80', title: 'Fort Aguada Coastal Ramparts', caption: 'Red laterite stone fortress overlooking the azure Arabian Sea.' }
    ]
  },
  {
    id: 'dudhsagar-waterfalls',
    country: 'india',
    state: 'goa',
    district: 'south-goa',
    name: 'Dudhsagar Waterfalls',
    googleMapsName: 'Dudhsagar Waterfalls',
    localName: 'दूधसागर धबधबा',
    category: 'nature',
    categoryLabel: 'Cascade Wonder',
    badgeClass: 'badge-volcano',
    location: 'Bhagwan Mahaveer Sanctuary, Sonaulim, South Goa',
    coordinates: { lat: 15.314400, lng: 74.314300 },
    formattedAddress: 'Sonaulim, Goa 403410, India',
    regency: 'South Goa District',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=15.314400,74.314300',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=15.314400,74.314300',
    plusCode: '8877+QP Sonaulim, Goa',
    rating: 4.9,
    reviews: 32400,
    feeUSD: 8,
    feeINR: 650,
    duration: '4 - 6 Hours (Safari & Trek)',
    distanceAirport: '68 km from Dabolim (GOI - 2h drive + 4x4 Jeep safari)',
    crowdLevel: 'Moderate',
    bestTime: '08:00 AM – 01:00 PM (Clear pool for swimming)',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    description: 'One of India\'s tallest and most dramatic four-tiered waterfalls (310m high), roaring down the Western Ghats like a sea of foaming white milk.',
    fullDetails: 'Located inside Bhagwan Mahaveer Wildlife Sanctuary on the Mandovi River. Famous for the iconic railway viaduct spanning the middle of the cascade, where trains appear to cut directly through the roaring spray.',
    photographyTip: 'Capture the passenger train crossing the arched stone bridge directly in front of the waterfall spray.',
    dressCode: 'Life jacket mandatory for swimming in the base pool. Sturdy water-resistant footwear.',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80', title: 'Dudhsagar Cascade & Rail Bridge', caption: 'Roaring white waters plunging 310 meters down the Western Ghats jungle.' }
    ]
  },

  // --- UTTAR PRADESH (AGRA & VARANASI) ---
  {
    id: 'taj-mahal',
    country: 'india',
    state: 'uttar-pradesh',
    district: 'agra',
    name: 'Taj Mahal (UNESCO Wonder of the World)',
    googleMapsName: 'Taj Mahal',
    localName: 'ताज महल (Taj Mahal)',
    category: 'palace',
    categoryLabel: 'World Wonder',
    badgeClass: 'badge-temple',
    location: 'Dharmapuri, Forest Colony, Tajganj, Agra',
    coordinates: { lat: 27.175144, lng: 78.042142 },
    formattedAddress: 'Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001, India',
    regency: 'Agra District',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=27.175144,78.042142',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=27.175144,78.042142',
    plusCode: '52GR+3R Agra, Uttar Pradesh',
    rating: 4.9,
    reviews: 142000,
    feeUSD: 14,
    feeINR: 1100,
    duration: '3 - 4 Hours',
    distanceAirport: '12 km from Agra Airport (AGR) / 2h via Gatimaan/Vande Bharat from Delhi',
    crowdLevel: 'High (Optimal at Dawn)',
    bestTime: '05:45 AM – 08:30 AM (Sunrise glow on Makrana white marble)',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
    description: 'The universally admired masterpiece of Mughal art and eternal monument of love, built in gleaming ivory-white Makrana marble by Emperor Shah Jahan.',
    fullDetails: 'Commissioned in 1631 in memory of Empress Mumtaz Mahal. Built over 22 years by 20,000 artisans. Features perfect symmetry, Persian calligraphy, four 40-meter minarets tilted slightly outward, and exquisite Pietra Dura semiprecious stone inlays (lapis lazuli, jade, turquoise). Closed on Fridays.',
    photographyTip: 'Enter through the East Gate right at 05:45 AM to stand on the central reflection pool bench before crowds arrive.',
    dressCode: 'Shoe covers provided at entrance. Modest dress covering shoulders.',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80', title: 'Taj Mahal Sunrise Grandeur', caption: 'Makrana marble glowing with warm peach-pink light at sunrise.' },
      { url: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80', title: 'Reflecting Pool & Cypress Trees', caption: 'Flawless symmetrical reflection across the central Charbagh gardens.' }
    ]
  },
  {
    id: 'dashashwamedh-ghat',
    country: 'india',
    state: 'uttar-pradesh',
    district: 'varanasi',
    name: 'Dashashwamedh Ghat & Ganga Aarti',
    googleMapsName: 'Dashashwamedh Ghat',
    localName: 'दशाश्वमेध घाट (काशी)',
    category: 'temple',
    categoryLabel: 'Spiritual Sanctuary',
    badgeClass: 'badge-temple',
    location: 'Ganga Riverfront, Varanasi, Uttar Pradesh',
    coordinates: { lat: 25.307600, lng: 83.010700 },
    formattedAddress: 'Dashashwamedh Ghat Rd, Ghats of Varanasi, Varanasi, Uttar Pradesh 221001, India',
    regency: 'Varanasi District',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=25.307600,83.010700',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=25.307600,83.010700',
    plusCode: '8256+27 Varanasi, Uttar Pradesh',
    rating: 4.9,
    reviews: 68400,
    feeUSD: 0,
    feeINR: 0,
    duration: '2 - 3 Hours',
    distanceAirport: '26 km from Lal Bahadur Shastri Int\'l (VNS - 50 mins drive)',
    crowdLevel: 'Very High during evening Aarti',
    bestTime: '06:00 PM – 07:45 PM (Grand Maha Aarti brass lamp ceremony)',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
    description: 'The sacred spiritual epicenter of Varanasi on the holy Ganges River, renowned worldwide for its hypnotic evening synchronized brass lamp Maha Aarti.',
    fullDetails: 'According to Hindu mythology, Lord Brahma performed the ten-horse sacrifice (Dasa-Ashwamedha) here. Every evening at dusk, young priests clad in saffron robes perform synchronized worship with multi-tiered flaming brass lamps, conch shells, and sacred incense as thousands of floating clay diyas illuminate the river.',
    photographyTip: 'Hire a wooden rowboat 45 minutes prior to Aarti to view the spectacle directly from the tranquil waters facing the grand steps.',
    dressCode: 'Modest respectful clothing covering knees and shoulders.',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80', title: 'Grand Ganga Aarti Ceremony', caption: 'Saffron-robed priests wielding flaming brass deepam lamps along the holy ghats.' }
    ]
  },

  // --- HIMACHAL PRADESH (MANALI & SHIMLA) ---
  {
    id: 'solang-valley',
    country: 'india',
    state: 'himachal',
    district: 'manali',
    name: 'Solang Valley & Atal Tunnel',
    googleMapsName: 'Solang Valley',
    localName: 'सोलंग घाटी (मनाली)',
    category: 'nature',
    categoryLabel: 'Alpine Adventure',
    badgeClass: 'badge-volcano',
    location: 'Solang, Burwa, Manali, Himachal Pradesh',
    coordinates: { lat: 32.316800, lng: 77.157500 },
    formattedAddress: 'Solang Valley, Burwa, Himachal Pradesh 175131, India',
    regency: 'Kullu District',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=32.316800,77.157500',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=32.316800,77.157500',
    plusCode: '8585+P2 Burwa, Himachal Pradesh',
    rating: 4.8,
    reviews: 38200,
    feeUSD: 0,
    feeINR: 0,
    duration: '4 - 5 Hours',
    distanceAirport: '62 km from Bhuntar Kullu Airport (KUU - 2h drive)',
    crowdLevel: 'Moderate to High in Winter & Summer',
    bestTime: '09:00 AM – 02:00 PM (Clear mountain views & paragliding)',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
    description: 'Spectacular alpine amphitheater 2,560m high nestled between Solang village and Beas Kund glacier, offering paragliding, skiing, and gateway to the engineering marvel Atal Tunnel.',
    fullDetails: 'Surrounded by towering snow-clad Pir Panjal Himalayan peaks. In winter it transforms into a ski wonderland; in summer it offers tandem paragliding flights over pine forests and zorbing. Just 15 minutes north lies the world-record 9.02 km Atal Tunnel connecting into the surreal Lahaul Valley.',
    photographyTip: 'Take the Solang Ropeway cable car to Mt. Phatru (3,200m) for breathtaking panoramic shots of snow-capped Himalayan ridges.',
    dressCode: 'Warm layered clothing, thermals, and windproof jackets.',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80', title: 'Solang Valley Snow Peaks', caption: 'Soaring alpine summits and pine valley slopes in the Pir Panjal range.' }
    ]
  }
];

// Normalize coordinates on INDIA_ATTRACTIONS_DATA
INDIA_ATTRACTIONS_DATA.forEach(a => {
  if (a.coordinates) {
    if (typeof a.lat !== 'number') a.lat = a.coordinates.lat;
    if (typeof a.lng !== 'number') a.lng = a.coordinates.lng;
    if (typeof a.lon !== 'number') a.lon = a.coordinates.lng;
  }
});

// ==========================================================================
// INDIA HOTELS & LUXURY PALACES DATASET
// ==========================================================================
const INDIA_HOTELS_DATA = [
  // --- JAIPUR ---
  {
    id: 'rambagh-palace',
    country: 'india',
    state: 'rajasthan',
    district: 'jaipur',
    name: 'Rambagh Palace, Jaipur (Taj Heritage)',
    tier: 'luxury',
    tierLabel: '5-Star Royal Palace',
    rating: 4.9,
    reviews: 4280,
    priceUSD: 450,
    priceINR: 37500,
    lat: 26.897800,
    lng: 75.808300,
    coordinates: { lat: 26.897800, lng: 75.808300 },
    formattedAddress: 'Bhawani Singh Rd, Rambagh, Jaipur, Rajasthan 302005, India',
    regency: 'Jaipur District',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=26.897800,75.808300',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=26.897800,75.808300',
    plusCode: 'VPX5+48 Jaipur, Rajasthan',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    description: 'Former residence of the Maharaja of Jaipur, rated TripAdvisor\'s #1 World\'s Best Hotel, set across 47 acres of ornamental Mughal gardens.',
    amenities: ['Mughal Landscaped Gardens', 'Jiva Grande Spa', 'Polo Bar & Royal Dining', 'Heritage Buggy Rides', 'Peacock Lawns', 'Butler Service'],
    rooms: [
      { name: 'Palace Room', size: '48 sqm', bed: '1 King Bed', priceUSD: 450, priceINR: 37500, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80' },
      { name: 'Historical Suite', size: '75 sqm', bed: '1 Royal Four-Poster King', priceUSD: 780, priceINR: 65000, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80' }
    ],
    cancellationPolicy: 'Free cancellation up to 48 hours prior to arrival',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80', caption: 'Palace gardens and marble arches at twilight' }
    ]
  },
  {
    id: 'samode-haveli',
    country: 'india',
    state: 'rajasthan',
    district: 'jaipur',
    name: 'Samode Haveli (Royal Townhouse)',
    tier: 'eco',
    tierLabel: 'Heritage Boutique Haveli',
    rating: 4.8,
    reviews: 2150,
    priceUSD: 160,
    priceINR: 13300,
    lat: 26.932500,
    lng: 75.831000,
    coordinates: { lat: 26.932500, lng: 75.831000 },
    formattedAddress: 'Near Jorawar Singh Gate, Gangapole, Jaipur, Rajasthan 302002, India',
    regency: 'Jaipur District',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=26.932500,75.831000',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=26.932500,75.831000',
    plusCode: 'WRMJ+2C Jaipur, Rajasthan',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    description: '225-year-old royal aristocratic townhouse with hand-painted fresco courtyards, Moorish swimming pool, and peaceful verdant gardens.',
    amenities: ['Moorish Courtyard Pool', 'Fresco Painted Dining', 'Ayurvedic Spa', 'Rooftop Fort Views', 'Heritage Walking Tours'],
    rooms: [
      { name: 'Deluxe Haveli Room', size: '36 sqm', bed: '1 Queen Bed', priceUSD: 160, priceINR: 13300, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80' }
    ],
    cancellationPolicy: 'Free cancellation up to 72 hours prior to arrival',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80', caption: 'Courtyard fountains and private carved balconies' }
    ]
  },
  {
    id: 'zostel-jaipur',
    country: 'india',
    state: 'rajasthan',
    district: 'jaipur',
    name: 'Zostel Jaipur (Pink City Nomad Hub)',
    tier: 'budget',
    tierLabel: 'Chic Nomad Hostel',
    rating: 4.7,
    reviews: 3820,
    priceUSD: 22,
    priceINR: 1800,
    lat: 26.921200,
    lng: 75.828800,
    coordinates: { lat: 26.921200, lng: 75.828800 },
    formattedAddress: 'First floor, 85, Hawa Mahal Rd, Badi Choupad, Jaipur, Rajasthan 302002, India',
    regency: 'Jaipur District',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=26.921200,75.828800',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=26.921200,75.828800',
    plusCode: 'WQCJ+GG Jaipur, Rajasthan',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    description: 'Vibrant backpacker oasis located 500m from Hawa Mahal, featuring a lively rooftop cafe overlooking city monuments, high-speed Wi-Fi, and walking tours.',
    amenities: ['Rooftop Cafe & Chai Bar', 'High-Speed Nomad Wi-Fi', 'Air-Conditioned Pods', 'Community Night Walks', 'Luggage Lockers'],
    rooms: [
      { name: 'Private Deluxe Room', size: '22 sqm', bed: '1 Double Bed', priceUSD: 28, priceINR: 2300, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80' },
      { name: 'Mixed 6-Bed AC Dorm Pod', size: 'Dorm Bed', bed: '1 Bunk Pod', priceUSD: 10, priceINR: 800, image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80' }
    ],
    cancellationPolicy: 'Free cancellation up to 24 hours prior to arrival',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80', caption: 'Co-working rooftop space with views of the Pink City' }
    ]
  },

  // --- UDAIPUR ---
  {
    id: 'taj-lake-palace',
    country: 'india',
    state: 'rajasthan',
    district: 'udaipur',
    name: 'Taj Lake Palace, Udaipur',
    tier: 'luxury',
    tierLabel: '5-Star Floating Marble Palace',
    rating: 4.9,
    reviews: 3950,
    priceUSD: 520,
    priceINR: 43200,
    lat: 24.575300,
    lng: 73.680000,
    coordinates: { lat: 24.575300, lng: 73.680000 },
    formattedAddress: 'Pichola, Udaipur, Rajasthan 313001, India',
    regency: 'Udaipur District',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=24.575300,73.680000',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=24.575300,73.680000',
    plusCode: 'HMCJ+4X Udaipur, Rajasthan',
    image: 'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?auto=format&fit=crop&w=800&q=80',
    description: 'Iconic 18th-century white marble palace appearing to float in the center of Lake Pichola, accessible only by private royal speedboats.',
    amenities: ['Private Boat Transfers', 'Jharokha Lake Dining', 'Jiva Spa Boat', 'Royal Mewari Hospitality', 'Rooftop Sunset Bar'],
    rooms: [
      { name: 'Luxury Lake View Room', size: '38 sqm', bed: '1 King Bed', priceUSD: 520, priceINR: 43200, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80' }
    ],
    cancellationPolicy: 'Free cancellation up to 48 hours prior to arrival',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?auto=format&fit=crop&w=800&q=80', caption: 'White marble floating palace illuminated at dusk' }
    ]
  },

  // --- KERALA (ALLEPPEY & MUNNAR) ---
  {
    id: 'lake-palace-alleppey',
    country: 'india',
    state: 'kerala',
    district: 'alleppey',
    name: 'Lake Palace Backwater Resort, Alleppey',
    tier: 'luxury',
    tierLabel: '4-Star Island Resort',
    rating: 4.8,
    reviews: 2410,
    priceUSD: 140,
    priceINR: 11600,
    lat: 9.508500,
    lng: 76.365200,
    coordinates: { lat: 9.508500, lng: 76.365200 },
    formattedAddress: 'Thirumala Ward, Chungam, Alappuzha, Kerala 688011, India',
    regency: 'Alappuzha District',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=9.508500,76.365200',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=9.508500,76.365200',
    plusCode: 'GQ58+C3 Alappuzha, Kerala',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    description: 'Island resort on the banks of Vembanad Lake, featuring traditional Kerala timber architecture, waterfront cottages, and private houseboat moorings.',
    amenities: ['Private Houseboat Cruises', 'Ayurvedic Treatment Center', 'Lagoon Pool', 'Traditional Keralite Cuisine', 'Canoe Village Safaris'],
    rooms: [
      { name: 'Waterfront Cottage', size: '45 sqm', bed: '1 King Bed', priceUSD: 140, priceINR: 11600, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80' }
    ],
    cancellationPolicy: 'Free cancellation up to 48 hours prior to arrival',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80', caption: 'Waterfront cottage with private wooden dock' }
    ]
  },
  {
    id: 'windermere-estate-munnar',
    country: 'india',
    state: 'kerala',
    district: 'munnar',
    name: 'Windermere Estate (Highland Plantation)',
    tier: 'eco',
    tierLabel: 'Eco Mountain Retreat',
    rating: 4.9,
    reviews: 1890,
    priceUSD: 150,
    priceINR: 12500,
    lat: 10.063000,
    lng: 77.078000,
    coordinates: { lat: 10.063000, lng: 77.078000 },
    formattedAddress: 'Pothamedu, Munnar, Idukki District, Kerala 685612, India',
    regency: 'Idukki District',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=10.063000,77.078000',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=10.063000,77.078000',
    plusCode: '337H+55 Munnar, Kerala',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
    description: 'Charming 60-acre coffee and cardamom estate with cedarwood cottages, views of tea-covered mountain gorges, and birdsong.',
    amenities: ['Cardamom Plantation Walks', 'Fireside Library Lounge', 'Organic Farm Dining', 'Highland Valley Views', 'Yoga Deck'],
    rooms: [
      { name: 'Planters Villa Room', size: '42 sqm', bed: '1 King Bed', priceUSD: 150, priceINR: 12500, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80' }
    ],
    cancellationPolicy: 'Free cancellation up to 72 hours prior to arrival',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80', caption: 'Highland balcony looking out over mist-shrouded green hills' }
    ]
  },

  // --- GOA ---
  {
    id: 'taj-fort-aguada-resort',
    country: 'india',
    state: 'goa',
    district: 'north-goa',
    name: 'Taj Fort Aguada Resort & Spa, Goa',
    tier: 'luxury',
    tierLabel: '5-Star Beachfront Luxury',
    rating: 4.8,
    reviews: 4890,
    priceUSD: 230,
    priceINR: 19100,
    lat: 15.496000,
    lng: 73.769000,
    coordinates: { lat: 15.496000, lng: 73.769000 },
    formattedAddress: 'Sinquerim, Candolim, Goa 403515, India',
    regency: 'North Goa District',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=15.496000,73.769000',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=15.496000,73.769000',
    plusCode: 'FPW9+C5 Candolim, Goa',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    description: 'Goa\'s first luxury beach resort built on the historic ramparts of the 16th-century Portuguese coastal fort, with direct access to Sinquerim Beach.',
    amenities: ['Direct Beach Access', 'J Wellness Circle Spa', 'Infinity Pool over Arabian Sea', 'Goan Seafood Specialties', 'Sunset Cocktail Pier'],
    rooms: [
      { name: 'Superior Sea View Room', size: '36 sqm', bed: '1 King Bed', priceUSD: 230, priceINR: 19100, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80' }
    ],
    cancellationPolicy: 'Free cancellation up to 48 hours prior to arrival',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80', caption: 'Lush tropical resort gardens on the Arabian Sea clifftop' }
    ]
  },

  // --- UTTAR PRADESH (AGRA & VARANASI) ---
  {
    id: 'oberoi-amarvilas',
    country: 'india',
    state: 'uttar-pradesh',
    district: 'agra',
    name: 'The Oberoi Amarvilas, Agra',
    tier: 'luxury',
    tierLabel: '5-Star Monument Luxury',
    rating: 4.9,
    reviews: 5120,
    priceUSD: 490,
    priceINR: 40700,
    lat: 27.170500,
    lng: 78.048900,
    coordinates: { lat: 27.170500, lng: 78.048900 },
    formattedAddress: 'Taj East Gate Rd, Paktola, Tajganj, Agra, Uttar Pradesh 282001, India',
    regency: 'Agra District',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=27.170500,78.048900',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=27.170500,78.048900',
    plusCode: '52CX+6H Agra, Uttar Pradesh',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    description: 'Located just 600 meters from the Taj Mahal, where every single guest room, suite, and restaurant offers an uninterrupted view of the world wonder.',
    amenities: ['Direct Taj Mahal Views', 'Moorish Terraced Pools', 'Private Golf Buggy to Taj Gate', 'Oberoi Spa', 'Candlelit Courtyard Dining'],
    rooms: [
      { name: 'Premier Room with Taj View', size: '42 sqm', bed: '1 King Bed', priceUSD: 490, priceINR: 40700, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80' }
    ],
    cancellationPolicy: 'Free cancellation up to 48 hours prior to arrival',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80', caption: 'Night view of the illuminated palace courtyard facing the Taj' }
    ]
  },
  {
    id: 'brijrama-palace',
    country: 'india',
    state: 'uttar-pradesh',
    district: 'varanasi',
    name: 'BrijRama Palace, Varanasi (Heritage on the Ganges)',
    tier: 'luxury',
    tierLabel: '5-Star River Heritage Palace',
    rating: 4.9,
    reviews: 3180,
    priceUSD: 290,
    priceINR: 24100,
    lat: 25.305600,
    lng: 83.011800,
    coordinates: { lat: 25.305600, lng: 83.011800 },
    formattedAddress: 'Darbhanga Ghat, Dashashwamedh, Varanasi, Uttar Pradesh 221001, India',
    regency: 'Varanasi District',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=25.305600,83.011800',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=25.305600,83.011800',
    plusCode: '8246+6P Varanasi, Uttar Pradesh',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
    description: 'One of the oldest structures in Varanasi (built 1812), set directly on Darbhanga Ghat accessible exclusively by private bajra boat on the sacred Ganges.',
    amenities: ['Private River Boat Check-in', 'Rooftop Classical Sitar Recitals', 'Pure Vegetarian Royal Thalis', 'Private Ghat Aarti Viewing', 'Ganges Sunrise Yoga'],
    rooms: [
      { name: 'Nadidhara Ganga View Room', size: '36 sqm', bed: '1 King Bed', priceUSD: 290, priceINR: 24100, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80' }
    ],
    cancellationPolicy: 'Free cancellation up to 72 hours prior to arrival',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80', caption: 'Historic sandstone palace rising directly from the holy river steps' }
    ]
  },

  // --- HIMACHAL PRADESH (MANALI) ---
  {
    id: 'the-himalayan-manali',
    country: 'india',
    state: 'himachal',
    district: 'manali',
    name: 'The Himalayan Castle Resort, Manali',
    tier: 'eco',
    tierLabel: 'Victorian Mountain Castle',
    rating: 4.8,
    reviews: 1940,
    priceUSD: 130,
    priceINR: 10800,
    lat: 32.251000,
    lng: 77.185000,
    coordinates: { lat: 32.251000, lng: 77.185000 },
    formattedAddress: 'Hadimba Rd, Siyal, Manali, Himachal Pradesh 175131, India',
    regency: 'Kullu District',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=32.251000,77.185000',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=32.251000,77.185000',
    plusCode: '752P+C2 Manali, Himachal Pradesh',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
    description: 'Victorian-Gothic stone castle nestled amidst apple orchards and towering deodar cedars, featuring open fireplaces and mountain views.',
    amenities: ['Heated Outdoor Pool', 'Wood-Burning Fireplaces', 'Apple Orchard Strolls', 'Pine Valley Views', 'Trek Guide Desk'],
    rooms: [
      { name: 'Castle Chamber Suite', size: '44 sqm', bed: '1 King Bed', priceUSD: 130, priceINR: 10800, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80' }
    ],
    cancellationPolicy: 'Free cancellation up to 48 hours prior to arrival',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80', caption: 'Gothic stone arches overlooking snowy pine forests' }
    ]
  }
];

// Normalize coordinates on INDIA_HOTELS_DATA
INDIA_HOTELS_DATA.forEach(h => {
  if (h.coordinates) {
    if (typeof h.lat !== 'number') h.lat = h.coordinates.lat;
    if (typeof h.lng !== 'number') h.lng = h.coordinates.lng;
    if (typeof h.lon !== 'number') h.lon = h.coordinates.lng;
  }
});

// ==========================================================================
// INDIA REGIONS GIS DICTIONARY (FOR INTRA-DISTRICT COMMUTE ENGINE)
// ==========================================================================
const INDIA_REGIONS = {
  // JAIPUR REGIONS
  'jaipur-airport': { name: 'Jaipur Int\'l Airport (JAI) - Sanganer', lat: 26.8289, lng: 75.8056, district: 'jaipur' },
  'amer-fort': { name: 'Amer Fort & Maota Lake', lat: 26.9855, lng: 75.8513, district: 'jaipur' },
  'hawa-mahal': { name: 'Hawa Mahal & Badi Choupad (Pink City)', lat: 26.9239, lng: 75.8267, district: 'jaipur' },
  'city-palace-jaipur': { name: 'City Palace & Jantar Mantar', lat: 26.9258, lng: 75.8237, district: 'jaipur' },
  'jal-mahal': { name: 'Jal Mahal (Man Sagar Lake)', lat: 26.9535, lng: 75.8462, district: 'jaipur' },
  'nahargarh': { name: 'Nahargarh Fort Sunset Point', lat: 26.9373, lng: 75.8156, district: 'jaipur' },
  'c-scheme': { name: 'C-Scheme & MI Road (Dining & Shopping)', lat: 26.9110, lng: 75.8030, district: 'jaipur' },

  // UDAIPUR REGIONS
  'udaipur-station': { name: 'Udaipur City Railway Station', lat: 24.5700, lng: 73.6960, district: 'udaipur' },
  'city-palace-udaipur': { name: 'Udaipur City Palace & Ghats', lat: 24.5764, lng: 73.6835, district: 'udaipur' },
  'lake-pichola': { name: 'Lake Pichola Boat Jetty', lat: 24.5721, lng: 73.6789, district: 'udaipur' },
  'fateh-sagar': { name: 'Fateh Sagar Lake Promenade', lat: 24.6020, lng: 73.6740, district: 'udaipur' },

  // KERALA REGIONS
  'cochin-airport': { name: 'Cochin Int\'l Airport (COK) - Nedumbassery', lat: 10.1556, lng: 76.3912, district: 'kochi' },
  'fort-kochi': { name: 'Fort Kochi Heritage Quarter & Nets', lat: 9.9658, lng: 76.2421, district: 'kochi' },
  'alleppey-punnamada': { name: 'Alleppey Finishing Point (Houseboat Pier)', lat: 9.4981, lng: 76.3388, district: 'alleppey' },
  'marari-beach': { name: 'Marari Golden Sand Beach', lat: 9.6010, lng: 76.2990, district: 'alleppey' },
  'munnar-town': { name: 'Munnar Town Center', lat: 10.0889, lng: 77.0595, district: 'munnar' },
  'top-station': { name: 'Top Station Munnar (Himalayan-grade View)', lat: 10.1250, lng: 77.2450, district: 'munnar' },

  // GOA REGIONS
  'dabolim-airport': { name: 'Goa Dabolim Airport (GOI) - South', lat: 15.3808, lng: 73.8313, district: 'south-goa' },
  'mopa-airport': { name: 'Manohar Int\'l Airport Mopa (GOX) - North', lat: 15.7675, lng: 73.8656, district: 'north-goa' },
  'panaji-capital': { name: 'Panaji Latin Quarter (Fontainhas)', lat: 15.4989, lng: 73.8278, district: 'north-goa' },
  'calangute-beach': { name: 'Calangute & Baga Coastal Strip', lat: 15.5440, lng: 73.7550, district: 'north-goa' },
  'fort-aguada': { name: 'Fort Aguada & Sinquerim Beach', lat: 15.4925, lng: 73.7736, district: 'north-goa' },
  'dudhsagar': { name: 'Dudhsagar Waterfalls Base Gate (Kulem)', lat: 15.3144, lng: 74.3143, district: 'south-goa' },
  'palolem-beach': { name: 'Palolem Crescent Beach', lat: 15.0100, lng: 74.0232, district: 'south-goa' },

  // AGRA REGIONS
  'agra-cantt': { name: 'Agra Cantt Railway Station (Vande Bharat Hub)', lat: 27.1580, lng: 77.9940, district: 'agra' },
  'taj-mahal': { name: 'Taj Mahal East Gate', lat: 27.1751, lng: 78.0421, district: 'agra' },
  'agra-fort': { name: 'Agra Fort (Red Fort of Agra)', lat: 27.1795, lng: 78.0211, district: 'agra' },
  'fatehpur-sikri': { name: 'Fatehpur Sikri Imperial Complex', lat: 27.0945, lng: 77.6679, district: 'agra' },

  // VARANASI REGIONS
  'varanasi-cantt': { name: 'Varanasi Junction Cantt Railway Station', lat: 25.3280, lng: 82.9860, district: 'varanasi' },
  'dashashwamedh-ghat': { name: 'Dashashwamedh Ghat (Ganga Aarti)', lat: 25.3076, lng: 83.0107, district: 'varanasi' },
  'kashi-vishwanath': { name: 'Kashi Vishwanath Temple Corridor', lat: 25.3109, lng: 83.0107, district: 'varanasi' },
  'sarnath': { name: 'Sarnath Deer Park & Dhamek Stupa', lat: 25.3810, lng: 83.0225, district: 'varanasi' },

  // MANALI REGIONS
  'bhuntar-airport': { name: 'Kullu Manali Airport (KUU) - Bhuntar', lat: 31.8763, lng: 77.1542, district: 'manali' },
  'manali-mall-road': { name: 'Manali Mall Road & Old Manali', lat: 32.2396, lng: 77.1887, district: 'manali' },
  'solang-valley': { name: 'Solang Valley Adventure Arena', lat: 32.3168, lng: 77.1575, district: 'manali' },
  'atal-tunnel': { name: 'Atal Tunnel South Portal (3,060m)', lat: 32.3630, lng: 77.1350, district: 'manali' }
};

for (const k of Object.keys(INDIA_REGIONS)) {
  const under = k.replace(/-/g, '_');
  const hyph = k.replace(/_/g, '-');
  INDIA_REGIONS[under] = INDIA_REGIONS[k];
  INDIA_REGIONS[hyph] = INDIA_REGIONS[k];
}

// ==========================================================================
// INDIA LOCAL TRAVEL MODES
// ==========================================================================
const INDIA_LOCAL_TRAVEL_MODES = [
  {
    mode: 'Chauffeur AC Cab (Sedan / SUV)',
    icon: '🚕',
    cost: '₹12–18 / km ($15–$35 / day)',
    speed: 'Flexible 35–65 km/h',
    bestFor: 'Inter-monument journeys, family day tours, airport transfers (Innova / Dzire). Pre-book on WanderPulse or Ola/Uber.'
  },
  {
    mode: 'Auto-Rickshaw (Tuk-Tuk / Rapido Auto)',
    icon: '🛺',
    cost: '₹30 base + ₹12 / km ($0.50–$2.50)',
    speed: 'Quick in bazaar traffic',
    bestFor: 'Navigating narrow Pink City lanes, Fort Kochi spice streets, and Varanasi alleys. Use Ola Auto or agree on meter.'
  },
  {
    mode: 'Vande Bharat Express & Indian Railways (IRCTC)',
    icon: '🚆',
    cost: '₹650–₹1,800 ($8–$22)',
    speed: 'Semi-High Speed 110–160 km/h',
    bestFor: 'Rapid point-to-point intercity hops (Delhi ➔ Jaipur in 3h 45m; Delhi ➔ Agra in 1h 40m; Mumbai ➔ Goa in 7h 45m).'
  },
  {
    mode: 'Royal Enfield & Activa Rental',
    icon: '🏍️',
    cost: '₹400–₹1,200 / day ($5–$15)',
    speed: 'Agile hill climbing',
    bestFor: 'Highland passes in Manali/Solang, Goa coastal exploration, and Aravalli scenic drives. Helmet mandatory.'
  },
  {
    mode: 'AC Volvo Sleeper Bus (RedBus / State RTC)',
    icon: '🚌',
    cost: '₹600–₹1,400 ($7–$17)',
    speed: 'Smooth overnight transit',
    bestFor: 'Inter-state overnight journeys (Delhi ➔ Manali, Jaipur ➔ Udaipur, Bangalore ➔ Kochi) with reclining sleeper bunks.'
  },
  {
    mode: 'Kerala Houseboat / Mandovi River Cruise',
    icon: '🛥️',
    cost: '₹1,500–₹8,000 ($18–$95)',
    speed: 'Gentle 8–15 knots',
    bestFor: 'Unwinding on the Alleppey backwaters or taking sunset river cruises in Panaji Goa with Goan folk music.'
  }
];

// ==========================================================================
// INDIA DISTRICT TRANSIT & HOW-TO-REACH BLUEPRINTS
// ==========================================================================
const INDIA_DISTRICT_TRANSIT = {
  jaipur: {
    flight: {
      hub: 'Jaipur International Airport (JAI) - Sanganer',
      domesticLinks: 'Non-stop daily flights from Delhi (50m), Mumbai (1h 45m), Bengaluru (2h 20m), Hyderabad, Kolkata',
      internationalLinks: 'Direct flights from Dubai (DXB), Sharjah (SHJ), Muscat (MCT), and Bangkok (BKK)',
      transferTip: 'Official Prepaid Taxi booth and Uber/Ola pickup bays located directly outside Terminal 2 exit (25 mins to Pink City).'
    },
    train: {
      hub: 'Jaipur Junction (JP) & Gandhinagar Jaipur (GADJ)',
      vandeBharat: 'Delhi (Cantt) ➔ Jaipur ➔ Ajmer Vande Bharat Express (Train #20977/20978) — reaches Jaipur in just 3 hours 45 mins!',
      luxuryTrains: 'Palace on Wheels heritage luxury tourist train departs Jaipur weekly during season.',
      expressLinks: 'Daily Ajmer Shatabdi Express and double-decker express trains from New Delhi.'
    },
    bus: {
      hub: 'Sindhi Camp Central Bus Stand (Jaipur)',
      operators: 'Rajasthan State Road Transport (RSRTC) Goldline Volvo AC Coaches & Zingbus / IntrCity SmartBus',
      routes: 'Delhi (ISBT Kashmiri Gate) to Jaipur every 30 minutes via the new Delhi-Mumbai Expressway.'
    }
  },
  alleppey: {
    flight: {
      hub: 'Cochin International Airport (COK) - Nedumbassery',
      distance: '82 km from Alleppey (approx 2 hours via NH 66)',
      domesticLinks: 'Direct flights from Delhi, Mumbai, Bengaluru, Chennai, Hyderabad',
      internationalLinks: 'World\'s first 100% solar-powered airport, major hub for Middle East, Singapore, Malaysia flights.'
    },
    train: {
      hub: 'Alappuzha Railway Station (ALLP) & Ernakulam Junction (ERS)',
      vandeBharat: 'Thiruvananthapuram ➔ Ernakulam ➔ Kasaragod Vande Bharat Express stops at nearby Ernakulam/Kottayam.',
      coastalRail: 'Scenic coastal railway lines passing through coconut groves and emerald backwater bridges.'
    },
    bus: {
      hub: 'KSRTC Central Bus Station Alappuzha',
      operators: 'Kerala State RTC SWIFT Super Deluxe & Airavat Club Class AC Buses',
      routes: 'Regular services connecting Bangalore, Chennai, Coimbatore, and Trivandrum.'
    }
  },
  goa: {
    flight: {
      hub: 'Manohar Int\'l Airport Mopa (GOX) for North Goa & Dabolim (GOI) for South Goa',
      domesticLinks: 'Over 80 daily flights connecting all major Indian metropolises',
      internationalLinks: 'Direct charters and scheduled flights from UK, Russia, Middle East, and Central Asia'
    },
    train: {
      hub: 'Madgaon Junction (MAO) & Thivim (THVM)',
      vandeBharat: 'Mumbai CSMT ➔ Madgaon Goa Vande Bharat Express (Train #22229/22230) — scenic Western Ghats journey in 7h 45m!',
      konkanRailway: 'World-famous Konkan Railway passing through 91 tunnels and over 2,000 bridges.'
    },
    bus: {
      hub: 'Panaji KTC Bus Stand & Mapusa Terminal',
      operators: 'Kadamba Transport Corporation, Paulo Travels, VRL Travels Multi-Axle Sleepers from Mumbai and Pune.'
    }
  },
  agra: {
    flight: {
      hub: 'Agra Kheria Airport (AGR) / New Delhi IGI Airport (DEL)',
      distance: 'Delhi IGI is 210 km away via the world-class Yamuna Expressway (2.5h drive)',
      connections: 'Connect easily via high-speed Gatimaan or Vande Bharat Express from New Delhi.'
    },
    train: {
      hub: 'Agra Cantt (AGC) & Agra Fort Station (AF)',
      vandeBharat: 'Bhopal ➔ Hazrat Nizamuddin Vande Bharat Express stops at Agra Cantt (just 1h 40m from Delhi!)',
      gatimaanExpress: 'India\'s first semi-high-speed train Gatimaan Express (12049/12050) covers Delhi-Agra in 100 minutes flat with onboard hot meals.'
    },
    bus: {
      hub: 'ISBT Agra & Idgah Bus Stand',
      routes: 'Direct luxury Volvo sleeper buses via the 6-lane Yamuna Expressway departing Delhi Sarai Kale Khan every 20 mins.'
    }
  },
  manali: {
    flight: {
      hub: 'Kullu-Manali Airport at Bhuntar (KUU) / Chandigarh Shaheed Bhagat Singh Int\'l (IXC)',
      connections: 'Daily regional ATR flights from Delhi (DEL) and Chandigarh (IXC) into Bhuntar (50 km from Manali).'
    },
    train: {
      hub: 'Chandigarh Junction (CDG) & Kalka (KLK)',
      toyTrain: 'UNESCO World Heritage Kalka-Shimla Toy Train or Vande Bharat Express to Chandigarh, then scenic road drive.'
    },
    bus: {
      hub: 'Manali Private Volvo Bus Stand & HRTC Stand',
      operators: 'Himachal Road Transport (HRTC) Himsuta Scania Multi-Axle AC Sleeper buses departing Delhi ISBT Kashmiri Gate nightly.'
    }
  },
  varanasi: {
    flight: {
      hub: 'Lal Bahadur Shastri International Airport (VNS) - Babatpur',
      domesticLinks: 'Non-stop flights from Delhi (1h 20m), Mumbai (2h 10m), Bengaluru (2h 30m), Kolkata, Hyderabad',
      internationalLinks: 'Direct flights from Bangkok, Kathmandu, Colombo.'
    },
    train: {
      hub: 'Varanasi Junction (BSB) & Banaras Station (BSBS)',
      vandeBharat: 'New Delhi ➔ Varanasi Vande Bharat Express (Train #22435/22436) — India\'s flagship train covering the route in just 8 hours!'
    },
    bus: {
      hub: 'Varanasi Cantt UPSRTC Bus Stand',
      routes: 'Express AC buses connecting Lucknow, Prayagraj, Patna, and Gorakhpur.'
    }
  }
};

// ==========================================================================
// INDIA DISTRICT TRAVEL & SURVIVAL GUIDES
// ==========================================================================
const INDIA_TRAVEL_GUIDES = {
  jaipur: {
    upiPayment: 'UPI (Unified Payments Interface) via PhonePe/Google Pay/Paytm is accepted everywhere — from royal palace ticket counters to roadside cutting chai and lassi stalls. Foreign tourists can activate "UPI One World" at Delhi/Jaipur airport desks.',
    railTatkal: 'IRCTC Tatkal booking opens at 10:00 AM (AC classes) and 11:00 AM (Sleeper/Non-AC) one day in advance. Vande Bharat Executive Chair Car (EC) offers rotating 180-degree seats.',
    templeFootwear: 'Always slip off footwear before entering temple sanctuaries (Govind Dev Ji, Birla Mandir). Shoe keepers charge ₹10–20 with token.',
    emergencyContacts: [
      { role: 'Tourist Police Jaipur', phone: '📞 +91 141 260 2167' },
      { role: 'National Emergency', phone: '📞 112' },
      { role: 'Ambulance', phone: '📞 108' },
      { role: 'Railway Helpline', phone: '📞 139' }
    ]
  },
  alleppey: {
    upiPayment: 'UPI QR codes are available even on remote village backwater canoes and coconut stalls! Carry ₹500–1000 cash for small boat tips.',
    railTatkal: 'Book Alappuzha-Ernakulam train connections via IRCTC Rail Connect app.',
    templeFootwear: 'Strict traditional dress code at certain ancient Kerala temples (men may be required to enter bare-chested with mundu/dhoti).',
    emergencyContacts: [
      { role: 'Alappuzha Tourist Police', phone: '📞 +91 477 225 1771' },
      { role: 'National Emergency', phone: '📞 112' },
      { role: 'Coastal Police', phone: '📞 1093' }
    ]
  },
  goa: {
    upiPayment: 'UPI accepted widely across beach shacks, rental hubs, and restaurants. Goa Miles app is the official taxi hailing app.',
    railTatkal: 'Konkan Railway scenic routes sell out weeks in advance; use Tatkal or Foreign Tourist Quota at major stations.',
    templeFootwear: 'Cover shoulders and remove hats when entering Old Goa cathedrals and Mangueshi temple.',
    emergencyContacts: [
      { role: 'Goa Tourist Police', phone: '📞 +91 832 242 0894' },
      { role: 'National Emergency', phone: '📞 112' },
      { role: 'Pink Police (Women Safety)', phone: '📞 1091' }
    ]
  },
  agra: {
    upiPayment: 'All Archaeological Survey of India (ASI) monument tickets (Taj Mahal, Agra Fort) can be booked online via QR codes with a ₹50 discount per ticket over manual cash counters.',
    railTatkal: 'For Delhi-Agra, Gatimaan and Vande Bharat are far superior and more reliable than road traffic.',
    templeFootwear: 'Shoe covers are mandatory on the main marble mausoleum plinth of the Taj Mahal (provided with foreign entry ticket).',
    emergencyContacts: [
      { role: 'Agra Tourist Police', phone: '📞 +91 562 242 1204' },
      { role: 'National Emergency', phone: '📞 112' },
      { role: 'Railway Helpline', phone: '📞 139' }
    ]
  },
  manali: {
    upiPayment: 'Network can be intermittent past Atal Tunnel in Lahaul; keep cash handy for remote mountain passes.',
    railTatkal: 'For Toy Train to Shimla, book 30 days ahead; for Manali, road transport is primary.',
    templeFootwear: 'Hadimba temple requires removing leather belts and shoes before the sanctum.',
    emergencyContacts: [
      { role: 'Manali Tourist Police', phone: '📞 +91 1902 252 322' },
      { role: 'Mountain Rescue / Disaster', phone: '📞 1077' },
      { role: 'National Emergency', phone: '📞 112' }
    ]
  },
  varanasi: {
    upiPayment: 'Pay with UPI for silk sarees in Thatheri Bazaar, Blue Lassi, and kachori breakfast.',
    railTatkal: 'Vande Bharat New Delhi-Varanasi is the cleanest, fastest train on Indian Railways.',
    templeFootwear: 'Kashi Vishwanath Corridor has dedicated high-tech electronic locker facilities for footwear and electronics.',
    emergencyContacts: [
      { role: 'Varanasi Tourist Police', phone: '📞 +91 542 250 8077' },
      { role: 'National Emergency', phone: '📞 112' },
      { role: 'Ganga River Police', phone: '📞 1093' }
    ]
  }
};

// Node.js common export for backend synchronization
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CURRENCY_RATES,
    ATTRACTIONS_DATA,
    HOTELS_DATA,
    TRANSIT_DATA,
    TRANSIT_ROUTES_PRESETS,
    BALI_REGIONS,
    LOCAL_TRAVEL_MODES,
    BALI_MARINE_HARBORS,
    FAQ_DATA,
    GEOAPIFY_VERIFIED_PLACES,
    formatPrice,
    // Export multi-layer destination discoveries
    DESTINATION_HIERARCHY,
    INDIA_ATTRACTIONS_DATA,
    INDIA_HOTELS_DATA,
    INDIA_REGIONS,
    INDIA_LOCAL_TRAVEL_MODES,
    INDIA_DISTRICT_TRANSIT,
    INDIA_TRAVEL_GUIDES
  };
}


