import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <Link to="/" className="footer-brand">
            <span className="footer-brand-icon">🌱</span>
            <span>EcoDrive Car Rental</span>
          </Link>
          <p className="footer-desc">
            Accelerating California's transition to sustainable shared transport through 100% electric luxury fleets.
          </p>
        </div>
        <div className="footer-nav">
          <Link to="/">Home</Link>
          <Link to="/fleet">Fleet Models</Link>
          <Link to="/sustainability">Carbon Offsetting</Link>
          <Link to="/account">Support & Hubs</Link>
        </div>
      </div>
      <div className="footer-bottom-bar">
        <p>© 2026 EcoDrive Car Rental. Front End Group Project.</p>
      </div>
    </footer>
  );
}
