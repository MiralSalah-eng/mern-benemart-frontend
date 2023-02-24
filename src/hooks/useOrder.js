import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllOrders } from '../redux/slices/orderSlice'

import { toast } from 'react-toastify'


export const useOrder = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const dispatch = useDispatch()


    const putOrder = async (data) => {
        setIsLoading(true)
        setError(null)

        
        const response = await fetch ('https://mern-benemart-api.onrender.com/api/order/add' , {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body : JSON.stringify(data)
        })

        const json = await response.json()

        if(!response.ok) { 
            setError(json.error)
            setIsLoading(false) 
            toast.error(json.error) 

        }

        if(response.ok) {
            setError(null)            
            navigate('/shop')
            toast.info('Order Add Succesfully')   

            setIsLoading(false)
        }
    }


    const fetchOrders = async () => {


        fetch('https://mern-benemart-api.onrender.com/api/order/get')
        .then(data => {
            return data.json();
            })
            .then(orders => {
            dispatch(getAllOrders(orders))
            });
        
    }


    const deleteOrder = async (orderId,id) => {
        const response = await fetch(`https://mern-benemart-api.onrender.com/api/order/${orderId}/${id}`, {
          method: 'PUT',
        })
        const orders = await response.json()  
        dispatch(getAllOrders(orders))
    }

    const deleteFullOrder = async (orderId) => {
        const response = await fetch(`https://mern-benemart-api.onrender.com/api/order/${orderId}`, {
          method: 'DELETE',
        })
        const orders = await response.json()
        dispatch(getAllOrders(orders))
        }
    return { putOrder ,fetchOrders, deleteOrder ,deleteFullOrder,isLoading , error}
}