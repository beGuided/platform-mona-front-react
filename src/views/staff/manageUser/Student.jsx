import {useEffect, useState} from "react";
import axiosClient from "../../../axios-client.js";
import { Link } from "react-router-dom";
// import {useStateContext} from "../context/ContextProvider.jsx";



export default function Student(){
const [students, setStudents] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null)


const fetchStudent = () => {
  setLoading(true)
  axiosClient.get('/students') 
  .then(({data}) => {
    setLoading(false)
    setStudents(data.student);
  })
  .catch(() => {
    setLoading(false)
  })
  
}
useEffect(() =>{
  fetchStudent()
},[])

const onDelete = (student) => {
  if(!window.confirm("Are you sure you want to delete this User?")){
      return
  }else{
    axiosClient.delete(`/students/${student.id}`)
    .then(() =>{
        //TODO Show notification
        fetchStudent()
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
            <h1>Manage Student</h1>
            <Link to="/add-student" className="btn-add"> Add new</Link>
          </div>
          {error &&  <div className="alert">    
             <p >{error}</p>
              </div>}
          <div className="card animated fadeInDown">
            <table>
              <thead>
                <tr>
                  <th> ID</th>
                  <th> First Name</th>
                  <th> Last Name</th>
                  <th> Mat Number</th>
                  <th> Role </th>
                  <th> Department </th>
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

              
             {students ? (
                <tbody>
                  
                {students.map(student => (
                  
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.first_name}</td>
                    <td>{student.last_name}</td>
                    <td>{student.matric_number}</td>
                    <td>{student.role}</td>
                    <td>{student.status}</td>
                    <td>
                      <Link className="btn-edit" to={'/edit-student/'+student.id}>Edit</Link> &nbsp;&nbsp;
                      <button className="btn-delete" onClick={ () => onDelete(student)} > Delete</button>
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
