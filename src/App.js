import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout
import Sidebar from './components/Sidebar/Sidebar';

// Pages
import Dashboard from './pages/Dashboard/Dashboard';
import Subjects from './pages/Subjects/Subjects';
import Workspace from './pages/Workspace/Workspace';
import Flashcards from './pages/Flashcards/Flashcards';
import Planner from './pages/Planner/Planner';

// Global components
import Timer from './components/Timer/Timer';
import TodoList from './components/TodoList/TodoList';

// Styles
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">

        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/workspace/:subject/:unit/:topic" element={<Workspace />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/planner" element={<Planner />} />
          </Routes>
        </main>

        {/* Global Tools */}
        <Timer />
        <TodoList />

      </div>
    </Router>
  );
}

export default App;