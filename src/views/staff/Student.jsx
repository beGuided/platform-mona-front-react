import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import { Link } from "react-router-dom";
// import {useStateContext} from "../context/ContextProvider.jsx";



export default function Student(){

const [students, setStudents] = useState([]);
const [loading, setLoading] = useState(false);


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
  if(!window.confirm("Are you sure you want to delete this sport?")){
      return
  }else{
    axiosClient.delete(`/students/${student.id}`)
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
            <Link to="/add-student" className="btn-add"> Add new</Link>
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
                      <Link className="btn-edit" to={'/add-student/'+student.id}>Edit</Link> &nbsp;&nbsp;
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
