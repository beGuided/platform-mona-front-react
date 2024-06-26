
import {useEffect, useState} from "react";
import axiosClient from "../../../axios-client.js";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider.jsx";


export default function EditdepartmentsForm(){
  const {id} = useParams()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const {notification, setNotification} = useStateContext()

  const [department, setDepartment] = useState({
    // id:null,
    name:'',
    max_level:'',
   
  })

  if(id){
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/departments/${id}`)
      .then(({data}) => {
        setLoading(false)
        setDepartment(data.Department)
    }).catch(err =>{
      console.log(err)
      setLoading(false)
    })
  },[])
  }

  const onSubmit = (ev)=>{
    // console.log(student)
    ev.preventDefault();
      if(department.id){
        setErrors(null)
        axiosClient.post(`/departments/${id}`, department)
        .then(() =>{
          setNotification('department was successful updated!')
          navigate('/departments')
        })
          .catch(err =>{
            const response = err.response;
            if(response && response.status === 422){
              setErrors(response.data.errors)
            }
          })
      }
      else{
        axiosClient.post(`/departments`, department)
        .then(() =>{
          setErrors(null)
          setNotification('department was created !')
          navigate('/departments')
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
                   {department.id && <h2>Update department</h2>}
                   {!department.id && <h2>New department</h2>}
                  <label>Department Name </label>
                  <input type='text'value={department.name} onChange={ev => setDepartment({...department, name: ev.target.value})} placeholder="Department Name"/>
                  <label>Max_level</label>
                  <input type='text'value={department.max_level} onChange={ev => setDepartment({...department, max_level: ev.target.value})} placeholder="Max Level"/>
                  <button className="btn">Save</button>
                </form>
                </div>
              }
          </div>
        </>
      )
    }
