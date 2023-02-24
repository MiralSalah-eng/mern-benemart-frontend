import '../Styles/dashboard.css'
import { Container ,Row ,Col } from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'
import { useSelector } from 'react-redux'
import { useProduct } from '../hooks/useProduct'
import { useOrder } from '../hooks/useOrder'
import { useUsers } from '../hooks/useUsers'
import { useEffect } from 'react'

const Dashboard = () => {
  const users = useSelector(state  => state.user.users)
  const products = useSelector(state  => state.products.products)
  const orders = useSelector(state  => state.orders.orders)

  const {fetchOrders} = useOrder()
  const {fetchProducts} = useProduct()
  const {getUsers} = useUsers()

  useEffect(() => {
    fetchOrders()
    fetchProducts()
     getUsers()

  }, [])

  return (
    <Helmet title = {'Dashboard'}>
      <section className='dashboard'>
        <Container>
        <Row>
            <Col lg='3'>
              <div className="revenu_box">
                <div className='heading'>
                <h5>Total Sales</h5>
                <span><i className="ri-money-dollar-circle-line"></i></span>
               </div>
                <span className='content'>$78550</span>
              </div>
            </Col>

            <Col lg='3'>
            <div className="order_box">
            <div className='heading'>
                <h5>Orders</h5>
                <span><i className="ri-shopping-cart-line"></i></span>
            </div>    
                <span className='content'>{orders.length}</span>
              </div>
            </Col>

            <Col lg='3'>
            <div className="products_box">
            <div className='heading'>
                <h5>Total Products</h5>
                <span><i className="ri-briefcase-line"></i></span>
                </div>
                <span className='content'>{products.length}</span>
              </div>
            </Col>

            <Col lg='3'>
            <div className="users_box">
            <div className='heading'>
                <h5>Total Users</h5>
                <span><i className="ri-group-line"></i></span>
                </div>
                <span className='content'>{users.length}</span>
              </div>
            </Col>
        </Row>
    </Container>
    </section>
    </Helmet>
  )
}

export default Dashboard