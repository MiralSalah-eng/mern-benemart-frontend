import {useUsers} from '../hooks/useUsers'
import { useSelector } from 'react-redux'
import { useEffect ,useState } from 'react'
import { Container, Row , Table } from 'reactstrap'
import '../Styles/tableStyle.css'
import Dialog from '../components/Dialog/Dialog'
import Helmet from '../components/Helmet/Helmet'

const Users = () => {

    const {getUsers , deleteUser} = useUsers()
    const users = useSelector(state  => state.user.users)
    const currentUser = useSelector(state  => state.user.user)
    const [ dialog , setDilaog ] = useState( { 
      message:'',
      isLoading:false,
      name:''
    })

    useEffect(() => {
        getUsers()
    }, [])

    const handleDelete = (username , userId) => {
      setDilaog({
        message:'Are You Sure You Want To Delete',
        isLoading:true,
        name : username,
        id: userId
      })
    }

    const areUSureDelete = (choose) => {
   
      if (choose) {
        deleteUser(dialog.id)
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
    <Helmet title={'Users List'}>
      <section>
        <Container className='px-5'>
            <Row className='table-responsive'>
            <Table striped>
        <thead>
          <tr>
            <td>#</td>
            <td>Image</td>
            <td>Name</td>
            <td>Email</td>
            <td>Actions</td>

          </tr>
        </thead>
        <tbody>
         {users.map((user,index) => (
             <tr key={index}>
             <th scope="row">{index +1 }</th>
             <td><img src={require(`../assets/images/${user.image}`)}/></td>
            {user.isAdmin 
             ? ( <td>{user.username} (Admin)</td> ) 
             : ( <td>{user.username}</td> ) }

             <td>{user.email}</td>

             {user.isAdmin  
             ? ( <td> </td> ) 
             : ( <td><i onClick={() => handleDelete(user.username , user._id)} 
                 className="ri-delete-bin-5-line"></i></td> ) }

           </tr>
         ))}
        </tbody>
      </Table>
            </Row>
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

export default Users