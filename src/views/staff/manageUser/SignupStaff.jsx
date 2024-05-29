
import {useEffect, useState} from "react";
import axiosClient from "../../../axios-client.js";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider.jsx";


export default function EditStaffForm(){
  const {id} = useParams()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const {notification, setNotification} = useStateContext()

  const [staff, setStaff] = useState({
    // id:null,
    name:'',
    staff_id:'',
    role: '',
    email: '',
    Password: '',
   
  })

  if(id){
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/students/${id}`)
      .then(({data}) => {
        setLoading(false)
        setStudent(data.student)
    }).catch(err =>{
      console.log(err)
      setLoading(false)
    })
  },[])
  }

  const onSubmit = (ev)=>{
    // console.log(student)
    ev.preventDefault();
      if(student.id){
        setErrors(null)
        axiosClient.post(`/students/${id}`, student)
        .then(() =>{
          setNotification('student was successful updated!')
          navigate('/students')
        })
          .catch(err =>{
            const response = err.response;
            if(response && response.status === 422){
              setErrors(response.data.errors)
            }
          })
      }
      else{
        axiosClient.post(`/students`, student)
        .then(() =>{
          setErrors(null)
          setNotification('student was created !')
          navigate('/students')
        })
          .catch(err =>{
            console.log(err)
            const response = err.response;
            if(response && response.status === 422){
              setErrors(response.data.errors)
            }
            if(response){
              setError(response.message)
            }
          })
      }
  }
        return (

        <>
         
          <div className="login-signup-form animated fadeInDown">
            { loading && (
              <div className="text-center">Loading...</div>
               )}
              {errors && 
              <div className="alert">    
              {Object.keys(errors).map(key => (
                  <p key={key}>{errors[key][0]}</p>
              ))}
              </div>}
              {error && 
              <div className="alert">    
                  <p >{error}</p>
              </div>}

              {notification && 
                <div className="alert">
                    <p>{notification}</p>
                </div>}
              {!loading &&
              <div className="form">
                <form onSubmit={onSubmit}>
                   {staff.id && <h2>Update Staff</h2>}
                   {!staff.id && <h2>New Staff</h2>}
                  <label>Full Name </label>
                  <input type='text'value={staff.name} onChange={ev => setStaff({...staff, name: ev.target.value})} placeholder="Full Name"/>
                  <label>Staff id</label>
                  <input type='text'value={staff.staff_id} onChange={ev => setStaff({...staff, staff_id: ev.target.value})} placeholder="Staff is"/>
                  <label>Role</label>
                  <input type='text'value={staff.role} onChange={ev => setStaff({...staff, role: ev.target.value})} placeholder="Role"/>
                  <label>Email</label>
                  <input type='email'value={staff.email} onChange={ev => setStaff({...staff, email: ev.target.value})} placeholder="Email"/>
                  <label>password </label>
                  <input type='password'value={staff.password} onChange={ev => setStaff({...staff, password: ev.target.value})} placeholder="Password "/>
 
                  <button className="btn">Save</button>
                </form>
                </div>
              }
          </div>
        </>
      )
    }
