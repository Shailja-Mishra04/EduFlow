import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Subjects.css';

function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const addSubject = () => {
    if (input.trim() === '') return;
    setSubjects([...subjects, input]);
    setInput('');
  };

  const goToSubject = (subject) => {
    // for now, dummy unit/topic
    navigate(`/workspace/${subject}/unit1/topic1`);
  };

  return (
    <div className="subjects-container">

      <h2>📚 Your Subjects</h2>

      {/* Add Subject */}
      <div className="subject-input">
        <input
          type="text"
          placeholder="Add new subject..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addSubject}>Add</button>
      </div>

      {/* Subject List */}
      <div className="subject-list">
        {subjects.map((subject, index) => (
          <div
            key={index}
            className="subject-card"
            onClick={() => goToSubject(subject)}
          >
            {subject}
          </div>
        ))}
      </div>

    </div>
  );
}

export default Subjects;