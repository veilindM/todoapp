import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Fetch tasks from backend
  useEffect(() => {
    fetch('http://localhost:5000/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  }, []);

  const addTask = async () => {
    if (!newTask) return;
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTask })
    });
    const data = await res.json();
    setTasks([...tasks, data]);
    setNewTask('');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>📝 To-Do List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task..."
      />
      <button onClick={addTask}>Add</button>
      <TodoList tasks={tasks} />
    </div>
  );
}

export default App;
