import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    wishlist : [],
    total : 0
}

const wishListSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addFav : (state,action) =>{
        const newItem = action.payload
        const existingItem = state.wishlist.find(item => item.id === newItem.id)
        if(existingItem) {
            return state
        }
        else {
            state.total +=1
            state.wishlist.push({
            id: newItem.id,
            productName:newItem.productName,
            imgUrl : newItem.imgUrl,
            price : newItem.price,      
        })
        }
    },
   removeFav : (state,action) =>{ 
    const deletedItem = action.payload
    state.wishlist = state.wishlist.filter(item=> item.id !== deletedItem.id )
    state.total -=1

   }

}
});




export const {addFav , removeFav} = wishListSlice.actions

export default wishListSlice.reducer