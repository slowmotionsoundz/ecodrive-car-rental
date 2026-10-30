import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import HomePage from './pages/HomePage';
import FleetPage from './pages/FleetPage';
import VehicleDetailPage from './pages/VehicleDetailPage';
import SustainabilityPage from './pages/SustainabilityPage';
import AccountPage from './pages/AccountPage';
import BookingPage from './pages/BookingPage';

import './App.css';

const getDateTimeWithOffset = (dayOffset, time) => {
  const date = new Date();
  date.setDate(date.getDate() + dayOffset);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}T${time}`;
};

export default function App() {
  const [selectedHub, setSelectedHub] = useState('SFO Airport Hub');
  const [pickupDate, setPickupDate] = useState(() => getDateTimeWithOffset(-1, '10:00'));
  const [returnDate, setReturnDate] = useState(() => getDateTimeWithOffset(6, '18:00'));
  const [activeRentalCar, setActiveRentalCar] = useState('Tesla Model Y Long Range');
  const [isLocked, setIsLocked] = useState(true);
  const [bookingToast, setBookingToast] = useState('');

  const handleReserveCar = (car) => {
    setActiveRentalCar(car.name);
    setBookingToast(`🎉 Reserved ${car.name}! Digital key ready in My Account.`);
    setTimeout(() => {
      setBookingToast('');
    }, 5000);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="ecodrive-app">
        {/* Global Toast */}
        {bookingToast && (
          <div className="booking-toast">
            <span>{bookingToast}</span>
            <button className="toast-close" onClick={() => setBookingToast('')}>✕</button>
          </div>
        )}

        {/* Global Header Navigation */}
        <Navbar selectedHub={selectedHub} />

        {/* Dynamic Route Pages */}
        <main className="app-main-content">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  selectedHub={selectedHub}
                  setSelectedHub={setSelectedHub}
                  pickupDate={pickupDate}
                  setPickupDate={setPickupDate}
                  returnDate={returnDate}
                  setReturnDate={setReturnDate}
                  activeRentalCar={activeRentalCar}
                  onReserveCar={handleReserveCar}
                  isLocked={isLocked}
                  setIsLocked={setIsLocked}
                />
              }
            />
            <Route
              path="/fleet"
              element={
                <FleetPage
                  onReserveCar={handleReserveCar}
                  activeRentalCar={activeRentalCar}
                />
              }
            />
            <Route
              path="/fleet/:id"
              element={
                <VehicleDetailPage
                  selectedHub={selectedHub}
                  setSelectedHub={setSelectedHub}
                  pickupDate={pickupDate}
                  setPickupDate={setPickupDate}
                  returnDate={returnDate}
                  setReturnDate={setReturnDate}
                  onReserveCar={handleReserveCar}
                  activeRentalCar={activeRentalCar}
                />
              }
            />
            <Route
              path="/sustainability"
              element={<SustainabilityPage />}
            />
            <Route
              path="/booking"
              element={
                <BookingPage
                  selectedHub={selectedHub}
                  setSelectedHub={setSelectedHub}
                  pickupDate={pickupDate}
                  setPickupDate={setPickupDate}
                  returnDate={returnDate}
                  setReturnDate={setReturnDate}
                  activeRentalCar={activeRentalCar}
                  setActiveRentalCar={setActiveRentalCar}
                  setIsLocked={setIsLocked}
                />
              }
            />
            <Route
              path="/account"
              element={
                <AccountPage
                  activeRentalCar={activeRentalCar}
                  selectedHub={selectedHub}
                  pickupDate={pickupDate}
                  returnDate={returnDate}
                  isLocked={isLocked}
                  setIsLocked={setIsLocked}
                />
              }
            />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </Router>
  );
}
