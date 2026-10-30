export const fleetData = [
  {
    id: 'model-y',
    name: 'Tesla Model Y Long Range',
    category: '100% Pure EV',
    categories: ['Midsize/SUV', 'Premium'],
    range: '330 mi',
    topSpeed: '135 mph',
    battery: '100%',
    price: 89,
    badgeColor: '#D8F3DC',
    image: `${import.meta.env.BASE_URL}cars/tesla-model-y.jpg`,
    acceleration: '4.8s 0-60',
    seats: '5 Adults',
    drive: 'Dual Motor AWD',
    chargingSpeed: '250 kW (15 min for 162 mi)',
    batteryCapacity: '81 kWh',
    luggage: '76 cu ft cargo',
    autopilot: 'Tesla Autopilot Included',
    description: 'The world’s best-selling electric crossover. Exceptional all-weather Dual Motor AWD, unmatched Supercharger network access, and expansive panoramic glass roof.',
    features: [
      'Complimentary Supercharging access',
      'Contactless NFC mobile digital key',
      'Premium 14-speaker audio system',
      'Panoramic UV-blocking glass roof',
      'HEPA Bioweapon Defense air filtration'
    ]
  },
  {
    id: 'tesla-roadster',
    name: 'Tesla Roadster (Next-Gen)',
    category: 'Hypercar • SpaceX Spec',
    categories: ['Sports/Performance', 'Premium'],
    range: '620 mi',
    topSpeed: '250+ mph',
    battery: '100%',
    price: 289,
    badgeColor: '#FEE2E2',
    image: `${import.meta.env.BASE_URL}cars/tesla-roadster.jpg`,
    acceleration: '< 1.9s 0-60',
    seats: '4 Adults',
    drive: 'Tri-Motor AWD',
    chargingSpeed: '350 kW V4 Supercharge',
    batteryCapacity: '200 kWh',
    luggage: 'Removable Glass Roof',
    autopilot: 'Full Self-Driving Included',
    description: 'The quickest accelerating production car ever built. Features a 200 kWh structural battery pack for over 600 miles of range, tri-motor all-wheel drive with torque vectoring, and a removable lightweight glass roof.',
    features: [
      'Sub-1.9s 0-60 mph with torque vectoring',
      '620 miles single-charge EPA estimated range',
      'Removable lightweight glass targa roof',
      'Complimentary V4 Supercharging access',
      'Full Self-Driving (Supervised) included'
    ]
  },
  {
    id: 'ioniq-5',
    name: 'Hyundai Ioniq 5',
    category: 'Pure EV • 800V Ultra-Fast',
    categories: ['Midsize/SUV'],
    range: '303 mi',
    topSpeed: '115 mph',
    battery: '95%',
    price: 95,
    badgeColor: '#E2F1FF',
    image: `${import.meta.env.BASE_URL}cars/hyundai-ioniq-5.jpg`,
    acceleration: '5.1s 0-60',
    seats: '5 Adults',
    drive: 'AWD Dual Motor',
    chargingSpeed: '350 kW 800V (10% to 80% in 18 min)',
    batteryCapacity: '77.4 kWh',
    luggage: '59.3 cu ft cargo',
    autopilot: 'Highway Driving Assist 2',
    description: 'Futuristic retro-modern styling built on an advanced 800V architecture capable of ultra-fast charging. Features ultra-spacious lounge seating and Vehicle-to-Load (V2L) power.',
    features: [
      '800V Ultra-fast DC charging architecture',
      'Vehicle-to-Load (V2L) external 120V power',
      'Relaxation comfort front lounge seats',
      'Smart regenerative braking with paddle shifters',
      'Dual 12.3-inch panoramic display screens'
    ]
  },
  {
    id: 'polestar-2',
    name: 'Polestar 2 Long Range',
    category: 'Dual Motor AWD EV',
    categories: ['Compact/Economy', 'Premium'],
    range: '270 mi',
    topSpeed: '127 mph',
    battery: '88%',
    price: 74,
    badgeColor: '#FFF3D8',
    image: `${import.meta.env.BASE_URL}cars/polestar-2.jpg`,
    acceleration: '4.3s 0-60',
    seats: '5 Adults',
    drive: 'Performance AWD',
    chargingSpeed: '205 kW DC Fast Charge',
    batteryCapacity: '82 kWh',
    luggage: '40.6 cu ft fastback',
    autopilot: 'Pilot Assist with Adaptive Cruise',
    description: 'Scandinavian avant-garde electric performance fastback. Built with sustainable vegan WeaveTech interiors, Brembo performance brakes, and native Google Built-in navigation.',
    features: [
      'Built-in Google Automotive with Google Maps EV routing',
      'Harman Kardon premium surround audio',
      'Pixel LED headlights with adaptive beams',
      'Vegan WeaveTech water-resistant upholstery',
      'Zero-tailpipe verified Scandinavian craftsmanship'
    ]
  },
  {
    id: 'kia-ev6',
    name: 'Kia EV6 GT-Line AWD',
    category: '100% Pure EV',
    categories: ['Midsize/SUV', 'Premium'],
    range: '270 mi',
    topSpeed: '117 mph',
    battery: '100%',
    price: 62,
    badgeColor: '#FFE8CC',
    image: `${import.meta.env.BASE_URL}cars/placeholder.jpg`,
    acceleration: '4.6s 0-60',
    seats: '5 Adults',
    drive: 'Dual Motor AWD',
    chargingSpeed: '240 kW (10-80% in ~20 min)',
    batteryCapacity: '84 kWh',
    luggage: '50.2 cu ft cargo',
    autopilot: 'Highway Driving Assist 2',
    description:
      'A sporty electric crossover with sharp styling, responsive dual-motor performance, and advanced fast-charging capability designed for everyday driving and weekend adventures.',
    features: [
      '800V ultra-fast charging architecture',
      'Regenerative braking with i-Pedal mode',
      'Dual panoramic digital displays',
      'Vehicle-to-Load power outlet',
      'Blind-Spot View Monitor'
    ]
  },
  {
    id: 'bmw-i4',
    name: 'BMW i4 M50 xDrive',
    category: '100% Pure EV',
    categories: ['Premium'],
    range: '267 mi',
    topSpeed: '140 mph',
    battery: '100%',
    price: 79,
    badgeColor: '#D9F0F0',
    image: `${import.meta.env.BASE_URL}cars/placeholder.jpg`,
    acceleration: '3.7s 0-60',
    seats: '5 Adults',
    drive: 'Dual Motor AWD',
    chargingSpeed: '205 kW (10-80% in ~30 min)',
    batteryCapacity: '81.1 kWh',
    luggage: '45.6 cu ft cargo',
    autopilot: 'Driving Assistant Professional',
    description:
      'A premium all-electric Gran Coupe that blends BMW performance, precise handling, luxurious comfort, and sophisticated technology in a sleek four-door design.',
    features: [
      'BMW Curved Display with iDrive',
      'Harman Kardon surround sound system',
      'Adaptive M suspension',
      'Wireless Apple CarPlay and Android Auto',
      'Advanced driver assistance systems'
    ]
  },
  {
    id: 'ford-mustang-mach-e',
    name: 'Ford Mustang Mach-E Premium AWD',
    category: '100% Pure EV',
    categories: ['Midsize/SUV', 'Premium'],
    range: '300 mi',
    topSpeed: '111 mph',
    battery: '100%',
    price: 65,
    badgeColor: '#FCE1E4',
    image: `${import.meta.env.BASE_URL}cars/placeholder.jpg`,
    acceleration: '3.8s 0-60',
    seats: '5 Adults',
    drive: 'Dual Motor AWD',
    chargingSpeed: '150 kW (10-80% in ~36 min)',
    batteryCapacity: '88 kWh',
    luggage: '59.7 cu ft cargo',
    autopilot: 'Ford BlueCruise (where equipped)',
    description:
      'A performance-inspired electric SUV with Mustang character, quick acceleration, a spacious interior, and connected driving technology for modern road trips.',
    features: [
      'Large portrait-oriented central touchscreen',
      'Ford BlueCruise hands-free driving (where equipped)',
      'Phone As A Key functionality',
      'Front trunk with washable storage compartment',
      'Selectable drive modes'
    ]
  },
  {
    id: 'kia-ev9',
    name: 'Kia EV9 Long Range AWD',
    category: '100% Pure EV',
    categories: ['7-seater/Van', 'Midsize/SUV', 'Premium'],
    range: '280 mi',
    topSpeed: '124 mph',
    battery: '100%',
    price: 85,
    badgeColor: '#D8E8FF',
    image: `${import.meta.env.BASE_URL}cars/placeholder.jpg`,
    acceleration: '5.0s 0-60',
    seats: '7 Adults',
    drive: 'Dual Motor AWD',
    chargingSpeed: '210 kW (10-80% in ~24 min)',
    batteryCapacity: '99.8 kWh',
    luggage: '81.7 cu ft cargo',
    autopilot: 'Highway Driving Assist 2',
    description:
      'A spacious all-electric three-row SUV built for families and long-distance adventures. Combines seating for seven, confident all-wheel-drive performance, ultra-fast 800V charging, and a premium lounge-inspired interior.',
    features: [
      'Three-row seating for up to 7 passengers',
      '800V ultra-fast DC charging architecture',
      'Second-row relaxation seats (where equipped)',
      'Vehicle-to-Load (V2L) power capability',
      'Highway Driving Assist 2',
      'Dual panoramic digital displays',
      'Remote Smart Parking Assist (where equipped)'
    ]
  },
  {
    id: 'volvo-ex90',
    name: 'Volvo EX90 Twin Motor AWD',
    category: '100% Pure EV',
    categories: ['7-seater/Van', 'Midsize/SUV', 'Premium'],
    range: '300 mi',
    topSpeed: '112 mph',
    battery: '100%',
    price: 95,
    badgeColor: '#E4E8F0',
    image: `${import.meta.env.BASE_URL}cars/placeholder.jpg`,
    acceleration: '5.7s 0-60',
    seats: '7 Adults',
    drive: 'Dual Motor AWD',
    chargingSpeed: '250 kW (10-80% in ~30 min)',
    batteryCapacity: '107 kWh',
    luggage: '85.7 cu ft cargo',
    autopilot: 'Pilot Assist',
    description:
      'A luxurious all-electric three-row SUV combining Scandinavian design, advanced safety technology, a serene cabin, and comfortable seating for families and long-distance journeys.',
    features: [
      'Three-row seating for up to 7 passengers',
      'Advanced driver assistance and collision avoidance',
      'Google built-in infotainment',
      'Panoramic electrochromic glass roof',
      'Premium Bowers & Wilkins audio (where equipped)',
      'Over-the-air software updates',
      '360-degree camera system'
    ]
  },
  {
    id: 'renault-megane-e-tech',
    name: 'Renault Megane E-Tech Electric Long Range',
    category: '100% Pure EV',
    categories: ['Compact/Economy', 'Premium'],
    range: '285 mi',
    topSpeed: '99 mph',
    battery: '100%',
    price: 42,
    badgeColor: '#F9E4D4',
    image: `${import.meta.env.BASE_URL}cars/placeholder.jpg`,
    acceleration: '7.4s 0-60',
    seats: '5 Adults',
    drive: 'Front-Wheel Drive',
    chargingSpeed: '130 kW (15-80% in ~32 min)',
    batteryCapacity: '60 kWh',
    luggage: '44.8 cu ft cargo',
    autopilot: 'Active Driver Assist',
    description:
      'A compact European electric hatchback offering efficient everyday driving, distinctive French styling, Google-powered technology, and a maneuverable footprint ideal for city streets and commuting.',
    features: [
      'Google built-in with Google Maps',
      'OpenR dual-screen infotainment system',
      'Regenerative braking with adjustable levels',
      'Adaptive cruise control (where equipped)',
      'Wireless smartphone integration',
      'LED lighting signature',
      'Multiple driving modes'
    ]
  }
];

export const categories = ['Compact/Economy', 'Midsize/SUV', '7-seater/Van', 'Premium'];

export const hubsData = [
  { id: 'sfo', name: 'SFO Airport Hub', label: '📍 San Francisco Airport (SFO)', chargers: '16x 250kW Superchargers' },
  { id: 'downtown', name: 'Downtown Hub', label: '📍 Downtown SF Hub (California St)', chargers: '8x 150kW Level 3 Hub' },
  { id: 'sjc', name: 'San Jose Hub', label: '📍 San Jose Airport (SJC)', chargers: '12x 250kW Superchargers' }
];

export function getCarById(id) {
  return fleetData.find((car) => car.id === id);
}
