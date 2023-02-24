import React from 'react'
import {Routes,Route} from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import Shop from '../pages/Shop'
import Cart from '../pages/Cart'
import Chekout from '../pages/Checkout'
import ProductDetails from '../pages/ProductDetails'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import { useSelector } from 'react-redux'
import NotFound from '../pages/NotFound'
import Dashboard from '../pages/Dashboard'
import ProtectedRoute from './ProtectedRoute'
import AdminProtectRoute from './AdminProtectRoute'
import AddProducts from '../Admin/AddProducts'
import AllProducts from '../Admin/AllProducts'
import Users from '../Admin/Users'
import Orders from '../Admin/Orders'
import WishList from '../pages/WishList'
import Profile from '../pages/Profile'



const Routers = () => {
    const cartItem = useSelector(state => state.cart.cartItem)
    const currentUser = useSelector(state => state.user.user)
  return (
   
<Routes>
  <Route path='/' element={<Navigate to='home'/>}/>
    <Route path='home' element={<Home/>}/>
    <Route path='shop' element={<Shop/>}/>
    <Route path='shop/:id' element={<ProductDetails/>}/>
    <Route path='login' element={ currentUser ? <Navigate to = '/home'/> : <Login/>}/>
    <Route path='signup' element={currentUser ? <Navigate to = '/home'/> : <Signup/>}/>
    <Route path='cart' element={<Cart/>}/>
    <Route path='wishlist' element={<WishList/>}/>
    <Route path='*' element={<NotFound/>}/>
    
    <Route path='/*' element={<ProtectedRoute/>}>
        <Route path='checkout' element={ cartItem.length > 0 ? <Chekout/> : <Navigate to ='/shop' /> }/>
        <Route path='profile' element={<Profile/>}/>
       
        <Route path='dashboard' element={<AdminProtectRoute/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='add-producs' element={<AddProducts/>}/>
          <Route path='all-producs' element={<AllProducts/>}/>
          <Route path='orders' element={<Orders/>}/>
          <Route path='users' element={<Users/>}/>
        </Route>
      
    </Route>

</Routes>

  )
}

export default Routers

