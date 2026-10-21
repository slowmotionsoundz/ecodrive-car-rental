export const fleetData = [
  {
    id: 'model-y',
    name: 'Tesla Model Y Long Range',
    category: '100% Pure EV',
    range: '330 mi',
    topSpeed: '135 mph',
    battery: '100%',
    price: 89,
    badgeColor: '#D8F3DC',
    image: '/cars/tesla-model-y.jpg',
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
    id: 'ioniq-5',
    name: 'Hyundai Ioniq 5',
    category: 'Pure EV • 800V Ultra-Fast',
    range: '303 mi',
    topSpeed: '115 mph',
    battery: '95%',
    price: 95,
    badgeColor: '#E2F1FF',
    image: '/cars/hyundai-ioniq-5.jpg',
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
    range: '270 mi',
    topSpeed: '127 mph',
    battery: '88%',
    price: 74,
    badgeColor: '#FFF3D8',
    image: '/cars/polestar-2.jpg',
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
  }
];

export const hubsData = [
  { id: 'sfo', name: 'SFO Airport Hub', label: '📍 San Francisco Airport (SFO)', chargers: '16x 250kW Superchargers' },
  { id: 'downtown', name: 'Downtown Hub', label: '📍 Downtown SF Hub (California St)', chargers: '8x 150kW Level 3 Hub' },
  { id: 'sjc', name: 'San Jose Hub', label: '📍 San Jose Airport (SJC)', chargers: '12x 250kW Superchargers' }
];

export function getCarById(id) {
  return fleetData.find((car) => car.id === id);
}
