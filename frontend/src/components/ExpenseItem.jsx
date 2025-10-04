import React from 'react';

const ExpenseItem = ({ expense, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryIcon = (category) => {
    const icons = {
      food: '🍔',
      travel: '✈️',
      bills: '📄',
      entertainment: '🎬',
      shopping: '🛍️',
      health: '🏥',
      education: '📚',
      other: '📦'
    };
    return icons[category] || '📦';
  };

  return (
    <div className="expense-item">
      <div className="expense-header">
        <span className="expense-amount">₹{expense.amount.toFixed(2)}</span>
        <span className="expense-category">
          {getCategoryIcon(expense.category)} {expense.category}
        </span>
      </div>
      <div className="expense-details">
        <div className="expense-date">{formatDate(expense.date)}</div>
        {expense.note && (
          <div className="expense-note">{expense.note}</div>
        )}
      </div>
      <div className="expense-actions">
        <button className="btn btn-edit" onClick={() => onEdit(expense)}>
          Edit
        </button>
        <button className="btn btn-delete" onClick={() => onDelete(expense._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ExpenseItem;