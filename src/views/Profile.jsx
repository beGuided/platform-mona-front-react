import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx";


export default function UpdateStudentProfile(){
  const {id} = useParams()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const {notification, setNotification} = useStateContext()

  const [profile, setProfile] = useState({
    // id:null,
    gender:'',
    address:'',
    phone_number: '',
    date_of_birth: '',
    level: '',
    email: '',
    department_id:'',
    state_of_origin: '',
  })

  if(id){
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/student-profiles/${id}`)
      .then(({data}) => {
        setLoading(false)
        setProfile(data.Profile)
    }).catch(err =>{
      console.log(err)
      setLoading(false)
    })
  },[])
  }

  const onSubmit = (ev)=>{
    // console.log(profile)
    ev.preventDefault();
      if(profile.id){
        setErrors(null)
        axiosClient.patch(`/profiles/${id}`, profile)
        .then(() =>{
          setNotification('profile was successful updated!')
          navigate('/admin-profile')
        })
          .catch(err =>{
            const response = err.response;
            if(response && response.status === 422){
              setErrors(response.data.errors)
            }
            if(response){
              setError(response.message)
            }
          })
      }
      else{
        axiosClient.post(`/profiles`, profile)
        .then(() =>{
          setErrors(null)
          setNotification('profile was created !')
          navigate('/admin-profile')
        })
          .catch(err =>{
            console.log(err)
            const response = err.response;
            if(response ){
              setError(response.message)
            }
          })
      }
  }
        return (

        <>
            {profile.id && <h2>Update profile:{profile.email}</h2>}
            {!profile.id && <h2>Create User profile</h2>}
          <div className="card animated fadeInDown">
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
              
                <form onSubmit={onSubmit}>
                   {/* {profile.id && <h2>Update user profile </h2>} */}
                   {/* {!profile.id && <h2>Create User profile</h2>} */}
                  <label>Gender </label>
                  <input type='text'value={profile.gender} onChange={ev => setProfile({...profile, gender: ev.target.value})} placeholder="Gender"/>
                  <label>Address</label>
                  <input type='text'value={profile.address} onChange={ev => setProfile({...profile, address: ev.target.value})} placeholder="Address"/>
                  <label>Phone Number</label>
                  <input type='text'value={profile.phone_number} onChange={ev => setProfile({...profile, phone_number: ev.target.value})} placeholder="Phone Number"/>
                  <label>Date of Birth </label>
                  <input type='text'value={profile.date_of_birth} onChange={ev => setProfile({...profile, date_of_birth: ev.target.value})} placeholder="Date of Birth "/>
                  <label>Level</label>
                  <input type='text'value={profile.level} onChange={ev => setProfile({...profile, level: ev.target.value})} placeholder="Level"/>
                  <label>Email</label>
                  <input type='email'value={profile.email} onChange={ev => setProfile({...profile, email: ev.target.value})} placeholder="Email"/>
                  <label>Department</label>
                  <input type='text'value={profile.department_id} onChange={ev => setProfile({...profile, department_id: ev.target.value})} placeholder="Department"/>
                  <label>State of Origin</label>
                  <input type='text'value={profile.state_of_origin} onChange={ev => setProfile({...profile, state_of_origin: ev.target.value})} placeholder="State of Origin"/>  
                  <button className="btn">Save</button>
                </form>
              }
          </div>
        </>
      )
    }
