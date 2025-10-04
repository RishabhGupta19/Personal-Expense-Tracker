# 💰 MERN Stack Personal Expense Tracker

A full-stack expense tracker application built with **MongoDB, Express.js, React, and Node.js**.  
This app helps you manage your expenses with features like adding, editing, deleting, filtering, and viewing summaries.

---

## 📌 Features
- Add, edit, and delete expenses
- Categorize expenses (Food, Travel, Bills, Shopping, etc.)
- Filter by category, date range, or month
- Sort by date or amount
- View total and monthly summaries
- Visual breakdown by categories
- Responsive and modern UI (React + CSS)
- REST API with full CRUD functionality

---

## 📁 Project Structure

```bash
expense-tracker/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── Expense.js
│   ├── routes/
│   │   └── expenses.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ExpenseForm.jsx
│   │   │   ├── ExpenseList.jsx
│   │   │   ├── ExpenseItem.jsx
│   │   │   ├── Summary.jsx
│   │   │   └── Filters.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
│
└── README.md

---

## ⚙️ Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local installation or MongoDB Atlas)
- npm or yarn package manager

---

## 🚀 Backend Setup

```bash
# Navigate to project root
cd expense-tracker

# Go to backend folder
cd backend

# Install dependencies
npm install

# Create .env file and add:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/expense-tracker
NODE_ENV=development

# Start backend server
npm run dev
🎨 Frontend Setup
bash
Copy code
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file and add:
REACT_APP_API_URL=http://localhost:5000/api

# Start frontend server
npm start
🛠️ Tech Stack
Frontend: React, Axios, React-Toastify, CSS

Backend: Node.js, Express.js, MongoDB, Mongoose

Database: MongoDB (Local / Atlas)

Tools: Nodemon, dotenv, CORS

📡 API Endpoints
Method	 Endpoint	                  Description
GET	    /api/expenses	          Get all expenses (with filters)
GET   	/api/expenses/:id	      Get single expense
POST	  /api/expenses	          Create new expense
PUT   	/api/expenses/:id      	Update expense
DELETE	/api/expenses/:id	       Delete expense
GET	   /api/expenses/summary/stats	Get expense statistics



🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

✅ Author
Developed as a MERN stack practice project for expense management.
