import {Outlet,Link,Navigate} from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import {useEffect} from "react"





export default function GuestAuthLayouth(){

    const {user, setUser,setToken}  = useStateContext();
   
  
    const onLogout = (ev) =>{
        ev.preventDefault()
    
        axiosClient.post('/logout')
        .then(() =>{
            setUser({})
            setToken(null)
        })
    }
    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await axiosClient.get('/user'); 
                const data = await response
                setUser(data.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        }
        fetchUser();
    }, []);

    return (
        < div>
                
            {/* <!-- N A V B A R --> */}
            <nav className="navbar navbar-default navbar-expand-lg fixed-top custom-navbar">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="icon ion-md-menu"></span>
                </button>
                {/* <img src="images/logo.png" className="img-fluid nav-logo-mobile" alt="Company Logo"> */}
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <div className="container">
                    {/* <img src="images/logo.png" className="img-fluid nav-logo-desktop" alt="Company Logo"> */}
                    <ul className="navbar-nav ml-auto nav-right" data-easing="easeInOutExpo" data-speed="1250" data-offset="65">
                   
                   {/* only display if user is a veriefed user */}
                   {user.email_verified_at !== null &&
                    <li className="nav-item nav-custom-link">
                        <a className="nav-link" href="/dashboard">Profile <i className="icon ion-ios-arrow-forward icon-mobile"></i></a>
                    </li>
                   }
                    
                    <li className="nav-item nav-custom-link">
                        <a className="nav-link" href="#">Buddies <i className="icon ion-ios-arrow-forward icon-mobile"></i></a>
                    </li>
                    <li className="nav-item nav-custom-link">
                        <a className="nav-link" href="#testimonials">Discover <i className="icon ion-ios-arrow-forward icon-mobile"></i></a>
                    </li>
                   {/* only display if user is a veriefed user */}
                   
                    {user.email_verified_at !== null &&
                    <li className="nav-item nav-custom-link">
                        {user?(
                    <h1>{user.user}</h1>
                   ):(
                    <p>empty</p>
                   )}
                        <Link className="nav-link" to={'/users/'+user.id}>Settings & Privacy<i className="icon ion-ios-arrow-forward icon-mobile"></i></Link> 
                    </li>
                        }
                   {/* only display if user is not veriefed user */}
                    
                   {user.email_verified_at ==undefined &&
                    <li className="nav-item nav-custom-link btn btn-demo-small">
                    <a className="nav-link" href="/signup">SignUp <i className="icon ion-ios-arrow-forward icon-mobile"></i></a>
                    </li>
                    }
                    {user.email_verified_at !=undefined &&
                    <li className="nav-item nav-custom-link btn btn-demo-small">
                    <a className="nav-link" href="#"  onClick={onLogout}>LogOut <i className="icon ion-ios-arrow-forward icon-mobile"></i></a>
                    </li>
                    }
                    


                   {/* only display if user is a veriefed user */}
                  
                    
                    </ul>
                </div>
                </div>
            </nav>
            {/* <!-- E N D  N A V B A R -->*/}
                    
          <Outlet /> 
           {/* <!--  F O O T E R  --> */}
            <footer>
                <div className="container">
                <div className="row">
                
                   
                </div> 
                <div className="divider"></div>
                <div className="row">
                    <div className="col-md-6 col-xs-12">
                        <a href="#"><i className="icon ion-logo-facebook"></i></a>
                        <a href="#"><i className="icon ion-logo-instagram"></i></a>
                        <a href="#"><i className="icon ion-logo-twitter"></i></a>
                        <a href="#"><i className="icon ion-logo-youtube"></i></a>
                    </div>
                    <div className="col-md-6 col-xs-12">
                    </div>
                </div>
                </div>
            </footer>
        </div>
      )
        }