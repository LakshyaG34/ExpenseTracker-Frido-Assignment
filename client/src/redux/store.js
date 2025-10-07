import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import groupReducer from "./groupSlice"
import expenseReducer from "./expenseSlice"
import balanceReducer from "./balanceSlice";

export const store = configureStore({
    reducer : {
        user : userReducer,
        group : groupReducer,
        expense : expenseReducer,
        balance : balanceReducer,
    }
})