import React, { useState, useEffect } from 'react';
import { Plus, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import './Planner.css';

const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

const Planner = () => {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('eduflow-events');
    return saved ? JSON.parse(saved) : [];
  });

  const today = new Date();
  const [current, setCurrent] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '', date: '', type: 'study', notes: ''
  });

  useEffect(() => {
    localStorage.setItem('eduflow-events', JSON.stringify(events));
  }, [events]);

  const year = current.getFullYear();
  const month = current.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();

  const cells = [];
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: daysInPrev - i, current: false });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    cells.push({ day: i, current: true });
  }
  while (cells.length % 7 !== 0) {
    cells.push({ day: cells.length - daysInMonth - firstDay + 1, current: false });
  }

  const getEventsForDay = (day) => {
    if (!day.current) return [];
    return events.filter(e => {
      const d = new Date(e.date);
      return (
        d.getDate() === day.day &&
        d.getMonth() === month &&
        d.getFullYear() === year
      );
    });
  };

  const isToday = (day) =>
    day.current &&
    day.day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const addEvent = () => {
    if (!newEvent.title.trim() || !newEvent.date) return;
    setEvents([...events, { id: Date.now(), ...newEvent }]);
    setNewEvent({ title: '', date: '', type: 'study', notes: '' });
    setShowForm(false);
  };

  const deleteEvent = (id) =>
    setEvents(events.filter(e => e.id !== id));

  const selectedEvents = selected
    ? events.filter(e => {
        const d = new Date(e.date);
        return (
          d.getDate() === selected.day &&
          d.getMonth() === month &&
          d.getFullYear() === year
        );
      })
    : [];

  const upcomingEvents = events
    .filter(e => new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 6);

  return (
    <div className="planner-page">
      {/* Header */}
      <div className="planner-header">
        <div>
          <h1>Planner</h1>
          <p>Track your exams, deadlines and study sessions</p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(true)}>
          <Plus size={16} /> Add Event
        </button>
      </div>

      <div className="planner-layout">
        {/* Calendar */}
        <div className="planner-calendar">
          <div className="cal-nav-header">
            <button
              className="cal-nav-btn"
              onClick={() => setCurrent(new Date(year, month - 1, 1))}
            >
              <ChevronLeft size={16} />
            </button>
            <h2>{MONTHS[month]} {year}</h2>
            <button
              className="cal-nav-btn"
              onClick={() => setCurrent(new Date(year, month + 1, 1))}
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="cal-grid-full">
            {DAYS.map(d => (
              <div key={d} className="cal-day-name">{d}</div>
            ))}
            {cells.map((cell, i) => {
              const dayEvents = getEventsForDay(cell);
              const isSelected =
                selected && selected.day === cell.day && cell.current;
              return (
                <div
                  key={i}
                  className={`cal-cell
                    ${!cell.current ? 'other-month' : ''}
                    ${isToday(cell) ? 'today' : ''}
                    ${isSelected ? 'selected' : ''}
                  `}
                  onClick={() => cell.current && setSelected(cell)}
                >
                  <span className="cal-cell-num">{cell.day}</span>
                  <div className="cal-cell-events">
                    {dayEvents.slice(0, 2).map(e => (
                      <div key={e.id} className={`cal-event-dot ${e.type}`}>
                        {e.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="cal-event-more">
                        +{dayEvents.length - 2}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right panel */}
        <div className="planner-right">
          {/* Selected day */}
          {selected && (
            <div className="day-detail">
              <h3>{MONTHS[month]} {selected.day}, {year}</h3>
              {selectedEvents.length === 0 ? (
                <p className="no-events">No events this day</p>
              ) : (
                selectedEvents.map(e => (
                  <div key={e.id} className="event-card">
                    <div className="event-card-top">
                      <span className="event-title">{e.title}</span>
                      <button
                        className="event-delete"
                        onClick={() => deleteEvent(e.id)}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                    {e.notes && (
                      <p className="event-notes">{e.notes}</p>
                    )}
                    <span className={`event-type-tag ${e.type}`}>
                      {e.type}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Upcoming */}
          <div className="upcoming-section">
            <h3>Upcoming</h3>
            {upcomingEvents.length === 0 ? (
              <p className="no-events">No upcoming events</p>
            ) : (
              upcomingEvents.map(e => {
                const d = new Date(e.date);
                return (
                  <div key={e.id} className="upcoming-event-row">
                    <div className={`upcoming-badge ${e.type}`}>
                      <span>{d.getDate()}</span>
                      <span>{MONTHS[d.getMonth()].slice(0, 3)}</span>
                    </div>
                    <div className="upcoming-event-info">
                      <span className="upcoming-event-title">{e.title}</span>
                      <span className={`event-type-tag ${e.type}`}>
                        {e.type}
                      </span>
                    </div>
                    <button
                      className="event-delete"
                      onClick={() => deleteEvent(e.id)}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>New Event</h2>

            <div className="modal-field">
              <label>Title</label>
              <input
                placeholder="e.g. Math Exam"
                value={newEvent.title}
                onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                autoFocus
              />
            </div>

            <div className="modal-field">
              <label>Date</label>
              <input
                type="date"
                value={newEvent.date}
                onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
              />
            </div>

            <div className="modal-field">
              <label>Type</label>
              <select
                value={newEvent.type}
                onChange={e => setNewEvent({ ...newEvent, type: e.target.value })}
              >
                <option value="exam">Exam</option>
                <option value="deadline">Deadline</option>
                <option value="study">Study Session</option>
              </select>
            </div>

            <div className="modal-field">
              <label>Notes (optional)</label>
              <input
                placeholder="Any additional notes..."
                value={newEvent.notes}
                onChange={e => setNewEvent({ ...newEvent, notes: e.target.value })}
              />
            </div>

            <div className="modal-actions">
              <button
                className="btn-secondary"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button className="btn-primary" onClick={addEvent}>
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Planner;