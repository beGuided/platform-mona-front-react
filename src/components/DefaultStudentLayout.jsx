import { useEffect,React, useState } from "react";
import {Link, Outlet, Navigate} from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";


export default function DefaultStudentLayouth(){
const {user, token, notification, setUser,setToken}  = useStateContext();
const [notificationError, setError] = useState(null)
   

useEffect(() => {
    const fetchUser = async ()=> {
        try {
            const response = await axiosClient.get('/user'); 
            const data = await response
            setUser(data.data);
        } catch (error) {
            const response = error.response;
             setError(response);
            console.error('Error fetching User:', error);
        }
   };
   fetchUser();
},[]);

if(!token){
    return <Navigate to="/student-login" />
}
if(user.role !=='student'){
    return <Navigate to="/dashboard" />
}

const onLogout = (ev) =>{
    ev.preventDefault()
    setUser({})
    setToken(null)
    return <Navigate to="/student-login" />
    //     setToken(null)
    // axiosClient.post('/logout')
    // .then(() =>{
    //     setUser({})
    //     setToken(null)
    // })
}
return (
        <div id="defaultLayout" >
 
            <aside>
            <h3>Student</h3>
               <div>
               <Link to="/dashboard">Dashboard</Link> 
               <Link to="/student-profile">Profile</Link> 
               <Link to="/all-fees">Payment Activities</Link>
               <Link to="/all-course">Register Course</Link> 
               <Link to="/all-result">Check Results</Link> 
               <Link to="/password">Change Password</Link> 
               
                </div> 
           
             {/* links for only Admin  start*/}
           
            {/* {user.role == 'admin' && (
                <div>
                <Link to="/users">Users</Link><br></br>
                <Link to="/sports">Sports</Link>
                </div>
            )} */}
            {/* end */}
                
            {/* {user.role === 'staff' && (
                <div>
              <Link to={'/users/'+user.id}>Edit Profile</Link> 
              
                </div>
            )} */}
             
              
            </aside>
            <div className="content">

                {notification &&
                <div className="notification">
                    {notification}
                </div>
                }
                <header>
                    <div>
                    <Link to="/home">Home</Link><br></br>
                    
                    </div>
                    <div>
                       {user.first_name}
                       <a href="#" onClick={onLogout} className="btn-logout">Logout</a> 
                    </div>
                </header>
                
                <Outlet />
            </div>
        
        </div>
      )
    }