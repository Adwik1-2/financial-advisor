import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import "./SavingsTracker.css";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SavingsTracker = () => {
  const [income, setIncome] = useState(0);
  const [incomeSource, setIncomeSource] = useState("");
  const [expense, setExpense] = useState(0);
  const [expenseCategory, setExpenseCategory] = useState("");
  const [budgets, setBudgets] = useState({
    Food: 0,
    Travel: 0,
    Shopping: 0,
    Entertainment: 0,
    Others: 0,
  });
  const [transactions, setTransactions] = useState([]);

  const handleIncomeChange = (e) => {
    setIncome(parseFloat(e.target.value));
  };

  const handleIncomeSourceChange = (e) => {
    setIncomeSource(e.target.value);
  };

  const handleExpenseChange = (e) => {
    setExpense(parseFloat(e.target.value));
  };

  const handleExpenseCategoryChange = (e) => {
    setExpenseCategory(e.target.value);
  };

  const handleBudgetChange = (category, value) => {
    setBudgets({
      ...budgets,
      [category]: parseFloat(value),
    });
  };

  const addIncomeTransaction = () => {
    if (income > 0 && incomeSource) {
      const newTransaction = {
        type: "Income",
        amount: income,
        source: incomeSource,
        date: new Date().toLocaleDateString(),
      };
      setTransactions([newTransaction, ...transactions]);
      setIncome(0);
      setIncomeSource("");
    }
  };

  const addExpenseTransaction = () => {
    if (expense > 0 && expenseCategory) {
      const newTransaction = {
        type: "Expense",
        amount: expense,
        category: expenseCategory,
        date: new Date().toLocaleDateString(),
      };
      setTransactions([newTransaction, ...transactions]);
      setExpense(0);
      setExpenseCategory("");
    }
  };

  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const savings = totalIncome - totalExpenses;

  // Calculate total expenses per category
  const categoryExpenses = Object.keys(budgets).reduce((acc, category) => {
    acc[category] = transactions
      .filter((t) => t.type === "Expense" && t.category === category)
      .reduce((sum, t) => sum + t.amount, 0);
    return acc;
  }, {});

  // Check if a category is over-budget
  const isOverBudget = (category) => {
    return categoryExpenses[category] > budgets[category];
  };

  // Data for the bar chart
  const chartData = {
    labels: ["Income", "Expenses", "Savings"],
    datasets: [
      {
        label: "Amount",
        data: [totalIncome, totalExpenses, savings],
        backgroundColor: ["#36A2EB", "#FF6384", "#4BC0C0"],
        borderColor: ["#36A2EB", "#FF6384", "#4BC0C0"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Income vs Expenses vs Savings",
        font: {
          size: 18,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#e0e0e0",
        },
      },
      x: {
        grid: {
          color: "#e0e0e0",
        },
      },
    },
  };

  return (
    <div className="savings-tracker">
      <h1>Savings Tracker</h1>

      {/* Budget Section */}
      <div className="budget-section">
        <h2>Set Budgets</h2>
        <div className="budget-inputs">
          {Object.keys(budgets).map((category) => (
            <div key={category} className="budget-input">
              <label>{category}:</label>
              <input
                type="number"
                value={budgets[category]}
                onChange={(e) => handleBudgetChange(category, e.target.value)}
                placeholder={`Enter ${category} budget`}
              />
              <p className={isOverBudget(category) ? "over-budget" : "under-budget"}>
                {isOverBudget(category) ? "Over Budget ⚠️" : "Under Budget ✅"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Income Section */}
      <div className="income-section">
        <h2>Add Income</h2>
        <div className="input-group">
          <label>Amount:</label>
          <input
            type="number"
            value={income}
            onChange={handleIncomeChange}
            placeholder="Enter income amount"
          />
        </div>
        <div className="input-group">
          <label>Source:</label>
          <input
            type="text"
            value={incomeSource}
            onChange={handleIncomeSourceChange}
            placeholder="Enter income source"
          />
        </div>
        <button className="add-button" onClick={addIncomeTransaction}>
          Add Income
        </button>
      </div>

      {/* Expense Section */}
      <div className="expense-section">
        <h2>Add Expense</h2>
        <div className="input-group">
          <label>Amount:</label>
          <input
            type="number"
            value={expense}
            onChange={handleExpenseChange}
            placeholder="Enter expense amount"
          />
        </div>
        <div className="input-group">
          <label>Category:</label>
          <select
            value={expenseCategory}
            onChange={handleExpenseCategoryChange}
          >
            <option value="">Select Category</option>
            {Object.keys(budgets).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <button className="add-button" onClick={addExpenseTransaction}>
          Add Expense
        </button>
      </div>

      {/* Summary Section */}
      <div className="summary-section">
        <h2>Summary</h2>
        <div className="summary-cards">
          <div className="summary-card">
            <h3>Total Income</h3>
            <p>${totalIncome.toFixed(2)}</p>
          </div>
          <div className="summary-card">
            <h3>Total Expenses</h3>
            <p>${totalExpenses.toFixed(2)}</p>
          </div>
          <div className="summary-card">
            <h3>Savings</h3>
            <p>${savings.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="transactions-section">
        <h2>Recent Transactions</h2>
        <div className="transactions-list">
          {transactions.map((transaction, index) => (
            <div key={index} className="transaction-item">
              <p>
                <strong>{transaction.type}:</strong> ${transaction.amount.toFixed(2)}
              </p>
              <p>
                {transaction.type === "Income" ? `Source: ${transaction.source}` : `Category: ${transaction.category}`}
              </p>
              <p>Date: {transaction.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chart Section */}
      <div className="chart-section">
        <h2>Graphical Representation</h2>
        <div className="chart-container">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default SavingsTracker;