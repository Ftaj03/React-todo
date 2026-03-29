function Header({ darkMode, toggleTheme }) {
  return (
    <header className="header">

      <h1 className="app-title">
        📝 TaskMaster
      </h1>

      <button
        className="theme-toggle"
        onClick={toggleTheme}
      >
        {darkMode
          ? "☀ Light"
          : "🌙 Dark"}
      </button>

    </header>
  );
}

export default Header;