import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fleetData } from '../data/fleetData';
import RentalRangePicker from '../components/RentalRangePicker';

export default function HomePage({
  selectedHub,
  setSelectedHub,
  pickupDate,
  setPickupDate,
  returnDate,
  setReturnDate,
  activeRentalCar,
  onReserveCar
}) {
  const navigate = useNavigate();
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiAnswer, setAiAnswer] = useState(
    'Welcome to EcoDrive! You can ask me about range estimations, nearest Superchargers, or calculated CO₂ savings for your journey.'
  );
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAiSubmit = (e, customQuery) => {
    if (e) e.preventDefault();
    const rawQuery = customQuery !== undefined ? customQuery : aiPrompt;
    if (!rawQuery.trim()) return;

    setIsAiLoading(true);
    const query = rawQuery.toLowerCase();

    setTimeout(() => {
      // 1. Destinations & Road Trips
      if (query.includes('tahoe') || query.includes('mountain') || query.includes('snow') || query.includes('reno')) {
        setAiAnswer(
          `🏔️ Trip to Lake Tahoe: Tesla Model Y (330 mi range) or Lucid Air is recommended. Take I-80 through Sacramento and Truckee where 18+ high-speed Superchargers are located. Expect a brief 15-minute top-up stop.`
        );
      } else if (query.includes('yosemite') || query.includes('national park')) {
        setAiAnswer(
          `🌲 Trip to Yosemite: Direct distance from Bay Area is ~195 miles. All our EVs can reach Yosemite Valley on a single charge. Free Level 2 charging is available at Yosemite Valley Lodge and Village Store.`
        );
      } else if (query.includes('napa') || query.includes('sonoma') || query.includes('wine')) {
        setAiAnswer(
          `🍷 Napa & Sonoma Wine Country: Roundtrip is ~120 miles. Easily done without any charging stops. Most boutique wineries offer complimentary EV destination chargers while you taste.`
        );
      } else if (query.includes('la') || query.includes('los angeles') || query.includes('san diego')) {
        setAiAnswer(
          `🌴 Southern California Highway 5 / 101: 380 miles with charging hubs every 30 miles (Harris Ranch, Kettleman City). With 800V fast charging, you only need two 15-minute stops.`
        );

      // 2. Charging, Plugs & Networks
      } else if (query.includes('sfo') || query.includes('airport')) {
        setAiAnswer(
          `✈️ SFO Airport Hub: Located at terminal parking with 12 dedicated 250kW Level 3 Fast Chargers. Pick up with 100% battery and drop off at any level—we handle recharge for $0 green fee.`
        );
      } else if (query.includes('how long') || query.includes('charging time') || query.includes('charge speed') || query.includes('fast charge')) {
        setAiAnswer(
          `⚡ Charging Times: On a DC Fast Charger (250kW-350kW), our vehicles charge from 10% to 80% in just 15 to 22 minutes. Standard Level 2 hotel chargers charge overnight in 6-8 hours.`
        );
      } else if (query.includes('where') && (query.includes('charge') || query.includes('charger'))) {
        setAiAnswer(
          `📍 Finding Chargers: Every EcoDrive rental includes integrated in-dash navigation routing you automatically to live available Tesla Superchargers and Electrify America plugs.`
        );
      } else if (query.includes('free') && query.includes('charge')) {
        setAiAnswer(
          `💳 Charging Costs: Complimentary Tesla Supercharging is included with all Tesla rentals. For non-Tesla models, complimentary charging passes are provided on your digital pass.`
        );

      // 3. Sustainability & Carbon Emissions
      } else if (query.includes('co2') || query.includes('saving') || query.includes('emission') || query.includes('carbon') || query.includes('green')) {
        setAiAnswer(
          `🌱 Environmental Impact: Driving 250 miles in an EcoDrive EV saves approx 52.4 kg of CO₂ compared to a gas rental (28 MPG). Your entire rental is certified 100% carbon-neutral with zero tailpipe emissions.`
        );

      // 4. Booking, Pricing & Digital Key
      } else if (query.includes('key') || query.includes('unlock') || query.includes('phone') || query.includes('contactless')) {
        setAiAnswer(
          `📱 Mobile Digital Key: No rental counters or waiting in line! Your phone serves as your NFC key. Walk directly to your assigned parking bay and tap to unlock.`
        );
      } else if (query.includes('cost') || query.includes('price') || query.includes('rate') || query.includes('how much') || query.includes('cheap')) {
        setAiAnswer(
          `🏷️ Rental Rates: Daily rates start from $79/day (Polestar 2, Mach-E) up to $289/day (Tesla Roadster). All bookings include full insurance options, unlimited miles, and zero charging return penalties.`
        );
      } else if (query.includes('cancel') || query.includes('refund')) {
        setAiAnswer(
          `🛡️ Cancellation Policy: 100% free cancellation up to 24 hours prior to scheduled pick-up time with zero penalty fees.`
        );

      // 5. Vehicle Recommendations & Range
      } else if (query.includes('fastest') || query.includes('speed') || query.includes('performance') || query.includes('roadster')) {
        setAiAnswer(
          `🏎️ High Performance: The Tesla Roadster (Next-Gen) is our flagship hypercar: 0-60 mph in < 1.9s, top speed 250+ mph, and a staggering 620-mile battery range.`
        );
      } else if (query.includes('family') || query.includes('seats') || query.includes('luggage') || query.includes('suv') || query.includes('room')) {
        setAiAnswer(
          `👨‍👩‍👧‍👦 Family & Cargo: The Rivian R1S (7 seats, 104 cu ft cargo) or Tesla Model Y (76 cu ft cargo) offer expansive space, AWD security, and generous legroom.`
        );
      } else if (query.includes('range') || query.includes('battery')) {
        setAiAnswer(
          `🔋 Fleet Range: Our EV fleet ranges from 270 miles (Mustang Mach-E) up to 620 miles (Tesla Roadster). Average highway range across all models is 315 miles per charge.`
        );

      // 6. Natural Language / Greetings / General
      } else if (query.includes('hello') || query.includes('hi') || query.includes('hey') || query.includes('help')) {
        setAiAnswer(
          `👋 Hello! I am the EcoDrive AI Concierge. Ask me about California road trips (Tahoe, Yosemite, Napa), EV charging speeds, vehicle specs, or our digital key pickup!`
        );
      } else {
        setAiAnswer(
          `💡 EcoDrive AI: For your trip starting at ${selectedHub}, we recommend reserving the ${activeRentalCar}. With an EPA range of 300+ miles and seamless fast charging along all California corridors, you're all set!`
        );
      }
      setIsAiLoading(false);
    }, 350);
  };

  const handleSearchSubmit = () => {
    navigate('/booking', { state: { fromHome: true } });
  };

  // Format date helper for human-friendly luxury display
  const formatDisplayDate = (isoStr) => {
    if (!isoStr) return { date: 'Select Date', time: '' };
    try {
      const d = new Date(isoStr);
      const date = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
      return { date, time };
    } catch {
      return { date: isoStr, time: '' };
    }
  };

  const getDurationText = () => {
    try {
      const diff = new Date(returnDate) - new Date(pickupDate);
      const days = Math.round(diff / (1000 * 60 * 60 * 24));
      return days > 0 ? `⚡ ${days}-Day Green Rental` : '⚡ Same-Day Rental';
    } catch {
      return '⚡ Green EV Rental';
    }
  };

  const getHubSubtitle = (hub) => {
    if (hub.includes('SFO')) return 'San Francisco, CA';
    if (hub.includes('Downtown')) return 'California St, SF';
    if (hub.includes('San Jose')) return 'San Jose, CA';
    return 'California Hub';
  };

  const pickupInfo = formatDisplayDate(pickupDate);
  const returnInfo = formatDisplayDate(returnDate);

  return (
    <div>
      {/* 2. Hero & Quick Pickup Search */}
      <section className="hero-section" id="home">
        <div className="hero-content">
          <div className="hero-pill">
            <span className="hero-pill-icon">⚡</span>
            <span>Next-Generation Sustainable Mobility</span>
          </div>
          <h1 className="hero-title">Drive 100% Electric.</h1>
          <p className="hero-description">
            Instant mobile booking, guaranteed zero-emission models, and contactless digital key pickup.
          </p>

          <div className="luxury-search-capsule">
            {/* Hub Segment */}
            <div className="search-segment search-segment-hub">
              <div className="segment-label">Pickup & Return Hub</div>
              <div className="segment-content">
                <span className="segment-icon">📍</span>
                <div className="segment-text-wrap">
                  <div className="segment-main-val">{selectedHub.replace(' Hub', '')}</div>
                  <div className="segment-sub-val">{getHubSubtitle(selectedHub)}</div>
                </div>
                <span className="segment-change-hint">Change ▾</span>
              </div>
              <select
                className="hidden-interactive-control"
                value={selectedHub}
                onChange={(e) => setSelectedHub(e.target.value)}
                aria-label="Select pickup and return hub"
              >
                <option value="SFO Airport Hub">San Francisco Airport (SFO)</option>
                <option value="Downtown Hub">Downtown SF Hub (California St)</option>
                <option value="San Jose Hub">San Jose Airport (SJC)</option>
              </select>
            </div>

            <div className="segment-divider"></div>

            {/* Unified Range Picker (Hero Variant) */}
            <RentalRangePicker
              variant="hero"
              pickupDate={pickupDate}
              returnDate={returnDate}
              onRangeChange={({ pickupDate: newPickup, returnDate: newReturn }) => {
                setPickupDate(newPickup);
                setReturnDate(newReturn);
              }}
            />

            <div className="segment-divider"></div>

            {/* Action Segment */}
            <div className="search-segment-action">
              <div className="trip-duration-badge">
                <span className="duration-label">Duration</span>
                <span className="duration-pill">{getDurationText()}</span>
              </div>
              <button
                className="btn-search-vehicles"
                onClick={handleSearchSubmit}
              >
                <span>Find EV</span>
                <span className="btn-icon">⚡</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Catalog & Telemetry Sidebar */}
      <div className="catalog-telemetry-wrapper">
        <div className="catalog-header-bar">
          <div>
            <h2 className="section-title">Featured Zero-Emission Fleet</h2>
            <p className="section-subtitle">
              Guaranteed high-spec models with complimentary Supercharging & carbon offset certification
            </p>
          </div>
          <div className="availability-chip">
            <span className="green-pulse-dot"></span>
            <span>98% Fleet Available Today</span>
          </div>
        </div>

        <main className="catalog-main" id="fleet">
          <div className="fleet-cards-grid">
            {fleetData.slice(0, 3).map((car) => (
              <div key={car.id} className="fleet-card">
                <div className="card-image-wrapper">
                  <Link to={`/fleet/${car.id}`}>
                    <img src={car.image} alt={car.name} className="car-preview-img" loading="lazy" />
                  </Link>
                  <span
                    className="card-category-badge"
                    style={{ backgroundColor: car.badgeColor, color: '#0d2818' }}
                  >
                    {car.category}
                  </span>
                  <div className="card-quick-specs">
                    <span>{car.drive}</span>
                    <span>•</span>
                    <span>{car.acceleration}</span>
                  </div>
                </div>

                <div className="card-body">
                  <div className="card-title-row">
                    <Link to={`/fleet/${car.id}`}>
                      <h3 className="car-model-name">{car.name}</h3>
                    </Link>
                    <span className="eco-verified-tag">🌱 Zero Tailpipe</span>
                  </div>

                  <div className="specs-telemetry-grid">
                    <div className="spec-box">
                      <span className="spec-title">Range</span>
                      <span className="spec-val">🔋 {car.range}</span>
                    </div>
                    <div className="spec-box">
                      <span className="spec-title">Top Speed</span>
                      <span className="spec-val">⚡ {car.topSpeed}</span>
                    </div>
                    <div className="spec-box">
                      <span className="spec-title">Battery SoC</span>
                      <span className="spec-val">🔌 {car.battery}</span>
                    </div>
                    <div className="spec-box">
                      <span className="spec-title">Emissions</span>
                      <span className="spec-val emission-zero">🌱 0 g/mi</span>
                    </div>
                  </div>

                  <div className="card-action-bar">
                    <div className="price-container">
                      <span className="currency-val">${car.price}</span>
                      <span className="period-label">/ day</span>
                    </div>
                    <div className="card-action-buttons">
                      <Link to={`/fleet/${car.id}`} className="btn-details-link">
                        <span>Details</span>
                        <span className="details-arrow">→</span>
                      </Link>
                      <button
                        className={`btn-reserve ${activeRentalCar === car.name ? 'btn-selected' : ''}`}
                        onClick={() => {
                          onReserveCar(car);
                          navigate('/booking', { state: { preselectedCar: car, fromHome: true } });
                        }}
                      >
                        {activeRentalCar === car.name ? '✓ Selected' : 'Reserve'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        <aside className="telemetry-aside">
          {/* AI Assistant Widget */}
          <div className="ai-widget-card">
            <div className="ai-widget-header">
              <span className="ai-icon-sparkle">✨</span>
              <h3 className="ai-widget-heading">EcoDrive AI Assistant</h3>
            </div>
            <p className="ai-widget-desc">
              Ask anything about range, charging stops, or savings calculation for your trip.
            </p>

            <div className="ai-chat-bubble">
              <div className="ai-avatar-tag">
                <span>🤖 EcoDrive Intelligence</span>
              </div>
              <p className="ai-chat-text">{aiAnswer}</p>
            </div>

            <form className="ai-input-form" onSubmit={handleAiSubmit}>
              <input
                type="text"
                className="ai-text-input"
                placeholder="e.g. Can I drive to Yosemite on one charge?"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
              />
              <button type="submit" className="ai-submit-button" disabled={isAiLoading}>
                {isAiLoading ? '...' : 'Ask'}
              </button>
            </form>

            <div className="ai-prompt-suggestions">
              <button
                type="button"
                className="suggestion-chip"
                onClick={() => {
                  const q = 'Fast chargers near SFO';
                  setAiPrompt(q);
                  handleAiSubmit(null, q);
                }}
              >
                📍 SFO Chargers
              </button>
              <button
                type="button"
                className="suggestion-chip"
                onClick={() => {
                  const q = 'Can I drive to Yosemite on one charge?';
                  setAiPrompt(q);
                  handleAiSubmit(null, q);
                }}
              >
                🌲 Yosemite Range
              </button>
              <button
                type="button"
                className="suggestion-chip"
                onClick={() => {
                  const q = 'How does the mobile digital key work?';
                  setAiPrompt(q);
                  handleAiSubmit(null, q);
                }}
              >
                📱 Digital Key
              </button>
              <button
                type="button"
                className="suggestion-chip"
                onClick={() => {
                  const q = 'How much CO2 will I avoid saving?';
                  setAiPrompt(q);
                  handleAiSubmit(null, q);
                }}
              >
                🌿 CO₂ Savings
              </button>
            </div>
          </div>
        </aside>

        <div className="view-all-fleet-banner">
          <div>
            <h3>Explore Our Complete Zero-Emission Lineup</h3>
            <p>Compare full specs, 800V fast-charging capabilities, and cargo space.</p>
          </div>
          <Link to="/fleet" className="btn-primary-large">
            View All Vehicles →
          </Link>
        </div>
      </div>
    </div>
  );
}
