import React from 'react';

function FilterBar({ filters, onFilterChange, onReset }) {
  const handleStatusChange = (e) => {
    onFilterChange({ ...filters, status: e.target.value });
  };

  const handlePriorityChange = (e) => {
    onFilterChange({ ...filters, priority: e.target.value });
  };

  const handleSortChange = (e) => {
    onFilterChange({ ...filters, sort: e.target.value });
  };

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="statusFilter">Status:</label>
        <select id="statusFilter" value={filters.status} onChange={handleStatusChange}>
          <option value="ALL">All</option>
          <option value="TODO">To Do</option>
          <option value="DOING">Doing</option>
          <option value="DONE">Done</option>
        </select>
      </div>
      
      <div className="filter-group">
        <label htmlFor="priorityFilter">Priority:</label>
        <select id="priorityFilter" value={filters.priority} onChange={handlePriorityChange}>
          <option value="ALL">All</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sortFilter">Sort By:</label>
        <select id="sortFilter" value={filters.sort || ''} onChange={handleSortChange}>
          <option value="">Default</option>
          <option value="dueDate,asc">Due Date Ascending</option>
          <option value="dueDate,desc">Due Date Descending</option>
        </select>
      </div>

      <button className="btn btn-secondary btn-reset" onClick={onReset}>
        Reset Filters
      </button>
    </div>
  );
}

export default FilterBar;
