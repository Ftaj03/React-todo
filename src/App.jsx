import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Filter from "./components/Filter";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {

  // Todos state
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  // Dark Mode state (FIXED LOCATION)
  const [darkMode, setDarkMode] = useState(false);

  /* ---------------- DARK MODE ---------------- */

  // Load saved theme
  useEffect(() => {
    const savedTheme =
      localStorage.getItem("darkMode");

    if (savedTheme === "true") {
      setDarkMode(true);
      document.body.classList.add("dark");
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {

    const newMode = !darkMode;
    setDarkMode(newMode);

    if (newMode) {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  };

  /* ---------------- TODOS ---------------- */

  // Load saved todos
  useEffect(() => {
    const savedTodos =
      JSON.parse(localStorage.getItem("todos"));

    if (savedTodos) setTodos(savedTodos);
  }, []);

  // Save todos
  useEffect(() => {
    localStorage.setItem(
      "todos",
      JSON.stringify(todos)
    );
  }, [todos]);

  // Add Todo
  const addTodo = (text) => {

    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  // Delete Todo
  const deleteTodo = (id) => {

    setTodos(
      todos.filter(
        todo => todo.id !== id
      )
    );
  };

  // Toggle Complete
  const toggleTodo = (id) => {

    setTodos(
      todos.map(todo =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed
            }
          : todo
      )
    );
  };

  // Edit Todo
  const editTodo = (id, newText) => {

    setTodos(
      todos.map(todo =>
        todo.id === id
          ? { ...todo, text: newText }
          : todo
      )
    );
  };

  // Filter logic
  const filteredTodos =
    todos.filter(todo => {

      if (filter === "active")
        return !todo.completed;

      if (filter === "completed")
        return todo.completed;

      return true;
    });

  return (

  <div className="container">

    {/* Header */}
    <Header
      darkMode={darkMode}
      toggleTheme={toggleTheme}
    />

    {/* Input */}
    <TodoInput addTodo={addTodo} />

    {/* Filters */}
    <Filter setFilter={setFilter} />

    {/* Todo List */}
    <TodoList
      todos={filteredTodos}
      deleteTodo={deleteTodo}
      toggleTodo={toggleTodo}
      editTodo={editTodo}
    />

    {/* Counter */}
    <p className="task-counter">
      Total Tasks: {todos.length}
    </p>

    {/* Footer */}
    <Footer />

  </div>

);
}

export default App;