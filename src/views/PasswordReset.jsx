import {useEffect,useRef, useState} from "react";
import axiosClient from "../axios-client.js";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx";


export default function SportForm(){
  const emailRef = useRef()
  // const passwordRef = useRef()
  // const passwordConfirmationRef = useRef();

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)
  const navigate = useNavigate()
  const [notification, setNotification] = useState('')

  
  const onSubmit = (ev) => {
    ev.preventDefault()

    const payload = {
        email:emailRef.current.value,
        // password:passwordRef.current.value,
        // password_confirmation:passwordConfirmationRef.current.value,
    }
    setErrors(null)

      setLoading(true)
      axiosClient.post(`/password/forgot-password`, payload)
        .then(({data}) => {
        setLoading(false)
        setNotification('we have emailed your password reset link')
        setTimeout(() => {
          navigate('/password/reset');
       }, 3000);
        })
        .catch((err)=>{
          setLoading(false)
          const response = err.response;
          if(response && response.status === 422){
            setErrors(response.data.errors)
          }
          
        })


  }

  return ( 
    <div className="login-signup-form animated fadeInDown">
      
        {loading &&
            <table>
              <tbody>
                  <tr>
                    <td colSpan="5" className="text-center"> 
                    Loading...
                    </td>
                  </tr>
                </tbody>
            </table>
           
        }
            {!loading &&
                <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">
                        Password Reset
                    </h1>
                    {errors && <div className="alert">
                      {Object.keys(errors).map(key => (
                          <p key={key}>{errors[key][0]}</p>
                      ))}
                      </div>}
                      {notification && (
                        <div className="notification">
                            {notification}
                        </div>
                          )}
                  <input required ref={ emailRef }type="email"  placeholder="Email Address"/>
                  {/* <input required ref={ passwordRef }type="password"  placeholder="New Password"/>
                  <input required ref={ passwordConfirmationRef }type="password"  placeholder=" Confirm Password"/> */}
                  <button className="btn btn-block" > Send</button> 
                </form>
                </div>
                }
  </div>
  )
    }
