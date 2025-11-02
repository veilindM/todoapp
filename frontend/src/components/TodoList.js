import React from "react";
import "./TodoList.css"; // Import external CSS

function TodoList({ tasks, onDelete, onToggle, onEdit }) {
	return (
		<ul className="todo-list">
			{tasks.map((task) => (
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
						<button className="delete" onClick={() => onDelete(task.id)}>
							🗑
						</button>
					</div>
				</li>
			))}
		</ul>
	);
}

export default TodoList;
