import React, { useState } from "react";
import "./Planner.css";

function Planner() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [notes, setNotes] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [input, setInput] = useState("");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const changeMonth = (dir) => {
    setCurrentDate(new Date(year, month + dir, 1));
  };

  const handleAddNote = () => {
    if (!input) return;

    setNotes({
      ...notes,
      [selectedDate]: [...(notes[selectedDate] || []), input],
    });

    setInput("");
  };

  const getDateKey = (day) => {
    return `${year}-${month + 1}-${day}`;
  };

  return (
    <div className="calendar-container">

      {/* Header */}
      <div className="calendar-header">
        <button onClick={() => changeMonth(-1)}>⬅</button>
        <h2>
          {currentDate.toLocaleString("default", { month: "long" })} {year}
        </h2>
        <button onClick={() => changeMonth(1)}>➡</button>
      </div>

      {/* Grid */}
      <div className="calendar-grid">

        {/* Empty spaces before month starts */}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={"empty" + i}></div>
        ))}

        {/* Days */}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const key = getDateKey(day);

          return (
            <div
              key={day}
              className="calendar-day"
              onClick={() => setSelectedDate(key)}
            >
              <div className="day-number">{day}</div>

              {(notes[key] || []).map((n, idx) => (
                <div key={idx} className="note">
                  {n}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selectedDate && (
        <div className="modal">
          <div className="modal-content">
            <h3>{selectedDate}</h3>

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add task (e.g. Physics exam)"
            />

            <button onClick={handleAddNote}>Add</button>
            <button onClick={() => setSelectedDate(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Planner;