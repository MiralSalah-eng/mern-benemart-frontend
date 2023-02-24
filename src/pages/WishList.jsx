import '../Styles/wishList.css'
import React from 'react'
import { Container ,Row, Table } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { removeFav } from '../redux/slices/wishListSlice'
import { addItem } from '../redux/slices/cartSlice'
import { toast } from 'react-toastify'
import Helmet from '../components/Helmet/Helmet'
import { Link } from 'react-router-dom'
const WishList = () => {

    const wishlist = useSelector (state => state.wishlist.wishlist)
    const dispatch = useDispatch()

    const removeFromFav = (item) =>{
        dispatch(removeFav({
          id: item.id,
          productName: item.productName,
          imgUrl: item.imgUrl,
          price: item.price,
  
        }))
    }

    const addToCart = (item) =>{
        dispatch(addItem({
          id: item.id,
          productName: item.productName,
          imgUrl: item.imgUrl,
          price: item.price,
  
        }))
  
        toast.success('Product added to Cart')
      }
  return (
    <Helmet title={'Wishlist'}>
    <section className='wishList'>
        <Container>
            <Row>
                <div className='wishList-conatiner'>
                <h6>My Wishlist</h6>
                {wishlist.length === 0 ? ( <p className='mt-5'>There is no items added to your wishlist </p> ) : (

                <>
               <div className='table table-wishlist table-responsive'>
               <Table>
                    <thead>
                        <tr>
                        <th></th>
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th>Add to cart</th>
                        </tr>
                    </thead>

                    <tbody>
                    {wishlist.map((item,index) =>(

                    <tr key={index}>
                    <td> <i onClick={()=>removeFromFav(item)} className="ri-close-line"></i> </td>    
                    <td><img src={require(`../assets/images/${item.imgUrl}`)}  alt=''/></td>
                    <td>
                    <Link to={`/shop/${item.id}`}>
                    {item.productName}
                    </Link>
                    </td>
                    <td>${item.price}</td>
                    <td><button onClick={()=>addToCart(item)} className='button'>Add to Cart</button></td>
                    </tr>
                    ))}
                    </tbody>
                </Table>
               </div>
                </>
                )}
                </div>
            </Row>
        </Container>
    </section>
    </Helmet>
  )
}

export default WishList