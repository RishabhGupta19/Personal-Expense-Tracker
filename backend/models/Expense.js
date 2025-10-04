const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, 'Please add an amount'],
      min: [0.01, 'Amount must be greater than 0']
    },
    date: {
      type: Date,
      required: [true, 'Please add a date'],
      validate: {
        validator: function(value) {
          return value <= new Date();
        },
        message: 'Date cannot be in the future'
      }
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      enum: ['food', 'travel', 'bills', 'entertainment', 'shopping', 'health', 'education', 'other']
    },
    note: {
      type: String,
      trim: true,
      maxlength: [500, 'Note cannot be more than 500 characters']
    }
  },
  {
    timestamps: true
  }
);

// Index for faster queries
expenseSchema.index({ date: -1 });
expenseSchema.index({ category: 1 });

module.exports = mongoose.model('Expense', expenseSchema);