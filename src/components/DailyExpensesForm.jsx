import React, { useContext, useEffect, useRef, useState } from "react";
import DailyExpensesList from "./DailyExpensesList";
import AuthContext from "../store/auth-context";

const DailyExpensesForm = () => {
  const authCtx = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);

  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();

  const getExpenses = async () => {
    const userMail = authCtx.userEmail.replace(".", "");
    try {
      const response = await fetch(
        `https://spendwise-acde3-default-rtdb.firebaseio.com/${userMail}/expenses.json`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const fetchedData = [];
        for (const key in data) {
          fetchedData.push({
            id: key,
            amount: data[key].amount,
            description: data[key].description,
            category: data[key].category,
          });
        }
        setExpenses(fetchedData);
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

    const addExpense = async () => {
      const userMail = authCtx.userEmail.replace(".", "");
      try {
        const response = await fetch(
          `https://spendwise-acde3-default-rtdb.firebaseio.com/${userMail}/expenses.json`,
          {
            method: "POST",
            body: JSON.stringify(newExpense),
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.ok) {
          getExpenses();
          // setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
        } else {
          const data = await response.json();
          console.log(data);
          throw new Error(data.error.message || "something went wrong");
        }
      } catch (error) {
        authCtx.showModal({
          title: "Couldn,t add expense",
          message: error.message || "Something went wrong",
        });
        console.log(error);
      }
    };

    addExpense();

    amountInputRef.current.value = "";
    descriptionInputRef.current.value = "";
    categoryInputRef.current.value = "";
  };

  useEffect(() => {
    getExpenses();
  }, []);

  console.log(expenses);
  return (
    <>
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-6">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Add Daily Expense
        </h2>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label
              htmlFor="expenseAmount"
              className="block text-gray-700 font-semibold mb-2"
            >
              Amount Spent
            </label>
            <input
              type="number"
              id="expenseAmount"
              ref={amountInputRef}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label
              htmlFor="expenseDescription"
              className="block text-gray-700 font-semibold mb-2"
            >
              Description
            </label>
            <input
              type="text"
              id="expenseDescription"
              ref={descriptionInputRef}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label
              htmlFor="expenseCategory"
              className="block text-gray-700 font-semibold mb-2"
            >
              Category
            </label>
            <select
              id="expenseCategory"
              ref={categoryInputRef}
              className="w-full p-2 border border-gray-300 rounded-md"
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
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Add Expense
          </button>
        </form>
      </div>
      <DailyExpensesList expenseList={expenses} />
    </>
  );
};

export default DailyExpensesForm;
