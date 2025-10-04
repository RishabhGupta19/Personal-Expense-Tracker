import React, { useState, useEffect } from 'react';

const Filters = ({ onFilterChange, expenses }) => {
  const [filters, setFilters] = useState({
    category: '',
    month: '',
    sortBy: '-date'
  });

  const [availableMonths, setAvailableMonths] = useState([]);

  useEffect(() => {
    // Extract unique months from expenses
    const months = [...new Set(
      expenses.map(exp => new Date(exp.date).toISOString().substring(0, 7))
    )].sort().reverse();
    setAvailableMonths(months);
  }, [expenses]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = {
      ...filters,
      [name]: value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'food', label: '🍔 Food' },
    { value: 'travel', label: '✈️ Travel' },
    { value: 'bills', label: '📄 Bills' },
    { value: 'entertainment', label: '🎬 Entertainment' },
    { value: 'shopping', label: '🛍️ Shopping' },
    { value: 'health', label: '🏥 Health' },
    { value: 'education', label: '📚 Education' },
    { value: 'other', label: '📦 Other' }
  ];

  const formatMonth = (monthStr) => {
    const date = new Date(monthStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="filters">
      <select name="category" value={filters.category} onChange={handleChange}>
        {categories.map(cat => (
          <option key={cat.value} value={cat.value}>{cat.label}</option>
        ))}
      </select>

      <select name="month" value={filters.month} onChange={handleChange}>
        <option value="">All Months</option>
        {availableMonths.map(month => (
          <option key={month} value={month}>{formatMonth(month)}</option>
        ))}
      </select>

      <select name="sortBy" value={filters.sortBy} onChange={handleChange}>
        <option value="-date">Newest First</option>
        <option value="date">Oldest First</option>
        <option value="-amount">Highest Amount</option>
        <option value="amount">Lowest Amount</option>
      </select>
    </div>
  );
};

export default Filters;