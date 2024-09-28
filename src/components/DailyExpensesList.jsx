import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../store/theme-slice";

const DailyExpensesList = (props) => {
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
      {totalAmount > 10000 && (
        <div className="flex justify-center mb-6 space-x-4">
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

      {props.expenseList.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No expenses added yet.
        </p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {props.expenseList.map((expense) => (
            <li
              key={expense.id}
              className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-xl font-semibold text-blue-500 dark:text-blue-300">
                  ₹{expense.amount}
                </span>
                <span className="bg-blue-100 dark:bg-blue-600 text-blue-600 dark:text-blue-200 text-md font-semibold px-2 py-1 rounded-full">
                  {expense.category}
                </span>
              </div>
              <div className="mb-4">
                <p className="text-gray-700 dark:text-gray-300">
                  {expense.description}
                </p>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  className="bg-green-500 dark:bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 dark:hover:bg-green-800 transition duration-200"
                  onClick={() => {
                    props.onEditExpense(expense);
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 dark:bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-600 dark:hover:bg-red-800 transition duration-200"
                  onClick={() => {
                    props.onDeleteExpense(expense.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DailyExpensesList;
