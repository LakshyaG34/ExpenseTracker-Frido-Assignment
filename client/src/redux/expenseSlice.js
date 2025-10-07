import {createSlice} from "@reduxjs/toolkit"

const expenseSlice = createSlice({
    name: "expense",
    initialState : [],
    reducers: {
        setExpense: (state, action) => action.payload,
        addExpense: (state, action) => {
        state.push(action.payload);
        },
        removeExpense: (state, action) => {
            return state.filter(exp => exp._id !== action.payload)
        }
    }
})

export const {setExpense, addExpense, removeExpense } = expenseSlice.actions
export default expenseSlice.reducer;