import {useEffect, useState} from "react";
import axiosClient from "../../../axios-client.js";
import { Link } from "react-router-dom";
// import {useStateContext} from "../context/ContextProvider.jsx";



export default function Student(){

const [semesters, setSemester] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null)



const fetchsemester = () => {
  setLoading(true)
  axiosClient.get('/semesters') 
  .then(({data}) => {
    setLoading(false)
    setSemester(data);
  })
  .catch(() => {
    setLoading(false)
  })
  
}
useEffect(() =>{
  fetchsemester()
},[])

const onDelete = (semester) => {
  if(!window.confirm("Are you sure you want to delete this semester?")){
      return
  }else{
    axiosClient.delete(`/semester/${semester.id}`)
    .then(() =>{
        //TODO Show notification
        fetchsemester()
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
            <Link to="/add-semester" className="btn-add"> Add new</Link>
          </div>

          {error &&  <div className="alert">    
             <p >{error}</p>
              </div>}
          <div className="card animated fadeInDown">
            <table>
              <thead>
                <tr>
                  <th> ID</th>
                  <th> title</th>
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

              
             {semesters ? (
                <tbody>
                  
                {semesters.map(semester => (
                  
                  <tr key={semester.id}>
                    <td>{semester.id}</td>
                    <td>{semester.title}</td>
                    <td>
                      <Link className="btn-edit" to={'/semesters/'+semester.id}>Edit</Link> &nbsp;&nbsp;
                      <button className="btn-delete" onClick={ () => onDelete(semester)} > Delete</button>
                    </td>
                  </tr>

                ))}
              </tbody>
              ) : (<h3>No semester created</h3>
                )}

                

            </table>

          </div>
        </div>
      )
    }
