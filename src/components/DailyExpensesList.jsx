import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../store/expenses-slice";
import ModalContext from "../store/modal-context";

const DailyExpensesList = (props) => {
  const modalCtx = useContext(ModalContext);

  const authEmail = useSelector((state) => state.auth.email);
  const expenseList = useSelector((state) => state.expense.expenses);
  const dispatch = useDispatch();

  const deleteExpenseHandler = async (id) => {
    const userMail = authEmail.replace(".", "");
    try {
      const response = await fetch(
        `https://spendwise-acde3-default-rtdb.firebaseio.com/${userMail}/expenses/${id}.json`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        dispatch(expenseActions.deleteExpense(id));
        modalCtx.showModal({
          title: "Expense Deleted",
          message: "The expense was successfully deleted.",
        });
      } else {
        const data = await response.json();
        console.log(data);
        throw new Error(data.error.message || "Something went wrong");
      }
    } catch (error) {
      modalCtx.showModal({
        title: "Couldn't delete expense",
        message: error.message || "Something went wrong",
      });
    }
  };

  return (
    <>
      {expenseList.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No expenses added yet.
        </p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expenseList.map((expense) => (
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
                    deleteExpenseHandler(expense.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default DailyExpensesList;
