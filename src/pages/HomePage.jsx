import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fleetData } from '../data/fleetData';

// Web Audio API: Option C Dual Glass Clink (Two gentle crystal "wine toast" pings)
function playDualGlassToast() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    [0, 0.07].forEach((delay, idx) => {
      // Primary crystal resonance
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      const freq = idx === 0 ? 2400 : 3100;
      osc.frequency.setValueAtTime(freq, now + delay);
      gain.gain.setValueAtTime(0.08, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + delay);
      osc.stop(now + delay + 0.15);

      // Micro transient impact tink
      const ping = ctx.createOscillator();
      const pingGain = ctx.createGain();
      ping.type = 'triangle';
      ping.frequency.setValueAtTime(4200, now + delay);
      ping.frequency.exponentialRampToValueAtTime(1600, now + delay + 0.015);
      pingGain.gain.setValueAtTime(0.07, now + delay);
      pingGain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.02);
      ping.connect(pingGain);
      pingGain.connect(ctx.destination);
      ping.start(now + delay);
      ping.stop(now + delay + 0.02);
    });
  } catch (err) {
    // Graceful fallback if audio is restricted by browser policy
  }
}

export default function HomePage({
  selectedHub,
  setSelectedHub,
  pickupDate,
  setPickupDate,
  returnDate,
  setReturnDate,
  activeRentalCar,
  onReserveCar,
  isLocked,
  setIsLocked
}) {
  const navigate = useNavigate();
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiAnswer, setAiAnswer] = useState(
    'Welcome to EcoDrive! You can ask me about range estimations, nearest Superchargers, or calculated CO₂ savings for your journey.'
  );
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Slider State & Handlers
  const sliderTrackRef = useRef(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartXRef = useRef(0);

  const toggleLockWithAudio = (nextLocked) => {
    playDualGlassToast();
    setIsLocked(nextLocked !== undefined ? nextLocked : !isLocked);
    setDragOffset(0);
  };

  const handlePointerDown = (e) => {
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging || !sliderTrackRef.current) return;
    const trackWidth = sliderTrackRef.current.clientWidth;
    const maxDrag = Math.max(0, trackWidth - 48 - 8); // knob width (48px) + padding
    let delta = e.clientX - dragStartXRef.current;
    if (delta < 0) delta = 0;
    if (delta > maxDrag) delta = maxDrag;
    setDragOffset(delta);

    if (delta >= maxDrag * 0.78) {
      setIsDragging(false);
      toggleLockWithAudio(!isLocked);
    }
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setDragOffset(0);
  };

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
    navigate('/fleet');
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

            {/* Pickup Date Segment */}
            <div className="search-segment search-segment-date">
              <div className="segment-label">Pick-Up Date</div>
              <div className="segment-content">
                <div className="segment-text-wrap">
                  <div className="segment-main-val">{pickupInfo.date}</div>
                  <div className="segment-sub-val text-emerald">{pickupInfo.time}</div>
                </div>
              </div>
              <input
                type="datetime-local"
                className="hidden-interactive-control"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                aria-label="Select pickup date and time"
              />
            </div>

            <div className="segment-divider"></div>

            {/* Return Date Segment */}
            <div className="search-segment search-segment-date">
              <div className="segment-label">Return Date</div>
              <div className="segment-content">
                <div className="segment-text-wrap">
                  <div className="segment-main-val">{returnInfo.date}</div>
                  <div className="segment-sub-val text-emerald">{returnInfo.time}</div>
                </div>
              </div>
              <input
                type="datetime-local"
                className="hidden-interactive-control"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                aria-label="Select return date and time"
              />
            </div>

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
                        onClick={() => onReserveCar(car)}
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

          {/* Live Telemetry Widget */}
          <div className="telemetry-widget-card" id="sustainability">
            <div className="telemetry-card-header">
              <div className="telemetry-status-dot"></div>
              <h4 className="telemetry-heading">Live Trip Telemetry</h4>
            </div>

            <div className="telemetry-metric-item">
              <span className="metric-label">CO₂ Avoided This Month</span>
              <strong className="metric-val text-emerald">16.2 kg CO₂</strong>
            </div>

            <div className="telemetry-metric-item">
              <span className="metric-label">Active Rental Battery</span>
              <strong className="metric-val">78% (210 mi left)</strong>
            </div>

            <div className="telemetry-metric-item">
              <span className="metric-label">Vehicle Lock Status</span>
              <div className="telemetry-lock-status-val">
                <strong className="metric-val">
                  {isLocked ? '🔒 Secured' : '🔓 Unlocked'}
                </strong>
                <span className={`telemetry-lock-subtext ${!isLocked ? 'text-emerald' : ''}`}>
                  {isLocked ? 'Alarm armed' : 'Ready to drive'}
                </span>
              </div>
            </div>

            <div className="telemetry-progress-block">
              <div className="progress-labels">
                <span>Trip Efficiency Rating</span>
                <span className="text-emerald font-bold">96% Eco</span>
              </div>
              <div className="progress-track">
                <div className="progress-bar-fill" style={{ width: '96%' }}></div>
              </div>
            </div>

            {/* Slide-to-Unlock / Lock slider with Amber/Gold styling & tactile audio */}
            <div className="telemetry-slider-container">
              <div
                ref={sliderTrackRef}
                className={`telemetry-slider-track ${isLocked ? 'track-locked-amber' : 'track-unlocked-green'}`}
                onClick={() => toggleLockWithAudio(!isLocked)}
              >
                <div
                  className={`telemetry-slider-knob ${isLocked ? 'knob-locked-amber' : 'knob-unlocked-green'}`}
                  style={{
                    transform: `translateX(${dragOffset}px)`,
                    transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  title="Drag or click to toggle lock"
                >
                  <span className="knob-icon">{isLocked ? '🔒' : '🔓'}</span>
                </div>
                <div className={`telemetry-slider-label ${isLocked ? 'shimmer-amber' : 'shimmer-green'}`}>
                  {isLocked ? 'Slide to Unlock →' : 'Slide to Lock 🔒'}
                </div>
              </div>
            </div>

            <Link to="/account" className="telemetry-link-sub">
              Manage Active Rental & Digital Pass →
            </Link>
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
