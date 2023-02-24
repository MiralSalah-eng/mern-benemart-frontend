import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { Container, Row ,Col} from 'reactstrap'
import '../Styles/adminNav.css'


export const AdminNav = () => {

const [closeIcon,setCloseIcon] = useState(false)


const menuToggle = () => {
  setCloseIcon(!closeIcon)
}
    const nav_links = [
        {
          path:'dashboard',
          display:"Dashboard"
        },
        {
          path:'dashboard/add-producs',
          display:"Add Products"
        },
        {
          path:'dashboard/all-producs',
          display:"All Products"
        },
        {
          path:'dashboard/orders',
          display:"Order"
        },
        {
          path:'dashboard/users',
          display:"Users"
        },
       
      ]
    

    const currentuser = useSelector (state => state.user.user)
  return (
    <>
        <header className='admin_header'>
        <div className="admin_nav">
            <Container>
              <div className='admin_nav_wrapper'>
                <div className='logo'>
                   <Link  to='/'><h2>Benemart</h2></Link>
                </div>

                <div className="admin_search_box">
                <input type='text' placeholder='Search...' />
                <span><i className="ri-search-line"></i></span>
              </div>

              <div className='admin_user d-flex justify-content-center gap-2 align-items-center text-white'>
              {currentuser && currentuser.isAdmin && (
               <>
                
                <img  src={require(`../assets/images/${currentuser.image}`)}  alt=''/>
               </>
              )}
              </div>

              </div>
            </Container>
        </div>
    </header>
    
    <section className='admin_nav_menu'>
        <Container>
            <Row>
                <div className={closeIcon ? 'mobileMenu' : 'admin_menu'}>
                  <span onClick={menuToggle}>
                  {closeIcon ? <i className="ri-close-line"></i>  
                  :  <i className="ri-menu-line"></i> }
                  </span>
                    <ul>
                        {nav_links.map((item,index) => (
                            
                        <li key={index}>
                            <NavLink className={(navClass)=>navClass.isActive ? 'nav_active' : ''} 
                            to={item.path}>{item.display}</NavLink>
                        </li>
                        ))}
                    </ul>
                </div>
            </Row>
        </Container>
    </section>
    </>
  )
}
