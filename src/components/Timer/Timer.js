import React, { useState, useEffect, useRef } from 'react';
import './Timer.css';

const MODES = {
  pomodoro: 25 * 60,
  short: 5 * 60,
  long: 15 * 60,
};

const Timer = () => {
  const [mode, setMode] = useState('pomodoro');
  const [timeLeft, setTimeLeft] = useState(MODES.pomodoro);
  const [running, setRunning] = useState(false);
  const [minimized, setMinimized] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const switchMode = (m) => {
    setMode(m);
    setTimeLeft(MODES[m]);
    setRunning(false);
  };

  const reset = () => {
    setTimeLeft(MODES[mode]);
    setRunning(false);
  };

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const progress = ((MODES[mode] - timeLeft) / MODES[mode]) * 100;

  if (minimized) {
    return (
      <div className="timer-float" onClick={() => setMinimized(false)}>
        <span className="timer-float-icon">⏱</span>
        <span className="timer-float-time">{fmt(timeLeft)}</span>
        {running && <span className="timer-float-dot" />}
      </div>
    );
  }

  return (
    <div className="timer-expanded">
      <div className="timer-header">
        <span className="timer-title">Focus Timer</span>
        <button className="timer-minimize" onClick={() => setMinimized(true)}>−</button>
      </div>
      <div className="timer-modes">
        {Object.keys(MODES).map(m => (
          <button
            key={m}
            className={`timer-mode-btn ${mode === m ? 'active' : ''}`}
            onClick={() => switchMode(m)}
          >
            {m === 'pomodoro' ? 'Focus' : m === 'short' ? 'Short Break' : 'Long Break'}
          </button>
        ))}
      </div>
      <div className="timer-circle-wrap">
        <svg className="timer-ring" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" className="timer-ring-bg" />
          <circle
            cx="60" cy="60" r="54"
            className="timer-ring-progress"
            strokeDasharray={`${2 * Math.PI * 54}`}
            strokeDashoffset={`${2 * Math.PI * 54 * (1 - progress / 100)}`}
          />
        </svg>
        <span className="timer-display">{fmt(timeLeft)}</span>
      </div>
      <div className="timer-controls">
        <button className="timer-btn reset" onClick={reset}>↺</button>
        <button className="timer-btn play" onClick={() => setRunning(!running)}>
          {running ? '⏸' : '▶'}
        </button>
      </div>
    </div>
  );
};

export default Timer;