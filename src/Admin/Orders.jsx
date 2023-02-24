import { useSelector } from 'react-redux'
import {useEffect , useState} from 'react'
import { Container, Row , Table } from 'reactstrap'
import '../Styles/tableStyle.css'
import { useOrder } from '../hooks/useOrder'
import Dialog from '../components/Dialog/Dialog'
import Helmet from '../components/Helmet/Helmet'


const Orders = () => {

  const [ dialog , setDilaog ] = useState( { 
    message:'',
    isLoading:false,
    name:''
  })
  const orders = useSelector(state=>state.orders.orders)
   const {fetchOrders , deleteOrder , deleteFullOrder} = useOrder()


   useEffect(() => {
    fetchOrders()
   }, [])

   const handleDelete = (productId,productName,orderId) => {
    setDilaog({
      message:'Are You Sure You Want To Delete The Order of',
      isLoading:true,
      name : productName,
      id: productId,
      orderId:orderId
    })
  }
   const handleDeleteFullOrder = (orderId) => {
    deleteFullOrder(orderId)
  
  }

  const isProdDelete = (choose) => {
 
    if (choose) {
      deleteOrder(dialog.orderId,dialog.id)
      setDilaog({
        message:'',
        isLoading:false
      })
    } else {
      setDilaog({
        message:'',
        isLoading:false
      })
    }
  };
    
  return (
    <Helmet title={'Orders'}>
    <section>
        <Container>
            <Row className='table-responsive'>
           {orders.length === 0 ? (<h2 style={{padding: "60px 0 "}}>There are no orders </h2>):
           (
            <Table striped>
            <thead>
              <tr>
                <td>#</td>
                <td>Name</td>
                <td>email</td>
                <td>address</td>
                <td>phone</td>
                <td>Items</td>
                <td>total amount</td>
                <td>Delete</td>
              </tr>
            </thead>
            <tbody>
             {orders.map((order,index) => (
                 <tr key={index}>
                 <th scope="row">{index +1 }</th>
                 <td>{order.name}</td>
                 <td>{order.email}</td>
                 <td>{order.address}</td>
                 <td>{order.phone}</td>
                 <td>{order.cartItem.map((item,index)=>(
                    
                    <tr className='subTable' key={index}>
                        
                        <td>{item.id}</td>
                        <td>{item.productName}</td>
                        <td>{item.price}$</td>
                        <td>x{item.quantity}</td>
                        <td>{item.totalPrice}$</td>
                        <td>
                 <i onClick={() => handleDelete(item.id,item.productName,order._id)} 
                     className="ri-delete-bin-5-line"></i>
                 </td>
                         </tr>
                    
                 ))}
    
                 </td>
                 <td>{order.totalAmount}</td>
                  <td>
                 <i onClick={() => handleDeleteFullOrder(order._id)} 
                     className="ri-delete-bin-5-line"></i>
                 </td>
                
               </tr>
             ))}
            </tbody>
          </Table>
           ) }
            </Row>
        </Container>


        
        { 
        dialog.isLoading && 
        <Dialog 
        message={dialog.message}
        onDialog={isProdDelete}
        name = {dialog.name}
        
        />
        }
    </section>
    </Helmet>
  )
}

export default Orders