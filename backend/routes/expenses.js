const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// @route   GET /api/expenses
// @desc    Get all expenses with filters
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const { category, month, startDate, endDate, sortBy = '-date' } = req.query;
    
    let query = {};

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by month (YYYY-MM format)
    if (month) {
      const [year, monthNum] = month.split('-');
      const startOfMonth = new Date(year, monthNum - 1, 1);
      const endOfMonth = new Date(year, monthNum, 0, 23, 59, 59);
      query.date = { $gte: startOfMonth, $lte: endOfMonth };
    }

    // Filter by date range
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const expenses = await Expense.find(query).sort(sortBy);

    res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/expenses/:id
// @desc    Get single expense
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        error: 'Expense not found'
      });
    }

    res.status(200).json({
      success: true,
      data: expense
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/expenses
// @desc    Create new expense
// @access  Public
router.post('/', async (req, res, next) => {
  try {
    const expense = await Expense.create(req.body);

    res.status(201).json({
      success: true,
      data: expense
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/expenses/:id
// @desc    Update expense
// @access  Public
router.put('/:id', async (req, res, next) => {
  try {
    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!expense) {
      return res.status(404).json({
        success: false,
        error: 'Expense not found'
      });
    }

    res.status(200).json({
      success: true,
      data: expense
    });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/expenses/:id
// @desc    Delete expense
// @access  Public
router.delete('/:id', async (req, res, next) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        error: 'Expense not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/expenses/summary/stats
// @desc    Get expense statistics
// @access  Public
router.get('/summary/stats', async (req, res, next) => {
  try {
    const expenses = await Expense.find();
    
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    
    const currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setHours(0, 0, 0, 0);
    
    const monthExpenses = expenses.filter(exp => 
      new Date(exp.date) >= currentMonth
    );
    const monthTotal = monthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    
    const categoryBreakdown = expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      data: {
        totalExpenses: total,
        monthlyExpenses: monthTotal,
        totalCount: expenses.length,
        categoryBreakdown
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;