
import {useEffect, useState} from "react";
import axiosClient from "../../../axios-client.js";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider.jsx";


export default function EditCoursesForm(){
  const {id} = useParams()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const {notification, setNotification} = useStateContext()

  const [course, setCourse] = useState({
    // id:null,
    title:'',
    code:'',
    unit:'',
    level:'',
    semester:'',
       
  })

  if(id){
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/courses/${id}`)
      .then(({data}) => {
        setLoading(false)
        setCourse(data.Course)
    }).catch(err =>{
      console.log(err)
      setLoading(false)
    })
  },[])
  }

  const onSubmit = (ev)=>{
    // console.log(student)
    ev.preventDefault();
      if(course.id){
        setErrors(null)
        axiosClient.post(`/courses/${id}`, course)
        .then(() =>{
          setNotification('course was successful updated!')
          navigate('/courses')
        })
          .catch(err =>{
            const response = err.response;
            if(response && response.status === 422){
              setErrors(response.data.errors)
            }
          })
      }
      else{
        axiosClient.post(`/courses`, course)
        .then(() =>{
          setErrors(null)
          setNotification('course was created !')
          navigate('/courses')
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
                   {course.id && <h2>Update course</h2>}
                   {!course.id && <h2>New course</h2>}
                  <label>Course Name </label>
                  <input type='text'value={course.title} onChange={ev => setCourse({...course, title: ev.target.value})} placeholder="course title"/>
                  <label>Course Code </label>
                  <input type='text'value={course.code} onChange={ev => setCourse({...course, code: ev.target.value})} placeholder="course code"/>
                  <label>Course Unit </label>
                  <input type='text'value={course.unit} onChange={ev => setCourse({...course, unit: ev.target.value})} placeholder="course unit"/>
                  <label>Course Level </label>
                  <input type='text'value={course.level} onChange={ev => setCourse({...course, level: ev.target.value})} placeholder="course level"/>
                  <label>Course Semester </label>
                  <input type='text'value={course.semester} onChange={ev => setCourse({...course, semester: ev.target.value})} placeholder="course semester"/>
                  <button className="btn">Save</button>
                </form>
                </div>
              }
          </div>
        </>
      )
    }
