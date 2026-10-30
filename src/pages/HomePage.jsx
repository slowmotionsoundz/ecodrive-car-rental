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

  const handleAiSubmit = (e) => {
    if (e) e.preventDefault();
    if (!aiPrompt.trim()) return;

    setIsAiLoading(true);
    const query = aiPrompt.toLowerCase();

    setTimeout(() => {
      if (query.includes('tahoe') || query.includes('mountain') || query.includes('yosemite')) {
        setAiAnswer(
          `🏔️ Trip to Tahoe/Yosemite: Tesla Model Y (330 mi range) is ideal. There are 14 Tesla V3 Superchargers along I-80 (Roseville & Truckee). Expect ~18 minutes charging stop while grabbing coffee.`
        );
      } else if (query.includes('sfo') || query.includes('airport') || query.includes('charge') || query.includes('charging')) {
        setAiAnswer(
          `⚡ SFO Charging: Our SFO Airport Hub has dedicated 250kW Level 3 Fast Chargers. You receive the vehicle at 100% SoC and can drop off without recharging for a $0 green return fee.`
        );
      } else if (query.includes('co2') || query.includes('saving') || query.includes('emission')) {
        setAiAnswer(
          `🌱 Environmental Impact: Driving 250 miles in an EcoDrive EV saves approx 52.4 kg of CO₂ compared to a standard gas rental (28 MPG). Your trip is certified 100% carbon-neutral.`
        );
      } else {
        setAiAnswer(
          `💡 EcoDrive AI: For your trip starting at ${selectedHub}, we recommend reserving the ${activeRentalCar}. With an EPA range of 300+ miles and seamless fast charging along all California corridors, you're all set!`
        );
      }
      setIsAiLoading(false);
    }, 400);
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
        <main className="catalog-main" id="fleet">
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
                  setAiPrompt('Fast chargers near SFO');
                  setTimeout(() => handleAiSubmit(), 50);
                }}
              >
                📍 SFO Fast Chargers
              </button>
              <button
                type="button"
                className="suggestion-chip"
                onClick={() => {
                  setAiPrompt('How much CO2 will I avoid saving?');
                  setTimeout(() => handleAiSubmit(), 50);
                }}
              >
                🌿 CO₂ Calculation
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
