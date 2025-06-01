import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import "../css/style.css"

const Schedule = () => {
  const timeSlots = [
    { start: '9:00', end: '10:00', active: true },
    { start: '10:00', end: '11:00', active: true },
    { start: '11:00', end: '12:00', active: true },
    { start: '12:00', end: '1:00', active: true },
    { start: '1:00', end: '2:00', active: true },
    { start: '2:00', end: '3:00', active: true },
    { start: '3:00', end: '4:00', active: true },
    { start: '4:00', end: '5:00', active: false },
  ];

  const days = [
    { day: 'Mon', date: '3' },
    { day: 'Tue', date: '4' },
    { day: 'Wed', date: '5' },
    { day: 'Thu', date: '6' },
    { day: 'Fri', date: '7' },
    { day: 'Sat', date: '8' },
  ];

  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <h1>Hi, Dr. Phuntsho Wangs</h1>
        <h2>Disable your availability</h2>
      </div>

      <div className="schedule-body">
        <div className="calendar-nav">
          <button className="nav-btn">
            <ChevronLeft />
          </button>
          <div className="days-container">
            {days.map((day) => (
              <div key={day.day} className={`day-item ${day.day === 'Fri' ? 'active' : ''}`}>
                <span className="day-name">{day.day}</span>
                <span className="day-number">{day.date}</span>
              </div>
            ))}
          </div>
          <button className="nav-btn">
            <ChevronRight />
          </button>
        </div>

        <div className="date-display">Tuesday, March 4, 2025</div>

        <div className="time-slots">
          {timeSlots.map((slot, index) => (
            <div key={index} className="time-slot">
              <span>Today at</span>
              <select className="time-select">
                <option>{slot.start}</option>
              </select>
              <select className="meridian-select">
                <option>{parseInt(slot.start) < 12 ? 'am' : 'pm'}</option>
              </select>
              <span>to</span>
              <select className="time-select">
                <option>{slot.end}</option>
              </select>
              <select className="meridian-select">
                <option>{parseInt(slot.end) < 12 ? 'am' : 'pm'}</option>
              </select>
              <div className={`status-indicator ${slot.active ? 'active' : 'inactive'}`}>
                {slot.active ? 'Active' : 'Inactive'}
              </div>
            </div>
          ))}
        </div>

        <div className="actions">
          <label className="select-all">
            <input type="checkbox" />
            <span>Select all</span>
          </label>
          <button className="post-btn">Post</button>
        </div>
      </div>
    </div>

  );
};

export default Schedule;