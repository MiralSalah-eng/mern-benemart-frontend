import React from 'react'
import { Col, Container, ListGroup, ListGroupItem, Row } from 'reactstrap'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import './Footer.css'
import { useSelector } from 'react-redux'

const Footer = () => {
    const currentUser = useSelector(state => state.user.user)
    const year = new Date().getFullYear()

  return (
    <section className='footer'>
      <Container>
        <Row>
          <Col className='brand mb-3' lg='4'>
          <Link to='/'>
            <div className='logo'>
              <img className='footerImg' src={logo} alt=''/>
              <div className='header_text'>
              <h1>Benemart</h1>
              <p>Since 1995</p>
              </div>
            </div>
            </Link>
            <p className='footer_text mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates quis sit sapiente minima! Delectus cum id, deleniti numquam enim vero?</p>
          </Col>

          <Col className='footer_quik_links mb-3' lg='3'>
            <h4 className='text-white fs-5 mb-3 title'>Top Catergories</h4>
            <ListGroup>
              <ListGroupItem className='ps-0 border-0'><Link to="#">Mobile Phones</Link></ListGroupItem>
              <ListGroupItem className='ps-0 border-0'><Link to="#">Modern Sofa</Link></ListGroupItem>
              <ListGroupItem className='ps-0 border-0'><Link to="#">Arm Chair</Link></ListGroupItem>
              <ListGroupItem className='ps-0 border-0'><Link to="#">Smart Watches</Link></ListGroupItem>
                
            </ListGroup>

          </Col>
          <Col className='footer_quik_links mb-3' lg='2'>

          <h4 className='text-white fs-5 mb-3 title'>Useful Links</h4>
            <ListGroup>
              <ListGroupItem className='ps-0 border-0'><Link to="/shop">Shop</Link></ListGroupItem>
              <ListGroupItem className='ps-0 border-0'><Link to="/cart">Cart</Link></ListGroupItem>
              <ListGroupItem disabled={currentUser ? true : false} className='ps-0 border-0 bg-transparent'><Link to="/login">Login</Link></ListGroupItem>
              <ListGroupItem className='ps-0 border-0'><Link to="#">Privacy Policy</Link></ListGroupItem>
                
            </ListGroup>

          </Col>

          <Col className='footer_quik_links mb-3' lg='3'>

          <h4 className='text-white fs-5 mb-3 title'>Contact</h4>
            <ListGroup>
              <ListGroupItem className='ps-0 border-0'>
              <i className="ri-map-pin-line me-3 fs-6"></i>123 Addrees, Sydney, Australia</ListGroupItem>

              <ListGroupItem className='ps-0 border-0'>
              <i className="ri-phone-line me-3 fs-6"></i>+088456845412</ListGroupItem>

              <ListGroupItem className='ps-0 border-0'><i className="ri-mail-line me-3 fs-6">
              </i>example123@google.com</ListGroupItem>                
            </ListGroup>

          </Col>

          <Col className='text-center copyRight' lg='12'>
            <p>copyright © {year} all rights reserved</p>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Footer