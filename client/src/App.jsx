import React, { useEffect } from 'react'
import "./App.css"
import { useState } from 'react'
import {Route,Routes,useNavigate} from "react-router-dom"
import {Home, Login} from "./component"
import { app } from './config/firebase.config'
import { getAuth } from 'firebase/auth'
import { motion, AnimatePresence } from "framer-motion";
import { validateuser } from '../api'
import { useStateValue } from './context/StateProvider'
import { actionType } from './context/reducer'


const App = () => {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const [{user},dispatch] = useStateValue();
  const [auth, setauth] = useState(false || window.localStorage.getItem("auth") === "true");
  // const [userCred, setUserCred] =useState();
  useEffect(()=>{
    firebaseAuth.onAuthStateChanged((userCred) =>{
      if(userCred){
      userCred.getIdToken().then((token)=>{
        // console.log(token);
        validateuser(token).then((data)=>{
          dispatch({
            type:actionType.SET_USER,
            user:data
          })
        
        })
        
      })
      }
      else{
        setauth(false);
        window.localStorage.setItem("auth", false);
        dispatch({
          type:actionType.SET_USER,
          user:null
        })
        navigate("/login");
      }
    })
  },[])
  // const [auth, setAuth] = useState(window.localStorage.getItem("auth") === true);
  // const [auth, setAuth] = useState(window.localStorage.getItem("auth") === 'true');
  return (
    <AnimatePresence>
    <>
    <div className='h-auto min-w-[680px] bg-blue-400 flex justify-center items-center'>
    <Routes>
    <Route path='/login' element={<Login setauth={setauth}/>}/>
    <Route path='/*' element={<Home/>}/>

    </Routes>
    </div>
    </>
    </AnimatePresence>
  )
}

export default App
