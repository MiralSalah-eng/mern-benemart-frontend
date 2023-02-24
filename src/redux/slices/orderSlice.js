import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orders:[]
}


const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    getAllOrders : (state,action) => {
      state.orders = action.payload
    }
    
  }
});

export const {getAllOrders} = orderSlice.actions

export default orderSlice.reducer