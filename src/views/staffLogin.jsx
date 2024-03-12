import { Link, useNavigate} from "react-router-dom"
import {useRef, useEffect, useState} from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";


export default function Login(){
  const emailRef = useRef()
  const passwordRef = useRef()
  const{ user,setUser, setToken, } = useStateContext()
  const [errors, setErrors] = useState(null)
  const [notificationError, setError] = useState(null)
  const navigate = useNavigate();
 

    //   useEffect(() => {
    //     if (user && user.email_verified_at ==null) {
     // axiosClient.post('/logout')
    //      .then(() =>{
        // setUser({})
        // setToken(null)
        //   })
    //     }
    // }, [user]);

    const onSubmit = (ev) => {
        ev.preventDefault()

        const payload = {
           email:emailRef.current.value,
           password:passwordRef.current.value,
       }
          setErrors(null)
          setError(null)
           axiosClient.post('/login', payload)
           .then(({data})  =>{
              if(data.verified){
                setUser(data.user)
                setToken(data.token)
               navigate('/dashboard')
              }else{
                setError("Email not verified!")
                setUser(null)
                setToken(null)
              } 
              
           }) 
           .catch(err => {
              // console.log(err)
               const response = err.response;
               if(response && response.status === 422){
                  setErrors(response.data.errors);
               } 
               if(response && response.status === 402){
                setError('Please check your email for verification link');
                } 
               else{
              setError('Network error')
             }
           })
    }

    return (
        <div className="login-signup-form animated fadeInDown">

          <div className="form">
            <form onSubmit={onSubmit}>
                <h1 className="title">
                    Login into your account
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

            <input ref={emailRef} type="email"  placeholder="Email"/>
            <input  ref={passwordRef} type="password"  placeholder="password"/>
            <p className="">forgot password? <Link to="/password-reset">Reset here</Link></p>
            <button className="btn btn-block" > Login</button> 
            <p className="message">
                Not Registered? <Link to="/signup"> Create an account</Link>
            </p>
            </form>
          </div>
        </div>
      )
    }
