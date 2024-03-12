import {Outlet,Navigate} from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";


export default function GuestAuthLayouth(){

    const {token,user} = useStateContext();
   
    if(token ){
      // if(user.role ==='student'){
      //   return <Navigate to='/student-dashboard' />
      // }
      // return <Navigate to='/dashboard' />
    }

    return (
        < div>
        
          <Outlet /> 
        </div>
      )
    }