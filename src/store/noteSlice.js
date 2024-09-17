import { createSlice } from "@reduxjs/toolkit";


const noteSlice = createSlice({
    name: "notes",
    initialState: JSON.parse(localStorage.getItem("notes")) || { tasks: [], theme: "dark", history: [] },
    reducers: {
        add(state, action) {
            state.tasks.push(action.payload);
            localStorage.setItem("notes", JSON.stringify(state));
        },
        remove(state, action)
        {
            state.tasks[action.payload].isNew = false;
            state.history.push(state.tasks[action.payload])
            state.tasks = state.tasks.filter((item, index) => index !== action.payload);

            localStorage.setItem("notes", JSON.stringify(state))
            return state;
        },
        markAsDone(state, action) 
        {
            state.tasks[action.payload].done = true;
            localStorage.setItem("notes", JSON.stringify(state))
            return state
        },
        markAsUnDone(state, action) 
        {
            state.tasks[action.payload].done = false;
            localStorage.setItem("notes", JSON.stringify(state))
            return state
        },
        changeTheme(state, action) 
        {
            state.theme = action.payload;
            localStorage.setItem("notes", JSON.stringify(state))

        },
        deleteForever(state,action)
        {
            state.history=state.history.filter((item,index)=>index!=action.payload)
            localStorage.setItem("notes", JSON.stringify(state))
            return state

        },
        
    }
})


export const { add, remove, changeTheme, markAsDone, markAsUnDone,deleteForever } = noteSlice.actions;

export default noteSlice.reducer;