import {useEffect, useState} from "react";
import axiosClient from "../../../axios-client.js";
import { Link } from "react-router-dom";
// import {useStateContext} from "../context/ContextProvider.jsx";



export default function Student(){

const [departments, setDepartments] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null)



const fetchDepartment = () => {
  setLoading(true)
  axiosClient.get('/departments') 
  .then(({data}) => {
    setLoading(false)
    setDepartments(data.Departments);
  })
  .catch(() => {
    setLoading(false)
  })
  
}
useEffect(() =>{
  fetchDepartment()
},[])

const onDelete = (department) => {
  if(!window.confirm("Are you sure you want to delete this department?")){
      return
  }else{
    axiosClient.delete(`/departments/${department.id}`)
    .then(() =>{
        //TODO Show notification
        fetchDepartment()
        setError(null )
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
            <h1>Student</h1>
            <Link to="/add-department" className="btn-add"> Add new</Link>
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
                  <th> Max Level</th>
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

              
             {departments ? (
                <tbody>
                  
                {departments.map(department => (
                  
                  <tr key={department.id}>
                    <td>{department.id}</td>
                    <td>{department.name}</td>
                    <td>{department.max_level}</td>
                    <td>
                      <Link className="btn-edit" to={'/departments/'+department.id}>Edit</Link> &nbsp;&nbsp;
                      <button className="btn-delete" onClick={ () => onDelete(department)} > Delete</button>
                    </td>
                  </tr>

                ))}
              </tbody>
              ) : (<h3>No Department created</h3>
                )}

                

            </table>

          </div>
        </div>
      )
    }
