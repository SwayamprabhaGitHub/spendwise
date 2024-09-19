import React from "react";

const DailyExpensesList = (props) => {
  return (
    <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-lg max-w-7xl mx-auto">
      <h3 className="text-2xl font-bold text-blue-600 mb-4 border-b pb-2">
        Your Expenses
      </h3>
      {props.expenseList.length === 0 ? (
        <p className="text-gray-500 text-lg">No expenses added yet.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {props.expenseList.map((expense, index) => (
            <li
              key={index}
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
              <p className="text-gray-700">{expense.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DailyExpensesList;
