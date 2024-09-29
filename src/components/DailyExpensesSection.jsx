import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../store/theme-slice";
import DailyExpensesList from "./DailyExpensesList";

const DailyExpensesSection = (props) => {
  const expenseList = useSelector((state) => state.expense.expenses);
  const totalAmount = useSelector((state) => state.expense.totalExpenseAmount);
  const isDarkTheme = useSelector((state) => state.theme.isDarkMode);
  const premium = useSelector((state) => state.theme.isPremium);
  const dispatch = useDispatch();

  const handlePremium = () => {
    dispatch(themeActions.togglePremium());
  };

  const handleToggleTheme = () => {
    dispatch(themeActions.toggleTheme());
  };

  const downloadCSVHandler = () => {
    const headers = ["Amount", "Description", "Category"]; //header of the table
    // Map each object to only include 'amount', 'description', and 'category'
    const rows = expenseList.map((expense) => [
      expense.amount,
      expense.description,
      expense.category,
    ]);

    // Convert to CSV format
    const csvContent = [headers, ...rows] // Merge headers and rows
      .map((row) => row.join(",")) // Join each row with a comma
      .join("\n"); // Join rows with a newline character

    // Create a Blob from the CSV content
    const blob = new Blob([csvContent], { type: "text/csv" });

    // Create a temporary link for download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "expenses.csv";
    link.click();
  };
  return (
    <div className="mt-8 bg-gray-50 dark:bg-gray-800 dark:text-gray-200 p-6 rounded-lg shadow-lg max-w-7xl mx-auto">
      <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4 border-b pb-2">
        Your Expenses
      </h3>
      <div className="bg-gray-100 dark:bg-gray-700 p-4 mb-6 rounded-md text-center">
        <h4 className="text-xl font-bold text-gray-700 dark:text-gray-300">
          Total Amount Spent
        </h4>
        <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
          ₹{totalAmount.toFixed(2)}
        </p>
      </div>
      <DailyExpensesList onEditExpense={props.onEditExpense} />
      {totalAmount > 10000 && (
        <div className="flex justify-center mb-6 mt-6 space-x-4">
          <button
            onClick={downloadCSVHandler}
            className="bg-purple-500 dark:bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-600 dark:hover:bg-purple-800 transition duration-200"
          >
            Download Expense List
          </button>
          <button
            onClick={handlePremium}
            className="bg-purple-500 dark:bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-600 dark:hover:bg-purple-800 transition duration-200"
          >
            {premium ? "De-activate Premium" : "Activate Premium"}
          </button>
          {premium && (
            <button
              onClick={handleToggleTheme}
              className="bg-purple-500 dark:bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-600 dark:hover:bg-purple-800 transition duration-200"
            >
              {isDarkTheme ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </button>
          )}
        </div>
      )}
      
    </div>
  );
};

export default DailyExpensesSection;
