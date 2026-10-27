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
    const nextLocked = !isLocked;
    setIsLocked(nextLocked);
    setDigitalKeyNotification(
      nextLocked
        ? '🔒 Vehicle Locked & Security Alarm Armed'
        : '🔓 Vehicle Unlocked: Walk up and open any door'
    );
    setTimeout(() => setDigitalKeyNotification(''), 4000);
  };

  const handleToggleClimate = () => {
    const nextState = !climateOn;
    setClimateOn(nextState);
    setDigitalKeyNotification(
      nextState ? '❄️ Cabin A/C Started (Set to 68°F)' : 'Cabin Climate Turned Off'
    );
    setTimeout(() => setDigitalKeyNotification(''), 4000);
  };

  const formattedReturnDate = new Date(returnDate).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

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
          Real-time controls for your electric rental. Tap below to unlock doors, start the A/C, and track your trip rewards.
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
            <div className={`vehicle-lock-pill ${isLocked ? 'pill-locked' : 'pill-unlocked'}`}>
              <span>{isLocked ? '🔒 Secured' : '🔓 Unlocked'}</span>
            </div>
          </div>

          {/* Battery Glance Bar */}
          <div className="battery-glance-card">
            <div className="battery-glance-header">
              <span className="battery-label">Battery Level</span>
              <span className="battery-val text-emerald">78% • ~210 miles range left</span>
            </div>
            <div className="battery-track">
              <div className="battery-fill" style={{ width: '78%' }}></div>
            </div>
          </div>

          {/* Digital Key Remote Controls */}
          <div className="digital-key-remote-section">
            <div className="remote-section-title">Digital Key Remote Controls</div>
            <div className="remote-buttons-grid">
              <button
                type="button"
                className={`btn-remote-action ${isLocked ? 'lock-state-locked' : 'lock-state-unlocked'}`}
                onClick={handleToggleLock}
                aria-label={isLocked ? 'The car is locked. Tap to unlock.' : 'The doors are open. Tap to lock.'}
              >
                <span key={isLocked ? 'locked' : 'unlocked'} className="remote-action-icon lock-icon-pop">
                  {isLocked ? '🔒' : '🔓'}
                </span>
                <span className="remote-action-title">
                  {isLocked ? 'The car is locked' : 'The doors are open'}
                </span>
                <span className="remote-action-status">
                  {isLocked ? 'Tap to unlock' : 'Tap to lock'}
                </span>
              </button>

              <button
                type="button"
                className={`btn-remote-action ${climateOn ? 'action-active-climate' : ''}`}
                onClick={handleToggleClimate}
              >
                <span className="remote-action-icon">❄️</span>
                <span className="remote-action-title">A/C & Heat</span>
                <span className="remote-action-status">{climateOn ? 'Running 68°F' : 'Off'}</span>
              </button>
            </div>
          </div>

          {/* Clean Telemetry Metrics Grid */}
          <div className="account-telemetry-grid">
            <div className="telemetry-box">
              <span className="telemetry-box-label">Trip CO₂ Saved</span>
              <strong className="telemetry-box-val text-emerald">16.2 kg</strong>
              <span className="telemetry-box-sub">100% Zero tailpipe</span>
            </div>

            <div className="telemetry-box">
              <span className="telemetry-box-label">Tire Pressure</span>
              <strong className="telemetry-box-val">38 PSI</strong>
              <span className="telemetry-box-sub">Optimal condition</span>
            </div>

            <div className="telemetry-box">
              <span className="telemetry-box-label">Return Due</span>
              <strong className="telemetry-box-val">{formattedReturnDate}</strong>
              <span className="telemetry-box-sub">{selectedHub.split(' ')[0]} Hub</span>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Profile & Rewards */}
        <div className="account-sidebar">
          <div className="profile-summary-card">
            <div className="user-avatar-row">
              <div className="user-avatar">🌱</div>
              <div>
                <h3 className="user-name">Alex Green</h3>
                <span className="user-tier">EcoDrive Member • Level 3</span>
              </div>
            </div>

            {/* EcoRewards Points Block (Board Card Requirement) */}
            <div className="rewards-points-block">
              <div className="rewards-points-header">
                <span className="rewards-label">EcoRewards Balance</span>
                <span className="rewards-badge">+180 pts this trip</span>
              </div>
              <div className="rewards-points-value">
                <span>2,450</span>
                <span className="points-unit">pts</span>
              </div>
              <p className="rewards-subtext">Redeem points for free charging hours or rental upgrades.</p>
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
