import { createSlice } from '@reduxjs/toolkit'

const user = localStorage.getItem('user') !== null
 ? JSON.parse(localStorage.getItem('user'))  : null
 

const initialState = {
    user: user,
    users:[]
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loggingin : (state,action) =>{
        state.user = action.payload
    },
    loggingout : (state,action) =>{
       state.user = null
    },
    getAllUsers : (state,action) => {
      state.users = action.payload
    }
    
  }
});

export const {loggingin,loggingout , getAllUsers} = userSlice.actions

export default userSlice.reducer