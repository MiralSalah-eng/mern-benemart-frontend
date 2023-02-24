import { useSelector } from 'react-redux'
import { useProduct } from '../hooks/useProduct'
import {useEffect , useState} from 'react'
import { Container, Row , Table } from 'reactstrap'
import '../Styles/tableStyle.css'
import Dialog from '../components/Dialog/Dialog'
import Helmet from '../components/Helmet/Helmet'

const AllProducts = () => {

  const products = useSelector( state => state.products.products )
   const { fetchProducts , deleteProduct } = useProduct()

   useEffect(() => {
    fetchProducts()
   },[])
   
   const [ dialog , setDilaog ] = useState( { 
    message:'',
    isLoading:false,
    name:''
  })

  const handleDelete = (productId,productName) => {
    setDilaog({
      message:'Are You Sure You Want To Delete',
      isLoading:true,
      name : productName,
      id: productId
    })
  }

  
  const areUSureDelete = (choose) => {
   
    if (choose) {
     deleteProduct(dialog.id)
     fetchProducts()

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
    <Helmet title={'All Products'}>
    <section>
        <Container>
        {products.length === 0 ? (<h2 style={{padding: "60px 0 "}}>There are no products </h2>):
           (
            <Row className='table-responsive'>
            <Table striped>
        <thead>
          <tr>
            <td>#</td>
            <td>Image</td>
            <td>Name</td>
            <td>Category</td>
            <td>Desc</td>
            <td>Price</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
         {products.map((product,index) => (
             <tr key={index}>
             <th scope="row">{index +1 }</th>
             <td><img src={require(`../assets/images/${product.imgUrl}`)}/></td>
             <td>{product.productName}</td>
             <td>{product.category}</td>
             <td>{product.shortDesc}</td>
             <td>${product.price}</td>
             <td><i onClick={() => handleDelete(product._id,product.productName)} 
                 className="ri-delete-bin-5-line"></i></td>
           </tr>
         ))}
        </tbody>
      </Table>
            </Row>
           )
         }
        </Container>

        { 
        dialog.isLoading && 
        <Dialog 
        message={dialog.message}
        onDialog={areUSureDelete}
        name = {dialog.name}
        
        />
        }

    </section>
    </Helmet>
  )
}

export default AllProducts