import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AccountPage({
  activeRentalCar,
  selectedHub,
  pickupDate,
  returnDate,
  isLocked,
  setIsLocked
}) {
  const [climateOn, setClimateOn] = useState(false);
  const [digitalKeyNotification, setDigitalKeyNotification] = useState('');

  const handleToggleLock = () => {
    const nextState = !isLocked;
    setIsLocked(nextState);
    setDigitalKeyNotification(
      nextState ? '🔒 Vehicle Locked & Security Alarm Armed' : '🔓 Vehicle Unlocked: Walk up and open door'
    );
    setTimeout(() => setDigitalKeyNotification(''), 4000);
  };

  const handleToggleClimate = () => {
    setClimateOn(!climateOn);
    setDigitalKeyNotification(
      !climateOn ? '❄️ Cabin Preconditioning Started (Set to 68°F)' : 'Cabin Climate Turned Off'
    );
    setTimeout(() => setDigitalKeyNotification(''), 4000);
  };

  return (
    <div className="page-container">
      {/* Toast Alert */}
      {digitalKeyNotification && (
        <div className="booking-toast">
          <span>{digitalKeyNotification}</span>
          <button className="toast-close" onClick={() => setDigitalKeyNotification('')}>✕</button>
        </div>
      )}

      <section className="page-header">
        <div className="hero-pill">
          <span>📱 Mobile Digital Key & Rental Management</span>
        </div>
        <h1 className="page-title">My Account & Active Rental</h1>
        <p className="page-description">
          Seamlessly command your electric rental in real-time. No physical keys or counter lines required.
        </p>
      </section>

      <div className="account-layout">
        {/* Active Vehicle Command Card */}
        <div className="active-vehicle-card">
          <div className="vehicle-telemetry-header">
            <div>
              <span className="telemetry-badge-active">● Active Rental</span>
              <h2 className="active-vehicle-title">{activeRentalCar}</h2>
              <span className="active-hub-sub">Pickup Hub: {selectedHub}</span>
            </div>
            <div className="vehicle-lock-pill" style={{ color: isLocked ? '#34d399' : '#f87171' }}>
              <span>{isLocked ? '🔒 Secured' : '🔓 Unlocked'}</span>
            </div>
          </div>

          {/* Digital Key Virtual Keyfob */}
          <div className="digital-keyfob-box">
            <div className="keyfob-inner">
              <span className="keyfob-icon">{isLocked ? '🔒' : '🔓'}</span>
              <h3>Contactless NFC Digital Key</h3>
              <p>Hold your smartphone near the driver's B-pillar sensor or use the direct controls below.</p>
              
              <div className="keyfob-controls">
                <button
                  className={`btn-keyfob ${!isLocked ? 'keyfob-active' : ''}`}
                  onClick={handleToggleLock}
                >
                  {isLocked ? '🔓 Tap to Unlock Vehicle' : '🔒 Tap to Lock Vehicle'}
                </button>

                <button
                  className={`btn-keyfob-secondary ${climateOn ? 'climate-active' : ''}`}
                  onClick={handleToggleClimate}
                >
                  {climateOn ? '❄️ Climate: ON (68°F)' : '❄️ Precondition Cabin (68°F)'}
                </button>
              </div>
            </div>
          </div>

          {/* Live Telemetry Metrics */}
          <div className="account-telemetry-grid">
            <div className="telemetry-box">
              <span className="telemetry-box-label">Battery State of Charge</span>
              <strong className="telemetry-box-val text-emerald">78%</strong>
              <span className="telemetry-box-sub">~210 miles range left</span>
            </div>

            <div className="telemetry-box">
              <span className="telemetry-box-label">Trip CO₂ Avoided</span>
              <strong className="telemetry-box-val text-emerald">16.2 kg</strong>
              <span className="telemetry-box-sub">100% Zero tailpipe</span>
            </div>

            <div className="telemetry-box">
              <span className="telemetry-box-label">Tire Pressure</span>
              <strong className="telemetry-box-val">38 PSI</strong>
              <span className="telemetry-box-sub">Optimal pressure</span>
            </div>

            <div className="telemetry-box">
              <span className="telemetry-box-label">Return Due</span>
              <strong className="telemetry-box-val">
                {new Date(returnDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </strong>
              <span className="telemetry-box-sub">{selectedHub.split(' ')[0]} Hub</span>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Profile & Past Trips */}
        <div className="account-sidebar">
          <div className="profile-summary-card">
            <div className="user-avatar-row">
              <div className="user-avatar">🌱</div>
              <div>
                <h3 className="user-name">Alex Green</h3>
                <span className="user-tier">EcoDrive Member • Level 3</span>
              </div>
            </div>

            <div className="lifetime-impact-stats">
              <div className="impact-stat-item">
                <span className="stat-num">4</span>
                <span className="stat-label">Total EV Rentals</span>
              </div>
              <div className="impact-stat-item">
                <span className="stat-num text-emerald">124 kg</span>
                <span className="stat-label">Lifetime CO₂ Prevented</span>
              </div>
            </div>

            <button
              className="btn-download-cert"
              onClick={() => alert("✅ Certified Carbon Offset Certificate (PDF) downloaded to your device!")}
            >
              📄 Download Carbon Certificate
            </button>
          </div>

          <div className="past-trips-card">
            <h4>Recent Green Trips</h4>
            <div className="trip-history-item">
              <div>
                <strong>Tesla Model Y</strong>
                <p>SFO Airport → Big Sur • 3 days</p>
              </div>
              <span className="trip-co2-badge">-48 kg CO₂</span>
            </div>

            <div className="trip-history-item">
              <div>
                <strong>Hyundai Ioniq 5</strong>
                <p>Downtown SF → Napa Valley • 2 days</p>
              </div>
              <span className="trip-co2-badge">-31 kg CO₂</span>
            </div>

            <Link to="/fleet" className="btn-book-another">
              + Book Another Electric Vehicle
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
