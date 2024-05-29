import {useEffect, useState} from "react";
import axiosClient from "../../../axios-client.js";
import { Link } from "react-router-dom";
// import {useStateContext} from "../context/ContextProvider.jsx";



export default function Student(){

const [results, setResult] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null)



const fetchResult = () => {
  setLoading(true)
  axiosClient.get('/results') 
  .then(({data}) => {
    setLoading(false)
    setResult(data.results);
  })
  .catch(() => {
    setLoading(false)
  })
  
}
useEffect(() =>{
  fetchResult()
},[])

const onDelete = (result) => {
  if(!window.confirm("Are you sure you want to delete this result?")){
      return
  }else{
    axiosClient.delete(`/result/${result.id}`)
    .then(() =>{
        //TODO Show notification
        fetchResult()
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
            <Link to="/add-result" className="btn-add"> Filter </Link>
            <Link to="/add-result" className="btn-add"> Add new</Link>
          </div>

          {error &&  <div className="alert">    
             <p >{error}</p>
              </div>}
          <div className="card animated fadeInDown">
            <table>
              <thead>
                <tr>
                  <th> ID</th>
                  <th> name</th>
                  <th> mat num</th>
                  <th> semester</th>
                  <th> CA</th>
                  <th> exam</th>
                  <th> score</th>
                  <th> year</th>
                  <th> course id</th>
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

              
             {results ? (
                <tbody>
                  
                {results.map(result => (
                  
                  <tr key={result.id}>
                    <td>{result.id}</td>
                    <td>{result.name}</td>
                    <td>{result.matric_number}</td>
                    <td>{result.semester}</td>
                    <td>{result.CA}</td>
                    <td>{result.exam}</td>
                    <td>{result.score}</td>
                    <td>{result.year}</td>
                    <td>{result.course_id}</td>
                    <td>
                      <Link className="btn-edit" to={'/results/'+result.id}>Edit</Link> &nbsp;&nbsp;
                      <button className="btn-delete" onClick={ () => onDelete(result)} > Delete</button>
                    </td>
                  </tr>

                ))}
              </tbody>
              ) : (<h3>No result created</h3>
                )}

                

            </table>

          </div>
        </div>
      )
    }
