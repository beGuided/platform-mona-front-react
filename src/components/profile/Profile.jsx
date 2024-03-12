import { useStateContext } from "../../contexts/ContextProvider";
import {Link} from "react-router-dom"


export default function userProfile(createLink){
  const {user,}  = useStateContext();
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
              {user.profile ?(
              <Link className="btn-edit" to={'/profiles/'+user.id}>Edit</Link>):(
                <Link className="btn-edit" to={{createLink}}>Create profile</Link>
              )}
             
              {/* <span className="btn-edit" to={'/users/'+user.id}>Edit Profile</span> &nbsp; */}

            
            </div>

           </div>
          
        </div>
      )
    }