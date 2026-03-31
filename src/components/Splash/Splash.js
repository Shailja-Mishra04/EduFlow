import React, { useEffect, useState } from 'react';
import './Splash.css';

const letters = 'EduFlow'.split('');

// A perfectly wrapping wave path
const wavePath = "M0,80 C240,140 480,20 720,80 C960,140 1200,20 1440,80 L1440,320 L0,320 Z";

const Splash = ({ onDone }) => {
  const [phase, setPhase] = useState('show');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('fade'), 2600);
    const t2 = setTimeout(() => onDone(), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div className={`splash splash--${phase}`}>
      
      {/* 5 overlapping waves covering the entire page */}
      <div className="overlapping-waves">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
          <svg
            key={i}
            className={`wave-layer wl-${i}`}
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d={wavePath} />
          </svg>
        ))}
      </div>

      <h1 className="splash-logo" aria-label="EduFlow">
        {letters.map((ch, i) => (
          <span
            key={i}
            className="sl"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            {ch}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default Splash;
