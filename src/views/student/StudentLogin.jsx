import { Link, useNavigate} from "react-router-dom"
import {useRef, useEffect, useState} from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";


export default function Login(){

  const matNumberRef = useRef()
  const passwordRef = useRef()
  const{ user,setUser, setToken, } = useStateContext()
  const [errors, setErrors] = useState(null)
  const [notificationError, setError] = useState(null)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

    const onSubmit = (ev) => {
        ev.preventDefault()

        const payload = {
          matric_number:matNumberRef.current.value,
           password:passwordRef.current.value,
       }
          // setErrors(null)
          setError(null)
          setLoading(true);
           axiosClient.post('/login-student', payload)
           .then(({data})  =>{
              if(data){
                setLoading(false);
                setUser(data.user)
                setToken(data.token)
               navigate('/student-dashboard')
              }
           }) 
           .catch(err => {
            setLoading(false);
              // console.log(err)
               const response = err.response;
               if(response && response.status ){
                  setError(response.data.message);
               } 
               else{
              setError('Network error')
             }
           })
    }
    return (
      <>
    
    {loading && (
      <div className="login-signup-form animated fadeInDown">
        <p className="text-center">Loading...</p>
      </div>
    )};

      {!loading && (

<div className="login-signup-form animated fadeInDown">

<div className="form">
  <form onSubmit={onSubmit}>
      <h1 className="title">
          Login into your account (student)
      </h1>
      
      {errors && 
      <div className="alert">
      {Object.keys(errors).map(key => (
          <p key={key}>{errors[key][0]}</p>
      ))}
      </div>}
      {notificationError && 
      <div className="alert">
          <p>{notificationError}</p>
      </div>}

  <input ref={matNumberRef} type="matNumber"  placeholder="matNumber"/>
  <input  ref={passwordRef} type="password"  placeholder="password"/>
  <p className="">forgot password? <Link to="/password-reset">Reset here</Link></p>
  <button className="btn btn-block" > Login</button> 
  {/* <p className="message">
      Not Registered? <Link to="/signup"> Create an account</Link>
  </p> */}
  </form>
</div>
</div>
      )}


        </>
      )
    }
