import React ,{useEffect} from 'react'
import { Col, Container, Row } from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import '../Styles/cart.css'
import { deleteItem } from '../redux/slices/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const Cart = () => {

  const dispatch = useDispatch()
  const cartItem = useSelector (state => state.cart.cartItem)
  const totalAmount = useSelector (state => state.cart.totalAmount)

  const handleDelete = (id) => {
    dispatch(deleteItem(id))

  }
  useEffect(() => {
    window.scrollTo(0,0)
  }, [])
  
  return (
    <Helmet title={'Cart'}>
      <CommonSection title={'Shopping Cart'}/>
      <section>
        <Container>
          <Row>
            <Col lg='9'>
              
              {
                cartItem.length === 0 ? <h2 className='fs-4'>No items added to cart</h2>
                :
              <table className='table bordered'>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                {cartItem.map((item,index) =>(

                  <tr key={index}>
                    <td><img src={require(`../assets/images/${item.imgUrl}`)}  alt=''/></td>
                    <td>{item.productName}</td>
                    <td>${item.price}</td>
                    <td>{item.quantity}</td>
                    <td onClick={()=>handleDelete(item.id)}><i className="ri-delete-bin-5-line"></i></td>
                  </tr>
                ))}
                </tbody>
              </table>
              }
            </Col>

            <Col lg='3'>
              <div className='d-flex align-items-center justify-content-between'>
                <h6>Subtotal</h6>
             <span className='fs-4 fw-bold'>${totalAmount}</span>
              </div>
              <p className='fs-6  mt-2'>taxes and shipping will calculate in checkout</p>
              <button className='buy_btn w-100'>
                <Link to='/shop'>Continue Shopping</Link>
              </button>
              
              <button disabled={!cartItem.length} className='buy_btn w-100 mt-3'>
                {
                  cartItem.length > 0 ? <Link disabled to='/checkout'>Checkout</Link> 
                  : <p> Checkout </p>
                }
              </button>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet> 
  )
}

export default Cart