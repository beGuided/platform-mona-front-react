import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import { Link } from "react-router-dom";
//import {useStateContext} from "../context/ContextProvider.jsx";



export default function Users(){

const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(false);


useEffect(() =>{
  getUsers();
},[])

const onDelete = (user) => {
  if(!window.confirm("Are you sure you want to delete this user?")){
      return
  }else{
    axiosClient.delete(`/users/${user.id}`)
    .then(() =>{
        //TODO Show notification
        getUsers()
    })
  }

}

const getUsers = () => {
  setLoading(true)
  axiosClient.get('/users') 
  .then(({data}) => {
    setLoading(false)
   setUsers(data.user);
  })
  .catch(() => {
    setLoading(false)
  })
  
}

    return (
        <div>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <h1>Users</h1>
            {/* <Link to="sport/new" className="btn-add"> Add new</Link> */}
          </div>
          <div className="card animated fadeInDown">
            <table>
              <thead>
                <tr>
                  <th> ID</th>
                  <th> Name</th>
                  <th> User Name</th>
                  <th> F-Number</th>
                  <th> Email</th>
                  <th>Create Date</th>
                  <th>Acions</th>
                </tr>
              </thead>
              {loading && 
              <tbody>
                <tr>
                  <td colSpan="5" className="text-center"> 
                  Loading...
                  </td>
                </tr>
              </tbody>
              }

            {users ? (     
                <tbody>
                  
                {users.map(user => (
                  
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.user_name}</td>
                    <td>{user.phone_number}</td>
                    <td>{user.email}</td>
                    <td>{user.created_at}</td>
                    <td>
                      <Link className="btn-edit" to={'/all-users/'+user.id}>Edit</Link> &nbsp;&nbsp;
                      <button className="btn-delete" onClick={ ev => onDelete(user)} > Delete</button>
                    </td>
                  </tr>

                ))}
              </tbody>
              ) : (<tbody>
                <tr>
                  <td colSpan="5" className="text-center"> 
                  Loading...
                  </td>
                </tr>
              </tbody>
                )}
            </table>
          </div>
        </div>
      )
    }
