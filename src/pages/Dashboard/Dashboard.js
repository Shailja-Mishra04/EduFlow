import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  CheckSquare,
  Layers,
  CalendarDays,
  Clock,
  Target,
  Sun,
  Cloud,
  Moon,
  Rocket,
} from 'lucide-react';
import './Dashboard.css';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];

const MiniCalendar = ({ events }) => {
  const today = new Date();
  const [current, setCurrent] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

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

  const isToday = (day) =>
    day.current &&
    day.day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const hasEvent = (day) =>
    day.current &&
    events.some(e => {
      const d = new Date(e.date);
      return d.getDate() === day.day && d.getMonth() === month && d.getFullYear() === year;
    });

  return (
    <div className="mini-calendar">
      <div className="cal-header">
        <button className="cal-nav" onClick={() => setCurrent(new Date(year, month - 1, 1))}>‹</button>
        <span>{MONTHS[month]} {year}</span>
        <button className="cal-nav" onClick={() => setCurrent(new Date(year, month + 1, 1))}>›</button>
      </div>
      <div className="cal-grid">
        {DAYS.map(d => <div key={d} className="cal-day-name">{d}</div>)}
        {cells.map((cell, i) => (
          <div
            key={i}
            className={`cal-day ${!cell.current ? 'other-month' : ''} ${isToday(cell) ? 'today' : ''} ${hasEvent(cell) ? 'has-event' : ''}`}
          >
            {cell.day}
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('eduflow-events');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Math Exam', date: new Date(Date.now() + 2 * 86400000).toISOString(), type: 'exam' },
      { id: 2, title: 'Physics Assignment', date: new Date(Date.now() + 5 * 86400000).toISOString(), type: 'deadline' },
      { id: 3, title: 'Study Group', date: new Date(Date.now() + 7 * 86400000).toISOString(), type: 'study' },
    ];
  });

  const [subjects] = useState(() => {
    const saved = localStorage.getItem('eduflow-subjects');
    return saved ? JSON.parse(saved) : [];
  });

  const [todos] = useState(() => {
    const saved = localStorage.getItem('eduflow-todos');
    return saved ? JSON.parse(saved) : [];
  });

  const [flashcards] = useState(() => {
    const saved = localStorage.getItem('eduflow-flashcards');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('eduflow-events', JSON.stringify(events));
  }, [events]);

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return { icon: <Sun size={22} />, text: 'Good Morning' };
    if (h < 17) return { icon: <Cloud size={22} />, text: 'Good Afternoon' };
    return { icon: <Moon size={22} />, text: 'Good Evening' };
  };

  const greeting = getGreeting();

  const upcomingEvents = events
    .filter(e => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 4);

  const quickActions = [
    { icon: <BookOpen size={22} />,   label: 'My Subjects', path: '/subjects' },
    { icon: <Layers size={22} />,     label: 'Flashcards',  path: '/flashcards' },
    { icon: <CalendarDays size={22} />,label: 'Planner',    path: '/planner' },
    { icon: <Target size={22} />,     label: 'Workspace',   path: '/workspace/general/unit1/topic1' },
  ];

  return (
    <div className="dashboard">
      {/* Greeting */}
      <div className="dashboard-greeting">
        <h1>
          <span className="greeting-icon">{greeting.icon}</span>
          {greeting.text}, let's get studying!&nbsp;
          <span className="rocket-icon"><Rocket size={24} /></span>
        </h1>
        <p>Here's your study overview for today</p>
      </div>

      <div className="dashboard-grid">
        {/* Stat Cards */}
        <div className="stat-card">
          <div className="stat-icon purple"><BookOpen size={22} /></div>
          <div className="stat-info">
            <h3>{subjects.length}</h3>
            <p>Active Subjects</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue"><CheckSquare size={22} /></div>
          <div className="stat-info">
            <h3>{todos.filter(t => !t.done).length}</h3>
            <p>Pending Tasks</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green"><Layers size={22} /></div>
          <div className="stat-info">
            <h3>{flashcards.length}</h3>
            <p>Flashcards</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2 className="section-title">Quick Actions</h2>
          <div className="actions-grid">
            {quickActions.map((action) => (
              <div
                key={action.path}
                className="action-btn"
                onClick={() => navigate(action.path)}
              >
                <span className="action-icon">{action.icon}</span>
                <span className="action-label">{action.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="dashboard-bottom">
          {/* Calendar */}
          <div className="calendar-card">
            <h2 className="section-title">
              <CalendarDays size={18} /> Calendar
            </h2>
            <MiniCalendar events={events} />
          </div>

          {/* Upcoming Events */}
          <div className="upcoming-card">
            <h2 className="section-title">
              <Clock size={18} /> Upcoming
            </h2>
            <div className="upcoming-list">
              {upcomingEvents.length === 0 && (
                <p className="upcoming-empty">No upcoming events. Add some in the Planner!</p>
              )}
              {upcomingEvents.map(event => {
                const d = new Date(event.date);
                return (
                  <div key={event.id} className="upcoming-item">
                    <div className="upcoming-date-badge">
                      <span className="day">{d.getDate()}</span>
                      <span className="month">{MONTHS[d.getMonth()].slice(0, 3)}</span>
                    </div>
                    <div className="upcoming-info">
                      <h4>{event.title}</h4>
                      <p>{d.toLocaleDateString('en-US', { weekday: 'long' })}</p>
                    </div>
                    <span className={`upcoming-tag ${event.type}`}>{event.type}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;