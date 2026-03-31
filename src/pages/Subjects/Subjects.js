import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Subjects.css';
import { BookOpen } from 'lucide-react';

const EMOJIS = ['📚','📖','✏️','🔬','🧪','🧬','🔭','🌍','📐','📏','🧮','💻','🎨','🎵','🏛️','⚗️','🧲','📊','📈','🗺️'];
const COLORS = ['#ede9ff','#dbeafe','#dcfce7','#fef3c7','#fee2e2','#fce7f3','#e0f2fe','#f0fdf4'];

const slugify = (str) => str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

const Subjects = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem('eduflow-subjects');
    return saved ? JSON.parse(saved) : [];
  });
  const [showModal, setShowModal] = useState(false);
  const [newSubject, setNewSubject] = useState({ name: '', emoji: '📚', color: '#ede9ff' });
  const [expandedUnits, setExpandedUnits] = useState({});
  const [addingUnit, setAddingUnit] = useState(null);
  const [addingTopic, setAddingTopic] = useState(null);
  const [unitInput, setUnitInput] = useState('');
  const [topicInput, setTopicInput] = useState('');

  useEffect(() => {
    localStorage.setItem('eduflow-subjects', JSON.stringify(subjects));
  }, [subjects]);

  const addSubject = () => {
    if (!newSubject.name.trim()) return;
    const subject = {
      id: Date.now(),
      name: newSubject.name.trim(),
      emoji: newSubject.emoji,
      color: newSubject.color,
      slug: slugify(newSubject.name.trim()),
      units: [],
    };
    setSubjects([...subjects, subject]);
    setNewSubject({ name: '', emoji: '📚', color: '#ede9ff' });
    setShowModal(false);
  };

  const deleteSubject = (id) => {
    setSubjects(subjects.filter(s => s.id !== id));
  };

  const addUnit = (subjectId) => {
    if (!unitInput.trim()) return;
    const unit = {
      id: Date.now(),
      name: unitInput.trim(),
      slug: slugify(unitInput.trim()),
      topics: [],
    };
    setSubjects(subjects.map(s =>
      s.id === subjectId ? { ...s, units: [...s.units, unit] } : s
    ));
    setUnitInput('');
    setAddingUnit(null);
  };

  const deleteUnit = (subjectId, unitId) => {
    setSubjects(subjects.map(s =>
      s.id === subjectId
        ? { ...s, units: s.units.filter(u => u.id !== unitId) }
        : s
    ));
  };

  const addTopic = (subjectId, unitId) => {
    if (!topicInput.trim()) return;
    const topic = {
      id: Date.now(),
      name: topicInput.trim(),
      slug: slugify(topicInput.trim()),
    };
    setSubjects(subjects.map(s =>
      s.id === subjectId
        ? {
            ...s,
            units: s.units.map(u =>
              u.id === unitId
                ? { ...u, topics: [...u.topics, topic] }
                : u
            ),
          }
        : s
    ));
    setTopicInput('');
    setAddingTopic(null);
  };

  const deleteTopic = (subjectId, unitId, topicId) => {
    setSubjects(subjects.map(s =>
      s.id === subjectId
        ? {
            ...s,
            units: s.units.map(u =>
              u.id === unitId
                ? { ...u, topics: u.topics.filter(t => t.id !== topicId) }
                : u
            ),
          }
        : s
    ));
  };

  const openWorkspace = (subject, unit, topic) => {
    navigate(`/workspace/${subject.slug}/${unit.slug}/${topic.slug}`);
  };

  const toggleUnit = (key) => {
    setExpandedUnits(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="subjects-page">
      {/* Header */}
      <div className="subjects-header">
        <div>
          <h1><BookOpen className="page-icon" /> My Subjects</h1>
          <p>Organize your studies by subject, unit, and topic</p>
        </div>
        <button
          className="btn-primary"
          onClick={() => setShowModal(true)}
        >
          + Add Subject
        </button>
      </div>

      {/* Empty state */}
      {subjects.length === 0 && (
        <div className="subjects-empty">
          <div className="empty-icon">📭</div>
          <h2>No subjects yet</h2>
          <p>Add your first subject to get started</p>
          <button
            className="btn-primary"
            style={{ margin: '0 auto' }}
            onClick={() => setShowModal(true)}
          >
            + Add Subject
          </button>
        </div>
      )}

      {/* Subjects grid */}
      <div className="subjects-grid">
        {subjects.map(subject => (
          <div key={subject.id} className="subject-card">
            <div className="subject-card-header">
              <div className="subject-card-left">
                <div
                  className="subject-emoji"
                  style={{ background: subject.color }}
                >
                  {subject.emoji}
                </div>
                <div>
                  <div className="subject-name">{subject.name}</div>
                  <div className="subject-meta">
                    {subject.units.length} units ·{' '}
                    {subject.units.reduce((a, u) => a + u.topics.length, 0)} topics
                  </div>
                </div>
              </div>
              <div className="subject-card-actions">
                <button
                  className="btn-danger"
                  onClick={() => deleteSubject(subject.id)}
                >
                  🗑
                </button>
              </div>
            </div>

            <div className="subject-units">
              <div className="units-label">Units</div>

              {subject.units.map(unit => {
                const key = `${subject.id}-${unit.id}`;
                const isOpen = expandedUnits[key];
                return (
                  <div key={unit.id} className="unit-row">
                    <div
                      className="unit-header"
                      onClick={() => toggleUnit(key)}
                    >
                      <div className="unit-header-left">
                        <span className={`unit-toggle ${isOpen ? 'open' : ''}`}>▶</span>
                        {unit.name}
                      </div>
                      <div
                        className="unit-actions"
                        onClick={e => e.stopPropagation()}
                      >
                        <button
                          className="btn-secondary"
                          style={{ fontSize: '11px', padding: '3px 8px' }}
                          onClick={() => setAddingTopic(key)}
                        >
                          + Topic
                        </button>
                        <button
                          className="btn-danger"
                          onClick={() => deleteUnit(subject.id, unit.id)}
                        >
                          🗑
                        </button>
                      </div>
                    </div>

                    {isOpen && (
                      <div className="topics-list">
                        {unit.topics.length === 0 && (
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)', padding: '6px 10px' }}>
                            No topics yet
                          </div>
                        )}
                        {unit.topics.map(topic => (
                          <div key={topic.id} className="topic-row">
                            <div
                              className="topic-row-left"
                              onClick={() => openWorkspace(subject, unit, topic)}
                            >
                              <span className="topic-dot" />
                              {topic.name}
                            </div>
                            <div className="topic-actions">
                              <button
                                className="btn-danger"
                                onClick={() => deleteTopic(subject.id, unit.id, topic.id)}
                              >
                                🗑
                              </button>
                            </div>
                          </div>
                        ))}
                        {addingTopic === key && (
                          <div className="add-topic-row">
                            <input
                              className="add-topic-input"
                              placeholder="Topic name..."
                              value={topicInput}
                              onChange={e => setTopicInput(e.target.value)}
                              onKeyDown={e => e.key === 'Enter' && addTopic(subject.id, unit.id)}
                              autoFocus
                            />
                            <button
                              className="btn-primary"
                              style={{ padding: '6px 10px', fontSize: '12px' }}
                              onClick={() => addTopic(subject.id, unit.id)}
                            >
                              Add
                            </button>
                            <button
                              className="btn-secondary"
                              onClick={() => setAddingTopic(null)}
                            >
                              ✕
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              {addingUnit === subject.id ? (
                <div className="add-unit-row">
                  <input
                    className="add-unit-input"
                    placeholder="Unit name..."
                    value={unitInput}
                    onChange={e => setUnitInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addUnit(subject.id)}
                    autoFocus
                  />
                  <button
                    className="btn-primary"
                    style={{ padding: '8px 12px', fontSize: '12px' }}
                    onClick={() => addUnit(subject.id)}
                  >
                    Add
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={() => setAddingUnit(null)}
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  className="btn-secondary"
                  style={{ marginTop: '8px', width: '100%', fontSize: '12px' }}
                  onClick={() => setAddingUnit(subject.id)}
                >
                  + Add Unit
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>Add New Subject</h2>
            <div className="modal-field">
              <label>Subject Name</label>
              <input
                placeholder="e.g. Mathematics"
                value={newSubject.name}
                onChange={e => setNewSubject({ ...newSubject, name: e.target.value })}
                onKeyDown={e => e.key === 'Enter' && addSubject()}
                autoFocus
              />
            </div>
            <div className="modal-field">
              <label>Pick an Icon</label>
              <div className="emoji-grid">
                {EMOJIS.map(em => (
                  <div
                    key={em}
                    className={`emoji-option ${newSubject.emoji === em ? 'selected' : ''}`}
                    onClick={() => setNewSubject({ ...newSubject, emoji: em })}
                  >
                    {em}
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-field">
              <label>Card Color</label>
              <div className="color-grid">
                {COLORS.map(c => (
                  <div
                    key={c}
                    className={`color-option ${newSubject.color === c ? 'selected' : ''}`}
                    style={{ background: c }}
                    onClick={() => setNewSubject({ ...newSubject, color: c })}
                  />
                ))}
              </div>
            </div>
            <div className="modal-actions">
              <button
                className="btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="btn-primary" onClick={addSubject}>
                Add Subject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subjects;