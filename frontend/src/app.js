import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import "./app.css"; // Import the CSS styling

const API_URL = process.env.REACT_APP_API_URL;

function App() {
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState("");

	useEffect(() => {
		fetch(`${API_URL}/tasks`)
			.then((res) => res.json())
			.then((data) => setTasks(data));
	}, []);

	const addTask = async () => {
		if (!newTask) return;
		const res = await fetch(`${API_URL}/tasks`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ title: newTask }),
		});
		const data = await res.json();
		setTasks([...tasks, data]);
		setNewTask("");
	};

	const deleteTask = async (id) => {
		await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
		setTasks(tasks.filter((task) => task.id !== id));
	};

	const toggleTask = async (task) => {
		const updated = { ...task, completed: !task.completed };
		await fetch(`${API_URL}/tasks/${task.id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(updated),
		});
		setTasks(tasks.map((t) => (t.id === task.id ? updated : t)));
	};

	const editTask = (task) => {
		const newTitle = prompt("Edit task:", task.title);
		if (newTitle !== null && newTitle.trim() !== "") {
			const updated = { ...task, title: newTitle };
			fetch(`http://localhost:5000/tasks/${task.id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(updated),
			});
			setTasks(tasks.map((t) => (t.id === task.id ? updated : t)));
		}
	};

	const completedTasks = tasks.filter((t) => t.completed).length;
	const totalTasks = tasks.length;
	const progressPercent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

	return (
		<div className="app">
			<div className="todo-container">
				<h1>📝 To-Do List</h1>

				<div className="progress-container">
					<div className="progress-info">
						{completedTasks} / {totalTasks} tasks completed
					</div>
					<div className="progress-bar">
						<div
							className="progress-fill"
							style={{ width: `${progressPercent}%` }}
						></div>
					</div>
				</div>

				<div className="input-group">
					<input
						type="text"
						value={newTask}
						onChange={(e) => setNewTask(e.target.value)}
						placeholder="Add a new task here..."
					/>
					<button onClick={addTask}>Add</button>
				</div>

				<TodoList
					tasks={tasks}
					onDelete={deleteTask}
					onToggle={toggleTask}
					onEdit={editTask}
				/>
			</div>
		</div>
	);
}

export default App;
