// import { Link, useNavigate } from "react-router-dom";
// import { useRef, useState, useEffect} from "react";
// import axiosClient from "../../../axios-client";
// import { useStateContext } from "../../../contexts/ContextProvider";

// export default function Signup() {
//   const firstNameRef = useRef();
//   const lastNameRef = useRef();
//   const matNumberRef = useRef();
//   const passwordRef = useRef();

//   const { setUser, setToken,notification,setNotification } = useStateContext();
//   const [errors, setErrors] = useState(null);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);


//   const onSubmit = (ev) => {
//     ev.preventDefault();
//     const payload = {
//       first_name: firstNameRef.current.value,
//       last_name: lastNameRef.current.value,
//       matric_number: matNumberRef.current.value,
//       password: passwordRef.current.value,
//     };
//     setErrors(null);
   
//     setLoading(true);
//     axiosClient.post("/register-student", payload)
//       .then(({ data }) => {
//         setLoading(false);
//         setNotification( "Registration successful. Please login and update your bio" );
//         navigate("/students");
//       })
//       .catch((err) => {
//         setLoading(false);
//         // console.log(err)
//         const response = err.response;
//         if (response && response.status === 422) {
//           setErrors(response.data.errors);
//         } else {
//           setErrors("Newtork Error");
//         }
//       });
//   };

//   return (
//     <div>
//       {loading && (
//         <div className="login-signup-form animated fadeInDown">
//           <p className="text-center">Loading...</p>
//         </div>
//       )}
//       {!loading && (
//         <div className="login-signup-form animated fadeInDown">
//           <div className="form">
//             <form onSubmit={onSubmit}>
//               <h1 className="title">Signup Student</h1>
//               {errors && (
//                 <div className="alert">
//                   {Object.keys(errors).map((key) => (
//                     <p key={key}>{errors[key][0]}</p>
//                   ))}
//                 </div>
//               )}

//               {notification && (
//                 <div className="notification">
//                   <p>{notification}</p>
//                 </div>
//               )}

//               <input required ref={firstNameRef} placeholder="First Name" />
//               <input required ref={lastNameRef} placeholder="Last Name" />
//               <input  required ref={matNumberRef} type="text" placeholder="Matric Number"/>
//               <input
//                 required
//                 ref={passwordRef}
//                 type="password"
//                 placeholder="Password"
//               />
//               <button className="btn btn-block"> Add Student</button>
//               {/* <p className="message">
//                 Already Registered? <Link to="/login"> Login </Link>
//               </p> */}
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import {useEffect, useState} from "react";
import axiosClient from "../../../axios-client.js";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider.jsx";


export default function EditStudentsForm(){
  const {id} = useParams()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const {notification, setNotification} = useStateContext()

  const [student, setStudent] = useState({
    // id:null,
    first_name:'',
    last_name:'',
    matric_number: '',
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
            {/* {student.id && <h1>Update student:{student.email}</h1>}
            {!student.id && <h1>Create student</h1>} */}
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
                   {student.id && <h2>Update Student</h2>}
                   {!student.id && <h2>Add Student</h2>}
                  <label>First Name </label>
                  <input type='text'value={student.first_name} onChange={ev => setStudent({...student, first_name: ev.target.value})} placeholder="First Name"/>
                  <label>Last Name</label>
                  <input type='text'value={student.last_name} onChange={ev => setStudent({...student, last_name: ev.target.value})} placeholder="Last Name"/>
                  <label>Matric Number</label>
                  <input type='text'value={student.matric_number} onChange={ev => setStudent({...student, matric_number: ev.target.value})} placeholder="Matric Number"/>
                  <label>password </label>
                  <input type='password'value={student.password} onChange={ev => setStudent({...student, password: ev.target.value})} placeholder="Password "/>
 
                  <button className="btn">Save</button>
                </form>
                </div>
              }
          </div>
        </>
      )
    }
