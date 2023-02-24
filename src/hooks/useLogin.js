import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import  {loggingin} from '../redux/slices/userSlice'

import { toast } from 'react-toastify'


export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const login = async (email,password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch ('https://mern-benemart-api.onrender.com/api/user/login' , {
            method : 'POST',
            headers: {'Content-Type': 'application/json'},
            body : JSON.stringify({email,password})
        })

        const json = await response.json()

        if(!response.ok) { 
            setIsLoading(false)
            setError(json.error)
             toast.error(json.error)
              
        }

        if(response.ok) {
            setError(null)

            localStorage.setItem('user',JSON.stringify(json.user))
            localStorage.setItem('token',JSON.stringify(json.token))

            dispatch(loggingin(json.user))
            
            navigate('/home')
            toast.info(`Welcome ${json.user.username}`)   

            setIsLoading(false)
        }
    }

    return { login , isLoading , error}
}