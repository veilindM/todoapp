import React from 'react';

function TodoList({ tasks, onDelete, onToggle, onEdit }) {
  return (
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {tasks.map((task) => (
        <li key={task.id} style={{ margin: '10px 0' }}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task)}
          />
          <span
            style={{
              marginLeft: '10px',
              textDecoration: task.completed ? 'line-through' : 'none'
            }}
          >
            {task.title}
          </span>
          <button style={{ marginLeft: '10px' }} onClick={() => onEdit(task)}>
            ✏️ Edit
          </button>
          <button
            style={{ marginLeft: '5px', color: 'red' }}
            onClick={() => onDelete(task.id)}
          >
            🗑 Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
