import {useEffect, useState} from "react";
import axiosClient from "../../../axios-client.js";
import { Link } from "react-router-dom";
// import {useStateContext} from "../context/ContextProvider.jsx";



export default function Staff(){

const [staffs, setStaffs] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null)


const fetchStaffs = () => {
  setLoading(true)
  axiosClient.get('/users') 
  .then(({data}) => {
    setLoading(false)
    setStaffs(data.User);
  })
  .catch(() => {
    setLoading(false)
  })
  
}
useEffect(() =>{
  fetchStaffs()
},[])

const onDelete = (staff) => {
  if(!window.confirm("Are you sure you want to delete this User?")){
      return
  }else{
    axiosClient.delete(`/users/${staff.id}`)
    .then(() =>{
        //TODO Show notification
        fetchStaffs()
    })
    .catch( err =>{
      const response = err.response
      if(response){
        setError(response.data.message )
      }
  })
  }

}
    return (
        <div>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <h1>Manage Staff</h1>
            <Link to="/add-staff" className="btn-add"> Add new</Link>
          </div>
          {error &&  <div className="alert">    
             <p >{error}</p>
              </div>}
          <div className="card animated fadeInDown">
            <table>
              <thead>
                <tr>
                  <th> ID</th>
                  <th> Name</th>
                  <th> Staff ID</th>
                  <th> Role</th>
                  <th> Departmrnt</th>
                  <th> Email </th>
                
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

              
             {staffs ? (
                <tbody>
                  
                {staffs.map(staff => (
                  
                  <tr key={staff.id}>
                     <td>{staff.id}</td>
                    <td>{staff.name}</td>
                    <td>{staff.staff_id}</td>
                    <td>{staff.role}</td>
                    <td>{staff.email}</td>
                    <td>
                      <Link className="btn-edit" to={'/edit-student/'+staff.id}>Edit</Link> &nbsp;&nbsp;
                      <button className="btn-delete" onClick={ () => onDelete(staff)} > Delete</button>
                    </td>
                  </tr>

                ))}
              </tbody>
              ) : (<h3>No student created</h3>
                )}

                

            </table>

          </div>
        </div>
      )
    }
