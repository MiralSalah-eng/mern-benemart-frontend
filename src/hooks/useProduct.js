import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getProducts } from '../redux/slices/productSlice'
import { toast } from 'react-toastify'


export const useProduct = () => {
    const dispatch = useDispatch()

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()


    const addProduct = async (formData) => {

    
        const response = await fetch('https://mern-benemart-api.onrender.com/api/products/add' , {
            method: 'POST',
            body:formData

        })

        const json = await response.json()
        
        if(response.ok){
            toast.success('Product added successfully')
            navigate('/dashboard/all-producs')
        }
    
        if(!response.ok) { 
            toast.error(json.error)

        }
    }   

    const fetchProducts = async () => {


        fetch('https://mern-benemart-api.onrender.com/api/products/all-producs')
        .then(data => {
            return data.json();
            })
            .then(products => {
            dispatch(getProducts(products))
            });
        
    }

    const deleteProduct = async (id) => {
        const response = await fetch(`https://mern-benemart-api.onrender.com/api/products/${id}` , {
            method: 'DELETE',
        })

        const json = await response.json()
        
        if(response.ok){
            toast.success('Product deleted successfully')
        }
    
        if(!response.ok) { 
            toast.error(json.error)

        }
    }   


  return {addProduct , fetchProducts,deleteProduct}
}



