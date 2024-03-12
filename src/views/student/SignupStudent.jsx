import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";

export default function Signup() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const matNumberRef = useRef();
  const passwordRef = useRef();

  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState(null);
  const [sports, setSports] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");


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
    axiosClient.post("/register-student", payload)
      .then(({ data }) => {
        setLoading(false);
        setUser(data.user);
        setToken(data.token)
        setNotification( "Registration successful. Please login and update your bio" );
        navigate("/login");
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
              <h1 className="title">Signup for free</h1>
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
                type="number"
                placeholder="Matric Number"
              />
              <input
                required
                ref={passwordRef}
                type="password"
                placeholder="Password"
              />
              <button className="btn btn-block"> Sign Up</button>
              <p className="message">
                Already Registered? <Link to="/login"> Login </Link>
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
