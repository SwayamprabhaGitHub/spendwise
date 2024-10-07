import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DailyExpensesSection from "./DailyExpensesSection";
import ModalContext from "../store/modal-context";
import { expenseActions } from "../store/expenses-slice";

const DailyExpensesForm = () => {
  const modalCtx = useContext(ModalContext);

  const authEmail = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false); // To track editing state
  const [editExpenseId, setEditExpenseId] = useState(null); // Track the ID of the expense being edited

  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();

  const getExpenses = async () => {
    const userMail = authEmail.replace(".", "");
    try {
      const response = await fetch(
        `https://spendwise-acde3-default-rtdb.firebaseio.com/${userMail}/expenses.json`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const fetchedData = [];
        let totalAmount = 0;
        for (const key in data) {
          fetchedData.push({
            id: key,
            amount: data[key].amount,
            description: data[key].description,
            category: data[key].category,
          });
          totalAmount += parseFloat(data[key].amount);
        }
        dispatch(
          expenseActions.replaceExpenses({
            expenses: fetchedData,
            amount: totalAmount,
          })
        );
      } else {
        const data = await response.json();
        console.log(data);
        throw new Error(data.error.message || "something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const selectedCategory = categoryInputRef.current.value;

    const newExpense = {
      amount: enteredAmount,
      description: enteredDescription,
      category: selectedCategory,
    };

    const userMail = authEmail.replace(".", "");

    const addOrEditExpense = async () => {
      try {
        let url = `https://spendwise-acde3-default-rtdb.firebaseio.com/${userMail}/expenses.json`;
        let method = "POST";

        if (isEditing) {
          url = `https://spendwise-acde3-default-rtdb.firebaseio.com/${userMail}/expenses/${editExpenseId}.json`;
          method = "PUT";
        }

        const response = await fetch(url, {
          method: method,
          body: JSON.stringify(newExpense),
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        if (isEditing) {
          dispatch(
            expenseActions.editExpense({ id: editExpenseId, ...newExpense })
          );
          setIsEditing(false);
          setEditExpenseId(null);
          modalCtx.showModal({
            title: "Expense Updated",
            message: "expense updated successfully",
          });
        } else {
          const data = await response.json();
          const expenseId = data.name;
          dispatch(expenseActions.addExpense({ id: expenseId, ...newExpense }));
          modalCtx.showModal({
            title: "Expense added",
            message: "expense added successfully",
          });
        }
      } catch (error) {
        modalCtx.showModal({
          title: "Couldn't save expense",
          message: error.message || "Something went wrong",
        });
      }
    };

    addOrEditExpense();

    amountInputRef.current.value = "";
    descriptionInputRef.current.value = "";
    categoryInputRef.current.value = "";
  };

  const editExpenseHandler = (expense) => {
    setIsEditing(true);
    setEditExpenseId(expense.id);

    amountInputRef.current.value = expense.amount;
    descriptionInputRef.current.value = expense.description;
    categoryInputRef.current.value = expense.category;
  };

  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <>
      <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 dark:text-gray-200 shadow-md rounded-md mt-6">
        <h2 className="text-2xl font-semibold text-center mb-4 dark:text-gray-100">
          {isEditing ? "Edit Expense" : "Add Daily Expense"}
        </h2>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label
              htmlFor="expenseAmount"
              className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
            >
              Amount Spent
            </label>
            <input
              type="number"
              id="expenseAmount"
              ref={amountInputRef}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-gray-200"
              required
            />
          </div>

          <div>
            <label
              htmlFor="expenseDescription"
              className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
            >
              Description
            </label>
            <input
              type="text"
              id="expenseDescription"
              ref={descriptionInputRef}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-gray-200"
              required
            />
          </div>

          <div>
            <label
              htmlFor="expenseCategory"
              className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
            >
              Category
            </label>
            <select
              id="expenseCategory"
              ref={categoryInputRef}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-gray-200"
              required
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Petrol">Petrol</option>
              <option value="Salary">Salary</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 dark:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 dark:hover:bg-blue-800 transition duration-200"
          >
            {isEditing ? "Update Expense" : "Add Expense"}
          </button>
        </form>
      </div>
      <DailyExpensesSection onEditExpense={editExpenseHandler} />
    </>
  );
};

export default DailyExpensesForm;
