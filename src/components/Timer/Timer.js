import React, { useState, useEffect } from 'react';
import './Timer.css';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

  // Timer logic
  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  // Format time (HH:MM:SS)
  const formatTime = () => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div className={`timer ${collapsed ? 'collapsed' : ''}`}>

      {/* Collapsed button */}
      {collapsed && (
        <button
          className="timer-toggle-btn"
          onClick={() => setCollapsed(false)}
        >
          ⏱
        </button>
      )}

      {/* Expanded Timer */}
      {!collapsed && (
        <div className="timer-panel">

          <div className="timer-header">
            <span>Study Timer</span>
            <button onClick={() => setCollapsed(true)}>—</button>
          </div>

          <div className="timer-display">
            {formatTime()}
          </div>

          <div className="timer-controls">
            <button onClick={() => setIsRunning(true)}>Start</button>
            <button onClick={() => setIsRunning(false)}>Pause</button>
            <button onClick={() => {
              setIsRunning(false);
              setSeconds(0);
            }}>
              Reset
            </button>
          </div>

        </div>
      )}

    </div>
  );
}

export default Timer;