    import {createSlice} from "@reduxjs/toolkit"

    const groupSlice = createSlice({
        name: "group",
        initialState : [],
        reducers: {
            setGroup: (state, action) => action.payload
        }
    })

    export const {setGroup} = groupSlice.actions
    export default groupSlice.reducer;