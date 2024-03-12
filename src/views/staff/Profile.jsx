import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import { Link } from "react-router-dom";
// import {useStateContext} from "../context/ContextProvider.jsx";



export default function Profile(){
  

const [profile, setProfile] = useState([]);
const [loading, setLoading] = useState(false);


useEffect(() =>{
 setLoading(true)
  axiosClient.get('/profiles/') 
  .then(({data}) => {
    setLoading(false)
    setProfile(data.profile);
  })
  .catch(() => {
    setLoading(false)
  })
},[])

// const onDelete = (sport) => {
//   if(!window.confirm("Are you sure you want to delete this sport?")){
//       return
//   }else{
//     axiosClient.delete(`/sports/${sport.id}`)
//     .then(() =>{
//         //TODO Show notification
//         getsports()
//     })
//   }

// }



    return (
        <div>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <h1>Sports</h1>
            <Link to="/sports/new" className="btn-add"> update profile</Link>
          </div>
          <div className="card animated fadeInDown">
          {loading && 
          <h2>Loading...</h2>
          }
            {profile ? (
            
            <table>
              <thead>
                <tr>
                  <th> ID</th>
                  <th> Name</th>
                  <th> Actions</th>
                
                </tr>
              </thead>
              {/* {loading &&
              <tbody>
                <tr>
                  <td colSpan="5" className="text-center"> 
                  Loading...
                  </td>
                </tr>
              </tbody>
              } */}

                <tbody>
                  <tr>
                    <td>{profile.id}</td>
                    <td>{profile.name}</td>
                    <td>
                      <Link className="btn-edit" to={'/profiles/'+profile.id}>Edit</Link> &nbsp;&nbsp;
                    </td>
                  </tr>
              </tbody>
              </table>
              ) : (<h3>No Profile created</h3>
                )}

                

          

          </div>
        </div>
      )
    }
