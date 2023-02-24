import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    cartItem : [],
    totalAmount : 0,
    totalQuantity : 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem : (state,action) =>{
        const newItem = action.payload
        const existingItem = state.cartItem.find(item => item.id === newItem.id)
        state.totalQuantity ++
        if (!existingItem) {
            state.cartItem.push({
                id: newItem.id,
                productName:newItem.productName,
                imgUrl : newItem.imgUrl,
                price : newItem.price,
                quantity:1,
                totalPrice: newItem.price
            })
        }
        else{
            existingItem.quantity ++
            existingItem.totalPrice = Number(existingItem.totalPrice)+Number(newItem.price)
        }

        state.totalAmount = state.cartItem.reduce((total,item) => 
           total + Number(item.price) * Number(item.quantity),0   
        )

    },
    deleteItem : (state,action) => {
        const id = action.payload
        const existingItem  = state.cartItem.find(item => item.id === id)
        if (existingItem) {
            state.cartItem = state.cartItem.filter(item => item.id !== id )
            state.totalQuantity = state.totalQuantity - existingItem.quantity
    
        }
        state.totalAmount = state.cartItem.reduce((total,item) => 
        total + Number(item.price) * Number(item.quantity),0   
     )
    
    }
  }
});

export const {addItem , deleteItem} = cartSlice.actions

export default cartSlice.reducer