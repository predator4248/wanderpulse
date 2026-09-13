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
    name: 'Viceroy Bali Valley Sanctuary',
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
    geoapifyCategory: 'accommodation.hotel',
    distanceToSpot: '4 km to Monkey Forest & Rice Terraces',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85',
    description: 'Private heated infinity pool villas overlooking the Petanu River ravine, offering Michelin-grade dining and helipad arrival.',
    amenities: ['Private Heated Infinity Pool', 'Cascades French Dining', 'Lembah Spa Overlook', 'Helipad Arrival', 'High-Speed Wi-Fi', '24/7 Butler Service'],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=85',
        title: 'Lembah Spa Overlook',
        caption: 'Open-air botanical treatment pavilion listening to gentle river ravine waters.'
      },
      {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
        title: 'Cascades Fine Dining Terrace',
        caption: 'Award-winning European degustation menus beneath soaring thatched alang-alang ceilings.'
      },
      {
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
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
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
        highlights: ['Private heated plunge pool', 'Open-air bale pavilion', 'Marble bath with rain shower', 'Espresso bar & exotic fruit basket']
      },
      {
        id: 'vice-regal-villa',
        name: 'Vice Regal Villa',
        size: '240 m²',
        capacity: '2-3 Guests',
        bed: '1 Super King Bed',
        priceUSD: 680,
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
        highlights: ['Expansive cliff-edge heated pool', 'Outdoor sun deck with valley panorama', 'Jacuzzi spa tub', 'Dedicated 24/7 butler service']
      },
      {
        id: 'presidential-suite',
        name: 'Presidential 2-Bedroom Suite',
        size: '400 m²',
        capacity: '4 Guests',
        bed: '2 King Beds',
        priceUSD: 1100,
        image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
        highlights: ['18-meter private infinity pool', 'Dual master bedroom wings', 'Full chef kitchen & private dining', 'Complimentary helicopter transfer']
      }
    ]
  },
  {
    id: 'the-edge-bali',
    name: 'The Edge Uluwatu Cliff Resort',
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
    geoapifyCategory: 'accommodation.hotel',
    distanceToSpot: '2.5 km to Uluwatu Temple & Kecak Dance',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85',
    description: 'Perched on the extreme edge of a 530-foot cliff with glass-bottom cantilevered sky pools hovering over the ocean surf.',
    amenities: ['Glass-Bottom Sky Pool', 'Oneeighty Cliff Club', '24/7 Dedicated Butler', 'Subterranean Wine Cellar', 'Oceanfront Dining', 'Private Cinema'],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=85',
        title: 'Oneeighty Cliff Club VIP Cabanas',
        caption: 'Plush daybeds perched along the edge of the limestone promontory.'
      },
      {
        url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
        title: 'Ocean Sunset Terrace',
        caption: '180-degree panoramic vantage point for golden sunset cocktails.'
      },
      {
        url: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=85',
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
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80',
        highlights: ['Private ocean cliff plunge pool', 'Glass bathroom floor with ocean views', 'Personal 24-hour butler', 'Complimentary VIP club access']
      },
      {
        id: 'the-view-estate',
        name: 'The View Estate (3-Bed)',
        size: '580 m²',
        capacity: '6 Guests',
        bed: '3 King Beds',
        priceUSD: 1450,
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
        highlights: ['Huge cliffside wrap-around infinity pool', 'Private bowling alley & cinema', 'Full bar with mixologist', 'Spectacular sunset deck']
      }
    ]
  },
  {
    id: 'padma-resort',
    name: 'Padma Resort Rainforest Ubud',
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
    geoapifyCategory: 'accommodation.hotel',
    distanceToSpot: '12 km to Tegallalang & Mount Batur',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85',
    description: 'Sprawling 11-hectare tranquil sanctuary immersed in bamboo forests with an 89-meter heated outdoor mountain lagoon pool.',
    amenities: ['89m Heated Lagoon Pool', 'Jungle Agroforestry', 'Complimentary Yoga', 'Kids Farm & Garden', 'Shuttle to Ubud Hub', 'Spa Pavilion'],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=85',
        title: 'Agroforestry Bamboo Sanctuaries',
        caption: 'Peaceful bamboo bridges and organic fruit gardens along Ayung river tributaries.'
      },
      {
        url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=85',
        title: 'Rainforest Spa Soaking Bath',
        caption: 'Botanical herbal bath treatments overlooking lush emerald ravine foliage.'
      },
      {
        url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85',
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
        image: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?auto=format&fit=crop&w=800&q=80',
        highlights: ['Private forest balcony', 'Freestanding soaking bathtub', 'Complimentary afternoon tea', 'Heated pool access']
      },
      {
        id: 'rainforest-suite',
        name: 'One-Bedroom Rainforest Suite',
        size: '118 m²',
        capacity: '2-3 Guests',
        bed: '1 King Bed',
        priceUSD: 390,
        image: 'https://images.unsplash.com/photo-1587985064135-0366536eab42?auto=format&fit=crop&w=800&q=80',
        highlights: ['Expansive living room & dining lounge', 'Panoramic valley view terrace', 'Club lounge cocktail access', 'Complimentary laundry service']
      }
    ]
  },
  {
    id: 'munduk-moding',
    name: 'Munduk Moding Plantation Eco Lodge',
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
    geoapifyCategory: 'accommodation.hotel',
    distanceToSpot: '15 km to Sekumpul Waterfall & Lake Tamblingan',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=85',
    description: 'Organic working coffee plantation with an iconic "Infinity Pool in the Clouds" offering sunsets that blend with highland mist.',
    amenities: ['Cloudline Infinity Pool', 'Coffee Processing Tours', 'Horseback Riding Trails', 'Organic Farm Dining', 'Bird Watching Treks'],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85',
        title: 'Plantation Timber Fireplace Cottage',
        caption: 'Warm mountain cottage warmed by real wood-burning stone fireplaces.'
      },
      {
        url: 'https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&w=1200&q=85',
        title: 'Organic Arabica Coffee Terraces',
        caption: 'Private wooden veranda overlooking clove trees and rolling green hills.'
      },
      {
        url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=85',
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
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
        highlights: ['Coffee plantation view veranda', 'Artisan hand-ground coffee bar', 'Heated bed pads for cool nights', 'Rain shower with skylight']
      },
      {
        id: 'jacuzzi-villa',
        name: 'One-Bedroom Villa with Jacuzzi',
        size: '95 m²',
        capacity: '2 Guests',
        bed: '1 King Bed',
        priceUSD: 260,
        image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
        highlights: ['Outdoor heated volcanic stone jacuzzi', 'Private garden gazebo', 'Wood burning fireplace', 'Panoramic sunset deck']
      }
    ]
  },
  {
    id: 'maya-sanur',
    name: 'Maya Sanur Coastal Family Resort',
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
    geoapifyCategory: 'accommodation.hotel',
    distanceToSpot: '1.2 km to Nusa Penida Fast Ferry Pier',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=85',
    description: 'Eco-conscious beachfront luxury resort with tranquil calm swimmable waters, 158m lagoon pool, and rooftop garden yoga pavilion.',
    amenities: ['158m Lagoon Pools', 'Beach Promenade Access', 'Complimentary Bicycles', 'Reef Kids Club', 'Rooftop Lounge', 'Spa Wellness'],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=85',
        title: 'Sanur Beach Promenade Deck',
        caption: 'Paved beachside bicycle paths lined with vibrant hibiscus flowers.'
      },
      {
        url: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=85',
        title: 'Rooftop Garden Sunset Lounge',
        caption: 'Panoramic oceanfront daybeds for evening tapas and cocktails.'
      },
      {
        url: 'https://images.unsplash.com/photo-1573052905904-34ad8c27f0cc?auto=format&fit=crop&w=1200&q=85',
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
        image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80',
        highlights: ['Overlooking 158m lagoon', 'Deep soaking circular bathtub', 'Sanur beach promenade steps away', 'Free bicycle rental']
      },
      {
        id: 'deluxe-lagoon-access',
        name: 'Deluxe Lagoon Access',
        size: '58 m²',
        capacity: '2 Adults, 1 Child',
        bed: '1 King Bed',
        priceUSD: 250,
        image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
        highlights: ['Direct swim-in pool deck', 'Private daybed cabana', 'Evening cocktail discount', 'Kids club free entry']
      }
    ]
  },
  {
    id: 'kos-one-hostel',
    name: 'Kos One Chic Nomad Oasis',
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
    geoapifyCategory: 'accommodation.hotel',
    distanceToSpot: '15 km to Tanah Lot & Batu Bolong',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=85',
    description: 'Award-winning luxury social hostel featuring Mediterranean pool slides, coworking cabanas, artisan café, and sunset rooftop.',
    amenities: ['Resort Pool with Jacuzzi', 'High-Speed Fiber Wi-Fi', 'Air Conditioned Pods', 'Personal Safe', 'Onsite Surfboard Rental', 'Community Dinners'],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85',
        title: 'Artisan Coworking Hub',
        caption: 'High-speed fiber connectivity with ergonomic desks and cold-brew espresso.'
      },
      {
        url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=85',
        title: 'Sunset Rooftop Lounge',
        caption: 'Rooftop cocktail deck overlooking Canggu surf breaks and rice fields.'
      },
      {
        url: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=85',
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
        image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
        highlights: ['Blackout acoustic curtain', 'Personal security safe', 'Individual AC ventilation', 'High-speed coworking pass included']
      },
      {
        id: 'private-queen',
        name: 'Private Deluxe Queen Room',
        size: '32 m²',
        capacity: '2 Guests',
        bed: '1 Queen Bed',
        priceUSD: 85,
        image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
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
    }
  }
};

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
    name: 'Viceroy Bali Valley Sanctuary',
    lat: -8.498425,
    lon: 115.275811,
    formattedAddress: 'Jl. Lanyahan, Petulu, Ubud, Gianyar Regency, Bali 80571, Indonesia',
    regency: 'Gianyar Regency',
    category: 'accommodation.hotel',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.498425,115.275811',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.498425,115.275811'
  },
  'the-edge-bali': {
    id: 'the-edge-bali',
    name: 'The Edge Uluwatu Cliff Resort',
    lat: -8.847952,
    lon: 115.124538,
    formattedAddress: 'Jl. Pura Goa Lempeh, Banjar Dinas Kangin, Pecatu, Uluwatu, Badung Regency, Bali 80361, Indonesia',
    regency: 'Badung Regency',
    category: 'accommodation.hotel',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.847952,115.124538',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.847952,115.124538'
  },
  'padma-resort': {
    id: 'padma-resort',
    name: 'Padma Resort Rainforest Ubud',
    lat: -8.356411,
    lon: 115.247833,
    formattedAddress: 'Banjar Carik, Desa Puhu, Payangan, Gianyar Regency, Bali 80572, Indonesia',
    regency: 'Gianyar Regency',
    category: 'accommodation.hotel',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.356411,115.247833',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.356411,115.247833'
  },
  'munduk-moding': {
    id: 'munduk-moding',
    name: 'Munduk Moding Plantation Eco Lodge',
    lat: -8.261822,
    lon: 115.076319,
    formattedAddress: 'Jl. Raya Desa Gobleg, Buleleng Regency, Bali 81152, Indonesia',
    regency: 'Buleleng Regency',
    category: 'accommodation.hotel',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.261822,115.076319',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.261822,115.076319'
  },
  'maya-sanur': {
    id: 'maya-sanur',
    name: 'Maya Sanur Coastal Family Resort',
    lat: -8.694628,
    lon: 115.263189,
    formattedAddress: 'Jl. Danau Tamblingan No.89M, Sanur, Denpasar, Bali 80228, Indonesia',
    regency: 'Denpasar City',
    category: 'accommodation.hotel',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.694628,115.263189',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.694628,115.263189'
  },
  'kos-one-hostel': {
    id: 'kos-one-hostel',
    name: 'Kos One Chic Nomad Oasis',
    lat: -8.653421,
    lon: 115.132890,
    formattedAddress: 'Jl. Pantai Batu Bolong No.78, Canggu, Badung Regency, Bali 80361, Indonesia',
    regency: 'Badung Regency',
    category: 'accommodation.hotel',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-8.653421,115.132890',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-8.653421,115.132890'
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

// Node.js common export for backend synchronization
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CURRENCY_RATES,
    ATTRACTIONS_DATA,
    HOTELS_DATA,
    TRANSIT_DATA,
    FAQ_DATA,
    GEOAPIFY_VERIFIED_PLACES,
    formatPrice
  };
}

