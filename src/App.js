import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import Subjects from './pages/Subjects/Subjects';
import Workspace from './pages/Workspace/Workspace';
import Flashcards from './pages/Flashcards/Flashcards';
import Planner from './pages/Planner/Planner';
import Timer from './components/Timer/Timer';
import TodoList from './components/TodoList/TodoList';
import './App.css';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // DARK MODE STATE: Checks local storage so it remembers your choice
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('eduflow-darkmode');
    return saved === 'true';
  });

  // EFFECT: Updates the body class and saves preference
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('eduflow-darkmode', darkMode);
  }, [darkMode]);

  return (
    <Router>
      <div className="app-container">
        {/* Pass dark mode props to Sidebar for the toggle button */}
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
        />
        
        <main className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/workspace/:subject/:unit/:topic" element={<Workspace />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/planner" element={<Planner />} />
          </Routes>
        </main>
        
        <Timer />
        <TodoList />
      </div>
    </Router>
  );
}

export default App;