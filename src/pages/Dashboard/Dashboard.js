import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">

      {/* Center Content */}
      <div className="dashboard-center">

        <h1 className="dashboard-title">
          Let’s Lock In 🔒
        </h1>

        <p className="dashboard-subtitle">
          Stay focused. Stay consistent.
        </p>

        {/* Quick Actions */}
        <div className="dashboard-actions">
          <button onClick={() => navigate('/subjects')}>
            📚 Subjects
          </button>

          <button onClick={() => navigate('/workspace/math/unit1/topic1')}>
            🧠 Resume Study
          </button>

          <button onClick={() => navigate('/flashcards')}>
            🃏 Flashcards
          </button>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;