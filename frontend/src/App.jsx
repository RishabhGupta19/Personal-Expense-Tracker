
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Summary from './components/Summary';
import Filters from './components/Filters';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import { expenseAPI } from './services/api';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({
    totalExpenses: 0,
    monthExpenses: 0,
    totalItems: 0
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  // Fetch expenses on mount
  useEffect(() => {
    fetchExpenses();
  }, []);

  // Calculate summary when expenses change
  useEffect(() => {
    calculateSummary();
  }, [expenses]);

  const fetchExpenses = async (filters = {}) => {
    try {
      setLoading(true);
      const response = await expenseAPI.getAll(filters);
      setExpenses(response.data);
      setFilteredExpenses(response.data);
    } catch (error) {
      toast.error('Failed to fetch expenses');
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateSummary = () => {
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    
    const currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setHours(0, 0, 0, 0);
    
    const monthExpenses = expenses.filter(exp => 
      new Date(exp.date) >= currentMonth
    );
    const monthTotal = monthExpenses.reduce((sum, exp) => sum + exp.amount, 0);

    setSummary({
      totalExpenses: total,
      monthExpenses: monthTotal,
      totalItems: expenses.length
    });
  };

  const handleAddExpense = async (expenseData) => {
    try {
      if (editingExpense) {
        await expenseAPI.update(editingExpense._id, expenseData);
        toast.success('Expense updated successfully!');
        setEditingExpense(null);
      } else {
        await expenseAPI.create(expenseData);
        toast.success('Expense added successfully!');
      }
      fetchExpenses();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to save expense');
      console.error('Error saving expense:', error);
    }
  };

    const confirmDeleteExpense = async () => {
    if (!expenseToDelete) return;
    try {
      await expenseAPI.delete(expenseToDelete);
      toast.success('Expense deleted successfully!');
      fetchExpenses();
    } catch (error) {
      toast.error('Failed to delete expense');
      console.error('Error deleting expense:', error);
    } finally {
      setShowDeleteModal(false);
      setExpenseToDelete(null);
    }
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

 const handleDeleteExpense = (id) => {
    setExpenseToDelete(id);
    setShowDeleteModal(true);
  };

  const handleFilterChange = async (filters) => {
    await fetchExpenses(filters);
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  return (
    <div className="App">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <header className="app-header">
        <h1>💰 Personal Expense Tracker</h1>
        {/* <p>MERN Stack Application</p> */}
      </header>

      <div className="container">
        <div className="main-content">
          <ExpenseForm
            onSubmit={handleAddExpense}
            editingExpense={editingExpense}
            onCancel={handleCancelEdit}
          />

          <div className="list-section">
            <h2>Your Expenses</h2>
            
            <Summary
              totalExpenses={summary.totalExpenses}
              monthExpenses={summary.monthExpenses}
              totalItems={summary.totalItems}
            />

            <Filters
              onFilterChange={handleFilterChange}
              expenses={expenses}
            />

            <ExpenseList
              expenses={filteredExpenses}
              onEdit={handleEditExpense}
              onDelete={handleDeleteExpense}
              loading={loading}
            />
            
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showDeleteModal && (
        <DeleteConfirmModal
          onConfirm={confirmDeleteExpense}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}

export default App;
