import React, { useState, useRef, useEffect } from 'react';

/**
 * Modern Range & Time Picker for EcoDrive
 * Matches the dark emerald aesthetic and replaces browser datetime-local.
 * Supports both standalone variant (Booking sidebar) and heroVariant (Homepage capsule).
 */
export default function RentalRangePicker({
  pickupDate,
  returnDate,
  onRangeChange,
  variant = 'default', // 'default' | 'hero'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const parseDateTime = (str) => {
    if (!str) return new Date();
    const d = new Date(str);
    return isNaN(d.getTime()) ? new Date() : d;
  };

  const currentPickup = parseDateTime(pickupDate);
  const currentReturn = parseDateTime(returnDate);

  const [viewDate, setViewDate] = useState(() => new Date(currentPickup.getFullYear(), currentPickup.getMonth(), 1));
  const [activeStep, setActiveStep] = useState('pickup'); // 'pickup' | 'return'
  const [tempStart, setTempStart] = useState(() => new Date(currentPickup.getFullYear(), currentPickup.getMonth(), currentPickup.getDate()));
  const [tempEnd, setTempEnd] = useState(() => new Date(currentReturn.getFullYear(), currentReturn.getMonth(), currentReturn.getDate()));

  const formatTimeSlot = (d) => {
    const hours = String(d.getHours()).padStart(2, '0');
    const mins = String(d.getMinutes()).padStart(2, '0');
    return `${hours}:${mins}`;
  };

  const [pickupTime, setPickupTime] = useState(() => formatTimeSlot(currentPickup));
  const [returnTime, setReturnTime] = useState(() => formatTimeSlot(currentReturn));

  // Sync with incoming props if changed externally
  useEffect(() => {
    const p = parseDateTime(pickupDate);
    const r = parseDateTime(returnDate);
    setTempStart(new Date(p.getFullYear(), p.getMonth(), p.getDate()));
    setTempEnd(new Date(r.getFullYear(), r.getMonth(), r.getDate()));
    setPickupTime(formatTimeSlot(p));
    setReturnTime(formatTimeSlot(r));
  }, [pickupDate, returnDate]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDisplayDate = (date, timeStr) => {
    if (!date) return 'Select date';
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const monthName = date.toLocaleDateString('en-US', { month: 'short' });
    const dayNum = date.getDate();
    
    const [h, m] = (timeStr || '10:00').split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 === 0 ? 12 : h % 12;
    const formattedTime = `${h12}:${String(m).padStart(2, '0')} ${period}`;

    return `${dayName}, ${monthName} ${dayNum} • ${formattedTime}`;
  };

  const formatShortDate = (date) => {
    if (!date) return 'Select';
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const formatShortTime = (timeStr) => {
    const [h, m] = (timeStr || '10:00').split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${h12}:${String(m).padStart(2, '0')} ${period}`;
  };

  const isSameDay = (d1, d2) => {
    if (!d1 || !d2) return false;
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const isBetween = (d, start, end) => {
    if (!d || !start || !end) return false;
    const t = d.getTime();
    return t > start.getTime() && t < end.getTime();
  };

  // Day selection handling allowing free movement of pickup and return
  const handleDayClick = (dayDate) => {
    const target = new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate());

    if (activeStep === 'pickup') {
      setTempStart(target);
      // If pickup is set after or equal to return date, push return date forward by 1 day
      if (!tempEnd || target >= tempEnd) {
        const nextDay = new Date(target);
        nextDay.setDate(target.getDate() + 1);
        setTempEnd(nextDay);
      }
      setActiveStep('return'); // move to selecting return next
    } else {
      // selecting return
      if (tempStart && target <= tempStart) {
        // user clicked on or before pickup: treat this as the new pickup instead!
        setTempStart(target);
        const nextDay = new Date(target);
        nextDay.setDate(target.getDate() + 1);
        setTempEnd(nextDay);
        setActiveStep('return');
      } else {
        setTempEnd(target);
      }
    }
  };

  const handleApply = () => {
    const startObj = tempStart || new Date();
    const endObj = tempEnd || new Date(startObj.getTime() + 86400000);

    const [startH, startM] = pickupTime.split(':').map(Number);
    const [endH, endM] = returnTime.split(':').map(Number);

    const finalStart = new Date(startObj);
    finalStart.setHours(startH, startM, 0, 0);

    const finalEnd = new Date(endObj);
    finalEnd.setHours(endH, endM, 0, 0);

    const pad = (n) => String(n).padStart(2, '0');
    const toLocalISO = (d) =>
      `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;

    if (onRangeChange) {
      onRangeChange({
        pickupDate: toLocalISO(finalStart),
        returnDate: toLocalISO(finalEnd),
      });
    }

    setIsOpen(false);
  };

  const handleQuickPreset = (days) => {
    const start = new Date(tempStart || new Date());
    const end = new Date(start);
    end.setDate(start.getDate() + days);

    setTempEnd(end);
    setActiveStep('return');
  };

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthLabel = viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const daysList = [];
  const prevMonthLastDate = new Date(year, month, 0).getDate();
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    daysList.push({ day: prevMonthLastDate - i, isCurrentMonth: false, date: new Date(year, month - 1, prevMonthLastDate - i) });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    daysList.push({ day: i, isCurrentMonth: true, date: new Date(year, month, i) });
  }

  const diffDays = tempStart && tempEnd ? Math.max(1, Math.round((tempEnd - tempStart) / 86400000)) : 1;

  const popularTimes = [
    { label: '9:00 AM', val: '09:00' },
    { label: '10:00 AM', val: '10:00' },
    { label: '1:00 PM', val: '13:00' },
    { label: '6:00 PM', val: '18:00' },
  ];

  return (
    <div className={`rental-range-picker-container ${variant === 'hero' ? 'variant-hero' : ''}`} ref={containerRef}>
      
      {/* 1. HERO CAPSULE TRIGGER (for Homepage) */}
      {variant === 'hero' ? (
        <div className="hero-range-trigger-pair">
          <div 
            className={`search-segment search-segment-date ${activeStep === 'pickup' && isOpen ? 'active-hero-segment' : ''}`}
            onClick={() => {
              setActiveStep('pickup');
              setIsOpen(true);
            }}
          >
            <div className="segment-label">Pick-Up Date</div>
            <div className="segment-content">
              <div className="segment-text-wrap">
                <div className="segment-main-val">{formatShortDate(tempStart)}</div>
                <div className="segment-sub-val text-emerald">{formatShortTime(pickupTime)}</div>
              </div>
            </div>
          </div>

          <div className="segment-divider"></div>

          <div 
            className={`search-segment search-segment-date ${activeStep === 'return' && isOpen ? 'active-hero-segment' : ''}`}
            onClick={() => {
              setActiveStep('return');
              setIsOpen(true);
            }}
          >
            <div className="segment-label">Return Date</div>
            <div className="segment-content">
              <div className="segment-text-wrap">
                <div className="segment-main-val">{formatShortDate(tempEnd)}</div>
                <div className="segment-sub-val text-emerald">{formatShortTime(returnTime)}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* 2. DEFAULT TRIGGER (for Vehicle Detail Booking Sidebar) */
        <div 
          className="range-picker-trigger" 
          onClick={() => setIsOpen(!isOpen)}
          role="button"
          tabIndex={0}
        >
          <div 
            className={`range-slot ${activeStep === 'pickup' && isOpen ? 'active-slot' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setActiveStep('pickup');
              setIsOpen(true);
            }}
          >
            <span className="slot-badge">📍 Pick-up Date & Time</span>
            <span className="slot-value">{formatDisplayDate(tempStart, pickupTime)}</span>
          </div>

          <div className="range-slot-arrow">→</div>

          <div 
            className={`range-slot ${activeStep === 'return' && isOpen ? 'active-slot' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setActiveStep('return');
              setIsOpen(true);
            }}
          >
            <span className="slot-badge">🏁 Return Date & Time</span>
            <span className="slot-value">{formatDisplayDate(tempEnd, returnTime)}</span>
          </div>

          <button 
            type="button" 
            className="range-picker-edit-btn" 
            aria-label="Toggle Date Picker"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
          >
            {isOpen ? '✕' : '📅 Edit'}
          </button>
        </div>
      )}

      {/* Popover Dropdown (Used by both variants) */}
      {isOpen && (
        <div className={`range-picker-popover ${variant === 'hero' ? 'hero-popover-dropdown' : ''}`}>
          {/* Quick presets */}
          <div className="range-presets-row">
            <span className="preset-label">Quick Rentals:</span>
            <button type="button" className="preset-chip" onClick={() => handleQuickPreset(1)}>+1 Day</button>
            <button type="button" className="preset-chip" onClick={() => handleQuickPreset(2)}>+Weekend (2d)</button>
            <button type="button" className="preset-chip" onClick={() => handleQuickPreset(5)}>+5 Days</button>
            <button type="button" className="preset-chip discount" onClick={() => handleQuickPreset(7)}>+1 Week (-10%)</button>
          </div>

          {/* Active Step Selection Switcher */}
          <div className="picker-tabs-row">
            <button 
              type="button" 
              className={`picker-tab-btn ${activeStep === 'pickup' ? 'selected' : ''}`}
              onClick={() => setActiveStep('pickup')}
            >
              📍 Set Pick-up ({tempStart ? tempStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Choose'})
            </button>
            <button 
              type="button" 
              className={`picker-tab-btn ${activeStep === 'return' ? 'selected' : ''}`}
              onClick={() => setActiveStep('return')}
            >
              🏁 Set Return ({tempEnd ? tempEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Choose'})
            </button>
          </div>

          {/* Calendar Month Header */}
          <div className="range-calendar-header">
            <span className="month-title">{monthLabel}</span>
            <div className="month-nav-btns">
              <button 
                type="button" 
                onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))} 
                className="nav-btn"
              >
                ◀
              </button>
              <button 
                type="button" 
                onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))} 
                className="nav-btn"
              >
                ▶
              </button>
            </div>
          </div>

          {/* Weekdays */}
          <div className="range-weekdays-grid">
            <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
          </div>

          {/* Days Grid */}
          <div className="range-days-grid">
            {daysList.map((item, idx) => {
              const isStart = isSameDay(item.date, tempStart);
              const isEnd = isSameDay(item.date, tempEnd);
              const inRange = isBetween(item.date, tempStart, tempEnd);

              let cellClass = 'range-day-cell';
              if (!item.isCurrentMonth) cellClass += ' day-muted';
              if (inRange) cellClass += ' day-in-range';
              if (isStart) cellClass += ' day-start';
              if (isEnd) cellClass += ' day-end';

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => item.isCurrentMonth && handleDayClick(item.date)}
                  className={cellClass}
                >
                  {item.day}
                </button>
              );
            })}
          </div>

          {/* Time Picker Bar */}
          <div className="range-time-section">
            <div className="time-select-group">
              <label>📍 Pick-up Time:</label>
              <div className="time-slots-container">
                {popularTimes.map((t) => (
                  <button
                    key={`p-${t.val}`}
                    type="button"
                    className={`time-slot-btn ${pickupTime === t.val ? 'active' : ''}`}
                    onClick={() => setPickupTime(t.val)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="time-select-group">
              <label>🏁 Return Time:</label>
              <div className="time-slots-container">
                {popularTimes.map((t) => (
                  <button
                    key={`r-${t.val}`}
                    type="button"
                    className={`time-slot-btn ${returnTime === t.val ? 'active' : ''}`}
                    onClick={() => setReturnTime(t.val)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Popover Footer */}
          <div className="range-popover-footer">
            <div className="range-summary-info">
              <span>Rental Duration: <strong className="highlight">{diffDays} {diffDays === 1 ? 'Day' : 'Days'}</strong></span>
            </div>
            <div className="range-action-btns">
              <button type="button" className="btn-cancel" onClick={() => setIsOpen(false)}>
                Cancel
              </button>
              <button type="button" className="btn-confirm-dates" onClick={handleApply}>
                Confirm Dates ({diffDays}d)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
