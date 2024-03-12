import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider.jsx";


export default function SportForm(){
  const {id} = useParams()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)
  const navigate = useNavigate()
  const {notification, setNotification} = useStateContext()
  
  const [sport, setSport] = useState({
    id:null,
    name:''
  })


  if(id){
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/sports/${id}`)
      .then(({data}) => {
        setLoading(false)
        setSport(data.sport)
    }).catch(()=>{
      setLoading(false)
    })
  }, [])
  }

  const onSubmit = (ev)=>{
    ev.preventDefault();
      if(sport.id){
        axiosClient.patch(`/sports/${sport.id}`, sport)
        .then(() =>{
          setNotification('Sport was successful updated!')
          navigate('/sports')
        })
          .catch(err =>{
            const response = err.response;
            if(response && response.status === 422){
              setErrors(response.data.errors)
            }
          })
      }else{
        axiosClient.post(`/sports`, sport)
        .then(() =>{
          setNotification('Sport was created !')
          navigate('/sports')
        })
          .catch(err =>{
            const response = err.response;
            if(response && response.status === 422){
              setErrors(response.data. )
            }
          })
      }

  }
        return (

        <>
            {sport.id && <h2>Update Sport:{sport.name}</h2>}
            {!sport.id && <h2>New User</h2>}
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
              {notification && 
                <div className="alert">
                    <p>{notification}</p>
                </div>}

              {!loading &&
                <form onSubmit={onSubmit}>
                  <input type='text'value={sport.name} onChange={ev => setSport({...sport, name: ev.target.value})} placeholder="Name"/>  
                  <button className="btn">Save</button>
                </form>
              }
          </div>
        </>
      )
    }
