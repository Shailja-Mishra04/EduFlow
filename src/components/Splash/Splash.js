import React, { useEffect, useState } from 'react';
import './Splash.css';

const letters = 'EDUFLOW'.split('');
const wavePath = "M0,160 C180,220 360,100 540,160 C720,220 900,100 1080,160 C1260,220 1380,130 1440,160 L1440,320 L0,320 Z";

const Splash = ({ onDone }) => {
  const [phase, setPhase] = useState('show');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('fade'), 3800);
    const t2 = setTimeout(() => onDone(), 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div className={`splash splash--${phase}`}>

      {/* Waves from top */}
      <div className="wave-container">
        {[1,2,3,4,5,6,7,8,9,10].map(i => (
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

      {/* Text block */}
      <div className="splash-text-block">
        <h1 className="splash-logo" aria-label="EDUFLOW">
          {letters.map((ch, i) => (
            <span
              key={i}
              className="sl"
              style={{ animationDelay: `${0.2 + i * 0.12}s` }}
            >
              {ch}
            </span>
          ))}
        </h1>
        <p className="splash-tagline">Your smart study workspace</p>
      </div>

    </div>
  );
};

export default Splash;