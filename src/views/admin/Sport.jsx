import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import { Link } from "react-router-dom";
// import {useStateContext} from "../context/ContextProvider.jsx";



export default function Sports(){
  

const [sports, setSports] = useState([]);
const [loading, setLoading] = useState(false);


useEffect(() =>{
  getsports();
},[])

const onDelete = (sport) => {
  if(!window.confirm("Are you sure you want to delete this sport?")){
      return
  }else{
    axiosClient.delete(`/sports/${sport.id}`)
    .then(() =>{
        //TODO Show notification
        getsports()
    })
  }

}

const getsports = () => {
  setLoading(true)
  axiosClient.get('/sports') 
  .then(({data}) => {
    setLoading(false)
   setSports(data.sports);
  })
  .catch(() => {
    setLoading(false)
  })
  
}

    return (
        <div>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <h1>Sports</h1>
            <Link to="/sports/new" className="btn-add"> Add new</Link>
          </div>
          <div className="card animated fadeInDown">
            <table>
              <thead>
                <tr>
                  <th> ID</th>
                  <th> Name</th>
                  <th> Actions</th>
                
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

              
             {sports ? (
                <tbody>
                  
                {sports.map(sport => (
                  
                  <tr key={sport.id}>
                    <td>{sport.id}</td>
                    <td>{sport.name}</td>
                    <td>
                      <Link className="btn-edit" to={'/sports/'+sport.id}>Edit</Link> &nbsp;&nbsp;
                      <button className="btn-delete" onClick={ ev => onDelete(sport)} > Delete</button>
                    </td>
                  </tr>

                ))}
              </tbody>
              ) : (<h3>No Sport created</h3>
                )}

                

            </table>

          </div>
        </div>
      )
    }
