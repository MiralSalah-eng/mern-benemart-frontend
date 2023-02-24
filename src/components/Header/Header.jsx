import React, { useEffect, useRef, useState } from 'react'
import './Header.css';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import {Container,Row} from 'reactstrap'
import { useSelector } from 'react-redux';
import { useLogout } from '../../hooks/useLogout';

const Header = () => {

    const currentuser = useSelector (state => state.user.user)
    const  totalQuantity = useSelector(state => state.cart.totalQuantity)
    const totalWishes = useSelector (state => state.wishlist.total)

    const headrRef = useRef(null)
    const menuRef = useRef(null)
    const profileActionsRef = useRef(null)
    const [closeIcon,setCloseIcon] = useState(false)
    const  { logout} = useLogout()
    

    const navigate = useNavigate()

    const stickyHeaderFunc = () => {
      window.addEventListener('scroll', () => {
        if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80)
        {
          headrRef.current.classList.add('sticky_header')
        }
        else {
          headrRef.current.classList.remove('sticky_header')          
        }
      })
    }
    
    const toggleProfileAction = () => {
      profileActionsRef.current.classList.toggle('show_actions')

    }

    const menuToggle = () => {
      menuRef.current.classList.toggle('active_menu')
      setCloseIcon(true)

    }

    const handleLogout =async (e) => {
      e.preventDefault()
       await logout()
    }
    
    useEffect(() => {
      stickyHeaderFunc()
      return ()=> window.removeEventListener('scroll',stickyHeaderFunc)
      
    }, [])
    
  const nav_links = [
    {
      path:'home',
      display:"Home"
    },
    {
      path:'shop',
      display:"Shop"
    },
    {
      path:'cart',
      display:"Cart"
    },
   
  ]



  return (
    <header ref={headrRef} className='header'>
      <Container>
        <Row>
          <div className="nav-wrapper">
            <Link to='/'>
            <div className='logo'>
              <img src={logo} alt=''/>
              <div className='header_text'>
              <h1>Benemart</h1>
              <p>Since 1995</p>
              </div>
            </div>
            </Link>

            <div className='navigation' ref={menuRef} onClick={menuToggle}>
              {closeIcon && (<i className="ri-close-line closeIcon"></i>)}
              <ul className="menu">   

              {nav_links.map((item,index)=>(
                <li key={index} className='nav_item'>
                <NavLink to={item.path} className={(navClass)=>navClass.isActive ? 'nav_active' : ''}>{item.display}</NavLink>
              </li>
              ))}

              </ul>
            </div>
          <div className='nav_icons'>
            <span className='fav_icon'  onClick={()=>navigate('/wishlist')}><i className="ri-heart-2-line"></i>
            <div className="badge">{totalWishes}</div>
            </span>
            <span className='cart_icon' onClick={()=>navigate('/cart')}><i className="ri-shopping-cart-line"></i>
            <div className="badge">{totalQuantity}</div>
            </span>

            <div className='user_icon' onClick={toggleProfileAction}>
              {
                currentuser && currentuser.image ?
                <img className='profile' src={require(`../../assets/images/${currentuser.image}`)}  alt=''></img>
                : <i   className="ri-user-line"></i>
          
              }

                <div  className='profile-actions' ref={profileActionsRef}>
                
                { !currentuser && (

                <>
                <NavLink to='/signup' className={(navClass)=>navClass.isActive ? 'nav_active' : ''}>Signup</NavLink>
                <NavLink to='/login' className={(navClass)=>navClass.isActive ? 'nav_active' : ''}>Login</NavLink>
             
                </>
                 )}

              {
                 currentuser && currentuser.isAdmin &&
                 (
                  <NavLink to='/dashboard' className={(navClass)=>navClass.isActive ? 'nav_active' : ''}>Dashboard</NavLink>
                 ) 
              }  

               { currentuser && (
               
             <>
                <NavLink to='/profile' className={(navClass)=>navClass.isActive ? 'nav_active' : ''}>Profile</NavLink>
                 <div className='d-flex gap-2'>
                 <i className="ri-logout-box-line"></i>
                <span onClick={handleLogout} 
                className={(navClass)=> navClass.isActive && 'nav_active'}>
                  Logout</span>
               </div>

             </>
             
               ) }
           
                </div>

            </div>

            <div className='monbile_menu'>
            <span  onClick={menuToggle} className='menu'>
            <i className="ri-menu-line"></i>
            </span>
          </div>
          </div>

          

          </div>
        </Row>
      </Container>
    </header>
    )
}

export default Header