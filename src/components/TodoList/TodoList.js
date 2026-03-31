import React, { useState, useEffect, useRef } from 'react';
import { CheckSquare, X, Plus, Minus } from 'lucide-react'; // Minimalist icons
import './TodoList.css';

const TodoList = () => {
  const [visible, setVisible] = useState(false);
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('eduflow-todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [position, setPosition] = useState({ x: window.innerWidth - 340, y: 200 });
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const widgetRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('eduflow-todos', JSON.stringify(tasks));
  }, [tasks]);

  const onMouseDown = (e) => {
    if (e.target.closest('.todo-close')) return; // Don't drag when clicking close
    dragging.current = true;
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const onMouseMove = (e) => {
    if (!dragging.current) return;
    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };

  const onMouseUp = () => {
    dragging.current = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: input.trim(), done: false }]);
    setInput('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  if (!visible) {
    return (
      <div
        className="todo-float"
        style={{ left: position.x, top: position.y }}
        onClick={() => setVisible(true)}
      >
        <CheckSquare size={18} strokeWidth={2} />
        <span className="todo-float-count">{tasks.filter(t => !t.done).length}</span>
      </div>
    );
  }

  return (
    <div
      className="todo-widget"
      ref={widgetRef}
      style={{ left: position.x, top: position.y }}
    >
      <div className="todo-header" onMouseDown={onMouseDown}>
        <span className="todo-title">Tasks</span>
        <button className="todo-close" onClick={() => setVisible(false)}>
          <Minus size={18} />
        </button>
      </div>
      <div className="todo-input-row">
        <input
          className="todo-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTask()}
          placeholder="New task..."
        />
        <button className="todo-add-btn" onClick={addTask}>
          <Plus size={16} />
        </button>
      </div>
      <div className="todo-list">
        {tasks.length === 0 && (
          <p className="todo-empty">All caught up.</p>
        )}
        {tasks.map(task => (
          <div key={task.id} className={`todo-item ${task.done ? 'done' : ''}`}>
            <input
              type="checkbox"
              className="todo-checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
            />
            <span className="todo-text">{task.text}</span>
            <button className="todo-delete" onClick={() => deleteTask(task.id)}>
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;