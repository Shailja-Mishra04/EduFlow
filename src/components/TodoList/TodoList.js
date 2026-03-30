import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import './TodoList.css';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [minimized, setMinimized] = useState(false);

  const nodeRef = useRef(null);

  const addTask = () => {
    if (input.trim() === '') return;
    setTasks([...tasks, input]);
    setInput('');
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <Draggable
      handle=".todo-header"
      nodeRef={nodeRef}
      cancel="button, input"
    >
      <div className="todo-container" ref={nodeRef}>
        
        {/* HEADER (drag handle) */}
        <div className="todo-header">
          <span>📝 To-Do</span>
          <button onClick={() => setMinimized(!minimized)}>
            {minimized ? '⬆' : '⬇'}
          </button>
        </div>

        {/* CONTENT (hidden when minimized) */}
        {!minimized && (
          <>
            <div className="todo-input">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add task..."
              />
              <button onClick={addTask}>Add</button>
            </div>

            <ul className="todo-list">
              {tasks.map((task, index) => (
                <li key={index}>
                  <span>{task}</span>
                  <button onClick={() => deleteTask(index)}>❌</button>
                </li>
              ))}
            </ul>
          </>
        )}

      </div>
    </Draggable>
  );
}

export default TodoList;