import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, Row ,Form,FormGroup} from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'
import  { useSignup } from '../hooks/useSignup'
import { toast } from 'react-toastify'

import '../Styles/auth.css'

const Signup = () => {

      const [username,setUsername]  = useState("")
      const [email,setEmail]  = useState("")
      const [password,setPassword]  = useState("")
      const [image,setImage]  = useState("")

      const  { signup , isLoading , error} = useSignup()
      
      const chanageFile =  (e) => {
        setImage(e.target.files[0])
      }

      const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('username',username)
        formData.append('email',email)
        formData.append('password',password)
        formData.append('image',image)

         await signup(formData)

      }

     

  return (
    <Helmet title={'Signup'}>
      <section  className='auth'>
        <Container>
          <Row>
            <Col lg='6' className='m-auto text-center'>
            {
              isLoading ? <h4 className='text-center fw-bold py-5'>Loading ... </h4>
              : (<>
                <h3 className='fw-bold fs-4 mb-3'>Signup</h3>

              <Form className='auth_form' onSubmit={handleSubmit}  encType="multipart/form-data">

              <FormGroup className='form-group'>
                  <input value={username} name='username' onChange={(e)=>setUsername(e.target.value)} className='form-control' type='text' placeholder='Enter your username'/>
                </FormGroup>

                <FormGroup className='form-group'>
                  <input value={email} name='email' onChange={(e)=>setEmail(e.target.value)} className='form-control' type='text' placeholder='Enter your email'/>
                </FormGroup>
                
                <FormGroup>
                  <input value={password} name='password' onChange={(e)=>setPassword(e.target.value)} className='form-control' type='password' placeholder='Enter your password'/>
                </FormGroup>

                <FormGroup>
                  <input  type='file' name='image' onChange={chanageFile} className='form-control'/>
                </FormGroup>

                <button  disabled={isLoading } type='submit' className='light_btn'>Signup</button>
                <p className=' text-white mt-4'>Have an account already <Link to='/login'>Login</Link></p>
              </Form>
              </>)
              }
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Signup