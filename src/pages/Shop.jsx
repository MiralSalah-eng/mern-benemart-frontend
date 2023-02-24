import React, { useState , useEffect } from 'react'
import { Container, Row ,Col} from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import products from '../assets/data/products.js'
import '../Styles/shop.css'
import ProductsList from '../components/UI/ProductsList'
import { useSelector } from 'react-redux'
import { useProduct } from '../hooks/useProduct'
const Shop = () => {

  const [productsData,setProductsData] = useState(products)
  const productsState = useSelector (state => state.products.products)
  const { fetchProducts  } = useProduct()

  useEffect(() => {
    fetchProducts()
  },[])

  const handleFilter = (e) => {
    const filterValue = e.target.value
    if (filterValue) {
      const filteredProducts = products.filter((item => item.category === filterValue))
      setProductsData(filteredProducts)
    }
    if (filterValue==='all') {
      setProductsData(products)
    }

  }

  const handleSearch = (e) => {
    const searchValue = e.target.value
      const searchedProducts = products.filter((item => item.productName.toLowerCase()
      .includes(searchValue.toLowerCase())))
      setProductsData(searchedProducts)
  }

  return (
    <Helmet title={'Shop'}>
        <CommonSection title={'Products'}/>

       <section>
        <Container>
          <Row>

            <Col lg='3' md='6'>
              <div className="filter_widget">
                <select onChange={handleFilter}>
                  <option>Filter By Category</option>
                  <option value="sofa">Sofa</option>
                  <option value="mobile">Mobile</option>
                  <option value="chair">Chair</option>
                  <option value="wireless">Wireless</option>
                  <option value="all">All</option>
                </select>
              </div>
            </Col>

            <Col lg='3' md='6' className='text-end'>
            <div className="filter_widget">
                <select>
                <option>Sort By</option>
                  <option value="assending">Assending</option>
                  <option value="dessending">Dessending</option>
                </select>
              </div>
            </Col>

            <Col lg='6' md='12'>
              <div className="search_box">
                <input onChange={handleSearch}  type='text' placeholder='Search...' />
                <span><i className="ri-search-line"></i></span>
              </div>
            </Col>

          </Row>
        </Container>
       </section>

       <section className='pt-0'>
        <Container>
          <Row>
            {
              (productsData.length === 0 ? <h1 className='text-center'>No Products Founded</h1>
              : <>
              <ProductsList data={productsData}/>
                <ProductsList data={productsState}/>
              </>
              )
            }
          </Row>
        </Container>
       </section>
    </Helmet>  
  )
}

export default Shop