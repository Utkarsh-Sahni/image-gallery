import React, { useState } from "react";
import axios from "axios";
import { Link,  useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const handleLogin = async () => {
    try {
      const userData = {
        email,
        password,
      };
      // console.log(userData);
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        userData
      );
      // console.log(response);
      if (response.data && response.data.message === "Login successful") {
        setLoginStatus("Login successful!");
        navigate("/feed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setLoginStatus("Error logging in");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 text-center">
      <div className="p-5 border border-dark-subtle border-2 rounded">
        <div className="mb-5">
          <h2>Login</h2>
        </div>
        <div>
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button onClick={handleLogin}>Login</button>
          </div>
          <p>{loginStatus}</p>
          <Link to="/register">New User? Register</Link>{" "}
        </div>
      </div>
    </div>
  );
}
