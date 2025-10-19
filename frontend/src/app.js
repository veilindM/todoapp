import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data));
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

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = async (task) => {
    const updated = { ...task, completed: !task.completed };
    await fetch(`http://localhost:5000/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    });
    setTasks(tasks.map((t) => (t.id === task.id ? updated : t)));
  };

  const editTask = (task) => {
    const newTitle = prompt('Edit task:', task.title);
    if (newTitle !== null) {
      const updated = { ...task, title: newTitle };
      fetch(`http://localhost:5000/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      setTasks(tasks.map((t) => (t.id === task.id ? updated : t)));
    }
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

      <TodoList tasks={tasks} onDelete={deleteTask} onToggle={toggleTask} onEdit={editTask} />
    </div>
  );
}

export default App;
