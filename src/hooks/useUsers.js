import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { redirect, useNavigate } from 'react-router-dom';
import { getAllUsers } from '../redux/slices/userSlice';
import  {loggingin} from '../redux/slices/userSlice'

import { toast } from 'react-toastify'
export const useUsers =  () => {

    const dispatch = useDispatch()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()


    //edit personal info
    const editPersonalInfo = async (_id,name,email,password) => {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch(`https://mern-benemart-api.onrender.com/api/user/${_id}`,{
        method:'PUT',
        headers: {'Content-Type': 'application/json'},
        body : JSON.stringify({name,email,password})
      })
        const json = await response.json()
        console.log(json);
        if(!response.ok) { 
          setIsLoading(false)
          setError(json.error)
           toast.error(json.error)
            
      }
      if(response.ok) {
          setError(null)
          dispatch(loggingin(json.user))
          navigate('/profile')
          toast.info(`Your Data Is Updated`)   
          setIsLoading(false)
      }
    }

    //Admin control to get all user
    const getUsers = async () =>{

        const response = await fetch('https://mern-benemart-api.onrender.com/api/user/')
        const users = await response.json()
       
            dispatch(getAllUsers(users))
            
    }


    // Admin Control to delete specific user
    const deleteUser = async (id) => {
      const response = await fetch(`https://mern-benemart-api.onrender.com/api/user/${id}`, {
        method: 'DELETE',
      })
      const users = await response.json()
     
          dispatch(getAllUsers(users))
    }
  return {isLoading , error, getUsers , editPersonalInfo,deleteUser}
}

