import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState("");

  const handleRegister = async () => {
    try {
      if (password !== confirmPassword) {
        setRegistrationStatus("Passwords do not match");
        return;
      }

      const userData = {
        username,
        email,
        password,
      };

      const response = await axios.post(
        "http://localhost:3001/auth/register",
        userData
      );

      if (
        response.data &&
        response.data.message === "User registered successfully"
      ) {
        setRegistrationStatus("Registration successful!");
        navigate("/");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setRegistrationStatus("Error registering user");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 text-center">
      <div className="p-5 border border-2 border-dark-subtle rounded">
        <div className="mb-5">
          <h2>Register</h2>
        </div>
        <div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
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
          <div className="mb-3">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <button onClick={handleRegister}>Register</button>
          </div>
          <p>{registrationStatus}</p>
          <Link to="/">Already registered? Login</Link>
        </div>
      </div>
    </div>
  );
}
