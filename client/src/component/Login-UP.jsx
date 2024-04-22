import React, { useState } from "react";
import Login from "./Login";
import axios from "axios";

const LoginUP = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    if (email && password) {
      axios
        .post("http://localhost:3000/api/users/login-m", { email, password })
        .then((res) => {
            console.log(res);
            localStorage.setItem("access_token",res.data.token)
            sessionStorage.setItem("role", res.data.foundUser[0].role)
            sessionStorage.setItem("id", res.data.foundUser[0]._id)
        });

      setLoggedIn(true);
    } else {
      alert("Please enter both username and password");
    }
  };

  return (
    <div>
      {loggedIn ? (
        <div>
          <h1>Welcome, {email}!</h1>
          <button onClick={() => setLoggedIn(false)}>Logout</button>
        </div>
      ) : (
        <div>
          <input
            type="email"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default LoginUP;
