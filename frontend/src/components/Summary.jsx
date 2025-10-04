import React from 'react';

const Summary = ({ totalExpenses, monthExpenses, totalItems }) => {
  return (
    <div className="summary">
      <h3>Summary</h3>
      <div className="summary-grid">
        <div className="summary-item">
          <h4>Total Expenses</h4>
          <p>₹{totalExpenses.toFixed(2)}</p>
        </div>
        <div className="summary-item">
          <h4>This Month</h4>
          <p>₹{monthExpenses.toFixed(2)}</p>
        </div>
        <div className="summary-item">
          <h4>Total Items</h4>
          <p>{totalItems}</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;