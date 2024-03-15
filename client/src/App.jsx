import React, { useEffect } from 'react'
import "./App.css"
import { useState } from 'react'
import {Route,Routes,useNavigate} from "react-router-dom"
import {Home, Login} from "./component"
import { app } from './config/firebase.config'
import { getAuth } from 'firebase/auth'


const App = () => {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const [auth, setauth] = useState(false || window.localStorage.getItem("auth") === "true");
  // const [userCred, setUserCred] =useState();
  useEffect(()=>{
    firebaseAuth.onAuthStateChanged((userCred) =>{
      if(userCred){
      userCred.getIdToken().then((token)=>{
        console.log(token);
      })
      }
      else{
        setauth(false);
        window.localStorage.setItem("auth", false);
        navigate("/login");
      }
    })
  },[])
  // const [auth, setAuth] = useState(window.localStorage.getItem("auth") === true);
  // const [auth, setAuth] = useState(window.localStorage.getItem("auth") === 'true');
  return (
    <>
    <div className='w-screen h-screen bg-blue-400 flex justify-center items-center'>
    <Routes>
    <Route path='/login' element={<Login setauth={setauth}/>}/>
    <Route path='/*' element={<Home/>}/>

    </Routes>
    </div>
    </>
  )
}

export default App
