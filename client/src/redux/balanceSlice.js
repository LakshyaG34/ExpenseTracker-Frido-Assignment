import {createSlice} from "@reduxjs/toolkit"

const balanceSlice = createSlice({
    name: "balance",
    initialState : [],
    reducers: {
        setBalance: (state, action) => action.payload
    }
})

export const {setBalance} = balanceSlice.actions
export default balanceSlice.reducer;