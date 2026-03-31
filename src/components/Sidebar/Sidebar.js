import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  Layers,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ collapsed, onToggle, darkMode, onToggleDarkMode }) => {
  const navItems = [
    { path: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/subjects',  icon: <BookOpen size={20} />,        label: 'Subjects'   },
    { path: '/planner',   icon: <CalendarDays size={20} />,    label: 'Planner'    },
    { path: '/flashcards',icon: <Layers size={20} />,          label: 'Flashcards' },
  ];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!collapsed && <span className="sidebar-logo">EduFlow</span>}
        <button className="toggle-btn" onClick={onToggle} aria-label="Toggle Sidebar">
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
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
        {/* Dark Mode Toggle */}
        <button
          className="theme-toggle-btn"
          onClick={onToggleDarkMode}
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          <span className="nav-icon">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </span>
          {!collapsed && (
            <span className="nav-label">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          )}
        </button>


      </div>
    </aside>
  );
};

export default Sidebar;