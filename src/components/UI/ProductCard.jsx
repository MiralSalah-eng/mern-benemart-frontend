import React from 'react'
import { Link } from 'react-router-dom'
import {Col} from 'reactstrap'
import '../../Styles/ProductCard.css'

import { useDispatch } from 'react-redux'
import { addItem } from '../../redux/slices/cartSlice'
import { addFav } from '../../redux/slices/wishListSlice'

import { toast } from 'react-toastify'

const ProductCard = ({item}) => {

    const dispatch = useDispatch()
  
    const addToCart = () =>{
      dispatch(addItem({
        id: item.id,
        productName: item.productName,
        imgUrl: item.imgUrl,
        price: item.price,

      }))

      toast.success('Product added to Cart')
    }
    const addToWishList = () =>{
      dispatch(addFav({
        id: item.id,
        productName: item.productName,
        imgUrl: item.imgUrl,
        price: item.price,

      }))

      toast.success('Product added to Wishlist')
    }
  return (
    <Col lg='3' md='4'>
    <div className='product_item'>
        <div className='productImg'>
            <img src={require(`../../assets/images/${item.imgUrl}`)} alt='' />
        </div>

        <div className='product_info'>
          <Link to={`/shop/${item.id}`}>
          <h3>{item.productName}</h3>
          </Link>
            <span>{item.category}</span>
        </div>   
        
        <div className='product_card-bottom'>
            <span>${item.price}</span>
            <div>
            <span className='fav'><i onClick={addToWishList} className="ri-heart-2-line"></i></span>
            <span><i onClick={addToCart} className="ri-add-line"></i></span>
            </div>
        </div>
    </div>
    </Col>
  )
}

export default ProductCard