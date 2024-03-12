import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import { Link } from "react-router-dom";
// import {useStateContext} from "../context/ContextProvider.jsx";



export default function Staff(){

const [staff, setStaff] = useState([]);
const [loading, setLoading] = useState(false);


const fetchStudent = () => {
  setLoading(true)
  axiosClient.get('/user') 
  .then(({data}) => {
    setLoading(false)
    setStaff(data.user);
  })
  .catch(() => {
    setLoading(false)
  })
  
}
useEffect(() =>{
  fetchStudent()
},[])

const onDelete = (staff) => {
  if(!window.confirm("Are you sure you want to delete this staff?")){
      return
  }else{
    axiosClient.delete(`/user/${staff.id}`)
    .then(() =>{
        //TODO Show notification
        fetchStudent()
    })
  }

}
    return (
        <div>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <h1>Student</h1>
            <Link to="/add-staff" className="btn-add"> Add new</Link>
          </div>
          <div className="card animated fadeInDown">
            <table>
              <thead>
                <tr>
                  <th> ID</th>
                  <th> First Name</th>
                  <th> Last Name</th>
                  <th> Mat Number</th>
                  <th> Role </th>
                  <th> Payment Status </th>
                
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

              
             {staff ? (
                <tbody>
                  
                {staff.map(staff => (
                  
                  <tr key={staff.id}>
                    <td>{staff.id}</td>
                    <td>{staff.first_name}</td>
                    <td>{staff.last_name}</td>
                    <td>{staff.matric_number}</td>
                    <td>{staff.role}</td>
                    <td>{staff.status}</td>
                    <td>
                      <Link className="btn-edit" to={'/add-staff/'+staff.id}>Edit</Link> &nbsp;&nbsp;
                      <button className="btn-delete" onClick={ () => onDelete(staff)} > Delete</button>
                    </td>
                  </tr>

                ))}
              </tbody>
              ) : (<h3>No staff created</h3>
                )}

                

            </table>

          </div>
        </div>
      )
    }
