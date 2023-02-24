import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { Container, Row ,Col, Form, FormGroup } from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'
import {useProduct} from '../hooks/useProduct'

import '../Styles/addProducts.css'

const AddProducts = () => {

  const imageBox = useRef(null)
  const inputImage = useRef(null)
  const {addProduct} = useProduct()
  const [imagePreview,setImagePreview] = useState(null)

  const [title,setTitle] = useState("")
  const [price,setPrice] = useState("")
  const [category,setCategory] = useState("")
  const [shortDesc,seShortDesc] = useState("")
  const [desc,setDesc] = useState("")
  const [image,setImage] = useState(null)
  

  const defaultBtnActive = (e) => {
    e.preventDefault()
    inputImage.current.click()
  }

  const handleImage = () => {
    const file = inputImage.current.files[0];
    setImage(inputImage.current.files[0])

    if(file){
      const reader = new FileReader();
      var url = reader.readAsDataURL(file);
      console.log(url);
      reader.onloadend = function(){
        const result = reader.result;
        setImagePreview(result);
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
  const formData = new FormData()
  formData.append('title',title)
  formData.append('price',price)
  formData.append('category',category)
  formData.append('shortDesc',shortDesc)
  formData.append('desc',desc)
  formData.append('image',image)


  await addProduct(formData)

  }

  return (
    <Helmet title={'Add Products'}>
    <section className='pt-4'>
        <Container>
            <Row>
                <Col lg='12'>
                <h4 className='title fw-bold mb-2'>Add New Product</h4>
                 </Col>
                <Form onSubmit={handleSubmit} encType="multipart/form-data">
                  <Row>
                    <Col lg='8'>
                    <FormGroup className='form-group'>
                    <label htmlFor="title">Add Product Title</label>
                  <input name='title' value={title} onChange={(e)=>setTitle(e.target.value)} className='form-control add_input ' type='text' placeholder='Product Title'/>
                </FormGroup>

                <FormGroup className='form-group'>
                    <label htmlFor="shortDesc">Short Description</label>
                  <input name='shortDesc'  value={shortDesc} onChange={(e)=>seShortDesc(e.target.value)} className='form-control add_input ' type='text' placeholder='Short Description'/>
                </FormGroup>

                <FormGroup className='form-group'>
                    <label htmlFor="desc">Description</label>
                  <input name='desc' value={desc} onChange={(e)=>setDesc(e.target.value)}   className='form-control add_input ' type='text' placeholder='Product Description'/>
                </FormGroup>

                <FormGroup className='form-group'>
                    <label htmlFor="price">Price</label>
                  <input name='price' value={price} onChange={(e)=>setPrice(e.target.value)}    className='form-control add_input ' type='text' placeholder='Product Price'/>
                </FormGroup>

                <label htmlFor="category">Product category</label>
              <select  name="category"
               value={category} onChange={(e)=>setCategory(e.target.value)} 
              className="form-select" aria-label="Default select example">
                <option value="sofa">Sofa</option>
                <option value="chair">Chair</option>
                <option value="mobile">Mobile</option>
                <option value="watch">Watch</option>
                <option value="wireless">Wireless</option>
              </select>
                

                    </Col>


                    <Col lg='4'>
                    
                    <div className='imag_container'>
                      <div className="wrapper">

                        <div className="image">
                          {image && <img  src={`${imagePreview}`} alt='' ref={imageBox}/> }
                        </div>

                        <div className='content'>
                          <div className="icon"><i className="ri-upload-cloud-fill"></i></div>
                          <div className='text'>No file uploaded yet!</div>
                        </div>

                       
                          <div onClick={()=>setImage(null)} id='cancel_btn'><i className="ri-close-line"></i></div>
                          <div className='file_name'>File name here</div>
                        


                      </div>
                       <input ref={inputImage} name='image' onChange={handleImage} id="default-btn" type="file" hidden/>
                       <button onClick={defaultBtnActive} id="custom-btn">Choose a file</button>

                    </div>

                    </Col>
              </Row>
              <button type='submit' className='buy_btn mt-0'>Add product</button>
                </Form>
            </Row>
        </Container>
    </section>
    </Helmet>
    )
}

export default AddProducts