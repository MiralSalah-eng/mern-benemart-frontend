import {React, useState, useRef ,useEffect} from 'react'
import { Container, Row ,Col } from 'reactstrap'
import {useParams} from 'react-router-dom'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import products from '../assets/data/products.js'
import { useDispatch } from 'react-redux'
import { addItem } from '../redux/slices/cartSlice'
import { toast } from 'react-toastify'
import ProductsList from '../components/UI/ProductsList'

import '../Styles/productDetails.css'
import UserImg from '../assets/images/user.png'

const ProductDetails = () => {

  const {id} = useParams()
  const product = products.find(item => item.id === id)
  const {productName,imgUrl,category,price,shortDesc,reviews,avgRating,description} = product

  const dispatch = useDispatch()
  
  const addToCart = () =>{
    dispatch(addItem({
      id: product.id,
      productName: product.productName,
      imgUrl: product.imgUrl,
      price: product.price,

    }))

    toast.success('Product added to Cart')
  }

  const [tab, setTab] = useState('desc')
  const [rating, setRating] = useState(null)

  const reviewUser = useRef('')
  const reviewMsg = useRef('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const reviewUserName = reviewUser.current.value
    const reviewUserMsg = reviewMsg.current.value

    const reviewObj = {
      username : reviewUserName,
      text : reviewUserMsg,
      rating: rating

    }
    toast.success('Your review added successfully')
    console.log(reviews)
  }


  const relatedProducts = products.filter(item => item.category === category).filter(item => item.id !== id)

  useEffect(() => {
    window.scrollTo(0,0)
    setRating(null)
  
  }, [product])
  
  return (
    <Helmet title="Product Details">
      <CommonSection title={`${productName} Details`} />

      <section className='pt-0'>
      <Container>
        <Row>
          <Col lg='6'>
            <img src={require(`../assets/images/${imgUrl}`)}  alt=''/>
          </Col>

          <Col lg='6'>
            <div className='product_details'>
            <h2>{productName}</h2>
              <div className='product_rating d-flex align-item-center gap-5 mb-4'>
                <div>
                <span><i className="ri-star-fill"></i></span>
                <span><i className="ri-star-fill"></i></span>
                <span><i className="ri-star-fill"></i></span>
                <span><i className="ri-star-fill"></i></span>
                <span><i className="ri-star-half-fill"></i></span>
                </div>
              <p>({avgRating} rating)</p>  
              </div>

            <span className='product_price'>Price : ${price}</span>  
            <p className='product_category'>Category : {category}</p>  
            <p className='mt-4 product_desc'>Description : {shortDesc}</p>

            <button onClick={addToCart} className='buy_btn'>Add to cart</button>
            </div>            
          </Col>
        </Row>
      </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <div className='tab_wrapper d-flex align-item-center gap-5'>
                <h6 onClick={()=> setTab('desc')} className={tab==='desc' ? 'active_tab' :''}>Description</h6>
                <h6 onClick={()=> setTab('rev')} className={tab==='rev' ? 'active_tab' :''}>Reviews({reviews.length})</h6>
              </div>
              <div className='tab_content'>

                {
                tab === 'desc' ? (
                  <p className='mt-4'>{description}</p>
                ) :
                (
                  <div className='product_reviews'>
                   <div className='review_wrapper mt-5'>
                   <ul>
                    {reviews?.map((review,index) => (
                     <li className='client_review' key={index}>
                      <img src={UserImg}/>
                     <div className='client_review_content d-flex flex-column '>
                     <p>{review.text}</p>
                    <div className='d-flex justify-content-sm-between justify-content-start gap-5'>
                    <span className='rating'>{avgRating} (reating)</span>
                     <span>John Doe</span>
                    </div>
                     
                     </div>
                     </li>
                    ))}
                    </ul>
                    <div className='review_form'>
                      <h5>Leave your experience</h5>
                      <form action='' onSubmit={handleSubmit}>
                      <div className='form_group'>
                         <input type="text" placeholder='Enter name' ref={reviewUser}/>
                      </div>
                      <div className='set-rating form_group d-flex align-item-center  gap-5'>
                      <span onClick={()=>setRating(1)}>1<i className="ri-star-fill"></i></span>
                      <span onClick={()=>setRating(2)}>2<i className="ri-star-fill"></i></span>
                      <span onClick={()=>setRating(3)}>3<i className="ri-star-fill"></i></span>
                      <span onClick={()=>setRating(4)}>4<i className="ri-star-fill"></i></span>
                      <span onClick={()=>setRating(5)}>5<i className="ri-star-fill"></i></span>

                      {rating && 'You rating is  ' + rating }
                      </div>
                      <div className='form_group'>
                         <textarea rows={4} placeholder='Review Meassage .... ' ref={reviewMsg}/>
                      </div>

                      <button className='buy_btn review_btn'>Submit review</button>
                      </form>
                    </div>
                   </div>
                  </div>

                )
                }

              </div>
            </Col>

            <Col className='mt-5' lg='12'>
              <h2 className='related_title'>You might also like </h2>
            </Col>

              <ProductsList data ={relatedProducts}/>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default ProductDetails