import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null
}

const dbSlice = createSlice({
    name: "article",
    initialState,
    reducers: {
        getData : (state, action) =>{
            state.data = action.payload;
        },
        getComment : (state, action) =>{
            state.data = action.payload;
        }
    }
})

export const { getData, getComment } = dbSlice.actions;
export default dbSlice.reducer;