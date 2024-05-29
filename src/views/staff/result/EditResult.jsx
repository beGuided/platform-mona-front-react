
import {useEffect, useState} from "react";
import axiosClient from "../../../axios-client.js";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider.jsx";


export default function EditresultsForm(){
  const {id} = useParams()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const {notification, setNotification} = useStateContext()

  const [result, setResult] = useState({
    // id:null,
    email:'',
    matric_number:'',
    semester:'',
    score:'',
    year:'',
    course_id:'',
       
  })

  if(id){
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/results/${id}`)
      .then(({data}) => {
        setLoading(false)
        setResult(data.result)
    }).catch(err =>{
      console.log(err)
      setLoading(false)
    })
  },[])
  }

  const onSubmit = (ev)=>{
    // console.log(student)
    ev.preventDefault();
      if(result.id){
        setErrors(null)
        axiosClient.post(`/results/${id}`, result)
        .then(() =>{
          setNotification('result was successful updated!')
          navigate('/results')
        })
          .catch(err =>{
            const response = err.response;
            if(response && response.status === 422){
              setErrors(response.data.errors)
            }
          })
      }
      else{
        axiosClient.post(`/results`, result)
        .then(() =>{
          setErrors(null)
          setNotification('result was created !')
          navigate('/results')
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
              <div className="">
                <form onSubmit={onSubmit}>
                   {result.id && <h2>Update result</h2>}
                   {!result.id && <h2>New result</h2>}
                  <label>Name </label>
                  <input type='text'value={result.name} onChange={ev => setResult({...result, name: ev.target.value})} placeholder="email"/>
                  <label>Mat Number </label>
                  <input type='text'value={result.matric_number} onChange={ev => setResult({...result, matric_number: ev.target.value})} placeholder="mat number"/>
                  <label> Semester </label>
                  <input type='text'value={result.semester} onChange={ev => setResult({...result, semester: ev.target.value})} placeholder="semester"/>
                  <label>Exam </label>
                  <input type='text'value={result.exam} onChange={ev => setResult({...result, exam: ev.target.value})} placeholder="exam"/>
                  <label>CA </label>
                  <input type='text'value={result.CA} onChange={ev => setResult({...result, CA: ev.target.value})} placeholder="CA"/>
                  <label>Score </label>
                  <input type='text'value={result.score} onChange={ev => setResult({...result, score: ev.target.value})} placeholder="score"/>
                  <label>Year </label>
                  <input type='text'value={result.year} onChange={ev => setResult({...result, year: ev.target.value})} placeholder="year"/>
                  <label>Course </label>
                  <input type='text'value={result.course_id} onChange={ev => setResult({...result, course_id: ev.target.value})} placeholder="course"/>
                  <button className="btn">Save</button>
                </form>
                </div>
              }
          </div>
        </>
      )
    }
