import { createSlice } from "@reduxjs/toolkit";

const initialExpensesState = { expenses: [], totalExpenseAmount: 0 };
const expensesSlice = createSlice({
  name: "Expenses",
  initialState: initialExpensesState,
  reducers: {
    replaceExpenses(state, action) {
      state.expenses = action.payload.expenses;
      state.totalExpenseAmount = action.payload.amount;
    },
    addExpense(state, action) {
      state.expenses.push(action.payload);
      state.totalExpenseAmount += parseFloat(action.payload.amount);
    },
    editExpense(state, action) {
      const existingExpenseIndex = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );
      if (existingExpenseIndex !== -1) {
        const oldAmount = parseFloat(
          state.expenses[existingExpenseIndex].amount
        );
        state.totalExpenseAmount -= oldAmount;
        state.expenses[existingExpenseIndex] = action.payload;
        state.totalExpenseAmount += parseFloat(action.payload.amount);
      }
    },
    deleteExpense(state, action) {
      const existingExpenseIndex = state.expenses.findIndex(
        (expense) => expense.id === action.payload
      );
      if (existingExpenseIndex !== -1) {
        state.totalExpenseAmount -= parseFloat(
          state.expenses[existingExpenseIndex].amount
        );
      }
      const updatedExpenseList = state.expenses.filter((expense) => {
        return expense.id !== action.payload
      })
      state.expenses = updatedExpenseList;
    },
  },
});

export const expenseActions = expensesSlice.actions;
export default expensesSlice.reducer;
