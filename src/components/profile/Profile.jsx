import { useStateContext } from "../../contexts/ContextProvider";
import {Link} from "react-router-dom"
import axiosClient from "../../axios-client";
import { useEffect,React, useState } from "react";


export default function userProfile(props){
  const {user,setUser}  = useStateContext();
  const {editProfile} = props
// if(user.id){
//   useEffect(() => {
//     axiosClient.get(`/student-profiles/${user.id}`)
//     .then(({data}) => {
//       if(data){
//         setEditProfile('Edit')
//       }
     
//   }).catch(err =>{
//     console.log(err)
//   })
// },[])
// }
  
    return (
        < div className=''>
          <div>
            <h1>Welcome {user.name}</h1>
           <h4 className="message">Role:{user.role}</h4>

          </div>
           <div className="profile-container">
           <div className="card">
              <img src="./assets/avater.jpg" alt="image" height={200} width={200}/>
              <h1 className='title'>{user.name}</h1>
              <p className='message'>{user.user_name}</p>
              <hr></hr>
              <p className='message'>{user.email}</p>

              <p className="message">{user.phone_number}</p><br></br>
              
              <h4>Sport Interest:</h4>
              <ul>
                <li>{user.interest}</li>
              </ul>
        {/* 
             <ul>
              {user.sports.map(sport=>(
                <li key={sport.id}>{sport.name}</li>
              ))}
              </ul> */}
              {/* <div style="margin: 24px 0;"> */}
              <div>
                <a href="#"><i className="fa fa-dribbble"></i></a> 
                <a href="#"><i className="fa fa-twitter"></i></a>  
                <a href="#"><i className="fa fa-linkedin"></i></a>  
                <a href="#"><i className="fa fa-facebook"></i></a> 
              </div><br></br>
              {/* {user.profile ?(
              <Link className="btn-edit" to={'/edit-profiles/'+user.id}>Edit</Link>):(
                <>
                  <Link className="btn-edit" to={createLink}>Create profile </Link>
                <Link className="btn-edut" to={'/create-profile'}>create</Link>
              </>
            
              )}
              */}
              <Link className="btn-edit" to={'/update-profile/'+user.id}>Edit</Link>
                
                  <Link className="btn-edit" to={editProfile}>Create profile </Link>
                {/* <Link className="btn-edut" to={'/create-profile'}>create</Link> */}
            
              {/* <span className="btn-edit" to={'/users/'+user.id}>Edit Profile</span> &nbsp; */}

            
            </div>

           </div>
          
        </div>
      )
    }