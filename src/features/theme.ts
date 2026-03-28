import { ThemeMode, ThemeState } from "@/GlopalTypes/Types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



const initialState : ThemeState = {
  mode: 'light' 
};


const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers:{
    toggleTheme : (state)=>{
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.mode);
    },
  setTheme: (state, action: PayloadAction<ThemeMode>) => {
    state.mode = action.payload;
  }
  }
});


export default themeSlice.reducer;
export const {toggleTheme, setTheme} = themeSlice.actions