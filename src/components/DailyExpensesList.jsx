import React from "react";
import { useSelector } from "react-redux";

const DailyExpensesList = (props) => {
  const totalAmount = useSelector((state) => state.expense.totalExpenseAmount);

  return (
    <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-lg max-w-7xl mx-auto">
      <h3 className="text-2xl font-bold text-blue-600 mb-4 border-b pb-2">
        Your Expenses
      </h3>
      <div className="bg-gray-100 p-4 mb-6 rounded-md text-center">
        <h4 className="text-xl font-bold text-gray-700">Total Amount Spent</h4>
        <p className="text-2xl font-semibold text-blue-600">
          ₹{totalAmount.toFixed(2)}
        </p>
      </div>
      {props.expenseList.length === 0 ? (
        <p className="text-gray-500 text-lg">No expenses added yet.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {props.expenseList.map((expense) => (
            <li
              key={expense.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-xl font-semibold text-blue-500">
                  ₹{expense.amount}
                </span>
                <span className="bg-blue-100 text-blue-600 text-md font-semibold px-2 py-1 rounded-full">
                  {expense.category}
                </span>
              </div>
              <div className="mb-4">
                <p className="text-gray-700">{expense.description}</p>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
                  onClick={() => {
                    props.onEditExpense(expense);
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
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
