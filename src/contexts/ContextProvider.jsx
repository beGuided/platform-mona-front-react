import {createContext, useContext, useState} from "react";

const StateContext = createContext ( {
    // student:null,
    user:null,
    token:null,
    notificaton:null,
    // setStudent:() =>{},
    setUser:() =>{},
    setToken:() => {},
    setNotification:()=>{}
})

export const ContextProvider = ({children}) =>{
    // const [student, setStudent] = useState({});
    const [user, setUser] = useState({});
    const [notification, _setNotification] = useState('');
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'))
    
    const setNotification = (message) => {
      _setNotification(message);
      setTimeout(() =>{
        _setNotification('')
      }, 5000)
    }

    const setToken = (token) =>{
        _setToken(token)
        if(token){
            localStorage.setItem('ACCESS_TOKEN', token);
        }else{
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }
    
    
    return (
        <StateContext.Provider value={{
          // student,
          // setStudent,
          user,
          setUser,
          token,
          setToken,
          notification,
          setNotification
        }}>
          {children}
        </StateContext.Provider>
      );
}

export const useStateContext = () => useContext(StateContext);
