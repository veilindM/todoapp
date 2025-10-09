import React from 'react';

function TodoList({ tasks }) {
  return (
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {tasks.map((task) => (
        <li key={task.id} style={{ margin: '10px 0' }}>
          ✅ {task.title}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
