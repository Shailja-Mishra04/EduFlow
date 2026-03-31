import React, { useState, useEffect } from 'react';
import './Flashcards.css';
import { Layers, Play, Plus } from 'lucide-react';

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState(() => {
    const saved = localStorage.getItem('eduflow-flashcards');
    return saved ? JSON.parse(saved) : [];
  });
  const [subjects] = useState(() => {
    const saved = localStorage.getItem('eduflow-subjects');
    return saved ? JSON.parse(saved) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [newCard, setNewCard] = useState({ question: '', answer: '', subject: '' });
  const [flipped, setFlipped] = useState({});
  const [filterSubject, setFilterSubject] = useState('all');
  const [studyMode, setStudyMode] = useState(false);
  const [studyIndex, setStudyIndex] = useState(0);
  const [studyFlipped, setStudyFlipped] = useState(false);

  useEffect(() => {
    localStorage.setItem('eduflow-flashcards', JSON.stringify(flashcards));
  }, [flashcards]);

  const addCard = () => {
    if (!newCard.question.trim() || !newCard.answer.trim()) return;
    setFlashcards([...flashcards, { id: Date.now(), ...newCard }]);
    setNewCard({ question: '', answer: '', subject: '' });
    setShowForm(false);
  };

  const deleteCard = (id) => {
    setFlashcards(flashcards.filter(c => c.id !== id));
  };

  const toggleFlip = (id) => {
    setFlipped(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filtered =
    filterSubject === 'all'
      ? flashcards
      : flashcards.filter(c => c.subject === filterSubject);

  const startStudy = () => {
    if (filtered.length === 0) return;
    setStudyMode(true);
    setStudyIndex(0);
    setStudyFlipped(false);
  };

  const nextCard = () => {
    setStudyFlipped(false);
    setTimeout(() => setStudyIndex(i => (i + 1) % filtered.length), 150);
  };

  const prevCard = () => {
    setStudyFlipped(false);
    setTimeout(() => setStudyIndex(i => (i - 1 + filtered.length) % filtered.length), 150);
  };

  if (studyMode && filtered.length > 0) {
    const card = filtered[studyIndex];
    return (
      <div className="flashcards-page">
        <div className="study-mode">
          <div className="study-header">
            <button className="btn-secondary" onClick={() => setStudyMode(false)}>
              ← Exit Study Mode
            </button>
            <span className="study-progress">
              {studyIndex + 1} / {filtered.length}
            </span>
          </div>

          <div
            className="study-card-wrap"
            onClick={() => setStudyFlipped(!studyFlipped)}
          >
            <div className={`study-card ${studyFlipped ? 'flipped' : ''}`}>
              <div className="study-card-front">
                <div className="card-label">Question</div>
                <div className="card-text">{card.question}</div>
                <div className="card-hint">Click to reveal answer</div>
              </div>

              <div className="study-card-back">
                <div className="card-label">Answer</div>
                <div className="card-text">{card.answer}</div>
              </div>
            </div>
          </div>

          <div className="study-controls">
            <button className="btn-primary" onClick={prevCard}>← Prev</button>
            <button className="btn-primary" onClick={nextCard}>Next →</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flashcards-page">
      <div className="flashcards-header">
        <div>
          <h1><Layers className="page-icon" /> Flashcards</h1>
          <p>Create and study your flashcards</p>
        </div>

        <div className="header-actions">
          <button
            className="btn-secondary"
            onClick={startStudy}
            disabled={filtered.length === 0}
          >
            <Play size={16} style={{ marginRight: '6px' }} /> Study Mode
          </button>

          <button className="btn-primary" onClick={() => setShowForm(true)}>
            <Plus size={18} /> New Card
          </button>
        </div>
      </div>

      {/* Filter */}
      <div className="filter-row">
        <button
          className={`filter-btn ${filterSubject === 'all' ? 'active' : ''}`}
          onClick={() => setFilterSubject('all')}
        >
          All ({flashcards.length})
        </button>

        {subjects.map(s => (
          <button
            key={s.id}
            className={`filter-btn ${filterSubject === s.name ? 'active' : ''}`}
            onClick={() => setFilterSubject(s.name)}
          >
            {s.emoji} {s.name} (
            {flashcards.filter(c => c.subject === s.name).length})
          </button>
        ))}
      </div>

      {/* Add form */}
      {showForm && (
        <div className="add-card-form">
          <h3>New Flashcard</h3>

          <div className="form-row">
            <textarea
              placeholder="Question..."
              value={newCard.question}
              onChange={e =>
                setNewCard({ ...newCard, question: e.target.value })
              }
              className="card-textarea"
              rows={3}
            />

            <textarea
              placeholder="Answer..."
              value={newCard.answer}
              onChange={e =>
                setNewCard({ ...newCard, answer: e.target.value })
              }
              className="card-textarea"
              rows={3}
            />
          </div>

          <div className="form-bottom">
            <select
              className="subject-select"
              value={newCard.subject}
              onChange={e =>
                setNewCard({ ...newCard, subject: e.target.value })
              }
            >
              <option value="">No subject</option>
              {subjects.map(s => (
                <option key={s.id} value={s.name}>
                  {s.emoji} {s.name}
                </option>
              ))}
            </select>

            <div className="form-actions">
              <button
                className="btn-secondary"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button className="btn-primary" onClick={addCard}>
                Add Card
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty */}
      {filtered.length === 0 && (
        <div className="flashcards-empty">
          <div className="empty-icon"><Layers size={48} color="#ccc" /></div>
          <h2>No flashcards yet</h2>
          <p>Create your first flashcard to start studying</p>
        </div>
      )}

      {/* Cards */}
      <div className="cards-grid">
        {filtered.map(card => (
          <div
            key={card.id}
            className={`flash-card ${flipped[card.id] ? 'flipped' : ''}`}
            onClick={() => toggleFlip(card.id)}
          >
            <div className="flash-card-inner">
              <div className="flash-card-front">
                <div className="card-label">Q</div>
                <div className="card-body">{card.question}</div>

                {card.subject && (
                  <div className="card-subject-tag">{card.subject}</div>
                )}
              </div>

              <div className="flash-card-back">
                <div className="card-label">A</div>
                <div className="card-body">{card.answer}</div>
              </div>

              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteCard(card.id);
                }}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Flashcards;