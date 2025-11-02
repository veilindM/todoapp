import React from "react";
import "./TodoList.css";

function TodoList({ tasks, onDelete, onToggle, onEdit }) {
	const activeTasks = tasks.filter((task) => !task.completed);
	const completedTasks = tasks.filter((task) => task.completed);

	return (
		<div className="todo-sections">
			{activeTasks.length > 0 && (
				<div className="todo-section">
					<h3>📋 Tasks</h3>
					<ul className="todo-list">
						{activeTasks.map((task) => (
							<li
								key={task.id}
								className={`todo-item ${task.completed ? "completed" : ""}`}>
								<div className="task-left">
									<input
										type="checkbox"
										checked={task.completed}
										onChange={() => onToggle(task)}
									/>
									<span>{task.title}</span>
								</div>

								<div className="task-actions">
									<button className="edit" onClick={() => onEdit(task)}>
										✏️
									</button>
									<button
										className="delete"
										onClick={() => onDelete(task.id)}>
										🗑
									</button>
								</div>
							</li>
						))}
					</ul>
				</div>
			)}

			{completedTasks.length > 0 && (
				<div className="todo-section">
					<h3>✅ Completed Tasks</h3>
					<ul className="todo-list completed-list">
						{completedTasks.map((task) => (
							<li key={task.id} className="todo-item completed">
								<div className="task-left">
									<input
										type="checkbox"
										checked={task.completed}
										onChange={() => onToggle(task)}
									/>
									<span>{task.title}</span>
								</div>

								<div className="task-actions">
									<button
										className="delete"
										onClick={() => onDelete(task.id)}>
										🗑
									</button>
								</div>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

export default TodoList;
