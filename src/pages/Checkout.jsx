import React,{ useState } from 'react'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import { Container,Row,Col,Form,FormGroup } from 'reactstrap'
import { useOrder } from '../hooks/useOrder'


import '../Styles/checkout.css'
import { useSelector } from 'react-redux'

const Checkout = () => {


  const user = useSelector(state => state.user.user)
  const [name,setName] =useState(user.username||'')
  const [email,setEmail] =useState(user.email||'')
  const [phone,setPhone] =useState()
  const [address,setAddress] =useState('')


  const totalQuantity = useSelector(state => state.cart.totalQuantity)
  const totalAmount = useSelector(state => state.cart.totalAmount)
  const cartItem = useSelector(state => state.cart.cartItem)

  const {putOrder} = useOrder()
 

  const handleOrderSubmit = async(e) => {
    e.preventDefault()
   
    /*  const formData = new FormData()
    formData.append('name',name)
    formData.append('email',email)
    formData.append('phone',phone)
    formData.append('address',address)
    formData.append('totalQuantity',totalQuantity)
    formData.append('totalAmount',totalAmount)
    formData.append('cartItem',JSON.stringify(cartItem))
 */

    const data = {name,email,phone,address,cartItem,totalAmount,totalQuantity}
    await putOrder(data) 
  }      

  return (
    <Helmet title={'Checkout'}>
      <CommonSection title={'Checkout'}/>
      <section>
        <Container>
          <Row>
            <Col lg='8'>
              <h6 className='mb-4 fw-bold'>Billing Information</h6>
              <Form className='billing'>
                <FormGroup className='form-group'>
                  <input className='form-control' type='text'  onChange={(e)=>setName(e.target.value)} placeholder={user.username}/>
                </FormGroup>
                
                <FormGroup>
                  <input className='form-control' type='email' onChange={(e)=>setEmail(e.target.value)} placeholder={user.email}/>
                </FormGroup>

                <FormGroup>
                  <input className='form-control' type='number' onChange={(e)=>setPhone(e.target.value)} placeholder='Phone number'/>
                </FormGroup>
                
                <FormGroup>
                  <input className='form-control' type='text' onChange={(e)=>setAddress(e.target.value)} placeholder='Street address'/>
                </FormGroup>

        

              </Form>
            </Col>

            <Col lg='4'>
              <div className="checkout_cart">
                <h6>Total Qty: <span>{totalQuantity} items</span></h6>
                <h6>Subtotal: <span>{totalAmount}</span></h6>
                <h6><span>Shipping: <br />free shipping</span><span>$0</span></h6>
               
                <h4>Total Cost: <span>{totalAmount}</span></h4>
              <button onClick={handleOrderSubmit} type='submit' disabled={!name||!phone||!email||!address} 
              className='light_btn'>Place Your Order</button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

    </Helmet>
   
  )
}

export default Checkout