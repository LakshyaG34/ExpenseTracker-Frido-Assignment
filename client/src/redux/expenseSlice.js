import {createSlice} from "@reduxjs/toolkit"

const expenseSlice = createSlice({
    name: "expense",
    initialState : [],
    reducers: {
        setExpense: (state, action) => action.payload
    }
})

export const {setExpense} = expenseSlice.actions
export default expenseSlice.reducer;