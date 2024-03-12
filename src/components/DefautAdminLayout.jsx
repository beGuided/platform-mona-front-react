import { useEffect,React, useState } from "react";
import {Link, Outlet, Navigate} from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

export default function DefaultAdminLayouth(){
const {user, token, notification, setUser,setToken}  = useStateContext();
   

useEffect(() => {
    async function fetchUser() {
        try {
            const response = await axiosClient.get('/user'); 
            const data = await response
            setUser(data.data);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }
    fetchUser();
},[]);

if(!token){
    return <Navigate to="/login" />
}
if(user.role ==='student'){
    return <Navigate to="/student-dashboard" />
}

const onLogout = (ev) =>{
    ev.preventDefault()

    axiosClient.post('/logout')
    .then(() =>{
        setUser({})
        setToken(null)
    })
}


 
return (
        <div id="defaultLayout" >
            <aside>

                <h3>Admin</h3>
               <div>
               <Link to="/dashboard">Dashboard</Link> 
               <Link to="/admin-profile">Profile</Link> 
               <Link to="/dashboard">Dashboard</Link> 
                </div> 
           
             {/* links for only Admin  start*/}
            {user.role === 'admin' && (
                <div>
                <Link to="/staffs">Manage Staff</Link> 
                <Link to="/students">Manage Student</Link> 
                </div>
            )}
            {/* end */}
                
            {user.role === 'staff' && (
                <div>
              <Link to={'/users/'+user.id}>Edit Profile</Link> 
              
                </div>
            )}
             
              
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
                       {user.name}
                       <a href="#" onClick={onLogout} className="btn-logout">Logout</a> 
                    </div>
                </header>
                
                <Outlet />
            </div>
        
        </div>
      )
    }