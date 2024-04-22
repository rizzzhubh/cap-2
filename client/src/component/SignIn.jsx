import axios from "axios";
import React from "react";
import { useState } from "react";

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passsword, setpassword] = useState("");

  const handelSubmit =(e) => {
    e.preventDefault()
    axios.post("http://localhost:3000/api/users/signIn", { name, email, password: passsword })
        .then(res => console.log(res))
        .catch(err => console.log(err))
  }

  return (
    <div>
      <h1>SignIn</h1>
      <input type="text" onChange={(e) => setName(e.target.value)} placeholder="enter name"/>
      <input type="email" onChange={(e) => setEmail(e.target.value)}  placeholder="enter email"/>
      <input type="password" onChange={(e) => setpassword(e.target.value)}  placeholder="enter password"/>
      <input type="submit" onClick={(e) => handelSubmit(e)}/>
    </div>
  );
};

export default SignIn;
