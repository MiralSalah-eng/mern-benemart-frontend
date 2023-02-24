import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, Row ,Form,FormGroup} from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'
import { useLogin } from '../hooks/useLogin'

import '../Styles/auth.css'

const Login = () => {

      const [email,setEmail]  = useState("")
      const [password,setPassword]  = useState("")

      const   { login , isLoading } = useLogin()

      const handleSubmit = async (e) => {
        e.preventDefault()
         await login(email,password)
                
      }


  return (
    <Helmet title={'Login'}>
      <section className='auth'>
        <Container>
          <Row>
            <Col lg='6' className='m-auto text-center'>
             {
              isLoading ? <h4 className='text-center fw-bold py-5'>Loading ... </h4>
              : (<>
               <h3 className='fw-bold fs-4 mb-3'>Login</h3>

              <Form className='auth_form' onSubmit={handleSubmit}>
                <FormGroup className='form-group'>
                  <input value={email} onChange={(e)=>setEmail(e.target.value)} className='form-control' type='email' placeholder='Enter your email'/>
                </FormGroup>
                
                <FormGroup>
                  <input value={password} onChange={(e)=>setPassword(e.target.value)} className='form-control' type='password' placeholder='Enter your password'/>
                </FormGroup>

                <button  disabled={isLoading}  type='submit' className='light_btn'>Login</button>
                <p className=' text-white mt-4'>Don't have an account ? <Link to='/signup'>Create an account</Link></p>
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

export default Login