import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Col, Container, Form, Row } from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'
import { useLogout } from '../hooks/useLogout'
import '../Styles/profile.css'
import { useUsers } from '../hooks/useUsers'
import { useState , useEffect } from 'react'
import { useOrder } from '../hooks/useOrder'

const Profile = () => {
    const currentuser = useSelector(state => state.user.user)
    const {fetchOrders} = useOrder()

    const orders = useSelector(state=>state.orders.orders)
    useEffect(() => {
     fetchOrders()
       }, [])
       const userOrders = orders.filter(order => order.email === currentuser.email)
    const  { logout} = useLogout()
    const { editPersonalInfo , isLoading } = useUsers()

   const [name,setName] = useState(currentuser.username) 
   const [email,setEmail] = useState(currentuser.email) 
   const [password,setPassword] = useState(currentuser.password)

   const handleLogout =async (e) => {
        e.preventDefault()
         await logout()
      }

    const handleForm = async (e) =>{
        e.preventDefault()
        await editPersonalInfo (currentuser._id,name,email,password)
    }  
  return (
    <Helmet title={'Profile'}>
        <section>
            <Container>
                <Row>
                    <Col lg='4'>
                        <div className='profile-card'>
                            <div className='user-info'>
                                <img src={require(`../assets/images/${currentuser.image}`)}/>
                                <h4>{currentuser.username}</h4>
                                <span>{currentuser.email}</span>
                            </div>

                            <div className='profile-nav'>
                                <ul>
                                    
                                    <li><i className="ri-heart-2-line"></i><Link to='/wishlist'>Wishlist</Link></li>
                                    <li><i className="ri-shopping-cart-line"></i><Link to='/cart'>Cart</Link></li>
                                    <li>
                                    <i className="ri-logout-box-line"></i>
                                    <span style={{cursor : "pointer"}} onClick={handleLogout}>
                                    Logout</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Col>

                    <Col lg='8'>
                        <div className="profile-content">
                        {
                         isLoading ? <h4 className='text-center fw-bold py-5'>Loading ... </h4>
                    : (<>
                     <div className='edit-info'>
                          <h4>Account Setting</h4>
                            <Form onSubmit={handleForm}>
                                <input name='name' type='text' placeholder='Change Name' onChange={(e)=>setName(e.target.value)}/>
                                <input  name='email' type='text' placeholder='Change E-mail' onChange={(e)=>setEmail(e.target.value)}/>
                               <input name='password' type='text' placeholder='Change Password' onChange={(e)=>setPassword(e.target.value)}/>
                                 <input type='submit' value='Save'/>
                            </Form>
                          </div>

                        {userOrders.length ? (
                            <div className='order-list'>
                            <h4>Your Orders</h4>
                            <table>
                                <thead>
                                    <tr>
                                    <th>id</th>
                                    <th>name</th>
                                    <th>price</th>
                                    <th>qty</th>
                                    <th>total price</th>
                                    <th>total</th>
                                    </tr>
                                </thead>
                                    {userOrders.map((order,index)=>(
                                        <tbody key={index}>
                                    <>{order.cartItem.map((item,index) => (
                                        <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.productName}</td>
                                        <td>{item.price}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.totalPrice}</td>
                                        <td>{order.totalAmount}</td>
                                        </tr>
                                    ))}</>
                                        </tbody>
                                    ))}
                            </table>
                            
                            </div>

                        ) : (
                            <>
                            <h4>There is no orders</h4>
                            <Link className='shop-btn'
                            to='/shop'>Shop</Link>
                            </>
                        ) }
                       
              </>)}
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    </Helmet>
  )
}

export default Profile