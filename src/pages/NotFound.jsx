import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'

const NotFound = () => {
  return (
<section className='notFoundSection'>
  <Container>
    <Row>
      <Col lg='12'>
          
      <div className="notfound">
      <div className="notfound">
      <div className="notfound-404">
      <h1>404</h1>
      </div>
      <h2 className='fw-bold fs-4'>Oops! This Page Could Not Be Found</h2>
      
      <button className='buy_btn'><Link to='/'>Go To Homepage</Link></button>
      </div>
      </div>
      </Col>
    </Row>
  </Container>
</section>
    )
}

export default NotFound