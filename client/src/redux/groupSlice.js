    import {createSlice} from "@reduxjs/toolkit"

    const groupSlice = createSlice({
        name: "group",
        initialState : [],
        reducers: {
            setGroup: (state, action) => action.payload,
            addGroup: (state, action) => {
            state.push(action.payload);
            },
            removeGroup: (state, action) => {
                return state.filter(grp => grp._id !== action.payload)
            }
        }
    })

    export const {setGroup, addGroup, removeGroup} = groupSlice.actions
    export default groupSlice.reducer;