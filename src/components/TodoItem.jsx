import { useState } from "react";

function TodoItem({ todo, deleteTodo, toggleTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEdit = () => {
    editTodo(todo.id, newText);
    setIsEditing(false);
  };

  return (
  <div className="todo-item">
    {isEditing ? (
      <>
        <input
          value={newText}
          onChange={(e) =>
            setNewText(e.target.value)
          }
        />

        <button onClick={handleEdit}>
          Save
        </button>
      </>
    ) : (
      <>
        <span
          className={
            todo.completed
              ? "completed"
              : ""
          }
        >
          {todo.text}
        </span>

        <div className="todo-buttons">
          <button
            onClick={() =>
              toggleTodo(todo.id)
            }
          >
            ✔
          </button>

          <button
            onClick={() =>
              setIsEditing(true)
            }
          >
            ✏
          </button>

          <button
            onClick={() =>
              deleteTodo(todo.id)
            }
          >
            🗑
          </button>
        </div>
      </>
    )}
  </div>
);
}

export default TodoItem;