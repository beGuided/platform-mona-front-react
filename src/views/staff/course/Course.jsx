import {useEffect, useState} from "react";
import axiosClient from "../../../axios-client.js";
import { Link } from "react-router-dom";
// import {useStateContext} from "../context/ContextProvider.jsx";



export default function Student(){

const [courses, setCourse] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null)



const fetchCourse = () => {
  setLoading(true)
  axiosClient.get('/courses') 
  .then(({data}) => {
    setLoading(false)
    setCourse(data.Course);
  })
  .catch(() => {
    setLoading(false)
  })
  
}
useEffect(() =>{
  fetchCourse()
},[])

const onDelete = (course) => {
  if(!window.confirm("Are you sure you want to delete this course?")){
      return
  }else{
    axiosClient.delete(`/course/${course.id}`)
    .then(() =>{
        //TODO Show notification
        fetchCourse()
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
            <Link to="/add-course" className="btn-add"> Add new</Link>
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
                  <th> code</th>
                  <th> unit</th>
                  <th> level</th>
                  <th> semester</th>
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

              
             {courses ? (
                <tbody>
                  
                {courses.map(course => (
                  
                  <tr key={course.id}>
                    <td>{course.id}</td>
                    <td>{course.title}</td>
                    <td>{course.code}</td>
                    <td>{course.unit}</td>
                    <td>{course.level}</td>
                    <td>{course.semester}</td>
                    <td>
                      <Link className="btn-edit" to={'/courses/'+course.id}>Edit</Link> &nbsp;&nbsp;
                      <button className="btn-delete" onClick={ () => onDelete(course)} > Delete</button>
                    </td>
                  </tr>

                ))}
              </tbody>
              ) : (<h3>No course created</h3>
                )}

                

            </table>

          </div>
        </div>
      )
    }
