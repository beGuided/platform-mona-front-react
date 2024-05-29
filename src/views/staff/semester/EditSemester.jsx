
import {useEffect, useState} from "react";
import axiosClient from "../../../axios-client.js";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider.jsx";


export default function EditSemestersForm(){
  const {id} = useParams()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const {notification, setNotification} = useStateContext()

  const [semester, setSemester] = useState({
    // id:null,
    title:'',
       
  })

  if(id){
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/semesters/${id}`)
      .then(({data}) => {
        setLoading(false)
        setSemester(data)
    }).catch(err =>{
      console.log(err)
      setLoading(false)
    })
  },[])
  }

  const onSubmit = (ev)=>{
    // console.log(student)
    ev.preventDefault();
      if(semester.id){
        setErrors(null)
        axiosClient.post(`/semesters/${id}`, semester)
        .then(() =>{
          setNotification('semester was successful updated!')
          navigate('/semesters')
        })
          .catch(err =>{
            const response = err.response;
            if(response && response.status === 422){
              setErrors(response.data.errors)
            }
          })
      }
      else{
        axiosClient.post(`/semesters`, semester)
        .then(() =>{
          setErrors(null)
          setNotification('semester was created !')
          navigate('/semesters')
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
                   {semester.id && <h2>Update semester</h2>}
                   {!semester.id && <h2>New semester</h2>}
                  <label>semester Name </label>
                  <input type='text'value={semester.title} onChange={ev => setSemester({...semester, title: ev.target.value})} placeholder="semester title"/>
                  <button classtitle="btn">Save</button>
                </form>
                </div>
              }
          </div>
        </>
      )
    }
