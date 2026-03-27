import { ThemeMode, ThemeState } from "@/GlopalTypes/Types";
import { createSlice } from "@reduxjs/toolkit";


const saveMode = 
typeof window !== 'undefined'? 
localStorage.getItem('theme') as ThemeMode:
'light'


const initialState : ThemeState = {
  mode: saveMode || 'light' 
};


const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers:{
    toggleTheme : (state)=>{
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.mode);
    }
  }
});


export default themeSlice.reducer;
export const {toggleTheme} = themeSlice.actions