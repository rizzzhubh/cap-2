import React, { useEffect, useState } from 'react';
import {FcGoogle} from "react-icons/fc";
import { app } from "../config/firebase.config";
import {getAuth,GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import {useNavigate} from "react-router-dom"
import { useStateValue } from '../context/StateProvider';
import { validateuser } from '../../api';

const Login = ({setauth}) => {

    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const [auth, setAuth] = useState();

    const navigate = useNavigate();
    const [{user},dispatch] = useStateValue();
    const loginWithGoogle = async () => {
      await signInWithPopup(firebaseAuth, provider).then((userCred) => {
        if(userCred){
          setauth(true);
          window.localStorage.setItem("auth", "true");
          firebaseAuth.onAuthStateChanged((userCred) =>{
            if(userCred){
              userCred.getIdToken().then((token)=>{
                validateuser(token).then((data)=>{
                  dispatch({
                    type:actionType.SET_USER,
                    user:data
                  })
                  
                })
              })
              navigate("/",{replace:true});
            }
            else{
              setauth(false);
              dispatch({
                type:actionType.SET_USER,
                user:null
              })
              navigate("/login");
            }
          })
        }
        
      })
    };

    useEffect(()=>{
      if(window.localStorage.getItem("auth") === "true"){
        navigate("/",{replace:true});
      }
    },[])
  return (
    <div className="relative w-screen h-screen">
  
    <div className="absolute inset-0 bg-darkOverlay flex items-center justify-center p-4">
      <div className="w-full md:w-375 p-4 bg-lightOverlay shadow-2xl rounded-md backdrop-blur-md flex flex-col items-center justify-center">
        <div
          onClick={loginWithGoogle}
          className="flex items-center justify-center  gap-2 px-4 py-2 rounded-md bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all"
        >
          <FcGoogle className="text-xl" />
          <p>Signin' with Google</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login
