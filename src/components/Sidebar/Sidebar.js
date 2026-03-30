import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { path: '/dashboard', icon: '🏠', label: 'Dashboard' },
    { path: '/subjects', icon: '📚', label: 'Subjects' },
    { path: '/planner', icon: '📅', label: 'Planner' },
    { path: '/flashcards', icon: '🃏', label: 'Flashcards' },
  ];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>

      {/* Logo + Toggle */}
      <div className="sidebar-header">
        {!collapsed && <span className="sidebar-logo">EduFlow</span>}
        <button
          className="toggle-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `nav-item ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">{item.icon}</span>
            {!collapsed && <span className="nav-label">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom section — for future user profile/settings */}
      <div className="sidebar-footer">
        <div className="nav-item">
          <span className="nav-icon">⚙️</span>
          {!collapsed && <span className="nav-label">Settings</span>}
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;
