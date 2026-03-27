import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    sideBarOpen:  true
}
const layOutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers:{
        toggleSideBar : (state)=>{
            state.sideBarOpen = !state.sideBarOpen 
        }
    }
});


export default layOutSlice.reducer;
export const {toggleSideBar} = layOutSlice.actions