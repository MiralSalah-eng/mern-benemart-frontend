import React, { useEffect, useState } from 'react'
import Helmet from '../components/Helmet/Helmet'
import '../Styles/Home.css'
import {Container,Row,Col} from 'reactstrap'
import heroImg from '../assets/hero-img.png' 
import { Link } from 'react-router-dom'
import Services from '../services/Services'
import ProductsList from '../components/UI/ProductsList'
import products from '../assets/data/products.js'
import counterImg from '../assets/images/counter-timer-img.png'
import Counter from '../components/UI/Counter'
import { useSelector } from 'react-redux'



const Home = () => {

  const currentuser = useSelector (state => state.user.user)

  const [trendingProducts,setTrendingProducts] = useState([])
  const [bestSalesProducts,setBestSalesProducts] = useState([])
  const [mobileProducts,setMobileProducts] = useState([])
  const [wirelessProducts,setWirelessProducts] = useState([])
  const [popularProducts,setPopularProducts] = useState([])

  useEffect(() => {
  const filteredTrendingProducts = products.filter((item => item.category ==='chair'))
  const filteredBestProducts = products.filter((item => item.category ==='sofa'))
  const filteredMobileProducts = products.filter((item => item.category ==='mobile'))
  const filteredWirelessProducts = products.filter((item => item.category ==='wireless'))
  const filteredPopularProducts = products.filter((item => item.category ==='watch'))

  setTrendingProducts(filteredTrendingProducts)
  setBestSalesProducts(filteredBestProducts)
  setMobileProducts(filteredMobileProducts)
  setWirelessProducts(filteredWirelessProducts)
  setPopularProducts(filteredPopularProducts)
},[]);

    const year = new Date().getFullYear()

  return (
   <Helmet title={'Home'}>
    <section className='hero'>
    <Container>
      <Row>
        <Col className='hero_content' lg='6' md='6'>
        <p>Trending products in {year}</p>
        <h2>Make Your Interior More Minimalistic & Modern</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis perspiciatis voluptate libero sint tempore placeat.</p>

        <button className='buy_btn'>
        <Link to='/shop'>Shop Now</Link>
        </button>
        </Col>

        <Col className='heroImg' lg='6' md='6'>
        <img src={heroImg} alt=''/>
        </Col>
      </Row>
    </Container>
    </section>

    <Services/>

    <section className='trending'>
      <Container>
        <Row>
          <Col  className='text-center mb-5' lg='12'>
            <h2 className='sectionTitle'>Trending Products</h2>
          </Col>
          
          <ProductsList data = {trendingProducts}/>
        </Row>
      </Container>
    </section>


    <section className='bestSales'>
      <Container>
        <Row>
          <Col  className='text-center mb-5' lg='12'>
            <h2 className='sectionTitle'>Best Sales Products</h2>
          </Col>
          
          <ProductsList data = {bestSalesProducts}/>
        </Row>
      </Container>
    </section>

    <section className='count_timer'>
    <Container>
      <Row>
        <Col lg='6' md='6'>
          <div className='counterContent'>
            <h4>Limited Offer</h4>
            <h3>Qulity Armchair</h3>

          <Counter/>

          <button className='btn_offer'>
            <Link to='/shop'>Visit Store</Link>
          </button>
          </div>

        </Col>

        <Col className='counterImg' lg='6' md='6'>
        <img src={counterImg} alt=''/>
        </Col>
      </Row>
    </Container>
    </section>


    <section className='new_arrivals'>
      <Container>
        <Row>
        <Col  className='text-center mb-5' lg='12'>
            <h2 className='sectionTitle'>New Arrivals</h2>

          </Col>

          <ProductsList data = {mobileProducts}/>
          <ProductsList data = {wirelessProducts}/>

        </Row>
      </Container>
    </section>


    <section className='popular_category'>
      <Container>
        <Row>
        <Col  className='text-center mb-5' lg='12'>
            <h2 className='sectionTitle'>Popular in Category</h2>

          </Col>

          <ProductsList data = {popularProducts}/>

        </Row>
      </Container>
    </section>
   </Helmet>
  )
}

export default Home