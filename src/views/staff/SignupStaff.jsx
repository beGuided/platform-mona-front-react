import { Link, useNavigate } from "react-router-dom";
import { useRef, useState,} from "react";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";

export default function Signup() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const matNumberRef = useRef();
  const passwordRef = useRef();

  const { setUser, setToken,notification,setNotification } = useStateContext();
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const onSubmit = (ev) => {
    ev.preventDefault();
    const payload = {
      first_name: firstNameRef.current.value,
      last_name: lastNameRef.current.value,
      matric_number: matNumberRef.current.value,
      password: passwordRef.current.value,
    };
    setErrors(null);

    setLoading(true);
    axiosClient.post("/register", payload)
      .then(({ data }) => {
        setLoading(false);
        setNotification( "Registration successful. Please login and update your bio" );
        navigate("/students");
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err)
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        } else {
          setErrors("Newtork Error");
        }
      });
  };

  return (
    <div>
      {loading && (
        <div className="login-signup-form animated fadeInDown">
          <p className="text-center">Loading...</p>
        </div>
      )}
      {!loading && (
        <div className="login-signup-form animated fadeInDown">
          <div className="form">
            <form onSubmit={onSubmit}>
              <h1 className="title">Signup Student</h1>
              {errors && (
                <div className="alert">
                  {Object.keys(errors).map((key) => (
                    <p key={key}>{errors[key][0]}</p>
                  ))}
                </div>
              )}

              {notification && (
                <div className="notification">
                  <p>{notification}</p>
                </div>
              )}

              <input required ref={firstNameRef} placeholder="First Name" />
              <input required ref={lastNameRef} placeholder="Last Name" />
              <input
                required
                ref={matNumberRef}
                type="text"
                placeholder="Matric Number"
              />
              <input
                required
                ref={passwordRef}
                type="password"
                placeholder="Password"
              />
              <button className="btn btn-block"> Add Student</button>
              {/* <p className="message">
                Already Registered? <Link to="/login"> Login </Link>
              </p> */}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
