const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Get all tasks
app.get('/tasks', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// ✅ Add new task
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  db.query('INSERT INTO tasks (title) VALUES (?)', [title], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, title, completed: false });
  });
});

// ✅ Delete a task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true });
  });
});

// ✅ Update a task (edit title or toggle complete)
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  db.query(
    'UPDATE tasks SET title = ?, completed = ? WHERE id = ?',
    [title, completed, id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id, title, completed });
    }
  );
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
