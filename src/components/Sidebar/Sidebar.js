import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ collapsed, onToggle, darkMode, onToggleDarkMode }) => {
  const navItems = [
    { path: '/dashboard', icon: '🏠', label: 'Dashboard' },
    { path: '/subjects', icon: '📚', label: 'Subjects' },
    { path: '/planner', icon: '📅', label: 'Planner' },
    { path: '/flashcards', icon: '🃏', label: 'Flashcards' },
  ];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!collapsed && <span className="sidebar-logo">EduFlow</span>}
        <button className="toggle-btn" onClick={onToggle} aria-label="Toggle Sidebar">
          {collapsed ? '→' : '←'}
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            {!collapsed && <span className="nav-label">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        {/* Dark Mode Toggle Button */}
        <button 
          className="theme-toggle-btn" 
          onClick={onToggleDarkMode}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          <span className="nav-icon">{darkMode ? '☀️' : '🌙'}</span>
          {!collapsed && <span className="nav-label">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>

        {/* Settings Item */}
        <div className="nav-item">
          <span className="nav-icon">⚙️</span>
          {!collapsed && <span className="nav-label">Settings</span>}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;