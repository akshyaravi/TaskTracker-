import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import TaskNew from './pages/TaskNew';
import TaskEdit from './pages/TaskEdit';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <div className="header-brand">
            <h1>Task Tracker</h1>
          </div>
          <nav className="header-nav">
            <Link to="/" className="nav-link">Dashboard</Link>
            <Link to="/tasks/new" className="btn btn-primary btn-cta">
              <span className="plus-icon">+</span> Create Task
            </Link>
          </nav>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks/new" element={<TaskNew />} />
            <Route path="/tasks/edit/:id" element={<TaskEdit />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
