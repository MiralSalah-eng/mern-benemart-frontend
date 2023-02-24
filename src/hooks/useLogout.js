import { useState } from 'react'
import { useDispatch } from 'react-redux'
import  {loggingout} from '../redux/slices/userSlice'
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify';


export const useLogout = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout = async () => {

        localStorage.removeItem('user')
        localStorage.removeItem('token')
        navigate('/home')
        toast.info('Logged out')  

        dispatch(loggingout())
        
    }

    return { logout}

}